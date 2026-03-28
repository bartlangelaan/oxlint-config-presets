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
| `oxlint-config-presets/airbnb` | `eslint-config-airbnb` | 211 |
| `oxlint-config-presets/airbnb/base` | `eslint-config-airbnb/base` | 149 |
| `oxlint-config-presets/airbnb/hooks` | `eslint-config-airbnb/hooks` | 2 |
| `oxlint-config-presets/airbnb/legacy` | `eslint-config-airbnb/legacy` | 114 |
| `oxlint-config-presets/airbnb/whitespace` | `eslint-config-airbnb/whitespace` | 211 |
| `oxlint-config-presets/standard` | `eslint-config-standard` | 98 |
| `oxlint-config-presets/google` | `eslint-config-google` | 21 |
| `oxlint-config-presets/typescript-eslint/recommended` | `@typescript-eslint/eslint-plugin — recommended` | 24 |
| `oxlint-config-presets/typescript-eslint/recommended-type-checked` | `@typescript-eslint/eslint-plugin — recommended-type-checked` | 24 |
| `oxlint-config-presets/typescript-eslint/strict` | `@typescript-eslint/eslint-plugin — strict` | 32 |
| `oxlint-config-presets/typescript-eslint/strict-type-checked` | `@typescript-eslint/eslint-plugin — strict-type-checked` | 32 |
| `oxlint-config-presets/typescript-eslint/stylistic` | `@typescript-eslint/eslint-plugin — stylistic` | 17 |
| `oxlint-config-presets/typescript-eslint/stylistic-type-checked` | `@typescript-eslint/eslint-plugin — stylistic-type-checked` | 17 |
| `oxlint-config-presets/typescript-eslint/all` | `@typescript-eslint/eslint-plugin — all` | 65 |
| `oxlint-config-presets/eslint-js/recommended` | `@eslint/js — recommended` | 61 |
| `oxlint-config-presets/eslint-js/all` | `@eslint/js — all` | 169 |

### `oxlint-config-presets/airbnb`

<details>
<summary>135 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`consistent-return`, `dot-notation`, `dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `jsx-quotes`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`, `react/forbid-prop-types`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/jsx-wrap-multilines`, `react/jsx-first-prop-new-line`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/no-unused-prop-types`, `react/jsx-tag-spacing`, `react/forbid-foreign-prop-types`, `react/default-props-match-prop-types`, `react/no-unused-state`, `react/jsx-one-expression-per-line`, `react/no-access-state-in-setstate`, `react/jsx-props-no-multi-spaces`, `react/jsx-curly-newline`, `react/static-property-placement`, `react/prefer-exact-props`, `react/no-unused-class-component-methods`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`, `react/jsx-no-bind`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`, `react/no-typos`, `react/destructuring-assignment`, `react/function-component-definition`, `react/no-unstable-nested-components`, `react/no-arrow-function-lifecycle`, `react/no-invalid-html-attribute`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`

</details>

### `oxlint-config-presets/airbnb/base`

<details>
<summary>92 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`consistent-return`, `dot-notation`, `dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`

</details>

### `oxlint-config-presets/airbnb/hooks`

### `oxlint-config-presets/airbnb/legacy`

<details>
<summary>74 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`consistent-return`, `dot-notation`, `dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `strict`

</details>

### `oxlint-config-presets/airbnb/whitespace`

<details>
<summary>135 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`consistent-return`, `dot-notation`, `dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `jsx-quotes`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`, `react/forbid-prop-types`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/jsx-wrap-multilines`, `react/jsx-first-prop-new-line`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/no-unused-prop-types`, `react/jsx-tag-spacing`, `react/forbid-foreign-prop-types`, `react/default-props-match-prop-types`, `react/no-unused-state`, `react/jsx-one-expression-per-line`, `react/no-access-state-in-setstate`, `react/jsx-props-no-multi-spaces`, `react/jsx-curly-newline`, `react/static-property-placement`, `react/prefer-exact-props`, `react/no-unused-class-component-methods`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`, `react/jsx-no-bind`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`, `react/no-typos`, `react/destructuring-assignment`, `react/function-component-definition`, `react/no-unstable-nested-components`, `react/no-arrow-function-lifecycle`, `react/no-invalid-html-attribute`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`

</details>

### `oxlint-config-presets/standard`

<details>
<summary>63 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`object-shorthand`, `no-implied-eval`, `no-unreachable-loop`, `one-var`, `prefer-regex-literals`, `n/no-callback-literal`, `n/no-deprecated-api`, `n/process-exit-as-throw`

**Not portable to oxlint**

`array-bracket-spacing`, `arrow-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `dot-location`, `dot-notation`, `eol-last`, `func-call-spacing`, `generator-star-spacing`, `indent`, `key-spacing`, `keyword-spacing`, `lines-between-class-members`, `multiline-ternary`, `new-parens`, `no-dupe-args`, `no-extra-parens`, `no-floating-decimal`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multi-spaces`, `no-multiple-empty-lines`, `no-new-object`, `no-new-symbol`, `no-octal`, `no-octal-escape`, `no-tabs`, `no-trailing-spaces`, `no-undef-init`, `no-whitespace-before-property`, `object-curly-newline`, `object-curly-spacing`, `object-property-newline`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `rest-spread-spacing`, `semi`, `semi-spacing`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `template-curly-spacing`, `template-tag-spacing`, `wrap-iife`, `yield-star-spacing`

</details>

### `oxlint-config-presets/google`

<details>
<summary>41 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`valid-jsdoc`, `one-var`, `require-jsdoc`

**Not portable to oxlint**

`no-invalid-this`, `no-multi-spaces`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `func-call-spacing`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `max-len`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-tabs`, `no-trailing-spaces`, `object-curly-spacing`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `space-before-blocks`, `space-before-function-paren`, `spaced-comment`, `switch-colon-spacing`, `arrow-parens`, `generator-star-spacing`, `no-new-symbol`, `rest-spread-spacing`, `yield-star-spacing`

</details>

### `oxlint-config-presets/typescript-eslint/recommended`

### `oxlint-config-presets/typescript-eslint/recommended-type-checked`

<details>
<summary>23 rules have no oxlint equivalent</summary>

**Require type-aware linting**

`@typescript-eslint/await-thenable`, `@typescript-eslint/no-array-delete`, `@typescript-eslint/no-base-to-string`, `@typescript-eslint/no-duplicate-type-constituents`, `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-for-in-array`, `@typescript-eslint/no-implied-eval`, `@typescript-eslint/no-misused-promises`, `@typescript-eslint/no-redundant-type-constituents`, `@typescript-eslint/no-unnecessary-type-assertion`, `@typescript-eslint/no-unsafe-argument`, `@typescript-eslint/no-unsafe-assignment`, `@typescript-eslint/no-unsafe-call`, `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/no-unsafe-member-access`, `@typescript-eslint/no-unsafe-return`, `@typescript-eslint/no-unsafe-unary-minus`, `@typescript-eslint/only-throw-error`, `@typescript-eslint/prefer-promise-reject-errors`, `@typescript-eslint/require-await`, `@typescript-eslint/restrict-plus-operands`, `@typescript-eslint/restrict-template-expressions`, `@typescript-eslint/unbound-method`

</details>

### `oxlint-config-presets/typescript-eslint/strict`

### `oxlint-config-presets/typescript-eslint/strict-type-checked`

<details>
<summary>40 rules have no oxlint equivalent</summary>

**Require type-aware linting**

`@typescript-eslint/await-thenable`, `@typescript-eslint/no-array-delete`, `@typescript-eslint/no-base-to-string`, `@typescript-eslint/no-confusing-void-expression`, `@typescript-eslint/no-deprecated`, `@typescript-eslint/no-duplicate-type-constituents`, `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-for-in-array`, `@typescript-eslint/no-implied-eval`, `@typescript-eslint/no-meaningless-void-operator`, `@typescript-eslint/no-misused-promises`, `@typescript-eslint/no-misused-spread`, `@typescript-eslint/no-mixed-enums`, `@typescript-eslint/no-redundant-type-constituents`, `@typescript-eslint/no-unnecessary-boolean-literal-compare`, `@typescript-eslint/no-unnecessary-condition`, `@typescript-eslint/no-unnecessary-template-expression`, `@typescript-eslint/no-unnecessary-type-arguments`, `@typescript-eslint/no-unnecessary-type-assertion`, `@typescript-eslint/no-unnecessary-type-conversion`, `@typescript-eslint/no-unnecessary-type-parameters`, `@typescript-eslint/no-unsafe-argument`, `@typescript-eslint/no-unsafe-assignment`, `@typescript-eslint/no-unsafe-call`, `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/no-unsafe-member-access`, `@typescript-eslint/no-unsafe-return`, `@typescript-eslint/no-unsafe-unary-minus`, `@typescript-eslint/no-useless-default-assignment`, `@typescript-eslint/only-throw-error`, `@typescript-eslint/prefer-promise-reject-errors`, `@typescript-eslint/prefer-reduce-type-parameter`, `@typescript-eslint/prefer-return-this-type`, `@typescript-eslint/related-getter-setter-pairs`, `@typescript-eslint/require-await`, `@typescript-eslint/restrict-plus-operands`, `@typescript-eslint/restrict-template-expressions`, `@typescript-eslint/return-await`, `@typescript-eslint/unbound-method`, `@typescript-eslint/use-unknown-in-catch-callback-variable`

</details>

### `oxlint-config-presets/typescript-eslint/stylistic`

### `oxlint-config-presets/typescript-eslint/stylistic-type-checked`

<details>
<summary>8 rules have no oxlint equivalent</summary>

**Require type-aware linting**

`@typescript-eslint/dot-notation`, `@typescript-eslint/non-nullable-type-assertion-style`, `@typescript-eslint/prefer-find`, `@typescript-eslint/prefer-includes`, `@typescript-eslint/prefer-nullish-coalescing`, `@typescript-eslint/prefer-optional-chain`, `@typescript-eslint/prefer-regexp-exec`, `@typescript-eslint/prefer-string-starts-ends-with`

</details>

### `oxlint-config-presets/typescript-eslint/all`

<details>
<summary>66 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`@typescript-eslint/explicit-member-accessibility`, `@typescript-eslint/member-ordering`, `@typescript-eslint/method-signature-style`, `@typescript-eslint/naming-convention`, `@typescript-eslint/no-unused-private-class-members`, `@typescript-eslint/prefer-destructuring`

**Not portable to oxlint**

`@typescript-eslint/no-invalid-this`

**Require type-aware linting**

`@typescript-eslint/await-thenable`, `@typescript-eslint/consistent-return`, `@typescript-eslint/consistent-type-exports`, `@typescript-eslint/dot-notation`, `@typescript-eslint/no-array-delete`, `@typescript-eslint/no-base-to-string`, `@typescript-eslint/no-confusing-void-expression`, `@typescript-eslint/no-deprecated`, `@typescript-eslint/no-duplicate-type-constituents`, `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-for-in-array`, `@typescript-eslint/no-implied-eval`, `@typescript-eslint/no-meaningless-void-operator`, `@typescript-eslint/no-misused-promises`, `@typescript-eslint/no-misused-spread`, `@typescript-eslint/no-mixed-enums`, `@typescript-eslint/no-redundant-type-constituents`, `@typescript-eslint/no-unnecessary-boolean-literal-compare`, `@typescript-eslint/no-unnecessary-condition`, `@typescript-eslint/no-unnecessary-qualifier`, `@typescript-eslint/no-unnecessary-template-expression`, `@typescript-eslint/no-unnecessary-type-arguments`, `@typescript-eslint/no-unnecessary-type-assertion`, `@typescript-eslint/no-unnecessary-type-conversion`, `@typescript-eslint/no-unnecessary-type-parameters`, `@typescript-eslint/no-unsafe-argument`, `@typescript-eslint/no-unsafe-assignment`, `@typescript-eslint/no-unsafe-call`, `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/no-unsafe-member-access`, `@typescript-eslint/no-unsafe-return`, `@typescript-eslint/no-unsafe-type-assertion`, `@typescript-eslint/no-unsafe-unary-minus`, `@typescript-eslint/no-useless-default-assignment`, `@typescript-eslint/non-nullable-type-assertion-style`, `@typescript-eslint/only-throw-error`, `@typescript-eslint/prefer-find`, `@typescript-eslint/prefer-includes`, `@typescript-eslint/prefer-nullish-coalescing`, `@typescript-eslint/prefer-optional-chain`, `@typescript-eslint/prefer-promise-reject-errors`, `@typescript-eslint/prefer-readonly`, `@typescript-eslint/prefer-readonly-parameter-types`, `@typescript-eslint/prefer-reduce-type-parameter`, `@typescript-eslint/prefer-regexp-exec`, `@typescript-eslint/prefer-return-this-type`, `@typescript-eslint/prefer-string-starts-ends-with`, `@typescript-eslint/promise-function-async`, `@typescript-eslint/related-getter-setter-pairs`, `@typescript-eslint/require-array-sort-compare`, `@typescript-eslint/require-await`, `@typescript-eslint/restrict-plus-operands`, `@typescript-eslint/restrict-template-expressions`, `@typescript-eslint/return-await`, `@typescript-eslint/strict-boolean-expressions`, `@typescript-eslint/strict-void-return`, `@typescript-eslint/switch-exhaustiveness-check`, `@typescript-eslint/unbound-method`, `@typescript-eslint/use-unknown-in-catch-callback-variable`

</details>

### `oxlint-config-presets/eslint-js/recommended`

<details>
<summary>3 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`no-dupe-args`, `no-octal`

**Not yet implemented in oxlint**

`no-useless-assignment`

</details>

### `oxlint-config-presets/eslint-js/all`

<details>
<summary>29 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`camelcase`, `consistent-return`, `dot-notation`, `no-dupe-args`, `no-invalid-this`, `no-octal`, `no-octal-escape`, `no-undef-init`

**Not yet implemented in oxlint**

`consistent-this`, `func-name-matching`, `id-denylist`, `id-match`, `logical-assignment-operators`, `no-implicit-globals`, `no-implied-eval`, `no-restricted-exports`, `no-restricted-properties`, `no-restricted-syntax`, `no-underscore-dangle`, `no-unreachable-loop`, `no-useless-assignment`, `object-shorthand`, `one-var`, `prefer-arrow-callback`, `prefer-named-capture-group`, `prefer-regex-literals`, `require-atomic-updates`, `require-unicode-regexp`, `strict`

</details>
