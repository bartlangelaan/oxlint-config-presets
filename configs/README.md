# oxlint-config

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
  "extends": ["./node_modules/oxlint-config-presets/airbnb/hooks"]
}
```

Multiple configs can be combined. Later entries take precedence:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": [
    "./node_modules/oxlint-config-presets/airbnb/base",
    "./node_modules/oxlint-config-presets/airbnb/hooks"
  ]
}
```

> **Note:** oxlint's `extends` field takes file paths relative to the config file, not package names. Use `./node_modules/oxlint-config-presets/<config>` to reference configs from this package.

## Available configs

| Package export | ESLint equivalent | Oxlint rules |
|---|---|---|
| `oxlint-config-presets/airbnb` | `eslint-config-airbnb` | 205 |
| `oxlint-config-presets/airbnb/base` | `eslint-config-airbnb/base` | 144 |
| `oxlint-config-presets/airbnb/hooks` | `eslint-config-airbnb/hooks` | 2 |
| `oxlint-config-presets/airbnb/legacy` | `eslint-config-airbnb/legacy` | 111 |
| `oxlint-config-presets/airbnb/whitespace` | `eslint-config-airbnb/whitespace` | 205 |
| `oxlint-config-presets/standard` | `eslint-config-standard` | 95 |
| `oxlint-config-presets/google` | `eslint-config-google` | 21 |
| `oxlint-config-presets/eslint-js/recommended` | `@eslint/js — recommended` | 58 |
| `oxlint-config-presets/eslint-js/all` | `@eslint/js — all` | 166 |

### `oxlint-config-presets/airbnb`

<details>
<summary>141 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`consistent-return`, `dot-notation`, `dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `jsx-quotes`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`, `react/forbid-prop-types`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/jsx-wrap-multilines`, `react/jsx-first-prop-new-line`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/no-unused-prop-types`, `react/jsx-tag-spacing`, `react/forbid-foreign-prop-types`, `react/default-props-match-prop-types`, `react/no-unused-state`, `react/jsx-one-expression-per-line`, `react/no-access-state-in-setstate`, `react/jsx-props-no-multi-spaces`, `react/jsx-curly-newline`, `react/static-property-placement`, `react/prefer-exact-props`, `react/no-unused-class-component-methods`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`, `react/jsx-no-bind`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`, `react/no-typos`, `react/destructuring-assignment`, `react/function-component-definition`, `react/no-unstable-nested-components`, `react/no-arrow-function-lifecycle`, `react/no-invalid-html-attribute`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`

**Available as nursery rules (experimental, opt-in)**

`getter-return`, `no-unreachable`, `no-undef`, `import/named`, `import/export`, `react/require-render-return`

</details>

### `oxlint-config-presets/airbnb/base`

<details>
<summary>97 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`consistent-return`, `dot-notation`, `dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`

**Available as nursery rules (experimental, opt-in)**

`getter-return`, `no-unreachable`, `no-undef`, `import/named`, `import/export`

</details>

### `oxlint-config-presets/airbnb/hooks`

### `oxlint-config-presets/airbnb/legacy`

<details>
<summary>77 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`consistent-return`, `dot-notation`, `dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `strict`

**Available as nursery rules (experimental, opt-in)**

`getter-return`, `no-unreachable`, `no-undef`

</details>

### `oxlint-config-presets/airbnb/whitespace`

<details>
<summary>141 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`consistent-return`, `dot-notation`, `dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `jsx-quotes`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`, `react/forbid-prop-types`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/jsx-wrap-multilines`, `react/jsx-first-prop-new-line`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/no-unused-prop-types`, `react/jsx-tag-spacing`, `react/forbid-foreign-prop-types`, `react/default-props-match-prop-types`, `react/no-unused-state`, `react/jsx-one-expression-per-line`, `react/no-access-state-in-setstate`, `react/jsx-props-no-multi-spaces`, `react/jsx-curly-newline`, `react/static-property-placement`, `react/prefer-exact-props`, `react/no-unused-class-component-methods`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`, `react/jsx-no-bind`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`, `react/no-typos`, `react/destructuring-assignment`, `react/function-component-definition`, `react/no-unstable-nested-components`, `react/no-arrow-function-lifecycle`, `react/no-invalid-html-attribute`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`

**Available as nursery rules (experimental, opt-in)**

`getter-return`, `no-unreachable`, `no-undef`, `import/named`, `import/export`, `react/require-render-return`

</details>

### `oxlint-config-presets/standard`

<details>
<summary>66 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`object-shorthand`, `no-implied-eval`, `no-unreachable-loop`, `one-var`, `prefer-regex-literals`, `n/no-callback-literal`, `n/no-deprecated-api`, `n/process-exit-as-throw`

**Not portable to oxlint**

`array-bracket-spacing`, `arrow-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `dot-location`, `dot-notation`, `eol-last`, `func-call-spacing`, `generator-star-spacing`, `indent`, `key-spacing`, `keyword-spacing`, `lines-between-class-members`, `multiline-ternary`, `new-parens`, `no-dupe-args`, `no-extra-parens`, `no-floating-decimal`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multi-spaces`, `no-multiple-empty-lines`, `no-new-object`, `no-new-symbol`, `no-octal`, `no-octal-escape`, `no-tabs`, `no-trailing-spaces`, `no-undef-init`, `no-whitespace-before-property`, `object-curly-newline`, `object-curly-spacing`, `object-property-newline`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `rest-spread-spacing`, `semi`, `semi-spacing`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `template-curly-spacing`, `template-tag-spacing`, `wrap-iife`, `yield-star-spacing`

**Available as nursery rules (experimental, opt-in)**

`no-undef`, `no-unreachable`, `import/export`

</details>

### `oxlint-config-presets/google`

<details>
<summary>41 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`valid-jsdoc`, `one-var`, `require-jsdoc`

**Not portable to oxlint**

`no-invalid-this`, `no-multi-spaces`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `func-call-spacing`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `max-len`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-tabs`, `no-trailing-spaces`, `object-curly-spacing`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `space-before-blocks`, `space-before-function-paren`, `spaced-comment`, `switch-colon-spacing`, `arrow-parens`, `generator-star-spacing`, `no-new-symbol`, `rest-spread-spacing`, `yield-star-spacing`

</details>

### `oxlint-config-presets/eslint-js/recommended`

<details>
<summary>6 rules have no oxlint equivalent</summary>

**Available as nursery rules (experimental, opt-in)**

`getter-return`, `no-undef`, `no-unreachable`

**Not portable to oxlint**

`no-dupe-args`, `no-octal`

**Not yet implemented in oxlint**

`no-useless-assignment`

</details>

### `oxlint-config-presets/eslint-js/all`

<details>
<summary>32 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`camelcase`, `consistent-return`, `dot-notation`, `no-dupe-args`, `no-invalid-this`, `no-octal`, `no-octal-escape`, `no-undef-init`

**Not yet implemented in oxlint**

`consistent-this`, `func-name-matching`, `id-denylist`, `id-match`, `logical-assignment-operators`, `no-implicit-globals`, `no-implied-eval`, `no-restricted-exports`, `no-restricted-properties`, `no-restricted-syntax`, `no-underscore-dangle`, `no-unreachable-loop`, `no-useless-assignment`, `object-shorthand`, `one-var`, `prefer-arrow-callback`, `prefer-named-capture-group`, `prefer-regex-literals`, `require-atomic-updates`, `require-unicode-regexp`, `strict`

**Available as nursery rules (experimental, opt-in)**

`getter-return`, `no-undef`, `no-unreachable`

</details>
