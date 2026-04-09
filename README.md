# oxlint-config-presets

[![npm version](https://img.shields.io/npm/v/oxlint-config-presets?logo=npm)](https://www.npmjs.com/package/oxlint-config-presets)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](https://www.npmjs.com/package/oxlint-config-presets)
[![Oxlint](https://img.shields.io/badge/linted%20with-oxlint-6d28d9)](https://oxc.rs/docs/guide/usage/linter.html)

Ready-to-use **Oxlint preset configs** ported from popular ESLint style guides.
Use these presets in your `.oxlintrc.json` using `extends`, just like ESLint shareable configs.

## Install

```sh
npm install --save-dev oxlint-config-presets
# or
pnpm add -D oxlint-config-presets
# or
yarn add -D oxlint-config-presets
```

## Quick start

Pick a preset and extend it in your `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": ["./node_modules/oxlint-config-presets/airbnb.json"]
}
```

You can also compose multiple presets. Later entries override earlier ones:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "extends": [
    "./node_modules/oxlint-config-presets/airbnb.json",
    "./node_modules/oxlint-config-presets/airbnb/hooks.json",
    "./node_modules/oxlint-config-presets/@typescript-eslint/strict-type-checked.json"
  ]
}
```

> [!NOTE]
> Oxlint currently expects `extends` values to be **JSON file paths** relative to your config file.
> For presets in this package, use `./node_modules/oxlint-config-presets/<config>.json`.

### Usage with `oxlint.config.ts`

If you use a [TypeScript config file](https://oxc.rs/docs/guide/usage/linter/config) (`oxlint.config.ts`), you can import presets directly. TypeScript type definitions are included for all presets:

```typescript
import airbnb from 'oxlint-config-presets/airbnb.json' with { type: 'json' };
import tsStrict from 'oxlint-config-presets/@typescript-eslint/strict-type-checked.json' with { type: 'json' };
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [airbnb, tsStrict],
});
```

> [!NOTE]
> Requires Node.js v22.18+ or v24+ for `with { type: "json" }` (import attributes) support.

<!-- GENERATED CONFIGS START -->

## Available configs

- **eslint-config-airbnb**
  - _(default)_ `airbnb.json`
  - base `airbnb/base.json`
  - hooks `airbnb/hooks.json`
  - legacy `airbnb/legacy.json`
  - whitespace `airbnb/whitespace.json`
- **eslint-config-standard** `standard.json`
- **eslint-config-google** `google.json`
- **@typescript-eslint/eslint-plugin**
  - recommended `@typescript-eslint/recommended.json`
  - recommended-type-checked `@typescript-eslint/recommended-type-checked.json`
  - strict `@typescript-eslint/strict.json`
  - strict-type-checked `@typescript-eslint/strict-type-checked.json`
  - stylistic `@typescript-eslint/stylistic.json`
  - stylistic-type-checked `@typescript-eslint/stylistic-type-checked.json`
  - all `@typescript-eslint/all.json`
- **@eslint/js**
  - recommended `@eslint/recommended.json`
  - all `@eslint/all.json`
- **eslint-config-xo** `xo.json`
- **eslint-config-problems** `problems.json`
- **eslint-config-hardcore** `hardcore.json`
- **eslint-config-wikimedia** `wikimedia.json`
- **eslint-config-eslint**
  - _(default)_ `eslint.json`
  - base `eslint/base.json`
- **eslint-config-alloy**
  - _(default)_ `alloy.json`
  - react `alloy/react.json`
  - typescript `alloy/typescript.json`
- **eslint-config-prettier** `prettier.json`
- **@antfu/eslint-config** `@antfu.json`
- **eslint-plugin-import**
  - recommended `import/recommended.json`
  - errors `import/errors.json`
  - stage-0 `import/stage-0.json`
  - typescript `import/typescript.json`
  - warnings `import/warnings.json`
- **eslint-plugin-import-x**
  - recommended `import-x/recommended.json`
  - errors `import-x/errors.json`
  - stage-0 `import-x/stage-0.json`
  - typescript `import-x/typescript.json`
  - warnings `import-x/warnings.json`
- **eslint-config-next**
  - recommended `next/recommended.json`
  - core-web-vitals `next/core-web-vitals.json`
- **eslint-plugin-react**
  - recommended `react/recommended.json`
  - all `react/all.json`
  - jsx-runtime `react/jsx-runtime.json`
- **eslint-plugin-react-perf**
  - recommended `react-perf/recommended.json`
  - all `react-perf/all.json`
- **eslint-plugin-jsdoc**
  - recommended `jsdoc/recommended.json`
  - recommended-error `jsdoc/recommended-error.json`
  - recommended-tsdoc `jsdoc/recommended-tsdoc.json`
  - recommended-tsdoc-error `jsdoc/recommended-tsdoc-error.json`
  - recommended-typescript `jsdoc/recommended-typescript.json`
  - recommended-typescript-error `jsdoc/recommended-typescript-error.json`
  - recommended-typescript-flavor `jsdoc/recommended-typescript-flavor.json`
  - recommended-typescript-flavor-error `jsdoc/recommended-typescript-flavor-error.json`
  - default-expressions `jsdoc/default-expressions.json`
  - examples `jsdoc/examples.json`
  - examples-and-default-expressions `jsdoc/examples-and-default-expressions.json`
- **eslint-plugin-jsx-a11y**
  - recommended `jsx-a11y/recommended.json`
  - strict `jsx-a11y/strict.json`
- **eslint-plugin-n**
  - recommended `n/recommended.json`
  - recommended-module `n/recommended-module.json`
  - recommended-script `n/recommended-script.json`
- **eslint-plugin-promise**
  - recommended `promise/recommended.json`
- **eslint-plugin-jest**
  - recommended `jest/recommended.json`
  - all `jest/all.json`
  - style `jest/style.json`
- **@vitest/eslint-plugin**
  - recommended `@vitest/recommended.json`
  - all `@vitest/all.json`
- **eslint-plugin-vue**
  - recommended `vue/recommended.json`
  - recommended-error `vue/recommended-error.json`
  - essential `vue/essential.json`
  - strongly-recommended `vue/strongly-recommended.json`
  - strongly-recommended-error `vue/strongly-recommended-error.json`
  - vue2-essential `vue/vue2-essential.json`
  - vue2-recommended `vue/vue2-recommended.json`
  - vue2-recommended-error `vue/vue2-recommended-error.json`
  - vue2-strongly-recommended `vue/vue2-strongly-recommended.json`
  - vue2-strongly-recommended-error `vue/vue2-strongly-recommended-error.json`

Generated with `@oxlint/migrate@1.59.0`.

### `airbnb.json`

```json
"./node_modules/oxlint-config-presets/airbnb.json"
```

Extracted from `eslint-config-airbnb@19.0.4`.

<details>
<summary>267 rules successfully migrated</summary>

`accessor-pairs`, `array-callback-return`, `block-scoped-var`, `complexity`, `class-methods-use-this`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `eqeqeq`, `grouped-accessor-pairs`, `guard-for-in`, `max-classes-per-file`, `no-alert`, `no-caller`, `no-case-declarations`, `no-constructor-return`, `no-div-regex`, `no-else-return`, `no-empty-function`, `no-empty-pattern`, `no-eq-null`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-fallthrough`, `no-global-assign`, `no-implicit-coercion`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-magic-numbers`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-param-reassign`, `no-proto`, `no-redeclare`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-throw-literal`, `no-unmodified-loop-condition`, `no-unused-expressions`, `no-unused-labels`, `no-useless-call`, `no-useless-catch`, `no-useless-concat`, `no-useless-escape`, `no-useless-return`, `no-void`, `no-warning-comments`, `no-with`, `prefer-promise-reject-errors`, `radix`, `require-await`, `vars-on-top`, `yoda`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-await-in-loop`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-ex-assign`, `no-extra-boolean-cast`, `no-func-assign`, `no-import-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-obj-calls`, `no-promise-executor-return`, `no-prototype-builtins`, `no-regex-spaces`, `no-setter-return`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-private-class-members`, `no-useless-backreference`, `use-isnan`, `valid-typeof`, `capitalized-comments`, `func-names`, `func-style`, `id-length`, `max-depth`, `max-lines`, `max-lines-per-function`, `max-nested-callbacks`, `max-params`, `max-statements`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-continue`, `no-inline-comments`, `no-lonely-if`, `no-multi-assign`, `no-negated-condition`, `no-nested-ternary`, `no-plusplus`, `no-ternary`, `no-unneeded-ternary`, `operator-assignment`, `prefer-exponentiation-operator`, `prefer-object-spread`, `sort-keys`, `sort-vars`, `unicode-bom`, `init-declarations`, `no-delete-var`, `no-label-var`, `no-restricted-globals`, `no-shadow`, `no-shadow-restricted-names`, `no-undef`, `no-undefined`, `no-unused-vars`, `no-use-before-define`, `arrow-body-style`, `constructor-super`, `no-class-assign`, `no-const-assign`, `no-dupe-class-members`, `no-duplicate-imports`, `no-restricted-exports`, `no-restricted-imports`, `no-this-before-super`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-rename`, `no-var`, `object-shorthand`, `prefer-const`, `prefer-destructuring`, `prefer-numeric-literals`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `require-yield`, `symbol-description`, `import/named`, `import/default`, `import/namespace`, `import/export`, `import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-mutable-exports`, `import/no-commonjs`, `import/no-amd`, `import/no-nodejs-modules`, `import/first`, `import/no-duplicates`, `import/no-namespace`, `import/extensions`, `import/prefer-default-export`, `import/max-dependencies`, `import/no-absolute-path`, `import/no-dynamic-require`, `import/unambiguous`, `import/no-webpack-loader-syntax`, `import/no-unassigned-import`, `import/no-named-default`, `import/no-anonymous-default-export`, `import/exports-last`, `import/group-exports`, `import/no-default-export`, `import/no-named-export`, `import/no-self-import`, `import/no-relative-parent-imports`, `react/display-name`, `react/forbid-dom-props`, `react/jsx-boolean-value`, `react/jsx-handler-names`, `react/jsx-key`, `react/jsx-no-undef`, `react/jsx-pascal-case`, `react/no-danger`, `react/no-did-mount-set-state`, `react/no-will-update-set-state`, `react/no-direct-mutation-state`, `react/no-is-mounted`, `react/no-multi-comp`, `react/no-set-state`, `react/no-string-refs`, `react/no-unknown-property`, `react/prefer-es6-class`, `react/react-in-jsx-scope`, `react/require-render-return`, `react/self-closing-comp`, `react/jsx-no-target-blank`, `react/jsx-filename-extension`, `react/jsx-no-comment-textnodes`, `react/no-render-return-value`, `react/no-find-dom-node`, `react/forbid-elements`, `react/no-danger-with-children`, `react/style-prop-object`, `react/no-unescaped-entities`, `react/no-children-prop`, `react/no-array-index-key`, `react/void-dom-elements-no-children`, `react/no-redundant-should-component-update`, `react/jsx-curly-brace-presence`, `react/button-has-type`, `react/no-this-in-sfc`, `react/jsx-max-depth`, `react/no-unsafe`, `react/jsx-fragments`, `react/state-in-constructor`, `react/jsx-props-no-spreading`, `react/jsx-no-script-url`, `react/jsx-no-useless-fragment`, `react/jsx-no-constructed-context-values`, `react/no-namespace`, `jsx-a11y/alt-text`, `jsx-a11y/anchor-is-valid`, `jsx-a11y/aria-activedescendant-has-tabindex`, `jsx-a11y/aria-props`, `jsx-a11y/aria-proptypes`, `jsx-a11y/aria-role`, `jsx-a11y/aria-unsupported-elements`, `jsx-a11y/autocomplete-valid`, `jsx-a11y/click-events-have-key-events`, `jsx-a11y/heading-has-content`, `jsx-a11y/html-has-lang`, `jsx-a11y/iframe-has-title`, `jsx-a11y/img-redundant-alt`, `jsx-a11y/label-has-associated-control`, `jsx-a11y/lang`, `jsx-a11y/media-has-caption`, `jsx-a11y/mouse-events-have-key-events`, `jsx-a11y/no-access-key`, `jsx-a11y/no-autofocus`, `jsx-a11y/no-distracting-elements`, `jsx-a11y/no-noninteractive-tabindex`, `jsx-a11y/no-redundant-roles`, `jsx-a11y/no-static-element-interactions`, `jsx-a11y/role-has-required-aria-props`, `jsx-a11y/role-supports-aria-props`, `jsx-a11y/scope`, `jsx-a11y/tabindex-no-positive`, `typescript/consistent-return`, `typescript/dot-notation`

</details>

<details>
<summary>3 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`import/no-cycle`, `jsx-a11y/anchor-has-content`, `react/jsx-no-duplicate-props`

</details>

<details>
<summary>132 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`, `no-underscore-dangle`, `react/jsx-no-bind`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`, `react/no-typos`, `react/destructuring-assignment`, `react/function-component-definition`, `react/no-unstable-nested-components`, `react/no-arrow-function-lifecycle`, `react/no-invalid-html-attribute`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`, `jsx-quotes`, `react/forbid-prop-types`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/jsx-wrap-multilines`, `react/jsx-first-prop-new-line`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/no-unused-prop-types`, `react/jsx-tag-spacing`, `react/forbid-foreign-prop-types`, `react/default-props-match-prop-types`, `react/no-unused-state`, `react/jsx-one-expression-per-line`, `react/no-access-state-in-setstate`, `react/jsx-props-no-multi-spaces`, `react/jsx-curly-newline`, `react/static-property-placement`, `react/prefer-exact-props`, `react/no-unused-class-component-methods`

</details>

> `import/resolver`
> `import/extensions`
> `import/core-modules`
> `import/ignore`
> react.version "detect" is not supported. Specify an explicit version (e.g., "18.2.0") in your oxlint config.
> `react.pragma`
> `propWrapperFunctions`

### `airbnb/base.json`

```json
"./node_modules/oxlint-config-presets/airbnb/base.json"
```

Extracted from `eslint-config-airbnb@19.0.4`.

<details>
<summary>195 rules successfully migrated</summary>

`accessor-pairs`, `array-callback-return`, `block-scoped-var`, `complexity`, `class-methods-use-this`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `eqeqeq`, `grouped-accessor-pairs`, `guard-for-in`, `max-classes-per-file`, `no-alert`, `no-caller`, `no-case-declarations`, `no-constructor-return`, `no-div-regex`, `no-else-return`, `no-empty-function`, `no-empty-pattern`, `no-eq-null`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-fallthrough`, `no-global-assign`, `no-implicit-coercion`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-magic-numbers`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-param-reassign`, `no-proto`, `no-redeclare`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-throw-literal`, `no-unmodified-loop-condition`, `no-unused-expressions`, `no-unused-labels`, `no-useless-call`, `no-useless-catch`, `no-useless-concat`, `no-useless-escape`, `no-useless-return`, `no-void`, `no-warning-comments`, `no-with`, `prefer-promise-reject-errors`, `radix`, `require-await`, `vars-on-top`, `yoda`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-await-in-loop`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-ex-assign`, `no-extra-boolean-cast`, `no-func-assign`, `no-import-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-obj-calls`, `no-promise-executor-return`, `no-prototype-builtins`, `no-regex-spaces`, `no-setter-return`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-private-class-members`, `no-useless-backreference`, `use-isnan`, `valid-typeof`, `capitalized-comments`, `func-names`, `func-style`, `id-length`, `max-depth`, `max-lines`, `max-lines-per-function`, `max-nested-callbacks`, `max-params`, `max-statements`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-continue`, `no-inline-comments`, `no-lonely-if`, `no-multi-assign`, `no-negated-condition`, `no-nested-ternary`, `no-plusplus`, `no-ternary`, `no-unneeded-ternary`, `operator-assignment`, `prefer-exponentiation-operator`, `prefer-object-spread`, `sort-keys`, `sort-vars`, `unicode-bom`, `init-declarations`, `no-delete-var`, `no-label-var`, `no-restricted-globals`, `no-shadow`, `no-shadow-restricted-names`, `no-undef`, `no-undefined`, `no-unused-vars`, `no-use-before-define`, `arrow-body-style`, `constructor-super`, `no-class-assign`, `no-const-assign`, `no-dupe-class-members`, `no-duplicate-imports`, `no-restricted-exports`, `no-restricted-imports`, `no-this-before-super`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-rename`, `no-var`, `object-shorthand`, `prefer-const`, `prefer-destructuring`, `prefer-numeric-literals`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `require-yield`, `symbol-description`, `import/named`, `import/default`, `import/namespace`, `import/export`, `import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-mutable-exports`, `import/no-commonjs`, `import/no-amd`, `import/no-nodejs-modules`, `import/first`, `import/no-duplicates`, `import/no-namespace`, `import/extensions`, `import/prefer-default-export`, `import/max-dependencies`, `import/no-absolute-path`, `import/no-dynamic-require`, `import/unambiguous`, `import/no-webpack-loader-syntax`, `import/no-unassigned-import`, `import/no-named-default`, `import/no-anonymous-default-export`, `import/exports-last`, `import/group-exports`, `import/no-default-export`, `import/no-named-export`, `import/no-self-import`, `import/no-relative-parent-imports`, `typescript/consistent-return`, `typescript/dot-notation`

</details>

<details>
<summary>1 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`import/no-cycle`

</details>

<details>
<summary>88 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`

</details>

> `import/resolver`
> `import/extensions`
> `import/core-modules`
> `import/ignore`

### `airbnb/hooks.json`

```json
"./node_modules/oxlint-config-presets/airbnb/hooks.json"
```

Extracted from `eslint-config-airbnb@19.0.4`.

<details>
<summary>2 rules successfully migrated</summary>

`react/rules-of-hooks`, `react/exhaustive-deps`

</details>

### `airbnb/legacy.json`

```json
"./node_modules/oxlint-config-presets/airbnb/legacy.json"
```

Extracted from `eslint-config-airbnb@19.0.4`.

<details>
<summary>146 rules successfully migrated</summary>

`accessor-pairs`, `array-callback-return`, `block-scoped-var`, `complexity`, `class-methods-use-this`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `eqeqeq`, `grouped-accessor-pairs`, `guard-for-in`, `max-classes-per-file`, `no-alert`, `no-caller`, `no-case-declarations`, `no-constructor-return`, `no-div-regex`, `no-else-return`, `no-empty-function`, `no-empty-pattern`, `no-eq-null`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-fallthrough`, `no-global-assign`, `no-implicit-coercion`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-magic-numbers`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-param-reassign`, `no-proto`, `no-redeclare`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-throw-literal`, `no-unmodified-loop-condition`, `no-unused-expressions`, `no-unused-labels`, `no-useless-call`, `no-useless-catch`, `no-useless-concat`, `no-useless-escape`, `no-useless-return`, `no-void`, `no-warning-comments`, `no-with`, `prefer-promise-reject-errors`, `radix`, `require-await`, `vars-on-top`, `yoda`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-await-in-loop`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-ex-assign`, `no-extra-boolean-cast`, `no-func-assign`, `no-import-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-obj-calls`, `no-promise-executor-return`, `no-prototype-builtins`, `no-regex-spaces`, `no-setter-return`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-private-class-members`, `no-useless-backreference`, `use-isnan`, `valid-typeof`, `capitalized-comments`, `func-names`, `func-style`, `id-length`, `max-depth`, `max-lines`, `max-lines-per-function`, `max-nested-callbacks`, `max-params`, `max-statements`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-continue`, `no-inline-comments`, `no-lonely-if`, `no-multi-assign`, `no-negated-condition`, `no-nested-ternary`, `no-plusplus`, `no-ternary`, `no-unneeded-ternary`, `operator-assignment`, `prefer-exponentiation-operator`, `prefer-object-spread`, `sort-keys`, `sort-vars`, `unicode-bom`, `init-declarations`, `no-delete-var`, `no-label-var`, `no-restricted-globals`, `no-shadow`, `no-shadow-restricted-names`, `no-undef`, `no-undefined`, `no-unused-vars`, `no-use-before-define`, `prefer-numeric-literals`, `no-var`, `typescript/consistent-return`, `typescript/dot-notation`

</details>

<details>
<summary>74 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `no-restricted-properties`, `strict`

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `comma-dangle`

</details>

### `airbnb/whitespace.json`

```json
"./node_modules/oxlint-config-presets/airbnb/whitespace.json"
```

Extracted from `eslint-config-airbnb@19.0.4`.

<details>
<summary>267 rules successfully migrated</summary>

`accessor-pairs`, `array-callback-return`, `block-scoped-var`, `complexity`, `class-methods-use-this`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `eqeqeq`, `grouped-accessor-pairs`, `guard-for-in`, `max-classes-per-file`, `no-alert`, `no-caller`, `no-case-declarations`, `no-constructor-return`, `no-div-regex`, `no-else-return`, `no-empty-function`, `no-empty-pattern`, `no-eq-null`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-fallthrough`, `no-global-assign`, `no-implicit-coercion`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-magic-numbers`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-param-reassign`, `no-proto`, `no-redeclare`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-throw-literal`, `no-unmodified-loop-condition`, `no-unused-expressions`, `no-unused-labels`, `no-useless-call`, `no-useless-catch`, `no-useless-concat`, `no-useless-escape`, `no-useless-return`, `no-void`, `no-warning-comments`, `no-with`, `prefer-promise-reject-errors`, `radix`, `require-await`, `vars-on-top`, `yoda`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-await-in-loop`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-ex-assign`, `no-extra-boolean-cast`, `no-func-assign`, `no-import-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-obj-calls`, `no-promise-executor-return`, `no-prototype-builtins`, `no-regex-spaces`, `no-setter-return`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-private-class-members`, `no-useless-backreference`, `use-isnan`, `valid-typeof`, `capitalized-comments`, `func-names`, `func-style`, `id-length`, `max-depth`, `max-lines`, `max-lines-per-function`, `max-nested-callbacks`, `max-params`, `max-statements`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-continue`, `no-inline-comments`, `no-lonely-if`, `no-multi-assign`, `no-negated-condition`, `no-nested-ternary`, `no-plusplus`, `no-ternary`, `no-unneeded-ternary`, `operator-assignment`, `prefer-exponentiation-operator`, `prefer-object-spread`, `sort-keys`, `sort-vars`, `unicode-bom`, `init-declarations`, `no-delete-var`, `no-label-var`, `no-restricted-globals`, `no-shadow`, `no-shadow-restricted-names`, `no-undef`, `no-undefined`, `no-unused-vars`, `no-use-before-define`, `arrow-body-style`, `constructor-super`, `no-class-assign`, `no-const-assign`, `no-dupe-class-members`, `no-duplicate-imports`, `no-restricted-exports`, `no-restricted-imports`, `no-this-before-super`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-rename`, `no-var`, `object-shorthand`, `prefer-const`, `prefer-destructuring`, `prefer-numeric-literals`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `require-yield`, `symbol-description`, `import/named`, `import/default`, `import/namespace`, `import/export`, `import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-mutable-exports`, `import/no-commonjs`, `import/no-amd`, `import/no-nodejs-modules`, `import/first`, `import/no-duplicates`, `import/no-namespace`, `import/extensions`, `import/prefer-default-export`, `import/max-dependencies`, `import/no-absolute-path`, `import/no-dynamic-require`, `import/unambiguous`, `import/no-webpack-loader-syntax`, `import/no-unassigned-import`, `import/no-named-default`, `import/no-anonymous-default-export`, `import/exports-last`, `import/group-exports`, `import/no-default-export`, `import/no-named-export`, `import/no-self-import`, `import/no-relative-parent-imports`, `react/display-name`, `react/forbid-dom-props`, `react/jsx-boolean-value`, `react/jsx-handler-names`, `react/jsx-key`, `react/jsx-no-undef`, `react/jsx-pascal-case`, `react/no-danger`, `react/no-did-mount-set-state`, `react/no-will-update-set-state`, `react/no-direct-mutation-state`, `react/no-is-mounted`, `react/no-multi-comp`, `react/no-set-state`, `react/no-string-refs`, `react/no-unknown-property`, `react/prefer-es6-class`, `react/react-in-jsx-scope`, `react/require-render-return`, `react/self-closing-comp`, `react/jsx-no-target-blank`, `react/jsx-filename-extension`, `react/jsx-no-comment-textnodes`, `react/no-render-return-value`, `react/no-find-dom-node`, `react/forbid-elements`, `react/no-danger-with-children`, `react/style-prop-object`, `react/no-unescaped-entities`, `react/no-children-prop`, `react/no-array-index-key`, `react/void-dom-elements-no-children`, `react/no-redundant-should-component-update`, `react/jsx-curly-brace-presence`, `react/button-has-type`, `react/no-this-in-sfc`, `react/jsx-max-depth`, `react/no-unsafe`, `react/jsx-fragments`, `react/state-in-constructor`, `react/jsx-props-no-spreading`, `react/jsx-no-script-url`, `react/jsx-no-useless-fragment`, `react/jsx-no-constructed-context-values`, `react/no-namespace`, `jsx-a11y/alt-text`, `jsx-a11y/anchor-is-valid`, `jsx-a11y/aria-activedescendant-has-tabindex`, `jsx-a11y/aria-props`, `jsx-a11y/aria-proptypes`, `jsx-a11y/aria-role`, `jsx-a11y/aria-unsupported-elements`, `jsx-a11y/autocomplete-valid`, `jsx-a11y/click-events-have-key-events`, `jsx-a11y/heading-has-content`, `jsx-a11y/html-has-lang`, `jsx-a11y/iframe-has-title`, `jsx-a11y/img-redundant-alt`, `jsx-a11y/label-has-associated-control`, `jsx-a11y/lang`, `jsx-a11y/media-has-caption`, `jsx-a11y/mouse-events-have-key-events`, `jsx-a11y/no-access-key`, `jsx-a11y/no-autofocus`, `jsx-a11y/no-distracting-elements`, `jsx-a11y/no-noninteractive-tabindex`, `jsx-a11y/no-redundant-roles`, `jsx-a11y/no-static-element-interactions`, `jsx-a11y/role-has-required-aria-props`, `jsx-a11y/role-supports-aria-props`, `jsx-a11y/scope`, `jsx-a11y/tabindex-no-positive`, `typescript/consistent-return`, `typescript/dot-notation`

</details>

<details>
<summary>3 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`import/no-cycle`, `jsx-a11y/anchor-has-content`, `react/jsx-no-duplicate-props`

</details>

<details>
<summary>212 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`, `no-unreachable-loop`, `no-restricted-syntax`, `no-underscore-dangle`, `one-var`, `prefer-arrow-callback`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `strict`, `no-underscore-dangle`, `react/jsx-no-bind`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`, `react/no-typos`, `react/destructuring-assignment`, `react/function-component-definition`, `react/no-unstable-nested-components`, `react/no-arrow-function-lifecycle`, `react/no-invalid-html-attribute`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`, `jsx-a11y/control-has-associated-label`, `jsx-a11y/interactive-supports-focus`, `jsx-a11y/no-interactive-element-to-noninteractive-role`, `jsx-a11y/no-noninteractive-element-interactions`, `jsx-a11y/no-noninteractive-element-to-interactive-role`, `no-underscore-dangle`, `react/jsx-no-bind`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`, `react/no-typos`, `react/destructuring-assignment`, `react/function-component-definition`, `react/no-unstable-nested-components`, `react/no-arrow-function-lifecycle`, `react/no-invalid-html-attribute`, `strict`, `import/no-extraneous-dependencies`, `import/no-useless-path-segments`, `import/no-import-module-exports`, `import/no-relative-packages`, `prefer-arrow-callback`, `no-restricted-syntax`, `one-var`, `no-unreachable-loop`, `no-implied-eval`, `no-restricted-properties`, `prefer-regex-literals`

**Not portable to oxlint**

`dot-location`, `no-floating-decimal`, `no-multi-spaces`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`, `no-dupe-args`, `no-extra-semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `eol-last`, `function-call-argument-newline`, `func-call-spacing`, `function-paren-newline`, `implicit-arrow-linebreak`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `newline-per-chained-call`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multiple-empty-lines`, `no-new-object`, `no-spaced-func`, `no-tabs`, `no-trailing-spaces`, `no-whitespace-before-property`, `nonblock-statement-body-position`, `object-curly-spacing`, `object-curly-newline`, `object-property-newline`, `one-var-declaration-per-line`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `template-tag-spacing`, `no-undef-init`, `arrow-parens`, `arrow-spacing`, `generator-star-spacing`, `no-confusing-arrow`, `no-new-symbol`, `rest-spread-spacing`, `template-curly-spacing`, `yield-star-spacing`, `import/no-unresolved`, `import/order`, `jsx-quotes`, `react/forbid-prop-types`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/jsx-wrap-multilines`, `react/jsx-first-prop-new-line`, `react/jsx-equals-spacing`, `react/jsx-indent`, `react/no-unused-prop-types`, `react/jsx-tag-spacing`, `react/forbid-foreign-prop-types`, `react/default-props-match-prop-types`, `react/no-unused-state`, `react/jsx-one-expression-per-line`, `react/no-access-state-in-setstate`, `react/jsx-props-no-multi-spaces`, `react/jsx-curly-newline`, `react/static-property-placement`, `react/prefer-exact-props`, `react/no-unused-class-component-methods`, `jsx-quotes`, `react/forbid-prop-types`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/sort-comp`, `react/jsx-first-prop-new-line`, `react/no-unused-prop-types`, `react/default-props-match-prop-types`, `react/no-unused-state`, `react/no-access-state-in-setstate`, `react/jsx-props-no-multi-spaces`, `react/jsx-curly-newline`, `react/static-property-placement`, `react/prefer-exact-props`, `react/no-unused-class-component-methods`, `import/no-unresolved`, `import/order`, `arrow-parens`, `no-confusing-arrow`, `no-new-symbol`, `template-curly-spacing`, `yield-star-spacing`, `no-undef-init`, `brace-style`, `camelcase`, `comma-dangle`, `comma-style`, `function-call-argument-newline`, `lines-between-class-members`, `lines-around-directive`, `max-len`, `new-parens`, `no-mixed-operators`, `no-multiple-empty-lines`, `no-new-object`, `no-tabs`, `quote-props`, `quotes`, `semi`, `global-require`, `no-buffer-constructor`, `no-new-require`, `no-path-concat`, `no-dupe-args`, `no-extra-semi`, `no-floating-decimal`, `no-octal`, `no-octal-escape`, `no-return-await`, `wrap-iife`

</details>

> `import/resolver`
> `import/extensions`
> `import/core-modules`
> `import/ignore`
> react.version "detect" is not supported. Specify an explicit version (e.g., "18.2.0") in your oxlint config.
> `react.pragma`
> `propWrapperFunctions`

### `standard.json`

```json
"./node_modules/oxlint-config-presets/standard.json"
```

Extracted from `eslint-config-standard@17.1.0`.

<details>
<summary>100 rules successfully migrated</summary>

`no-var`, `object-shorthand`, `accessor-pairs`, `array-callback-return`, `constructor-super`, `curly`, `default-case-last`, `eqeqeq`, `new-cap`, `no-array-constructor`, `no-async-promise-executor`, `no-caller`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-keys`, `no-duplicate-case`, `no-useless-backreference`, `no-empty`, `no-empty-character-class`, `no-empty-pattern`, `no-eval`, `no-ex-assign`, `no-extend-native`, `no-extra-bind`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loss-of-precision`, `no-misleading-character-class`, `no-prototype-builtins`, `no-useless-catch`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-obj-calls`, `no-proto`, `no-redeclare`, `no-regex-spaces`, `no-return-assign`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-this-before-super`, `no-throw-literal`, `no-undef`, `no-unexpected-multiline`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unused-expressions`, `no-unused-vars`, `no-use-before-define`, `no-useless-call`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-escape`, `no-useless-rename`, `no-useless-return`, `no-void`, `no-with`, `prefer-const`, `prefer-promise-reject-errors`, `symbol-description`, `unicode-bom`, `use-isnan`, `valid-typeof`, `yoda`, `import/export`, `import/first`, `import/no-absolute-path`, `import/no-duplicates`, `import/no-named-default`, `import/no-webpack-loader-syntax`, `promise/param-names`, `node/handle-callback-err`, `node/no-exports-assign`, `node/no-new-require`, `node/no-path-concat`, `typescript/dot-notation`

</details>

<details>
<summary>61 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-implied-eval`, `no-unreachable-loop`, `one-var`, `prefer-regex-literals`, `n/no-callback-literal`, `n/no-deprecated-api`, `n/process-exit-as-throw`

**Not portable to oxlint**

`array-bracket-spacing`, `arrow-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `dot-location`, `eol-last`, `func-call-spacing`, `generator-star-spacing`, `indent`, `key-spacing`, `keyword-spacing`, `lines-between-class-members`, `multiline-ternary`, `new-parens`, `no-dupe-args`, `no-extra-parens`, `no-floating-decimal`, `no-mixed-operators`, `no-mixed-spaces-and-tabs`, `no-multi-spaces`, `no-multiple-empty-lines`, `no-new-object`, `no-new-symbol`, `no-octal`, `no-octal-escape`, `no-tabs`, `no-trailing-spaces`, `no-undef-init`, `no-whitespace-before-property`, `object-curly-newline`, `object-curly-spacing`, `object-property-newline`, `operator-linebreak`, `padded-blocks`, `quote-props`, `quotes`, `rest-spread-spacing`, `semi`, `semi-spacing`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `template-curly-spacing`, `template-tag-spacing`, `wrap-iife`, `yield-star-spacing`

</details>

### `google.json`

```json
"./node_modules/oxlint-config-presets/google.json"
```

Extracted from `eslint-config-google@0.14.0`.

<details>
<summary>22 rules successfully migrated</summary>

`no-cond-assign`, `no-irregular-whitespace`, `no-unexpected-multiline`, `curly`, `guard-for-in`, `no-caller`, `no-extend-native`, `no-extra-bind`, `no-multi-str`, `no-new-wrappers`, `no-throw-literal`, `no-with`, `prefer-promise-reject-errors`, `no-unused-vars`, `new-cap`, `no-array-constructor`, `constructor-super`, `no-this-before-super`, `no-var`, `prefer-const`, `prefer-rest-params`, `prefer-spread`

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

Extracted from `@typescript-eslint/eslint-plugin@8.57.2`.

<details>
<summary>20 rules successfully migrated</summary>

`no-array-constructor`, `no-unused-expressions`, `no-unused-vars`, `typescript/ban-ts-comment`, `typescript/no-duplicate-enum-values`, `typescript/no-empty-object-type`, `typescript/no-explicit-any`, `typescript/no-extra-non-null-assertion`, `typescript/no-misused-new`, `typescript/no-namespace`, `typescript/no-non-null-asserted-optional-chain`, `typescript/no-require-imports`, `typescript/no-this-alias`, `typescript/no-unnecessary-type-constraint`, `typescript/no-unsafe-declaration-merging`, `typescript/no-unsafe-function-type`, `typescript/no-wrapper-object-types`, `typescript/prefer-as-const`, `typescript/prefer-namespace-keyword`, `typescript/triple-slash-reference`

</details>

### `@typescript-eslint/recommended-type-checked.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/recommended-type-checked.json"
```

Extracted from `@typescript-eslint/eslint-plugin@8.57.2`.

<details>
<summary>46 rules successfully migrated</summary>

`no-array-constructor`, `no-unused-expressions`, `no-unused-vars`, `no-throw-literal`, `prefer-promise-reject-errors`, `require-await`, `typescript/await-thenable`, `typescript/ban-ts-comment`, `typescript/no-array-delete`, `typescript/no-base-to-string`, `typescript/no-duplicate-enum-values`, `typescript/no-duplicate-type-constituents`, `typescript/no-empty-object-type`, `typescript/no-explicit-any`, `typescript/no-extra-non-null-assertion`, `typescript/no-floating-promises`, `typescript/no-for-in-array`, `typescript/no-implied-eval`, `typescript/no-misused-new`, `typescript/no-misused-promises`, `typescript/no-namespace`, `typescript/no-non-null-asserted-optional-chain`, `typescript/no-redundant-type-constituents`, `typescript/no-require-imports`, `typescript/no-this-alias`, `typescript/no-unnecessary-type-assertion`, `typescript/no-unnecessary-type-constraint`, `typescript/no-unsafe-argument`, `typescript/no-unsafe-assignment`, `typescript/no-unsafe-call`, `typescript/no-unsafe-declaration-merging`, `typescript/no-unsafe-enum-comparison`, `typescript/no-unsafe-function-type`, `typescript/no-unsafe-member-access`, `typescript/no-unsafe-return`, `typescript/no-unsafe-unary-minus`, `typescript/no-wrapper-object-types`, `typescript/only-throw-error`, `typescript/prefer-as-const`, `typescript/prefer-namespace-keyword`, `typescript/prefer-promise-reject-errors`, `typescript/require-await`, `typescript/restrict-plus-operands`, `typescript/restrict-template-expressions`, `typescript/triple-slash-reference`, `typescript/unbound-method`

</details>

### `@typescript-eslint/strict.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/strict.json"
```

Extracted from `@typescript-eslint/eslint-plugin@8.57.2`.

<details>
<summary>28 rules successfully migrated</summary>

`no-array-constructor`, `no-unused-expressions`, `no-unused-vars`, `no-useless-constructor`, `typescript/ban-ts-comment`, `typescript/no-duplicate-enum-values`, `typescript/no-dynamic-delete`, `typescript/no-empty-object-type`, `typescript/no-explicit-any`, `typescript/no-extra-non-null-assertion`, `typescript/no-extraneous-class`, `typescript/no-invalid-void-type`, `typescript/no-misused-new`, `typescript/no-namespace`, `typescript/no-non-null-asserted-nullish-coalescing`, `typescript/no-non-null-asserted-optional-chain`, `typescript/no-non-null-assertion`, `typescript/no-require-imports`, `typescript/no-this-alias`, `typescript/no-unnecessary-type-constraint`, `typescript/no-unsafe-declaration-merging`, `typescript/no-unsafe-function-type`, `typescript/no-wrapper-object-types`, `typescript/prefer-as-const`, `typescript/prefer-literal-enum-member`, `typescript/prefer-namespace-keyword`, `typescript/triple-slash-reference`, `typescript/unified-signatures`

</details>

### `@typescript-eslint/strict-type-checked.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/strict-type-checked.json"
```

Extracted from `@typescript-eslint/eslint-plugin@8.57.2`.

<details>
<summary>71 rules successfully migrated</summary>

`no-array-constructor`, `no-unused-expressions`, `no-unused-vars`, `no-useless-constructor`, `no-throw-literal`, `prefer-promise-reject-errors`, `require-await`, `typescript/await-thenable`, `typescript/ban-ts-comment`, `typescript/no-array-delete`, `typescript/no-base-to-string`, `typescript/no-confusing-void-expression`, `typescript/no-deprecated`, `typescript/no-duplicate-enum-values`, `typescript/no-duplicate-type-constituents`, `typescript/no-dynamic-delete`, `typescript/no-empty-object-type`, `typescript/no-explicit-any`, `typescript/no-extra-non-null-assertion`, `typescript/no-extraneous-class`, `typescript/no-floating-promises`, `typescript/no-for-in-array`, `typescript/no-implied-eval`, `typescript/no-invalid-void-type`, `typescript/no-meaningless-void-operator`, `typescript/no-misused-new`, `typescript/no-misused-promises`, `typescript/no-misused-spread`, `typescript/no-mixed-enums`, `typescript/no-namespace`, `typescript/no-non-null-asserted-nullish-coalescing`, `typescript/no-non-null-asserted-optional-chain`, `typescript/no-non-null-assertion`, `typescript/no-redundant-type-constituents`, `typescript/no-require-imports`, `typescript/no-this-alias`, `typescript/no-unnecessary-boolean-literal-compare`, `typescript/no-unnecessary-condition`, `typescript/no-unnecessary-template-expression`, `typescript/no-unnecessary-type-arguments`, `typescript/no-unnecessary-type-assertion`, `typescript/no-unnecessary-type-constraint`, `typescript/no-unnecessary-type-conversion`, `typescript/no-unnecessary-type-parameters`, `typescript/no-unsafe-argument`, `typescript/no-unsafe-assignment`, `typescript/no-unsafe-call`, `typescript/no-unsafe-declaration-merging`, `typescript/no-unsafe-enum-comparison`, `typescript/no-unsafe-function-type`, `typescript/no-unsafe-member-access`, `typescript/no-unsafe-return`, `typescript/no-unsafe-unary-minus`, `typescript/no-useless-default-assignment`, `typescript/no-wrapper-object-types`, `typescript/only-throw-error`, `typescript/prefer-as-const`, `typescript/prefer-literal-enum-member`, `typescript/prefer-namespace-keyword`, `typescript/prefer-promise-reject-errors`, `typescript/prefer-reduce-type-parameter`, `typescript/prefer-return-this-type`, `typescript/related-getter-setter-pairs`, `typescript/require-await`, `typescript/restrict-plus-operands`, `typescript/restrict-template-expressions`, `typescript/return-await`, `typescript/triple-slash-reference`, `typescript/unbound-method`, `typescript/unified-signatures`, `typescript/use-unknown-in-catch-callback-variable`

</details>

### `@typescript-eslint/stylistic.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/stylistic.json"
```

Extracted from `@typescript-eslint/eslint-plugin@8.57.2`.

<details>
<summary>13 rules successfully migrated</summary>

`no-empty-function`, `typescript/adjacent-overload-signatures`, `typescript/array-type`, `typescript/ban-tslint-comment`, `typescript/class-literal-property-style`, `typescript/consistent-generic-constructors`, `typescript/consistent-indexed-object-style`, `typescript/consistent-type-assertions`, `typescript/consistent-type-definitions`, `typescript/no-confusing-non-null-assertion`, `typescript/no-inferrable-types`, `typescript/prefer-for-of`, `typescript/prefer-function-type`

</details>

### `@typescript-eslint/stylistic-type-checked.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/stylistic-type-checked.json"
```

Extracted from `@typescript-eslint/eslint-plugin@8.57.2`.

<details>
<summary>21 rules successfully migrated</summary>

`no-empty-function`, `typescript/adjacent-overload-signatures`, `typescript/array-type`, `typescript/ban-tslint-comment`, `typescript/class-literal-property-style`, `typescript/consistent-generic-constructors`, `typescript/consistent-indexed-object-style`, `typescript/consistent-type-assertions`, `typescript/consistent-type-definitions`, `typescript/dot-notation`, `typescript/no-confusing-non-null-assertion`, `typescript/no-inferrable-types`, `typescript/non-nullable-type-assertion-style`, `typescript/prefer-find`, `typescript/prefer-for-of`, `typescript/prefer-function-type`, `typescript/prefer-includes`, `typescript/prefer-nullish-coalescing`, `typescript/prefer-optional-chain`, `typescript/prefer-regexp-exec`, `typescript/prefer-string-starts-ends-with`

</details>

### `@typescript-eslint/all.json`

```json
"./node_modules/oxlint-config-presets/@typescript-eslint/all.json"
```

Extracted from `@typescript-eslint/eslint-plugin@8.57.2`.

<details>
<summary>125 rules successfully migrated</summary>

`class-methods-use-this`, `default-param-last`, `init-declarations`, `max-params`, `no-array-constructor`, `no-dupe-class-members`, `no-empty-function`, `no-loop-func`, `no-magic-numbers`, `no-redeclare`, `no-restricted-imports`, `no-shadow`, `no-unused-expressions`, `no-unused-private-class-members`, `no-unused-vars`, `no-use-before-define`, `no-useless-constructor`, `no-throw-literal`, `prefer-destructuring`, `prefer-promise-reject-errors`, `require-await`, `typescript/adjacent-overload-signatures`, `typescript/array-type`, `typescript/await-thenable`, `typescript/ban-ts-comment`, `typescript/ban-tslint-comment`, `typescript/class-literal-property-style`, `typescript/consistent-generic-constructors`, `typescript/consistent-indexed-object-style`, `typescript/consistent-return`, `typescript/consistent-type-assertions`, `typescript/consistent-type-definitions`, `typescript/consistent-type-exports`, `typescript/consistent-type-imports`, `typescript/dot-notation`, `typescript/explicit-function-return-type`, `typescript/explicit-module-boundary-types`, `typescript/no-array-delete`, `typescript/no-base-to-string`, `typescript/no-confusing-non-null-assertion`, `typescript/no-confusing-void-expression`, `typescript/no-deprecated`, `typescript/no-duplicate-enum-values`, `typescript/no-duplicate-type-constituents`, `typescript/no-dynamic-delete`, `typescript/no-empty-object-type`, `typescript/no-explicit-any`, `typescript/no-extra-non-null-assertion`, `typescript/no-extraneous-class`, `typescript/no-floating-promises`, `typescript/no-for-in-array`, `typescript/no-implied-eval`, `typescript/no-import-type-side-effects`, `typescript/no-inferrable-types`, `typescript/no-invalid-void-type`, `typescript/no-meaningless-void-operator`, `typescript/no-misused-new`, `typescript/no-misused-promises`, `typescript/no-misused-spread`, `typescript/no-mixed-enums`, `typescript/no-namespace`, `typescript/no-non-null-asserted-nullish-coalescing`, `typescript/no-non-null-asserted-optional-chain`, `typescript/no-non-null-assertion`, `typescript/no-redundant-type-constituents`, `typescript/no-require-imports`, `typescript/no-restricted-types`, `typescript/no-this-alias`, `typescript/no-unnecessary-boolean-literal-compare`, `typescript/no-unnecessary-condition`, `typescript/no-unnecessary-parameter-property-assignment`, `typescript/no-unnecessary-qualifier`, `typescript/no-unnecessary-template-expression`, `typescript/no-unnecessary-type-arguments`, `typescript/no-unnecessary-type-assertion`, `typescript/no-unnecessary-type-constraint`, `typescript/no-unnecessary-type-conversion`, `typescript/no-unnecessary-type-parameters`, `typescript/no-unsafe-argument`, `typescript/no-unsafe-assignment`, `typescript/no-unsafe-call`, `typescript/no-unsafe-declaration-merging`, `typescript/no-unsafe-enum-comparison`, `typescript/no-unsafe-function-type`, `typescript/no-unsafe-member-access`, `typescript/no-unsafe-return`, `typescript/no-unsafe-type-assertion`, `typescript/no-unsafe-unary-minus`, `typescript/no-useless-default-assignment`, `typescript/no-useless-empty-export`, `typescript/no-wrapper-object-types`, `typescript/non-nullable-type-assertion-style`, `typescript/only-throw-error`, `typescript/parameter-properties`, `typescript/prefer-as-const`, `typescript/prefer-enum-initializers`, `typescript/prefer-find`, `typescript/prefer-for-of`, `typescript/prefer-function-type`, `typescript/prefer-includes`, `typescript/prefer-literal-enum-member`, `typescript/prefer-namespace-keyword`, `typescript/prefer-nullish-coalescing`, `typescript/prefer-optional-chain`, `typescript/prefer-promise-reject-errors`, `typescript/prefer-readonly`, `typescript/prefer-readonly-parameter-types`, `typescript/prefer-reduce-type-parameter`, `typescript/prefer-regexp-exec`, `typescript/prefer-return-this-type`, `typescript/prefer-string-starts-ends-with`, `typescript/promise-function-async`, `typescript/related-getter-setter-pairs`, `typescript/require-array-sort-compare`, `typescript/require-await`, `typescript/restrict-plus-operands`, `typescript/restrict-template-expressions`, `typescript/return-await`, `typescript/strict-boolean-expressions`, `typescript/strict-void-return`, `typescript/switch-exhaustiveness-check`, `typescript/triple-slash-reference`, `typescript/unbound-method`, `typescript/unified-signatures`, `typescript/use-unknown-in-catch-callback-variable`

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

Extracted from `@eslint/js@10.0.1`.

<details>
<summary>62 rules successfully migrated</summary>

`constructor-super`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-empty-pattern`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-unassigned-vars`, `no-undef`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-assignment`, `no-useless-backreference`, `no-useless-catch`, `no-useless-escape`, `no-with`, `preserve-caught-error`, `require-yield`, `use-isnan`, `valid-typeof`

</details>

<details>
<summary>2 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`no-dupe-args`, `no-octal`

</details>

### `@eslint/all.json`

```json
"./node_modules/oxlint-config-presets/@eslint/all.json"
```

Extracted from `@eslint/js@10.0.1`.

<details>
<summary>174 rules successfully migrated</summary>

`accessor-pairs`, `array-callback-return`, `arrow-body-style`, `block-scoped-var`, `capitalized-comments`, `class-methods-use-this`, `complexity`, `constructor-super`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `eqeqeq`, `for-direction`, `func-names`, `func-style`, `getter-return`, `grouped-accessor-pairs`, `guard-for-in`, `id-length`, `init-declarations`, `max-classes-per-file`, `max-depth`, `max-lines`, `max-lines-per-function`, `max-nested-callbacks`, `max-params`, `max-statements`, `new-cap`, `no-alert`, `no-array-constructor`, `no-async-promise-executor`, `no-await-in-loop`, `no-bitwise`, `no-caller`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-constructor-return`, `no-continue`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-div-regex`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-duplicate-imports`, `no-else-return`, `no-empty`, `no-empty-character-class`, `no-empty-function`, `no-empty-pattern`, `no-empty-static-block`, `no-eq-null`, `no-eval`, `no-ex-assign`, `no-extend-native`, `no-extra-bind`, `no-extra-boolean-cast`, `no-extra-label`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-implicit-coercion`, `no-import-assign`, `no-inline-comments`, `no-inner-declarations`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-iterator`, `no-label-var`, `no-labels`, `no-lone-blocks`, `no-lonely-if`, `no-loop-func`, `no-loss-of-precision`, `no-magic-numbers`, `no-misleading-character-class`, `no-multi-assign`, `no-multi-str`, `no-negated-condition`, `no-nested-ternary`, `no-new`, `no-new-func`, `no-new-native-nonconstructor`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-object-constructor`, `no-param-reassign`, `no-plusplus`, `no-promise-executor-return`, `no-proto`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-restricted-exports`, `no-restricted-globals`, `no-restricted-imports`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-setter-return`, `no-shadow`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-ternary`, `no-this-before-super`, `no-throw-literal`, `no-unassigned-vars`, `no-undef`, `no-undefined`, `no-unexpected-multiline`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-expressions`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-use-before-define`, `no-useless-assignment`, `no-useless-backreference`, `no-useless-call`, `no-useless-catch`, `no-useless-computed-key`, `no-useless-concat`, `no-useless-constructor`, `no-useless-escape`, `no-useless-rename`, `no-useless-return`, `no-var`, `no-void`, `no-warning-comments`, `no-with`, `object-shorthand`, `operator-assignment`, `prefer-const`, `prefer-destructuring`, `prefer-exponentiation-operator`, `prefer-numeric-literals`, `prefer-object-has-own`, `prefer-object-spread`, `prefer-promise-reject-errors`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `preserve-caught-error`, `radix`, `require-await`, `require-yield`, `sort-keys`, `sort-vars`, `symbol-description`, `unicode-bom`, `use-isnan`, `valid-typeof`, `vars-on-top`, `yoda`, `typescript/consistent-return`, `typescript/dot-notation`

</details>

<details>
<summary>24 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`consistent-this`, `func-name-matching`, `id-denylist`, `id-match`, `logical-assignment-operators`, `no-implicit-globals`, `no-implied-eval`, `no-restricted-properties`, `no-restricted-syntax`, `no-underscore-dangle`, `no-unreachable-loop`, `one-var`, `prefer-arrow-callback`, `prefer-named-capture-group`, `prefer-regex-literals`, `require-atomic-updates`, `require-unicode-regexp`, `strict`

**Not portable to oxlint**

`camelcase`, `no-dupe-args`, `no-invalid-this`, `no-octal`, `no-octal-escape`, `no-undef-init`

</details>

### `xo.json`

```json
"./node_modules/oxlint-config-presets/xo.json"
```

Extracted from `eslint-config-xo@0.51.0`.

<details>
<summary>181 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`unicorn/better-regex`, `unicorn/expiring-todo-comments`, `unicorn/import-style`, `unicorn/isolated-functions`, `unicorn/no-unnecessary-polyfills`, `unicorn/prefer-export-from`, `unicorn/prefer-single-call`, `unicorn/prefer-switch`, `unicorn/prevent-abbreviations`, `unicorn/template-indent`, `import-x/no-useless-path-segments`, `import-x/newline-after-import`, `import-x/no-extraneous-dependencies`, `n/no-extraneous-import`, `n/no-unpublished-bin`, `n/file-extension-in-import`, `n/no-mixed-requires`, `n/process-exit-as-throw`, `n/no-deprecated-api`, `n/prefer-global/buffer`, `n/prefer-global/console`, `n/prefer-global/process`, `n/prefer-global/text-decoder`, `n/prefer-global/text-encoder`, `n/prefer-global/url-search-params`, `n/prefer-global/url`, `n/prefer-promises/dns`, `n/prefer-promises/fs`, `no-unreachable-loop`, `no-implicit-globals`, `no-implied-eval`, `prefer-regex-literals`, `require-unicode-regexp`, `func-name-matching`, `logical-assignment-operators`, `one-var`, `prefer-arrow-callback`, `@typescript-eslint/member-ordering`, `@typescript-eslint/naming-convention`, `@typescript-eslint/no-unused-private-class-members`, `@typescript-eslint/naming-convention`

**Not portable to oxlint**

`unicorn/no-for-loop`, `unicorn/no-named-default`, `import-x/order`, `no-dupe-args`, `no-octal-escape`, `no-octal`, `no-return-await`, `no-undef-init`, `no-buffer-constructor`, `camelcase`

**Require JS plugin support**

`ava/assertion-arguments`, `ava/hooks-order`, `ava/no-async-fn-without-await`, `ava/no-commented-tests`, `ava/no-conditional-assertion`, `ava/no-duplicate-hooks`, `ava/no-identical-title`, `ava/no-ignored-test-files`, `ava/no-import-test-files`, `ava/no-incorrect-deep-equal`, `ava/no-inline-assertions`, `ava/no-invalid-modifier-chain`, `ava/no-negated-assertion`, `ava/no-nested-assertions`, `ava/no-nested-tests`, `ava/no-only-test`, `ava/no-skip-assert`, `ava/no-skip-test`, `ava/no-todo-implementation`, `ava/no-todo-test`, `ava/no-useless-t-pass`, `ava/prefer-async-await`, `ava/prefer-t-regex`, `ava/prefer-t-throws`, `ava/require-assertion`, `ava/test-title`, `ava/use-t`, `ava/use-t-throws-async-well`, `ava/use-t-well`, `ava/use-test`, `ava/use-true-false`, `ava/no-ava-in-dependencies`, `no-use-extend-native/no-use-extend-native`, `@eslint-community/eslint-comments/disable-enable-pair`, `@eslint-community/eslint-comments/no-aggregating-enable`, `@eslint-community/eslint-comments/no-duplicate-disable`, `@eslint-community/eslint-comments/no-unused-disable`, `@eslint-community/eslint-comments/no-unused-enable`, `@stylistic/comma-dangle`, `@stylistic/no-extra-semi`, `@stylistic/curly-newline`, `@stylistic/dot-location`, `@stylistic/no-floating-decimal`, `@stylistic/no-multi-spaces`, `@stylistic/wrap-iife`, `@stylistic/array-bracket-newline`, `@stylistic/array-bracket-spacing`, `@stylistic/array-element-newline`, `@stylistic/brace-style`, `@stylistic/comma-spacing`, `@stylistic/comma-style`, `@stylistic/computed-property-spacing`, `@stylistic/eol-last`, `@stylistic/function-call-spacing`, `@stylistic/function-paren-newline`, `@stylistic/function-call-argument-newline`, `@stylistic/indent`, `@stylistic/jsx-quotes`, `@stylistic/key-spacing`, `@stylistic/keyword-spacing`, `@stylistic/linebreak-style`, `@stylistic/lines-between-class-members`, `@stylistic/max-len`, `@stylistic/max-statements-per-line`, `@stylistic/multiline-ternary`, `@stylistic/new-parens`, `@stylistic/no-mixed-operators`, `@stylistic/no-mixed-spaces-and-tabs`, `@stylistic/no-multiple-empty-lines`, `@stylistic/no-whitespace-before-property`, `@stylistic/no-trailing-spaces`, `@stylistic/object-curly-spacing`, `@stylistic/object-curly-newline`, `@stylistic/one-var-declaration-per-line`, `@stylistic/operator-linebreak`, `@stylistic/padded-blocks`, `@stylistic/padding-line-between-statements`, `@stylistic/quote-props`, `@stylistic/quotes`, `@stylistic/semi-spacing`, `@stylistic/semi-style`, `@stylistic/semi`, `@stylistic/space-before-blocks`, `@stylistic/space-before-function-paren`, `@stylistic/space-in-parens`, `@stylistic/space-infix-ops`, `@stylistic/space-unary-ops`, `@stylistic/spaced-comment`, `@stylistic/switch-colon-spacing`, `@stylistic/template-tag-spacing`, `@stylistic/arrow-parens`, `@stylistic/arrow-spacing`, `@stylistic/block-spacing`, `@stylistic/generator-star-spacing`, `@stylistic/rest-spread-spacing`, `@stylistic/template-curly-spacing`, `@stylistic/yield-star-spacing`, `@stylistic/indent-binary-ops`, `json/no-duplicate-keys`, `json/no-empty-keys`, `json/no-unsafe-values`, `json/no-unnormalized-keys`, `json/no-duplicate-keys`, `json/no-empty-keys`, `json/no-unsafe-values`, `json/no-unnormalized-keys`, `json/no-duplicate-keys`, `json/no-empty-keys`, `json/no-unsafe-values`, `json/no-unnormalized-keys`, `@stylistic/brace-style`, `@stylistic/comma-dangle`, `@stylistic/comma-spacing`, `@stylistic/function-call-spacing`, `@stylistic/indent`, `@stylistic/keyword-spacing`, `@stylistic/lines-between-class-members`, `@stylistic/member-delimiter-style`, `@stylistic/no-extra-semi`, `@stylistic/object-curly-spacing`, `@stylistic/padding-line-between-statements`, `@stylistic/quotes`, `@stylistic/space-before-function-paren`, `@stylistic/space-infix-ops`, `@stylistic/semi`, `@stylistic/space-before-blocks`, `@stylistic/type-annotation-spacing`, `@stylistic/type-generic-spacing`, `@stylistic/type-named-tuple-spacing`, `@stylistic/indent-binary-ops`

</details>

> Settings found under a 'files' pattern — oxlint does not support settings in overrides and they will be skipped:
> `import-x/extensions`
> `import-x/core-modules`
> `import-x/parsers`
> `import-x/external-module-folders`
> `import-x/resolver`

### `problems.json`

```json
"./node_modules/oxlint-config-presets/problems.json"
```

Extracted from `eslint-config-problems@9.0.0`.

<details>
<summary>107 rules successfully migrated</summary>

`constructor-super`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-empty-pattern`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-undef`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-backreference`, `no-useless-catch`, `no-useless-escape`, `no-with`, `require-yield`, `use-isnan`, `valid-typeof`, `no-console`, `no-alert`, `array-callback-return`, `no-constructor-return`, `no-duplicate-imports`, `no-promise-executor-return`, `no-self-compare`, `no-unmodified-loop-condition`, `no-use-before-define`, `no-useless-assignment`, `accessor-pairs`, `eqeqeq`, `no-array-constructor`, `no-caller`, `no-else-return`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-lonely-if`, `no-loop-func`, `no-multi-str`, `no-new-func`, `no-new-wrappers`, `no-object-constructor`, `no-proto`, `no-script-url`, `no-sequences`, `no-unneeded-ternary`, `no-useless-call`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-rename`, `no-useless-return`, `no-var`, `object-shorthand`, `prefer-const`, `prefer-destructuring`, `prefer-exponentiation-operator`, `prefer-numeric-literals`, `prefer-object-spread`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `yoda`, `typescript/dot-notation`

</details>

<details>
<summary>10 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-unreachable-loop`, `require-atomic-updates`, `no-implied-eval`, `prefer-arrow-callback`, `prefer-regex-literals`, `strict`

**Not portable to oxlint**

`no-dupe-args`, `no-octal`, `no-octal-escape`, `no-undef-init`

</details>

### `hardcore.json`

```json
"./node_modules/oxlint-config-presets/hardcore.json"
```

Extracted from `eslint-config-hardcore@49.0.0`.

<details>
<summary>289 rules successfully migrated</summary>

`no-alert`, `no-array-constructor`, `no-bitwise`, `no-caller`, `no-case-declarations`, `no-class-assign`, `no-console`, `no-const-assign`, `no-constant-condition`, `no-continue`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-pattern`, `no-eq-null`, `no-eval`, `no-ex-assign`, `no-extend-native`, `no-extra-bind`, `no-fallthrough`, `no-func-assign`, `no-inner-declarations`, `no-invalid-regexp`, `no-iterator`, `no-label-var`, `no-labels`, `no-lone-blocks`, `no-lonely-if`, `no-loop-func`, `no-multi-str`, `no-global-assign`, `no-nested-ternary`, `no-new`, `no-new-func`, `no-object-constructor`, `no-new-wrappers`, `no-obj-calls`, `no-plusplus`, `no-proto`, `no-regex-spaces`, `no-script-url`, `no-self-compare`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-throw-literal`, `no-unreachable`, `no-use-before-define`, `no-useless-call`, `no-useless-concat`, `no-void`, `no-var`, `no-warning-comments`, `no-with`, `block-scoped-var`, `constructor-super`, `default-case`, `eqeqeq`, `guard-for-in`, `id-length`, `max-depth`, `max-nested-callbacks`, `max-params`, `max-statements`, `new-cap`, `object-shorthand`, `operator-assignment`, `prefer-const`, `prefer-spread`, `prefer-template`, `radix`, `require-yield`, `yoda`, `no-empty-function`, `no-new-native-nonconstructor`, `no-unmodified-loop-condition`, `prefer-rest-params`, `no-extra-label`, `no-unused-labels`, `no-useless-constructor`, `no-useless-escape`, `no-duplicate-imports`, `no-unsafe-finally`, `no-useless-computed-key`, `no-useless-rename`, `max-lines`, `no-template-curly-in-string`, `symbol-description`, `prefer-numeric-literals`, `no-useless-return`, `require-await`, `no-await-in-loop`, `no-multi-assign`, `prefer-promise-reject-errors`, `no-compare-neg-zero`, `for-direction`, `getter-return`, `max-classes-per-file`, `no-misleading-character-class`, `no-async-promise-executor`, `no-useless-catch`, `no-redeclare`, `no-prototype-builtins`, `no-import-assign`, `default-param-last`, `no-constructor-return`, `no-dupe-else-if`, `no-setter-return`, `prefer-exponentiation-operator`, `prefer-object-spread`, `accessor-pairs`, `default-case-last`, `no-useless-backreference`, `no-loss-of-precision`, `no-promise-executor-return`, `no-nonoctal-decimal-escape`, `init-declarations`, `no-unused-private-class-members`, `no-constant-binary-expression`, `no-empty-static-block`, `no-magic-numbers`, `complexity`, `func-names`, `func-style`, `no-else-return`, `no-cond-assign`, `valid-typeof`, `no-return-assign`, `no-self-assign`, `no-shadow`, `no-undef`, `no-unneeded-ternary`, `use-isnan`, `no-param-reassign`, `no-unsafe-negation`, `grouped-accessor-pairs`, `array-callback-return`, `no-extra-boolean-cast`, `no-unsafe-optional-chaining`, `no-unused-expressions`, `no-sequences`, `no-implicit-coercion`, `prefer-destructuring`, `no-restricted-globals`, `promise/param-names`, `promise/always-return`, `promise/no-return-wrap`, `promise/no-nesting`, `promise/no-promise-in-callback`, `promise/avoid-new`, `promise/no-callback-in-promise`, `promise/no-return-in-finally`, `promise/valid-params`, `promise/no-new-statics`, `promise/no-multiple-resolved`, `promise/spec-only`, `promise/prefer-catch`, `promise/catch-or-return`, `promise/prefer-await-to-then`, `import/default`, `import/namespace`, `import/no-absolute-path`, `import/no-webpack-loader-syntax`, `import/no-self-import`, `import/export`, `import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-mutable-exports`, `import/unambiguous`, `import/no-amd`, `import/first`, `import/exports-last`, `import/no-namespace`, `import/max-dependencies`, `import/no-named-default`, `import/no-commonjs`, `import/no-empty-named-blocks`, `import/extensions`, `import/no-dynamic-require`, `import/no-anonymous-default-export`, `import/no-duplicates`, `unicorn/custom-error-definition`, `unicorn/error-message`, `unicorn/escape-case`, `unicorn/new-for-builtins`, `unicorn/no-abusive-eslint-disable`, `unicorn/no-instanceof-array`, `unicorn/no-console-spaces`, `unicorn/no-hex-escape`, `unicorn/no-new-buffer`, `unicorn/no-unreadable-array-destructuring`, `unicorn/no-zero-fractions`, `unicorn/prefer-add-event-listener`, `unicorn/prefer-keyboard-event-key`, `unicorn/prefer-array-flat-map`, `unicorn/prefer-includes`, `unicorn/prefer-dom-node-append`, `unicorn/prefer-dom-node-remove`, `unicorn/prefer-query-selector`, `unicorn/prefer-string-starts-ends-with`, `unicorn/prefer-dom-node-text-content`, `unicorn/prefer-type-error`, `unicorn/throw-new-error`, `unicorn/consistent-function-scoping`, `unicorn/prefer-reflect-apply`, `unicorn/prefer-dom-node-dataset`, `unicorn/prefer-string-slice`, `unicorn/prefer-negative-index`, `unicorn/prefer-string-trim-start-end`, `unicorn/prefer-modern-dom-apis`, `unicorn/prefer-string-replace-all`, `unicorn/prefer-number-properties`, `unicorn/no-null`, `unicorn/prefer-optional-catch-binding`, `unicorn/no-object-as-default-parameter`, `unicorn/explicit-length-check`, `unicorn/prefer-math-trunc`, `unicorn/prefer-ternary`, `unicorn/numeric-separators-style`, `unicorn/catch-error-name`, `unicorn/no-lonely-if`, `unicorn/prefer-date-now`, `unicorn/prefer-array-some`, `unicorn/prefer-default-parameters`, `unicorn/no-new-array`, `unicorn/prefer-array-index-of`, `unicorn/prefer-regexp-test`, `unicorn/no-this-assignment`, `unicorn/no-static-only-class`, `unicorn/prefer-array-flat`, `unicorn/prefer-node-protocol`, `unicorn/prefer-module`, `unicorn/no-document-cookie`, `unicorn/require-array-join-separator`, `unicorn/require-number-to-fixed-digits-argument`, `unicorn/no-array-method-this-argument`, `unicorn/prefer-prototype-methods`, `unicorn/no-useless-length-check`, `unicorn/no-useless-spread`, `unicorn/no-useless-fallback-in-spread`, `unicorn/no-invalid-remove-event-listener`, `unicorn/no-empty-file`, `unicorn/prefer-code-point`, `unicorn/no-await-expression-member`, `unicorn/no-thenable`, `unicorn/no-useless-promise-resolve-reject`, `unicorn/relative-url-style`, `unicorn/text-encoding-identifier-case`, `unicorn/no-useless-switch-case`, `unicorn/prefer-modern-math-apis`, `unicorn/no-unreadable-iife`, `unicorn/prefer-native-coercion-functions`, `unicorn/prefer-top-level-await`, `unicorn/prefer-logical-operator-over-ternary`, `unicorn/prefer-event-target`, `unicorn/no-unnecessary-await`, `unicorn/switch-case-braces`, `unicorn/no-typeof-undefined`, `unicorn/prefer-set-size`, `unicorn/no-negated-condition`, `unicorn/prefer-at`, `unicorn/prefer-blob-reading-methods`, `unicorn/no-single-promise-in-promise-methods`, `unicorn/no-await-in-promise-methods`, `unicorn/no-anonymous-default-export`, `unicorn/consistent-empty-array-spread`, `unicorn/prefer-string-raw`, `unicorn/no-invalid-fetch-options`, `unicorn/no-magic-array-flat-depth`, `unicorn/prefer-structured-clone`, `unicorn/prefer-array-find`, `unicorn/no-negation-in-equality-check`, `unicorn/prefer-global-this`, `unicorn/prefer-math-min-max`, `unicorn/consistent-existence-index-check`, `unicorn/filename-case`, `unicorn/prefer-object-from-entries`, `curly`, `no-unexpected-multiline`, `unicorn/empty-brace-spaces`, `unicorn/no-nested-ternary`, `unicorn/number-literal-case`, `arrow-body-style`, `typescript/dot-notation`, `typescript/consistent-return`

</details>

<details>
<summary>3 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`import/named`, `import/no-cycle`, `no-irregular-whitespace`

</details>

<details>
<summary>368 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-implied-eval`, `consistent-this`, `strict`, `require-atomic-updates`, `prefer-named-capture-group`, `no-unreachable-loop`, `one-var`, `no-underscore-dangle`, `func-name-matching`, `no-implicit-globals`, `prefer-regex-literals`, `logical-assignment-operators`, `import/no-relative-packages`, `import/no-import-module-exports`, `import/no-useless-path-segments`, `import/no-unused-modules`, `import/no-extraneous-dependencies`, `import/newline-after-import`, `unicorn/no-unused-properties`, `unicorn/consistent-destructuring`, `unicorn/prefer-switch`, `unicorn/no-unnecessary-polyfills`, `unicorn/import-index`, `unicorn/prevent-abbreviations`, `unicorn/prefer-export-from`

**Not portable to oxlint**

`no-dupe-args`, `no-invalid-this`, `no-octal`, `no-octal-escape`, `no-undef-init`, `camelcase`, `no-buffer-constructor`, `multiline-comment-style`, `import/no-deprecated`, `import/no-unresolved`, `import/enforce-node-protocol-usage`, `unicorn/no-for-loop`, `unicorn/no-array-push-push`, `import/order`

**Require JS plugin support**

`security/detect-buffer-noassert`, `security/detect-child-process`, `security/detect-disable-mustache-escape`, `security/detect-eval-with-expression`, `security/detect-new-buffer`, `security/detect-no-csrf-before-method-override`, `security/detect-non-literal-regexp`, `security/detect-non-literal-require`, `security/detect-possible-timing-attacks`, `security/detect-pseudoRandomBytes`, `security/detect-unsafe-regex`, `security/detect-bidi-characters`, `array-func/from-map`, `array-func/prefer-array-from`, `array-func/avoid-reverse`, `sonarjs/no-all-duplicated-branches`, `sonarjs/no-element-overwrite`, `sonarjs/no-extra-arguments`, `sonarjs/no-identical-conditions`, `sonarjs/no-identical-expressions`, `sonarjs/no-one-iteration-loop`, `sonarjs/no-use-of-empty-return-value`, `sonarjs/max-switch-cases`, `sonarjs/no-collapsible-if`, `sonarjs/no-duplicated-branches`, `sonarjs/no-identical-functions`, `sonarjs/no-inverted-boolean-check`, `sonarjs/no-redundant-boolean`, `sonarjs/no-small-switch`, `sonarjs/no-useless-catch`, `sonarjs/prefer-immediate-return`, `sonarjs/prefer-object-literal`, `sonarjs/prefer-single-boolean-return`, `sonarjs/prefer-while`, `sonarjs/no-collection-size-mischeck`, `sonarjs/no-unused-collection`, `sonarjs/no-redundant-jump`, `sonarjs/no-same-line-conditional`, `sonarjs/no-ignored-return`, `sonarjs/elseif-without-else`, `sonarjs/no-gratuitous-expressions`, `sonarjs/no-nested-switch`, `sonarjs/no-empty-collection`, `sonarjs/non-existent-operator`, `sonarjs/no-nested-template-literals`, `sonarjs/cognitive-complexity`, `eslint-comments/no-duplicate-disable`, `eslint-comments/no-unlimited-disable`, `eslint-comments/no-unused-disable`, `eslint-comments/no-unused-enable`, `eslint-comments/disable-enable-pair`, `eslint-comments/no-use`, `no-use-extend-native/no-use-extend-native`, `no-constructor-bind/no-constructor-bind`, `ext/lines-between-object-properties`, `regexp/match-any`, `regexp/no-empty-capturing-group`, `regexp/no-dupe-characters-character-class`, `regexp/no-empty-group`, `regexp/no-empty-lookarounds-assertion`, `regexp/no-escape-backspace`, `regexp/no-invisible-character`, `regexp/no-octal`, `regexp/no-useless-two-nums-quantifier`, `regexp/prefer-d`, `regexp/prefer-plus-quantifier`, `regexp/prefer-question-quantifier`, `regexp/prefer-star-quantifier`, `regexp/prefer-w`, `regexp/prefer-quantifier`, `regexp/no-useless-character-class`, `regexp/no-useless-lazy`, `regexp/prefer-regexp-exec`, `regexp/prefer-regexp-test`, `regexp/prefer-unicode-codepoint-escapes`, `regexp/no-useless-range`, `regexp/prefer-range`, `regexp/prefer-character-class`, `regexp/no-useless-non-capturing-group`, `regexp/no-useless-escape`, `regexp/negation`, `regexp/no-legacy-features`, `regexp/no-useless-dollar-replacements`, `regexp/prefer-escape-replacement-dollar-char`, `regexp/no-unused-capturing-group`, `regexp/confusing-quantifier`, `regexp/no-empty-alternative`, `regexp/no-lazy-ends`, `regexp/optimal-lookaround-quantifier`, `regexp/no-trivially-nested-assertion`, `regexp/no-potentially-useless-backreference`, `regexp/no-obscure-range`, `regexp/no-optional-assertion`, `regexp/no-useless-assertions`, `regexp/prefer-named-backreference`, `regexp/no-useless-flag`, `regexp/no-trivially-nested-quantifier`, `regexp/sort-flags`, `regexp/no-non-standard-flag`, `regexp/control-character-escape`, `regexp/prefer-predefined-assertion`, `regexp/no-standalone-backslash`, `regexp/no-useless-quantifier`, `regexp/no-zero-quantifier`, `regexp/no-dupe-disjunctions`, `regexp/optimal-quantifier-concatenation`, `regexp/strict`, `regexp/sort-alternatives`, `regexp/no-super-linear-backtracking`, `regexp/no-super-linear-move`, `regexp/no-invalid-regexp`, `regexp/no-contradiction-with-assertion`, `regexp/prefer-lookaround`, `regexp/no-empty-character-class`, `regexp/prefer-named-capture-group`, `regexp/require-unicode-regexp`, `regexp/no-misleading-unicode-character`, `regexp/no-control-character`, `regexp/use-ignore-case`, `regexp/prefer-named-replacement`, `regexp/prefer-result-array-groups`, `regexp/no-missing-g-flag`, `regexp/no-extra-lookaround-assertions`, `regexp/no-misleading-capturing-group`, `regexp/simplify-set-operations`, `regexp/no-useless-string-literal`, `regexp/no-empty-string-literal`, `regexp/no-useless-set-operand`, `regexp/prefer-set-operation`, `regexp/grapheme-string-literal`, `regexp/require-unicode-sets-regexp`, `regexp/letter-case`, `regexp/hexadecimal-escape`, `regexp/unicode-escape`, `regexp/unicode-property`, `@microsoft/sdl/no-cookies`, `@microsoft/sdl/no-document-domain`, `@microsoft/sdl/no-html-method`, `@microsoft/sdl/no-insecure-url`, `@microsoft/sdl/no-postmessage-star-origin`, `no-unsanitized/method`, `no-unsanitized/property`, `unused-imports/no-unused-imports`, `unused-imports/no-unused-vars`, `sonarjs/anchor-precedence`, `sonarjs/argument-type`, `sonarjs/arguments-order`, `sonarjs/bool-param-default`, `sonarjs/class-prototype`, `sonarjs/comma-or-logical-or-case`, `sonarjs/concise-regex`, `sonarjs/cookies`, `sonarjs/disabled-auto-escaping`, `sonarjs/disabled-resource-integrity`, `sonarjs/empty-string-repetition`, `sonarjs/function-return-type`, `sonarjs/in-operator-type-error`, `sonarjs/link-with-target-blank`, `sonarjs/misplaced-loop-counter`, `sonarjs/no-alphabetical-sort`, `sonarjs/no-angular-bypass-sanitization`, `sonarjs/no-array-delete`, `sonarjs/no-associative-arrays`, `sonarjs/no-clear-text-protocols`, `sonarjs/no-dead-store`, `sonarjs/no-empty-after-reluctant`, `sonarjs/no-equals-in-for-termination`, `sonarjs/no-for-in-iterable`, `sonarjs/no-hardcoded-ip`, `sonarjs/no-in-misuse`, `sonarjs/no-incorrect-string-concat`, `sonarjs/no-invariant-returns`, `sonarjs/no-misleading-array-reverse`, `sonarjs/no-redundant-assignments`, `sonarjs/no-try-promise`, `sonarjs/no-undefined-argument`, `sonarjs/no-useless-intersection`, `sonarjs/no-wildcard-import`, `sonarjs/non-number-in-arithmetic-expression`, `sonarjs/null-dereference`, `sonarjs/operation-returning-nan`, `sonarjs/post-message`, `sonarjs/prefer-promise-shorthand`, `sonarjs/prefer-type-guard`, `sonarjs/redundant-type-aliases`, `sonarjs/stateful-regex`, `sonarjs/strings-comparison`, `sonarjs/unused-named-groups`, `sonarjs/values-not-convertible-to-numbers`, `sonarjs/xpath`, `sonarjs/no-async-constructor`, `sonarjs/no-hardcoded-passwords`, `sonarjs/no-hardcoded-secrets`, `sonarjs/no-internal-api-use`, `sonarjs/no-literal-call`, `sonarjs/no-sonar-comments`, `sonarjs/object-alt-content`, `sonarjs/table-header`, `simple-import-sort/imports`, `simple-import-sort/exports`, `perfectionist/sort-array-includes`, `perfectionist/sort-enums`, `perfectionist/sort-interfaces`, `perfectionist/sort-jsx-props`, `perfectionist/sort-maps`, `perfectionist/sort-object-types`, `perfectionist/sort-objects`, `perfectionist/sort-switch-case`, `perfectionist/sort-sets`, `perfectionist/sort-decorators`, `perfectionist/sort-heritage-clauses`, `perfectionist/sort-modules`, `compat/compat`, `@html-eslint/require-doctype`, `@html-eslint/no-duplicate-id`, `@html-eslint/no-inline-styles`, `@html-eslint/require-li-container`, `@html-eslint/no-obsolete-tags`, `@html-eslint/require-lang`, `@html-eslint/require-title`, `@html-eslint/no-multiple-h1`, `@html-eslint/require-meta-description`, `@html-eslint/require-img-alt`, `@html-eslint/no-skip-heading-levels`, `@html-eslint/require-frame-title`, `@html-eslint/no-non-scalable-viewport`, `@html-eslint/no-positive-tabindex`, `@html-eslint/require-meta-viewport`, `@html-eslint/no-duplicate-attrs`, `@html-eslint/no-target-blank`, `@html-eslint/require-button-type`, `@html-eslint/no-abstract-roles`, `@html-eslint/no-aria-hidden-body`, `@html-eslint/no-accesskey-attrs`, `@html-eslint/prefer-https`, `@html-eslint/require-input-label`, `@html-eslint/require-form-method`, `@html-eslint/no-heading-inside-button`, `@html-eslint/no-invalid-role`, `@html-eslint/no-nested-interactive`, `@html-eslint/require-explicit-size`, `@html-eslint/no-duplicate-class`, `@html-eslint/no-aria-hidden-on-focusable`, `@html-eslint/no-empty-headings`, `@html-eslint/no-invalid-entity`, `@html-eslint/no-duplicate-in-head`, `@html-eslint/sort-attrs`, `@stylistic/lines-between-class-members`, `@stylistic/spaced-comment`, `@stylistic/padding-line-between-statements`, `putout/putout`, `no-only-tests/no-only-tests`, `sonarjs/stable-tests`, `@html-eslint/require-doctype`, `@html-eslint/no-duplicate-id`, `@html-eslint/no-inline-styles`, `@html-eslint/require-li-container`, `@html-eslint/no-obsolete-tags`, `@html-eslint/require-lang`, `@html-eslint/require-title`, `@html-eslint/no-multiple-h1`, `@html-eslint/require-meta-description`, `@html-eslint/require-img-alt`, `@html-eslint/no-skip-heading-levels`, `@html-eslint/require-frame-title`, `@html-eslint/no-non-scalable-viewport`, `@html-eslint/no-positive-tabindex`, `@html-eslint/require-meta-viewport`, `@html-eslint/no-duplicate-attrs`, `@html-eslint/no-target-blank`, `@html-eslint/require-button-type`, `@html-eslint/no-abstract-roles`, `@html-eslint/no-aria-hidden-body`, `@html-eslint/no-accesskey-attrs`, `@html-eslint/prefer-https`, `@html-eslint/require-input-label`, `@html-eslint/require-form-method`, `@html-eslint/no-heading-inside-button`, `@html-eslint/no-invalid-role`, `@html-eslint/no-nested-interactive`, `@html-eslint/require-explicit-size`, `@html-eslint/sort-attrs`, `json/*`, `yml/block-mapping-question-indicator-newline`, `yml/block-mapping`, `yml/block-sequence-hyphen-indicator-newline`, `yml/block-sequence`, `yml/flow-mapping-curly-newline`, `yml/flow-mapping-curly-spacing`, `yml/flow-sequence-bracket-newline`, `yml/flow-sequence-bracket-spacing`, `yml/indent`, `yml/key-spacing`, `yml/no-empty-document`, `yml/no-empty-key`, `yml/no-empty-mapping-value`, `yml/no-empty-sequence-entry`, `yml/no-irregular-whitespace`, `yml/no-tab-indent`, `yml/plain-scalar`, `yml/quotes`, `yml/spaced-comment`, `yml/vue-custom-block/no-parsing-error`, `yml/require-string-key`, `yml/no-multiple-empty-lines`, `toml/array-bracket-newline`, `toml/array-bracket-spacing`, `toml/array-element-newline`, `toml/comma-style`, `toml/indent`, `toml/inline-table-curly-spacing`, `toml/key-spacing`, `toml/keys-order`, `toml/no-space-dots`, `toml/no-unreadable-number-separator`, `toml/padding-line-between-pairs`, `toml/padding-line-between-tables`, `toml/precision-of-fractional-seconds`, `toml/precision-of-integer`, `toml/quoted-keys`, `toml/spaced-comment`, `toml/table-bracket-spacing`, `toml/tables-order`, `toml/vue-custom-block/no-parsing-error`, `toml/no-non-decimal-integer`, `@stylistic/no-tabs`, `@stylistic/max-len`, `@stylistic/quotes`, `@stylistic/lines-around-comment`

</details>

> `perfectionist`
> `import/docstyle`
> special parser detected: @html-eslint/parser
> special parser detected: yaml-eslint-parser
> special parser detected: toml-eslint-parser

### `wikimedia.json`

```json
"./node_modules/oxlint-config-presets/wikimedia.json"
```

Extracted from `eslint-config-wikimedia@0.32.3`.

<details>
<summary>118 rules successfully migrated</summary>

`constructor-super`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-empty-pattern`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-misleading-character-class`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-unassigned-vars`, `no-undef`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-assignment`, `no-useless-backreference`, `no-useless-catch`, `no-useless-escape`, `no-with`, `preserve-caught-error`, `require-yield`, `use-isnan`, `valid-typeof`, `jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`, `array-callback-return`, `block-scoped-var`, `curly`, `eqeqeq`, `new-cap`, `no-array-constructor`, `no-bitwise`, `no-caller`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-extra-label`, `no-implicit-coercion`, `no-label-var`, `no-loop-func`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-proto`, `no-return-assign`, `no-script-url`, `no-self-compare`, `no-sequences`, `no-shadow`, `no-throw-literal`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unused-expressions`, `no-useless-call`, `no-useless-concat`, `no-void`, `prefer-numeric-literals`, `unicode-bom`, `yoda`, `unicorn/prefer-date-now`, `unicorn/prefer-string-slice`, `unicorn/throw-new-error`, `typescript/dot-notation`

</details>

<details>
<summary>1 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`no-use-before-define`

</details>

<details>
<summary>113 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/no-undefined-types`, `jsdoc/require-returns-check`, `jsdoc/require-throws-type`, `jsdoc/require-yields-check`, `jsdoc/tag-lines`, `jsdoc/valid-types`, `jsdoc/check-param-names`, `jsdoc/no-blank-blocks`, `jsdoc/no-blank-block-descriptions`, `jsdoc/no-multi-asterisks`, `jsdoc/require-asterisk-prefix`, `jsdoc/tag-lines`, `no-implicit-globals`, `no-underscore-dangle`, `no-unreachable-loop`, `prefer-regex-literals`, `@typescript-eslint/explicit-member-accessibility`

**Not portable to oxlint**

`no-dupe-args`, `no-octal`, `array-bracket-spacing`, `block-spacing`, `brace-style`, `camelcase`, `comma-dangle`, `comma-spacing`, `comma-style`, `computed-property-spacing`, `dot-location`, `eol-last`, `func-call-spacing`, `indent`, `key-spacing`, `keyword-spacing`, `linebreak-style`, `max-len`, `max-statements-per-line`, `new-parens`, `no-floating-decimal`, `no-multi-spaces`, `no-multiple-empty-lines`, `no-new-object`, `no-octal-escape`, `no-tabs`, `no-trailing-spaces`, `no-undef-init`, `no-whitespace-before-property`, `object-curly-spacing`, `operator-linebreak`, `quote-props`, `quotes`, `semi`, `semi-spacing`, `semi-style`, `space-before-blocks`, `space-before-function-paren`, `space-in-parens`, `space-infix-ops`, `space-unary-ops`, `spaced-comment`, `switch-colon-spacing`, `wrap-iife`, `comma-dangle`, `no-extra-parens`, `quotes`, `quote-props`, `indent`, `comma-dangle`

**Require JS plugin support**

`security/detect-buffer-noassert`, `security/detect-child-process`, `security/detect-disable-mustache-escape`, `security/detect-eval-with-expression`, `security/detect-new-buffer`, `security/detect-no-csrf-before-method-override`, `security/detect-non-literal-fs-filename`, `security/detect-non-literal-regexp`, `security/detect-non-literal-require`, `security/detect-object-injection`, `security/detect-possible-timing-attacks`, `security/detect-pseudoRandomBytes`, `security/detect-unsafe-regex`, `security/detect-bidi-characters`, `json-es/use-valid-json`, `yml/block-mapping-question-indicator-newline`, `yml/block-mapping`, `yml/block-sequence-hyphen-indicator-newline`, `yml/block-sequence`, `yml/flow-mapping-curly-newline`, `yml/flow-mapping-curly-spacing`, `yml/flow-sequence-bracket-newline`, `yml/flow-sequence-bracket-spacing`, `yml/indent`, `yml/key-spacing`, `yml/no-empty-document`, `yml/no-empty-key`, `yml/no-empty-mapping-value`, `yml/no-empty-sequence-entry`, `yml/no-irregular-whitespace`, `yml/no-tab-indent`, `yml/plain-scalar`, `yml/quotes`, `yml/spaced-comment`, `yml/vue-custom-block/no-parsing-error`, `yml/flow-sequence-bracket-spacing`, `yml/flow-mapping-curly-spacing`, `@stylistic/indent`, `@stylistic/member-delimiter-style`, `@stylistic/type-annotation-spacing`, `@stylistic/semi`

</details>

> `es-x`
> special parser detected: yaml-eslint-parser

### `eslint.json`

```json
"./node_modules/oxlint-config-presets/eslint.json"
```

Extracted from `eslint-config-eslint@14.0.0`.

<details>
<summary>160 rules successfully migrated</summary>

`unicorn/prefer-array-find`, `unicorn/prefer-array-flat-map`, `unicorn/prefer-array-flat`, `unicorn/prefer-array-index-of`, `unicorn/prefer-array-some`, `unicorn/prefer-at`, `unicorn/prefer-includes`, `unicorn/prefer-set-has`, `unicorn/prefer-string-slice`, `unicorn/prefer-string-starts-ends-with`, `unicorn/prefer-string-trim-start-end`, `jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`, `no-control-regex`, `no-misleading-character-class`, `no-regex-spaces`, `no-invalid-regexp`, `no-useless-backreference`, `no-empty-character-class`, `constructor-super`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-pattern`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-prototype-builtins`, `no-redeclare`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-unassigned-vars`, `no-undef`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-assignment`, `no-useless-catch`, `no-useless-escape`, `no-with`, `preserve-caught-error`, `require-yield`, `use-isnan`, `valid-typeof`, `array-callback-return`, `arrow-body-style`, `class-methods-use-this`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `eqeqeq`, `func-style`, `grouped-accessor-pairs`, `guard-for-in`, `new-cap`, `no-alert`, `no-array-constructor`, `no-caller`, `no-console`, `no-constructor-return`, `no-else-return`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-inner-declarations`, `no-iterator`, `no-label-var`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-multi-str`, `no-nested-ternary`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-object-constructor`, `no-param-reassign`, `no-proto`, `no-return-assign`, `no-script-url`, `no-self-compare`, `no-sequences`, `no-shadow`, `no-throw-literal`, `no-undefined`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unused-expressions`, `no-use-before-define`, `no-useless-call`, `no-useless-computed-key`, `no-useless-concat`, `no-useless-constructor`, `no-useless-rename`, `no-useless-return`, `no-var`, `object-shorthand`, `operator-assignment`, `prefer-const`, `prefer-exponentiation-operator`, `prefer-numeric-literals`, `prefer-object-has-own`, `prefer-promise-reject-errors`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `radix`, `symbol-description`, `unicode-bom`, `yoda`, `typescript/consistent-return`, `typescript/dot-notation`

</details>

<details>
<summary>145 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/require-jsdoc`, `jsdoc/require-returns-check`, `jsdoc/require-yields-check`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`, `jsdoc/check-syntax`, `jsdoc/check-values`, `jsdoc/no-bad-blocks`, `jsdoc/require-asterisk-prefix`, `jsdoc/require-description`, `jsdoc/require-hyphen-before-param-description`, `jsdoc/require-throws`, `jsdoc/tag-lines`, `jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/require-jsdoc`, `jsdoc/require-returns-check`, `jsdoc/require-yields-check`, `jsdoc/valid-types`, `prefer-regex-literals`, `no-implied-eval`, `no-restricted-properties`, `no-underscore-dangle`, `no-unreachable-loop`, `prefer-arrow-callback`, `prefer-regex-literals`, `require-unicode-regexp`, `strict`, `n/no-deprecated-api`, `n/no-extraneous-import`, `n/no-extraneous-require`, `n/no-missing-import`, `n/no-missing-require`, `n/no-process-exit`, `n/no-unpublished-bin`, `n/no-unpublished-import`, `n/no-unpublished-require`, `n/no-unsupported-features/es-builtins`, `n/no-unsupported-features/es-syntax`, `n/no-unsupported-features/node-builtins`, `n/process-exit-as-throw`, `n/hashbang`, `n/callback-return`, `n/prefer-node-protocol`, `n/no-deprecated-api`, `n/no-extraneous-import`, `n/no-extraneous-require`, `n/no-missing-import`, `n/no-missing-require`, `n/no-process-exit`, `n/no-unpublished-bin`, `n/no-unpublished-import`, `n/no-unpublished-require`, `n/no-unsupported-features/es-builtins`, `n/no-unsupported-features/es-syntax`, `n/no-unsupported-features/node-builtins`, `n/process-exit-as-throw`, `n/hashbang`, `n/callback-return`, `n/prefer-node-protocol`, `n/no-mixed-requires`

**Not portable to oxlint**

`no-dupe-args`, `no-octal`, `camelcase`, `no-invalid-this`, `no-octal-escape`, `no-undef-init`

**Require JS plugin support**

`@eslint-community/eslint-comments/disable-enable-pair`, `@eslint-community/eslint-comments/no-aggregating-enable`, `@eslint-community/eslint-comments/no-duplicate-disable`, `@eslint-community/eslint-comments/no-unlimited-disable`, `@eslint-community/eslint-comments/no-unused-enable`, `@eslint-community/eslint-comments/disable-enable-pair`, `@eslint-community/eslint-comments/require-description`, `regexp/confusing-quantifier`, `regexp/control-character-escape`, `regexp/match-any`, `regexp/negation`, `regexp/no-contradiction-with-assertion`, `regexp/no-dupe-characters-character-class`, `regexp/no-dupe-disjunctions`, `regexp/no-empty-alternative`, `regexp/no-empty-capturing-group`, `regexp/no-empty-character-class`, `regexp/no-empty-group`, `regexp/no-empty-lookarounds-assertion`, `regexp/no-empty-string-literal`, `regexp/no-escape-backspace`, `regexp/no-extra-lookaround-assertions`, `regexp/no-invalid-regexp`, `regexp/no-invisible-character`, `regexp/no-lazy-ends`, `regexp/no-legacy-features`, `regexp/no-misleading-capturing-group`, `regexp/no-misleading-unicode-character`, `regexp/no-missing-g-flag`, `regexp/no-non-standard-flag`, `regexp/no-obscure-range`, `regexp/no-optional-assertion`, `regexp/no-potentially-useless-backreference`, `regexp/no-super-linear-backtracking`, `regexp/no-trivially-nested-assertion`, `regexp/no-trivially-nested-quantifier`, `regexp/no-unused-capturing-group`, `regexp/no-useless-assertions`, `regexp/no-useless-backreference`, `regexp/no-useless-character-class`, `regexp/no-useless-dollar-replacements`, `regexp/no-useless-escape`, `regexp/no-useless-flag`, `regexp/no-useless-lazy`, `regexp/no-useless-non-capturing-group`, `regexp/no-useless-quantifier`, `regexp/no-useless-range`, `regexp/no-useless-set-operand`, `regexp/no-useless-string-literal`, `regexp/no-useless-two-nums-quantifier`, `regexp/no-zero-quantifier`, `regexp/optimal-lookaround-quantifier`, `regexp/optimal-quantifier-concatenation`, `regexp/prefer-character-class`, `regexp/prefer-d`, `regexp/prefer-plus-quantifier`, `regexp/prefer-predefined-assertion`, `regexp/prefer-question-quantifier`, `regexp/prefer-range`, `regexp/prefer-set-operation`, `regexp/prefer-star-quantifier`, `regexp/prefer-unicode-codepoint-escapes`, `regexp/prefer-w`, `regexp/simplify-set-operations`, `regexp/sort-flags`, `regexp/strict`, `regexp/use-ignore-case`

</details>

### `eslint/base.json`

```json
"./node_modules/oxlint-config-presets/eslint/base.json"
```

Extracted from `eslint-config-eslint@14.0.0`.

<details>
<summary>160 rules successfully migrated</summary>

`unicorn/prefer-array-find`, `unicorn/prefer-array-flat-map`, `unicorn/prefer-array-flat`, `unicorn/prefer-array-index-of`, `unicorn/prefer-array-some`, `unicorn/prefer-at`, `unicorn/prefer-includes`, `unicorn/prefer-set-has`, `unicorn/prefer-string-slice`, `unicorn/prefer-string-starts-ends-with`, `unicorn/prefer-string-trim-start-end`, `jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`, `no-control-regex`, `no-misleading-character-class`, `no-regex-spaces`, `no-invalid-regexp`, `no-useless-backreference`, `no-empty-character-class`, `constructor-super`, `for-direction`, `getter-return`, `no-async-promise-executor`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-pattern`, `no-empty-static-block`, `no-ex-assign`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-irregular-whitespace`, `no-loss-of-precision`, `no-new-native-nonconstructor`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-prototype-builtins`, `no-redeclare`, `no-self-assign`, `no-setter-return`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-this-before-super`, `no-unassigned-vars`, `no-undef`, `no-unexpected-multiline`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-useless-assignment`, `no-useless-catch`, `no-useless-escape`, `no-with`, `preserve-caught-error`, `require-yield`, `use-isnan`, `valid-typeof`, `array-callback-return`, `arrow-body-style`, `class-methods-use-this`, `curly`, `default-case`, `default-case-last`, `default-param-last`, `eqeqeq`, `func-style`, `grouped-accessor-pairs`, `guard-for-in`, `new-cap`, `no-alert`, `no-array-constructor`, `no-caller`, `no-console`, `no-constructor-return`, `no-else-return`, `no-eval`, `no-extend-native`, `no-extra-bind`, `no-inner-declarations`, `no-iterator`, `no-label-var`, `no-labels`, `no-lone-blocks`, `no-loop-func`, `no-multi-str`, `no-nested-ternary`, `no-new`, `no-new-func`, `no-new-wrappers`, `no-object-constructor`, `no-param-reassign`, `no-proto`, `no-return-assign`, `no-script-url`, `no-self-compare`, `no-sequences`, `no-shadow`, `no-throw-literal`, `no-undefined`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unused-expressions`, `no-use-before-define`, `no-useless-call`, `no-useless-computed-key`, `no-useless-concat`, `no-useless-constructor`, `no-useless-rename`, `no-useless-return`, `no-var`, `object-shorthand`, `operator-assignment`, `prefer-const`, `prefer-exponentiation-operator`, `prefer-numeric-literals`, `prefer-object-has-own`, `prefer-promise-reject-errors`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `radix`, `symbol-description`, `unicode-bom`, `yoda`, `typescript/consistent-return`, `typescript/dot-notation`

</details>

<details>
<summary>112 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/require-jsdoc`, `jsdoc/require-returns-check`, `jsdoc/require-yields-check`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`, `jsdoc/check-syntax`, `jsdoc/check-values`, `jsdoc/no-bad-blocks`, `jsdoc/require-asterisk-prefix`, `jsdoc/require-description`, `jsdoc/require-hyphen-before-param-description`, `jsdoc/require-throws`, `jsdoc/tag-lines`, `jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/require-jsdoc`, `jsdoc/require-returns-check`, `jsdoc/require-yields-check`, `jsdoc/valid-types`, `prefer-regex-literals`, `no-implied-eval`, `no-restricted-properties`, `no-underscore-dangle`, `no-unreachable-loop`, `prefer-arrow-callback`, `prefer-regex-literals`, `require-unicode-regexp`, `strict`

**Not portable to oxlint**

`no-dupe-args`, `no-octal`, `camelcase`, `no-invalid-this`, `no-octal-escape`, `no-undef-init`

**Require JS plugin support**

`@eslint-community/eslint-comments/disable-enable-pair`, `@eslint-community/eslint-comments/no-aggregating-enable`, `@eslint-community/eslint-comments/no-duplicate-disable`, `@eslint-community/eslint-comments/no-unlimited-disable`, `@eslint-community/eslint-comments/no-unused-enable`, `@eslint-community/eslint-comments/disable-enable-pair`, `@eslint-community/eslint-comments/require-description`, `regexp/confusing-quantifier`, `regexp/control-character-escape`, `regexp/match-any`, `regexp/negation`, `regexp/no-contradiction-with-assertion`, `regexp/no-dupe-characters-character-class`, `regexp/no-dupe-disjunctions`, `regexp/no-empty-alternative`, `regexp/no-empty-capturing-group`, `regexp/no-empty-character-class`, `regexp/no-empty-group`, `regexp/no-empty-lookarounds-assertion`, `regexp/no-empty-string-literal`, `regexp/no-escape-backspace`, `regexp/no-extra-lookaround-assertions`, `regexp/no-invalid-regexp`, `regexp/no-invisible-character`, `regexp/no-lazy-ends`, `regexp/no-legacy-features`, `regexp/no-misleading-capturing-group`, `regexp/no-misleading-unicode-character`, `regexp/no-missing-g-flag`, `regexp/no-non-standard-flag`, `regexp/no-obscure-range`, `regexp/no-optional-assertion`, `regexp/no-potentially-useless-backreference`, `regexp/no-super-linear-backtracking`, `regexp/no-trivially-nested-assertion`, `regexp/no-trivially-nested-quantifier`, `regexp/no-unused-capturing-group`, `regexp/no-useless-assertions`, `regexp/no-useless-backreference`, `regexp/no-useless-character-class`, `regexp/no-useless-dollar-replacements`, `regexp/no-useless-escape`, `regexp/no-useless-flag`, `regexp/no-useless-lazy`, `regexp/no-useless-non-capturing-group`, `regexp/no-useless-quantifier`, `regexp/no-useless-range`, `regexp/no-useless-set-operand`, `regexp/no-useless-string-literal`, `regexp/no-useless-two-nums-quantifier`, `regexp/no-zero-quantifier`, `regexp/optimal-lookaround-quantifier`, `regexp/optimal-quantifier-concatenation`, `regexp/prefer-character-class`, `regexp/prefer-d`, `regexp/prefer-plus-quantifier`, `regexp/prefer-predefined-assertion`, `regexp/prefer-question-quantifier`, `regexp/prefer-range`, `regexp/prefer-set-operation`, `regexp/prefer-star-quantifier`, `regexp/prefer-unicode-codepoint-escapes`, `regexp/prefer-w`, `regexp/simplify-set-operations`, `regexp/sort-flags`, `regexp/strict`, `regexp/use-ignore-case`

</details>

### `alloy.json`

```json
"./node_modules/oxlint-config-presets/alloy.json"
```

Extracted from `eslint-config-alloy@5.1.2`.

<details>
<summary>166 rules successfully migrated</summary>

`accessor-pairs`, `array-callback-return`, `arrow-body-style`, `block-scoped-var`, `capitalized-comments`, `class-methods-use-this`, `complexity`, `constructor-super`, `default-case`, `default-case-last`, `default-param-last`, `eqeqeq`, `for-direction`, `func-names`, `func-style`, `getter-return`, `grouped-accessor-pairs`, `guard-for-in`, `id-length`, `init-declarations`, `max-classes-per-file`, `max-depth`, `max-lines`, `max-lines-per-function`, `max-nested-callbacks`, `max-params`, `max-statements`, `new-cap`, `no-alert`, `no-array-constructor`, `no-async-promise-executor`, `no-await-in-loop`, `no-bitwise`, `no-caller`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-const-assign`, `no-constant-binary-expression`, `no-constant-condition`, `no-constructor-return`, `no-continue`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-div-regex`, `no-dupe-class-members`, `no-dupe-else-if`, `no-dupe-keys`, `no-duplicate-case`, `no-duplicate-imports`, `no-else-return`, `no-empty`, `no-empty-character-class`, `no-empty-function`, `no-empty-pattern`, `no-empty-static-block`, `no-eq-null`, `no-eval`, `no-ex-assign`, `no-extend-native`, `no-extra-bind`, `no-extra-boolean-cast`, `no-extra-label`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-implicit-coercion`, `no-import-assign`, `no-inline-comments`, `no-inner-declarations`, `no-invalid-regexp`, `no-iterator`, `no-label-var`, `no-labels`, `no-lone-blocks`, `no-lonely-if`, `no-loop-func`, `no-loss-of-precision`, `no-magic-numbers`, `no-misleading-character-class`, `no-multi-assign`, `no-multi-str`, `no-negated-condition`, `no-nested-ternary`, `no-new`, `no-new-func`, `no-new-native-nonconstructor`, `no-new-wrappers`, `no-nonoctal-decimal-escape`, `no-obj-calls`, `no-param-reassign`, `no-plusplus`, `no-promise-executor-return`, `no-proto`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-restricted-exports`, `no-restricted-globals`, `no-restricted-imports`, `no-return-assign`, `no-script-url`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-setter-return`, `no-shadow`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-ternary`, `no-this-before-super`, `no-throw-literal`, `no-undef`, `no-undefined`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unsafe-optional-chaining`, `no-unused-expressions`, `no-unused-labels`, `no-unused-private-class-members`, `no-unused-vars`, `no-use-before-define`, `no-useless-backreference`, `no-useless-call`, `no-useless-catch`, `no-useless-computed-key`, `no-useless-concat`, `no-useless-constructor`, `no-useless-escape`, `no-useless-rename`, `no-useless-return`, `no-var`, `no-void`, `no-warning-comments`, `no-with`, `object-shorthand`, `operator-assignment`, `prefer-const`, `prefer-destructuring`, `prefer-exponentiation-operator`, `prefer-numeric-literals`, `prefer-object-has-own`, `prefer-object-spread`, `prefer-promise-reject-errors`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `radix`, `require-await`, `require-yield`, `sort-keys`, `sort-vars`, `symbol-description`, `use-isnan`, `valid-typeof`, `vars-on-top`, `yoda`, `typescript/consistent-return`, `typescript/dot-notation`

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

> special parser detected: @babel/eslint-parser

### `alloy/react.json`

```json
"./node_modules/oxlint-config-presets/alloy/react.json"
```

Extracted from `eslint-config-alloy@5.1.2`.

<details>
<summary>48 rules successfully migrated</summary>

`react/button-has-type`, `react/display-name`, `react/forbid-dom-props`, `react/forbid-elements`, `react/hook-use-state`, `react/iframe-missing-sandbox`, `react/jsx-boolean-value`, `react/jsx-curly-brace-presence`, `react/jsx-filename-extension`, `react/jsx-fragments`, `react/jsx-handler-names`, `react/jsx-key`, `react/jsx-max-depth`, `react/jsx-no-comment-textnodes`, `react/jsx-no-constructed-context-values`, `react/jsx-no-duplicate-props`, `react/jsx-no-script-url`, `react/jsx-no-target-blank`, `react/jsx-no-undef`, `react/jsx-no-useless-fragment`, `react/jsx-pascal-case`, `react/jsx-props-no-spreading`, `react/no-array-index-key`, `react/no-children-prop`, `react/no-danger`, `react/no-danger-with-children`, `react/no-did-mount-set-state`, `react/no-direct-mutation-state`, `react/no-find-dom-node`, `react/no-is-mounted`, `react/no-multi-comp`, `react/no-namespace`, `react/no-redundant-should-component-update`, `react/no-render-return-value`, `react/no-set-state`, `react/no-string-refs`, `react/no-this-in-sfc`, `react/no-unescaped-entities`, `react/no-unknown-property`, `react/no-unsafe`, `react/no-will-update-set-state`, `react/prefer-es6-class`, `react/react-in-jsx-scope`, `react/require-render-return`, `react/self-closing-comp`, `react/state-in-constructor`, `react/style-prop-object`, `react/void-dom-elements-no-children`

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

Extracted from `eslint-config-alloy@5.1.2`.

<details>
<summary>106 rules successfully migrated</summary>

`no-undef`, `class-methods-use-this`, `default-param-last`, `init-declarations`, `no-array-constructor`, `no-dupe-class-members`, `no-empty-function`, `no-loop-func`, `no-loss-of-precision`, `no-magic-numbers`, `no-redeclare`, `no-restricted-imports`, `no-shadow`, `no-throw-literal`, `no-unused-expressions`, `no-unused-vars`, `no-use-before-define`, `no-useless-constructor`, `require-await`, `typescript/adjacent-overload-signatures`, `typescript/array-type`, `typescript/await-thenable`, `typescript/ban-ts-comment`, `typescript/ban-tslint-comment`, `typescript/ban-types`, `typescript/class-literal-property-style`, `typescript/consistent-generic-constructors`, `typescript/consistent-indexed-object-style`, `typescript/consistent-type-assertions`, `typescript/consistent-type-definitions`, `typescript/consistent-type-exports`, `typescript/consistent-type-imports`, `typescript/dot-notation`, `typescript/explicit-function-return-type`, `typescript/explicit-module-boundary-types`, `typescript/no-base-to-string`, `typescript/no-confusing-non-null-assertion`, `typescript/no-confusing-void-expression`, `typescript/no-duplicate-enum-values`, `typescript/no-duplicate-type-constituents`, `typescript/no-dynamic-delete`, `typescript/no-empty-interface`, `typescript/no-explicit-any`, `typescript/no-extra-non-null-assertion`, `typescript/no-extraneous-class`, `typescript/no-floating-promises`, `typescript/no-for-in-array`, `typescript/no-implied-eval`, `typescript/no-import-type-side-effects`, `typescript/no-inferrable-types`, `typescript/no-invalid-void-type`, `typescript/no-meaningless-void-operator`, `typescript/no-misused-new`, `typescript/no-misused-promises`, `typescript/no-mixed-enums`, `typescript/no-namespace`, `typescript/no-non-null-asserted-nullish-coalescing`, `typescript/no-non-null-asserted-optional-chain`, `typescript/no-non-null-assertion`, `typescript/no-redundant-type-constituents`, `typescript/no-require-imports`, `typescript/no-this-alias`, `typescript/no-unnecessary-boolean-literal-compare`, `typescript/no-unnecessary-condition`, `typescript/no-unnecessary-qualifier`, `typescript/no-unnecessary-type-arguments`, `typescript/no-unnecessary-type-assertion`, `typescript/no-unnecessary-type-constraint`, `typescript/no-unsafe-argument`, `typescript/no-unsafe-assignment`, `typescript/no-unsafe-call`, `typescript/no-unsafe-declaration-merging`, `typescript/no-unsafe-enum-comparison`, `typescript/no-unsafe-member-access`, `typescript/no-unsafe-return`, `typescript/no-useless-empty-export`, `typescript/no-var-requires`, `typescript/non-nullable-type-assertion-style`, `typescript/parameter-properties`, `typescript/prefer-as-const`, `typescript/prefer-enum-initializers`, `typescript/prefer-for-of`, `typescript/prefer-function-type`, `typescript/prefer-includes`, `typescript/prefer-literal-enum-member`, `typescript/prefer-namespace-keyword`, `typescript/prefer-nullish-coalescing`, `typescript/prefer-optional-chain`, `typescript/prefer-readonly`, `typescript/prefer-readonly-parameter-types`, `typescript/prefer-reduce-type-parameter`, `typescript/prefer-regexp-exec`, `typescript/prefer-return-this-type`, `typescript/prefer-string-starts-ends-with`, `typescript/prefer-ts-expect-error`, `typescript/promise-function-async`, `typescript/require-array-sort-compare`, `typescript/require-await`, `typescript/restrict-plus-operands`, `typescript/restrict-template-expressions`, `typescript/return-await`, `typescript/strict-boolean-expressions`, `typescript/switch-exhaustiveness-check`, `typescript/triple-slash-reference`, `typescript/unbound-method`, `typescript/unified-signatures`

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

Extracted from `eslint-config-prettier@10.1.8`.

<details>
<summary>5 rules successfully migrated</summary>

`curly`, `no-unexpected-multiline`, `unicorn/empty-brace-spaces`, `unicorn/no-nested-ternary`, `unicorn/number-literal-case`

</details>

### `@antfu.json`

```json
"./node_modules/oxlint-config-presets/@antfu.json"
```

Extracted from `@antfu/eslint-config@7.7.3`.

<details>
<summary>113 rules successfully migrated</summary>

`accessor-pairs`, `array-callback-return`, `block-scoped-var`, `constructor-super`, `default-case-last`, `eqeqeq`, `new-cap`, `no-alert`, `no-array-constructor`, `no-async-promise-executor`, `no-caller`, `no-case-declarations`, `no-class-assign`, `no-compare-neg-zero`, `no-cond-assign`, `no-console`, `no-const-assign`, `no-control-regex`, `no-debugger`, `no-delete-var`, `no-dupe-class-members`, `no-dupe-keys`, `no-duplicate-case`, `no-empty`, `no-empty-character-class`, `no-empty-pattern`, `no-eval`, `no-ex-assign`, `no-extend-native`, `no-extra-bind`, `no-extra-boolean-cast`, `no-fallthrough`, `no-func-assign`, `no-global-assign`, `no-import-assign`, `no-invalid-regexp`, `no-irregular-whitespace`, `no-iterator`, `no-labels`, `no-lone-blocks`, `no-loss-of-precision`, `no-misleading-character-class`, `no-multi-str`, `no-new`, `no-new-func`, `no-new-native-nonconstructor`, `no-new-wrappers`, `no-obj-calls`, `no-proto`, `no-prototype-builtins`, `no-redeclare`, `no-regex-spaces`, `no-restricted-globals`, `no-self-assign`, `no-self-compare`, `no-sequences`, `no-shadow-restricted-names`, `no-sparse-arrays`, `no-template-curly-in-string`, `no-this-before-super`, `no-throw-literal`, `no-undef`, `no-unexpected-multiline`, `no-unmodified-loop-condition`, `no-unneeded-ternary`, `no-unreachable`, `no-unsafe-finally`, `no-unsafe-negation`, `no-unused-expressions`, `no-unused-vars`, `no-use-before-define`, `no-useless-backreference`, `no-useless-call`, `no-useless-catch`, `no-useless-computed-key`, `no-useless-constructor`, `no-useless-rename`, `no-useless-return`, `no-var`, `no-with`, `object-shorthand`, `prefer-const`, `prefer-exponentiation-operator`, `prefer-promise-reject-errors`, `prefer-rest-params`, `prefer-spread`, `prefer-template`, `symbol-description`, `unicode-bom`, `use-isnan`, `valid-typeof`, `vars-on-top`, `yoda`, `import/first`, `import/no-duplicates`, `import/no-mutable-exports`, `import/no-named-default`, `unicorn/consistent-empty-array-spread`, `unicorn/error-message`, `unicorn/escape-case`, `unicorn/new-for-builtins`, `unicorn/no-instanceof-builtins`, `unicorn/no-new-array`, `unicorn/no-new-buffer`, `unicorn/number-literal-case`, `unicorn/prefer-dom-node-text-content`, `unicorn/prefer-includes`, `unicorn/prefer-node-protocol`, `unicorn/prefer-number-properties`, `unicorn/prefer-string-starts-ends-with`, `unicorn/prefer-type-error`, `unicorn/throw-new-error`, `typescript/dot-notation`

</details>

<details>
<summary>1 rules migrated without options (incompatible schema)</summary>

These rules are enabled but their configuration options were dropped because oxlint's schema does not accept them. Only the severity level was kept.

`import/consistent-type-specifier-style`

</details>

<details>
<summary>309 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`no-implied-eval`, `no-restricted-properties`, `no-restricted-syntax`, `no-unreachable-loop`, `one-var`, `prefer-arrow-callback`, `prefer-regex-literals`, `node/no-deprecated-api`, `node/prefer-global/buffer`, `node/prefer-global/process`, `node/process-exit-as-throw`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/no-multi-asterisks`, `jsdoc/require-returns-check`, `jsdoc/require-yields-check`, `jsdoc/check-alignment`, `jsdoc/multiline-blocks`, `import/newline-after-import`, `prefer-regex-literals`

**Not portable to oxlint**

`no-dupe-args`, `no-octal`, `no-octal-escape`, `no-undef-init`

**Require JS plugin support**

`antfu/no-top-level-await`, `unused-imports/no-unused-imports`, `unused-imports/no-unused-vars`, `eslint-comments/no-aggregating-enable`, `eslint-comments/no-duplicate-disable`, `eslint-comments/no-unlimited-disable`, `eslint-comments/no-unused-enable`, `command/command`, `perfectionist/sort-exports`, `perfectionist/sort-named-exports`, `perfectionist/sort-named-imports`, `antfu/import-dedupe`, `antfu/no-import-dist`, `antfu/no-import-node-modules-by-path`, `e18e/prefer-array-at`, `e18e/prefer-array-fill`, `e18e/prefer-includes`, `e18e/prefer-nullish-coalescing`, `e18e/prefer-object-has-own`, `e18e/prefer-url-canparse`, `e18e/prefer-array-from-map`, `e18e/prefer-timer-args`, `e18e/prefer-date-now`, `e18e/prefer-regex-test`, `e18e/prefer-array-some`, `e18e/prefer-static-regex`, `ts/ban-ts-comment`, `ts/no-array-constructor`, `ts/no-duplicate-enum-values`, `ts/no-empty-object-type`, `ts/no-extra-non-null-assertion`, `ts/no-misused-new`, `ts/no-namespace`, `ts/no-non-null-asserted-nullish-coalescing`, `ts/no-non-null-asserted-optional-chain`, `ts/no-require-imports`, `ts/no-this-alias`, `ts/no-unnecessary-type-constraint`, `ts/no-unsafe-declaration-merging`, `ts/no-unsafe-function-type`, `ts/no-unused-expressions`, `ts/no-wrapper-object-types`, `ts/prefer-as-const`, `ts/prefer-literal-enum-member`, `ts/prefer-namespace-keyword`, `ts/consistent-type-definitions`, `ts/consistent-type-imports`, `ts/method-signature-style`, `ts/no-dupe-class-members`, `ts/no-import-type-side-effects`, `ts/no-redeclare`, `ts/no-use-before-define`, `style/array-bracket-spacing`, `style/arrow-parens`, `style/arrow-spacing`, `style/block-spacing`, `style/brace-style`, `style/comma-dangle`, `style/comma-spacing`, `style/comma-style`, `style/computed-property-spacing`, `style/dot-location`, `style/eol-last`, `style/generator-star-spacing`, `style/indent`, `style/indent-binary-ops`, `style/key-spacing`, `style/keyword-spacing`, `style/lines-between-class-members`, `style/max-statements-per-line`, `style/member-delimiter-style`, `style/multiline-ternary`, `style/new-parens`, `style/no-extra-parens`, `style/no-floating-decimal`, `style/no-mixed-operators`, `style/no-mixed-spaces-and-tabs`, `style/no-multi-spaces`, `style/no-multiple-empty-lines`, `style/no-tabs`, `style/no-trailing-spaces`, `style/no-whitespace-before-property`, `style/object-curly-spacing`, `style/operator-linebreak`, `style/padded-blocks`, `style/quote-props`, `style/quotes`, `style/rest-spread-spacing`, `style/semi`, `style/semi-spacing`, `style/space-before-blocks`, `style/space-before-function-paren`, `style/space-in-parens`, `style/space-infix-ops`, `style/space-unary-ops`, `style/spaced-comment`, `style/template-curly-spacing`, `style/template-tag-spacing`, `style/type-annotation-spacing`, `style/type-generic-spacing`, `style/type-named-tuple-spacing`, `style/wrap-iife`, `style/yield-star-spacing`, `style/jsx-closing-bracket-location`, `style/jsx-closing-tag-location`, `style/jsx-curly-brace-presence`, `style/jsx-curly-newline`, `style/jsx-curly-spacing`, `style/jsx-equals-spacing`, `style/jsx-first-prop-new-line`, `style/jsx-function-call-newline`, `style/jsx-indent-props`, `style/jsx-max-props-per-line`, `style/jsx-one-expression-per-line`, `style/jsx-quotes`, `style/jsx-tag-spacing`, `style/jsx-wrap-multilines`, `antfu/consistent-list-newline`, `antfu/consistent-chaining`, `antfu/curly`, `antfu/if-newline`, `antfu/top-level-function`, `regexp/confusing-quantifier`, `regexp/control-character-escape`, `regexp/match-any`, `regexp/negation`, `regexp/no-contradiction-with-assertion`, `regexp/no-dupe-characters-character-class`, `regexp/no-dupe-disjunctions`, `regexp/no-empty-alternative`, `regexp/no-empty-capturing-group`, `regexp/no-empty-character-class`, `regexp/no-empty-group`, `regexp/no-empty-lookarounds-assertion`, `regexp/no-empty-string-literal`, `regexp/no-escape-backspace`, `regexp/no-extra-lookaround-assertions`, `regexp/no-invalid-regexp`, `regexp/no-invisible-character`, `regexp/no-lazy-ends`, `regexp/no-legacy-features`, `regexp/no-misleading-capturing-group`, `regexp/no-misleading-unicode-character`, `regexp/no-missing-g-flag`, `regexp/no-non-standard-flag`, `regexp/no-obscure-range`, `regexp/no-optional-assertion`, `regexp/no-potentially-useless-backreference`, `regexp/no-super-linear-backtracking`, `regexp/no-trivially-nested-assertion`, `regexp/no-trivially-nested-quantifier`, `regexp/no-unused-capturing-group`, `regexp/no-useless-assertions`, `regexp/no-useless-backreference`, `regexp/no-useless-character-class`, `regexp/no-useless-dollar-replacements`, `regexp/no-useless-escape`, `regexp/no-useless-flag`, `regexp/no-useless-lazy`, `regexp/no-useless-non-capturing-group`, `regexp/no-useless-quantifier`, `regexp/no-useless-range`, `regexp/no-useless-set-operand`, `regexp/no-useless-string-literal`, `regexp/no-useless-two-nums-quantifier`, `regexp/no-zero-quantifier`, `regexp/optimal-lookaround-quantifier`, `regexp/optimal-quantifier-concatenation`, `regexp/prefer-character-class`, `regexp/prefer-d`, `regexp/prefer-plus-quantifier`, `regexp/prefer-predefined-assertion`, `regexp/prefer-question-quantifier`, `regexp/prefer-range`, `regexp/prefer-set-operation`, `regexp/prefer-star-quantifier`, `regexp/prefer-unicode-codepoint-escapes`, `regexp/prefer-w`, `regexp/simplify-set-operations`, `regexp/sort-flags`, `regexp/strict`, `regexp/use-ignore-case`, `test/consistent-test-it`, `test/no-identical-title`, `test/no-import-node-test`, `test/no-only-tests`, `test/prefer-hooks-in-order`, `test/prefer-lowercase-title`, `jsonc/no-bigint-literals`, `jsonc/no-binary-expression`, `jsonc/no-binary-numeric-literals`, `jsonc/no-dupe-keys`, `jsonc/no-escape-sequence-in-identifier`, `jsonc/no-floating-decimal`, `jsonc/no-hexadecimal-numeric-literals`, `jsonc/no-infinity`, `jsonc/no-multi-str`, `jsonc/no-nan`, `jsonc/no-number-props`, `jsonc/no-numeric-separators`, `jsonc/no-octal`, `jsonc/no-octal-escape`, `jsonc/no-octal-numeric-literals`, `jsonc/no-parenthesized`, `jsonc/no-plus-sign`, `jsonc/no-regexp-literals`, `jsonc/no-sparse-arrays`, `jsonc/no-template-literals`, `jsonc/no-undefined-value`, `jsonc/no-unicode-codepoint-escapes`, `jsonc/no-useless-escape`, `jsonc/space-unary-ops`, `jsonc/valid-json-number`, `jsonc/vue-custom-block/no-parsing-error`, `jsonc/array-bracket-spacing`, `jsonc/comma-dangle`, `jsonc/comma-style`, `jsonc/indent`, `jsonc/key-spacing`, `jsonc/object-curly-newline`, `jsonc/object-curly-spacing`, `jsonc/object-property-newline`, `jsonc/quote-props`, `jsonc/quotes`, `jsonc/sort-array-values`, `jsonc/sort-keys`, `jsonc/sort-keys`, `pnpm/json-prefer-workspace-settings`, `pnpm/json-valid-catalog`, `pnpm/yaml-enforce-settings`, `pnpm/yaml-no-duplicate-catalog-item`, `pnpm/yaml-no-unused-catalog-item`, `yaml/sort-keys`, `yaml/block-mapping`, `yaml/block-sequence`, `yaml/no-empty-key`, `yaml/no-empty-sequence-entry`, `yaml/no-irregular-whitespace`, `yaml/plain-scalar`, `yaml/vue-custom-block/no-parsing-error`, `yaml/block-mapping-question-indicator-newline`, `yaml/block-sequence-hyphen-indicator-newline`, `yaml/flow-mapping-curly-newline`, `yaml/flow-mapping-curly-spacing`, `yaml/flow-sequence-bracket-newline`, `yaml/flow-sequence-bracket-spacing`, `yaml/indent`, `yaml/key-spacing`, `yaml/no-tab-indent`, `yaml/quotes`, `yaml/spaced-comment`, `toml/comma-style`, `toml/keys-order`, `toml/no-space-dots`, `toml/no-unreadable-number-separator`, `toml/precision-of-fractional-seconds`, `toml/precision-of-integer`, `toml/tables-order`, `toml/vue-custom-block/no-parsing-error`, `toml/array-bracket-newline`, `toml/array-bracket-spacing`, `toml/array-element-newline`, `toml/indent`, `toml/inline-table-curly-spacing`, `toml/key-spacing`, `toml/padding-line-between-pairs`, `toml/padding-line-between-tables`, `toml/quoted-keys`, `toml/spaced-comment`, `toml/table-bracket-spacing`, `markdown/heading-increment`, `markdown/no-duplicate-definitions`, `markdown/no-empty-definitions`, `markdown/no-empty-images`, `markdown/no-empty-links`, `markdown/no-invalid-label-refs`, `markdown/no-missing-atx-heading-space`, `markdown/no-missing-link-fragments`, `markdown/no-multiple-h1`, `markdown/no-reference-like-urls`, `markdown/no-reversed-media-syntax`, `markdown/no-space-in-emphasis`, `markdown/no-unused-definitions`, `markdown/require-alt-text`, `markdown/table-column-count`

</details>

> special parser detected: yaml-eslint-parser
> special parser detected: toml-eslint-parser
> ignore list inside overrides is not supported

### `import/recommended.json`

```json
"./node_modules/oxlint-config-presets/import/recommended.json"
```

Extracted from `eslint-plugin-import@2.32.0`.

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

Extracted from `eslint-plugin-import@2.32.0`.

<details>
<summary>4 rules successfully migrated</summary>

`import/named`, `import/namespace`, `import/default`, `import/export`

</details>

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`import/no-unresolved`

</details>

### `import/stage-0.json`

```json
"./node_modules/oxlint-config-presets/import/stage-0.json"
```

Extracted from `eslint-plugin-import@2.32.0`.

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`import/no-deprecated`

</details>

### `import/typescript.json`

```json
"./node_modules/oxlint-config-presets/import/typescript.json"
```

Extracted from `eslint-plugin-import@2.32.0`.

<details>
<summary>1 rules successfully migrated</summary>

`import/named`

</details>

### `import/warnings.json`

```json
"./node_modules/oxlint-config-presets/import/warnings.json"
```

Extracted from `eslint-plugin-import@2.32.0`.

<details>
<summary>3 rules successfully migrated</summary>

`import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-duplicates`

</details>

### `import-x/recommended.json`

```json
"./node_modules/oxlint-config-presets/import-x/recommended.json"
```

Extracted from `eslint-plugin-import-x@4.16.2`.

<details>
<summary>7 rules successfully migrated</summary>

`import/named`, `import/namespace`, `import/default`, `import/export`, `import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-duplicates`

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

Extracted from `eslint-plugin-import-x@4.16.2`.

<details>
<summary>4 rules successfully migrated</summary>

`import/named`, `import/namespace`, `import/default`, `import/export`

</details>

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`import-x/no-unresolved`

</details>

### `import-x/stage-0.json`

```json
"./node_modules/oxlint-config-presets/import-x/stage-0.json"
```

Extracted from `eslint-plugin-import-x@4.16.2`.

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`import-x/no-deprecated`

</details>

### `import-x/typescript.json`

```json
"./node_modules/oxlint-config-presets/import-x/typescript.json"
```

Extracted from `eslint-plugin-import-x@4.16.2`.

<details>
<summary>1 rules successfully migrated</summary>

`import/named`

</details>

### `import-x/warnings.json`

```json
"./node_modules/oxlint-config-presets/import-x/warnings.json"
```

Extracted from `eslint-plugin-import-x@4.16.2`.

<details>
<summary>3 rules successfully migrated</summary>

`import/no-named-as-default`, `import/no-named-as-default-member`, `import/no-duplicates`

</details>

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`import-x/no-rename-default`

</details>

### `next/recommended.json`

```json
"./node_modules/oxlint-config-presets/next/recommended.json"
```

Extracted from `eslint-config-next@16.2.1`.

<details>
<summary>48 rules successfully migrated</summary>

`react/display-name`, `react/jsx-key`, `react/jsx-no-comment-textnodes`, `react/jsx-no-duplicate-props`, `react/jsx-no-target-blank`, `react/jsx-no-undef`, `react/no-children-prop`, `react/no-danger-with-children`, `react/no-direct-mutation-state`, `react/no-find-dom-node`, `react/no-is-mounted`, `react/no-render-return-value`, `react/no-string-refs`, `react/no-unescaped-entities`, `react/no-unknown-property`, `react/no-unsafe`, `react/react-in-jsx-scope`, `react/require-render-return`, `import/no-anonymous-default-export`, `jsx-a11y/alt-text`, `jsx-a11y/aria-props`, `jsx-a11y/aria-proptypes`, `jsx-a11y/aria-unsupported-elements`, `jsx-a11y/role-has-required-aria-props`, `jsx-a11y/role-supports-aria-props`, `nextjs/google-font-display`, `nextjs/google-font-preconnect`, `nextjs/next-script-for-ga`, `nextjs/no-async-client-component`, `nextjs/no-before-interactive-script-outside-document`, `nextjs/no-css-tags`, `nextjs/no-head-element`, `nextjs/no-html-link-for-pages`, `nextjs/no-img-element`, `nextjs/no-page-custom-font`, `nextjs/no-styled-jsx-in-document`, `nextjs/no-sync-scripts`, `nextjs/no-title-in-document-head`, `nextjs/no-typos`, `nextjs/no-unwanted-polyfillio`, `nextjs/inline-script-id`, `nextjs/no-assign-module-variable`, `nextjs/no-document-import-in-page`, `nextjs/no-duplicate-head`, `nextjs/no-head-import-in-document`, `nextjs/no-script-component-in-head`, `react/rules-of-hooks`, `react/exhaustive-deps`

</details>

<details>
<summary>18 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`react/no-deprecated`

**Not portable to oxlint**

`react/jsx-uses-react`, `react/jsx-uses-vars`, `react-hooks/static-components`, `react-hooks/use-memo`, `react-hooks/component-hook-factories`, `react-hooks/preserve-manual-memoization`, `react-hooks/incompatible-library`, `react-hooks/immutability`, `react-hooks/globals`, `react-hooks/refs`, `react-hooks/set-state-in-effect`, `react-hooks/error-boundaries`, `react-hooks/purity`, `react-hooks/set-state-in-render`, `react-hooks/unsupported-syntax`, `react-hooks/config`, `react-hooks/gating`

</details>

### `next/core-web-vitals.json`

```json
"./node_modules/oxlint-config-presets/next/core-web-vitals.json"
```

Extracted from `eslint-config-next@16.2.1`.

<details>
<summary>48 rules successfully migrated</summary>

`react/display-name`, `react/jsx-key`, `react/jsx-no-comment-textnodes`, `react/jsx-no-duplicate-props`, `react/jsx-no-target-blank`, `react/jsx-no-undef`, `react/no-children-prop`, `react/no-danger-with-children`, `react/no-direct-mutation-state`, `react/no-find-dom-node`, `react/no-is-mounted`, `react/no-render-return-value`, `react/no-string-refs`, `react/no-unescaped-entities`, `react/no-unknown-property`, `react/no-unsafe`, `react/react-in-jsx-scope`, `react/require-render-return`, `import/no-anonymous-default-export`, `jsx-a11y/alt-text`, `jsx-a11y/aria-props`, `jsx-a11y/aria-proptypes`, `jsx-a11y/aria-unsupported-elements`, `jsx-a11y/role-has-required-aria-props`, `jsx-a11y/role-supports-aria-props`, `nextjs/google-font-display`, `nextjs/google-font-preconnect`, `nextjs/next-script-for-ga`, `nextjs/no-async-client-component`, `nextjs/no-before-interactive-script-outside-document`, `nextjs/no-css-tags`, `nextjs/no-head-element`, `nextjs/no-html-link-for-pages`, `nextjs/no-img-element`, `nextjs/no-page-custom-font`, `nextjs/no-styled-jsx-in-document`, `nextjs/no-sync-scripts`, `nextjs/no-title-in-document-head`, `nextjs/no-typos`, `nextjs/no-unwanted-polyfillio`, `nextjs/inline-script-id`, `nextjs/no-assign-module-variable`, `nextjs/no-document-import-in-page`, `nextjs/no-duplicate-head`, `nextjs/no-head-import-in-document`, `nextjs/no-script-component-in-head`, `react/rules-of-hooks`, `react/exhaustive-deps`

</details>

<details>
<summary>18 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`react/no-deprecated`

**Not portable to oxlint**

`react/jsx-uses-react`, `react/jsx-uses-vars`, `react-hooks/static-components`, `react-hooks/use-memo`, `react-hooks/component-hook-factories`, `react-hooks/preserve-manual-memoization`, `react-hooks/incompatible-library`, `react-hooks/immutability`, `react-hooks/globals`, `react-hooks/refs`, `react-hooks/set-state-in-effect`, `react-hooks/error-boundaries`, `react-hooks/purity`, `react-hooks/set-state-in-render`, `react-hooks/unsupported-syntax`, `react-hooks/config`, `react-hooks/gating`

</details>

### `react/recommended.json`

```json
"./node_modules/oxlint-config-presets/react/recommended.json"
```

Extracted from `eslint-plugin-react@7.37.5`.

<details>
<summary>18 rules successfully migrated</summary>

`react/display-name`, `react/jsx-key`, `react/jsx-no-comment-textnodes`, `react/jsx-no-duplicate-props`, `react/jsx-no-target-blank`, `react/jsx-no-undef`, `react/no-children-prop`, `react/no-danger-with-children`, `react/no-direct-mutation-state`, `react/no-find-dom-node`, `react/no-is-mounted`, `react/no-render-return-value`, `react/no-string-refs`, `react/no-unescaped-entities`, `react/no-unknown-property`, `react/no-unsafe`, `react/react-in-jsx-scope`, `react/require-render-return`

</details>

<details>
<summary>4 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`react/no-deprecated`, `react/prop-types`

**Not portable to oxlint**

`react/jsx-uses-react`, `react/jsx-uses-vars`

</details>

### `react/all.json`

```json
"./node_modules/oxlint-config-presets/react/all.json"
```

Extracted from `eslint-plugin-react@7.37.5`.

<details>
<summary>51 rules successfully migrated</summary>

`react/button-has-type`, `react/checked-requires-onchange-or-readonly`, `react/display-name`, `react/forbid-dom-props`, `react/forbid-elements`, `react/forward-ref-uses-ref`, `react/hook-use-state`, `react/iframe-missing-sandbox`, `react/jsx-boolean-value`, `react/jsx-filename-extension`, `react/jsx-handler-names`, `react/jsx-key`, `react/jsx-max-depth`, `react/jsx-no-comment-textnodes`, `react/jsx-no-constructed-context-values`, `react/jsx-no-duplicate-props`, `react/jsx-no-script-url`, `react/jsx-no-target-blank`, `react/jsx-no-useless-fragment`, `react/jsx-no-undef`, `react/jsx-curly-brace-presence`, `react/jsx-pascal-case`, `react/jsx-fragments`, `react/jsx-props-no-spreading`, `react/jsx-props-no-spread-multi`, `react/no-array-index-key`, `react/no-children-prop`, `react/no-danger`, `react/no-danger-with-children`, `react/no-did-mount-set-state`, `react/no-direct-mutation-state`, `react/no-find-dom-node`, `react/no-is-mounted`, `react/no-multi-comp`, `react/no-namespace`, `react/no-set-state`, `react/no-string-refs`, `react/no-redundant-should-component-update`, `react/no-render-return-value`, `react/no-this-in-sfc`, `react/no-unescaped-entities`, `react/no-unknown-property`, `react/no-unsafe`, `react/no-will-update-set-state`, `react/prefer-es6-class`, `react/react-in-jsx-scope`, `react/require-render-return`, `react/self-closing-comp`, `react/state-in-constructor`, `react/style-prop-object`, `react/void-dom-elements-no-children`

</details>

<details>
<summary>50 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`react/boolean-prop-naming`, `react/destructuring-assignment`, `react/forbid-component-props`, `react/function-component-definition`, `react/jsx-no-bind`, `react/jsx-no-leaked-render`, `react/jsx-no-literals`, `react/no-invalid-html-attribute`, `react/no-arrow-function-lifecycle`, `react/no-deprecated`, `react/no-did-update-set-state`, `react/no-typos`, `react/no-unstable-nested-components`, `react/no-object-type-as-default-prop`, `react/prefer-stateless-function`, `react/prop-types`, `react/require-default-props`

**Not portable to oxlint**

`react/default-props-match-prop-types`, `react/forbid-foreign-prop-types`, `react/forbid-prop-types`, `react/jsx-child-element-spacing`, `react/jsx-closing-bracket-location`, `react/jsx-closing-tag-location`, `react/jsx-curly-spacing`, `react/jsx-curly-newline`, `react/jsx-equals-spacing`, `react/jsx-first-prop-new-line`, `react/jsx-indent`, `react/jsx-indent-props`, `react/jsx-max-props-per-line`, `react/jsx-newline`, `react/jsx-one-expression-per-line`, `react/jsx-props-no-multi-spaces`, `react/jsx-sort-props`, `react/jsx-tag-spacing`, `react/jsx-uses-react`, `react/jsx-uses-vars`, `react/jsx-wrap-multilines`, `react/no-access-state-in-setstate`, `react/no-adjacent-inline-elements`, `react/no-unused-class-component-methods`, `react/no-unused-prop-types`, `react/no-unused-state`, `react/prefer-exact-props`, `react/prefer-read-only-props`, `react/require-optimization`, `react/sort-comp`, `react/sort-default-props`, `react/sort-prop-types`, `react/static-property-placement`

</details>

### `react/jsx-runtime.json`

```json
"./node_modules/oxlint-config-presets/react/jsx-runtime.json"
```

Extracted from `eslint-plugin-react@7.37.5`.

<details>
<summary>1 rules successfully migrated</summary>

`react/react-in-jsx-scope`

</details>

### `react-perf/recommended.json`

```json
"./node_modules/oxlint-config-presets/react-perf/recommended.json"
```

Extracted from `eslint-plugin-react-perf@3.3.3`.

<details>
<summary>3 rules successfully migrated</summary>

`react-perf/jsx-no-new-object-as-prop`, `react-perf/jsx-no-new-array-as-prop`, `react-perf/jsx-no-new-function-as-prop`

</details>

### `react-perf/all.json`

```json
"./node_modules/oxlint-config-presets/react-perf/all.json"
```

Extracted from `eslint-plugin-react-perf@3.3.3`.

<details>
<summary>4 rules successfully migrated</summary>

`react-perf/jsx-no-new-object-as-prop`, `react-perf/jsx-no-new-array-as-prop`, `react-perf/jsx-no-new-function-as-prop`, `react-perf/jsx-no-jsx-as-prop`

</details>

### `jsdoc/recommended.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/recommended.json"
```

Extracted from `eslint-plugin-jsdoc@62.8.1`.

<details>
<summary>18 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`

</details>

<details>
<summary>19 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/no-undefined-types`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-jsdoc`, `jsdoc/require-next-type`, `jsdoc/require-returns-check`, `jsdoc/require-throws-type`, `jsdoc/require-yields-check`, `jsdoc/require-yields-type`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`

</details>

### `jsdoc/recommended-error.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/recommended-error.json"
```

Extracted from `eslint-plugin-jsdoc@62.8.1`.

<details>
<summary>18 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`

</details>

<details>
<summary>19 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/no-undefined-types`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-jsdoc`, `jsdoc/require-next-type`, `jsdoc/require-returns-check`, `jsdoc/require-throws-type`, `jsdoc/require-yields-check`, `jsdoc/require-yields-type`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`

</details>

### `jsdoc/recommended-tsdoc.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/recommended-tsdoc.json"
```

Extracted from `eslint-plugin-jsdoc@62.8.1`.

<details>
<summary>18 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`

</details>

<details>
<summary>16 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/no-types`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-jsdoc`, `jsdoc/require-returns-check`, `jsdoc/require-yields-check`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`

</details>

### `jsdoc/recommended-tsdoc-error.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/recommended-tsdoc-error.json"
```

Extracted from `eslint-plugin-jsdoc@62.8.1`.

<details>
<summary>18 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`

</details>

<details>
<summary>16 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/no-types`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-jsdoc`, `jsdoc/require-returns-check`, `jsdoc/require-yields-check`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`

</details>

### `jsdoc/recommended-typescript.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/recommended-typescript.json"
```

Extracted from `eslint-plugin-jsdoc@62.8.1`.

<details>
<summary>18 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`

</details>

<details>
<summary>19 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/no-types`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-jsdoc`, `jsdoc/require-next-type`, `jsdoc/require-returns-check`, `jsdoc/require-throws-type`, `jsdoc/require-yields-check`, `jsdoc/require-yields-type`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`

</details>

### `jsdoc/recommended-typescript-error.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/recommended-typescript-error.json"
```

Extracted from `eslint-plugin-jsdoc@62.8.1`.

<details>
<summary>18 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`

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

Extracted from `eslint-plugin-jsdoc@62.8.1`.

<details>
<summary>18 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`

</details>

<details>
<summary>18 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-jsdoc`, `jsdoc/require-next-type`, `jsdoc/require-returns-check`, `jsdoc/require-throws-type`, `jsdoc/require-yields-check`, `jsdoc/require-yields-type`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`

</details>

### `jsdoc/recommended-typescript-flavor-error.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/recommended-typescript-flavor-error.json"
```

Extracted from `eslint-plugin-jsdoc@62.8.1`.

<details>
<summary>18 rules successfully migrated</summary>

`jsdoc/check-access`, `jsdoc/check-property-names`, `jsdoc/check-tag-names`, `jsdoc/empty-tags`, `jsdoc/implements-on-classes`, `jsdoc/no-defaults`, `jsdoc/require-param`, `jsdoc/require-param-description`, `jsdoc/require-param-name`, `jsdoc/require-param-type`, `jsdoc/require-property`, `jsdoc/require-property-description`, `jsdoc/require-property-name`, `jsdoc/require-property-type`, `jsdoc/require-returns`, `jsdoc/require-returns-description`, `jsdoc/require-returns-type`, `jsdoc/require-yields`

</details>

<details>
<summary>18 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jsdoc/check-alignment`, `jsdoc/check-param-names`, `jsdoc/check-types`, `jsdoc/check-values`, `jsdoc/escape-inline-tags`, `jsdoc/multiline-blocks`, `jsdoc/no-multi-asterisks`, `jsdoc/reject-any-type`, `jsdoc/reject-function-type`, `jsdoc/require-jsdoc`, `jsdoc/require-next-type`, `jsdoc/require-returns-check`, `jsdoc/require-throws-type`, `jsdoc/require-yields-check`, `jsdoc/require-yields-type`, `jsdoc/tag-lines`, `jsdoc/ts-no-empty-object-type`, `jsdoc/valid-types`

</details>

### `jsdoc/default-expressions.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/default-expressions.json"
```

Extracted from `eslint-plugin-jsdoc@62.8.1`.

<details>
<summary>4 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`quotes`, `semi`

**Require JS plugin support**

`@stylistic/quotes`, `@stylistic/semi`

</details>

### `jsdoc/examples.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/examples.json"
```

Extracted from `eslint-plugin-jsdoc@62.8.1`.

### `jsdoc/examples-and-default-expressions.json`

```json
"./node_modules/oxlint-config-presets/jsdoc/examples-and-default-expressions.json"
```

Extracted from `eslint-plugin-jsdoc@62.8.1`.

<details>
<summary>4 rules have no oxlint equivalent</summary>

**Not portable to oxlint**

`quotes`, `semi`

**Require JS plugin support**

`@stylistic/quotes`, `@stylistic/semi`

</details>

### `jsx-a11y/recommended.json`

```json
"./node_modules/oxlint-config-presets/jsx-a11y/recommended.json"
```

Extracted from `eslint-plugin-jsx-a11y@6.10.2`.

<details>
<summary>28 rules successfully migrated</summary>

`jsx-a11y/alt-text`, `jsx-a11y/anchor-ambiguous-text`, `jsx-a11y/anchor-has-content`, `jsx-a11y/anchor-is-valid`, `jsx-a11y/aria-activedescendant-has-tabindex`, `jsx-a11y/aria-props`, `jsx-a11y/aria-proptypes`, `jsx-a11y/aria-role`, `jsx-a11y/aria-unsupported-elements`, `jsx-a11y/autocomplete-valid`, `jsx-a11y/click-events-have-key-events`, `jsx-a11y/heading-has-content`, `jsx-a11y/html-has-lang`, `jsx-a11y/iframe-has-title`, `jsx-a11y/img-redundant-alt`, `jsx-a11y/label-has-associated-control`, `jsx-a11y/media-has-caption`, `jsx-a11y/mouse-events-have-key-events`, `jsx-a11y/no-access-key`, `jsx-a11y/no-autofocus`, `jsx-a11y/no-distracting-elements`, `jsx-a11y/no-noninteractive-tabindex`, `jsx-a11y/no-redundant-roles`, `jsx-a11y/no-static-element-interactions`, `jsx-a11y/role-has-required-aria-props`, `jsx-a11y/role-supports-aria-props`, `jsx-a11y/scope`, `jsx-a11y/tabindex-no-positive`

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

Extracted from `eslint-plugin-jsx-a11y@6.10.2`.

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

Extracted from `eslint-plugin-n@17.24.0`.

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

Extracted from `eslint-plugin-n@17.24.0`.

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

Extracted from `eslint-plugin-n@17.24.0`.

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

Extracted from `eslint-plugin-promise@7.2.1`.

<details>
<summary>11 rules successfully migrated</summary>

`promise/always-return`, `promise/no-return-wrap`, `promise/param-names`, `promise/catch-or-return`, `promise/no-nesting`, `promise/no-promise-in-callback`, `promise/no-callback-in-promise`, `promise/avoid-new`, `promise/no-new-statics`, `promise/no-return-in-finally`, `promise/valid-params`

</details>

### `jest/recommended.json`

```json
"./node_modules/oxlint-config-presets/jest/recommended.json"
```

Extracted from `eslint-plugin-jest@28.14.0`.

<details>
<summary>18 rules successfully migrated</summary>

`jest/expect-expect`, `jest/no-alias-methods`, `jest/no-commented-out-tests`, `jest/no-conditional-expect`, `jest/no-deprecated-functions`, `jest/no-disabled-tests`, `jest/no-done-callback`, `jest/no-export`, `jest/no-focused-tests`, `jest/no-identical-title`, `jest/no-interpolation-in-snapshots`, `jest/no-jasmine-globals`, `jest/no-mocks-import`, `jest/no-standalone-expect`, `jest/no-test-prefixes`, `jest/valid-describe-callback`, `jest/valid-expect`, `jest/valid-title`

</details>

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jest/valid-expect-in-promise`

</details>

### `jest/all.json`

```json
"./node_modules/oxlint-config-presets/jest/all.json"
```

Extracted from `eslint-plugin-jest@28.14.0`.

<details>
<summary>52 rules successfully migrated</summary>

`jest/consistent-test-it`, `jest/expect-expect`, `jest/max-expects`, `jest/max-nested-describe`, `jest/no-alias-methods`, `jest/no-commented-out-tests`, `jest/no-conditional-expect`, `jest/no-conditional-in-test`, `jest/no-confusing-set-timeout`, `jest/no-deprecated-functions`, `jest/no-disabled-tests`, `jest/no-done-callback`, `jest/no-duplicate-hooks`, `jest/no-export`, `jest/no-focused-tests`, `jest/no-hooks`, `jest/no-identical-title`, `jest/no-interpolation-in-snapshots`, `jest/no-jasmine-globals`, `jest/no-large-snapshots`, `jest/no-mocks-import`, `jest/no-restricted-jest-methods`, `jest/no-restricted-matchers`, `jest/no-standalone-expect`, `jest/no-test-prefixes`, `jest/no-test-return-statement`, `jest/no-untyped-mock-factory`, `jest/padding-around-after-all-blocks`, `jest/padding-around-test-blocks`, `jest/prefer-called-with`, `jest/prefer-comparison-matcher`, `jest/prefer-each`, `jest/prefer-equality-matcher`, `jest/prefer-expect-resolves`, `jest/prefer-hooks-in-order`, `jest/prefer-hooks-on-top`, `jest/prefer-jest-mocked`, `jest/prefer-lowercase-title`, `jest/prefer-mock-promise-shorthand`, `jest/prefer-snapshot-hint`, `jest/prefer-spy-on`, `jest/prefer-strict-equal`, `jest/prefer-to-be`, `jest/prefer-to-contain`, `jest/prefer-to-have-length`, `jest/prefer-todo`, `jest/require-hook`, `jest/require-to-throw-message`, `jest/require-top-level-describe`, `jest/valid-describe-callback`, `jest/valid-expect`, `jest/valid-title`

</details>

<details>
<summary>11 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`jest/padding-around-after-each-blocks`, `jest/padding-around-all`, `jest/padding-around-before-all-blocks`, `jest/padding-around-before-each-blocks`, `jest/padding-around-describe-blocks`, `jest/padding-around-expect-groups`, `jest/prefer-ending-with-an-expect`, `jest/prefer-expect-assertions`, `jest/prefer-importing-jest-globals`, `jest/valid-expect-in-promise`

**Not portable to oxlint**

`jest/unbound-method`

</details>

### `jest/style.json`

```json
"./node_modules/oxlint-config-presets/jest/style.json"
```

Extracted from `eslint-plugin-jest@28.14.0`.

<details>
<summary>4 rules successfully migrated</summary>

`jest/no-alias-methods`, `jest/prefer-to-be`, `jest/prefer-to-contain`, `jest/prefer-to-have-length`

</details>

### `@vitest/recommended.json`

```json
"./node_modules/oxlint-config-presets/@vitest/recommended.json"
```

Extracted from `@vitest/eslint-plugin@1.6.13`.

<details>
<summary>16 rules successfully migrated</summary>

`vitest/expect-expect`, `vitest/no-commented-out-tests`, `vitest/no-conditional-expect`, `vitest/no-disabled-tests`, `vitest/no-focused-tests`, `vitest/no-identical-title`, `vitest/no-import-node-test`, `vitest/no-interpolation-in-snapshots`, `vitest/no-mocks-import`, `vitest/no-standalone-expect`, `vitest/no-unneeded-async-expect-function`, `vitest/prefer-called-exactly-once-with`, `vitest/require-local-test-context-for-concurrent-snapshots`, `vitest/valid-describe-callback`, `vitest/valid-expect`, `vitest/valid-title`

</details>

<details>
<summary>1 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vitest/valid-expect-in-promise`

</details>

### `@vitest/all.json`

```json
"./node_modules/oxlint-config-presets/@vitest/all.json"
```

Extracted from `@vitest/eslint-plugin@1.6.13`.

<details>
<summary>66 rules successfully migrated</summary>

`vitest/consistent-each-for`, `vitest/consistent-test-filename`, `vitest/consistent-test-it`, `vitest/consistent-vitest-vi`, `vitest/expect-expect`, `vitest/hoisted-apis-on-top`, `vitest/max-expects`, `vitest/max-nested-describe`, `vitest/no-alias-methods`, `vitest/no-commented-out-tests`, `vitest/no-conditional-expect`, `vitest/no-conditional-in-test`, `vitest/no-conditional-tests`, `vitest/no-disabled-tests`, `vitest/no-duplicate-hooks`, `vitest/no-focused-tests`, `vitest/no-hooks`, `vitest/no-identical-title`, `vitest/no-import-node-test`, `vitest/no-importing-vitest-globals`, `vitest/no-interpolation-in-snapshots`, `vitest/no-large-snapshots`, `vitest/no-mocks-import`, `vitest/no-restricted-matchers`, `vitest/no-standalone-expect`, `vitest/no-test-prefixes`, `vitest/no-test-return-statement`, `vitest/no-unneeded-async-expect-function`, `vitest/prefer-called-exactly-once-with`, `vitest/prefer-called-once`, `vitest/prefer-called-times`, `vitest/prefer-called-with`, `vitest/prefer-comparison-matcher`, `vitest/prefer-describe-function-title`, `vitest/prefer-each`, `vitest/prefer-equality-matcher`, `vitest/prefer-expect-resolves`, `vitest/prefer-expect-type-of`, `vitest/prefer-hooks-in-order`, `vitest/prefer-hooks-on-top`, `vitest/prefer-import-in-mock`, `vitest/prefer-importing-vitest-globals`, `vitest/prefer-lowercase-title`, `vitest/prefer-mock-promise-shorthand`, `vitest/prefer-snapshot-hint`, `vitest/prefer-spy-on`, `vitest/prefer-strict-boolean-matchers`, `vitest/prefer-strict-equal`, `vitest/prefer-to-be-falsy`, `vitest/prefer-to-be-object`, `vitest/prefer-to-be-truthy`, `vitest/prefer-to-be`, `vitest/prefer-to-contain`, `vitest/prefer-to-have-been-called-times`, `vitest/prefer-to-have-length`, `vitest/prefer-todo`, `vitest/require-awaited-expect-poll`, `vitest/require-hook`, `vitest/require-local-test-context-for-concurrent-snapshots`, `vitest/require-mock-type-parameters`, `vitest/require-test-timeout`, `vitest/require-to-throw-message`, `vitest/require-top-level-describe`, `vitest/valid-describe-callback`, `vitest/valid-expect`, `vitest/valid-title`

</details>

<details>
<summary>13 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vitest/no-restricted-vi-methods`, `vitest/padding-around-after-all-blocks`, `vitest/padding-around-after-each-blocks`, `vitest/padding-around-all`, `vitest/padding-around-before-all-blocks`, `vitest/padding-around-before-each-blocks`, `vitest/padding-around-describe-blocks`, `vitest/padding-around-expect-groups`, `vitest/padding-around-test-blocks`, `vitest/prefer-expect-assertions`, `vitest/valid-expect-in-promise`

**Not portable to oxlint**

`vitest/prefer-vi-mocked`, `vitest/unbound-method`

</details>

### `vue/recommended.json`

```json
"./node_modules/oxlint-config-presets/vue/recommended.json"
```

Extracted from `eslint-plugin-vue@10.8.0`.

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

### `vue/recommended-error.json`

```json
"./node_modules/oxlint-config-presets/vue/recommended-error.json"
```

Extracted from `eslint-plugin-vue@10.8.0`.

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

### `vue/essential.json`

```json
"./node_modules/oxlint-config-presets/vue/essential.json"
```

Extracted from `eslint-plugin-vue@10.8.0`.

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

Extracted from `eslint-plugin-vue@10.8.0`.

<details>
<summary>25 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vue/component-definition-name-casing`, `vue/one-component-per-file`, `vue/prop-name-casing`, `vue/require-default-prop`, `vue/require-prop-types`

**Not portable to oxlint**

`vue/attribute-hyphenation`, `vue/first-attribute-linebreak`, `vue/html-closing-bracket-newline`, `vue/html-closing-bracket-spacing`, `vue/html-end-tags`, `vue/html-indent`, `vue/html-quotes`, `vue/html-self-closing`, `vue/max-attributes-per-line`, `vue/multiline-html-element-content-newline`, `vue/mustache-interpolation-spacing`, `vue/no-multi-spaces`, `vue/no-spaces-around-equal-signs-in-attribute`, `vue/no-template-shadow`, `vue/require-explicit-emits`, `vue/singleline-html-element-content-newline`, `vue/v-bind-style`, `vue/v-on-event-hyphenation`, `vue/v-on-style`, `vue/v-slot-style`

</details>

### `vue/strongly-recommended-error.json`

```json
"./node_modules/oxlint-config-presets/vue/strongly-recommended-error.json"
```

Extracted from `eslint-plugin-vue@10.8.0`.

<details>
<summary>25 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vue/component-definition-name-casing`, `vue/one-component-per-file`, `vue/prop-name-casing`, `vue/require-default-prop`, `vue/require-prop-types`

**Not portable to oxlint**

`vue/attribute-hyphenation`, `vue/first-attribute-linebreak`, `vue/html-closing-bracket-newline`, `vue/html-closing-bracket-spacing`, `vue/html-end-tags`, `vue/html-indent`, `vue/html-quotes`, `vue/html-self-closing`, `vue/max-attributes-per-line`, `vue/multiline-html-element-content-newline`, `vue/mustache-interpolation-spacing`, `vue/no-multi-spaces`, `vue/no-spaces-around-equal-signs-in-attribute`, `vue/no-template-shadow`, `vue/require-explicit-emits`, `vue/singleline-html-element-content-newline`, `vue/v-bind-style`, `vue/v-on-event-hyphenation`, `vue/v-on-style`, `vue/v-slot-style`

</details>

### `vue/vue2-essential.json`

```json
"./node_modules/oxlint-config-presets/vue/vue2-essential.json"
```

Extracted from `eslint-plugin-vue@10.8.0`.

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

### `vue/vue2-recommended.json`

```json
"./node_modules/oxlint-config-presets/vue/vue2-recommended.json"
```

Extracted from `eslint-plugin-vue@10.8.0`.

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

### `vue/vue2-recommended-error.json`

```json
"./node_modules/oxlint-config-presets/vue/vue2-recommended-error.json"
```

Extracted from `eslint-plugin-vue@10.8.0`.

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

### `vue/vue2-strongly-recommended.json`

```json
"./node_modules/oxlint-config-presets/vue/vue2-strongly-recommended.json"
```

Extracted from `eslint-plugin-vue@10.8.0`.

<details>
<summary>23 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vue/component-definition-name-casing`, `vue/one-component-per-file`, `vue/prop-name-casing`, `vue/require-default-prop`, `vue/require-prop-types`

**Not portable to oxlint**

`vue/attribute-hyphenation`, `vue/first-attribute-linebreak`, `vue/html-closing-bracket-newline`, `vue/html-closing-bracket-spacing`, `vue/html-end-tags`, `vue/html-indent`, `vue/html-quotes`, `vue/html-self-closing`, `vue/max-attributes-per-line`, `vue/multiline-html-element-content-newline`, `vue/mustache-interpolation-spacing`, `vue/no-multi-spaces`, `vue/no-spaces-around-equal-signs-in-attribute`, `vue/no-template-shadow`, `vue/singleline-html-element-content-newline`, `vue/v-bind-style`, `vue/v-on-style`, `vue/v-slot-style`

</details>

### `vue/vue2-strongly-recommended-error.json`

```json
"./node_modules/oxlint-config-presets/vue/vue2-strongly-recommended-error.json"
```

Extracted from `eslint-plugin-vue@10.8.0`.

<details>
<summary>23 rules have no oxlint equivalent</summary>

**Not yet implemented in oxlint**

`vue/component-definition-name-casing`, `vue/one-component-per-file`, `vue/prop-name-casing`, `vue/require-default-prop`, `vue/require-prop-types`

**Not portable to oxlint**

`vue/attribute-hyphenation`, `vue/first-attribute-linebreak`, `vue/html-closing-bracket-newline`, `vue/html-closing-bracket-spacing`, `vue/html-end-tags`, `vue/html-indent`, `vue/html-quotes`, `vue/html-self-closing`, `vue/max-attributes-per-line`, `vue/multiline-html-element-content-newline`, `vue/mustache-interpolation-spacing`, `vue/no-multi-spaces`, `vue/no-spaces-around-equal-signs-in-attribute`, `vue/no-template-shadow`, `vue/singleline-html-element-content-newline`, `vue/v-bind-style`, `vue/v-on-style`, `vue/v-slot-style`

</details>

<!-- GENERATED CONFIGS END -->
