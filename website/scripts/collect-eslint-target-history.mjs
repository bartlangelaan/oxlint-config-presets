/**
 * Tracks how many ESLint rules each plugin actually had over time, so the
 * migration "target" line can reflect that plugins keep adding rules — it
 * shouldn't be a flat line at today's count applied retroactively.
 *
 * For each ESLint source package, walks its published npm version history
 * (stable versions only, since a floor date a little before oxlint's first
 * release) and — for versions that publish an unbundled per-rule-file layout
 * (the near-universal `lib/rules/*.js` convention most ESLint plugins use) —
 * reads the rule file list straight from the npm tarball without executing
 * any of its code. Cross-referencing the resulting "rule name -> date first
 * seen" timeline against today's rules.json classification (migrated /
 * not-implemented / not-portable, already computed by collect-data) gives,
 * per plugin, a cumulative count of *eligible* (portable) rules over time —
 * a real, growing target denominator instead of a constant.
 *
 * A few plugins (@vitest/eslint-plugin, eslint-plugin-react-hooks,
 * eslint-plugin-react-refresh) ship as a single pre-bundled file with no
 * discoverable per-rule listing in any published version. There's no safe
 * way to recover their historical rule set without executing untrusted
 * bundled code from arbitrary old releases, so their eligible rules fall
 * back to "present since the start of the tracked window" — a flat
 * contribution, not a fabricated growth curve. This only meaningfully
 * affects the "vitest" bucket (a standalone plugin); for "react" it's a
 * minor share of a bucket eslint-plugin-react (which *is* trackable)
 * dominates.
 *
 * Reads: src/data/rules.json (for eligibility) and the
 * oxlint-migration-history*.json files already written by collect-history.mjs
 * (for the sample dates to evaluate the target at). Adds a `target` number to
 * every sample in those files, in place.
 *
 * Run with: pnpm collect-eslint-history (after pnpm collect-history)
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteDir = resolve(__dirname, '..');
const dataDir = join(websiteDir, 'src/data');
const cacheDir = join(websiteDir, '.cache/eslint-plugin-versions');
mkdirSync(cacheDir, { recursive: true });

// A little before oxlint's first release (2023-06-27) — no point tracking
// rule additions further back than the chart's own x-axis start.
const FLOOR_DATE = '2023-01-01';
const RULE_EXTENSIONS = ['.js', '.cjs', '.mjs', '.ts'];
const EXCLUDE_BASENAMES = new Set(['index', 'utils', 'util', 'types', 'type']);

// Mirrors the plugin buckets in generate-rules-data.mts. `dirs` lists
// candidate rule-directory paths inside the npm tarball, in priority order
// (first non-empty match wins, so packages that ship both a `src/rules` and
// compiled `dist/rules` aren't double-counted). An empty `dirs` array means
// "bundled into a single file, not trackable" — handled via the fallback.
const BUCKETS = [
  { id: 'eslint', oxlintScope: 'eslint', packages: [{ name: 'eslint', dirs: ['lib/rules'] }] },
  {
    id: 'typescript',
    oxlintScope: 'typescript',
    packages: [
      { name: '@typescript-eslint/eslint-plugin', dirs: ['dist/rules', 'src/rules', 'lib/rules'] },
    ],
  },
  {
    id: 'unicorn',
    oxlintScope: 'unicorn',
    packages: [{ name: 'eslint-plugin-unicorn', dirs: ['rules'] }],
  },
  {
    id: 'react',
    oxlintScope: 'react',
    packages: [
      { name: 'eslint-plugin-react', dirs: ['lib/rules'] },
      { name: 'eslint-plugin-react-hooks', dirs: [] },
      { name: 'eslint-plugin-react-refresh', dirs: [] },
    ],
  },
  {
    id: 'import',
    oxlintScope: 'import',
    packages: [
      { name: 'eslint-plugin-import', dirs: ['lib/rules'] },
      { name: 'eslint-plugin-import-x', dirs: ['lib/rules'] },
    ],
  },
  {
    id: 'jsdoc',
    oxlintScope: 'jsdoc',
    packages: [{ name: 'eslint-plugin-jsdoc', dirs: ['src/rules', 'dist/rules'], camelCase: true }],
  },
  {
    id: 'jest',
    oxlintScope: 'jest',
    packages: [{ name: 'eslint-plugin-jest', dirs: ['lib/rules'] }],
  },
  { id: 'vitest', oxlintScope: 'vitest', packages: [{ name: '@vitest/eslint-plugin', dirs: [] }] },
  {
    id: 'jsx-a11y',
    oxlintScope: 'jsx_a11y',
    packages: [{ name: 'eslint-plugin-jsx-a11y', dirs: ['lib/rules'] }],
  },
  {
    id: 'nextjs',
    oxlintScope: 'nextjs',
    packages: [{ name: '@next/eslint-plugin-next', dirs: ['dist/rules'] }],
  },
  {
    id: 'react-perf',
    oxlintScope: 'react_perf',
    packages: [{ name: 'eslint-plugin-react-perf', dirs: ['lib/rules'] }],
  },
  {
    id: 'promise',
    oxlintScope: 'promise',
    packages: [{ name: 'eslint-plugin-promise', dirs: ['rules'] }],
  },
  { id: 'node', oxlintScope: 'node', packages: [{ name: 'eslint-plugin-n', dirs: ['lib/rules'] }] },
  {
    id: 'vue',
    oxlintScope: 'vue',
    packages: [{ name: 'eslint-plugin-vue', dirs: ['dist/rules', 'lib/rules'] }],
  },
];

function safePkgDirName(pkg) {
  return pkg.replace('/', '__');
}

function npmViewTimes(pkg) {
  const out = execFileSync('npm', ['view', pkg, 'time', '--json'], { encoding: 'utf-8' });
  const data = JSON.parse(out);
  delete data.created;
  delete data.modified;
  return data;
}

function stableVersionsSince(pkg, floorDate) {
  const times = npmViewTimes(pkg);
  return Object.entries(times)
    .filter(([version, iso]) => iso >= floorDate && /^\d+\.\d+\.\d+$/.test(version))
    .map(([version, date]) => ({ version, date }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function camelToKebab(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Reads rule file basenames straight off disk — never executes package code.
 * Most ESLint plugins name each rule file after its kebab-case rule id
 * directly (`no-array-for-each.js`); a few (eslint-plugin-jsdoc) name files
 * in camelCase instead (`checkAccess.js` for the `check-access` rule), so
 * `camelToKebab` normalizes those to match rules.json's naming.
 */
function extractRuleNames(pkgDir, candidateDirs, camelCase) {
  for (const rel of candidateDirs) {
    const dir = join(pkgDir, rel);
    if (!existsSync(dir)) continue;
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    const names = new Set();
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const ext = RULE_EXTENSIONS.find((e) => entry.name.endsWith(e));
      if (!ext) continue;
      const base = entry.name.slice(0, -ext.length);
      if (EXCLUDE_BASENAMES.has(base.toLowerCase())) continue;
      names.add(camelCase ? camelToKebab(base) : base);
    }
    if (names.size > 0) return [...names];
  }
  return null;
}

function fetchVersionRuleNames(pkg, version, candidateDirs, camelCase) {
  const cachePath = join(cacheDir, safePkgDirName(pkg), `${version}.json`);
  if (existsSync(cachePath)) return JSON.parse(readFileSync(cachePath, 'utf-8'));

  mkdirSync(dirname(cachePath), { recursive: true });
  const workDir = join(
    tmpdir(),
    `eslint-hist-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
  mkdirSync(workDir, { recursive: true });
  let names = null;
  try {
    execFileSync('npm', ['pack', `${pkg}@${version}`, '--silent', '--pack-destination', workDir], {
      stdio: ['ignore', 'ignore', 'pipe'],
      timeout: 60_000,
    });
    const tgz = readdirSync(workDir).find((f) => f.endsWith('.tgz'));
    if (tgz) {
      execFileSync('tar', ['-xzf', join(workDir, tgz), '-C', workDir], { timeout: 30_000 });
      names = extractRuleNames(join(workDir, 'package'), candidateDirs, camelCase);
    }
  } catch {
    names = null;
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }

  writeFileSync(cachePath, JSON.stringify(names));
  return names;
}

// ---- 1. Today's eligible (portable) rule names per bucket --------------------

const rulesData = JSON.parse(readFileSync(join(dataDir, 'rules.json'), 'utf-8'));
const eligibleNamesByBucket = new Map();
for (const rule of rulesData) {
  if (rule.oxlint.original) continue;
  if (rule.oxlint.migrationStatus === 'not-portable') continue;
  if (!eligibleNamesByBucket.has(rule.plugin)) eligibleNamesByBucket.set(rule.plugin, new Set());
  eligibleNamesByBucket.get(rule.plugin).add(rule.name);
}

// ---- 2. Per-bucket "eligible rule -> date first seen" timelines --------------

const bucketResults = new Map();

for (const bucket of BUCKETS) {
  const eligibleNames = eligibleNamesByBucket.get(bucket.id) ?? new Set();
  const firstSeen = new Map();
  let hasHistory = false;

  for (const pkg of bucket.packages) {
    if (pkg.dirs.length === 0) continue; // bundled — no safe way to inspect, falls back below
    const versions = stableVersionsSince(pkg.name, FLOOR_DATE);
    console.log(`${bucket.id} / ${pkg.name}: ${versions.length} versions since ${FLOOR_DATE}`);
    for (const { version, date } of versions) {
      const names = fetchVersionRuleNames(pkg.name, version, pkg.dirs, pkg.camelCase);
      if (names === null) continue;
      hasHistory = true;
      for (const name of names) {
        if (!eligibleNames.has(name)) continue;
        const prev = firstSeen.get(name);
        if (!prev || date < prev) firstSeen.set(name, date);
      }
    }
  }

  const matchedCount = firstSeen.size;
  const totalEligible = eligibleNames.size;
  // Eligible rules never observed in any fetched version — either a bundled
  // package we can't inspect, or an extraction gap (rename, unusual layout).
  // Counting them as present since the start of the window keeps them from
  // distorting the shape of the curve with a fake "just added" spike.
  const unmatchedCount = totalEligible - matchedCount;

  bucketResults.set(bucket.id, {
    oxlintScope: bucket.oxlintScope,
    hasHistory,
    matchedCount,
    totalEligible,
    unmatchedCount,
    firstSeenDates: [...firstSeen.values()].sort((a, b) => a.localeCompare(b)),
  });

  console.log(
    `  -> ${bucket.id}: ${matchedCount}/${totalEligible} eligible rules dated, ${unmatchedCount} baseline`,
  );
}

// ---- 3. Inject a `target` value into every existing sample -------------------

function eligibleCountAt(result, isoDate) {
  let count = result.unmatchedCount;
  for (const d of result.firstSeenDates) {
    if (d <= isoDate) count++;
    else break; // firstSeenDates is sorted
  }
  return count;
}

for (const bucket of BUCKETS) {
  const result = bucketResults.get(bucket.id);
  const filePath = join(dataDir, `oxlint-migration-history-${bucket.oxlintScope}.json`);
  if (!existsSync(filePath)) {
    console.warn(`  [warn] ${filePath} doesn't exist yet — run collect-history first.`);
    continue;
  }
  const fileData = JSON.parse(readFileSync(filePath, 'utf-8'));
  for (const sample of fileData.samples) {
    sample.target = eligibleCountAt(result, sample.date);
  }
  fileData.targetTrackingCoverage = {
    matchedCount: result.matchedCount,
    totalEligible: result.totalEligible,
    hasHistory: result.hasHistory,
  };
  writeFileSync(filePath, JSON.stringify(fileData));
}

const globalFilePath = join(dataDir, 'oxlint-migration-history.json');
if (existsSync(globalFilePath)) {
  const globalData = JSON.parse(readFileSync(globalFilePath, 'utf-8'));
  for (const sample of globalData.samples) {
    let total = 0;
    for (const bucket of BUCKETS)
      total += eligibleCountAt(bucketResults.get(bucket.id), sample.date);
    sample.target = total;
  }
  writeFileSync(globalFilePath, JSON.stringify(globalData));
}

console.log('\nDone. Injected per-sample `target` values into oxlint-migration-history*.json.');
