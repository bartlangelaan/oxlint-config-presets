/**
 * Assembles dist/ (this package's publishConfig.directory) before publishing,
 * and copies this package's README to the monorepo root so it's visible on
 * GitHub.
 *
 * dist/ is gitignored: it's rebuilt from configs/ (the tracked, generated
 * source of truth) plus a clean package.json derived from the root
 * package.json (dropping fields not needed by consumers, like
 * devDependencies and scripts), the README, and the type definitions.
 *
 * Invoked automatically by pnpm via the "prepack" lifecycle hook.
 */

import { copyFileSync, cpSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const monorepoRootDir = join(rootDir, '..', '..');
const distDir = join(rootDir, 'dist');

interface PackageJson {
  [key: string]: unknown;
}

const root = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8')) as PackageJson;

const excludedKeys = new Set(['publishConfig', 'scripts', 'packageManager', 'devDependencies']);
const publishPkg = Object.fromEntries(
  Object.entries(root).filter(([key]) => !excludedKeys.has(key)),
);

rmSync(distDir, { recursive: true, force: true });
cpSync(join(rootDir, 'configs'), distDir, { recursive: true });
writeFileSync(join(distDir, 'package.json'), JSON.stringify(publishPkg, null, 2) + '\n');
copyFileSync(join(rootDir, 'README.md'), join(distDir, 'README.md'));
copyFileSync(join(rootDir, 'oxlint-config.d.ts'), join(distDir, 'oxlint-config.d.ts'));
copyFileSync(join(rootDir, 'README.md'), join(monorepoRootDir, 'README.md'));

console.log('Copied configs/ to dist/');
console.log('Written dist/package.json');
console.log('Copied README.md to dist/README.md');
console.log('Copied oxlint-config.d.ts to dist/oxlint-config.d.ts');
console.log('Copied README.md to monorepo root README.md');
