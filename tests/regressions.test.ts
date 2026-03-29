import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const rootDir = join(fileURLToPath(new URL('.', import.meta.url)), '..');

type OxlintConfig = {
  rules?: Record<string, unknown>;
  overrides?: Array<{
    files?: string[];
    rules?: Record<string, unknown>;
  }>;
};

test('@typescript-eslint/stylistic-type-checked keeps prefer-spread', () => {
  const configPath = join(rootDir, 'configs/@typescript-eslint/stylistic-type-checked.json');
  const config = JSON.parse(readFileSync(configPath, 'utf-8')) as OxlintConfig;

  const topLevelRule = config.rules?.['prefer-spread'];
  const overrideRule = config.overrides?.find((override) => override.rules?.['prefer-spread'])
    ?.rules?.['prefer-spread'];

  assert.ok(
    topLevelRule === 'error' || overrideRule === 'error',
    'Expected prefer-spread to be present in top-level rules or overrides.',
  );
});
