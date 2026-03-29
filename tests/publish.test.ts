import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');

const result = spawnSync('pnpm', ['publish', '--dry-run', '--no-git-checks'], {
  cwd: rootDir,
  encoding: 'utf-8',
});

// Combine stdout + stderr; pnpm routes npm notice lines through stderr
const output = result.stdout + result.stderr;

// Lines look like: "npm notice 1.23kB airbnb/index.json"
const publishedFiles = [...output.matchAll(/npm notice\s+\S+\s+(.+)/g)].map((m) => m[1].trim());

test('dry-run succeeds', () => {
  assert.equal(result.status, 0, `pnpm publish exited ${result.status}:\n${output}`);
});

test('package.json is included', () => {
  assert.ok(publishedFiles.includes('package.json'));
});

const expectedConfigs = [
  'airbnb.json',
  'airbnb/base.json',
  'airbnb/hooks.json',
  'airbnb/legacy.json',
  'airbnb/whitespace.json',
  'standard.json',
  'google.json',
  '@eslint/recommended.json',
  '@eslint/all.json',
  '@typescript-eslint/recommended.json',
  '@typescript-eslint/recommended-type-checked.json',
  '@typescript-eslint/strict.json',
  '@typescript-eslint/strict-type-checked.json',
  '@typescript-eslint/stylistic.json',
  '@typescript-eslint/stylistic-type-checked.json',
  '@typescript-eslint/all.json',
  'xo.json',
  'problems.json',
  'hardcore.json',
  'wikimedia.json',
  'eslint.json',
  'eslint/base.json',
  'alloy.json',
  'alloy/react.json',
  'alloy/typescript.json',
  'prettier.json',
  '@antfu.json',
];

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
