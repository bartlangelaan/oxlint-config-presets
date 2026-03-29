# oxlint-config-presets

Oxlint configurations ported from popular ESLint styleguides. Extend them in your `.oxlintrc.json` the same way you would extend the original ESLint configs.

Install the package:

```sh
npm install --save-dev oxlint-config-presets
# or
pnpm add -D oxlint-config-presets
```

Then extend the config you want in your `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/oxlint-config-presets/airbnb/hooks.json"]
}
```

Multiple configs can be combined. Later entries take precedence:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": [
    "./node_modules/oxlint-config-presets/airbnb/base.json",
    "./node_modules/oxlint-config-presets/airbnb/hooks.json"
  ]
}
```

> **Note:** oxlint's `extends` field requires a `.json` file path relative to your config file. Use `./node_modules/oxlint-config-presets/<config>.json` to reference configs from this package.
