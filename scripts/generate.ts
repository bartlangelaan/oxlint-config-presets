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
  /** Package/path to require() as the entry point */
  entry: string;
  /** Output path relative to configsDir */
  output: string;
}

const configs: ConfigEntry[] = [
  {
    label: 'airbnb',
    exportName: 'oxlint-config-presets/airbnb',
    eslintEquivalent: 'eslint-config-airbnb',
    entry: 'eslint-config-airbnb',
    output: 'airbnb/index.json',
  },
  {
    label: 'airbnb/base',
    exportName: 'oxlint-config-presets/airbnb/base',
    eslintEquivalent: 'eslint-config-airbnb/base',
    entry: 'eslint-config-airbnb/base',
    output: 'airbnb/base.json',
  },
  {
    label: 'airbnb/hooks',
    exportName: 'oxlint-config-presets/airbnb/hooks',
    eslintEquivalent: 'eslint-config-airbnb/hooks',
    entry: 'eslint-config-airbnb/hooks',
    output: 'airbnb/hooks.json',
  },
  {
    label: 'airbnb/legacy',
    exportName: 'oxlint-config-presets/airbnb/legacy',
    eslintEquivalent: 'eslint-config-airbnb/legacy',
    entry: 'eslint-config-airbnb/legacy',
    output: 'airbnb/legacy.json',
  },
  {
    label: 'airbnb/whitespace',
    exportName: 'oxlint-config-presets/airbnb/whitespace',
    eslintEquivalent: 'eslint-config-airbnb/whitespace',
    entry: 'eslint-config-airbnb/whitespace',
    output: 'airbnb/whitespace.json',
  },
];

interface GenerateResult {
  config: ConfigEntry;
  oxlintResult: OxlintConfig;
  skipped: Record<string, string[]>;
  warnings: string[];
}

const results: GenerateResult[] = [];

for (const config of configs) {
  console.log(`Generating ${config.label}...`);

  const entryPath = req.resolve(config.entry);
  const rules = flattenRules(entryPath);

  console.log(`  Resolved ${Object.keys(rules).length} rules, migrating...`);

  const reporter = createReporter();

  // Pass the flattened rules as a single ESLint flat config object.
  // migrate() returns an oxlint-compatible config with supported rules only.
  const oxlintResult = await migrate({ rules }, undefined, { reporter });

  // Remove $schema — child configs are extended from node_modules and the
  // relative path to oxlint's schema would be wrong from that location.
  delete oxlintResult.$schema;

  const outputPath = join(configsDir, config.output);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(oxlintResult, null, 2) + '\n');

  const ruleCount = Object.keys(oxlintResult.rules ?? {}).length;
  console.log(`  Written to configs/${config.output} (${ruleCount} oxlint rules)`);

  results.push({
    config,
    oxlintResult,
    skipped: reporter.getSkippedRulesByCategory(),
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

const configSections = results
  .map(({ config, skipped, warnings }) => {
    const parts: string[] = [`### \`${config.exportName}\``];

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
