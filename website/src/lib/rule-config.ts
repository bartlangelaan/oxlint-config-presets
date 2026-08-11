/** The JSON value a rule takes in an .oxlintrc.json `rules` object: just the severity, or [severity, ...options]. */
export function ruleValue(severity: string, options: unknown[] | null): unknown {
  return options && options.length > 0 ? [severity, ...options] : severity;
}

/** Compact one-line-if-possible rendering of a rule's configured value, e.g. `"error"` or `["error", {...}]`. */
export function formatRuleValue(severity: string, options: unknown[] | null): string {
  return JSON.stringify(ruleValue(severity, options));
}

/** A full `.oxlintrc.json` snippet enabling/disabling a single rule, pretty-printed. */
export function formatRuleSnippet(
  configKey: string,
  severity: string,
  options: unknown[] | null = null,
): string {
  return JSON.stringify({ rules: { [configKey]: ruleValue(severity, options) } }, null, 2);
}

/** A `.oxlintrc.json` snippet enabling/disabling every rule in a category. */
export function formatCategorySnippet(category: string, severity: string): string {
  return JSON.stringify({ categories: { [category]: severity } }, null, 2);
}

/** An `"extends"` snippet for a config preset. */
export function formatExtendsSnippet(configPath: string): string {
  return JSON.stringify({ extends: [`oxlint-config-presets/${configPath}`] }, null, 2);
}
