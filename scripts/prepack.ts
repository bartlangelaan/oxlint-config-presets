/**
 * Writes a clean package.json into configs/ before publishing.
 *
 * pnpm requires a package.json to be present in publishConfig.directory.
 * This script derives it from the root package.json, keeping only the fields
 * relevant to consumers and dropping dev-only ones (devDependencies, scripts,
 * publishConfig, etc.).
 *
 * Invoked automatically by pnpm via the "prepack" lifecycle hook.
 */

import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

interface PackageJson {
  name: string;
  version: string;
  description?: string;
  license?: string;
  [key: string]: unknown;
}

const root = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8')) as PackageJson;

const publishPkg: Partial<PackageJson> = {
  name: root.name,
  version: root.version,
  description: root.description,
  license: root.license,
};

writeFileSync(join(rootDir, 'configs', 'package.json'), JSON.stringify(publishPkg, null, 2) + '\n');
copyFileSync(join(rootDir, 'README.md'), join(rootDir, 'configs', 'README.md'));

console.log('Written configs/package.json');
console.log('Copied README.md to configs/README.md');
