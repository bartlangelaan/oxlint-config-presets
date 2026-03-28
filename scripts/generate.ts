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
  /** Human-readable label used in console output */
  label: string;
  /** Package export name, e.g. 'oxlint-config-presets/airbnb' */
  exportName: string;
  /** Equivalent ESLint config name */
  eslintEquivalent: string;
  /** Output path relative to configsDir */
  output: string;
  /** Returns the flat map of ESLint rules to migrate */
  resolveRules: () => EslintRules;
}

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

const configs: ConfigEntry[] = [
  // ── airbnb ────────────────────────────────────────────────────────────────
  {
    label: 'airbnb',
    exportName: 'oxlint-config-presets/airbnb',
    eslintEquivalent: 'eslint-config-airbnb',
    output: 'airbnb/index.json',
    resolveRules: fromPackage('eslint-config-airbnb'),
  },
  {
    label: 'airbnb/base',
    exportName: 'oxlint-config-presets/airbnb/base',
    eslintEquivalent: 'eslint-config-airbnb/base',
    output: 'airbnb/base.json',
    resolveRules: fromPackage('eslint-config-airbnb/base'),
  },
  {
    label: 'airbnb/hooks',
    exportName: 'oxlint-config-presets/airbnb/hooks',
    eslintEquivalent: 'eslint-config-airbnb/hooks',
    output: 'airbnb/hooks.json',
    resolveRules: fromPackage('eslint-config-airbnb/hooks'),
  },
  {
    label: 'airbnb/legacy',
    exportName: 'oxlint-config-presets/airbnb/legacy',
    eslintEquivalent: 'eslint-config-airbnb/legacy',
    output: 'airbnb/legacy.json',
    resolveRules: fromPackage('eslint-config-airbnb/legacy'),
  },
  {
    label: 'airbnb/whitespace',
    exportName: 'oxlint-config-presets/airbnb/whitespace',
    eslintEquivalent: 'eslint-config-airbnb/whitespace',
    output: 'airbnb/whitespace.json',
    resolveRules: fromPackage('eslint-config-airbnb/whitespace'),
  },

  // ── standard ──────────────────────────────────────────────────────────────
  {
    label: 'standard',
    exportName: 'oxlint-config-presets/standard',
    eslintEquivalent: 'eslint-config-standard',
    output: 'standard/index.json',
    resolveRules: fromPackage('eslint-config-standard'),
  },

  // ── google ────────────────────────────────────────────────────────────────
  {
    label: 'google',
    exportName: 'oxlint-config-presets/google',
    eslintEquivalent: 'eslint-config-google',
    output: 'google/index.json',
    resolveRules: fromPackage('eslint-config-google'),
  },

  // ── @typescript-eslint ────────────────────────────────────────────────────
  {
    label: 'typescript-eslint/recommended',
    exportName: 'oxlint-config-presets/typescript-eslint/recommended',
    eslintEquivalent: '@typescript-eslint/eslint-plugin — recommended',
    output: 'typescript-eslint/recommended.json',
    resolveRules: fromTsEslint('flat/recommended'),
  },
  {
    label: 'typescript-eslint/recommended-type-checked',
    exportName: 'oxlint-config-presets/typescript-eslint/recommended-type-checked',
    eslintEquivalent: '@typescript-eslint/eslint-plugin — recommended-type-checked',
    output: 'typescript-eslint/recommended-type-checked.json',
    resolveRules: fromTsEslint('flat/recommended-type-checked'),
  },
  {
    label: 'typescript-eslint/strict',
    exportName: 'oxlint-config-presets/typescript-eslint/strict',
    eslintEquivalent: '@typescript-eslint/eslint-plugin — strict',
    output: 'typescript-eslint/strict.json',
    resolveRules: fromTsEslint('flat/strict'),
  },
  {
    label: 'typescript-eslint/strict-type-checked',
    exportName: 'oxlint-config-presets/typescript-eslint/strict-type-checked',
    eslintEquivalent: '@typescript-eslint/eslint-plugin — strict-type-checked',
    output: 'typescript-eslint/strict-type-checked.json',
    resolveRules: fromTsEslint('flat/strict-type-checked'),
  },
  {
    label: 'typescript-eslint/stylistic',
    exportName: 'oxlint-config-presets/typescript-eslint/stylistic',
    eslintEquivalent: '@typescript-eslint/eslint-plugin — stylistic',
    output: 'typescript-eslint/stylistic.json',
    resolveRules: fromTsEslint('flat/stylistic'),
  },
  {
    label: 'typescript-eslint/stylistic-type-checked',
    exportName: 'oxlint-config-presets/typescript-eslint/stylistic-type-checked',
    eslintEquivalent: '@typescript-eslint/eslint-plugin — stylistic-type-checked',
    output: 'typescript-eslint/stylistic-type-checked.json',
    resolveRules: fromTsEslint('flat/stylistic-type-checked'),
  },
  {
    label: 'typescript-eslint/all',
    exportName: 'oxlint-config-presets/typescript-eslint/all',
    eslintEquivalent: '@typescript-eslint/eslint-plugin — all',
    output: 'typescript-eslint/all.json',
    resolveRules: fromTsEslint('flat/all'),
  },

  // ── @eslint/js ────────────────────────────────────────────────────────────
  {
    label: 'eslint-js/recommended',
    exportName: 'oxlint-config-presets/eslint-js/recommended',
    eslintEquivalent: '@eslint/js — recommended',
    output: 'eslint-js/recommended.json',
    resolveRules: () => eslintJs.configs.recommended.rules,
  },
  {
    label: 'eslint-js/all',
    exportName: 'oxlint-config-presets/eslint-js/all',
    eslintEquivalent: '@eslint/js — all',
    output: 'eslint-js/all.json',
    resolveRules: () => eslintJs.configs.all.rules,
  },

  // ── xo ───────────────────────────────────────────────────────────────────
  {
    label: 'xo',
    exportName: 'oxlint-config-presets/xo',
    eslintEquivalent: 'eslint-config-xo',
    output: 'xo/index.json',
    resolveRules: fromXo,
  },

  // ── problems ──────────────────────────────────────────────────────────────
  {
    label: 'problems',
    exportName: 'oxlint-config-presets/problems',
    eslintEquivalent: 'eslint-config-problems',
    output: 'problems/index.json',
    resolveRules: () => problemsConfig.rules,
  },

  // ── hardcore ──────────────────────────────────────────────────────────────
  {
    label: 'hardcore',
    exportName: 'oxlint-config-presets/hardcore',
    eslintEquivalent: 'eslint-config-hardcore',
    output: 'hardcore/index.json',
    resolveRules: fromPackage('eslint-config-hardcore'),
  },

  // ── wikimedia ─────────────────────────────────────────────────────────────
  {
    label: 'wikimedia',
    exportName: 'oxlint-config-presets/wikimedia',
    eslintEquivalent: 'eslint-config-wikimedia',
    output: 'wikimedia/index.json',
    resolveRules: fromPackage('eslint-config-wikimedia'),
  },
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
  console.log(`Generating ${config.label}...`);

  const rules = config.resolveRules();

  console.log(`  Resolved ${Object.keys(rules).length} rules, migrating...`);

  const reporter = createReporter();

  // Pass the flattened rules as a single ESLint flat config object.
  // migrate() returns an oxlint-compatible config with supported rules only.
  const oxlintResult = await migrate({ rules }, undefined, { reporter, withNursery: true, typeAware: true });

  // Remove $schema — child configs are extended from node_modules and the
  // relative path to oxlint's schema would be wrong from that location.
  delete oxlintResult.$schema;

  const outputPath = join(configsDir, config.output);
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
  console.log(`  Written to configs/${config.output} (${ruleCount} oxlint rules)`);

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
  .map(({ config, oxlintResult }) => {
    const ruleCount = Object.keys(oxlintResult.rules ?? {}).length;
    return `| \`${config.exportName}\` | \`${config.eslintEquivalent}\` | ${ruleCount} |`;
  })
  .join('\n');

const table =
  `## Available configs\n\n` +
  `| Package export | ESLint equivalent | Oxlint rules |\n` +
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
    const parts: string[] = [`### \`${config.exportName}\``];

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
