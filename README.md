# oxlint-config-presets

[![npm version](https://img.shields.io/npm/v/oxlint-config-presets?logo=npm)](https://www.npmjs.com/package/oxlint-config-presets)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://www.npmjs.com/package/oxlint-config-presets)
[![Oxlint](https://img.shields.io/badge/linted%20with-oxlint-6d28d9)](https://oxc.rs/docs/guide/usage/linter.html)

This is a [pnpm workspace](https://pnpm.io/workspaces) monorepo. It currently contains one published package, with more planned.

## Packages

| Package                                                            | Description                                                                                                                                                                     |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`packages/oxlint-config-presets`](packages/oxlint-config-presets) | Ready-to-use Oxlint preset configs ported from popular ESLint style guides. Published to npm as [`oxlint-config-presets`](https://www.npmjs.com/package/oxlint-config-presets). |
| `packages/website`                                                 | Coming soon.                                                                                                                                                                    |

See each package's own README for usage instructions.

## Development

This repo uses [pnpm](https://pnpm.io/) workspaces.

```sh
pnpm install
```

Common commands run across all packages from the repo root:

```sh
pnpm -r run test   # run tests in every package
pnpm oxlint        # lint the whole repo
pnpm fmt           # format the whole repo
pnpm before-commit # regenerate configs, run tests, and lint
```

To run a command for a single package, use `pnpm --filter <package-name>`, e.g. `pnpm --filter oxlint-config-presets run generate`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more.
