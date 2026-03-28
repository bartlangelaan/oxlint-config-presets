/**
 * Generates oxlint config files from popular ESLint styleguides.
 *
 * For each source eslint config, this script:
 * 1. Recursively resolves all `extends` chains to collect the full set of rules
 * 2. Passes the flat rule set through @oxlint/migrate to produce an oxlint-compatible config
 * 3. Writes the result as a JSON file under the appropriate output directory
 *
 * After all configs are generated, writes configs/README.md by copying the
 * root README and appending an available-configs table plus per-config
 * collapsible sections listing the rules that have no oxlint equivalent.
 *
 * Run with: pnpm generate
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import migrate, { type default as Migrate } from '@oxlint/migrate';

type OxlintConfig = Awaited<ReturnType<typeof Migrate>>;

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const configsDir = join(rootDir, 'configs');

// Use createRequire so we can require() CJS ESLint configs from ESM context
const req = createRequire(join(rootDir, 'package.json'));

type EslintRuleValue = string | number | [string | number, ...unknown[]];
type EslintRules = Record<string, EslintRuleValue>;

interface OldStyleEslintConfig {
  extends?: string | string[];
  plugins?: string[];
  rules?: EslintRules;
  env?: Record<string, boolean>;
  settings?: Record<string, unknown>;
  parserOptions?: Record<string, unknown>;
  overrides?: OldStyleEslintConfig[];
}

/**
 * Recursively resolve an old-style ESLint config to a flat rules map.
 * Extends are resolved depth-first; later entries and the config's own rules win.
 */
function flattenRules(
  configPath: string,
  visited = new Set<string>(),
): EslintRules {
  if (visited.has(configPath)) return {};
  visited.add(configPath);

  const config = req(configPath) as OldStyleEslintConfig;
  const rules: EslintRules = {};

  if (config.extends) {
    const exts = Array.isArray(config.extends) ? config.extends : [config.extends];
    for (const ext of exts) {
      try {
        if (ext.startsWith('plugin:')) {
          Object.assign(rules, resolvePluginConfig(ext));
          continue;
        }

        let resolvedPath: string;
        if (ext.startsWith('/') || ext.startsWith('./') || ext.startsWith('../')) {
          resolvedPath = req.resolve(resolve(dirname(configPath), ext));
        } else {
          // Named shareable config: 'airbnb' -> 'eslint-config-airbnb'
          const pkgName = ext.startsWith('eslint-config-') ? ext : `eslint-config-${ext}`;
          resolvedPath = req.resolve(pkgName);
        }
        Object.assign(rules, flattenRules(resolvedPath, visited));
      } catch {
        console.warn(`  [warn] Could not resolve extends entry: ${ext}`);
      }
    }
  }

  Object.assign(rules, config.rules ?? {});
  return rules;
}

/**
 * Resolve a `plugin:name/config` extends entry to a flat rules map.
 * Handles old-style plugin configs which may themselves have extends.
 */
function resolvePluginConfig(
  pluginRef: string,
  visited = new Set<string>(),
): EslintRules {
  // pluginRef format: "plugin:<pluginName>/<configName>"
  const withoutPrefix = pluginRef.slice('plugin:'.length);
  const slashIdx = withoutPrefix.indexOf('/');
  if (slashIdx === -1) return {};

  const pluginName = withoutPrefix.slice(0, slashIdx);
  const configName = withoutPrefix.slice(slashIdx + 1);

  try {
    const plugin = req(`eslint-plugin-${pluginName}`) as {
      configs?: Record<string, OldStyleEslintConfig>;
    };
    const pluginConfig = plugin.configs?.[configName];
    if (!pluginConfig) return {};

    const rules: EslintRules = {};

    if (pluginConfig.extends) {
      const exts = Array.isArray(pluginConfig.extends)
        ? pluginConfig.extends
        : [pluginConfig.extends];
      for (const ext of exts) {
        if (ext.startsWith('plugin:')) {
          if (!visited.has(ext)) {
            visited.add(ext);
            Object.assign(rules, resolvePluginConfig(ext, visited));
          }
        }
      }
    }

    Object.assign(rules, pluginConfig.rules ?? {});
    return rules;
  } catch {
    console.warn(`  [warn] Could not resolve plugin config: ${pluginRef}`);
    return {};
  }
}

function createReporter() {
  const warnings: string[] = [];
  const skipped: Record<string, string[]> = {};
  return {
    addWarning: (message: string) => warnings.push(message),
    getWarnings: () => warnings,
    markSkipped: (rule: string, category: string) => {
      (skipped[category] ??= []).push(rule);
    },
    removeSkipped: (rule: string, category: string) => {
      skipped[category] = (skipped[category] ?? []).filter((r) => r !== rule);
    },
    getSkippedRulesByCategory: () => skipped,
  };
}

interface ConfigEntry {
  /** npm package name of the source ESLint config, e.g. 'eslint-config-airbnb' */
  sourcePackage: string;
  /** config variant within the package, e.g. 'base'; empty string for the main export */
  sourceConfig: string;
  /** Returns the flat map of ESLint rules to migrate */
  resolveRules: () => EslintRules;
}

/**
 * Maps a source package name to the directory name used under configs/.
 * Strips eslint-config-/eslint-plugin- prefixes and normalises scoped packages.
 * eslint-config-eslint → eslint-team (special-cased to avoid clashing with the tool name).
 */
function pkgToDirName(pkg: string): string {
  if (pkg.startsWith('@')) {
    const withoutAt = pkg.slice(1);
    const slash = withoutAt.indexOf('/');
    const scope = withoutAt.slice(0, slash);
    const name = withoutAt.slice(slash + 1);
    const cleanName = name.replace(/^eslint-(config|plugin)-?/, '');
    return cleanName ? `${scope}-${cleanName}` : scope;
  }
  const clean = pkg.replace(/^eslint-(config|plugin)-/, '');
  return clean === 'eslint' ? 'eslint-team' : clean;
}

/** Output path relative to configsDir, e.g. 'airbnb/base.json' */
const outputFor = (cfg: ConfigEntry) =>
  `${pkgToDirName(cfg.sourcePackage)}/${cfg.sourceConfig || 'index'}.json`;

/** Full import path as used in an oxlintrc extends array */
const oxlintConfigFor = (cfg: ConfigEntry) =>
  `oxlint-config-presets/${outputFor(cfg)}`;

// Shorthand for old-style shareable configs resolved via flattenRules.
const fromPackage = (pkg: string) => () => flattenRules(req.resolve(pkg));

// @eslint/js uses flat config: configs.recommended / configs.all each have a
// plain `rules` object we can pass directly to migrate.
const eslintJs = req('@eslint/js') as {
  configs: { recommended: { rules: EslintRules }; all: { rules: EslintRules } };
};

// @typescript-eslint uses flat config arrays. Merge all rules from each array
// entry to get the full effective rule set for a given config.
const tsEslint = req('@typescript-eslint/eslint-plugin') as {
  configs: Record<string, Array<{ rules?: EslintRules }> | { rules?: EslintRules }>;
};

const fromTsEslint = (name: string) => () => {
  const cfg = tsEslint.configs[name];
  const entries = Array.isArray(cfg) ? cfg : [cfg];
  const rules: EslintRules = {};
  for (const entry of entries) Object.assign(rules, entry.rules ?? {});
  return rules;
};

// eslint-config-xo uses flat config (ESM function returning an array of config objects).
// We merge all rules from the returned entries to get the full effective rule set.
const xoModule = await import('eslint-config-xo');
const xoFn = xoModule.default as () => Array<{ rules?: EslintRules }>;
const fromXo = () => {
  const entries = xoFn();
  const rules: EslintRules = {};
  for (const entry of entries) Object.assign(rules, entry.rules ?? {});
  return rules;
};

// eslint-config-problems exposes a plain flat config object with a `rules` property.
const problemsConfig = req('eslint-config-problems') as { rules: EslintRules };

// eslint-config-eslint (ESLint team's own config) uses flat config arrays loadable via require.
type FlatConfigArray = Array<{ rules?: EslintRules }>;
const fromFlatArray = (pkg: string) => () => {
  const entries = req(pkg) as FlatConfigArray | { rules?: EslintRules };
  const arr = Array.isArray(entries) ? entries : [entries];
  const rules: EslintRules = {};
  for (const entry of arr) Object.assign(rules, entry.rules ?? {});
  return rules;
};

// eslint-config-prettier disables all formatting rules that conflict with Prettier.
const prettierConfig = req('eslint-config-prettier') as { rules: EslintRules };

// @antfu/eslint-config is an async ESM factory function returning a flat config array.
const antfuModule = await import('@antfu/eslint-config');
const antfuEntries = await (antfuModule.default as () => Promise<FlatConfigArray>)();
const fromAntfu = () => {
  const rules: EslintRules = {};
  for (const entry of antfuEntries) Object.assign(rules, entry.rules ?? {});
  return rules;
};

const configs: ConfigEntry[] = [
  // ── airbnb ────────────────────────────────────────────────────────────────
  { sourcePackage: 'eslint-config-airbnb', sourceConfig: '', resolveRules: fromPackage('eslint-config-airbnb') },
  { sourcePackage: 'eslint-config-airbnb', sourceConfig: 'base', resolveRules: fromPackage('eslint-config-airbnb/base') },
  { sourcePackage: 'eslint-config-airbnb', sourceConfig: 'hooks', resolveRules: fromPackage('eslint-config-airbnb/hooks') },
  { sourcePackage: 'eslint-config-airbnb', sourceConfig: 'legacy', resolveRules: fromPackage('eslint-config-airbnb/legacy') },
  { sourcePackage: 'eslint-config-airbnb', sourceConfig: 'whitespace', resolveRules: fromPackage('eslint-config-airbnb/whitespace') },

  // ── standard / google ─────────────────────────────────────────────────────
  { sourcePackage: 'eslint-config-standard', sourceConfig: '', resolveRules: fromPackage('eslint-config-standard') },
  { sourcePackage: 'eslint-config-google', sourceConfig: '', resolveRules: fromPackage('eslint-config-google') },

  // ── @typescript-eslint ────────────────────────────────────────────────────
  { sourcePackage: '@typescript-eslint/eslint-plugin', sourceConfig: 'recommended', resolveRules: fromTsEslint('flat/recommended') },
  { sourcePackage: '@typescript-eslint/eslint-plugin', sourceConfig: 'recommended-type-checked', resolveRules: fromTsEslint('flat/recommended-type-checked') },
  { sourcePackage: '@typescript-eslint/eslint-plugin', sourceConfig: 'strict', resolveRules: fromTsEslint('flat/strict') },
  { sourcePackage: '@typescript-eslint/eslint-plugin', sourceConfig: 'strict-type-checked', resolveRules: fromTsEslint('flat/strict-type-checked') },
  { sourcePackage: '@typescript-eslint/eslint-plugin', sourceConfig: 'stylistic', resolveRules: fromTsEslint('flat/stylistic') },
  { sourcePackage: '@typescript-eslint/eslint-plugin', sourceConfig: 'stylistic-type-checked', resolveRules: fromTsEslint('flat/stylistic-type-checked') },
  { sourcePackage: '@typescript-eslint/eslint-plugin', sourceConfig: 'all', resolveRules: fromTsEslint('flat/all') },

  // ── @eslint/js ────────────────────────────────────────────────────────────
  { sourcePackage: '@eslint/js', sourceConfig: 'recommended', resolveRules: () => eslintJs.configs.recommended.rules },
  { sourcePackage: '@eslint/js', sourceConfig: 'all', resolveRules: () => eslintJs.configs.all.rules },

  // ── xo / problems / hardcore / wikimedia ──────────────────────────────────
  { sourcePackage: 'eslint-config-xo', sourceConfig: '', resolveRules: fromXo },
  { sourcePackage: 'eslint-config-problems', sourceConfig: '', resolveRules: () => problemsConfig.rules },
  { sourcePackage: 'eslint-config-hardcore', sourceConfig: '', resolveRules: fromPackage('eslint-config-hardcore') },
  { sourcePackage: 'eslint-config-wikimedia', sourceConfig: '', resolveRules: fromPackage('eslint-config-wikimedia') },

  // ── eslint-team ───────────────────────────────────────────────────────────
  { sourcePackage: 'eslint-config-eslint', sourceConfig: '', resolveRules: fromFlatArray('eslint-config-eslint') },
  { sourcePackage: 'eslint-config-eslint', sourceConfig: 'base', resolveRules: fromFlatArray('eslint-config-eslint/base') },

  // ── alloy ─────────────────────────────────────────────────────────────────
  { sourcePackage: 'eslint-config-alloy', sourceConfig: '', resolveRules: fromPackage('eslint-config-alloy') },
  { sourcePackage: 'eslint-config-alloy', sourceConfig: 'react', resolveRules: fromPackage('eslint-config-alloy/react') },
  { sourcePackage: 'eslint-config-alloy', sourceConfig: 'typescript', resolveRules: fromPackage('eslint-config-alloy/typescript') },

  // ── prettier / antfu ──────────────────────────────────────────────────────
  { sourcePackage: 'eslint-config-prettier', sourceConfig: '', resolveRules: () => prettierConfig.rules },
  { sourcePackage: '@antfu/eslint-config', sourceConfig: '', resolveRules: fromAntfu },
];

interface GenerateResult {
  config: ConfigEntry;
  oxlintResult: OxlintConfig;
  skipped: Record<string, string[]>;
  strippedOptions: string[];
  warnings: string[];
}

const results: GenerateResult[] = [];

for (const config of configs) {
  const label = oxlintConfigFor(config);
  console.log(`Generating ${label}...`);

  const rules = config.resolveRules();

  console.log(`  Resolved ${Object.keys(rules).length} rules, migrating...`);

  const reporter = createReporter();

  // Pass the flattened rules as a single ESLint flat config object.
  // migrate() returns an oxlint-compatible config with supported rules only.
  const oxlintResult = await migrate({ rules }, undefined, { reporter, withNursery: true, typeAware: true });

  // Remove $schema — child configs are extended from node_modules and the
  // relative path to oxlint's schema would be wrong from that location.
  delete oxlintResult.$schema;

  const outputPath = join(configsDir, outputFor(config));
  mkdirSync(dirname(outputPath), { recursive: true });

  // Write the config, then validate it by running oxlint against a dummy file.
  // If oxlint rejects any rule options (e.g. "∞" as a u32, unknown fields, or
  // rules that take no options), strip the options for those rules and retry.
  // This loop is self-healing: it fixes whatever incompatibilities oxlint
  // reports without requiring a hardcoded list of problematic rules.
  const dummyFile = join(rootDir, 'tests/fixtures/sample.js');
  const oxlintBin = join(rootDir, 'node_modules/.bin/oxlint');

  const strippedOptions: string[] = [];

  for (let attempt = 1; ; attempt++) {
    writeFileSync(outputPath, JSON.stringify(oxlintResult, null, 2) + '\n');

    const validation = spawnSync(oxlintBin, ['--config', outputPath, dummyFile], {
      encoding: 'utf-8',
    });
    const output = validation.stdout + validation.stderr;

    if (!output.includes('Failed to parse oxlint configuration file')) break;

    // Extract rule names reported as having invalid configuration.
    // oxlint normalises plugin separators to underscores in output (jsx_a11y)
    // but the config uses hyphens (jsx-a11y), so normalise back.
    const badRules = [
      ...output.matchAll(/Invalid configuration for rule `([^`]+)`/g),
    ].map((m) => m[1].replace(/_/g, '-'));

    if (badRules.length === 0 || attempt > 10) {
      console.warn(`  [warn] Could not auto-fix config parse errors:\n${output}`);
      break;
    }

    for (const ruleName of badRules) {
      const value = oxlintResult.rules?.[ruleName];
      if (Array.isArray(value) && value.length > 0) {
        // Keep only the severity, dropping the incompatible options object.
        (oxlintResult.rules as Record<string, unknown>)[ruleName] = value[0];
        if (!strippedOptions.includes(ruleName)) strippedOptions.push(ruleName);
        console.log(`  [fix] Stripped options from ${ruleName}`);
      }
    }
  }

  const ruleCount = Object.keys(oxlintResult.rules ?? {}).length;
  console.log(`  Written to configs/${outputFor(config)} (${ruleCount} oxlint rules)`);

  results.push({
    config,
    oxlintResult,
    skipped: reporter.getSkippedRulesByCategory(),
    strippedOptions,
    warnings: reporter.getWarnings(),
  });
}

// ---- Build configs/README.md ------------------------------------------------

const CATEGORY_LABELS: Record<string, string> = {
  'not-implemented': 'Not yet implemented in oxlint',
  unsupported: 'Not portable to oxlint',
  nursery: 'Available as nursery rules (experimental, opt-in)',
  'type-aware': 'Require type-aware linting',
  'js-plugins': 'Require JS plugin support',
};

function skippedSection(skipped: Record<string, string[]>): string {
  const categories = Object.entries(skipped).filter(([, rules]) => rules.length > 0);
  if (categories.length === 0) return '';

  const totalSkipped = categories.reduce((sum, [, rules]) => sum + rules.length, 0);

  const body = categories
    .map(([cat, rules]) => {
      const label = CATEGORY_LABELS[cat] ?? cat;
      const ruleList = rules.map((r) => `\`${r}\``).join(', ');
      return `**${label}**\n\n${ruleList}`;
    })
    .join('\n\n');

  return (
    `<details>\n` +
    `<summary>${totalSkipped} rules have no oxlint equivalent</summary>\n\n` +
    `${body}\n\n` +
    `</details>`
  );
}

const rootReadme = readFileSync(join(rootDir, 'README.md'), 'utf-8').trimEnd();

const tableRows = results
  .map(({ config }) =>
    `| \`${config.sourcePackage}\` | ${config.sourceConfig ? `\`${config.sourceConfig}\`` : ''} | \`${oxlintConfigFor(config)}\` |`,
  )
  .join('\n');

const table =
  `## Available configs\n\n` +
  `| Source package | Source config | Oxlint config |\n` +
  `|---|---|---|\n` +
  tableRows;

function migratedSection(rules: OxlintConfig['rules'], strippedOptions: string[]): string {
  const names = Object.keys(rules ?? {}).filter((name) => !strippedOptions.includes(name));
  if (names.length === 0) return '';

  const ruleList = names.map((r) => `\`${r}\``).join(', ');

  return (
    `<details>\n` +
    `<summary>${names.length} rules successfully migrated</summary>\n\n` +
    `${ruleList}\n\n` +
    `</details>`
  );
}

const configSections = results
  .map(({ config, oxlintResult, skipped, strippedOptions, warnings }) => {
    const parts: string[] = [`### \`${oxlintConfigFor(config)}\``];

    const migrated = migratedSection(oxlintResult.rules, strippedOptions);
    if (migrated) parts.push(migrated);

    if (strippedOptions.length > 0) {
      const ruleList = strippedOptions.map((r) => `\`${r}\``).join(', ');
      parts.push(
        `<details>\n` +
        `<summary>${strippedOptions.length} rules migrated without options (incompatible schema)</summary>\n\n` +
        `These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.\n\n` +
        `${ruleList}\n\n` +
        `</details>`,
      );
    }

    const section = skippedSection(skipped);
    if (section) parts.push(section);

    const notable = warnings.filter((w) => !w.includes('import-sorting'));
    if (notable.length > 0) {
      parts.push(notable.map((w) => `> ${w.split('\n')[0]}`).join('\n'));
    }

    return parts.join('\n\n');
  })
  .join('\n\n');

const configsReadme =
  rootReadme +
  '\n\n' +
  table +
  '\n\n' +
  configSections +
  '\n';

writeFileSync(join(configsDir, 'README.md'), configsReadme);
console.log('\nWritten configs/README.md');

console.log('\nDone.');
