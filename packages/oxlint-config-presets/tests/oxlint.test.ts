import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { globSync, mkdtempSync, realpathSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const oxlintBin = join(rootDir, 'node_modules/.bin/oxlint');
const fixture = join(rootDir, 'tests/fixtures/sample.js');

const configFiles = globSync('configs/**/*.json', { cwd: rootDir }).filter(
  (f) => f !== 'configs/package.json',
);

assert.ok(configFiles.length > 0, 'No config files found under configs/');

for (const configFile of configFiles) {
  const label = configFile;

  test(`oxlint runs without config errors using ${label}`, () => {
    // realpathSync resolves symlinks (e.g. /var -> /private/var on macOS) so
    // that the relative path computed by relative() stays correct when oxlint
    // resolves '..' segments against the real filesystem path.
    const tempDir = realpathSync(mkdtempSync(join(tmpdir(), 'oxlint-config-test-')));
    try {
      // Simulate how a user would extend one of the package configs:
      // write a minimal .oxlintrc.json that extends the target config,
      // with the path resolved relative to the temp directory.
      const extendsPath = relative(tempDir, join(rootDir, configFile));
      const tempConfig = join(tempDir, '.oxlintrc.json');
      writeFileSync(tempConfig, JSON.stringify({ extends: [extendsPath] }, null, 2));

      const result = spawnSync(oxlintBin, ['--config', tempConfig, fixture], {
        encoding: 'utf-8',
      });

      const output = result.stdout + result.stderr;

      assert.ok(
        !output.includes('Failed to parse oxlint configuration file'),
        `Config parse error for ${label}:\n${output}`,
      );
    } finally {
      rmSync(tempDir, { recursive: true });
    }
  });
}
