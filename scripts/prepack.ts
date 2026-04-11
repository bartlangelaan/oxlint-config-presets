/**
 * Writes a clean package.json into configs/ before publishing.
 *
 * pnpm requires a package.json to be present in publishConfig.directory.
 * This script derives it from the root package.json, dropping only fields
 * that are not needed by consumers (devDependencies, scripts,
 * publishConfig, and packageManager).
 *
 * Invoked automatically by pnpm via the "prepack" lifecycle hook.
 */

import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

interface PackageJson {
  [key: string]: unknown;
}

const root = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8')) as PackageJson;

const excludedKeys = new Set(['publishConfig', 'scripts', 'packageManager', 'devDependencies']);
const publishPkg = Object.fromEntries(
  Object.entries(root).filter(([key]) => !excludedKeys.has(key)),
);

writeFileSync(join(rootDir, 'configs', 'package.json'), JSON.stringify(publishPkg, null, 2) + '\n');
copyFileSync(join(rootDir, 'README.md'), join(rootDir, 'configs', 'README.md'));
copyFileSync(join(rootDir, 'oxlint-config.d.ts'), join(rootDir, 'configs', 'oxlint-config.d.ts'));

console.log('Written configs/package.json');
console.log('Copied README.md to configs/README.md');
console.log('Copied oxlint-config.d.ts to configs/oxlint-config.d.ts');
