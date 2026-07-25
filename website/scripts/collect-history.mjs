/**
 * Builds website/src/data/migration-history.json: a real time series of how many
 * ESLint rules oxlint had implemented, sampled from published oxlint npm releases
 * (one per month since oxlint's first release) rather than synthetic data.
 *
 * For each sampled version we run `npx oxlint@<version> --rules` (in whichever
 * output format that release supports: JSON, markdown table, or bullet list) and
 * count rules by scope. Results are cached under .cache/ so re-runs are cheap.
 *
 * Run with: pnpm collect-history
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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

/** Pick the last-published version for each calendar month. */
function pickMonthlySamples(times) {
  const byMonth = new Map();
  for (const [version, iso] of Object.entries(times)) {
    const month = iso.slice(0, 7);
    byMonth.set(month, { version, date: iso });
  }
  return [...byMonth.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function parseJsonFormat(output) {
  const trimmed = output.trim();
  if (!trimmed.startsWith('[')) return null;
  try {
    const data = JSON.parse(trimmed);
    return data.map((r) => ({ scope: r.scope, value: r.value }));
  } catch {
    return null;
  }
}

function parseMarkdownTable(output) {
  const rows = [];
  let currentScope = null;
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
    rows.push({ scope: source, value: name });
  }
  void currentScope;
  return rows.length > 0 ? rows : null;
}

function parseBulletList(output) {
  const rows = [];
  const re = /^[•-]\s*([\w.@-]+)[:/]\s*([\w./-]+)/;
  for (const rawLine of output.split('\n')) {
    const line = rawLine.trim();
    const match = re.exec(line);
    if (!match) continue;
    rows.push({ scope: match[1], value: match[2] });
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
    console.warn(`  [warn] Could not parse --rules output for oxlint@${version}`);
    rows = [];
  }

  writeFileSync(cachePath, JSON.stringify(rows));
  return rows;
}

function summarize(rows) {
  const byScope = {};
  let totalImplemented = 0;
  for (const { scope, value } of rows) {
    void value;
    if (!KNOWN_SCOPES.has(scope)) continue;
    byScope[scope] = (byScope[scope] ?? 0) + 1;
    totalImplemented++;
  }
  return { totalImplemented, byScope };
}

const times = npmViewTimes();
const samples = pickMonthlySamples(times);
console.log(`Sampling ${samples.length} monthly oxlint releases (${samples[0].version} .. ${samples.at(-1).version})`);

const results = [];
for (const { version, date } of samples) {
  const rows = fetchVersionRules(version);
  const { totalImplemented, byScope } = summarize(rows);
  results.push({ version, date, totalImplemented, byScope });
  console.log(`  ${date.slice(0, 10)}  oxlint@${version.padEnd(8)} -> ${totalImplemented} rules`);
}

let totalEslintRulesNow = null;
const pluginsJsonPath = join(dataDir, 'plugins.json');
if (existsSync(pluginsJsonPath)) {
  totalEslintRulesNow = JSON.parse(readFileSync(pluginsJsonPath, 'utf-8')).totalRules;
}

writeFileSync(
  join(dataDir, 'migration-history.json'),
  JSON.stringify({
    generatedAt: new Date().toISOString(),
    totalEslintRulesNow,
    samples: results,
  }),
);

console.log(`\nDone. Written to ${join('src/data', 'migration-history.json')}`);
