/**
 * Generates oxlint config files from popular ESLint styleguides.
 *
 * For each source eslint config, this script:
 * 1. Recursively resolves all `extends` chains to collect the full set of rules
 * 2. Passes the flat rule set through @oxlint/migrate to produce an oxlint-compatible config
 * 3. Writes the result as a JSON file under the appropriate output directory
 *
 * After all configs are generated, rewrites the generated section in the root
 * README and appends an available-configs table plus per-config collapsible
 * sections listing the rules that have no oxlint equivalent.
 *
 * Run with: pnpm generate
 */

import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import migrate, { type default as Migrate } from '@oxlint/migrate';

type OxlintConfig = Awaited<ReturnType<typeof Migrate>>;

type MigrateInput = Parameters<typeof migrate>[0];
type ExtractConfig<T> =
  T extends Promise<infer P> ? ExtractConfig<P> : T extends Array<infer C> ? ExtractConfig<C> : T;
type ExtractRules<T> = T extends { rules?: infer R }
  ? R
  : T extends Promise<infer P>
    ? ExtractRules<P>
    : T extends Array<infer C>
      ? ExtractRules<C>
      : never;
type MigrateConfig = ExtractConfig<MigrateInput>;
type MigrateRules = NonNullable<ExtractRules<MigrateInput>>;
type ResolvedRules = MigrateRules;
type MigrateReporter = NonNullable<NonNullable<Parameters<typeof migrate>[2]>['reporter']>;
type RuleSkippedCategory = Parameters<MigrateReporter['markSkipped']>[1];
type SkippedRulesByCategory = ReturnType<MigrateReporter['getSkippedRulesByCategory']>;

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const configsDir = join(rootDir, 'configs');
const readmePath = join(rootDir, 'README.md');
const generatedStartMarker = '<!-- GENERATED CONFIGS START -->';
const generatedEndMarker = '<!-- GENERATED CONFIGS END -->';

// Use createRequire so we can require() CJS ESLint configs from ESM context
const req = createRequire(join(rootDir, 'package.json'));

interface OldStyleEslintConfig {
  extends?: string | string[];
  plugins?: string[];
  rules?: ResolvedRules;
  env?: Record<string, boolean>;
  settings?: Record<string, unknown>;
  parserOptions?: Record<string, unknown>;
  overrides?: OldStyleEslintConfig[];
}

function mergeRulesFromConfigObject(
  config: OldStyleEslintConfig,
  visitedPluginRefs = new Set<string>(),
): ResolvedRules {
  const rules: ResolvedRules = {};

  if (config.extends) {
    const exts = Array.isArray(config.extends) ? config.extends : [config.extends];
    for (const ext of exts) {
      if (ext.startsWith('plugin:')) {
        if (!visitedPluginRefs.has(ext)) {
          visitedPluginRefs.add(ext);
          Object.assign(rules, resolvePluginConfig(ext, visitedPluginRefs));
        }
      }
    }
  }

  Object.assign(rules, config.rules ?? {});
  return rules;
}

/**
 * Recursively resolve an old-style ESLint config to a flat rules map.
 * Extends are resolved depth-first; later entries and the config's own rules win.
 */
function flattenRules(configPath: string, visited = new Set<string>()): ResolvedRules {
  if (visited.has(configPath)) return {};
  visited.add(configPath);

  const config = req(configPath) as OldStyleEslintConfig;
  const rules: ResolvedRules = {};

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
function resolvePluginConfig(pluginRef: string, visited = new Set<string>()): ResolvedRules {
  // pluginRef format: "plugin:<pluginName>/<configName>"
  const withoutPrefix = pluginRef.slice('plugin:'.length);
  const slashIdx = withoutPrefix.lastIndexOf('/');
  if (slashIdx === -1) return {};

  const pluginName = withoutPrefix.slice(0, slashIdx);
  const configName = withoutPrefix.slice(slashIdx + 1);

  const pluginPackageName = pluginName.startsWith('@')
    ? (() => {
        const [scope, name] = pluginName.split('/');
        return `${scope}/eslint-plugin-${name}`;
      })()
    : `eslint-plugin-${pluginName}`;

  try {
    const plugin = req(pluginPackageName) as {
      configs?: Record<string, OldStyleEslintConfig>;
    };
    const pluginConfig = plugin.configs?.[configName];
    if (!pluginConfig) return {};

    const rules: ResolvedRules = {};

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
  const skipped: SkippedRulesByCategory = {
    nursery: [],
    'type-aware': [],
    'not-implemented': [],
    unsupported: [],
    'js-plugins': [],
  };
  return {
    addWarning: (message: string) => {
      warnings.push(message);
    },
    getWarnings: () => warnings,
    markSkipped: (rule: string, category: RuleSkippedCategory) => {
      skipped[category].push(rule);
    },
    removeSkipped: (rule: string, category: RuleSkippedCategory) => {
      skipped[category] = skipped[category].filter((r) => r !== rule);
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
  resolveRules: () => ResolvedRules;
}

/**
 * Maps a source package name to the directory/file prefix used under configs/.
 * Scoped packages use just the scope (e.g. @typescript-eslint/eslint-plugin → @typescript-eslint).
 * Unscoped packages strip the eslint-config-/eslint-plugin- prefix.
 */
function pkgToDirName(pkg: string): string {
  if (pkg.startsWith('@')) {
    return `@${pkg.slice(1, pkg.indexOf('/'))}`;
  }
  return pkg.replace(/^eslint-(config|plugin)-/, '');
}

/** Output path relative to configsDir.
 * No sourceConfig → <dir>.json  (e.g. airbnb.json)
 * With sourceConfig → <dir>/<config>.json  (e.g. airbnb/base.json)
 */
const outputFor = (cfg: ConfigEntry) => {
  const dir = pkgToDirName(cfg.sourcePackage);
  return cfg.sourceConfig ? `${dir}/${cfg.sourceConfig}.json` : `${dir}.json`;
};

/** Full import path as used in an oxlintrc extends array */
const oxlintConfigFor = (cfg: ConfigEntry) => `oxlint-config-presets/${outputFor(cfg)}`;

// Shorthand for old-style shareable configs resolved via flattenRules.
const fromPackage = (pkg: string) => () => flattenRules(req.resolve(pkg));

// @eslint/js uses flat config: configs.recommended / configs.all each have a
// plain `rules` object we can pass directly to migrate.
const eslintJs = req('@eslint/js') as {
  configs: { recommended: { rules: ResolvedRules }; all: { rules: ResolvedRules } };
};

// @typescript-eslint uses flat config arrays. Merge all rules from each array
// entry to get the full effective rule set for a given config.
const tsEslint = req('@typescript-eslint/eslint-plugin') as {
  configs: Record<string, Array<{ rules?: ResolvedRules }> | { rules?: ResolvedRules }>;
};

const fromTsEslint = (name: string) => () => {
  const cfg = tsEslint.configs[name];
  const entries = Array.isArray(cfg) ? cfg : [cfg];
  const rules: ResolvedRules = {};
  for (const entry of entries) Object.assign(rules, entry.rules ?? {});
  return rules;
};

// Plugin packages can expose old-style object configs and/or flat config entries.
const fromPluginPackage = (pkg: string, name: string) => () => {
  const mod = req(pkg) as {
    configs?: Record<string, OldStyleEslintConfig | Array<{ rules?: ResolvedRules }>>;
  };
  const cfg = mod.configs?.[name];
  if (!cfg) return {};

  const entries = Array.isArray(cfg) ? cfg : [cfg];
  const rules: ResolvedRules = {};

  for (const entry of entries) {
    const oldStyleEntry = entry as OldStyleEslintConfig;
    if (oldStyleEntry.extends !== undefined) {
      Object.assign(rules, mergeRulesFromConfigObject(oldStyleEntry));
    } else {
      Object.assign(rules, entry.rules ?? {});
    }
  }

  return rules;
};

// eslint-config-xo uses flat config (ESM function returning an array of config objects).
// We merge all rules from the returned entries to get the full effective rule set.
const xoModule = await import('eslint-config-xo');
const xoFn = xoModule.default as () => Array<{ rules?: ResolvedRules }>;
const fromXo = () => {
  const entries = xoFn();
  const rules: ResolvedRules = {};
  for (const entry of entries) Object.assign(rules, entry.rules ?? {});
  return rules;
};

// eslint-config-problems exposes a plain flat config object with a `rules` property.
const problemsConfig = req('eslint-config-problems') as { rules: ResolvedRules };

// eslint-config-eslint (ESLint team's own config) uses flat config arrays loadable via require.
type FlatConfigArray = Array<{ rules?: ResolvedRules }>;
const fromFlatArray = (pkg: string) => () => {
  const entries = req(pkg) as FlatConfigArray | { rules?: ResolvedRules };
  const arr = Array.isArray(entries) ? entries : [entries];
  const rules: ResolvedRules = {};
  for (const entry of arr) Object.assign(rules, entry.rules ?? {});
  return rules;
};

// eslint-config-prettier disables all formatting rules that conflict with Prettier.
const prettierConfig = req('eslint-config-prettier') as { rules: ResolvedRules };

// @antfu/eslint-config is an async ESM factory function returning a flat config array.
const antfuModule = await import('@antfu/eslint-config');
const antfuEntries = await (antfuModule.default as () => Promise<FlatConfigArray>)();
const fromAntfu = () => {
  const rules: ResolvedRules = {};
  for (const entry of antfuEntries) Object.assign(rules, entry.rules ?? {});
  return rules;
};

const configs: ConfigEntry[] = [
  // ── airbnb ────────────────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-airbnb',
    sourceConfig: '',
    resolveRules: fromPackage('eslint-config-airbnb'),
  },
  {
    sourcePackage: 'eslint-config-airbnb',
    sourceConfig: 'base',
    resolveRules: fromPackage('eslint-config-airbnb/base'),
  },
  {
    sourcePackage: 'eslint-config-airbnb',
    sourceConfig: 'hooks',
    resolveRules: fromPackage('eslint-config-airbnb/hooks'),
  },
  {
    sourcePackage: 'eslint-config-airbnb',
    sourceConfig: 'legacy',
    resolveRules: fromPackage('eslint-config-airbnb/legacy'),
  },
  {
    sourcePackage: 'eslint-config-airbnb',
    sourceConfig: 'whitespace',
    resolveRules: fromPackage('eslint-config-airbnb/whitespace'),
  },

  // ── standard / google ─────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-standard',
    sourceConfig: '',
    resolveRules: fromPackage('eslint-config-standard'),
  },
  {
    sourcePackage: 'eslint-config-google',
    sourceConfig: '',
    resolveRules: fromPackage('eslint-config-google'),
  },

  // ── @typescript-eslint ────────────────────────────────────────────────────
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'recommended',
    resolveRules: fromTsEslint('flat/recommended'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'recommended-type-checked',
    resolveRules: fromTsEslint('flat/recommended-type-checked'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'strict',
    resolveRules: fromTsEslint('flat/strict'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'strict-type-checked',
    resolveRules: fromTsEslint('flat/strict-type-checked'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'stylistic',
    resolveRules: fromTsEslint('flat/stylistic'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'stylistic-type-checked',
    resolveRules: fromTsEslint('flat/stylistic-type-checked'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'all',
    resolveRules: fromTsEslint('flat/all'),
  },

  // ── @eslint/js ────────────────────────────────────────────────────────────
  {
    sourcePackage: '@eslint/js',
    sourceConfig: 'recommended',
    resolveRules: () => eslintJs.configs.recommended.rules,
  },
  {
    sourcePackage: '@eslint/js',
    sourceConfig: 'all',
    resolveRules: () => eslintJs.configs.all.rules,
  },

  // ── xo / problems / hardcore / wikimedia ──────────────────────────────────
  { sourcePackage: 'eslint-config-xo', sourceConfig: '', resolveRules: fromXo },
  {
    sourcePackage: 'eslint-config-problems',
    sourceConfig: '',
    resolveRules: () => problemsConfig.rules,
  },
  {
    sourcePackage: 'eslint-config-hardcore',
    sourceConfig: '',
    resolveRules: fromPackage('eslint-config-hardcore'),
  },
  {
    sourcePackage: 'eslint-config-wikimedia',
    sourceConfig: '',
    resolveRules: fromPackage('eslint-config-wikimedia'),
  },

  // ── eslint-team ───────────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-eslint',
    sourceConfig: '',
    resolveRules: fromFlatArray('eslint-config-eslint'),
  },
  {
    sourcePackage: 'eslint-config-eslint',
    sourceConfig: 'base',
    resolveRules: fromFlatArray('eslint-config-eslint/base'),
  },

  // ── alloy ─────────────────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-alloy',
    sourceConfig: '',
    resolveRules: fromPackage('eslint-config-alloy'),
  },
  {
    sourcePackage: 'eslint-config-alloy',
    sourceConfig: 'react',
    resolveRules: fromPackage('eslint-config-alloy/react'),
  },
  {
    sourcePackage: 'eslint-config-alloy',
    sourceConfig: 'typescript',
    resolveRules: fromPackage('eslint-config-alloy/typescript'),
  },

  // ── prettier / antfu ──────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-prettier',
    sourceConfig: '',
    resolveRules: () => prettierConfig.rules,
  },
  { sourcePackage: '@antfu/eslint-config', sourceConfig: '', resolveRules: fromAntfu },

  // ── import / import-x ─────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-plugin-import',
    sourceConfig: 'recommended',
    resolveRules: fromPluginPackage('eslint-plugin-import', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-import',
    sourceConfig: 'errors',
    resolveRules: fromPluginPackage('eslint-plugin-import', 'errors'),
  },
  {
    sourcePackage: 'eslint-plugin-import',
    sourceConfig: 'warnings',
    resolveRules: fromPluginPackage('eslint-plugin-import', 'warnings'),
  },
  {
    sourcePackage: 'eslint-plugin-import',
    sourceConfig: 'react',
    resolveRules: fromPluginPackage('eslint-plugin-import', 'react'),
  },
  {
    sourcePackage: 'eslint-plugin-import',
    sourceConfig: 'typescript',
    resolveRules: fromPluginPackage('eslint-plugin-import', 'typescript'),
  },
  {
    sourcePackage: 'eslint-plugin-import-x',
    sourceConfig: 'recommended',
    resolveRules: fromPluginPackage('eslint-plugin-import-x', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-import-x',
    sourceConfig: 'errors',
    resolveRules: fromPluginPackage('eslint-plugin-import-x', 'errors'),
  },
  {
    sourcePackage: 'eslint-plugin-import-x',
    sourceConfig: 'warnings',
    resolveRules: fromPluginPackage('eslint-plugin-import-x', 'warnings'),
  },
  {
    sourcePackage: 'eslint-plugin-import-x',
    sourceConfig: 'react',
    resolveRules: fromPluginPackage('eslint-plugin-import-x', 'react'),
  },
  {
    sourcePackage: 'eslint-plugin-import-x',
    sourceConfig: 'typescript',
    resolveRules: fromPluginPackage('eslint-plugin-import-x', 'typescript'),
  },

  // ── next / react-perf ─────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-next',
    sourceConfig: 'recommended',
    resolveRules: fromPluginPackage('@next/eslint-plugin-next', 'recommended'),
  },
  {
    sourcePackage: 'eslint-config-next',
    sourceConfig: 'core-web-vitals',
    resolveRules: fromPluginPackage('@next/eslint-plugin-next', 'core-web-vitals'),
  },
  {
    sourcePackage: 'eslint-plugin-react-perf',
    sourceConfig: 'recommended',
    resolveRules: fromPluginPackage('eslint-plugin-react-perf', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-react-perf',
    sourceConfig: 'all',
    resolveRules: fromPluginPackage('eslint-plugin-react-perf', 'all'),
  },

  // ── jsdoc / jsx-a11y ──────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-plugin-jsdoc',
    sourceConfig: 'recommended',
    resolveRules: fromPluginPackage('eslint-plugin-jsdoc', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-jsdoc',
    sourceConfig: 'recommended-typescript',
    resolveRules: fromPluginPackage('eslint-plugin-jsdoc', 'recommended-typescript'),
  },
  {
    sourcePackage: 'eslint-plugin-jsdoc',
    sourceConfig: 'recommended-typescript-flavor',
    resolveRules: fromPluginPackage('eslint-plugin-jsdoc', 'recommended-typescript-flavor'),
  },
  {
    sourcePackage: 'eslint-plugin-jsdoc',
    sourceConfig: 'recommended-tsdoc',
    resolveRules: fromPluginPackage('eslint-plugin-jsdoc', 'recommended-tsdoc'),
  },
  {
    sourcePackage: 'eslint-plugin-jsx-a11y',
    sourceConfig: 'recommended',
    resolveRules: fromPluginPackage('eslint-plugin-jsx-a11y', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-jsx-a11y',
    sourceConfig: 'strict',
    resolveRules: fromPluginPackage('eslint-plugin-jsx-a11y', 'strict'),
  },

  // ── n / promise / jest / vitest ──────────────────────────────────────────
  {
    sourcePackage: 'eslint-plugin-n',
    sourceConfig: 'recommended',
    resolveRules: fromPluginPackage('eslint-plugin-n', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-n',
    sourceConfig: 'recommended-module',
    resolveRules: fromPluginPackage('eslint-plugin-n', 'recommended-module'),
  },
  {
    sourcePackage: 'eslint-plugin-n',
    sourceConfig: 'recommended-script',
    resolveRules: fromPluginPackage('eslint-plugin-n', 'recommended-script'),
  },
  {
    sourcePackage: 'eslint-plugin-promise',
    sourceConfig: 'recommended',
    resolveRules: fromPluginPackage('eslint-plugin-promise', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-jest',
    sourceConfig: 'recommended',
    resolveRules: fromPluginPackage('eslint-plugin-jest', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-jest',
    sourceConfig: 'style',
    resolveRules: fromPluginPackage('eslint-plugin-jest', 'style'),
  },
  {
    sourcePackage: 'eslint-plugin-jest',
    sourceConfig: 'all',
    resolveRules: fromPluginPackage('eslint-plugin-jest', 'all'),
  },
  {
    sourcePackage: '@vitest/eslint-plugin',
    sourceConfig: 'recommended',
    resolveRules: fromPluginPackage('@vitest/eslint-plugin', 'recommended'),
  },
  {
    sourcePackage: '@vitest/eslint-plugin',
    sourceConfig: 'all',
    resolveRules: fromPluginPackage('@vitest/eslint-plugin', 'all'),
  },

  // ── vue ───────────────────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'essential',
    resolveRules: fromPluginPackage('eslint-plugin-vue', 'essential'),
  },
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'strongly-recommended',
    resolveRules: fromPluginPackage('eslint-plugin-vue', 'strongly-recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'recommended',
    resolveRules: fromPluginPackage('eslint-plugin-vue', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'vue2-essential',
    resolveRules: fromPluginPackage('eslint-plugin-vue', 'vue2-essential'),
  },
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'vue2-strongly-recommended',
    resolveRules: fromPluginPackage('eslint-plugin-vue', 'vue2-strongly-recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'vue2-recommended',
    resolveRules: fromPluginPackage('eslint-plugin-vue', 'vue2-recommended'),
  },
];

interface GenerateResult {
  config: ConfigEntry;
  oxlintResult: OxlintConfig;
  skipped: SkippedRulesByCategory;
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
  const eslintConfig: MigrateConfig = {
    rules,
  };

  const oxlintResult = await migrate(eslintConfig, undefined, {
    reporter,
    withNursery: true,
    typeAware: true,
  });

  // Remove fields that are identical in every generated config and add no value
  // when the config is used via extends.
  delete oxlintResult.$schema;
  delete oxlintResult.categories;
  delete oxlintResult.env;

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
    const badRules = [...output.matchAll(/Invalid configuration for rule `([^`]+)`/g)].map((m) =>
      m[1].replace(/_/g, '-'),
    );

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

// ---- Build README.md --------------------------------------------------------

const CATEGORY_LABELS: Record<string, string> = {
  'not-implemented': 'Not yet implemented in oxlint',
  unsupported: 'Not portable to oxlint',
  nursery: 'Available as nursery rules (experimental, opt-in)',
  'type-aware': 'Require type-aware linting',
  'js-plugins': 'Require JS plugin support',
};

function skippedSection(skipped: SkippedRulesByCategory): string {
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

const rootReadme = readFileSync(readmePath, 'utf-8').trimEnd();

const tableRows = results
  .map(
    ({ config }) =>
      `| \`${config.sourcePackage}\` | ${config.sourceConfig ? `\`${config.sourceConfig}\`` : ''} | \`${outputFor(config)}\` |`,
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
    const extendsExample =
      `\`\`\`json\n` + `"./node_modules/oxlint-config-presets/${outputFor(config)}"\n` + `\`\`\``;
    const parts: string[] = [`### \`${outputFor(config)}\``, extendsExample];

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

const generatedSection = table + '\n\n' + configSections;
const generatedBlock = `${generatedStartMarker}\n\n${generatedSection}\n\n${generatedEndMarker}`;

if (!rootReadme.includes(generatedStartMarker) || !rootReadme.includes(generatedEndMarker)) {
  throw new Error('README.md is missing generated section markers');
}

const updatedReadme =
  rootReadme.replace(
    new RegExp(`${generatedStartMarker}[\\s\\S]*${generatedEndMarker}`),
    generatedBlock,
  ) + '\n';

writeFileSync(readmePath, updatedReadme);
console.log('\nWritten README.md');

console.log('\nDone.');
