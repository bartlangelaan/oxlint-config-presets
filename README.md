# oxlint-config

Oxlint configurations ported from popular ESLint styleguides. Extend them in your `.oxlintrc.json` the same way you would extend the original ESLint configs.

Install the package:

```sh
npm install --save-dev oxlint-config
# or
pnpm add -D oxlint-config
```

Then extend the config you want in your `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/oxlint-config/airbnb/hooks"]
}
```

Multiple configs can be combined. Later entries take precedence:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": [
    "./node_modules/oxlint-config/airbnb/base",
    "./node_modules/oxlint-config/airbnb/hooks"
  ]
}
```

> **Note:** oxlint's `extends` field takes file paths relative to the config file, not package names. Use `./node_modules/oxlint-config/<config>` to reference configs from this package.

