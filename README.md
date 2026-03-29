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

<!-- GENERATED CONFIGS START -->

## Available configs

| Source package                     | Source config                   | Oxlint config                                      |
| ---------------------------------- | ------------------------------- | -------------------------------------------------- |
| `eslint-config-airbnb`             |                                 | `airbnb.json`                                      |
| `eslint-config-airbnb`             | `base`                          | `airbnb/base.json`                                 |
| `eslint-config-airbnb`             | `hooks`                         | `airbnb/hooks.json`                                |
| `eslint-config-airbnb`             | `legacy`                        | `airbnb/legacy.json`                               |
| `eslint-config-airbnb`             | `whitespace`                    | `airbnb/whitespace.json`                           |
| `eslint-config-standard`           |                                 | `standard.json`                                    |
| `eslint-config-google`             |                                 | `google.json`                                      |
| `@typescript-eslint/eslint-plugin` | `recommended`                   | `@typescript-eslint/recommended.json`              |
| `@typescript-eslint/eslint-plugin` | `recommended-type-checked`      | `@typescript-eslint/recommended-type-checked.json` |
| `@typescript-eslint/eslint-plugin` | `strict`                        | `@typescript-eslint/strict.json`                   |
| `@typescript-eslint/eslint-plugin` | `strict-type-checked`           | `@typescript-eslint/strict-type-checked.json`      |
| `@typescript-eslint/eslint-plugin` | `stylistic`                     | `@typescript-eslint/stylistic.json`                |
| `@typescript-eslint/eslint-plugin` | `stylistic-type-checked`        | `@typescript-eslint/stylistic-type-checked.json`   |
| `@typescript-eslint/eslint-plugin` | `all`                           | `@typescript-eslint/all.json`                      |
| `@eslint/js`                       | `recommended`                   | `@eslint/recommended.json`                         |
| `@eslint/js`                       | `all`                           | `@eslint/all.json`                                 |
| `eslint-config-xo`                 |                                 | `xo.json`                                          |
| `eslint-config-problems`           |                                 | `problems.json`                                    |
| `eslint-config-hardcore`           |                                 | `hardcore.json`                                    |
| `eslint-config-wikimedia`          |                                 | `wikimedia.json`                                   |
| `eslint-config-eslint`             |                                 | `eslint.json`                                      |
| `eslint-config-eslint`             | `base`                          | `eslint/base.json`                                 |
| `eslint-config-alloy`              |                                 | `alloy.json`                                       |
| `eslint-config-alloy`              | `react`                         | `alloy/react.json`                                 |
| `eslint-config-alloy`              | `typescript`                    | `alloy/typescript.json`                            |
| `eslint-config-prettier`           |                                 | `prettier.json`                                    |
| `@antfu/eslint-config`             |                                 | `@antfu.json`                                      |
| `eslint-plugin-import`             | `recommended`                   | `import/recommended.json`                          |
| `eslint-plugin-import`             | `errors`                        | `import/errors.json`                               |
| `eslint-plugin-import`             | `warnings`                      | `import/warnings.json`                             |
| `eslint-plugin-import`             | `react`                         | `import/react.json`                                |
| `eslint-plugin-import`             | `typescript`                    | `import/typescript.json`                           |
| `eslint-plugin-import-x`           | `recommended`                   | `import-x/recommended.json`                        |
| `eslint-plugin-import-x`           | `errors`                        | `import-x/errors.json`                             |
| `eslint-plugin-import-x`           | `warnings`                      | `import-x/warnings.json`                           |
| `eslint-plugin-import-x`           | `react`                         | `import-x/react.json`                              |
| `eslint-plugin-import-x`           | `typescript`                    | `import-x/typescript.json`                         |
| `eslint-config-next`               | `recommended`                   | `next/recommended.json`                            |
| `eslint-config-next`               | `core-web-vitals`               | `next/core-web-vitals.json`                        |
| `eslint-plugin-react-perf`         | `recommended`                   | `react-perf/recommended.json`                      |
| `eslint-plugin-react-perf`         | `all`                           | `react-perf/all.json`                              |
| `eslint-plugin-jsdoc`              | `recommended`                   | `jsdoc/recommended.json`                           |
| `eslint-plugin-jsdoc`              | `recommended-typescript`        | `jsdoc/recommended-typescript.json`                |
| `eslint-plugin-jsdoc`              | `recommended-typescript-flavor` | `jsdoc/recommended-typescript-flavor.json`         |
| `eslint-plugin-jsdoc`              | `recommended-tsdoc`             | `jsdoc/recommended-tsdoc.json`                     |
| `eslint-plugin-jsx-a11y`           | `recommended`                   | `jsx-a11y/recommended.json`                        |
| `eslint-plugin-jsx-a11y`           | `strict`                        | `jsx-a11y/strict.json`                             |
| `eslint-plugin-n`                  | `recommended`                   | `n/recommended.json`                               |
| `eslint-plugin-n`                  | `recommended-module`            | `n/recommended-module.json`                        |
| `eslint-plugin-n`                  | `recommended-script`            | `n/recommended-script.json`                        |
| `eslint-plugin-promise`            | `recommended`                   | `promise/recommended.json`                         |
| `eslint-plugin-jest`               | `recommended`                   | `jest/recommended.json`                            |
| `eslint-plugin-jest`               | `style`                         | `jest/style.json`                                  |
| `eslint-plugin-jest`               | `all`                           | `jest/all.json`                                    |
| `@vitest/eslint-plugin`            | `recommended`                   | `@vitest/recommended.json`                         |
| `@vitest/eslint-plugin`            | `all`                           | `@vitest/all.json`                                 |
| `eslint-plugin-vue`                | `essential`                     | `vue/essential.json`                               |
| `eslint-plugin-vue`                | `strongly-recommended`          | `vue/strongly-recommended.json`                    |
| `eslint-plugin-vue`                | `recommended`                   | `vue/recommended.json`                             |
| `eslint-plugin-vue`                | `vue2-essential`                | `vue/vue2-essential.json`                          |
| `eslint-plugin-vue`                | `vue2-strongly-recommended`     | `vue/vue2-strongly-recommended.json`               |
| `eslint-plugin-vue`                | `vue2-recommended`              | `vue/vue2-recommended.json`                        |

### `airbnb.json`

```json
"./node_modules/oxlint-config-presets/airbnb.json"
```

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

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`, `react/jsx-no-bind`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`, `react/no-typos`, `react/destructuring-assignment`, `react/function-component-definition`, `react/no-unstable-nested-components`, `react/no-arrow-function-lifecycle`, `react/no-invalid-html-attribute`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `jsx-quotes`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`, `react/forbid-prop-types`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/jsx-wrap-multilines`, `react/jsx-first-prop-new-line`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/no-unused-prop-types`, `react/jsx-tag-spacing`, `react/forbid-foreign-prop-types`, `react/default-props-match-prop-types`, `react/no-unused-state`, `react/jsx-one-expression-per-line`, `react/no-access-state-in-setstate`, `react/jsx-props-no-multi-spaces`, `react/jsx-curly-newline`, `react/static-property-placement`, `react/prefer-exact-props`, `react/no-unused-class-component-methods`

</details>

### `airbnb/base.json`

```json
"./node_modules/oxlint-config-presets/airbnb/base.json"
```

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

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`

</details>

### `airbnb/hooks.json`

```json
"./node_modules/oxlint-config-presets/airbnb/hooks.json"
```

<details>
<summary>2 rules successfully migrated</summary>

`react-hooks/rules-of-hooks`, `react-hooks/exhaustive-deps`

</details>

### `airbnb/legacy.json`

```json
"./node_modules/oxlint-config-presets/airbnb/legacy.json"
```

<details>
<summary>116 rules successfully migrated</summary>

`array-callback-return`, `block-scoped-var`, `class-methods-use-this`, `@typescript-eslint/consistent-return`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `grouped-accessor-pairs`, `guard-for-in`, `max-classes-per-file`, `no-alert`, `no-caller`, `no-case-declarations`, `no-constructor-return`, `no-else-return`, `no-empty-function`, `no-empty-pattern`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-fallthrough`, `no-global-assign`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-param-reassign`, `no-proto`, `no-redeclare`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-throw-literal`, `no-unused-expressions`, `no-unused-labels`, `no-useless-catch`, `no-useless-concat`, `no-useless-escape`, `no-useless-return`, `no-void`, `no-with`, `prefer-promise-reject-errors`, `radix`, `vars-on-top`, `yoda`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-await-in-loop`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-ex-assign`, `no-extra-boolean-cast`, `no-func-assign`, `no-import-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-obj-calls`, `no-promise-executor-return`, `no-prototype-builtins`, `no-regex-spaces`, `no-setter-return`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-useless-backreference`, `use-isnan`, `valid-typeof`, `func-names`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-continue`, `no-lonely-if`, `no-multi-assign`, `no-nested-ternary`, `no-plusplus`, `no-unneeded-ternary`, `operator-assignment`, `prefer-exponentiation-operator`, `unicode-bom`, `no-delete-var`, `no-label-var`, `no-restricted-globals`, `no-shadow`, `no-shadow-restricted-names`, `no-undef`, `no-unused-vars`, `no-use-before-define`

</details>

<details>
<summary>72 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `strict`

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`

</details>

### `airbnb/whitespace.json`

```json
"./node_modules/oxlint-config-presets/airbnb/whitespace.json"
```

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

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-exports`, `object-shorthand`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`, `react/jsx-no-bind`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`, `react/no-typos`, `react/destructuring-assignment`, `react/function-component-definition`, `react/no-unstable-nested-components`, `react/no-arrow-function-lifecycle`, `react/no-invalid-html-attribute`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `jsx-quotes`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`, `react/forbid-prop-types`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/jsx-wrap-multilines`, `react/jsx-first-prop-new-line`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/no-unused-prop-types`, `react/jsx-tag-spacing`, `react/forbid-foreign-prop-types`, `react/default-props-match-prop-types`, `react/no-unused-state`, `react/jsx-one-expression-per-line`, `react/no-access-state-in-setstate`, `react/jsx-props-no-multi-spaces`, `react/jsx-curly-newline`, `react/static-property-placement`, `react/prefer-exact-props`, `react/no-unused-class-component-methods`

</details>

### `standard.json`

```json
"./node_modules/oxlint-config-presets/standard.json"
```

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

### `google.json`

```json
"./node_modules/oxlint-config-presets/google.json"
```

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

### `@typescript-eslint/recommended.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/recommended.json"
```

<details>
<summary>24 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/ban-ts-comment`, `no-array-constructor`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-extra-non-null-assertion`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-require-imports`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-function-type`, `no-unused-expressions`, `no-unused-vars`, `@typescript-eslint/no-wrapper-object-types`, `@typescript-eslint/prefer-as-const`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/triple-slash-reference`

</details>

### `@typescript-eslint/recommended-type-checked.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/recommended-type-checked.json"
```

<details>
<summary>47 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/await-thenable`, `@typescript-eslint/ban-ts-comment`, `no-array-constructor`, `@typescript-eslint/no-array-delete`, `@typescript-eslint/no-base-to-string`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-duplicate-type-constituents`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-extra-non-null-assertion`, `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-for-in-array`, `@typescript-eslint/no-implied-eval`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-misused-promises`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-redundant-type-constituents`, `@typescript-eslint/no-require-imports`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unnecessary-type-assertion`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/no-unsafe-argument`, `@typescript-eslint/no-unsafe-assignment`, `@typescript-eslint/no-unsafe-call`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/no-unsafe-function-type`, `@typescript-eslint/no-unsafe-member-access`, `@typescript-eslint/no-unsafe-return`, `@typescript-eslint/no-unsafe-unary-minus`, `no-unused-expressions`, `no-unused-vars`, `@typescript-eslint/no-wrapper-object-types`, `@typescript-eslint/only-throw-error`, `@typescript-eslint/prefer-as-const`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/prefer-promise-reject-errors`, `@typescript-eslint/require-await`, `@typescript-eslint/restrict-plus-operands`, `@typescript-eslint/restrict-template-expressions`, `@typescript-eslint/triple-slash-reference`, `@typescript-eslint/unbound-method`

</details>

### `@typescript-eslint/strict.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/strict.json"
```

<details>
<summary>32 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/ban-ts-comment`, `no-array-constructor`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-dynamic-delete`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-extra-non-null-assertion`, `@typescript-eslint/no-extraneous-class`, `@typescript-eslint/no-invalid-void-type`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-nullish-coalescing`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-non-null-assertion`, `@typescript-eslint/no-require-imports`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-function-type`, `no-unused-expressions`, `no-unused-vars`, `no-useless-constructor`, `@typescript-eslint/no-wrapper-object-types`, `@typescript-eslint/prefer-as-const`, `@typescript-eslint/prefer-literal-enum-member`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/triple-slash-reference`, `@typescript-eslint/unified-signatures`

</details>

### `@typescript-eslint/strict-type-checked.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/strict-type-checked.json"
```

<details>
<summary>72 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/await-thenable`, `@typescript-eslint/ban-ts-comment`, `no-array-constructor`, `@typescript-eslint/no-array-delete`, `@typescript-eslint/no-base-to-string`, `@typescript-eslint/no-confusing-void-expression`, `@typescript-eslint/no-deprecated`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-duplicate-type-constituents`, `@typescript-eslint/no-dynamic-delete`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-explicit-any`, `@typescript-eslint/no-extra-non-null-assertion`, `@typescript-eslint/no-extraneous-class`, `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-for-in-array`, `@typescript-eslint/no-implied-eval`, `@typescript-eslint/no-invalid-void-type`, `@typescript-eslint/no-meaningless-void-operator`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-misused-promises`, `@typescript-eslint/no-misused-spread`, `@typescript-eslint/no-mixed-enums`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-nullish-coalescing`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-non-null-assertion`, `@typescript-eslint/no-redundant-type-constituents`, `@typescript-eslint/no-require-imports`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unnecessary-boolean-literal-compare`, `@typescript-eslint/no-unnecessary-condition`, `@typescript-eslint/no-unnecessary-template-expression`, `@typescript-eslint/no-unnecessary-type-arguments`, `@typescript-eslint/no-unnecessary-type-assertion`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/no-unnecessary-type-conversion`, `@typescript-eslint/no-unnecessary-type-parameters`, `@typescript-eslint/no-unsafe-argument`, `@typescript-eslint/no-unsafe-assignment`, `@typescript-eslint/no-unsafe-call`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/no-unsafe-function-type`, `@typescript-eslint/no-unsafe-member-access`, `@typescript-eslint/no-unsafe-return`, `@typescript-eslint/no-unsafe-unary-minus`, `no-unused-expressions`, `no-unused-vars`, `no-useless-constructor`, `@typescript-eslint/no-useless-default-assignment`, `@typescript-eslint/no-wrapper-object-types`, `@typescript-eslint/only-throw-error`, `@typescript-eslint/prefer-as-const`, `@typescript-eslint/prefer-literal-enum-member`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/prefer-promise-reject-errors`, `@typescript-eslint/prefer-reduce-type-parameter`, `@typescript-eslint/prefer-return-this-type`, `@typescript-eslint/related-getter-setter-pairs`, `@typescript-eslint/require-await`, `@typescript-eslint/restrict-plus-operands`, `@typescript-eslint/restrict-template-expressions`, `@typescript-eslint/return-await`, `@typescript-eslint/triple-slash-reference`, `@typescript-eslint/unbound-method`, `@typescript-eslint/unified-signatures`, `@typescript-eslint/use-unknown-in-catch-callback-variable`

</details>

### `@typescript-eslint/stylistic.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/stylistic.json"
```

<details>
<summary>17 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/adjacent-overload-signatures`, `@typescript-eslint/array-type`, `@typescript-eslint/ban-tslint-comment`, `@typescript-eslint/class-literal-property-style`, `@typescript-eslint/consistent-generic-constructors`, `@typescript-eslint/consistent-indexed-object-style`, `@typescript-eslint/consistent-type-assertions`, `@typescript-eslint/consistent-type-definitions`, `@typescript-eslint/no-confusing-non-null-assertion`, `no-empty-function`, `@typescript-eslint/no-inferrable-types`, `@typescript-eslint/prefer-for-of`, `@typescript-eslint/prefer-function-type`

</details>

### `@typescript-eslint/stylistic-type-checked.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/stylistic-type-checked.json"
```

<details>
<summary>25 rules successfully migrated</summary>

`no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`, `@typescript-eslint/adjacent-overload-signatures`, `@typescript-eslint/array-type`, `@typescript-eslint/ban-tslint-comment`, `@typescript-eslint/class-literal-property-style`, `@typescript-eslint/consistent-generic-constructors`, `@typescript-eslint/consistent-indexed-object-style`, `@typescript-eslint/consistent-type-assertions`, `@typescript-eslint/consistent-type-definitions`, `@typescript-eslint/dot-notation`, `@typescript-eslint/no-confusing-non-null-assertion`, `no-empty-function`, `@typescript-eslint/no-inferrable-types`, `@typescript-eslint/non-nullable-type-assertion-style`, `@typescript-eslint/prefer-find`, `@typescript-eslint/prefer-for-of`, `@typescript-eslint/prefer-function-type`, `@typescript-eslint/prefer-includes`, `@typescript-eslint/prefer-nullish-coalescing`, `@typescript-eslint/prefer-optional-chain`, `@typescript-eslint/prefer-regexp-exec`, `@typescript-eslint/prefer-string-starts-ends-with`

</details>

### `@typescript-eslint/all.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/all.json"
```

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

### `@eslint/recommended.json`

```json
"./node_modules/oxlint-config-presets/@eslint/recommended.json"
```

<details>
<summary>61 rules successfully migrated</summary>

`constructor-super`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-empty-pattern`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-unassigned-vars`, `no-undef`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-backreference`, `no-useless-catch`, `no-useless-escape`, `no-with`, `preserve-caught-error`, `require-yield`, `use-isnan`, `valid-typeof`

</details>

<details>
<summary>3 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-useless-assignment`

**Not portable to oxlint**

`no-dupe-args`, `no-octal`

</details>

### `@eslint/all.json`

```json
"./node_modules/oxlint-config-presets/@eslint/all.json"
```

<details>
<summary>171 rules successfully migrated</summary>

`accessor-pairs`, `array-callback-return`, `arrow-body-style`, `block-scoped-var`, `capitalized-comments`, `class-methods-use-this`, `complexity`, `@typescript-eslint/consistent-return`, `constructor-super`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `for-direction`, `func-names`, `func-style`, `getter-return`, `grouped-accessor-pairs`, `guard-for-in`, `id-length`, `init-declarations`, `max-classes-per-file`, `max-depth`, `max-lines`, `max-lines-per-function`, `max-nested-callbacks`, `max-params`, `max-statements`, `new-cap`, `no-alert`, `no-array-constructor`, `no-async-promise-executor`, `no-await-in-loop`, `no-bitwise`, `no-caller`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-constructor-return`, `no-continue`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-div-regex`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-duplicate-imports`, `no-else-return`, `no-empty`, `no-empty-character-class`, `no-empty-function`, `no-empty-pattern`, `no-empty-static-block`, `no-eq-null`, `no-eval`, `no-ex-assign`, `no-extend-native`, `no-extra-bind`, `no-extra-boolean-cast`, `no-extra-label`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-implicit-coercion`, `no-import-assign`, `no-inline-comments`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-iterator`, `no-label-var`, `no-labels`, `no-lone-blocks`, `no-lonely-if`, `no-loop-func`, `no-loss-of-precision`, `no-magic-numbers`, `no-misleading-character-class`, `no-multi-assign`, `no-multi-str`, `no-negated-condition`, `no-nested-ternary`, `no-new`, `no-new-func`, `no-new-native-nonconstructor`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-object-constructor`, `no-param-reassign`, `no-plusplus`, `no-promise-executor-return`, `no-proto`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-restricted-globals`, `no-restricted-imports`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-setter-return`, `no-shadow`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-ternary`, `no-this-before-super`, `no-throw-literal`, `no-unassigned-vars`, `no-undef`, `no-undefined`, `no-unexpected-multiline`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-expressions`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-use-before-define`, `no-useless-backreference`, `no-useless-call`, `no-useless-catch`, `no-useless-computed-key`, `no-useless-concat`, `no-useless-constructor`, `no-useless-escape`, `no-useless-rename`, `no-useless-return`, `no-var`, `no-void`, `no-warning-comments`, `no-with`, `operator-assignment`, `prefer-const`, `prefer-destructuring`, `prefer-exponentiation-operator`, `prefer-numeric-literals`, `prefer-object-has-own`, `prefer-object-spread`, `prefer-promise-reject-errors`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `preserve-caught-error`, `radix`, `require-await`, `require-yield`, `sort-keys`, `sort-vars`, `symbol-description`, `unicode-bom`, `use-isnan`, `valid-typeof`, `vars-on-top`, `yoda`

</details>

<details>
<summary>27 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`consistent-this`, `func-name-matching`, `id-denylist`, `id-match`, `logical-assignment-operators`, `no-implicit-globals`, `no-implied-eval`, `no-restricted-exports`, `no-restricted-properties`, `no-restricted-syntax`, `no-underscore-dangle`, `no-unreachable-loop`, `no-useless-assignment`, `object-shorthand`, `one-var`, `prefer-arrow-callback`, `prefer-named-capture-group`, `prefer-regex-literals`, `require-atomic-updates`, `require-unicode-regexp`, `strict`

**Not portable to oxlint**

`camelcase`, `no-dupe-args`, `no-invalid-this`, `no-octal`, `no-octal-escape`, `no-undef-init`

</details>

### `xo.json`

```json
"./node_modules/oxlint-config-presets/xo.json"
```

<details>
<summary>353 rules successfully migrated</summary>

`no-negated-condition`, `unicorn/catch-error-name`, `unicorn/consistent-assert`, `unicorn/consistent-date-clone`, `unicorn/consistent-empty-array-spread`, `unicorn/consistent-existence-index-check`, `unicorn/empty-brace-spaces`, `unicorn/error-message`, `unicorn/escape-case`, `unicorn/explicit-length-check`, `unicorn/filename-case`, `unicorn/new-for-builtins`, `unicorn/no-abusive-eslint-disable`, `unicorn/no-accessor-recursion`, `unicorn/no-anonymous-default-export`, `unicorn/no-array-callback-reference`, `unicorn/no-array-for-each`, `unicorn/no-array-method-this-argument`, `unicorn/no-array-reduce`, `unicorn/no-array-reverse`, `unicorn/no-array-sort`, `unicorn/no-await-expression-member`, `unicorn/no-await-in-promise-methods`, `unicorn/no-console-spaces`, `unicorn/no-document-cookie`, `unicorn/no-empty-file`, `unicorn/no-hex-escape`, `unicorn/no-immediate-mutation`, `unicorn/no-instanceof-builtins`, `unicorn/no-invalid-fetch-options`, `unicorn/no-invalid-remove-event-listener`, `unicorn/no-lonely-if`, `unicorn/no-magic-array-flat-depth`, `unicorn/no-negated-condition`, `unicorn/no-negation-in-equality-check`, `unicorn/no-nested-ternary`, `unicorn/no-new-array`, `unicorn/no-new-buffer`, `unicorn/no-object-as-default-parameter`, `unicorn/no-process-exit`, `unicorn/no-single-promise-in-promise-methods`, `unicorn/no-static-only-class`, `unicorn/no-thenable`, `unicorn/no-this-assignment`, `unicorn/no-typeof-undefined`, `unicorn/no-unnecessary-array-flat-depth`, `unicorn/no-unnecessary-array-splice-count`, `unicorn/no-unnecessary-await`, `unicorn/no-unnecessary-slice-end`, `unicorn/no-unreadable-array-destructuring`, `unicorn/no-unreadable-iife`, `unicorn/no-useless-collection-argument`, `unicorn/no-useless-error-capture-stack-trace`, `unicorn/no-useless-fallback-in-spread`, `unicorn/no-useless-length-check`, `unicorn/no-useless-promise-resolve-reject`, `unicorn/no-useless-spread`, `unicorn/no-useless-switch-case`, `unicorn/no-zero-fractions`, `unicorn/number-literal-case`, `unicorn/numeric-separators-style`, `unicorn/prefer-add-event-listener`, `unicorn/prefer-array-find`, `unicorn/prefer-array-flat`, `unicorn/prefer-array-flat-map`, `unicorn/prefer-array-index-of`, `unicorn/prefer-array-some`, `unicorn/prefer-at`, `unicorn/prefer-bigint-literals`, `unicorn/prefer-blob-reading-methods`, `unicorn/prefer-class-fields`, `unicorn/prefer-classlist-toggle`, `unicorn/prefer-code-point`, `unicorn/prefer-date-now`, `unicorn/prefer-default-parameters`, `unicorn/prefer-dom-node-append`, `unicorn/prefer-dom-node-dataset`, `unicorn/prefer-dom-node-remove`, `unicorn/prefer-dom-node-text-content`, `unicorn/prefer-event-target`, `unicorn/prefer-global-this`, `unicorn/prefer-includes`, `unicorn/prefer-keyboard-event-key`, `unicorn/prefer-logical-operator-over-ternary`, `unicorn/prefer-math-min-max`, `unicorn/prefer-math-trunc`, `unicorn/prefer-modern-dom-apis`, `unicorn/prefer-modern-math-apis`, `unicorn/prefer-module`, `unicorn/prefer-native-coercion-functions`, `unicorn/prefer-negative-index`, `unicorn/prefer-node-protocol`, `unicorn/prefer-number-properties`, `unicorn/prefer-object-from-entries`, `unicorn/prefer-optional-catch-binding`, `unicorn/prefer-prototype-methods`, `unicorn/prefer-query-selector`, `unicorn/prefer-reflect-apply`, `unicorn/prefer-regexp-test`, `unicorn/prefer-response-static-json`, `unicorn/prefer-set-has`, `unicorn/prefer-set-size`, `unicorn/prefer-spread`, `unicorn/prefer-string-raw`, `unicorn/prefer-string-replace-all`, `unicorn/prefer-string-slice`, `unicorn/prefer-string-starts-ends-with`, `unicorn/prefer-string-trim-start-end`, `unicorn/prefer-structured-clone`, `unicorn/prefer-ternary`, `unicorn/prefer-top-level-await`, `unicorn/prefer-type-error`, `unicorn/relative-url-style`, `unicorn/require-array-join-separator`, `unicorn/require-module-attributes`, `unicorn/require-module-specifiers`, `unicorn/require-number-to-fixed-digits-argument`, `unicorn/switch-case-braces`, `unicorn/text-encoding-identifier-case`, `unicorn/throw-new-error`, `import-x/extensions`, `import-x/first`, `import-x/no-absolute-path`, `import-x/no-named-default`, `import-x/no-webpack-loader-syntax`, `import-x/no-self-import`, `import-x/no-cycle`, `import-x/no-amd`, `import-x/no-duplicates`, `import-x/no-empty-named-blocks`, `import-x/no-mutable-exports`, `import-x/no-named-as-default-member`, `import-x/no-named-as-default`, `import-x/no-unassigned-import`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-await-in-loop`, `no-compare-neg-zero`, `no-cond-assign`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty-character-class`, `no-empty`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-func-assign`, `no-import-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-obj-calls`, `no-promise-executor-return`, `no-prototype-builtins`, `no-regex-spaces`, `no-setter-return`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-useless-backreference`, `use-isnan`, `valid-typeof`, `no-unexpected-multiline`, `accessor-pairs`, `array-callback-return`, `block-scoped-var`, `complexity`, `curly`, `default-case-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `grouped-accessor-pairs`, `guard-for-in`, `no-alert`, `no-caller`, `no-case-declarations`, `no-constructor-return`, `no-else-return`, `no-empty-pattern`, `no-eq-null`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-fallthrough`, `no-global-assign`, `no-implicit-coercion`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-multi-str`, `no-new-func`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-object-constructor`, `no-new`, `no-proto`, `no-redeclare`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-unmodified-loop-condition`, `no-unused-expressions`, `no-unused-labels`, `no-useless-call`, `no-useless-catch`, `no-useless-concat`, `no-useless-escape`, `no-useless-return`, `no-void`, `no-warning-comments`, `no-with`, `radix`, `yoda`, `no-delete-var`, `no-label-var`, `no-shadow`, `no-shadow-restricted-names`, `no-restricted-imports`, `capitalized-comments`, `func-names`, `max-depth`, `max-lines`, `max-nested-callbacks`, `max-params`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-lonely-if`, `no-multi-assign`, `no-unneeded-ternary`, `operator-assignment`, `prefer-exponentiation-operator`, `prefer-object-spread`, `unicode-bom`, `arrow-body-style`, `constructor-super`, `no-class-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-dupe-class-members`, `no-new-native-nonconstructor`, `no-this-before-super`, `no-unassigned-vars`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-rename`, `no-var`, `prefer-const`, `prefer-destructuring`, `prefer-numeric-literals`, `prefer-object-has-own`, `prefer-rest-params`, `prefer-spread`, `preserve-caught-error`, `require-yield`, `symbol-description`, `no-restricted-globals`, `@typescript-eslint/adjacent-overload-signatures`, `@typescript-eslint/array-type`, `@typescript-eslint/await-thenable`, `@typescript-eslint/ban-ts-comment`, `@typescript-eslint/ban-tslint-comment`, `@typescript-eslint/no-restricted-types`, `@typescript-eslint/class-literal-property-style`, `@typescript-eslint/consistent-generic-constructors`, `@typescript-eslint/consistent-indexed-object-style`, `default-param-last`, `@typescript-eslint/consistent-type-assertions`, `@typescript-eslint/consistent-type-definitions`, `@typescript-eslint/consistent-type-exports`, `@typescript-eslint/consistent-type-imports`, `@typescript-eslint/no-base-to-string`, `@typescript-eslint/no-array-delete`, `@typescript-eslint/no-deprecated`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-duplicate-type-constituents`, `@typescript-eslint/no-dynamic-delete`, `no-empty-function`, `@typescript-eslint/no-empty-interface`, `@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-extra-non-null-assertion`, `no-loop-func`, `@typescript-eslint/no-extraneous-class`, `@typescript-eslint/no-floating-promises`, `@typescript-eslint/no-for-in-array`, `@typescript-eslint/no-inferrable-types`, `@typescript-eslint/no-meaningless-void-operator`, `@typescript-eslint/no-misused-new`, `@typescript-eslint/no-misused-promises`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-nullish-coalescing`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-require-imports`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/only-throw-error`, `@typescript-eslint/no-unnecessary-boolean-literal-compare`, `@typescript-eslint/no-unnecessary-qualifier`, `@typescript-eslint/no-unnecessary-type-arguments`, `@typescript-eslint/no-unnecessary-type-assertion`, `@typescript-eslint/no-unnecessary-type-constraint`, `@typescript-eslint/no-unsafe-argument`, `@typescript-eslint/no-unsafe-assignment`, `@typescript-eslint/no-unsafe-declaration-merging`, `@typescript-eslint/no-unsafe-enum-comparison`, `@typescript-eslint/no-unsafe-function-type`, `@typescript-eslint/no-unsafe-member-access`, `@typescript-eslint/no-unsafe-return`, `@typescript-eslint/no-unsafe-type-assertion`, `@typescript-eslint/no-useless-empty-export`, `@typescript-eslint/no-useless-default-assignment`, `@typescript-eslint/no-wrapper-object-types`, `@typescript-eslint/non-nullable-type-assertion-style`, `@typescript-eslint/prefer-as-const`, `@typescript-eslint/prefer-find`, `@typescript-eslint/prefer-for-of`, `@typescript-eslint/prefer-function-type`, `@typescript-eslint/prefer-includes`, `@typescript-eslint/prefer-literal-enum-member`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/prefer-nullish-coalescing`, `@typescript-eslint/prefer-optional-chain`, `@typescript-eslint/prefer-promise-reject-errors`, `@typescript-eslint/prefer-readonly`, `@typescript-eslint/prefer-reduce-type-parameter`, `@typescript-eslint/prefer-string-starts-ends-with`, `@typescript-eslint/promise-function-async`, `@typescript-eslint/related-getter-setter-pairs`, `@typescript-eslint/restrict-plus-operands`, `@typescript-eslint/restrict-template-expressions`, `@typescript-eslint/return-await`, `@typescript-eslint/require-array-sort-compare`, `@typescript-eslint/strict-void-return`, `@typescript-eslint/switch-exhaustiveness-check`, `@typescript-eslint/triple-slash-reference`, `@typescript-eslint/prefer-regexp-exec`, `@typescript-eslint/prefer-return-this-type`, `@typescript-eslint/unified-signatures`, `@typescript-eslint/use-unknown-in-catch-callback-variable`, `node/no-new-require`, `node/no-path-concat`

</details>

<details>
<summary>154 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`unicorn/better-regex`, `unicorn/expiring-todo-comments`, `unicorn/isolated-functions`, `unicorn/no-unnecessary-polyfills`, `unicorn/prefer-export-from`, `unicorn/prefer-single-call`, `unicorn/prefer-switch`, `unicorn/prevent-abbreviations`, `unicorn/template-indent`, `import-x/no-useless-path-segments`, `import-x/newline-after-import`, `import-x/no-extraneous-dependencies`, `n/no-extraneous-import`, `n/no-unpublished-bin`, `n/no-mixed-requires`, `n/process-exit-as-throw`, `n/no-deprecated-api`, `n/prefer-global/buffer`, `n/prefer-global/console`, `n/prefer-global/process`, `n/prefer-global/text-decoder`, `n/prefer-global/text-encoder`, `n/prefer-global/url-search-params`, `n/prefer-global/url`, `n/prefer-promises/dns`, `n/prefer-promises/fs`, `no-unreachable-loop`, `no-implicit-globals`, `no-implied-eval`, `prefer-regex-literals`, `require-unicode-regexp`, `func-name-matching`, `logical-assignment-operators`, `one-var`, `object-shorthand`, `prefer-arrow-callback`, `@typescript-eslint/member-ordering`, `@typescript-eslint/naming-convention`, `@typescript-eslint/no-unused-private-class-members`

**Not portable to oxlint**

`unicorn/no-for-loop`, `unicorn/no-named-default`, `import-x/order`, `no-dupe-args`, `no-octal-escape`, `no-octal`, `no-return-await`, `no-undef-init`, `no-buffer-constructor`

**Require JS plugin support**

`ava/assertion-arguments`, `ava/hooks-order`, `ava/no-async-fn-without-await`, `ava/no-commented-tests`, `ava/no-conditional-assertion`, `ava/no-duplicate-hooks`, `ava/no-identical-title`, `ava/no-ignored-test-files`, `ava/no-import-test-files`, `ava/no-incorrect-deep-equal`, `ava/no-inline-assertions`, `ava/no-invalid-modifier-chain`, `ava/no-negated-assertion`, `ava/no-nested-assertions`, `ava/no-nested-tests`, `ava/no-only-test`, `ava/no-skip-assert`, `ava/no-skip-test`, `ava/no-todo-implementation`, `ava/no-todo-test`, `ava/no-useless-t-pass`, `ava/prefer-async-await`, `ava/prefer-t-regex`, `ava/prefer-t-throws`, `ava/require-assertion`, `ava/test-title`, `ava/use-t`, `ava/use-t-throws-async-well`, `ava/use-t-well`, `ava/use-test`, `ava/use-true-false`, `ava/no-ava-in-dependencies`, `no-use-extend-native/no-use-extend-native`, `@eslint-community/eslint-comments/disable-enable-pair`, `@eslint-community/eslint-comments/no-aggregating-enable`, `@eslint-community/eslint-comments/no-duplicate-disable`, `@eslint-community/eslint-comments/no-unused-disable`, `@eslint-community/eslint-comments/no-unused-enable`, `@stylistic/comma-dangle`, `@stylistic/no-extra-semi`, `@stylistic/curly-newline`, `@stylistic/dot-location`, `@stylistic/no-floating-decimal`, `@stylistic/no-multi-spaces`, `@stylistic/wrap-iife`, `@stylistic/array-bracket-newline`, `@stylistic/array-bracket-spacing`, `@stylistic/array-element-newline`, `@stylistic/brace-style`, `@stylistic/comma-spacing`, `@stylistic/comma-style`, `@stylistic/computed-property-spacing`, `@stylistic/eol-last`, `@stylistic/function-call-spacing`, `@stylistic/function-paren-newline`, `@stylistic/function-call-argument-newline`, `@stylistic/indent`, `@stylistic/jsx-quotes`, `@stylistic/key-spacing`, `@stylistic/keyword-spacing`, `@stylistic/linebreak-style`, `@stylistic/lines-between-class-members`, `@stylistic/max-len`, `@stylistic/max-statements-per-line`, `@stylistic/multiline-ternary`, `@stylistic/new-parens`, `@stylistic/no-mixed-operators`, `@stylistic/no-mixed-spaces-and-tabs`, `@stylistic/no-multiple-empty-lines`, `@stylistic/no-whitespace-before-property`, `@stylistic/no-trailing-spaces`, `@stylistic/object-curly-spacing`, `@stylistic/object-curly-newline`, `@stylistic/one-var-declaration-per-line`, `@stylistic/operator-linebreak`, `@stylistic/padded-blocks`, `@stylistic/padding-line-between-statements`, `@stylistic/quote-props`, `@stylistic/quotes`, `@stylistic/semi-spacing`, `@stylistic/semi-style`, `@stylistic/semi`, `@stylistic/space-before-blocks`, `@stylistic/space-before-function-paren`, `@stylistic/space-in-parens`, `@stylistic/space-infix-ops`, `@stylistic/space-unary-ops`, `@stylistic/spaced-comment`, `@stylistic/switch-colon-spacing`, `@stylistic/template-tag-spacing`, `@stylistic/arrow-parens`, `@stylistic/arrow-spacing`, `@stylistic/block-spacing`, `@stylistic/generator-star-spacing`, `@stylistic/rest-spread-spacing`, `@stylistic/template-curly-spacing`, `@stylistic/yield-star-spacing`, `@stylistic/indent-binary-ops`, `json/no-duplicate-keys`, `json/no-empty-keys`, `json/no-unsafe-values`, `json/no-unnormalized-keys`, `@stylistic/member-delimiter-style`, `@stylistic/type-annotation-spacing`, `@stylistic/type-generic-spacing`, `@stylistic/type-named-tuple-spacing`

</details>

### `problems.json`

```json
"./node_modules/oxlint-config-presets/problems.json"
```

<details>
<summary>105 rules successfully migrated</summary>

`constructor-super`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-empty-pattern`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-undef`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-backreference`, `no-useless-catch`, `no-useless-escape`, `no-with`, `require-yield`, `use-isnan`, `valid-typeof`, `no-console`, `no-alert`, `array-callback-return`, `no-constructor-return`, `no-duplicate-imports`, `no-promise-executor-return`, `no-self-compare`, `no-unmodified-loop-condition`, `no-use-before-define`, `accessor-pairs`, `@typescript-eslint/dot-notation`, `eqeqeq`, `no-array-constructor`, `no-caller`, `no-else-return`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-lonely-if`, `no-loop-func`, `no-multi-str`, `no-new-func`, `no-new-wrappers`, `no-object-constructor`, `no-proto`, `no-script-url`, `no-sequences`, `no-unneeded-ternary`, `no-useless-call`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-rename`, `no-useless-return`, `no-var`, `prefer-const`, `prefer-destructuring`, `prefer-exponentiation-operator`, `prefer-numeric-literals`, `prefer-object-spread`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `yoda`

</details>

<details>
<summary>12 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-unreachable-loop`, `no-useless-assignment`, `require-atomic-updates`, `no-implied-eval`, `object-shorthand`, `prefer-arrow-callback`, `prefer-regex-literals`, `strict`

**Not portable to oxlint**

`no-dupe-args`, `no-octal`, `no-octal-escape`, `no-undef-init`

</details>

### `hardcore.json`

```json
"./node_modules/oxlint-config-presets/hardcore.json"
```

<details>
<summary>284 rules successfully migrated</summary>

`no-alert`, `no-array-constructor`, `no-bitwise`, `no-caller`, `no-case-declarations`, `no-class-assign`, `no-console`, `no-const-assign`, `no-constant-condition`, `no-continue`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-pattern`, `no-eq-null`, `no-eval`, `no-ex-assign`, `no-extend-native`, `no-extra-bind`, `no-fallthrough`, `no-func-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-iterator`, `no-label-var`, `no-labels`, `no-lone-blocks`, `no-lonely-if`, `no-loop-func`, `no-multi-str`, `no-global-assign`, `no-nested-ternary`, `no-new`, `no-new-func`, `no-object-constructor`, `no-new-wrappers`, `no-obj-calls`, `no-plusplus`, `no-proto`, `no-regex-spaces`, `no-script-url`, `no-self-compare`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-throw-literal`, `no-unreachable`, `no-use-before-define`, `no-useless-call`, `no-useless-concat`, `no-void`, `no-var`, `no-warning-comments`, `no-with`, `block-scoped-var`, `constructor-super`, `default-case`, `@typescript-eslint/dot-notation`, `eqeqeq`, `guard-for-in`, `id-length`, `max-depth`, `max-nested-callbacks`, `max-params`, `max-statements`, `new-cap`, `operator-assignment`, `prefer-const`, `prefer-spread`, `prefer-template`, `radix`, `require-yield`, `yoda`, `no-empty-function`, `no-new-native-nonconstructor`, `no-unmodified-loop-condition`, `prefer-rest-params`, `no-extra-label`, `no-unused-labels`, `no-useless-constructor`, `no-useless-escape`, `no-duplicate-imports`, `no-unsafe-finally`, `no-useless-computed-key`, `no-useless-rename`, `max-lines`, `no-template-curly-in-string`, `symbol-description`, `prefer-numeric-literals`, `no-useless-return`, `require-await`, `no-await-in-loop`, `no-multi-assign`, `prefer-promise-reject-errors`, `no-compare-neg-zero`, `for-direction`, `getter-return`, `max-classes-per-file`, `no-misleading-character-class`, `no-async-promise-executor`, `no-useless-catch`, `no-redeclare`, `no-prototype-builtins`, `no-import-assign`, `default-param-last`, `no-constructor-return`, `no-dupe-else-if`, `no-setter-return`, `prefer-exponentiation-operator`, `prefer-object-spread`, `accessor-pairs`, `default-case-last`, `no-useless-backreference`, `no-loss-of-precision`, `no-promise-executor-return`, `no-nonoctal-decimal-escape`, `init-declarations`, `@typescript-eslint/consistent-return`, `no-unused-private-class-members`, `no-constant-binary-expression`, `no-empty-static-block`, `no-magic-numbers`, `complexity`, `func-names`, `func-style`, `no-else-return`, `no-cond-assign`, `valid-typeof`, `no-return-assign`, `no-self-assign`, `no-shadow`, `no-undef`, `no-unneeded-ternary`, `use-isnan`, `no-param-reassign`, `no-unsafe-negation`, `grouped-accessor-pairs`, `array-callback-return`, `no-extra-boolean-cast`, `no-unsafe-optional-chaining`, `no-unused-expressions`, `no-sequences`, `no-implicit-coercion`, `prefer-destructuring`, `no-restricted-globals`, `promise/param-names`, `promise/always-return`, `promise/no-return-wrap`, `promise/no-nesting`, `promise/no-promise-in-callback`, `promise/avoid-new`, `promise/no-callback-in-promise`, `promise/no-return-in-finally`, `promise/valid-params`, `promise/no-new-statics`, `promise/no-multiple-resolved`, `promise/spec-only`, `promise/prefer-catch`, `promise/catch-or-return`, `promise/prefer-await-to-then`, `import/default`, `import/namespace`, `import/no-absolute-path`, `import/no-webpack-loader-syntax`, `import/no-self-import`, `import/export`, `import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-mutable-exports`, `import/unambiguous`, `import/no-amd`, `import/first`, `import/exports-last`, `import/no-namespace`, `import/max-dependencies`, `import/no-named-default`, `import/no-commonjs`, `import/no-empty-named-blocks`, `import/extensions`, `import/no-dynamic-require`, `import/no-anonymous-default-export`, `import/no-duplicates`, `unicorn/custom-error-definition`, `unicorn/error-message`, `unicorn/escape-case`, `unicorn/new-for-builtins`, `unicorn/no-abusive-eslint-disable`, `unicorn/no-instanceof-array`, `unicorn/no-console-spaces`, `unicorn/no-hex-escape`, `unicorn/no-new-buffer`, `unicorn/no-unreadable-array-destructuring`, `unicorn/no-zero-fractions`, `unicorn/prefer-add-event-listener`, `unicorn/prefer-keyboard-event-key`, `unicorn/prefer-array-flat-map`, `unicorn/prefer-includes`, `unicorn/prefer-dom-node-append`, `unicorn/prefer-dom-node-remove`, `unicorn/prefer-query-selector`, `unicorn/prefer-string-starts-ends-with`, `unicorn/prefer-dom-node-text-content`, `unicorn/prefer-type-error`, `unicorn/throw-new-error`, `unicorn/consistent-function-scoping`, `unicorn/prefer-reflect-apply`, `unicorn/prefer-dom-node-dataset`, `unicorn/prefer-string-slice`, `unicorn/prefer-negative-index`, `unicorn/prefer-string-trim-start-end`, `unicorn/prefer-modern-dom-apis`, `unicorn/prefer-string-replace-all`, `unicorn/prefer-number-properties`, `unicorn/no-null`, `unicorn/prefer-optional-catch-binding`, `unicorn/no-object-as-default-parameter`, `unicorn/explicit-length-check`, `unicorn/prefer-math-trunc`, `unicorn/prefer-ternary`, `unicorn/numeric-separators-style`, `unicorn/catch-error-name`, `unicorn/no-lonely-if`, `unicorn/prefer-date-now`, `unicorn/prefer-array-some`, `unicorn/prefer-default-parameters`, `unicorn/no-new-array`, `unicorn/prefer-array-index-of`, `unicorn/prefer-regexp-test`, `unicorn/no-this-assignment`, `unicorn/no-static-only-class`, `unicorn/prefer-array-flat`, `unicorn/prefer-node-protocol`, `unicorn/prefer-module`, `unicorn/no-document-cookie`, `unicorn/require-array-join-separator`, `unicorn/require-number-to-fixed-digits-argument`, `unicorn/no-array-method-this-argument`, `unicorn/prefer-prototype-methods`, `unicorn/no-useless-length-check`, `unicorn/no-useless-spread`, `unicorn/no-useless-fallback-in-spread`, `unicorn/no-invalid-remove-event-listener`, `unicorn/no-empty-file`, `unicorn/prefer-code-point`, `unicorn/no-await-expression-member`, `unicorn/no-thenable`, `unicorn/no-useless-promise-resolve-reject`, `unicorn/relative-url-style`, `unicorn/text-encoding-identifier-case`, `unicorn/no-useless-switch-case`, `unicorn/prefer-modern-math-apis`, `unicorn/no-unreadable-iife`, `unicorn/prefer-native-coercion-functions`, `unicorn/prefer-top-level-await`, `unicorn/prefer-logical-operator-over-ternary`, `unicorn/prefer-event-target`, `unicorn/no-unnecessary-await`, `unicorn/switch-case-braces`, `unicorn/no-typeof-undefined`, `unicorn/prefer-set-size`, `unicorn/no-negated-condition`, `unicorn/prefer-at`, `unicorn/prefer-blob-reading-methods`, `unicorn/no-single-promise-in-promise-methods`, `unicorn/no-await-in-promise-methods`, `unicorn/no-anonymous-default-export`, `unicorn/consistent-empty-array-spread`, `unicorn/prefer-string-raw`, `unicorn/no-invalid-fetch-options`, `unicorn/no-magic-array-flat-depth`, `unicorn/prefer-structured-clone`, `unicorn/prefer-array-find`, `unicorn/no-negation-in-equality-check`, `unicorn/prefer-global-this`, `unicorn/prefer-math-min-max`, `unicorn/consistent-existence-index-check`, `unicorn/filename-case`, `unicorn/prefer-object-from-entries`, `curly`, `arrow-body-style`

</details>

<details>
<summary>3 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`import/named`, `import/no-cycle`, `no-irregular-whitespace`

</details>

<details>
<summary>294 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-implied-eval`, `consistent-this`, `object-shorthand`, `strict`, `require-atomic-updates`, `prefer-named-capture-group`, `no-unreachable-loop`, `one-var`, `no-underscore-dangle`, `func-name-matching`, `no-implicit-globals`, `prefer-regex-literals`, `logical-assignment-operators`, `import/no-relative-packages`, `import/no-import-module-exports`, `import/no-useless-path-segments`, `import/no-unused-modules`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `unicorn/no-unused-properties`, `unicorn/consistent-destructuring`, `unicorn/prefer-switch`, `unicorn/no-unnecessary-polyfills`, `unicorn/import-index`, `unicorn/prevent-abbreviations`, `unicorn/prefer-export-from`

**Not portable to oxlint**

`no-dupe-args`, `no-invalid-this`, `no-octal`, `no-octal-escape`, `no-undef-init`, `camelcase`, `no-buffer-constructor`, `multiline-comment-style`, `import/no-deprecated`, `import/no-unresolved`, `import/enforce-node-protocol-usage`, `unicorn/no-for-loop`, `unicorn/no-array-push-push`

**Require JS plugin support**

`security/detect-buffer-noassert`, `security/detect-child-process`, `security/detect-disable-mustache-escape`, `security/detect-eval-with-expression`, `security/detect-new-buffer`, `security/detect-no-csrf-before-method-override`, `security/detect-non-literal-regexp`, `security/detect-non-literal-require`, `security/detect-possible-timing-attacks`, `security/detect-pseudoRandomBytes`, `security/detect-unsafe-regex`, `security/detect-bidi-characters`, `array-func/from-map`, `array-func/prefer-array-from`, `array-func/avoid-reverse`, `sonarjs/no-all-duplicated-branches`, `sonarjs/no-element-overwrite`, `sonarjs/no-extra-arguments`, `sonarjs/no-identical-conditions`, `sonarjs/no-identical-expressions`, `sonarjs/no-one-iteration-loop`, `sonarjs/no-use-of-empty-return-value`, `sonarjs/max-switch-cases`, `sonarjs/no-collapsible-if`, `sonarjs/no-duplicated-branches`, `sonarjs/no-identical-functions`, `sonarjs/no-inverted-boolean-check`, `sonarjs/no-redundant-boolean`, `sonarjs/no-small-switch`, `sonarjs/no-useless-catch`, `sonarjs/prefer-immediate-return`, `sonarjs/prefer-object-literal`, `sonarjs/prefer-single-boolean-return`, `sonarjs/prefer-while`, `sonarjs/no-collection-size-mischeck`, `sonarjs/no-unused-collection`, `sonarjs/no-redundant-jump`, `sonarjs/no-same-line-conditional`, `sonarjs/no-ignored-return`, `sonarjs/elseif-without-else`, `sonarjs/no-gratuitous-expressions`, `sonarjs/no-nested-switch`, `sonarjs/no-empty-collection`, `sonarjs/non-existent-operator`, `sonarjs/no-nested-template-literals`, `sonarjs/cognitive-complexity`, `eslint-comments/no-duplicate-disable`, `eslint-comments/no-unlimited-disable`, `eslint-comments/no-unused-disable`, `eslint-comments/no-unused-enable`, `eslint-comments/disable-enable-pair`, `eslint-comments/no-use`, `no-use-extend-native/no-use-extend-native`, `no-constructor-bind/no-constructor-bind`, `ext/lines-between-object-properties`, `regexp/match-any`, `regexp/no-empty-capturing-group`, `regexp/no-dupe-characters-character-class`, `regexp/no-empty-group`, `regexp/no-empty-lookarounds-assertion`, `regexp/no-escape-backspace`, `regexp/no-invisible-character`, `regexp/no-octal`, `regexp/no-useless-two-nums-quantifier`, `regexp/prefer-d`, `regexp/prefer-plus-quantifier`, `regexp/prefer-question-quantifier`, `regexp/prefer-star-quantifier`, `regexp/prefer-w`, `regexp/prefer-quantifier`, `regexp/no-useless-character-class`, `regexp/no-useless-lazy`, `regexp/prefer-regexp-exec`, `regexp/prefer-regexp-test`, `regexp/prefer-unicode-codepoint-escapes`, `regexp/no-useless-range`, `regexp/prefer-range`, `regexp/prefer-character-class`, `regexp/no-useless-non-capturing-group`, `regexp/no-useless-escape`, `regexp/negation`, `regexp/no-legacy-features`, `regexp/no-useless-dollar-replacements`, `regexp/prefer-escape-replacement-dollar-char`, `regexp/no-unused-capturing-group`, `regexp/confusing-quantifier`, `regexp/no-empty-alternative`, `regexp/no-lazy-ends`, `regexp/optimal-lookaround-quantifier`, `regexp/no-trivially-nested-assertion`, `regexp/no-potentially-useless-backreference`, `regexp/no-obscure-range`, `regexp/no-optional-assertion`, `regexp/no-useless-assertions`, `regexp/prefer-named-backreference`, `regexp/no-useless-flag`, `regexp/no-trivially-nested-quantifier`, `regexp/sort-flags`, `regexp/no-non-standard-flag`, `regexp/control-character-escape`, `regexp/prefer-predefined-assertion`, `regexp/no-standalone-backslash`, `regexp/no-useless-quantifier`, `regexp/no-zero-quantifier`, `regexp/no-dupe-disjunctions`, `regexp/optimal-quantifier-concatenation`, `regexp/strict`, `regexp/sort-alternatives`, `regexp/no-super-linear-backtracking`, `regexp/no-super-linear-move`, `regexp/no-invalid-regexp`, `regexp/no-contradiction-with-assertion`, `regexp/prefer-lookaround`, `regexp/no-empty-character-class`, `regexp/prefer-named-capture-group`, `regexp/require-unicode-regexp`, `regexp/no-misleading-unicode-character`, `regexp/no-control-character`, `regexp/use-ignore-case`, `regexp/prefer-named-replacement`, `regexp/prefer-result-array-groups`, `regexp/no-missing-g-flag`, `regexp/no-extra-lookaround-assertions`, `regexp/no-misleading-capturing-group`, `regexp/simplify-set-operations`, `regexp/no-useless-string-literal`, `regexp/no-empty-string-literal`, `regexp/no-useless-set-operand`, `regexp/prefer-set-operation`, `regexp/grapheme-string-literal`, `regexp/require-unicode-sets-regexp`, `regexp/letter-case`, `regexp/hexadecimal-escape`, `regexp/unicode-escape`, `regexp/unicode-property`, `@microsoft/sdl/no-cookies`, `@microsoft/sdl/no-document-domain`, `@microsoft/sdl/no-html-method`, `@microsoft/sdl/no-insecure-url`, `@microsoft/sdl/no-postmessage-star-origin`, `no-unsanitized/method`, `no-unsanitized/property`, `unused-imports/no-unused-imports`, `unused-imports/no-unused-vars`, `sonarjs/anchor-precedence`, `sonarjs/argument-type`, `sonarjs/arguments-order`, `sonarjs/bool-param-default`, `sonarjs/class-prototype`, `sonarjs/comma-or-logical-or-case`, `sonarjs/concise-regex`, `sonarjs/cookies`, `sonarjs/disabled-auto-escaping`, `sonarjs/disabled-resource-integrity`, `sonarjs/empty-string-repetition`, `sonarjs/function-return-type`, `sonarjs/in-operator-type-error`, `sonarjs/link-with-target-blank`, `sonarjs/misplaced-loop-counter`, `sonarjs/no-alphabetical-sort`, `sonarjs/no-angular-bypass-sanitization`, `sonarjs/no-array-delete`, `sonarjs/no-associative-arrays`, `sonarjs/no-clear-text-protocols`, `sonarjs/no-dead-store`, `sonarjs/no-empty-after-reluctant`, `sonarjs/no-equals-in-for-termination`, `sonarjs/no-for-in-iterable`, `sonarjs/no-hardcoded-ip`, `sonarjs/no-in-misuse`, `sonarjs/no-incorrect-string-concat`, `sonarjs/no-invariant-returns`, `sonarjs/no-misleading-array-reverse`, `sonarjs/no-redundant-assignments`, `sonarjs/no-try-promise`, `sonarjs/no-undefined-argument`, `sonarjs/no-useless-intersection`, `sonarjs/no-wildcard-import`, `sonarjs/non-number-in-arithmetic-expression`, `sonarjs/null-dereference`, `sonarjs/operation-returning-nan`, `sonarjs/post-message`, `sonarjs/prefer-promise-shorthand`, `sonarjs/prefer-type-guard`, `sonarjs/redundant-type-aliases`, `sonarjs/stateful-regex`, `sonarjs/strings-comparison`, `sonarjs/unused-named-groups`, `sonarjs/values-not-convertible-to-numbers`, `sonarjs/xpath`, `sonarjs/no-async-constructor`, `sonarjs/no-hardcoded-passwords`, `sonarjs/no-hardcoded-secrets`, `sonarjs/no-internal-api-use`, `sonarjs/no-literal-call`, `sonarjs/no-sonar-comments`, `sonarjs/object-alt-content`, `sonarjs/table-header`, `simple-import-sort/imports`, `simple-import-sort/exports`, `perfectionist/sort-array-includes`, `perfectionist/sort-enums`, `perfectionist/sort-interfaces`, `perfectionist/sort-jsx-props`, `perfectionist/sort-maps`, `perfectionist/sort-object-types`, `perfectionist/sort-objects`, `perfectionist/sort-switch-case`, `perfectionist/sort-sets`, `perfectionist/sort-decorators`, `perfectionist/sort-heritage-clauses`, `perfectionist/sort-modules`, `compat/compat`, `@html-eslint/require-doctype`, `@html-eslint/no-duplicate-id`, `@html-eslint/no-inline-styles`, `@html-eslint/require-li-container`, `@html-eslint/no-obsolete-tags`, `@html-eslint/require-lang`, `@html-eslint/require-title`, `@html-eslint/no-multiple-h1`, `@html-eslint/require-meta-description`, `@html-eslint/require-img-alt`, `@html-eslint/no-skip-heading-levels`, `@html-eslint/require-frame-title`, `@html-eslint/no-non-scalable-viewport`, `@html-eslint/no-positive-tabindex`, `@html-eslint/require-meta-viewport`, `@html-eslint/no-duplicate-attrs`, `@html-eslint/no-target-blank`, `@html-eslint/require-button-type`, `@html-eslint/no-abstract-roles`, `@html-eslint/no-aria-hidden-body`, `@html-eslint/no-accesskey-attrs`, `@html-eslint/prefer-https`, `@html-eslint/require-input-label`, `@html-eslint/require-form-method`, `@html-eslint/no-heading-inside-button`, `@html-eslint/no-invalid-role`, `@html-eslint/no-nested-interactive`, `@html-eslint/require-explicit-size`, `@html-eslint/no-duplicate-class`, `@html-eslint/no-aria-hidden-on-focusable`, `@html-eslint/no-empty-headings`, `@html-eslint/no-invalid-entity`, `@html-eslint/no-duplicate-in-head`, `@html-eslint/sort-attrs`, `@stylistic/lines-between-class-members`, `@stylistic/spaced-comment`, `@stylistic/padding-line-between-statements`, `putout/putout`, `@stylistic/lines-around-comment`, `@stylistic/max-len`, `@stylistic/no-tabs`, `@stylistic/quotes`

</details>

### `wikimedia.json`

```json
"./node_modules/oxlint-config-presets/wikimedia.json"
```

<details>
<summary>57 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/implements-on-classes`, `jsdoc/require-param`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-type`, `jsdoc/require-yields`, `array-callback-return`, `block-scoped-var`, `curly`, `@typescript-eslint/dot-notation`, `eqeqeq`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-caller`, `no-constant-binary-expression`, `no-constant-condition`, `no-empty`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-implicit-coercion`, `no-label-var`, `no-loop-func`, `no-loss-of-precision`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-proto`, `no-prototype-builtins`, `no-return-assign`, `no-script-url`, `no-self-compare`, `no-sequences`, `no-shadow`, `no-shadow-restricted-names`, `no-throw-literal`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unused-expressions`, `no-useless-call`, `no-useless-concat`, `no-void`, `no-with`, `prefer-numeric-literals`, `unicode-bom`, `yoda`, `unicorn/prefer-date-now`, `unicorn/prefer-string-slice`, `unicorn/throw-new-error`

</details>

<details>
<summary>1 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`no-use-before-define`

</details>

<details>
<summary>73 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/multiline-blocks`, `jsdoc/no-blank-block-descriptions`, `jsdoc/no-blank-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/no-undefined-types`, `jsdoc/require-asterisk-prefix`, `jsdoc/require-returns-check`, `jsdoc/require-throws-type`, `jsdoc/require-yields-check`, `jsdoc/tag-lines`, `jsdoc/valid-types`, `no-implicit-globals`, `no-underscore-dangle`, `no-unreachable-loop`, `prefer-regex-literals`

**Not portable to oxlint**

`array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `dot-location`, `eol-last`, `func-call-spacing`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `max-len`, `max-statements-per-line`, `new-parens`, `no-floating-decimal`, `no-multi-spaces`, `no-multiple-empty-lines`, `no-new-object`, `no-octal-escape`, `no-tabs`, `no-trailing-spaces`, `no-undef-init`, `no-whitespace-before-property`, `object-curly-spacing`, `operator-linebreak`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `wrap-iife`

**Require JS plugin support**

`security/detect-buffer-noassert`, `security/detect-child-process`, `security/detect-disable-mustache-escape`, `security/detect-eval-with-expression`, `security/detect-new-buffer`, `security/detect-no-csrf-before-method-override`, `security/detect-non-literal-fs-filename`, `security/detect-non-literal-regexp`, `security/detect-non-literal-require`, `security/detect-possible-timing-attacks`, `security/detect-pseudoRandomBytes`, `security/detect-unsafe-regex`, `security/detect-bidi-characters`

</details>

### `eslint.json`

```json
"./node_modules/oxlint-config-presets/eslint.json"
```

<details>
<summary>160 rules successfully migrated</summary>

`unicorn/prefer-array-find`, `unicorn/prefer-array-flat-map`, `unicorn/prefer-array-flat`, `unicorn/prefer-array-index-of`, `unicorn/prefer-array-some`, `unicorn/prefer-at`, `unicorn/prefer-includes`, `unicorn/prefer-set-has`, `unicorn/prefer-string-slice`, `unicorn/prefer-string-starts-ends-with`, `unicorn/prefer-string-trim-start-end`, `jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `no-control-regex`, `no-misleading-character-class`, `no-regex-spaces`, `no-invalid-regexp`, `no-useless-backreference`, `no-empty-character-class`, `constructor-super`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-pattern`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-prototype-builtins`, `no-redeclare`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-unassigned-vars`, `no-undef`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-catch`, `no-useless-escape`, `no-with`, `preserve-caught-error`, `require-yield`, `use-isnan`, `valid-typeof`, `array-callback-return`, `arrow-body-style`, `class-methods-use-this`, `@typescript-eslint/consistent-return`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `func-style`, `grouped-accessor-pairs`, `guard-for-in`, `new-cap`, `no-alert`, `no-array-constructor`, `no-caller`, `no-console`, `no-constructor-return`, `no-else-return`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-inner-declarations`, `no-iterator`, `no-label-var`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-multi-str`, `no-nested-ternary`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-object-constructor`, `no-param-reassign`, `no-proto`, `no-return-assign`, `no-script-url`, `no-self-compare`, `no-sequences`, `no-shadow`, `no-throw-literal`, `no-undefined`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unused-expressions`, `no-use-before-define`, `no-useless-call`, `no-useless-computed-key`, `no-useless-concat`, `no-useless-constructor`, `no-useless-rename`, `no-useless-return`, `no-var`, `operator-assignment`, `prefer-const`, `prefer-exponentiation-operator`, `prefer-numeric-literals`, `prefer-object-has-own`, `prefer-promise-reject-errors`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `radix`, `symbol-description`, `unicode-bom`, `yoda`, `node/no-exports-assign`, `node/handle-callback-err`, `node/no-new-require`, `node/no-path-concat`

</details>

<details>
<summary>118 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-syntax`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-bad-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/require-asterisk-prefix`, `jsdoc/require-description`, `jsdoc/require-hyphen-before-param-description`, `jsdoc/require-jsdoc`, `jsdoc/require-returns-check`, `jsdoc/require-throws`, `jsdoc/require-yields-check`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`, `prefer-regex-literals`, `no-useless-assignment`, `no-implied-eval`, `no-restricted-properties`, `no-underscore-dangle`, `no-unreachable-loop`, `object-shorthand`, `prefer-arrow-callback`, `require-unicode-regexp`, `strict`, `n/no-deprecated-api`, `n/no-extraneous-import`, `n/no-extraneous-require`, `n/no-missing-import`, `n/no-missing-require`, `n/no-process-exit`, `n/no-unpublished-bin`, `n/no-unpublished-import`, `n/no-unpublished-require`, `n/no-unsupported-features/es-builtins`, `n/no-unsupported-features/es-syntax`, `n/no-unsupported-features/node-builtins`, `n/process-exit-as-throw`, `n/hashbang`, `n/callback-return`, `n/prefer-node-protocol`, `n/no-mixed-requires`

**Not portable to oxlint**

`no-dupe-args`, `no-octal`, `camelcase`, `no-invalid-this`, `no-octal-escape`, `no-undef-init`

**Require JS plugin support**

`@eslint-community/eslint-comments/disable-enable-pair`, `@eslint-community/eslint-comments/no-aggregating-enable`, `@eslint-community/eslint-comments/no-duplicate-disable`, `@eslint-community/eslint-comments/no-unlimited-disable`, `@eslint-community/eslint-comments/no-unused-enable`, `@eslint-community/eslint-comments/require-description`, `regexp/confusing-quantifier`, `regexp/control-character-escape`, `regexp/match-any`, `regexp/negation`, `regexp/no-contradiction-with-assertion`, `regexp/no-dupe-characters-character-class`, `regexp/no-dupe-disjunctions`, `regexp/no-empty-alternative`, `regexp/no-empty-capturing-group`, `regexp/no-empty-character-class`, `regexp/no-empty-group`, `regexp/no-empty-lookarounds-assertion`, `regexp/no-empty-string-literal`, `regexp/no-escape-backspace`, `regexp/no-extra-lookaround-assertions`, `regexp/no-invalid-regexp`, `regexp/no-invisible-character`, `regexp/no-lazy-ends`, `regexp/no-legacy-features`, `regexp/no-misleading-capturing-group`, `regexp/no-misleading-unicode-character`, `regexp/no-missing-g-flag`, `regexp/no-non-standard-flag`, `regexp/no-obscure-range`, `regexp/no-optional-assertion`, `regexp/no-potentially-useless-backreference`, `regexp/no-super-linear-backtracking`, `regexp/no-trivially-nested-assertion`, `regexp/no-trivially-nested-quantifier`, `regexp/no-unused-capturing-group`, `regexp/no-useless-assertions`, `regexp/no-useless-backreference`, `regexp/no-useless-character-class`, `regexp/no-useless-dollar-replacements`, `regexp/no-useless-escape`, `regexp/no-useless-flag`, `regexp/no-useless-lazy`, `regexp/no-useless-non-capturing-group`, `regexp/no-useless-quantifier`, `regexp/no-useless-range`, `regexp/no-useless-set-operand`, `regexp/no-useless-string-literal`, `regexp/no-useless-two-nums-quantifier`, `regexp/no-zero-quantifier`, `regexp/optimal-lookaround-quantifier`, `regexp/optimal-quantifier-concatenation`, `regexp/prefer-character-class`, `regexp/prefer-d`, `regexp/prefer-plus-quantifier`, `regexp/prefer-predefined-assertion`, `regexp/prefer-question-quantifier`, `regexp/prefer-range`, `regexp/prefer-set-operation`, `regexp/prefer-star-quantifier`, `regexp/prefer-unicode-codepoint-escapes`, `regexp/prefer-w`, `regexp/simplify-set-operations`, `regexp/sort-flags`, `regexp/strict`, `regexp/use-ignore-case`

</details>

### `eslint/base.json`

```json
"./node_modules/oxlint-config-presets/eslint/base.json"
```

<details>
<summary>156 rules successfully migrated</summary>

`unicorn/prefer-array-find`, `unicorn/prefer-array-flat-map`, `unicorn/prefer-array-flat`, `unicorn/prefer-array-index-of`, `unicorn/prefer-array-some`, `unicorn/prefer-at`, `unicorn/prefer-includes`, `unicorn/prefer-set-has`, `unicorn/prefer-string-slice`, `unicorn/prefer-string-starts-ends-with`, `unicorn/prefer-string-trim-start-end`, `jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `no-control-regex`, `no-misleading-character-class`, `no-regex-spaces`, `no-invalid-regexp`, `no-useless-backreference`, `no-empty-character-class`, `constructor-super`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-pattern`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-prototype-builtins`, `no-redeclare`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-unassigned-vars`, `no-undef`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-catch`, `no-useless-escape`, `no-with`, `preserve-caught-error`, `require-yield`, `use-isnan`, `valid-typeof`, `array-callback-return`, `arrow-body-style`, `class-methods-use-this`, `@typescript-eslint/consistent-return`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `func-style`, `grouped-accessor-pairs`, `guard-for-in`, `new-cap`, `no-alert`, `no-array-constructor`, `no-caller`, `no-console`, `no-constructor-return`, `no-else-return`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-inner-declarations`, `no-iterator`, `no-label-var`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-multi-str`, `no-nested-ternary`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-object-constructor`, `no-param-reassign`, `no-proto`, `no-return-assign`, `no-script-url`, `no-self-compare`, `no-sequences`, `no-shadow`, `no-throw-literal`, `no-undefined`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unused-expressions`, `no-use-before-define`, `no-useless-call`, `no-useless-computed-key`, `no-useless-concat`, `no-useless-constructor`, `no-useless-rename`, `no-useless-return`, `no-var`, `operator-assignment`, `prefer-const`, `prefer-exponentiation-operator`, `prefer-numeric-literals`, `prefer-object-has-own`, `prefer-promise-reject-errors`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `radix`, `symbol-description`, `unicode-bom`, `yoda`

</details>

<details>
<summary>101 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-syntax`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-bad-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/require-asterisk-prefix`, `jsdoc/require-description`, `jsdoc/require-hyphen-before-param-description`, `jsdoc/require-jsdoc`, `jsdoc/require-returns-check`, `jsdoc/require-throws`, `jsdoc/require-yields-check`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`, `prefer-regex-literals`, `no-useless-assignment`, `no-implied-eval`, `no-restricted-properties`, `no-underscore-dangle`, `no-unreachable-loop`, `object-shorthand`, `prefer-arrow-callback`, `require-unicode-regexp`, `strict`

**Not portable to oxlint**

`no-dupe-args`, `no-octal`, `camelcase`, `no-invalid-this`, `no-octal-escape`, `no-undef-init`

**Require JS plugin support**

`@eslint-community/eslint-comments/disable-enable-pair`, `@eslint-community/eslint-comments/no-aggregating-enable`, `@eslint-community/eslint-comments/no-duplicate-disable`, `@eslint-community/eslint-comments/no-unlimited-disable`, `@eslint-community/eslint-comments/no-unused-enable`, `@eslint-community/eslint-comments/require-description`, `regexp/confusing-quantifier`, `regexp/control-character-escape`, `regexp/match-any`, `regexp/negation`, `regexp/no-contradiction-with-assertion`, `regexp/no-dupe-characters-character-class`, `regexp/no-dupe-disjunctions`, `regexp/no-empty-alternative`, `regexp/no-empty-capturing-group`, `regexp/no-empty-character-class`, `regexp/no-empty-group`, `regexp/no-empty-lookarounds-assertion`, `regexp/no-empty-string-literal`, `regexp/no-escape-backspace`, `regexp/no-extra-lookaround-assertions`, `regexp/no-invalid-regexp`, `regexp/no-invisible-character`, `regexp/no-lazy-ends`, `regexp/no-legacy-features`, `regexp/no-misleading-capturing-group`, `regexp/no-misleading-unicode-character`, `regexp/no-missing-g-flag`, `regexp/no-non-standard-flag`, `regexp/no-obscure-range`, `regexp/no-optional-assertion`, `regexp/no-potentially-useless-backreference`, `regexp/no-super-linear-backtracking`, `regexp/no-trivially-nested-assertion`, `regexp/no-trivially-nested-quantifier`, `regexp/no-unused-capturing-group`, `regexp/no-useless-assertions`, `regexp/no-useless-backreference`, `regexp/no-useless-character-class`, `regexp/no-useless-dollar-replacements`, `regexp/no-useless-escape`, `regexp/no-useless-flag`, `regexp/no-useless-lazy`, `regexp/no-useless-non-capturing-group`, `regexp/no-useless-quantifier`, `regexp/no-useless-range`, `regexp/no-useless-set-operand`, `regexp/no-useless-string-literal`, `regexp/no-useless-two-nums-quantifier`, `regexp/no-zero-quantifier`, `regexp/optimal-lookaround-quantifier`, `regexp/optimal-quantifier-concatenation`, `regexp/prefer-character-class`, `regexp/prefer-d`, `regexp/prefer-plus-quantifier`, `regexp/prefer-predefined-assertion`, `regexp/prefer-question-quantifier`, `regexp/prefer-range`, `regexp/prefer-set-operation`, `regexp/prefer-star-quantifier`, `regexp/prefer-unicode-codepoint-escapes`, `regexp/prefer-w`, `regexp/simplify-set-operations`, `regexp/sort-flags`, `regexp/strict`, `regexp/use-ignore-case`

</details>

### `alloy.json`

```json
"./node_modules/oxlint-config-presets/alloy.json"
```

<details>
<summary>98 rules successfully migrated</summary>

`accessor-pairs`, `array-callback-return`, `complexity`, `constructor-super`, `default-case-last`, `eqeqeq`, `for-direction`, `getter-return`, `grouped-accessor-pairs`, `guard-for-in`, `max-depth`, `max-nested-callbacks`, `max-params`, `new-cap`, `no-array-constructor`, `no-async-promise-executor`, `no-caller`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-constructor-return`, `no-debugger`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-empty-pattern`, `no-eq-null`, `no-eval`, `no-ex-assign`, `no-extend-native`, `no-extra-bind`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-implicit-coercion`, `no-import-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loss-of-precision`, `no-misleading-character-class`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-native-nonconstructor`, `no-new-wrappers`, `no-obj-calls`, `no-param-reassign`, `no-promise-executor-return`, `no-proto`, `no-regex-spaces`, `no-return-assign`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-this-before-super`, `no-throw-literal`, `no-undef`, `no-unmodified-loop-condition`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-expressions`, `no-unused-private-class-members`, `no-unused-vars`, `no-use-before-define`, `no-useless-backreference`, `no-useless-call`, `no-useless-catch`, `no-useless-computed-key`, `no-useless-concat`, `no-useless-constructor`, `no-useless-rename`, `no-var`, `no-void`, `prefer-object-spread`, `prefer-promise-reject-errors`, `radix`, `require-yield`, `symbol-description`, `use-isnan`, `valid-typeof`, `yoda`

</details>

<details>
<summary>1 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`no-irregular-whitespace`

</details>

<details>
<summary>12 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`func-name-matching`, `no-implied-eval`, `no-unreachable-loop`, `one-var`, `prefer-arrow-callback`, `prefer-regex-literals`, `strict`

**Not portable to oxlint**

`no-invalid-this`, `no-new-object`, `no-new-symbol`, `no-undef-init`, `spaced-comment`

</details>

### `alloy/react.json`

```json
"./node_modules/oxlint-config-presets/alloy/react.json"
```

<details>
<summary>29 rules successfully migrated</summary>

`react/iframe-missing-sandbox`, `react/jsx-curly-brace-presence`, `react/jsx-fragments`, `react/jsx-key`, `react/jsx-no-comment-textnodes`, `react/jsx-no-constructed-context-values`, `react/jsx-no-duplicate-props`, `react/jsx-no-script-url`, `react/jsx-no-undef`, `react/jsx-no-useless-fragment`, `react/jsx-pascal-case`, `react/no-children-prop`, `react/no-danger-with-children`, `react/no-direct-mutation-state`, `react/no-find-dom-node`, `react/no-is-mounted`, `react/no-namespace`, `react/no-redundant-should-component-update`, `react/no-render-return-value`, `react/no-string-refs`, `react/no-this-in-sfc`, `react/no-unescaped-entities`, `react/no-unknown-property`, `react/no-unsafe`, `react/prefer-es6-class`, `react/require-render-return`, `react/self-closing-comp`, `react/style-prop-object`, `react/void-dom-elements-no-children`

</details>

<details>
<summary>8 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`react/no-deprecated`, `react/no-did-update-set-state`, `react/no-typos`, `react/no-unstable-nested-components`

**Not portable to oxlint**

`react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/static-property-placement`

</details>

### `alloy/typescript.json`

```json
"./node_modules/oxlint-config-presets/alloy/typescript.json"
```

<details>
<summary>25 rules successfully migrated</summary>

`@typescript-eslint/adjacent-overload-signatures`, `@typescript-eslint/class-literal-property-style`, `@typescript-eslint/consistent-type-assertions`, `@typescript-eslint/consistent-type-definitions`, `@typescript-eslint/consistent-type-imports`, `@typescript-eslint/no-duplicate-enum-values`, `@typescript-eslint/no-empty-interface`, `@typescript-eslint/no-import-type-side-effects`, `@typescript-eslint/no-inferrable-types`, `@typescript-eslint/no-invalid-void-type`, `no-loss-of-precision`, `@typescript-eslint/no-namespace`, `@typescript-eslint/no-non-null-asserted-nullish-coalescing`, `@typescript-eslint/no-non-null-asserted-optional-chain`, `@typescript-eslint/no-require-imports`, `@typescript-eslint/no-this-alias`, `@typescript-eslint/no-unnecessary-type-constraint`, `no-unused-expressions`, `no-unused-vars`, `no-useless-constructor`, `@typescript-eslint/prefer-for-of`, `@typescript-eslint/prefer-function-type`, `@typescript-eslint/prefer-namespace-keyword`, `@typescript-eslint/triple-slash-reference`, `@typescript-eslint/unified-signatures`

</details>

<details>
<summary>5 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`@typescript-eslint/explicit-member-accessibility`, `@typescript-eslint/member-ordering`, `@typescript-eslint/method-signature-style`

**Not portable to oxlint**

`@typescript-eslint/no-invalid-this`, `@typescript-eslint/typedef`

</details>

### `prettier.json`

```json
"./node_modules/oxlint-config-presets/prettier.json"
```

### `@antfu.json`

```json
"./node_modules/oxlint-config-presets/@antfu.json"
```

<details>
<summary>97 rules successfully migrated</summary>

`accessor-pairs`, `array-callback-return`, `block-scoped-var`, `default-case-last`, `@typescript-eslint/dot-notation`, `eqeqeq`, `new-cap`, `no-async-promise-executor`, `no-caller`, `no-case-declarations`, `no-compare-neg-zero`, `no-cond-assign`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-duplicate-case`, `no-empty`, `no-empty-pattern`, `no-eval`, `no-ex-assign`, `no-extend-native`, `no-extra-bind`, `no-extra-boolean-cast`, `no-fallthrough`, `no-global-assign`, `no-iterator`, `no-loss-of-precision`, `no-misleading-character-class`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-proto`, `no-prototype-builtins`, `no-regex-spaces`, `no-restricted-globals`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-throw-literal`, `no-unexpected-multiline`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unsafe-finally`, `no-useless-call`, `no-useless-catch`, `no-useless-computed-key`, `no-useless-rename`, `no-useless-return`, `no-var`, `prefer-const`, `prefer-exponentiation-operator`, `prefer-promise-reject-errors`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `symbol-description`, `use-isnan`, `valid-typeof`, `vars-on-top`, `yoda`, `node/handle-callback-err`, `node/no-exports-assign`, `node/no-new-require`, `node/no-path-concat`, `jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param-name`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-returns-description`, `import/first`, `import/no-duplicates`, `import/no-mutable-exports`, `import/no-named-default`, `unicorn/consistent-empty-array-spread`, `unicorn/error-message`, `unicorn/escape-case`, `unicorn/new-for-builtins`, `unicorn/no-instanceof-builtins`, `unicorn/no-new-array`, `unicorn/no-new-buffer`, `unicorn/number-literal-case`, `unicorn/prefer-dom-node-text-content`, `unicorn/prefer-includes`, `unicorn/prefer-node-protocol`, `unicorn/prefer-number-properties`, `unicorn/prefer-string-starts-ends-with`, `unicorn/prefer-type-error`, `unicorn/throw-new-error`

</details>

<details>
<summary>1 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`import/consistent-type-specifier-style`

</details>

<details>
<summary>282 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `no-unreachable-loop`, `object-shorthand`, `one-var`, `prefer-arrow-callback`, `prefer-regex-literals`, `node/no-deprecated-api`, `node/prefer-global/buffer`, `node/process-exit-as-throw`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/no-multi-asterisks`, `jsdoc/require-returns-check`, `jsdoc/require-yields-check`, `jsdoc/check-alignment`, `jsdoc/multiline-blocks`, `import/newline-after-import`

**Not portable to oxlint**

`no-octal`, `no-octal-escape`, `no-undef-init`

**Require JS plugin support**

`eslint-comments/no-aggregating-enable`, `eslint-comments/no-duplicate-disable`, `eslint-comments/no-unused-enable`, `perfectionist/sort-named-exports`, `perfectionist/sort-named-imports`, `antfu/import-dedupe`, `e18e/prefer-array-at`, `e18e/prefer-array-fill`, `e18e/prefer-includes`, `e18e/prefer-nullish-coalescing`, `e18e/prefer-object-has-own`, `e18e/prefer-url-canparse`, `e18e/prefer-array-from-map`, `e18e/prefer-timer-args`, `e18e/prefer-date-now`, `e18e/prefer-regex-test`, `e18e/prefer-array-some`, `ts/ban-ts-comment`, `ts/no-array-constructor`, `ts/no-duplicate-enum-values`, `ts/no-empty-object-type`, `ts/no-extra-non-null-assertion`, `ts/no-misused-new`, `ts/no-non-null-asserted-nullish-coalescing`, `ts/no-non-null-asserted-optional-chain`, `ts/no-this-alias`, `ts/no-unnecessary-type-constraint`, `ts/no-unsafe-declaration-merging`, `ts/no-unsafe-function-type`, `ts/no-wrapper-object-types`, `ts/prefer-as-const`, `ts/prefer-literal-enum-member`, `ts/prefer-namespace-keyword`, `ts/consistent-type-definitions`, `ts/method-signature-style`, `ts/no-dupe-class-members`, `ts/no-import-type-side-effects`, `style/array-bracket-spacing`, `style/arrow-parens`, `style/arrow-spacing`, `style/block-spacing`, `style/brace-style`, `style/comma-spacing`, `style/comma-style`, `style/computed-property-spacing`, `style/dot-location`, `style/generator-star-spacing`, `style/indent-binary-ops`, `style/key-spacing`, `style/keyword-spacing`, `style/lines-between-class-members`, `style/max-statements-per-line`, `style/member-delimiter-style`, `style/multiline-ternary`, `style/new-parens`, `style/no-extra-parens`, `style/no-floating-decimal`, `style/no-mixed-operators`, `style/no-mixed-spaces-and-tabs`, `style/no-multi-spaces`, `style/no-multiple-empty-lines`, `style/no-tabs`, `style/no-trailing-spaces`, `style/no-whitespace-before-property`, `style/object-curly-spacing`, `style/operator-linebreak`, `style/padded-blocks`, `style/quote-props`, `style/quotes`, `style/rest-spread-spacing`, `style/semi`, `style/semi-spacing`, `style/space-before-blocks`, `style/space-before-function-paren`, `style/space-in-parens`, `style/space-infix-ops`, `style/space-unary-ops`, `style/template-curly-spacing`, `style/template-tag-spacing`, `style/type-annotation-spacing`, `style/type-generic-spacing`, `style/type-named-tuple-spacing`, `style/wrap-iife`, `style/yield-star-spacing`, `style/jsx-closing-bracket-location`, `style/jsx-closing-tag-location`, `style/jsx-curly-brace-presence`, `style/jsx-curly-newline`, `style/jsx-curly-spacing`, `style/jsx-equals-spacing`, `style/jsx-first-prop-new-line`, `style/jsx-function-call-newline`, `style/jsx-indent-props`, `style/jsx-max-props-per-line`, `style/jsx-one-expression-per-line`, `style/jsx-quotes`, `style/jsx-tag-spacing`, `style/jsx-wrap-multilines`, `antfu/consistent-list-newline`, `antfu/consistent-chaining`, `antfu/curly`, `antfu/if-newline`, `antfu/top-level-function`, `regexp/confusing-quantifier`, `regexp/control-character-escape`, `regexp/match-any`, `regexp/negation`, `regexp/no-contradiction-with-assertion`, `regexp/no-dupe-characters-character-class`, `regexp/no-dupe-disjunctions`, `regexp/no-empty-alternative`, `regexp/no-empty-capturing-group`, `regexp/no-empty-character-class`, `regexp/no-empty-group`, `regexp/no-empty-lookarounds-assertion`, `regexp/no-empty-string-literal`, `regexp/no-escape-backspace`, `regexp/no-extra-lookaround-assertions`, `regexp/no-invalid-regexp`, `regexp/no-invisible-character`, `regexp/no-lazy-ends`, `regexp/no-misleading-capturing-group`, `regexp/no-misleading-unicode-character`, `regexp/no-non-standard-flag`, `regexp/no-obscure-range`, `regexp/no-optional-assertion`, `regexp/no-potentially-useless-backreference`, `regexp/no-super-linear-backtracking`, `regexp/no-trivially-nested-assertion`, `regexp/no-trivially-nested-quantifier`, `regexp/no-unused-capturing-group`, `regexp/no-useless-assertions`, `regexp/no-useless-backreference`, `regexp/no-useless-character-class`, `regexp/no-useless-escape`, `regexp/no-useless-lazy`, `regexp/no-useless-non-capturing-group`, `regexp/no-useless-quantifier`, `regexp/no-useless-range`, `regexp/no-useless-set-operand`, `regexp/no-useless-string-literal`, `regexp/no-useless-two-nums-quantifier`, `regexp/no-zero-quantifier`, `regexp/optimal-lookaround-quantifier`, `regexp/optimal-quantifier-concatenation`, `regexp/prefer-character-class`, `regexp/prefer-d`, `regexp/prefer-plus-quantifier`, `regexp/prefer-predefined-assertion`, `regexp/prefer-question-quantifier`, `regexp/prefer-range`, `regexp/prefer-set-operation`, `regexp/prefer-star-quantifier`, `regexp/prefer-unicode-codepoint-escapes`, `regexp/prefer-w`, `regexp/simplify-set-operations`, `regexp/sort-flags`, `regexp/strict`, `regexp/use-ignore-case`, `test/consistent-test-it`, `test/no-identical-title`, `test/no-import-node-test`, `test/no-only-tests`, `test/prefer-hooks-in-order`, `test/prefer-lowercase-title`, `jsonc/no-bigint-literals`, `jsonc/no-binary-expression`, `jsonc/no-binary-numeric-literals`, `jsonc/no-dupe-keys`, `jsonc/no-escape-sequence-in-identifier`, `jsonc/no-floating-decimal`, `jsonc/no-hexadecimal-numeric-literals`, `jsonc/no-infinity`, `jsonc/no-multi-str`, `jsonc/no-nan`, `jsonc/no-number-props`, `jsonc/no-numeric-separators`, `jsonc/no-octal`, `jsonc/no-octal-escape`, `jsonc/no-octal-numeric-literals`, `jsonc/no-parenthesized`, `jsonc/no-plus-sign`, `jsonc/no-regexp-literals`, `jsonc/no-sparse-arrays`, `jsonc/no-template-literals`, `jsonc/no-undefined-value`, `jsonc/no-unicode-codepoint-escapes`, `jsonc/no-useless-escape`, `jsonc/space-unary-ops`, `jsonc/valid-json-number`, `jsonc/vue-custom-block/no-parsing-error`, `jsonc/array-bracket-spacing`, `jsonc/comma-dangle`, `jsonc/comma-style`, `jsonc/indent`, `jsonc/key-spacing`, `jsonc/object-curly-newline`, `jsonc/object-curly-spacing`, `jsonc/object-property-newline`, `jsonc/quote-props`, `jsonc/quotes`, `jsonc/sort-array-values`, `jsonc/sort-keys`, `pnpm/json-prefer-workspace-settings`, `pnpm/json-valid-catalog`, `pnpm/yaml-enforce-settings`, `pnpm/yaml-no-duplicate-catalog-item`, `pnpm/yaml-no-unused-catalog-item`, `yaml/sort-keys`, `yaml/block-mapping`, `yaml/block-sequence`, `yaml/no-empty-key`, `yaml/no-empty-sequence-entry`, `yaml/no-irregular-whitespace`, `yaml/plain-scalar`, `yaml/vue-custom-block/no-parsing-error`, `yaml/block-mapping-question-indicator-newline`, `yaml/block-sequence-hyphen-indicator-newline`, `yaml/flow-mapping-curly-newline`, `yaml/flow-mapping-curly-spacing`, `yaml/flow-sequence-bracket-newline`, `yaml/flow-sequence-bracket-spacing`, `yaml/indent`, `yaml/key-spacing`, `yaml/no-tab-indent`, `yaml/quotes`, `yaml/spaced-comment`, `toml/comma-style`, `toml/keys-order`, `toml/no-space-dots`, `toml/no-unreadable-number-separator`, `toml/precision-of-fractional-seconds`, `toml/precision-of-integer`, `toml/tables-order`, `toml/vue-custom-block/no-parsing-error`, `toml/array-bracket-newline`, `toml/array-bracket-spacing`, `toml/array-element-newline`, `toml/indent`, `toml/inline-table-curly-spacing`, `toml/key-spacing`, `toml/padding-line-between-pairs`, `toml/padding-line-between-tables`, `toml/quoted-keys`, `toml/spaced-comment`, `toml/table-bracket-spacing`, `markdown/heading-increment`, `markdown/no-duplicate-definitions`, `markdown/no-empty-definitions`, `markdown/no-empty-images`, `markdown/no-empty-links`, `markdown/no-invalid-label-refs`, `markdown/no-missing-atx-heading-space`, `markdown/no-missing-link-fragments`, `markdown/no-multiple-h1`, `markdown/no-reference-like-urls`, `markdown/no-reversed-media-syntax`, `markdown/no-space-in-emphasis`, `markdown/no-unused-definitions`, `markdown/require-alt-text`, `markdown/table-column-count`

</details>

### `import/recommended.json`

```json
"./node_modules/oxlint-config-presets/import/recommended.json"
```

<details>
<summary>7 rules successfully migrated</summary>

`import/named`, `import/namespace`, `import/default`, `import/export`, `import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-duplicates`

</details>

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`import/no-unresolved`

</details>

### `import/errors.json`

```json
"./node_modules/oxlint-config-presets/import/errors.json"
```

<details>
<summary>4 rules successfully migrated</summary>

`import/named`, `import/namespace`, `import/default`, `import/export`

</details>

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`import/no-unresolved`

</details>

### `import/warnings.json`

```json
"./node_modules/oxlint-config-presets/import/warnings.json"
```

<details>
<summary>3 rules successfully migrated</summary>

`import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-duplicates`

</details>

### `import/react.json`

```json
"./node_modules/oxlint-config-presets/import/react.json"
```

### `import/typescript.json`

```json
"./node_modules/oxlint-config-presets/import/typescript.json"
```

### `import-x/recommended.json`

```json
"./node_modules/oxlint-config-presets/import-x/recommended.json"
```

<details>
<summary>7 rules successfully migrated</summary>

`import-x/named`, `import-x/namespace`, `import-x/default`, `import-x/export`, `import-x/no-named-as-default`, `import-x/no-named-as-default-member`, `import-x/no-duplicates`

</details>

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`import-x/no-unresolved`

</details>

### `import-x/errors.json`

```json
"./node_modules/oxlint-config-presets/import-x/errors.json"
```

<details>
<summary>4 rules successfully migrated</summary>

`import-x/named`, `import-x/namespace`, `import-x/default`, `import-x/export`

</details>

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`import-x/no-unresolved`

</details>

### `import-x/warnings.json`

```json
"./node_modules/oxlint-config-presets/import-x/warnings.json"
```

<details>
<summary>3 rules successfully migrated</summary>

`import-x/no-named-as-default`, `import-x/no-named-as-default-member`, `import-x/no-duplicates`

</details>

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`import-x/no-rename-default`

</details>

### `import-x/react.json`

```json
"./node_modules/oxlint-config-presets/import-x/react.json"
```

### `import-x/typescript.json`

```json
"./node_modules/oxlint-config-presets/import-x/typescript.json"
```

### `next/recommended.json`

```json
"./node_modules/oxlint-config-presets/next/recommended.json"
```

<details>
<summary>21 rules successfully migrated</summary>

`@next/next/google-font-display`, `@next/next/google-font-preconnect`, `@next/next/next-script-for-ga`, `@next/next/no-async-client-component`, `@next/next/no-before-interactive-script-outside-document`, `@next/next/no-css-tags`, `@next/next/no-head-element`, `@next/next/no-html-link-for-pages`, `@next/next/no-img-element`, `@next/next/no-page-custom-font`, `@next/next/no-styled-jsx-in-document`, `@next/next/no-sync-scripts`, `@next/next/no-title-in-document-head`, `@next/next/no-typos`, `@next/next/no-unwanted-polyfillio`, `@next/next/inline-script-id`, `@next/next/no-assign-module-variable`, `@next/next/no-document-import-in-page`, `@next/next/no-duplicate-head`, `@next/next/no-head-import-in-document`, `@next/next/no-script-component-in-head`

</details>

### `next/core-web-vitals.json`

```json
"./node_modules/oxlint-config-presets/next/core-web-vitals.json"
```

<details>
<summary>21 rules successfully migrated</summary>

`@next/next/google-font-display`, `@next/next/google-font-preconnect`, `@next/next/next-script-for-ga`, `@next/next/no-async-client-component`, `@next/next/no-before-interactive-script-outside-document`, `@next/next/no-css-tags`, `@next/next/no-head-element`, `@next/next/no-html-link-for-pages`, `@next/next/no-img-element`, `@next/next/no-page-custom-font`, `@next/next/no-styled-jsx-in-document`, `@next/next/no-sync-scripts`, `@next/next/no-title-in-document-head`, `@next/next/no-typos`, `@next/next/no-unwanted-polyfillio`, `@next/next/inline-script-id`, `@next/next/no-assign-module-variable`, `@next/next/no-document-import-in-page`, `@next/next/no-duplicate-head`, `@next/next/no-head-import-in-document`, `@next/next/no-script-component-in-head`

</details>

### `react-perf/recommended.json`

```json
"./node_modules/oxlint-config-presets/react-perf/recommended.json"
```

<details>
<summary>3 rules successfully migrated</summary>

`react-perf/jsx-no-new-object-as-prop`, `react-perf/jsx-no-new-array-as-prop`, `react-perf/jsx-no-new-function-as-prop`

</details>

### `react-perf/all.json`

```json
"./node_modules/oxlint-config-presets/react-perf/all.json"
```

<details>
<summary>4 rules successfully migrated</summary>

`react-perf/jsx-no-new-object-as-prop`, `react-perf/jsx-no-new-array-as-prop`, `react-perf/jsx-no-new-function-as-prop`, `react-perf/jsx-no-jsx-as-prop`

</details>

### `jsdoc/recommended.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/recommended.json"
```

<details>
<summary>18 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`

</details>

<details>
<summary>19 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/no-undefined-types`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-jsdoc`, `jsdoc/require-next-type`, `jsdoc/require-returns-check`, `jsdoc/require-throws-type`, `jsdoc/require-yields-check`, `jsdoc/require-yields-type`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`

</details>

### `jsdoc/recommended-typescript.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/recommended-typescript.json"
```

<details>
<summary>15 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-yields`

</details>

<details>
<summary>19 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/no-types`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-jsdoc`, `jsdoc/require-next-type`, `jsdoc/require-returns-check`, `jsdoc/require-throws-type`, `jsdoc/require-yields-check`, `jsdoc/require-yields-type`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`

</details>

### `jsdoc/recommended-typescript-flavor.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/recommended-typescript-flavor.json"
```

<details>
<summary>18 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`

</details>

<details>
<summary>18 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-jsdoc`, `jsdoc/require-next-type`, `jsdoc/require-returns-check`, `jsdoc/require-throws-type`, `jsdoc/require-yields-check`, `jsdoc/require-yields-type`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`

</details>

### `jsdoc/recommended-tsdoc.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/recommended-tsdoc.json"
```

<details>
<summary>15 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-yields`

</details>

<details>
<summary>16 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/no-types`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-jsdoc`, `jsdoc/require-returns-check`, `jsdoc/require-yields-check`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`

</details>

### `jsx-a11y/recommended.json`

```json
"./node_modules/oxlint-config-presets/jsx-a11y/recommended.json"
```

<details>
<summary>27 rules successfully migrated</summary>

`jsx-a11y/alt-text`, `jsx-a11y/anchor-has-content`, `jsx-a11y/anchor-is-valid`, `jsx-a11y/aria-activedescendant-has-tabindex`, `jsx-a11y/aria-props`, `jsx-a11y/aria-proptypes`, `jsx-a11y/aria-role`, `jsx-a11y/aria-unsupported-elements`, `jsx-a11y/autocomplete-valid`, `jsx-a11y/click-events-have-key-events`, `jsx-a11y/heading-has-content`, `jsx-a11y/html-has-lang`, `jsx-a11y/iframe-has-title`, `jsx-a11y/img-redundant-alt`, `jsx-a11y/label-has-associated-control`, `jsx-a11y/media-has-caption`, `jsx-a11y/mouse-events-have-key-events`, `jsx-a11y/no-access-key`, `jsx-a11y/no-autofocus`, `jsx-a11y/no-distracting-elements`, `jsx-a11y/no-noninteractive-tabindex`, `jsx-a11y/no-redundant-roles`, `jsx-a11y/no-static-element-interactions`, `jsx-a11y/role-has-required-aria-props`, `jsx-a11y/role-supports-aria-props`, `jsx-a11y/scope`, `jsx-a11y/tabindex-no-positive`

</details>

<details>
<summary>4 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`

</details>

### `jsx-a11y/strict.json`

```json
"./node_modules/oxlint-config-presets/jsx-a11y/strict.json"
```

<details>
<summary>27 rules successfully migrated</summary>

`jsx-a11y/alt-text`, `jsx-a11y/anchor-has-content`, `jsx-a11y/anchor-is-valid`, `jsx-a11y/aria-activedescendant-has-tabindex`, `jsx-a11y/aria-props`, `jsx-a11y/aria-proptypes`, `jsx-a11y/aria-role`, `jsx-a11y/aria-unsupported-elements`, `jsx-a11y/autocomplete-valid`, `jsx-a11y/click-events-have-key-events`, `jsx-a11y/heading-has-content`, `jsx-a11y/html-has-lang`, `jsx-a11y/iframe-has-title`, `jsx-a11y/img-redundant-alt`, `jsx-a11y/label-has-associated-control`, `jsx-a11y/media-has-caption`, `jsx-a11y/mouse-events-have-key-events`, `jsx-a11y/no-access-key`, `jsx-a11y/no-autofocus`, `jsx-a11y/no-distracting-elements`, `jsx-a11y/no-noninteractive-tabindex`, `jsx-a11y/no-redundant-roles`, `jsx-a11y/no-static-element-interactions`, `jsx-a11y/role-has-required-aria-props`, `jsx-a11y/role-supports-aria-props`, `jsx-a11y/scope`, `jsx-a11y/tabindex-no-positive`

</details>

<details>
<summary>4 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`

</details>

### `n/recommended.json`

```json
"./node_modules/oxlint-config-presets/n/recommended.json"
```

<details>
<summary>1 rules successfully migrated</summary>

`node/no-exports-assign`

</details>

<details>
<summary>14 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`n/no-deprecated-api`, `n/no-extraneous-import`, `n/no-extraneous-require`, `n/no-missing-import`, `n/no-missing-require`, `n/no-process-exit`, `n/no-unpublished-bin`, `n/no-unpublished-import`, `n/no-unpublished-require`, `n/no-unsupported-features/es-builtins`, `n/no-unsupported-features/es-syntax`, `n/no-unsupported-features/node-builtins`, `n/process-exit-as-throw`, `n/hashbang`

</details>

### `n/recommended-module.json`

```json
"./node_modules/oxlint-config-presets/n/recommended-module.json"
```

<details>
<summary>1 rules successfully migrated</summary>

`node/no-exports-assign`

</details>

<details>
<summary>14 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`n/no-deprecated-api`, `n/no-extraneous-import`, `n/no-extraneous-require`, `n/no-missing-import`, `n/no-missing-require`, `n/no-process-exit`, `n/no-unpublished-bin`, `n/no-unpublished-import`, `n/no-unpublished-require`, `n/no-unsupported-features/es-builtins`, `n/no-unsupported-features/es-syntax`, `n/no-unsupported-features/node-builtins`, `n/process-exit-as-throw`, `n/hashbang`

</details>

### `n/recommended-script.json`

```json
"./node_modules/oxlint-config-presets/n/recommended-script.json"
```

<details>
<summary>1 rules successfully migrated</summary>

`node/no-exports-assign`

</details>

<details>
<summary>14 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`n/no-deprecated-api`, `n/no-extraneous-import`, `n/no-extraneous-require`, `n/no-missing-import`, `n/no-missing-require`, `n/no-process-exit`, `n/no-unpublished-bin`, `n/no-unpublished-import`, `n/no-unpublished-require`, `n/no-unsupported-features/es-builtins`, `n/no-unsupported-features/es-syntax`, `n/no-unsupported-features/node-builtins`, `n/process-exit-as-throw`, `n/hashbang`

</details>

### `promise/recommended.json`

```json
"./node_modules/oxlint-config-presets/promise/recommended.json"
```

<details>
<summary>10 rules successfully migrated</summary>

`promise/always-return`, `promise/no-return-wrap`, `promise/param-names`, `promise/catch-or-return`, `promise/no-nesting`, `promise/no-promise-in-callback`, `promise/no-callback-in-promise`, `promise/no-new-statics`, `promise/no-return-in-finally`, `promise/valid-params`

</details>

### `jest/recommended.json`

```json
"./node_modules/oxlint-config-presets/jest/recommended.json"
```

<details>
<summary>18 rules successfully migrated</summary>

`jest/expect-expect`, `jest/no-alias-methods`, `jest/no-commented-out-tests`, `jest/no-conditional-expect`, `jest/no-deprecated-functions`, `jest/no-disabled-tests`, `jest/no-done-callback`, `jest/no-export`, `jest/no-focused-tests`, `jest/no-identical-title`, `jest/no-interpolation-in-snapshots`, `jest/no-jasmine-globals`, `jest/no-mocks-import`, `jest/no-standalone-expect`, `jest/no-test-prefixes`, `jest/valid-describe-callback`, `jest/valid-expect`, `jest/valid-title`

</details>

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jest/valid-expect-in-promise`

</details>

### `jest/style.json`

```json
"./node_modules/oxlint-config-presets/jest/style.json"
```

<details>
<summary>4 rules successfully migrated</summary>

`jest/no-alias-methods`, `jest/prefer-to-be`, `jest/prefer-to-contain`, `jest/prefer-to-have-length`

</details>

### `jest/all.json`

```json
"./node_modules/oxlint-config-presets/jest/all.json"
```

<details>
<summary>50 rules successfully migrated</summary>

`jest/consistent-test-it`, `jest/expect-expect`, `jest/max-expects`, `jest/max-nested-describe`, `jest/no-alias-methods`, `jest/no-commented-out-tests`, `jest/no-conditional-expect`, `jest/no-conditional-in-test`, `jest/no-confusing-set-timeout`, `jest/no-deprecated-functions`, `jest/no-disabled-tests`, `jest/no-done-callback`, `jest/no-duplicate-hooks`, `jest/no-export`, `jest/no-focused-tests`, `jest/no-hooks`, `jest/no-identical-title`, `jest/no-interpolation-in-snapshots`, `jest/no-jasmine-globals`, `jest/no-large-snapshots`, `jest/no-mocks-import`, `jest/no-restricted-jest-methods`, `jest/no-restricted-matchers`, `jest/no-standalone-expect`, `jest/no-test-prefixes`, `jest/no-test-return-statement`, `jest/no-untyped-mock-factory`, `jest/padding-around-test-blocks`, `jest/prefer-called-with`, `jest/prefer-comparison-matcher`, `jest/prefer-each`, `jest/prefer-equality-matcher`, `jest/prefer-expect-resolves`, `jest/prefer-hooks-in-order`, `jest/prefer-hooks-on-top`, `jest/prefer-jest-mocked`, `jest/prefer-lowercase-title`, `jest/prefer-mock-promise-shorthand`, `jest/prefer-spy-on`, `jest/prefer-strict-equal`, `jest/prefer-to-be`, `jest/prefer-to-contain`, `jest/prefer-to-have-length`, `jest/prefer-todo`, `jest/require-hook`, `jest/require-to-throw-message`, `jest/require-top-level-describe`, `jest/valid-describe-callback`, `jest/valid-expect`, `jest/valid-title`

</details>

<details>
<summary>13 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jest/padding-around-after-all-blocks`, `jest/padding-around-after-each-blocks`, `jest/padding-around-all`, `jest/padding-around-before-all-blocks`, `jest/padding-around-before-each-blocks`, `jest/padding-around-describe-blocks`, `jest/padding-around-expect-groups`, `jest/prefer-ending-with-an-expect`, `jest/prefer-expect-assertions`, `jest/prefer-importing-jest-globals`, `jest/prefer-snapshot-hint`, `jest/valid-expect-in-promise`

**Not portable to oxlint**

`jest/unbound-method`

</details>

### `@vitest/recommended.json`

```json
"./node_modules/oxlint-config-presets/@vitest/recommended.json"
```

<details>
<summary>14 rules successfully migrated</summary>

`vitest/expect-expect`, `vitest/no-commented-out-tests`, `vitest/no-conditional-expect`, `vitest/no-disabled-tests`, `vitest/no-focused-tests`, `vitest/no-identical-title`, `vitest/no-import-node-test`, `vitest/no-interpolation-in-snapshots`, `vitest/no-mocks-import`, `vitest/no-standalone-expect`, `vitest/no-unneeded-async-expect-function`, `vitest/require-local-test-context-for-concurrent-snapshots`, `vitest/valid-describe-callback`, `vitest/valid-expect`

</details>

<details>
<summary>3 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vitest/prefer-called-exactly-once-with`, `vitest/valid-expect-in-promise`, `vitest/valid-title`

</details>

### `@vitest/all.json`

```json
"./node_modules/oxlint-config-presets/@vitest/all.json"
```

<details>
<summary>54 rules successfully migrated</summary>

`vitest/consistent-each-for`, `vitest/consistent-test-filename`, `vitest/consistent-test-it`, `vitest/consistent-vitest-vi`, `vitest/expect-expect`, `vitest/hoisted-apis-on-top`, `vitest/max-expects`, `vitest/max-nested-describe`, `vitest/no-alias-methods`, `vitest/no-commented-out-tests`, `vitest/no-conditional-expect`, `vitest/no-conditional-in-test`, `vitest/no-conditional-tests`, `vitest/no-disabled-tests`, `vitest/no-duplicate-hooks`, `vitest/no-focused-tests`, `vitest/no-hooks`, `vitest/no-identical-title`, `vitest/no-import-node-test`, `vitest/no-interpolation-in-snapshots`, `vitest/no-large-snapshots`, `vitest/no-mocks-import`, `vitest/no-restricted-matchers`, `vitest/no-standalone-expect`, `vitest/no-test-prefixes`, `vitest/no-test-return-statement`, `vitest/no-unneeded-async-expect-function`, `vitest/prefer-called-times`, `vitest/prefer-called-with`, `vitest/prefer-comparison-matcher`, `vitest/prefer-describe-function-title`, `vitest/prefer-each`, `vitest/prefer-equality-matcher`, `vitest/prefer-expect-resolves`, `vitest/prefer-expect-type-of`, `vitest/prefer-hooks-in-order`, `vitest/prefer-hooks-on-top`, `vitest/prefer-import-in-mock`, `vitest/prefer-lowercase-title`, `vitest/prefer-mock-promise-shorthand`, `vitest/prefer-spy-on`, `vitest/prefer-strict-boolean-matchers`, `vitest/prefer-strict-equal`, `vitest/prefer-to-be-object`, `vitest/prefer-to-be`, `vitest/prefer-to-contain`, `vitest/prefer-to-have-length`, `vitest/prefer-todo`, `vitest/require-hook`, `vitest/require-local-test-context-for-concurrent-snapshots`, `vitest/require-to-throw-message`, `vitest/require-top-level-describe`, `vitest/valid-describe-callback`, `vitest/valid-expect`

</details>

<details>
<summary>20 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vitest/no-restricted-vi-methods`, `vitest/padding-around-after-all-blocks`, `vitest/padding-around-after-each-blocks`, `vitest/padding-around-all`, `vitest/padding-around-before-all-blocks`, `vitest/padding-around-before-each-blocks`, `vitest/padding-around-describe-blocks`, `vitest/padding-around-expect-groups`, `vitest/padding-around-test-blocks`, `vitest/prefer-called-exactly-once-with`, `vitest/prefer-expect-assertions`, `vitest/prefer-importing-vitest-globals`, `vitest/prefer-snapshot-hint`, `vitest/prefer-to-have-been-called-times`, `vitest/require-awaited-expect-poll`, `vitest/require-mock-type-parameters`, `vitest/valid-expect-in-promise`, `vitest/valid-title`

**Not portable to oxlint**

`vitest/prefer-vi-mocked`, `vitest/unbound-method`

</details>

### `vue/essential.json`

```json
"./node_modules/oxlint-config-presets/vue/essential.json"
```

<details>
<summary>7 rules successfully migrated</summary>

`vue/no-arrow-functions-in-watch`, `vue/no-deprecated-destroyed-lifecycle`, `vue/no-export-in-script-setup`, `vue/no-lifecycle-after-await`, `vue/prefer-import-from-vue`, `vue/valid-define-emits`, `vue/valid-define-props`

</details>

<details>
<summary>76 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vue/multi-word-component-names`, `vue/no-async-in-computed-properties`, `vue/no-computed-properties-in-data`, `vue/no-deprecated-data-object-declaration`, `vue/no-deprecated-delete-set`, `vue/no-deprecated-dollar-listeners-api`, `vue/no-deprecated-dollar-scopedslots-api`, `vue/no-deprecated-events-api`, `vue/no-deprecated-model-definition`, `vue/no-deprecated-props-default-this`, `vue/no-deprecated-vue-config-keycodes`, `vue/no-dupe-keys`, `vue/no-expose-after-await`, `vue/no-mutating-props`, `vue/no-ref-as-operand`, `vue/no-reserved-component-names`, `vue/no-reserved-keys`, `vue/no-reserved-props`, `vue/no-shared-component-data`, `vue/no-side-effects-in-computed-properties`, `vue/no-use-computed-property-like-method`, `vue/no-watch-after-await`, `vue/require-prop-type-constructor`, `vue/require-render-return`, `vue/require-slots-as-functions`, `vue/require-valid-default-prop`, `vue/return-in-computed-property`, `vue/return-in-emits-validator`, `vue/valid-define-options`, `vue/valid-next-tick`

**Not portable to oxlint**

`vue/no-child-content`, `vue/no-deprecated-filter`, `vue/no-deprecated-functional-template`, `vue/no-deprecated-html-element-is`, `vue/no-deprecated-inline-template`, `vue/no-deprecated-router-link-tag-prop`, `vue/no-deprecated-scope-attribute`, `vue/no-deprecated-slot-attribute`, `vue/no-deprecated-slot-scope-attribute`, `vue/no-deprecated-v-bind-sync`, `vue/no-deprecated-v-is`, `vue/no-deprecated-v-on-native-modifier`, `vue/no-deprecated-v-on-number-modifiers`, `vue/no-dupe-v-else-if`, `vue/no-duplicate-attributes`, `vue/no-parsing-error`, `vue/no-template-key`, `vue/no-textarea-mustache`, `vue/no-unused-components`, `vue/no-unused-vars`, `vue/no-use-v-if-with-v-for`, `vue/no-useless-template-attributes`, `vue/no-v-for-template-key-on-child`, `vue/no-v-text-v-html-on-component`, `vue/require-component-is`, `vue/require-toggle-inside-transition`, `vue/require-v-for-key`, `vue/use-v-on-exact`, `vue/valid-attribute-name`, `vue/valid-template-root`, `vue/valid-v-bind`, `vue/valid-v-cloak`, `vue/valid-v-else-if`, `vue/valid-v-else`, `vue/valid-v-for`, `vue/valid-v-html`, `vue/valid-v-if`, `vue/valid-v-is`, `vue/valid-v-memo`, `vue/valid-v-model`, `vue/valid-v-on`, `vue/valid-v-once`, `vue/valid-v-pre`, `vue/valid-v-show`, `vue/valid-v-slot`, `vue/valid-v-text`

</details>

### `vue/strongly-recommended.json`

```json
"./node_modules/oxlint-config-presets/vue/strongly-recommended.json"
```

<details>
<summary>25 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vue/component-definition-name-casing`, `vue/one-component-per-file`, `vue/prop-name-casing`, `vue/require-default-prop`, `vue/require-prop-types`

**Not portable to oxlint**

`vue/attribute-hyphenation`, `vue/first-attribute-linebreak`, `vue/html-closing-bracket-newline`, `vue/html-closing-bracket-spacing`, `vue/html-end-tags`, `vue/html-indent`, `vue/html-quotes`, `vue/html-self-closing`, `vue/max-attributes-per-line`, `vue/multiline-html-element-content-newline`, `vue/mustache-interpolation-spacing`, `vue/no-multi-spaces`, `vue/no-spaces-around-equal-signs-in-attribute`, `vue/no-template-shadow`, `vue/require-explicit-emits`, `vue/singleline-html-element-content-newline`, `vue/v-bind-style`, `vue/v-on-event-hyphenation`, `vue/v-on-style`, `vue/v-slot-style`

</details>

### `vue/recommended.json`

```json
"./node_modules/oxlint-config-presets/vue/recommended.json"
```

<details>
<summary>2 rules successfully migrated</summary>

`vue/no-multiple-slot-args`, `vue/no-required-prop-with-default`

</details>

<details>
<summary>6 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vue/order-in-components`

**Not portable to oxlint**

`vue/attributes-order`, `vue/block-order`, `vue/no-lone-template`, `vue/no-v-html`, `vue/this-in-template`

</details>

### `vue/vue2-essential.json`

```json
"./node_modules/oxlint-config-presets/vue/vue2-essential.json"
```

<details>
<summary>4 rules successfully migrated</summary>

`vue/no-arrow-functions-in-watch`, `vue/no-export-in-script-setup`, `vue/valid-define-emits`, `vue/valid-define-props`

</details>

<details>
<summary>54 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vue/multi-word-component-names`, `vue/no-async-in-computed-properties`, `vue/no-computed-properties-in-data`, `vue/no-dupe-keys`, `vue/no-mutating-props`, `vue/no-ref-as-operand`, `vue/no-reserved-component-names`, `vue/no-reserved-keys`, `vue/no-reserved-props`, `vue/no-shared-component-data`, `vue/no-side-effects-in-computed-properties`, `vue/no-use-computed-property-like-method`, `vue/require-prop-type-constructor`, `vue/require-render-return`, `vue/require-valid-default-prop`, `vue/return-in-computed-property`, `vue/return-in-emits-validator`, `vue/valid-next-tick`

**Not portable to oxlint**

`vue/no-child-content`, `vue/no-custom-modifiers-on-v-model`, `vue/no-dupe-v-else-if`, `vue/no-duplicate-attributes`, `vue/no-multiple-template-root`, `vue/no-parsing-error`, `vue/no-template-key`, `vue/no-textarea-mustache`, `vue/no-unused-components`, `vue/no-unused-vars`, `vue/no-use-v-if-with-v-for`, `vue/no-useless-template-attributes`, `vue/no-v-for-template-key`, `vue/no-v-model-argument`, `vue/no-v-text-v-html-on-component`, `vue/require-component-is`, `vue/require-v-for-key`, `vue/use-v-on-exact`, `vue/valid-attribute-name`, `vue/valid-model-definition`, `vue/valid-template-root`, `vue/valid-v-bind-sync`, `vue/valid-v-bind`, `vue/valid-v-cloak`, `vue/valid-v-else-if`, `vue/valid-v-else`, `vue/valid-v-for`, `vue/valid-v-html`, `vue/valid-v-if`, `vue/valid-v-model`, `vue/valid-v-on`, `vue/valid-v-once`, `vue/valid-v-pre`, `vue/valid-v-show`, `vue/valid-v-slot`, `vue/valid-v-text`

</details>

### `vue/vue2-strongly-recommended.json`

```json
"./node_modules/oxlint-config-presets/vue/vue2-strongly-recommended.json"
```

<details>
<summary>23 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vue/component-definition-name-casing`, `vue/one-component-per-file`, `vue/prop-name-casing`, `vue/require-default-prop`, `vue/require-prop-types`

**Not portable to oxlint**

`vue/attribute-hyphenation`, `vue/first-attribute-linebreak`, `vue/html-closing-bracket-newline`, `vue/html-closing-bracket-spacing`, `vue/html-end-tags`, `vue/html-indent`, `vue/html-quotes`, `vue/html-self-closing`, `vue/max-attributes-per-line`, `vue/multiline-html-element-content-newline`, `vue/mustache-interpolation-spacing`, `vue/no-multi-spaces`, `vue/no-spaces-around-equal-signs-in-attribute`, `vue/no-template-shadow`, `vue/singleline-html-element-content-newline`, `vue/v-bind-style`, `vue/v-on-style`, `vue/v-slot-style`

</details>

### `vue/vue2-recommended.json`

```json
"./node_modules/oxlint-config-presets/vue/vue2-recommended.json"
```

<details>
<summary>2 rules successfully migrated</summary>

`vue/no-multiple-slot-args`, `vue/no-required-prop-with-default`

</details>

<details>
<summary>6 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vue/order-in-components`

**Not portable to oxlint**

`vue/attributes-order`, `vue/block-order`, `vue/no-lone-template`, `vue/no-v-html`, `vue/this-in-template`

</details>

<!-- GENERATED CONFIGS END -->
