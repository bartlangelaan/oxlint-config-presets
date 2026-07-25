import rulesJson from '@/data/rules.json';
import pluginsJson from '@/data/plugins.json';
import configsJson from '@/data/configs.json';
import migrationHistoryJson from '@/data/migration-history.json';

export interface PresetRuleEntry {
  config: string;
  severity: string;
}

export interface Rule {
  id: string;
  plugin: string;
  pluginLabel: string;
  name: string;
  eslint: {
    deprecated: boolean;
    recommended: boolean;
    description: string | null;
    docsUrl: string | null;
    type: string | null;
    fixable: boolean;
  };
  oxlint: {
    migrated: boolean;
    category: string | null;
    default: boolean | null;
    fix: string | null;
    docsUrl: string | null;
    skipReason: string | null;
  };
  presets: PresetRuleEntry[];
}

export interface PluginSummary {
  id: string;
  label: string;
  oxlintScope: string;
  sourcePackages: string[];
  total: number;
  migrated: number;
  deprecated: number;
}

export interface ConfigSummary {
  path: string;
  ruleCount: number;
}

export interface MigrationSample {
  version: string;
  date: string;
  totalImplemented: number;
  byScope: Record<string, number>;
}

const rules = rulesJson as Rule[];

const pluginsData = pluginsJson as {
  generatedAt: string;
  oxlintVersion: string;
  totalRules: number;
  totalMigrated: number;
  plugins: PluginSummary[];
};

const configsData = configsJson as {
  generatedAt: string;
  configs: ConfigSummary[];
};

const migrationHistoryData = migrationHistoryJson as {
  generatedAt: string;
  totalEslintRulesNow: number | null;
  samples: MigrationSample[];
};

export function getAllRules(): Rule[] {
  return rules;
}

export function getRuleById(id: string): Rule | undefined {
  return rules.find((r) => r.id === id);
}

export function getRulesByPlugin(pluginId: string): Rule[] {
  return rules.filter((r) => r.plugin === pluginId);
}

export function getSummary() {
  return {
    generatedAt: pluginsData.generatedAt,
    oxlintVersion: pluginsData.oxlintVersion,
    totalRules: pluginsData.totalRules,
    totalMigrated: pluginsData.totalMigrated,
  };
}

export function getPlugins(): PluginSummary[] {
  return pluginsData.plugins;
}

export function getPlugin(id: string): PluginSummary | undefined {
  return pluginsData.plugins.find((p) => p.id === id);
}

export function getConfigs(): ConfigSummary[] {
  return configsData.configs;
}

export function getConfig(path: string): ConfigSummary | undefined {
  return configsData.configs.find((c) => c.path === path);
}

export function getRulesForConfig(path: string): { rule: Rule; severity: string }[] {
  const out: { rule: Rule; severity: string }[] = [];
  for (const rule of rules) {
    const entry = rule.presets.find((p) => p.config === path);
    if (entry) out.push({ rule, severity: entry.severity });
  }
  return out;
}

export function getMigrationHistory() {
  return migrationHistoryData;
}

/** Trimmed rule shape for shipping to client components (rules browser table). */
export interface RuleListItem {
  id: string;
  plugin: string;
  pluginLabel: string;
  name: string;
  migrated: boolean;
  deprecated: boolean;
  recommended: boolean;
  category: string | null;
  skipReason: string | null;
  presetCount: number;
}

export function getRuleListItems(): RuleListItem[] {
  return rules.map((r) => ({
    id: r.id,
    plugin: r.plugin,
    pluginLabel: r.pluginLabel,
    name: r.name,
    migrated: r.oxlint.migrated,
    deprecated: r.eslint.deprecated,
    recommended: r.eslint.recommended,
    category: r.oxlint.category,
    skipReason: r.oxlint.skipReason,
    presetCount: r.presets.length,
  }));
}
