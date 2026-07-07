import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import migrate from '@oxlint/migrate';

const rootDir = join(fileURLToPath(new URL('.', import.meta.url)), '..');

const ruleRenames = JSON.parse(
  readFileSync(join(rootDir, 'scripts/rule-renames.json'), 'utf-8'),
) as Record<string, string>;

const configurationSchema = JSON.parse(
  readFileSync(join(rootDir, 'node_modules/oxlint/configuration_schema.json'), 'utf-8'),
) as { definitions: { DummyRuleMap: { properties: Record<string, unknown> } } };

const oxlintRuleNames = new Set(
  Object.keys(configurationSchema.definitions.DummyRuleMap.properties),
);

for (const [eslintRuleName, oxlintRuleName] of Object.entries(ruleRenames)) {
  test(`${eslintRuleName} -> ${oxlintRuleName}: target rule exists in oxlint`, () => {
    assert.ok(
      oxlintRuleNames.has(oxlintRuleName),
      `Expected "${oxlintRuleName}" to be a real oxlint rule (mapped from "${eslintRuleName}").`,
    );
  });

  test(`${eslintRuleName} -> ${oxlintRuleName}: source rule does not exist in oxlint under its eslint name`, () => {
    assert.ok(
      !oxlintRuleNames.has(eslintRuleName),
      `"${eslintRuleName}" exists in oxlint under its own name, so it does not need a rename mapping.`,
    );
  });
}

test('@oxlint/migrate applies the rule-renames mapping', async () => {
  const eslintConfig = {
    rules: Object.fromEntries(Object.keys(ruleRenames).map((rule) => [rule, 'error'])),
  };

  const result = await migrate([eslintConfig], undefined, { withNursery: true, typeAware: true });

  for (const [eslintRuleName, oxlintRuleName] of Object.entries(ruleRenames)) {
    assert.equal(
      result.rules?.[oxlintRuleName],
      'error',
      `Expected migrated config to enable "${oxlintRuleName}" for "${eslintRuleName}".`,
    );
    assert.ok(
      !(eslintRuleName in (result.rules ?? {})),
      `Migrated config should not contain the unmapped eslint rule name "${eslintRuleName}".`,
    );
  }
});
