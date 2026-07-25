import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { globSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');

const result = spawnSync('pnpm', ['pack', '--dry-run', '--json'], {
  cwd: rootDir,
  encoding: 'utf-8',
});

const output = result.stdout + result.stderr;

interface PackOutput {
  files: Array<{ path: string }>;
}

function parsePackOutput(raw: string): PackOutput {
  const jsonStart = raw.lastIndexOf('\n{');
  const json = (jsonStart >= 0 ? raw.slice(jsonStart + 1) : raw).trim();

  try {
    return JSON.parse(json) as PackOutput;
  } catch (error) {
    throw new Error(
      `Unable to parse pnpm pack --json output:\n${raw}\n\nParse error: ${String(error)}`,
    );
  }
}

const packOutput = parsePackOutput(output);
const publishedFiles = packOutput.files.map((file) => file.path);

test('dry-run succeeds', () => {
  assert.equal(result.status, 0, `pnpm pack --dry-run exited ${result.status}:\n${output}`);
});

test('package.json is included', () => {
  assert.ok(publishedFiles.includes('package.json'));
});

const expectedConfigs = globSync('configs/**/*.json', { cwd: rootDir })
  .map((f) => f.replace(/^configs\//, ''))
  .filter((f) => f !== 'package.json');

for (const file of expectedConfigs) {
  test(`${file} is included`, () => {
    assert.ok(publishedFiles.includes(file), `missing from published files: ${file}`);
  });
}

test('scripts/ is not published', () => {
  const leaked = publishedFiles.filter((f) => f.startsWith('scripts/'));
  assert.deepEqual(leaked, [], `scripts/ should not be published`);
});

test('README.md is included', () => {
  assert.ok(publishedFiles.includes('README.md'));
});

test('pnpm-lock.yaml is not published', () => {
  assert.ok(!publishedFiles.includes('pnpm-lock.yaml'));
});

test('oxlint-config.d.ts is included', () => {
  assert.ok(
    publishedFiles.includes('oxlint-config.d.ts'),
    'oxlint-config.d.ts should be published for TypeScript type support',
  );
});
