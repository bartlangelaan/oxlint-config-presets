# Contributing

## How it works

Each config in this package is generated from the corresponding ESLint config using [`@oxlint/migrate`](https://github.com/oxc-project/oxlint-migrate). The generation script:

1. Loads the source ESLint config and recursively resolves its `extends` chain to collect the full set of rules.
2. Passes the flattened rules through `@oxlint/migrate`, which maps supported rules to their oxlint equivalents and drops unsupported ones.
3. Writes the result as a JSON file under `configs/<styleguide>/`.

Rules that oxlint does not support are silently dropped. The generated files are committed to the repository so consumers do not need to run any build step.

## Regenerating configs

After updating a source styleguide dependency, regenerate all configs with:

```sh
pnpm generate
```

## Adding a new styleguide

1. Add the source ESLint config package as a devDependency.
2. Add entries to the `configs` array in `scripts/generate.ts`.
3. Add the corresponding `exports` entries in `package.json`.
4. Run `pnpm generate`.
5. Add test assertions for the new files in `tests/publish.test.ts`.

## Running tests

```sh
pnpm test
```

The test suite does a `pnpm publish --dry-run` and verifies that the expected config files are included in the package and that dev-only files are excluded.
