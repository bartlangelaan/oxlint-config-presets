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
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
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

interface FlatCompatOptions {
  baseDirectory?: string;
  resolvePluginsRelativeTo?: string;
  recommendedConfig?: unknown;
  allConfig?: unknown;
}

interface FlatCompatLike {
  config(config: unknown): unknown[];
}

type FlatCompatCtor = new (options?: FlatCompatOptions) => FlatCompatLike;
const { FlatCompat } = req('@eslint/eslintrc') as { FlatCompat: FlatCompatCtor };

interface OldStyleEslintConfig {
  extends?: string | string[];
  plugins?: string[];
  rules?: ResolvedRules;
  env?: Record<string, boolean>;
  settings?: Record<string, unknown>;
  parserOptions?: Record<string, unknown>;
  overrides?: OldStyleEslintConfig[];
}

const eslintJs = req('@eslint/js') as {
  configs: { recommended: { rules: ResolvedRules }; all: { rules: ResolvedRules } };
};

const compatByBaseDir = new Map<string, FlatCompatLike>();

function getFlatCompat(baseDirectory: string): FlatCompatLike {
  const cached = compatByBaseDir.get(baseDirectory);
  if (cached) return cached;

  const compat = new FlatCompat({
    baseDirectory,
    recommendedConfig: { rules: eslintJs.configs.recommended.rules },
    allConfig: { rules: eslintJs.configs.all.rules },
  });
  compatByBaseDir.set(baseDirectory, compat);
  return compat;
}

function oldStyleToFlat(config: OldStyleEslintConfig, baseDirectory: string): MigrateConfig[] {
  return getFlatCompat(baseDirectory).config(config) as MigrateConfig[];
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

function countRules(config: MigrateConfig | MigrateConfig[]): number {
  const entries = Array.isArray(config) ? config : [config];
  return entries.reduce((sum, entry) => sum + Object.keys(entry.rules ?? {}).length, 0);
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
  /** Optional package name used only for version reporting in README. */
  sourceVersionPackage?: string;
  /** config variant within the package, e.g. 'base'; empty string for the main export */
  sourceConfig: string;
  /** Returns an ESLint flat config (or array) to migrate */
  resolveConfig: () => MigrateConfig | MigrateConfig[];
}

interface ConfigEntryWithVersion extends ConfigEntry {
  sourcePackageVersion: string;
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

const packageVersionCache = new Map<string, string>();
const lockfilePath = join(rootDir, 'pnpm-lock.yaml');
const lockfileContent = existsSync(lockfilePath) ? readFileSync(lockfilePath, 'utf-8') : '';

function escapeForRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getVersionFromPnpmLock(pkg: string): string | null {
  if (!lockfileContent) return null;
  const escapedPkg = escapeForRegex(pkg);
  const directEntryPattern = new RegExp(`^\\s{2}'?${escapedPkg}@([^:(\\s']+)'?:$`, 'm');
  const directMatch = lockfileContent.match(directEntryPattern);
  if (directMatch) return directMatch[1];

  const peerEntryPattern = new RegExp(`^\\s{2}'?${escapedPkg}@([^:(\\s']+)\\(`, 'm');
  const peerMatch = lockfileContent.match(peerEntryPattern);
  if (peerMatch) return peerMatch[1];
  return null;
}

function getInstalledPackageVersion(pkg: string): string {
  const cached = packageVersionCache.get(pkg);
  if (cached) return cached;

  const readVersion = (packageJsonPath: string): string | null => {
    try {
      const pkgJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as { version?: unknown };
      return typeof pkgJson.version === 'string' ? pkgJson.version : null;
    } catch {
      return null;
    }
  };

  const version = (() => {
    try {
      const pkgJsonPath = req.resolve(`${pkg}/package.json`);
      return readVersion(pkgJsonPath) ?? 'unknown';
    } catch {
      try {
        const entryPath = req.resolve(pkg);
        let currentDir = dirname(entryPath);
        const rootDirPath = resolve(currentDir, '/');

        while (currentDir !== rootDirPath) {
          const packageJsonPath = join(currentDir, 'package.json');
          if (existsSync(packageJsonPath)) {
            return readVersion(packageJsonPath) ?? 'unknown';
          }
          currentDir = dirname(currentDir);
        }
      } catch {
        // Ignore and fall back to unknown.
      }
      const versionFromLockfile = getVersionFromPnpmLock(pkg);
      if (versionFromLockfile) return versionFromLockfile;
      return 'unknown';
    }
  })();

  packageVersionCache.set(pkg, version);
  return version;
}

// Shorthand for old-style shareable configs resolved via flattenRules.
const fromPackage = (pkg: string) => () => {
  const configPath = req.resolve(pkg);
  const config = req(configPath) as OldStyleEslintConfig;
  return oldStyleToFlat(config, dirname(configPath));
};

// @typescript-eslint uses flat config arrays in `configs.flat/*`.
const tsEslint = req('@typescript-eslint/eslint-plugin') as {
  configs: Record<string, Array<{ rules?: ResolvedRules }> | { rules?: ResolvedRules }>;
};

const fromTsEslint =
  (name: string): (() => MigrateConfig[]) =>
  () => {
    const cfg = tsEslint.configs[name];
    return (Array.isArray(cfg) ? cfg : [cfg]) as MigrateConfig[];
  };

function isOldStyleConfig(entry: unknown): entry is OldStyleEslintConfig {
  if (!entry || typeof entry !== 'object') return false;
  const maybe = entry as OldStyleEslintConfig;
  return (
    maybe.extends !== undefined ||
    maybe.overrides !== undefined ||
    maybe.env !== undefined ||
    maybe.parserOptions !== undefined ||
    maybe.settings !== undefined
  );
}

// Plugin packages can expose old-style object configs and/or flat config entries.
const fromPluginPackage = (pkg: string, name: string) => () => {
  const mod = req(pkg) as {
    configs?: Record<string, OldStyleEslintConfig | Array<{ rules?: ResolvedRules }>>;
  };
  const cfg = mod.configs?.[name];
  if (!cfg) return [];

  const entries = (Array.isArray(cfg) ? cfg : [cfg]) as Array<OldStyleEslintConfig | MigrateConfig>;
  const flat: MigrateConfig[] = [];

  for (const entry of entries) {
    if (isOldStyleConfig(entry)) {
      flat.push({ rules: mergeRulesFromConfigObject(entry) });
      continue;
    }
    flat.push(entry);
  }

  return flat;
};

// eslint-config-xo uses flat config (ESM function returning an array of config objects).
// We merge all rules from the returned entries to get the full effective rule set.
const xoModule = await import('eslint-config-xo');
const xoFn = xoModule.default as () => Array<{ rules?: ResolvedRules }>;
const fromXo = () => {
  return xoFn() as MigrateConfig[];
};

// eslint-config-problems exposes a plain flat config object with a `rules` property.
const problemsConfig = req('eslint-config-problems') as { rules: ResolvedRules };

// eslint-config-eslint (ESLint team's own config) uses flat config arrays loadable via require.
type FlatConfigArray = Array<{ rules?: ResolvedRules }>;
const fromFlatArray = (pkg: string) => () => {
  const entries = req(pkg) as FlatConfigArray | { rules?: ResolvedRules };
  return (Array.isArray(entries) ? entries : [entries]) as MigrateConfig[];
};

// eslint-config-prettier disables all formatting rules that conflict with Prettier.
const prettierConfig = req('eslint-config-prettier') as { rules: ResolvedRules };

// @antfu/eslint-config is an async ESM factory function returning a flat config array.
const antfuModule = await import('@antfu/eslint-config');
const antfuEntries = await (antfuModule.default as () => Promise<FlatConfigArray>)();
const fromAntfu = () => antfuEntries as MigrateConfig[];

const configs: ConfigEntry[] = [
  // ── @typescript-eslint ────────────────────────────────────────────────────
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'recommended',
    resolveConfig: fromTsEslint('flat/recommended'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'recommended-type-checked',
    resolveConfig: fromTsEslint('flat/recommended-type-checked'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'strict',
    resolveConfig: fromTsEslint('flat/strict'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'strict-type-checked',
    resolveConfig: fromTsEslint('flat/strict-type-checked'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'stylistic',
    resolveConfig: fromTsEslint('flat/stylistic'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'stylistic-type-checked',
    resolveConfig: fromTsEslint('flat/stylistic-type-checked'),
  },
  {
    sourcePackage: '@typescript-eslint/eslint-plugin',
    sourceConfig: 'all',
    resolveConfig: fromTsEslint('flat/all'),
  },

  // ── standard / google ─────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-standard',
    sourceConfig: '',
    resolveConfig: fromPackage('eslint-config-standard'),
  },
  {
    sourcePackage: 'eslint-config-google',
    sourceConfig: '',
    resolveConfig: fromPackage('eslint-config-google'),
  },

  // ── airbnb ────────────────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-airbnb',
    sourceConfig: '',
    resolveConfig: fromPackage('eslint-config-airbnb'),
  },
  {
    sourcePackage: 'eslint-config-airbnb',
    sourceConfig: 'base',
    resolveConfig: fromPackage('eslint-config-airbnb/base'),
  },
  {
    sourcePackage: 'eslint-config-airbnb',
    sourceConfig: 'hooks',
    resolveConfig: fromPackage('eslint-config-airbnb/hooks'),
  },
  {
    sourcePackage: 'eslint-config-airbnb',
    sourceConfig: 'legacy',
    resolveConfig: fromPackage('eslint-config-airbnb/legacy'),
  },
  {
    sourcePackage: 'eslint-config-airbnb',
    sourceConfig: 'whitespace',
    resolveConfig: fromPackage('eslint-config-airbnb/whitespace'),
  },

  // ── @eslint/js ────────────────────────────────────────────────────────────
  {
    sourcePackage: '@eslint/js',
    sourceConfig: 'recommended',
    resolveConfig: () => [eslintJs.configs.recommended as MigrateConfig],
  },
  {
    sourcePackage: '@eslint/js',
    sourceConfig: 'all',
    resolveConfig: () => [eslintJs.configs.all as MigrateConfig],
  },

  // ── xo / problems / hardcore / wikimedia ──────────────────────────────────
  { sourcePackage: 'eslint-config-xo', sourceConfig: '', resolveConfig: fromXo },
  {
    sourcePackage: 'eslint-config-problems',
    sourceConfig: '',
    resolveConfig: () => [problemsConfig as MigrateConfig],
  },
  {
    sourcePackage: 'eslint-config-hardcore',
    sourceConfig: '',
    resolveConfig: fromPackage('eslint-config-hardcore'),
  },
  {
    sourcePackage: 'eslint-config-wikimedia',
    sourceConfig: '',
    resolveConfig: fromPackage('eslint-config-wikimedia'),
  },

  // ── eslint-team ───────────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-eslint',
    sourceConfig: '',
    resolveConfig: fromFlatArray('eslint-config-eslint'),
  },
  {
    sourcePackage: 'eslint-config-eslint',
    sourceConfig: 'base',
    resolveConfig: fromFlatArray('eslint-config-eslint/base'),
  },

  // ── alloy ─────────────────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-alloy',
    sourceConfig: '',
    resolveConfig: fromPackage('eslint-config-alloy'),
  },
  {
    sourcePackage: 'eslint-config-alloy',
    sourceConfig: 'react',
    resolveConfig: fromPackage('eslint-config-alloy/react'),
  },
  {
    sourcePackage: 'eslint-config-alloy',
    sourceConfig: 'typescript',
    resolveConfig: fromPackage('eslint-config-alloy/typescript'),
  },

  // ── prettier / antfu ──────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-prettier',
    sourceConfig: '',
    resolveConfig: () => [prettierConfig as MigrateConfig],
  },
  { sourcePackage: '@antfu/eslint-config', sourceConfig: '', resolveConfig: fromAntfu },

  // ── import / import-x ─────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-plugin-import',
    sourceConfig: 'recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-import', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-import',
    sourceConfig: 'errors',
    resolveConfig: fromPluginPackage('eslint-plugin-import', 'errors'),
  },
  {
    sourcePackage: 'eslint-plugin-import',
    sourceConfig: 'warnings',
    resolveConfig: fromPluginPackage('eslint-plugin-import', 'warnings'),
  },
  {
    sourcePackage: 'eslint-plugin-import',
    sourceConfig: 'react',
    resolveConfig: fromPluginPackage('eslint-plugin-import', 'react'),
  },
  {
    sourcePackage: 'eslint-plugin-import',
    sourceConfig: 'typescript',
    resolveConfig: fromPluginPackage('eslint-plugin-import', 'typescript'),
  },
  {
    sourcePackage: 'eslint-plugin-import-x',
    sourceConfig: 'recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-import-x', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-import-x',
    sourceConfig: 'errors',
    resolveConfig: fromPluginPackage('eslint-plugin-import-x', 'errors'),
  },
  {
    sourcePackage: 'eslint-plugin-import-x',
    sourceConfig: 'warnings',
    resolveConfig: fromPluginPackage('eslint-plugin-import-x', 'warnings'),
  },
  {
    sourcePackage: 'eslint-plugin-import-x',
    sourceConfig: 'react',
    resolveConfig: fromPluginPackage('eslint-plugin-import-x', 'react'),
  },
  {
    sourcePackage: 'eslint-plugin-import-x',
    sourceConfig: 'typescript',
    resolveConfig: fromPluginPackage('eslint-plugin-import-x', 'typescript'),
  },

  // ── next / react-perf ─────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-config-next',
    sourceVersionPackage: '@next/eslint-plugin-next',
    sourceConfig: 'recommended',
    resolveConfig: fromPluginPackage('@next/eslint-plugin-next', 'recommended'),
  },
  {
    sourcePackage: 'eslint-config-next',
    sourceVersionPackage: '@next/eslint-plugin-next',
    sourceConfig: 'core-web-vitals',
    resolveConfig: fromPluginPackage('@next/eslint-plugin-next', 'core-web-vitals'),
  },
  {
    sourcePackage: 'eslint-plugin-react-perf',
    sourceConfig: 'recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-react-perf', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-react-perf',
    sourceConfig: 'all',
    resolveConfig: fromPluginPackage('eslint-plugin-react-perf', 'all'),
  },

  // ── jsdoc / jsx-a11y ──────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-plugin-jsdoc',
    sourceConfig: 'recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-jsdoc', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-jsdoc',
    sourceConfig: 'recommended-typescript',
    resolveConfig: fromPluginPackage('eslint-plugin-jsdoc', 'recommended-typescript'),
  },
  {
    sourcePackage: 'eslint-plugin-jsdoc',
    sourceConfig: 'recommended-typescript-flavor',
    resolveConfig: fromPluginPackage('eslint-plugin-jsdoc', 'recommended-typescript-flavor'),
  },
  {
    sourcePackage: 'eslint-plugin-jsdoc',
    sourceConfig: 'recommended-tsdoc',
    resolveConfig: fromPluginPackage('eslint-plugin-jsdoc', 'recommended-tsdoc'),
  },
  {
    sourcePackage: 'eslint-plugin-jsx-a11y',
    sourceConfig: 'recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-jsx-a11y', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-jsx-a11y',
    sourceConfig: 'strict',
    resolveConfig: fromPluginPackage('eslint-plugin-jsx-a11y', 'strict'),
  },

  // ── n / promise / jest / vitest ──────────────────────────────────────────
  {
    sourcePackage: 'eslint-plugin-n',
    sourceConfig: 'recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-n', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-n',
    sourceConfig: 'recommended-module',
    resolveConfig: fromPluginPackage('eslint-plugin-n', 'recommended-module'),
  },
  {
    sourcePackage: 'eslint-plugin-n',
    sourceConfig: 'recommended-script',
    resolveConfig: fromPluginPackage('eslint-plugin-n', 'recommended-script'),
  },
  {
    sourcePackage: 'eslint-plugin-promise',
    sourceConfig: 'recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-promise', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-jest',
    sourceConfig: 'recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-jest', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-jest',
    sourceConfig: 'style',
    resolveConfig: fromPluginPackage('eslint-plugin-jest', 'style'),
  },
  {
    sourcePackage: 'eslint-plugin-jest',
    sourceConfig: 'all',
    resolveConfig: fromPluginPackage('eslint-plugin-jest', 'all'),
  },
  {
    sourcePackage: '@vitest/eslint-plugin',
    sourceConfig: 'recommended',
    resolveConfig: fromPluginPackage('@vitest/eslint-plugin', 'recommended'),
  },
  {
    sourcePackage: '@vitest/eslint-plugin',
    sourceConfig: 'all',
    resolveConfig: fromPluginPackage('@vitest/eslint-plugin', 'all'),
  },

  // ── vue ───────────────────────────────────────────────────────────────────
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'essential',
    resolveConfig: fromPluginPackage('eslint-plugin-vue', 'essential'),
  },
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'strongly-recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-vue', 'strongly-recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-vue', 'recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'vue2-essential',
    resolveConfig: fromPluginPackage('eslint-plugin-vue', 'vue2-essential'),
  },
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'vue2-strongly-recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-vue', 'vue2-strongly-recommended'),
  },
  {
    sourcePackage: 'eslint-plugin-vue',
    sourceConfig: 'vue2-recommended',
    resolveConfig: fromPluginPackage('eslint-plugin-vue', 'vue2-recommended'),
  },
];

interface GenerateResult {
  config: ConfigEntryWithVersion;
  oxlintResult: OxlintConfig;
  skipped: SkippedRulesByCategory;
  strippedOptions: string[];
  warnings: string[];
}

function sanitizeOxlintConfig(config: OxlintConfig): void {
  if (Array.isArray(config.overrides)) {
    config.overrides = config.overrides
      .map((override) => {
        delete override.globals;

        if (Array.isArray(override.files)) {
          override.files = override.files.filter(
            (pattern): pattern is string => typeof pattern === 'string',
          );
        }
        return override;
      })
      .filter((override) => Array.isArray(override.files) && override.files.length > 0);

    if (config.overrides.length === 0) delete config.overrides;
  }
}

const results: GenerateResult[] = [];

for (const config of configs) {
  const label = oxlintConfigFor(config);
  console.log(`Generating ${label}...`);

  const eslintConfig = config.resolveConfig();
  console.log(`  Resolved ${countRules(eslintConfig)} rule entries, migrating...`);

  const reporter = createReporter();

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
  delete oxlintResult.globals;
  delete oxlintResult.ignorePatterns;
  sanitizeOxlintConfig(oxlintResult);

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
    config: {
      ...config,
      sourcePackageVersion: getInstalledPackageVersion(
        config.sourceVersionPackage ?? config.sourcePackage,
      ),
    },
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
const oxlintMigrateVersion = getInstalledPackageVersion('@oxlint/migrate');

const groupedConfigs = new Map<string, { sourceConfig?: string; output: string }[]>();

for (const { config } of results) {
  const entries = groupedConfigs.get(config.sourcePackage) ?? [];
  entries.push({
    sourceConfig: config.sourceConfig,
    output: outputFor(config),
  });
  groupedConfigs.set(config.sourcePackage, entries);
}

const availableConfigsList = [...groupedConfigs.entries()]
  .map(([sourcePackage, entries]) => {
    if (entries.length === 1 && !entries[0].sourceConfig) {
      return `- **${sourcePackage}** \`${entries[0].output}\``;
    }

    const variants = entries
      .map(({ sourceConfig, output }) => {
        const label = sourceConfig ? sourceConfig : '*(default)*';
        return `  - ${label} \`${output}\``;
      })
      .join('\n');

    return `- **${sourcePackage}**\n${variants}`;
  })
  .join('\n');

const table =
  `## Available configs\n\n` +
  availableConfigsList +
  `\n\n` +
  `Generated with \`@oxlint/migrate@${oxlintMigrateVersion}\`.`;

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

function formatNotableWarnings(warnings: string[]): string {
  const dedupedLines = new Set<string>();

  for (const warning of warnings) {
    if (warning.includes('import-sorting')) continue;

    const lines = warning
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    if (lines.length === 0) continue;

    const firstLine = lines[0];

    // Skip empty category headings like "Settings not migrated..." when no
    // concrete detail follows.
    if (lines.length === 1 && firstLine === 'Settings not migrated (not supported by oxlint):') {
      continue;
    }

    const detailLines =
      firstLine === 'Settings not migrated (not supported by oxlint):' ? lines.slice(1) : lines;

    for (const line of detailLines) {
      dedupedLines.add(line);
    }
  }

  if (dedupedLines.size === 0) return '';
  return [...dedupedLines].map((line) => `> ${line}`).join('\n');
}

const configSections = results
  .map(({ config, oxlintResult, skipped, strippedOptions, warnings }) => {
    const extendsExample =
      `\`\`\`json\n` + `"./node_modules/oxlint-config-presets/${outputFor(config)}"\n` + `\`\`\``;
    const sourceVersionInfo = `Extracted from \`${config.sourcePackage}@${config.sourcePackageVersion}\`.`;
    const parts: string[] = [`### \`${outputFor(config)}\``, extendsExample, sourceVersionInfo];

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

    const notableWarnings = formatNotableWarnings(warnings);
    if (notableWarnings) {
      parts.push(notableWarnings);
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
