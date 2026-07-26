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
  /**
   * Prefixes to try (in order) when looking up a rule's "why it's not portable"
   * explanation in @oxlint/migrate's internal unsupported-rules map, which uses
   * its own historical/ecosystem prefix convention rather than any one of ours.
   */
  explanationPrefixes: string[];
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
    explanationPrefixes: ['eslint/'],
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
    explanationPrefixes: ['typescript/', '@typescript-eslint/'],
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
    explanationPrefixes: ['unicorn/'],
  },
  {
    id: 'react',
    label: 'React',
    sourcePrefix: 'react/',
    configPrefix: 'react/',
    oxlintScope: 'react',
    loadRules: () =>
      mergeRuleDicts(
        cjsRules('eslint-plugin-react'),
        cjsRules('eslint-plugin-react-hooks'),
        cjsRules('eslint-plugin-react-refresh'),
      ),
    docsUrl: (name) =>
      name === 'only-export-components'
        ? 'https://github.com/ArnaudBarre/eslint-plugin-react-refresh#usage'
        : name === 'rules-of-hooks' || name === 'exhaustive-deps'
          ? 'https://react.dev/reference/rules/rules-of-hooks'
          : `https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/${name}.md`,
    sourcePackages: ['eslint-plugin-react', 'eslint-plugin-react-hooks', 'eslint-plugin-react-refresh'],
    explanationPrefixes: ['react/', 'react-hooks/', 'react-refresh/'],
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
    explanationPrefixes: ['import/', 'import-x/'],
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
    explanationPrefixes: ['jsdoc/'],
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
    explanationPrefixes: ['jest/'],
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
    explanationPrefixes: ['vitest/'],
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
    explanationPrefixes: ['jsx-a11y/'],
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
    explanationPrefixes: ['nextjs/', '@next/next/'],
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
    explanationPrefixes: ['react-perf/'],
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
    explanationPrefixes: ['promise/'],
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
    explanationPrefixes: ['n/', 'node/'],
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
    explanationPrefixes: ['vue/'],
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

// ---- 1b. Explanations for rules that will never be portable ------------------
//
// @oxlint/migrate decides "unsupported" (permanently not-portable) vs.
// "not-implemented" (still to do) using an internal `unsupportedRules` map of
// rule -> human-readable reason (e.g. "Superseded by strict mode.",
// "Use `typescript/dot-notation` instead, which we support as a type-aware
// rule."). It isn't part of the package's public API, so it's extracted by
// locating the object literal in the bundled source rather than importing it
// directly (its exported binding name is bundler-mangled and not stable
// across versions).
function loadUnsupportedExplanations(): Record<string, string> {
  try {
    const entryPath = fileURLToPath(import.meta.resolve('@oxlint/migrate'));
    const entrySrc = readFileSync(entryPath, 'utf-8');
    const importMatch = entrySrc.match(/from\s+["'](\.\.?\/[^"']+)["']/);
    if (!importMatch) return {};

    const chunkPath = resolve(dirname(entryPath), importMatch[1]);
    const chunkSrc = readFileSync(chunkPath, 'utf-8');
    const marker = 'var unsupportedRules = {';
    const markerIndex = chunkSrc.indexOf(marker);
    if (markerIndex === -1) return {};

    const braceStart = markerIndex + marker.length - 1;
    let depth = 0;
    let braceEnd = -1;
    for (let i = braceStart; i < chunkSrc.length; i++) {
      if (chunkSrc[i] === '{') depth++;
      else if (chunkSrc[i] === '}') {
        depth--;
        if (depth === 0) {
          braceEnd = i;
          break;
        }
      }
    }
    if (braceEnd === -1) return {};

    const objectText = chunkSrc.slice(braceStart, braceEnd + 1).replace(/,(\s*})/g, '$1');
    return JSON.parse(objectText) as Record<string, string>;
  } catch (error) {
    console.warn(`  [warn] Could not extract unsupported-rule explanations: ${String(error)}`);
    return {};
  }
}

const unsupportedExplanations = loadUnsupportedExplanations();
console.log(
  `Loaded ${Object.keys(unsupportedExplanations).length} "why this isn't portable" explanations.`,
);

function findExplanation(plugin: PluginDef, name: string): string | null {
  for (const prefix of plugin.explanationPrefixes) {
    const explanation = unsupportedExplanations[`${prefix}${name}`];
    if (explanation) return explanation;
  }
  return null;
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
  /** The raw options array configured after the severity, if any (e.g. [{ allowExportNames: [...] }]). */
  options: unknown[] | null;
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
    const options = Array.isArray(value) && value.length > 1 ? value.slice(1) : null;
    if (!presetsByRuleKey.has(key)) presetsByRuleKey.set(key, []);
    presetsByRuleKey.get(key)!.push({ config: relPath, severity, options });
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

/**
 * Four buckets, matching how the target for "full migration" should be read:
 *  - migrated: oxlint implements it today. The goal.
 *  - not-implemented: a valid rule oxlint hasn't ported yet. Part of the target.
 *  - needs-js-plugin: portable, but only via oxlint's JS plugin bridge rather
 *    than a native Rust port. Still part of the target, different mechanism.
 *  - not-portable: oxlint has decided this will never be ported (superseded,
 *    covered by a different rule, architecturally impossible, etc). EXCLUDED
 *    from the target — "fully migrated" never includes these.
 */
type MigrationStatus = 'migrated' | 'not-implemented' | 'needs-js-plugin' | 'not-portable';
type FixStatus = 'implemented' | 'planned' | 'none';

const GENERIC_REASON: Record<Exclude<MigrationStatus, 'migrated'>, string> = {
  'not-implemented': 'Recognized by oxlint but not implemented yet.',
  'needs-js-plugin':
    "Can be used today via oxlint's JS plugin bridge, but has no native Rust implementation yet.",
  'not-portable': "oxlint has no plan to port this rule; it won't count toward full migration.",
};

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
    migrationStatus: MigrationStatus;
    reason: string | null;
    category: string | null;
    nursery: boolean;
    typeAware: boolean;
    fixStatus: FixStatus | null;
    default: boolean | null;
    docsUrl: string | null;
    /** True for rules native to oxlint with no ESLint equivalent (the `oxc` scope). */
    original: boolean;
    /** Canonical "<prefix>/<name>" key for this rule in an .oxlintrc.json `rules` object. */
    configKey: string;
  };
  presets: PresetRuleEntry[];
}

interface Stats {
  label: string;
  total: number;
  migrated: number;
  notImplemented: number;
  needsJsPlugin: number;
  notPortable: number;
  eligible: number;
  nursery: number;
  typeAware: number;
  fixImplemented: number;
  fixPlanned: number;
  fixNone: number;
  deprecated: number;
}

function emptyStats(label: string): Stats {
  return {
    label,
    total: 0,
    migrated: 0,
    notImplemented: 0,
    needsJsPlugin: 0,
    notPortable: 0,
    eligible: 0,
    nursery: 0,
    typeAware: 0,
    fixImplemented: 0,
    fixPlanned: 0,
    fixNone: 0,
    deprecated: 0,
  };
}

function addToStats(stats: Stats, rule: OutputRule): void {
  stats.total++;
  if (rule.eslint.deprecated) stats.deprecated++;
  if (rule.oxlint.nursery) stats.nursery++;
  if (rule.oxlint.typeAware) stats.typeAware++;
  if (rule.oxlint.fixStatus === 'implemented') stats.fixImplemented++;
  else if (rule.oxlint.fixStatus === 'planned') stats.fixPlanned++;
  else if (rule.oxlint.fixStatus === 'none') stats.fixNone++;

  switch (rule.oxlint.migrationStatus) {
    case 'migrated':
      stats.migrated++;
      break;
    case 'not-implemented':
      stats.notImplemented++;
      break;
    case 'needs-js-plugin':
      stats.needsJsPlugin++;
      break;
    case 'not-portable':
      stats.notPortable++;
      break;
  }
  stats.eligible = stats.total - stats.notPortable;
}

function fixStatusFor(fix: string | undefined): FixStatus {
  if (!fix || fix === 'none') return 'none';
  if (fix === 'pending') return 'planned';
  return 'implemented';
}

const reporter = createReporter();
const migrateInputs: { rules: Record<string, string> } = { rules: {} };
const allOutputRules: OutputRule[] = [];

for (const plugin of plugins) {
  const ruleDict = await plugin.loadRules();
  const ruleNames = Object.keys(ruleDict).sort((a, b) => a.localeCompare(b));

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
    const migrated = Boolean(implementedEntry) || presets.length > 0;

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
        // Placeholder for rules not yet migrated; resolved to a specific
        // status below once @oxlint/migrate's skip reasons are available.
        migrationStatus: migrated ? 'migrated' : 'not-implemented',
        reason: null,
        category: implementedEntry?.category ?? null,
        nursery: implementedEntry?.category === 'nursery',
        typeAware: implementedEntry?.type_aware ?? false,
        fixStatus: migrated ? fixStatusFor(implementedEntry?.fix) : null,
        default: implementedEntry?.default ?? null,
        docsUrl: implementedEntry?.docs_url ?? null,
        original: false,
        configKey: `${plugin.configPrefix}${name}`,
      },
      presets,
    };

    allOutputRules.push(outputRule);
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
const pluginById = new Map(plugins.map((p) => [p.id, p]));

for (const rule of allOutputRules) {
  if (rule.oxlint.migrationStatus === 'migrated') continue;
  const plugin = pluginById.get(rule.plugin)!;
  const sourceId = `${plugin.sourcePrefix}${rule.name}`;
  const skipCategory = skipped.get(sourceId);
  const explanation = findExplanation(plugin, rule.name);

  // @oxlint/migrate's own "unsupported" categorization is keyed off the exact
  // same explanations map, but by an internal rule-id form that doesn't always
  // line up with the source id we feed it (e.g. it expects "eslint/dot-notation"
  // for a bare core rule). Finding an explanation independently is itself a
  // reliable signal the rule is intentionally not-portable, so it takes
  // priority; otherwise trust whatever category the live pipeline produced.
  const status: MigrationStatus = explanation
    ? 'not-portable'
    : skipCategory === 'unsupported'
      ? 'not-portable'
      : skipCategory === 'js-plugins'
        ? 'needs-js-plugin'
        : 'not-implemented';

  rule.oxlint.migrationStatus = status;
  rule.oxlint.reason = explanation ?? GENERIC_REASON[status];
}

// ---- 4b. Oxlint-original rules: no ESLint equivalent, nothing to "migrate" ----
//
// The `oxc` scope holds rules oxlint invented itself (e.g. ported from
// DeepScan, or new correctness checks). They aren't part of the ESLint
// migration target, but are still real rules users can enable, so they get
// their own browsable bucket instead of being silently dropped.

const OXC_CONFIG_PREFIX = 'oxc/';
const oxcOutputRules: OutputRule[] = [];

for (const [name, entry] of implementedByScope.get('oxc') ?? []) {
  const presets = presetsByRuleKey.get(`${OXC_CONFIG_PREFIX}${name}`) ?? [];
  oxcOutputRules.push({
    id: `oxc__${name}`,
    plugin: 'oxc',
    pluginLabel: 'Oxlint original',
    name,
    eslint: {
      deprecated: false,
      recommended: false,
      description: null,
      docsUrl: null,
      type: null,
      fixable: false,
    },
    oxlint: {
      migrationStatus: 'migrated',
      reason: null,
      category: entry.category,
      nursery: entry.category === 'nursery',
      typeAware: entry.type_aware,
      fixStatus: fixStatusFor(entry.fix),
      default: entry.default,
      docsUrl: entry.docs_url,
      original: true,
      configKey: `${OXC_CONFIG_PREFIX}${name}`,
    },
    presets,
  });
}
oxcOutputRules.sort((a, b) => a.name.localeCompare(b.name));
allOutputRules.push(...oxcOutputRules);
console.log(`Added ${oxcOutputRules.length} oxlint-original rules (no ESLint equivalent).`);

// ---- 5. Aggregate stats, per plugin and overall -------------------------------
//
// Oxlint-original rules aren't part of the ESLint migration target, so they get
// their own stats bucket but are excluded from the global (all-plugins) totals.

const globalStats = emptyStats('All plugins');
const pluginStats = new Map(plugins.map((p) => [p.id, emptyStats(p.label)]));
const oxcStats = emptyStats('Oxlint original');
for (const rule of oxcOutputRules) addToStats(oxcStats, rule);

for (const rule of allOutputRules) {
  if (rule.oxlint.original) continue;
  addToStats(globalStats, rule);
  addToStats(pluginStats.get(rule.plugin)!, rule);
}

// ---- 6. Write output -----------------------------------------------------------

writeFileSync(join(dataDir, 'rules.json'), JSON.stringify(allOutputRules));
writeFileSync(
  join(dataDir, 'plugins.json'),
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    oxlintVersion,
    ...globalStats,
    plugins: [
      ...plugins.map((p) => ({
        id: p.id,
        oxlintScope: p.oxlintScope,
        sourcePackages: p.sourcePackages,
        original: false,
        ...pluginStats.get(p.id)!,
      })),
      {
        id: 'oxc',
        oxlintScope: 'oxc',
        sourcePackages: [],
        original: true,
        ...oxcStats,
      },
    ],
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
  `Done. ${globalStats.migrated}/${globalStats.eligible} eligible rules migrated ` +
    `(${((globalStats.migrated / globalStats.eligible) * 100).toFixed(1)}%), ` +
    `${globalStats.notPortable} rules marked not portable.`,
);
console.log(`Written to ${relative(monorepoRoot, dataDir)}/{rules,plugins,configs}.json`);
