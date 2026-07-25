/**
 * Builds website/src/data/rules.json, plugins.json and configs.json.
 *
 * Cross-references the ESLint plugins that oxlint targets (the same set used by
 * oxc-project/oxc's tasks/lint_rules/src/eslint-rules.mjs) against:
 *   1. `oxlint --rules --format json`, the authoritative list of rules oxlint has
 *      implemented (mirrors tasks/lint_rules/src/oxlint-rules.mjs, but read straight
 *      from the compiled binary instead of parsing oxc's Rust source).
 *   2. `@oxlint/migrate`, to recover *why* a rule isn't migrated yet (nursery,
 *      type-aware, not-implemented, unsupported, js-plugins).
 *   3. The generated presets under packages/oxlint-config-presets/configs/**\/*.json,
 *      to know which presets enable/disable each rule and at what severity.
 *
 * Run with: pnpm collect-data
 */

import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import migrate from '@oxlint/migrate';

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteDir = resolve(__dirname, '..');
const monorepoRoot = resolve(websiteDir, '..');
const configsDir = join(monorepoRoot, 'packages/oxlint-config-presets/configs');
const dataDir = join(websiteDir, 'src/data');
const req = createRequire(join(monorepoRoot, 'package.json'));

interface RawRuleMeta {
  deprecated?: unknown;
  docs?: {
    description?: string;
    recommended?: unknown;
    url?: string;
  };
  type?: string;
  fixable?: string;
}

interface RawRule {
  meta?: RawRuleMeta;
}

interface RuleDict {
  [name: string]: RawRule;
}

interface PluginDef {
  /** Bucket id, used as the URL slug and grouping key. */
  id: string;
  label: string;
  /** Prefix for this plugin's rules as they'd appear when configured in ESLint (source id fed to @oxlint/migrate). */
  sourcePrefix: string;
  /** Prefix used for this plugin's rules in the generated oxlint-config-presets config files. */
  configPrefix: string;
  /** Scope name reported by `oxlint --rules --format json`. */
  oxlintScope: string;
  /** Loads the full { ruleName: rule } dictionary for this plugin (merging multiple source packages if needed). */
  loadRules: () => RuleDict | Promise<RuleDict>;
  /** Builds a docs URL for a rule in the *source* ESLint plugin (best-effort). */
  docsUrl: (name: string) => string;
  sourcePackages: string[];
}

function cjsRules(pkg: string): RuleDict {
  const mod = req(pkg) as { rules?: RuleDict; default?: { rules?: RuleDict } };
  return mod.rules ?? mod.default?.rules ?? {};
}

async function esmRules(pkg: string): Promise<RuleDict> {
  const mod = (await import(pkg)) as { rules?: RuleDict; default?: { rules?: RuleDict } };
  return mod.rules ?? mod.default?.rules ?? {};
}

function mergeRuleDicts(...dicts: RuleDict[]): RuleDict {
  const merged: RuleDict = {};
  for (const dict of dicts) Object.assign(merged, dict);
  return merged;
}

function eslintCoreRules(): RuleDict {
  const { builtinRules } = req('eslint/use-at-your-own-risk') as { builtinRules: Map<string, RawRule> };
  const dict: RuleDict = {};
  for (const [name, rule] of builtinRules) dict[name] = rule;
  return dict;
}

const plugins: PluginDef[] = [
  {
    id: 'eslint',
    label: 'ESLint core',
    sourcePrefix: '',
    configPrefix: '',
    oxlintScope: 'eslint',
    loadRules: eslintCoreRules,
    docsUrl: (name) => `https://eslint.org/docs/latest/rules/${name}`,
    sourcePackages: ['eslint'],
  },
  {
    id: 'typescript',
    label: 'typescript-eslint',
    sourcePrefix: '@typescript-eslint/',
    configPrefix: 'typescript/',
    oxlintScope: 'typescript',
    loadRules: () => cjsRules('@typescript-eslint/eslint-plugin'),
    docsUrl: (name) => `https://typescript-eslint.io/rules/${name}/`,
    sourcePackages: ['@typescript-eslint/eslint-plugin'],
  },
  {
    id: 'unicorn',
    label: 'Unicorn',
    sourcePrefix: 'unicorn/',
    configPrefix: 'unicorn/',
    oxlintScope: 'unicorn',
    loadRules: () => esmRules('eslint-plugin-unicorn'),
    docsUrl: (name) => `https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/${name}.md`,
    sourcePackages: ['eslint-plugin-unicorn'],
  },
  {
    id: 'react',
    label: 'React',
    sourcePrefix: 'react/',
    configPrefix: 'react/',
    oxlintScope: 'react',
    loadRules: () => mergeRuleDicts(cjsRules('eslint-plugin-react'), cjsRules('eslint-plugin-react-hooks')),
    docsUrl: (name) => `https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/${name}.md`,
    sourcePackages: ['eslint-plugin-react', 'eslint-plugin-react-hooks'],
  },
  {
    id: 'import',
    label: 'Import',
    sourcePrefix: 'import/',
    configPrefix: 'import/',
    oxlintScope: 'import',
    loadRules: () => mergeRuleDicts(cjsRules('eslint-plugin-import'), cjsRules('eslint-plugin-import-x')),
    docsUrl: (name) => `https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/${name}.md`,
    sourcePackages: ['eslint-plugin-import', 'eslint-plugin-import-x'],
  },
  {
    id: 'jsdoc',
    label: 'JSDoc',
    sourcePrefix: 'jsdoc/',
    configPrefix: 'jsdoc/',
    oxlintScope: 'jsdoc',
    loadRules: () => esmRules('eslint-plugin-jsdoc'),
    docsUrl: (name) => `https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/${name}.md`,
    sourcePackages: ['eslint-plugin-jsdoc'],
  },
  {
    id: 'jest',
    label: 'Jest',
    sourcePrefix: 'jest/',
    configPrefix: 'jest/',
    oxlintScope: 'jest',
    loadRules: () => cjsRules('eslint-plugin-jest'),
    docsUrl: (name) => `https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/${name}.md`,
    sourcePackages: ['eslint-plugin-jest'],
  },
  {
    id: 'vitest',
    label: 'Vitest',
    sourcePrefix: 'vitest/',
    configPrefix: 'vitest/',
    oxlintScope: 'vitest',
    loadRules: () => esmRules('@vitest/eslint-plugin'),
    docsUrl: () => `https://github.com/vitest-dev/vitest/tree/main/packages/eslint-plugin`,
    sourcePackages: ['@vitest/eslint-plugin'],
  },
  {
    id: 'jsx-a11y',
    label: 'JSX A11y',
    sourcePrefix: 'jsx-a11y/',
    configPrefix: 'jsx-a11y/',
    oxlintScope: 'jsx_a11y',
    loadRules: () => cjsRules('eslint-plugin-jsx-a11y'),
    docsUrl: (name) => `https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/${name}.md`,
    sourcePackages: ['eslint-plugin-jsx-a11y'],
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    sourcePrefix: '@next/next/',
    configPrefix: 'nextjs/',
    oxlintScope: 'nextjs',
    loadRules: () => cjsRules('@next/eslint-plugin-next'),
    docsUrl: (name) => `https://nextjs.org/docs/messages/${name}`,
    sourcePackages: ['@next/eslint-plugin-next'],
  },
  {
    id: 'react-perf',
    label: 'React Perf',
    sourcePrefix: 'react-perf/',
    configPrefix: 'react-perf/',
    oxlintScope: 'react_perf',
    loadRules: () => cjsRules('eslint-plugin-react-perf'),
    docsUrl: () => `https://github.com/cvazac/eslint-plugin-react-perf`,
    sourcePackages: ['eslint-plugin-react-perf'],
  },
  {
    id: 'promise',
    label: 'Promise',
    sourcePrefix: 'promise/',
    configPrefix: 'promise/',
    oxlintScope: 'promise',
    loadRules: () => cjsRules('eslint-plugin-promise'),
    docsUrl: (name) => `https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/${name}.md`,
    sourcePackages: ['eslint-plugin-promise'],
  },
  {
    id: 'node',
    label: 'Node (n)',
    sourcePrefix: 'n/',
    configPrefix: 'node/',
    oxlintScope: 'node',
    loadRules: () => cjsRules('eslint-plugin-n'),
    docsUrl: (name) => `https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/${name}.md`,
    sourcePackages: ['eslint-plugin-n'],
  },
  {
    id: 'vue',
    label: 'Vue',
    sourcePrefix: 'vue/',
    configPrefix: 'vue/',
    oxlintScope: 'vue',
    loadRules: () => cjsRules('eslint-plugin-vue'),
    docsUrl: (name) => `https://eslint.vuejs.org/rules/${name}.html`,
    sourcePackages: ['eslint-plugin-vue'],
  },
];

// ---- 1. Ground truth: rules oxlint has actually implemented -----------------

interface OxlintCliRule {
  scope: string;
  value: string;
  category: string;
  type_aware: boolean;
  fix: string;
  default: boolean;
  docs_url: string;
}

function loadOxlintCliRules(): OxlintCliRule[] {
  const oxlintBin = join(monorepoRoot, 'node_modules/.bin/oxlint');
  const result = spawnSync(oxlintBin, ['--rules', '--format', 'json'], { encoding: 'utf-8' });
  if (result.status !== 0 && !result.stdout) {
    throw new Error(`Failed to run oxlint --rules: ${result.stderr}`);
  }
  return JSON.parse(result.stdout) as OxlintCliRule[];
}

const oxlintVersion = (
  JSON.parse(readFileSync(join(monorepoRoot, 'node_modules/oxlint/package.json'), 'utf-8')) as {
    version: string;
  }
).version;

const oxlintCliRules = loadOxlintCliRules();
const implementedByScope = new Map<string, Map<string, OxlintCliRule>>();
for (const rule of oxlintCliRules) {
  if (!implementedByScope.has(rule.scope)) implementedByScope.set(rule.scope, new Map());
  implementedByScope.get(rule.scope)!.set(rule.value, rule);
}

// ---- 2. Skip reasons, via @oxlint/migrate ------------------------------------

type SkipCategory = 'nursery' | 'type-aware' | 'not-implemented' | 'unsupported' | 'js-plugins';

function createReporter() {
  const skipped = new Map<string, SkipCategory>();
  return {
    addWarning: () => {},
    markSkipped: (rule: string, category: SkipCategory) => {
      skipped.set(rule, category);
    },
    removeSkipped: (rule: string) => {
      skipped.delete(rule);
    },
    getSkipped: () => skipped,
  };
}

// ---- 3. Which generated presets enable/disable each rule ---------------------

interface PresetRuleEntry {
  config: string;
  severity: string;
}

function walkJsonFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...walkJsonFiles(full));
    else if (entry.endsWith('.json')) out.push(full);
  }
  return out;
}

const presetFiles = walkJsonFiles(configsDir);
const presetsByRuleKey = new Map<string, PresetRuleEntry[]>();
const configSummaries: { path: string; ruleCount: number }[] = [];

for (const file of presetFiles) {
  const relPath = relative(configsDir, file);
  const parsed = JSON.parse(readFileSync(file, 'utf-8')) as { rules?: Record<string, unknown> };
  const rules = parsed.rules ?? {};
  configSummaries.push({ path: relPath, ruleCount: Object.keys(rules).length });
  for (const [key, value] of Object.entries(rules)) {
    const severity = Array.isArray(value) ? String(value[0]) : String(value);
    if (!presetsByRuleKey.has(key)) presetsByRuleKey.set(key, []);
    presetsByRuleKey.get(key)!.push({ config: relPath, severity });
  }
}

// ---- 4. Build the full rule registry -----------------------------------------

function normalizeRecommended(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.length > 0;
  return false;
}

function normalizeDeprecated(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (value && typeof value === 'object') return true;
  return false;
}

interface OutputRule {
  id: string;
  plugin: string;
  pluginLabel: string;
  name: string;
  eslint: {
    deprecated: boolean;
    recommended: boolean;
    description: string | null;
    docsUrl: string | null;
    type: string | null;
    fixable: boolean;
  };
  oxlint: {
    migrated: boolean;
    category: string | null;
    default: boolean | null;
    fix: string | null;
    docsUrl: string | null;
    skipReason: SkipCategory | null;
  };
  presets: PresetRuleEntry[];
}

const reporter = createReporter();
const migrateInputs: { rules: Record<string, string> } = { rules: {} };
const allOutputRules: OutputRule[] = [];
const pluginRuleCounts: Record<
  string,
  { label: string; total: number; migrated: number; deprecated: number }
> = {};

for (const plugin of plugins) {
  const ruleDict = await plugin.loadRules();
  const ruleNames = Object.keys(ruleDict).sort((a, b) => a.localeCompare(b));
  pluginRuleCounts[plugin.id] = { label: plugin.label, total: 0, migrated: 0, deprecated: 0 };

  for (const name of ruleNames) {
    const rule = ruleDict[name];
    const meta = rule.meta ?? {};
    const sourceId = `${plugin.sourcePrefix}${name}`;
    migrateInputs.rules[sourceId] = 'error';

    const implementedEntry =
      implementedByScope.get(plugin.oxlintScope)?.get(name) ??
      // typescript-eslint "extension rules" (no-unused-vars, no-shadow, ...) are covered by
      // oxlint's type-aware core `eslint` rule of the same bare name.
      (plugin.id === 'typescript' ? implementedByScope.get('eslint')?.get(name) : undefined);

    const configKeyCandidates =
      plugin.id === 'typescript'
        ? [`${plugin.configPrefix}${name}`, name]
        : [`${plugin.configPrefix}${name}`];

    const presets = configKeyCandidates.flatMap((key) => presetsByRuleKey.get(key) ?? []);

    const outputRule: OutputRule = {
      id: `${plugin.id}__${name}`,
      plugin: plugin.id,
      pluginLabel: plugin.label,
      name,
      eslint: {
        deprecated: normalizeDeprecated(meta.deprecated),
        recommended: normalizeRecommended(meta.docs?.recommended),
        description: meta.docs?.description ?? null,
        docsUrl: plugin.docsUrl(name),
        type: meta.type ?? null,
        fixable: Boolean(meta.fixable),
      },
      oxlint: {
        migrated: Boolean(implementedEntry) || presets.length > 0,
        category: implementedEntry?.category ?? null,
        default: implementedEntry?.default ?? null,
        fix: implementedEntry?.fix ?? null,
        docsUrl: implementedEntry?.docs_url ?? null,
        skipReason: null,
      },
      presets,
    };

    allOutputRules.push(outputRule);
    pluginRuleCounts[plugin.id].total++;
    if (outputRule.oxlint.migrated) pluginRuleCounts[plugin.id].migrated++;
    if (outputRule.eslint.deprecated) pluginRuleCounts[plugin.id].deprecated++;
  }
}

console.log(`Resolved ${allOutputRules.length} ESLint rules across ${plugins.length} plugins.`);
console.log('Running @oxlint/migrate to recover skip reasons...');

const migrateResult = await migrate([migrateInputs], undefined, {
  reporter: reporter as unknown as Parameters<typeof migrate>[2] extends { reporter?: infer R } ? R : never,
  withNursery: true,
  typeAware: true,
});
void migrateResult;

const skipped = reporter.getSkipped();
for (const rule of allOutputRules) {
  if (rule.oxlint.migrated) continue;
  const plugin = plugins.find((p) => p.id === rule.plugin)!;
  const sourceId = `${plugin.sourcePrefix}${rule.name}`;
  rule.oxlint.skipReason = skipped.get(sourceId) ?? 'not-implemented';
}

// ---- 5. Write output ----------------------------------------------------------

const totalRules = allOutputRules.length;
const totalMigrated = allOutputRules.filter((r) => r.oxlint.migrated).length;

writeFileSync(join(dataDir, 'rules.json'), JSON.stringify(allOutputRules));
writeFileSync(
  join(dataDir, 'plugins.json'),
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    oxlintVersion,
    totalRules,
    totalMigrated,
    plugins: plugins.map((p) => ({
      id: p.id,
      oxlintScope: p.oxlintScope,
      sourcePackages: p.sourcePackages,
      ...pluginRuleCounts[p.id],
    })),
  }),
);
writeFileSync(
  join(dataDir, 'configs.json'),
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    configs: configSummaries.sort((a, b) => a.path.localeCompare(b.path)),
  }),
);

console.log(
  `Done. ${totalMigrated}/${totalRules} rules migrated (${((totalMigrated / totalRules) * 100).toFixed(1)}%).`,
);
console.log(`Written to ${relative(monorepoRoot, dataDir)}/{rules,plugins,configs}.json`);
