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
| `oxlint-config-presets/airbnb` | `eslint-config-airbnb` | 213 |
| `oxlint-config-presets/airbnb/base` | `eslint-config-airbnb/base` | 151 |
| `oxlint-config-presets/airbnb/hooks` | `eslint-config-airbnb/hooks` | 2 |
| `oxlint-config-presets/airbnb/legacy` | `eslint-config-airbnb/legacy` | 116 |
| `oxlint-config-presets/airbnb/whitespace` | `eslint-config-airbnb/whitespace` | 213 |
| `oxlint-config-presets/standard` | `eslint-config-standard` | 99 |
| `oxlint-config-presets/google` | `eslint-config-google` | 21 |
| `oxlint-config-presets/typescript-eslint/recommended` | `@typescript-eslint/eslint-plugin — recommended` | 24 |
| `oxlint-config-presets/typescript-eslint/recommended-type-checked` | `@typescript-eslint/eslint-plugin — recommended-type-checked` | 47 |
| `oxlint-config-presets/typescript-eslint/strict` | `@typescript-eslint/eslint-plugin — strict` | 32 |
| `oxlint-config-presets/typescript-eslint/strict-type-checked` | `@typescript-eslint/eslint-plugin — strict-type-checked` | 72 |
| `oxlint-config-presets/typescript-eslint/stylistic` | `@typescript-eslint/eslint-plugin — stylistic` | 17 |
| `oxlint-config-presets/typescript-eslint/stylistic-type-checked` | `@typescript-eslint/eslint-plugin — stylistic-type-checked` | 25 |
| `oxlint-config-presets/typescript-eslint/all` | `@typescript-eslint/eslint-plugin — all` | 124 |
| `oxlint-config-presets/eslint-js/recommended` | `@eslint/js — recommended` | 61 |
| `oxlint-config-presets/eslint-js/all` | `@eslint/js — all` | 171 |

### `oxlint-config-presets/airbnb`

<details>
<summary>210 rules successfully migrated</summary>

`array-callback-return`, `block-scoped-var`, `class-methods-use-this`, `@typescript-eslint/consistent-return`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `grouped-accessor-pairs`, `guard-for-in`, `max-classes-per-file`, `no-alert`, `no-caller`, `no-case-declarations`, `no-constructor-return`, `no-else-return`, `no-empty-function`, `no-empty-pattern`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-fallthrough`, `no-global-assign`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-param-reassign`, `no-proto`, `no-redeclare`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-throw-literal`, `no-unused-expressions`, `no-unused-labels`, `no-useless-catch`, `no-useless-concat`, `no-useless-escape`, `no-useless-return`, `no-void`, `no-with`, `prefer-promise-reject-errors`, `radix`, `vars-on-top`, `yoda`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-await-in-loop`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-ex-assign`, `no-extra-boolean-cast`, `no-func-assign`, `no-import-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-obj-calls`, `no-promise-executor-return`, `no-prototype-builtins`, `no-regex-spaces`, `no-setter-return`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-useless-backreference`, `use-isnan`, `valid-typeof`, `func-names`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-continue`, `no-lonely-if`, `no-multi-assign`, `no-nested-ternary`, `no-plusplus`, `no-unneeded-ternary`, `operator-assignment`, `prefer-exponentiation-operator`, `prefer-object-spread`, `unicode-bom`, `no-delete-var`, `no-label-var`, `no-restricted-globals`, `no-shadow`, `no-shadow-restricted-names`, `no-undef`, `no-unused-vars`, `no-use-before-define`, `arrow-body-style`, `constructor-super`, `no-class-assign`, `no-const-assign`, `no-dupe-class-members`, `no-this-before-super`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-rename`, `no-var`, `prefer-const`, `prefer-destructuring`, `prefer-numeric-literals`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `require-yield`, `symbol-description`, `import/named`, `import/export`, `import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-mutable-exports`, `import/no-amd`, `import/first`, `import/no-duplicates`, `import/extensions`, `import/prefer-default-export`, `import/no-absolute-path`, `import/no-dynamic-require`, `import/no-webpack-loader-syntax`, `import/no-named-default`, `import/no-self-import`, `react/jsx-boolean-value`, `react/jsx-no-undef`, `react/jsx-pascal-case`, `react/no-danger`, `react/no-will-update-set-state`, `react/no-is-mounted`, `react/no-string-refs`, `react/no-unknown-property`, `react/prefer-es6-class`, `react/react-in-jsx-scope`, `react/require-render-return`, `react/self-closing-comp`, `react/jsx-no-target-blank`, `react/jsx-filename-extension`, `react/jsx-no-comment-textnodes`, `react/no-render-return-value`, `react/no-find-dom-node`, `react/no-danger-with-children`, `react/style-prop-object`, `react/no-unescaped-entities`, `react/no-children-prop`, `react/no-array-index-key`, `react/void-dom-elements-no-children`, `react/no-redundant-should-component-update`, `react/jsx-curly-brace-presence`, `react/button-has-type`, `react/no-this-in-sfc`, `react/jsx-fragments`, `react/state-in-constructor`, `react/jsx-props-no-spreading`, `react/jsx-no-script-url`, `react/jsx-no-useless-fragment`, `react/jsx-no-constructed-context-values`, `react/no-namespace`, `jsx-a11y/alt-text`, `jsx-a11y/anchor-is-valid`, `jsx-a11y/aria-activedescendant-has-tabindex`, `jsx-a11y/aria-props`, `jsx-a11y/aria-proptypes`, `jsx-a11y/aria-role`, `jsx-a11y/aria-unsupported-elements`, `jsx-a11y/click-events-have-key-events`, `jsx-a11y/heading-has-content`, `jsx-a11y/html-has-lang`, `jsx-a11y/iframe-has-title`, `jsx-a11y/img-redundant-alt`, `jsx-a11y/label-has-associated-control`, `jsx-a11y/lang`, `jsx-a11y/media-has-caption`, `jsx-a11y/mouse-events-have-key-events`, `jsx-a11y/no-access-key`, `jsx-a11y/no-autofocus`, `jsx-a11y/no-distracting-elements`, `jsx-a11y/no-noninteractive-tabindex`, `jsx-a11y/no-redundant-roles`, `jsx-a11y/no-static-element-interactions`, `jsx-a11y/role-has-required-aria-props`, `jsx-a11y/role-supports-aria-props`, `jsx-a11y/scope`, `jsx-a11y/tabindex-no-positive`

</details>

<details>
<summary>3 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`import/no-cycle`, `jsx-a11y/anchor-has-content`, `react/jsx-no-duplicate-props`

</details>

<details>
<summary>133 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `jsx-quotes`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`, `react/forbid-prop-types`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/jsx-wrap-multilines`, `react/jsx-first-prop-new-line`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/no-unused-prop-types`, `react/jsx-tag-spacing`, `react/forbid-foreign-prop-types`, `react/default-props-match-prop-types`, `react/no-unused-state`, `react/jsx-one-expression-per-line`, `react/no-access-state-in-setstate`, `react/jsx-props-no-multi-spaces`, `react/jsx-curly-newline`, `react/static-property-placement`, `react/prefer-exact-props`, `react/no-unused-class-component-methods`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`, `react/jsx-no-bind`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`, `react/no-typos`, `react/destructuring-assignment`, `react/function-component-definition`, `react/no-unstable-nested-components`, `react/no-arrow-function-lifecycle`, `react/no-invalid-html-attribute`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`

</details>

### `oxlint-config-presets/airbnb/base`

<details>
<summary>150 rules successfully migrated</summary>

`array-callback-return`, `block-scoped-var`, `class-methods-use-this`, `@typescript-eslint/consistent-return`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `grouped-accessor-pairs`, `guard-for-in`, `max-classes-per-file`, `no-alert`, `no-caller`, `no-case-declarations`, `no-constructor-return`, `no-else-return`, `no-empty-function`, `no-empty-pattern`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-fallthrough`, `no-global-assign`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-param-reassign`, `no-proto`, `no-redeclare`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-throw-literal`, `no-unused-expressions`, `no-unused-labels`, `no-useless-catch`, `no-useless-concat`, `no-useless-escape`, `no-useless-return`, `no-void`, `no-with`, `prefer-promise-reject-errors`, `radix`, `vars-on-top`, `yoda`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-await-in-loop`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-ex-assign`, `no-extra-boolean-cast`, `no-func-assign`, `no-import-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-obj-calls`, `no-promise-executor-return`, `no-prototype-builtins`, `no-regex-spaces`, `no-setter-return`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-useless-backreference`, `use-isnan`, `valid-typeof`, `func-names`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-continue`, `no-lonely-if`, `no-multi-assign`, `no-nested-ternary`, `no-plusplus`, `no-unneeded-ternary`, `operator-assignment`, `prefer-exponentiation-operator`, `prefer-object-spread`, `unicode-bom`, `no-delete-var`, `no-label-var`, `no-restricted-globals`, `no-shadow`, `no-shadow-restricted-names`, `no-undef`, `no-unused-vars`, `no-use-before-define`, `arrow-body-style`, `constructor-super`, `no-class-assign`, `no-const-assign`, `no-dupe-class-members`, `no-this-before-super`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-rename`, `no-var`, `prefer-const`, `prefer-destructuring`, `prefer-numeric-literals`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `require-yield`, `symbol-description`, `import/named`, `import/export`, `import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-mutable-exports`, `import/no-amd`, `import/first`, `import/no-duplicates`, `import/extensions`, `import/prefer-default-export`, `import/no-absolute-path`, `import/no-dynamic-require`, `import/no-webpack-loader-syntax`, `import/no-named-default`, `import/no-self-import`

</details>

<details>
<summary>1 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`import/no-cycle`

</details>

<details>
<summary>90 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`

</details>

### `oxlint-config-presets/airbnb/hooks`

<details>
<summary>2 rules successfully migrated</summary>

`react-hooks/rules-of-hooks`, `react-hooks/exhaustive-deps`

</details>

### `oxlint-config-presets/airbnb/legacy`

<details>
<summary>116 rules successfully migrated</summary>

`array-callback-return`, `block-scoped-var`, `class-methods-use-this`, `@typescript-eslint/consistent-return`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `grouped-accessor-pairs`, `guard-for-in`, `max-classes-per-file`, `no-alert`, `no-caller`, `no-case-declarations`, `no-constructor-return`, `no-else-return`, `no-empty-function`, `no-empty-pattern`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-fallthrough`, `no-global-assign`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-param-reassign`, `no-proto`, `no-redeclare`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-throw-literal`, `no-unused-expressions`, `no-unused-labels`, `no-useless-catch`, `no-useless-concat`, `no-useless-escape`, `no-useless-return`, `no-void`, `no-with`, `prefer-promise-reject-errors`, `radix`, `vars-on-top`, `yoda`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-await-in-loop`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-ex-assign`, `no-extra-boolean-cast`, `no-func-assign`, `no-import-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-obj-calls`, `no-promise-executor-return`, `no-prototype-builtins`, `no-regex-spaces`, `no-setter-return`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-useless-backreference`, `use-isnan`, `valid-typeof`, `func-names`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-continue`, `no-lonely-if`, `no-multi-assign`, `no-nested-ternary`, `no-plusplus`, `no-unneeded-ternary`, `operator-assignment`, `prefer-exponentiation-operator`, `unicode-bom`, `no-delete-var`, `no-label-var`, `no-restricted-globals`, `no-shadow`, `no-shadow-restricted-names`, `no-undef`, `no-unused-vars`, `no-use-before-define`

</details>

<details>
<summary>72 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `strict`

</details>

### `oxlint-config-presets/airbnb/whitespace`

<details>
<summary>210 rules successfully migrated</summary>

`array-callback-return`, `block-scoped-var`, `class-methods-use-this`, `@typescript-eslint/consistent-return`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `grouped-accessor-pairs`, `guard-for-in`, `max-classes-per-file`, `no-alert`, `no-caller`, `no-case-declarations`, `no-constructor-return`, `no-else-return`, `no-empty-function`, `no-empty-pattern`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-fallthrough`, `no-global-assign`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-param-reassign`, `no-proto`, `no-redeclare`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-throw-literal`, `no-unused-expressions`, `no-unused-labels`, `no-useless-catch`, `no-useless-concat`, `no-useless-escape`, `no-useless-return`, `no-void`, `no-with`, `prefer-promise-reject-errors`, `radix`, `vars-on-top`, `yoda`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-await-in-loop`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-ex-assign`, `no-extra-boolean-cast`, `no-func-assign`, `no-import-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-obj-calls`, `no-promise-executor-return`, `no-prototype-builtins`, `no-regex-spaces`, `no-setter-return`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-useless-backreference`, `use-isnan`, `valid-typeof`, `func-names`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-continue`, `no-lonely-if`, `no-multi-assign`, `no-nested-ternary`, `no-plusplus`, `no-unneeded-ternary`, `operator-assignment`, `prefer-exponentiation-operator`, `prefer-object-spread`, `unicode-bom`, `no-delete-var`, `no-label-var`, `no-restricted-globals`, `no-shadow`, `no-shadow-restricted-names`, `no-undef`, `no-unused-vars`, `no-use-before-define`, `arrow-body-style`, `constructor-super`, `no-class-assign`, `no-const-assign`, `no-dupe-class-members`, `no-this-before-super`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-rename`, `no-var`, `prefer-const`, `prefer-destructuring`, `prefer-numeric-literals`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `require-yield`, `symbol-description`, `import/named`, `import/export`, `import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-mutable-exports`, `import/no-amd`, `import/first`, `import/no-duplicates`, `import/extensions`, `import/prefer-default-export`, `import/no-absolute-path`, `import/no-dynamic-require`, `import/no-webpack-loader-syntax`, `import/no-named-default`, `import/no-self-import`, `react/jsx-boolean-value`, `react/jsx-no-undef`, `react/jsx-pascal-case`, `react/no-danger`, `react/no-will-update-set-state`, `react/no-is-mounted`, `react/no-string-refs`, `react/no-unknown-property`, `react/prefer-es6-class`, `react/react-in-jsx-scope`, `react/require-render-return`, `react/self-closing-comp`, `react/jsx-no-target-blank`, `react/jsx-filename-extension`, `react/jsx-no-comment-textnodes`, `react/no-render-return-value`, `react/no-find-dom-node`, `react/no-danger-with-children`, `react/style-prop-object`, `react/no-unescaped-entities`, `react/no-children-prop`, `react/no-array-index-key`, `react/void-dom-elements-no-children`, `react/no-redundant-should-component-update`, `react/jsx-curly-brace-presence`, `react/button-has-type`, `react/no-this-in-sfc`, `react/jsx-fragments`, `react/state-in-constructor`, `react/jsx-props-no-spreading`, `react/jsx-no-script-url`, `react/jsx-no-useless-fragment`, `react/jsx-no-constructed-context-values`, `react/no-namespace`, `jsx-a11y/alt-text`, `jsx-a11y/anchor-is-valid`, `jsx-a11y/aria-activedescendant-has-tabindex`, `jsx-a11y/aria-props`, `jsx-a11y/aria-proptypes`, `jsx-a11y/aria-role`, `jsx-a11y/aria-unsupported-elements`, `jsx-a11y/click-events-have-key-events`, `jsx-a11y/heading-has-content`, `jsx-a11y/html-has-lang`, `jsx-a11y/iframe-has-title`, `jsx-a11y/img-redundant-alt`, `jsx-a11y/label-has-associated-control`, `jsx-a11y/lang`, `jsx-a11y/media-has-caption`, `jsx-a11y/mouse-events-have-key-events`, `jsx-a11y/no-access-key`, `jsx-a11y/no-autofocus`, `jsx-a11y/no-distracting-elements`, `jsx-a11y/no-noninteractive-tabindex`, `jsx-a11y/no-redundant-roles`, `jsx-a11y/no-static-element-interactions`, `jsx-a11y/role-has-required-aria-props`, `jsx-a11y/role-supports-aria-props`, `jsx-a11y/scope`, `jsx-a11y/tabindex-no-positive`

</details>

<details>
<summary>3 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`import/no-cycle`, `jsx-a11y/anchor-has-content`, `react/jsx-no-duplicate-props`

</details>

<details>
<summary>133 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `jsx-quotes`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`, `react/forbid-prop-types`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/jsx-wrap-multilines`, `react/jsx-first-prop-new-line`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/no-unused-prop-types`, `react/jsx-tag-spacing`, `react/forbid-foreign-prop-types`, `react/default-props-match-prop-types`, `react/no-unused-state`, `react/jsx-one-expression-per-line`, `react/no-access-state-in-setstate`, `react/jsx-props-no-multi-spaces`, `react/jsx-curly-newline`, `react/static-property-placement`, `react/prefer-exact-props`, `react/no-unused-class-component-methods`

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`, `react/jsx-no-bind`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`, `react/no-typos`, `react/destructuring-assignment`, `react/function-component-definition`, `react/no-unstable-nested-components`, `react/no-arrow-function-lifecycle`, `react/no-invalid-html-attribute`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`

</details>

### `oxlint-config-presets/standard`

<details>
<summary>99 rules successfully migrated</summary>

`no-var`, `accessor-pairs`, `array-callback-return`, `constructor-super`, `curly`, `default-case-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `new-cap`, `no-array-constructor`, `no-async-promise-executor`, `no-caller`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-keys`, `no-duplicate-case`, `no-useless-backreference`, `no-empty`, `no-empty-character-class`, `no-empty-pattern`, `no-eval`, `no-ex-assign`, `no-extend-native`, `no-extra-bind`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loss-of-precision`, `no-misleading-character-class`, `no-prototype-builtins`, `no-useless-catch`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-obj-calls`, `no-proto`, `no-redeclare`, `no-regex-spaces`, `no-return-assign`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-this-before-super`, `no-throw-literal`, `no-undef`, `no-unexpected-multiline`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unused-expressions`, `no-unused-vars`, `no-use-before-define`, `no-useless-call`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-escape`, `no-useless-rename`, `no-useless-return`, `no-void`, `no-with`, `prefer-const`, `prefer-promise-reject-errors`, `symbol-description`, `unicode-bom`, `use-isnan`, `valid-typeof`, `yoda`, `import/export`, `import/first`, `import/no-absolute-path`, `import/no-duplicates`, `import/no-named-default`, `import/no-webpack-loader-syntax`, `promise/param-names`, `node/handle-callback-err`, `node/no-exports-assign`, `node/no-new-require`, `node/no-path-concat`

</details>

<details>
<summary>62 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`object-shorthand`, `no-implied-eval`, `no-unreachable-loop`, `one-var`, `prefer-regex-literals`, `n/no-callback-literal`, `n/no-deprecated-api`, `n/process-exit-as-throw`

**Not portable to oxlint**

`array-bracket-spacing`, `arrow-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `dot-location`, `eol-last`, `func-call-spacing`, `generator-star-spacing`, `indent`, `key-spacing`, `keyword-spacing`, `lines-between-class-members`, `multiline-ternary`, `new-parens`, `no-dupe-args`, `no-extra-parens`, `no-floating-decimal`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multi-spaces`, `no-multiple-empty-lines`, `no-new-object`, `no-new-symbol`, `no-octal`, `no-octal-escape`, `no-tabs`, `no-trailing-spaces`, `no-undef-init`, `no-whitespace-before-property`, `object-curly-newline`, `object-curly-spacing`, `object-property-newline`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `rest-spread-spacing`, `semi`, `semi-spacing`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `template-curly-spacing`, `template-tag-spacing`, `wrap-iife`, `yield-star-spacing`

</details>

### `oxlint-config-presets/google`

<details>
<summary>21 rules successfully migrated</summary>

`no-irregular-whitespace`, `no-unexpected-multiline`, `curly`, `guard-for-in`, `no-caller`, `no-extend-native`, `no-extra-bind`, `no-multi-str`, `no-new-wrappers`, `no-throw-literal`, `no-with`, `prefer-promise-reject-errors`, `no-unused-vars`, `new-cap`, `no-array-constructor`, `constructor-super`, `no-this-before-super`, `no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`

</details>

<details>
<summary>41 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`valid-jsdoc`, `one-var`, `require-jsdoc`

**Not portable to oxlint**

`no-invalid-this`, `no-multi-spaces`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `func-call-spacing`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `max-len`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-tabs`, `no-trailing-spaces`, `object-curly-spacing`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `space-before-blocks`, `space-before-function-paren`, `spaced-comment`, `switch-colon-spacing`, `arrow-parens`, `generator-star-spacing`, `no-new-symbol`, `rest-spread-spacing`, `yield-star-spacing`

</details>

### `oxlint-config-presets/typescript-eslint/recommended`

<details>
<summary>24 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/ban-ts-comment`, `no-array-constructor`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-extra-non-null-assertion`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-require-imports`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-function-type`, `no-unused-expressions`, `no-unused-vars`, `@typescript-eslint/no-wrapper-object-types`, `@typescript-eslint/prefer-as-const`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/triple-slash-reference`

</details>

### `oxlint-config-presets/typescript-eslint/recommended-type-checked`

<details>
<summary>47 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/await-thenable`, `@typescript-eslint/ban-ts-comment`, `no-array-constructor`, `@typescript-eslint/no-array-delete`, `@typescript-eslint/no-base-to-string`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-duplicate-type-constituents`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-extra-non-null-assertion`, `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-for-in-array`, `@typescript-eslint/no-implied-eval`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-misused-promises`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-redundant-type-constituents`, `@typescript-eslint/no-require-imports`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unnecessary-type-assertion`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/no-unsafe-argument`, `@typescript-eslint/no-unsafe-assignment`, `@typescript-eslint/no-unsafe-call`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/no-unsafe-function-type`, `@typescript-eslint/no-unsafe-member-access`, `@typescript-eslint/no-unsafe-return`, `@typescript-eslint/no-unsafe-unary-minus`, `no-unused-expressions`, `no-unused-vars`, `@typescript-eslint/no-wrapper-object-types`, `@typescript-eslint/only-throw-error`, `@typescript-eslint/prefer-as-const`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/prefer-promise-reject-errors`, `@typescript-eslint/require-await`, `@typescript-eslint/restrict-plus-operands`, `@typescript-eslint/restrict-template-expressions`, `@typescript-eslint/triple-slash-reference`, `@typescript-eslint/unbound-method`

</details>

### `oxlint-config-presets/typescript-eslint/strict`

<details>
<summary>32 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/ban-ts-comment`, `no-array-constructor`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-dynamic-delete`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-extra-non-null-assertion`, `@typescript-eslint/no-extraneous-class`, `@typescript-eslint/no-invalid-void-type`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-nullish-coalescing`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-non-null-assertion`, `@typescript-eslint/no-require-imports`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-function-type`, `no-unused-expressions`, `no-unused-vars`, `no-useless-constructor`, `@typescript-eslint/no-wrapper-object-types`, `@typescript-eslint/prefer-as-const`, `@typescript-eslint/prefer-literal-enum-member`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/triple-slash-reference`, `@typescript-eslint/unified-signatures`

</details>

### `oxlint-config-presets/typescript-eslint/strict-type-checked`

<details>
<summary>72 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/await-thenable`, `@typescript-eslint/ban-ts-comment`, `no-array-constructor`, `@typescript-eslint/no-array-delete`, `@typescript-eslint/no-base-to-string`, `@typescript-eslint/no-confusing-void-expression`, `@typescript-eslint/no-deprecated`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-duplicate-type-constituents`, `@typescript-eslint/no-dynamic-delete`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-extra-non-null-assertion`, `@typescript-eslint/no-extraneous-class`, `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-for-in-array`, `@typescript-eslint/no-implied-eval`, `@typescript-eslint/no-invalid-void-type`, `@typescript-eslint/no-meaningless-void-operator`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-misused-promises`, `@typescript-eslint/no-misused-spread`, `@typescript-eslint/no-mixed-enums`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-nullish-coalescing`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-non-null-assertion`, `@typescript-eslint/no-redundant-type-constituents`, `@typescript-eslint/no-require-imports`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unnecessary-boolean-literal-compare`, `@typescript-eslint/no-unnecessary-condition`, `@typescript-eslint/no-unnecessary-template-expression`, `@typescript-eslint/no-unnecessary-type-arguments`, `@typescript-eslint/no-unnecessary-type-assertion`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/no-unnecessary-type-conversion`, `@typescript-eslint/no-unnecessary-type-parameters`, `@typescript-eslint/no-unsafe-argument`, `@typescript-eslint/no-unsafe-assignment`, `@typescript-eslint/no-unsafe-call`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/no-unsafe-function-type`, `@typescript-eslint/no-unsafe-member-access`, `@typescript-eslint/no-unsafe-return`, `@typescript-eslint/no-unsafe-unary-minus`, `no-unused-expressions`, `no-unused-vars`, `no-useless-constructor`, `@typescript-eslint/no-useless-default-assignment`, `@typescript-eslint/no-wrapper-object-types`, `@typescript-eslint/only-throw-error`, `@typescript-eslint/prefer-as-const`, `@typescript-eslint/prefer-literal-enum-member`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/prefer-promise-reject-errors`, `@typescript-eslint/prefer-reduce-type-parameter`, `@typescript-eslint/prefer-return-this-type`, `@typescript-eslint/related-getter-setter-pairs`, `@typescript-eslint/require-await`, `@typescript-eslint/restrict-plus-operands`, `@typescript-eslint/restrict-template-expressions`, `@typescript-eslint/return-await`, `@typescript-eslint/triple-slash-reference`, `@typescript-eslint/unbound-method`, `@typescript-eslint/unified-signatures`, `@typescript-eslint/use-unknown-in-catch-callback-variable`

</details>

### `oxlint-config-presets/typescript-eslint/stylistic`

<details>
<summary>17 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/adjacent-overload-signatures`, `@typescript-eslint/array-type`, `@typescript-eslint/ban-tslint-comment`, `@typescript-eslint/class-literal-property-style`, `@typescript-eslint/consistent-generic-constructors`, `@typescript-eslint/consistent-indexed-object-style`, `@typescript-eslint/consistent-type-assertions`, `@typescript-eslint/consistent-type-definitions`, `@typescript-eslint/no-confusing-non-null-assertion`, `no-empty-function`, `@typescript-eslint/no-inferrable-types`, `@typescript-eslint/prefer-for-of`, `@typescript-eslint/prefer-function-type`

</details>

### `oxlint-config-presets/typescript-eslint/stylistic-type-checked`

<details>
<summary>25 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/adjacent-overload-signatures`, `@typescript-eslint/array-type`, `@typescript-eslint/ban-tslint-comment`, `@typescript-eslint/class-literal-property-style`, `@typescript-eslint/consistent-generic-constructors`, `@typescript-eslint/consistent-indexed-object-style`, `@typescript-eslint/consistent-type-assertions`, `@typescript-eslint/consistent-type-definitions`, `@typescript-eslint/dot-notation`, `@typescript-eslint/no-confusing-non-null-assertion`, `no-empty-function`, `@typescript-eslint/no-inferrable-types`, `@typescript-eslint/non-nullable-type-assertion-style`, `@typescript-eslint/prefer-find`, `@typescript-eslint/prefer-for-of`, `@typescript-eslint/prefer-function-type`, `@typescript-eslint/prefer-includes`, `@typescript-eslint/prefer-nullish-coalescing`, `@typescript-eslint/prefer-optional-chain`, `@typescript-eslint/prefer-regexp-exec`, `@typescript-eslint/prefer-string-starts-ends-with`

</details>

### `oxlint-config-presets/typescript-eslint/all`

<details>
<summary>124 rules successfully migrated</summary>

`no-dupe-class-members`, `no-redeclare`, `no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/adjacent-overload-signatures`, `@typescript-eslint/array-type`, `@typescript-eslint/await-thenable`, `@typescript-eslint/ban-ts-comment`, `@typescript-eslint/ban-tslint-comment`, `@typescript-eslint/class-literal-property-style`, `class-methods-use-this`, `@typescript-eslint/consistent-generic-constructors`, `@typescript-eslint/consistent-indexed-object-style`, `@typescript-eslint/consistent-return`, `@typescript-eslint/consistent-type-assertions`, `@typescript-eslint/consistent-type-definitions`, `@typescript-eslint/consistent-type-exports`, `@typescript-eslint/consistent-type-imports`, `default-param-last`, `@typescript-eslint/dot-notation`, `@typescript-eslint/explicit-function-return-type`, `@typescript-eslint/explicit-module-boundary-types`, `init-declarations`, `max-params`, `no-array-constructor`, `@typescript-eslint/no-array-delete`, `@typescript-eslint/no-base-to-string`, `@typescript-eslint/no-confusing-non-null-assertion`, `@typescript-eslint/no-confusing-void-expression`, `@typescript-eslint/no-deprecated`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-duplicate-type-constituents`, `@typescript-eslint/no-dynamic-delete`, `no-empty-function`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-extra-non-null-assertion`, `@typescript-eslint/no-extraneous-class`, `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-for-in-array`, `@typescript-eslint/no-implied-eval`, `@typescript-eslint/no-import-type-side-effects`, `@typescript-eslint/no-inferrable-types`, `@typescript-eslint/no-invalid-void-type`, `no-loop-func`, `no-magic-numbers`, `@typescript-eslint/no-meaningless-void-operator`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-misused-promises`, `@typescript-eslint/no-misused-spread`, `@typescript-eslint/no-mixed-enums`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-nullish-coalescing`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-non-null-assertion`, `@typescript-eslint/no-redundant-type-constituents`, `@typescript-eslint/no-require-imports`, `no-restricted-imports`, `@typescript-eslint/no-restricted-types`, `no-shadow`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unnecessary-boolean-literal-compare`, `@typescript-eslint/no-unnecessary-condition`, `@typescript-eslint/no-unnecessary-parameter-property-assignment`, `@typescript-eslint/no-unnecessary-qualifier`, `@typescript-eslint/no-unnecessary-template-expression`, `@typescript-eslint/no-unnecessary-type-arguments`, `@typescript-eslint/no-unnecessary-type-assertion`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/no-unnecessary-type-conversion`, `@typescript-eslint/no-unnecessary-type-parameters`, `@typescript-eslint/no-unsafe-argument`, `@typescript-eslint/no-unsafe-assignment`, `@typescript-eslint/no-unsafe-call`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/no-unsafe-function-type`, `@typescript-eslint/no-unsafe-member-access`, `@typescript-eslint/no-unsafe-return`, `@typescript-eslint/no-unsafe-type-assertion`, `@typescript-eslint/no-unsafe-unary-minus`, `no-unused-expressions`, `no-unused-vars`, `no-use-before-define`, `no-useless-constructor`, `@typescript-eslint/no-useless-default-assignment`, `@typescript-eslint/no-useless-empty-export`, `@typescript-eslint/no-wrapper-object-types`, `@typescript-eslint/non-nullable-type-assertion-style`, `@typescript-eslint/only-throw-error`, `@typescript-eslint/parameter-properties`, `@typescript-eslint/prefer-as-const`, `@typescript-eslint/prefer-enum-initializers`, `@typescript-eslint/prefer-find`, `@typescript-eslint/prefer-for-of`, `@typescript-eslint/prefer-function-type`, `@typescript-eslint/prefer-includes`, `@typescript-eslint/prefer-literal-enum-member`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/prefer-nullish-coalescing`, `@typescript-eslint/prefer-optional-chain`, `@typescript-eslint/prefer-promise-reject-errors`, `@typescript-eslint/prefer-readonly`, `@typescript-eslint/prefer-readonly-parameter-types`, `@typescript-eslint/prefer-reduce-type-parameter`, `@typescript-eslint/prefer-regexp-exec`, `@typescript-eslint/prefer-return-this-type`, `@typescript-eslint/prefer-string-starts-ends-with`, `@typescript-eslint/promise-function-async`, `@typescript-eslint/related-getter-setter-pairs`, `@typescript-eslint/require-array-sort-compare`, `@typescript-eslint/require-await`, `@typescript-eslint/restrict-plus-operands`, `@typescript-eslint/restrict-template-expressions`, `@typescript-eslint/return-await`, `@typescript-eslint/strict-boolean-expressions`, `@typescript-eslint/strict-void-return`, `@typescript-eslint/switch-exhaustiveness-check`, `@typescript-eslint/triple-slash-reference`, `@typescript-eslint/unbound-method`, `@typescript-eslint/unified-signatures`, `@typescript-eslint/use-unknown-in-catch-callback-variable`

</details>

<details>
<summary>7 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`@typescript-eslint/explicit-member-accessibility`, `@typescript-eslint/member-ordering`, `@typescript-eslint/method-signature-style`, `@typescript-eslint/naming-convention`, `@typescript-eslint/no-unused-private-class-members`, `@typescript-eslint/prefer-destructuring`

**Not portable to oxlint**

`@typescript-eslint/no-invalid-this`

</details>

### `oxlint-config-presets/eslint-js/recommended`

<details>
<summary>61 rules successfully migrated</summary>

`constructor-super`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-empty-pattern`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-unassigned-vars`, `no-undef`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-backreference`, `no-useless-catch`, `no-useless-escape`, `no-with`, `preserve-caught-error`, `require-yield`, `use-isnan`, `valid-typeof`

</details>

<details>
<summary>3 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`no-dupe-args`, `no-octal`

**Not yet implemented in oxlint**

`no-useless-assignment`

</details>

### `oxlint-config-presets/eslint-js/all`

<details>
<summary>171 rules successfully migrated</summary>

`accessor-pairs`, `array-callback-return`, `arrow-body-style`, `block-scoped-var`, `capitalized-comments`, `class-methods-use-this`, `complexity`, `@typescript-eslint/consistent-return`, `constructor-super`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `for-direction`, `func-names`, `func-style`, `getter-return`, `grouped-accessor-pairs`, `guard-for-in`, `id-length`, `init-declarations`, `max-classes-per-file`, `max-depth`, `max-lines`, `max-lines-per-function`, `max-nested-callbacks`, `max-params`, `max-statements`, `new-cap`, `no-alert`, `no-array-constructor`, `no-async-promise-executor`, `no-await-in-loop`, `no-bitwise`, `no-caller`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-constructor-return`, `no-continue`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-div-regex`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-duplicate-imports`, `no-else-return`, `no-empty`, `no-empty-character-class`, `no-empty-function`, `no-empty-pattern`, `no-empty-static-block`, `no-eq-null`, `no-eval`, `no-ex-assign`, `no-extend-native`, `no-extra-bind`, `no-extra-boolean-cast`, `no-extra-label`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-implicit-coercion`, `no-import-assign`, `no-inline-comments`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-iterator`, `no-label-var`, `no-labels`, `no-lone-blocks`, `no-lonely-if`, `no-loop-func`, `no-loss-of-precision`, `no-magic-numbers`, `no-misleading-character-class`, `no-multi-assign`, `no-multi-str`, `no-negated-condition`, `no-nested-ternary`, `no-new`, `no-new-func`, `no-new-native-nonconstructor`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-object-constructor`, `no-param-reassign`, `no-plusplus`, `no-promise-executor-return`, `no-proto`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-restricted-globals`, `no-restricted-imports`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-setter-return`, `no-shadow`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-ternary`, `no-this-before-super`, `no-throw-literal`, `no-unassigned-vars`, `no-undef`, `no-undefined`, `no-unexpected-multiline`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-expressions`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-use-before-define`, `no-useless-backreference`, `no-useless-call`, `no-useless-catch`, `no-useless-computed-key`, `no-useless-concat`, `no-useless-constructor`, `no-useless-escape`, `no-useless-rename`, `no-useless-return`, `no-var`, `no-void`, `no-warning-comments`, `no-with`, `operator-assignment`, `prefer-const`, `prefer-destructuring`, `prefer-exponentiation-operator`, `prefer-numeric-literals`, `prefer-object-has-own`, `prefer-object-spread`, `prefer-promise-reject-errors`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `preserve-caught-error`, `radix`, `require-await`, `require-yield`, `sort-keys`, `sort-vars`, `symbol-description`, `unicode-bom`, `use-isnan`, `valid-typeof`, `vars-on-top`, `yoda`

</details>

<details>
<summary>27 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`camelcase`, `no-dupe-args`, `no-invalid-this`, `no-octal`, `no-octal-escape`, `no-undef-init`

**Not yet implemented in oxlint**

`consistent-this`, `func-name-matching`, `id-denylist`, `id-match`, `logical-assignment-operators`, `no-implicit-globals`, `no-implied-eval`, `no-restricted-exports`, `no-restricted-properties`, `no-restricted-syntax`, `no-underscore-dangle`, `no-unreachable-loop`, `no-useless-assignment`, `object-shorthand`, `one-var`, `prefer-arrow-callback`, `prefer-named-capture-group`, `prefer-regex-literals`, `require-atomic-updates`, `require-unicode-regexp`, `strict`

</details>
