/**
 * Builds website/src/data/oxlint-migration-history.json (a lean global time
 * series) plus one website/src/data/oxlint-migration-history-<scope>.json per
 * plugin, from every oxlint release ever published on npm, rather than
 * synthetic data.
 *
 * Splitting per plugin keeps each plugin's progress page from having to load
 * every other plugin's history, and lets each file carry its own "target"
 * (today's eligible-rule count for that plugin) alongside its samples, so the
 * chart's target line always comes from the same file as the data it's
 * measured against — plugins gain new ESLint rules over time, so there's no
 * single global target that's meaningful for every plugin's own chart.
 *
 * For each version we run `npx oxlint@<version> --rules` (in whichever output
 * format that release supports: JSON, markdown table, or bullet list) and count
 * rules by scope. Results are cached under .cache/ so re-runs only fetch newly
 * published versions.
 *
 * Run with: pnpm collect-history
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteDir = resolve(__dirname, '..');
const cacheDir = join(websiteDir, '.cache/oxlint-versions');
const dataDir = join(websiteDir, 'src/data');

mkdirSync(cacheDir, { recursive: true });

// Scopes that correspond to a real ESLint plugin (matches PLUGINS in generate-rules-data.mts).
// "oxc" is excluded: those are oxlint-native rules with no ESLint equivalent to "migrate".
const KNOWN_SCOPES = new Set([
  'eslint',
  'typescript',
  'unicorn',
  'react',
  'import',
  'jsdoc',
  'jest',
  'vitest',
  'jsx_a11y',
  'nextjs',
  'react_perf',
  'promise',
  'node',
  'vue',
]);

// Versions known to be broken/unpublishable (e.g. accidental releases superseded
// same-day) — excluded so month-picking falls back to the next best release.
const EXCLUDED_VERSIONS = new Set(['1.61.1']);

function npmViewTimes() {
  const out = execFileSync('npm', ['view', 'oxlint', 'time', '--json'], { encoding: 'utf-8' });
  const data = JSON.parse(out);
  delete data.created;
  delete data.modified;
  for (const version of EXCLUDED_VERSIONS) delete data[version];
  return data;
}

/** Every published version, oldest first. */
function allVersionsSorted(times) {
  return Object.entries(times)
    .map(([version, iso]) => ({ version, date: iso }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function parseJsonFormat(output) {
  const trimmed = output.trim();
  if (!trimmed.startsWith('[')) return null;
  try {
    const data = JSON.parse(trimmed);
    // `fix` has been present on every release that supports --format json; older
    // releases (parsed by the other two formats below) never carry it, so callers
    // must treat a missing/undefined fix as "unknown, assume nothing pending".
    return data.map((r) => ({ scope: r.scope, value: r.value, fix: r.fix ?? null }));
  } catch {
    return null;
  }
}

function parseMarkdownTable(output) {
  const rows = [];
  for (const line of output.split('\n')) {
    const headingMatch = line.match(/^##\s+([A-Za-z ]+?)\s*\(\d+\)/);
    if (headingMatch) continue; // category headings (Correctness, Style, ...), not scopes.
    if (!line.startsWith('|')) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim());
    if (cells.length < 2) continue;
    const [name, source] = cells;
    if (name === 'Rule name' || /^-+$/.test(name)) continue;
    if (!name || !source) continue;
    // The markdown table's "Fixable?" column (when present) only says whether a
    // fixer exists at all, not whether it's "pending" vs implemented, so it can't
    // tell us what we need here — fix status is unknown for this format.
    rows.push({ scope: source, value: name, fix: null });
  }
  return rows.length > 0 ? rows : null;
}

function parseBulletList(output) {
  const rows = [];
  const re = /^[•-]\s*([\w.@-]+)[:/]\s*([\w./-]+)/;
  for (const rawLine of output.split('\n')) {
    const line = rawLine.trim();
    const match = re.exec(line);
    if (!match) continue;
    rows.push({ scope: match[1], value: match[2], fix: null });
  }
  return rows.length > 0 ? rows : null;
}

function parseRules(output) {
  return parseJsonFormat(output) ?? parseMarkdownTable(output) ?? parseBulletList(output);
}

function fetchVersionRules(version) {
  const cachePath = join(cacheDir, `${version}.json`);
  if (existsSync(cachePath)) {
    return JSON.parse(readFileSync(cachePath, 'utf-8'));
  }

  console.log(`Fetching oxlint@${version}...`);
  let output = '';
  try {
    output = execFileSync('npx', ['-y', `oxlint@${version}`, '--rules', '--format', 'json'], {
      encoding: 'utf-8',
      timeout: 120_000,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  } catch (err) {
    output = (err.stdout ?? '') + (err.stderr ?? '');
  }

  let rows = parseJsonFormat(output);
  if (!rows) {
    // Older releases don't understand --format; retry with the bare flag.
    try {
      output = execFileSync('npx', ['-y', `oxlint@${version}`, '--rules'], {
        encoding: 'utf-8',
        timeout: 120_000,
        stdio: ['ignore', 'pipe', 'pipe'],
      });
    } catch (err) {
      output = (err.stdout ?? '') + (err.stderr ?? '');
    }
    rows = parseRules(output);
  }

  if (!rows) {
    console.warn(`  [warn] Could not parse --rules output for oxlint@${version} (will retry later)`);
    return [];
  }

  // Only cache successful parses, so a broken/unparseable release (bad publish,
  // network hiccup) gets retried on the next run instead of being stuck at 0.
  writeFileSync(cachePath, JSON.stringify(rows));
  return rows;
}

/** Rules whose autofix is explicitly marked "planned but not implemented" by oxlint. */
function isFixPending(fix) {
  return fix === 'pending';
}

function summarize(rows) {
  const byScope = {};
  let totalImplemented = 0;
  let fullyMigrated = 0;
  // Older releases (pre-1.40.0, and anything parsed from the markdown-table or
  // bullet-list formats) never report a `fix` value for any rule at all — not
  // "none pending", just absent. Treating that as "nothing pending" would make
  // every rule look fully migrated, which is wrong, not just unknown. Detect
  // that case per-release and report fullyMigrated as null (unknown) instead.
  const hasFixInfo = rows.some((r) => r.fix != null);
  for (const { scope, value, fix } of rows) {
    void value;
    if (!KNOWN_SCOPES.has(scope)) continue;
    if (!byScope[scope]) byScope[scope] = { total: 0, fullyMigrated: 0 };
    byScope[scope].total++;
    totalImplemented++;
    if (hasFixInfo && !isFixPending(fix)) {
      byScope[scope].fullyMigrated++;
      fullyMigrated++;
    }
  }
  if (!hasFixInfo) {
    fullyMigrated = null;
    for (const scope of Object.keys(byScope)) byScope[scope].fullyMigrated = null;
  }
  return { totalImplemented, fullyMigrated, byScope };
}

const times = npmViewTimes();
const samples = allVersionsSorted(times);
console.log(`Sampling all ${samples.length} oxlint releases (${samples[0].version} .. ${samples.at(-1).version})`);

const results = [];
for (const { version, date } of samples) {
  const rows = fetchVersionRules(version);
  const { totalImplemented, fullyMigrated, byScope } = summarize(rows);
  if (totalImplemented === 0) {
    console.warn(`  [skip] oxlint@${version} produced no parseable rules, omitting`);
    continue;
  }
  results.push({ version, date, totalImplemented, fullyMigrated, byScope });
  console.log(
    `  ${date.slice(0, 10)}  oxlint@${version.padEnd(8)} -> ${totalImplemented} rules (${fullyMigrated} fully migrated)`,
  );
}

let globalTarget = null;
const pluginTargets = {};
const pluginsJsonPath = join(dataDir, 'plugins.json');
if (existsSync(pluginsJsonPath)) {
  const pluginsData = JSON.parse(readFileSync(pluginsJsonPath, 'utf-8'));
  globalTarget = pluginsData.eligible;
  for (const p of pluginsData.plugins) {
    if (!p.original) pluginTargets[p.oxlintScope] = p.eligible;
  }
}

const generatedAt = new Date().toISOString();

writeFileSync(
  join(dataDir, 'oxlint-migration-history.json'),
  JSON.stringify({
    generatedAt,
    target: globalTarget,
    samples: results.map(({ version, date, totalImplemented, fullyMigrated }) => ({
      version,
      date,
      totalImplemented,
      fullyMigrated,
    })),
  }),
);
console.log(`\nWrote ${join('src/data', 'oxlint-migration-history.json')}`);

for (const scope of KNOWN_SCOPES) {
  const scopeSamples = [];
  for (const r of results) {
    const s = r.byScope[scope];
    if (!s) continue; // scope didn't exist yet at this release
    scopeSamples.push({ version: r.version, date: r.date, total: s.total, fullyMigrated: s.fullyMigrated });
  }
  writeFileSync(
    join(dataDir, `oxlint-migration-history-${scope}.json`),
    JSON.stringify({
      generatedAt,
      scope,
      target: pluginTargets[scope] ?? null,
      samples: scopeSamples,
    }),
  );
  console.log(`Wrote ${join('src/data', `oxlint-migration-history-${scope}.json`)} (${scopeSamples.length} samples)`);
}

// Old filename from before the rename/split — remove so it doesn't linger as stale data.
const staleFile = join(dataDir, 'migration-history.json');
if (existsSync(staleFile)) unlinkSync(staleFile);

console.log('\nDone.');
