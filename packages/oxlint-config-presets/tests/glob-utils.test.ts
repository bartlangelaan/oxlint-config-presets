import assert from 'node:assert/strict';
import { globSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { expandExtglob, hasExtglob } from '../scripts/glob-utils.js';

const rootDir = join(fileURLToPath(new URL('.', import.meta.url)), '..');

test('expandExtglob leaves plain patterns untouched', () => {
  assert.deepEqual(expandExtglob('**/*.ts'), ['**/*.ts']);
  assert.deepEqual(expandExtglob('**/*.[jt]s'), ['**/*.[jt]s']);
});

test('expandExtglob expands ?(...) around a bracket class', () => {
  const result = expandExtglob('**/*.?([cm])ts');
  assert.deepEqual(new Set(result), new Set(['**/*.ts', '**/*.cts', '**/*.mts']));
});

test('expandExtglob expands multiple ?(...) tokens (cartesian product)', () => {
  const result = expandExtglob('**/*.?([cm])[jt]s?(x)');
  assert.deepEqual(
    new Set(result),
    new Set([
      '**/*.[jt]s',
      '**/*.[jt]sx',
      '**/*.c[jt]s',
      '**/*.c[jt]sx',
      '**/*.m[jt]s',
      '**/*.m[jt]sx',
    ]),
  );
});

test('expandExtglob expands @(...) alternation without an empty option', () => {
  const result = expandExtglob('**/*.stories.@(ts|tsx|js|jsx)');
  assert.deepEqual(
    new Set(result),
    new Set(['**/*.stories.ts', '**/*.stories.tsx', '**/*.stories.js', '**/*.stories.jsx']),
  );
});

test('expandExtglob returns null for unbounded extglob operators', () => {
  assert.equal(expandExtglob('**/*.*(foo)'), null);
  assert.equal(expandExtglob('**/*.+(foo)'), null);
  assert.equal(expandExtglob('**/!(foo).ts'), null);
});

test('hasExtglob detects extglob operators', () => {
  assert.equal(hasExtglob('**/*.?([cm])ts'), true);
  assert.equal(hasExtglob('**/*.@(ts|tsx)'), true);
  assert.equal(hasExtglob('**/*.[jt]s'), false);
  assert.equal(hasExtglob('**/*.ts'), false);
});

// Regression guard: fast-glob (used by oxlint's overrides[].files matcher)
// silently ignores extglob patterns instead of erroring, so a pattern that
// slips through here would fail with no diagnostic at all:
// https://github.com/oxc-project/oxc/issues/21525
test('no generated config contains extglob syntax in overrides[].files', () => {
  const configFiles = globSync('configs/**/*.json', { cwd: rootDir });
  assert.ok(configFiles.length > 0, 'No config files found under configs/');

  interface OxlintConfig {
    overrides?: Array<{ files?: unknown }>;
  }

  const offenders: string[] = [];

  for (const configFile of configFiles) {
    const config = JSON.parse(readFileSync(join(rootDir, configFile), 'utf-8')) as OxlintConfig;
    for (const override of config.overrides ?? []) {
      if (!Array.isArray(override.files)) continue;
      for (const pattern of override.files) {
        if (typeof pattern === 'string' && hasExtglob(pattern)) {
          offenders.push(`${configFile}: ${pattern}`);
        }
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `Found extglob patterns in generated configs:\n${offenders.join('\n')}`,
  );
});
