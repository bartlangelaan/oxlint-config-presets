import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import rulesJson from '@/data/rules.json';
import pluginsJson from '@/data/plugins.json';
import configsJson from '@/data/configs.json';
import migrationHistoryJson from '@/data/migration-history.json';

const configsDir = join(process.cwd(), '..', 'packages/oxlint-config-presets/configs');

export interface PresetRuleEntry {
  config: string;
  severity: string;
  /** Options configured after the severity, if any, e.g. [{ allowConstantExport: true }]. */
  options: unknown[] | null;
}

/**
 * Next.js reserves a leading `@` in a URL segment for parallel routes, even
 * inside a catch-all route, so scoped-package config paths like
 * "@eslint/recommended.json" 404 if used verbatim. Encode/decode consistently
 * wherever a /configs/... link is built. "_" doesn't collide with any
 * existing (unscoped) config directory name.
 */
export function configPathToSlug(path: string): string[] {
  return path
    .replace(/\.json$/, '')
    .split('/')
    .map((segment) => (segment.startsWith('@') ? `_${segment.slice(1)}` : segment));
}

export function slugToConfigPath(slug: string[]): string {
  return (
    slug.map((segment) => (segment.startsWith('_') ? `@${segment.slice(1)}` : segment)).join('/') +
    '.json'
  );
}

export function configHref(path: string): string {
  return `/configs/${configPathToSlug(path).join('/')}`;
}

/**
 * Four buckets, matching how the target for "full migration" should be read:
 *  - migrated: oxlint implements it today. The goal.
 *  - not-implemented: a valid rule oxlint hasn't ported yet. Part of the target.
 *  - needs-js-plugin: portable, but only via oxlint's JS plugin bridge rather
 *    than a native Rust port. Still part of the target, different mechanism.
 *  - not-portable: oxlint has decided this will never be ported. EXCLUDED from
 *    the target — "fully migrated" never includes these.
 */
export type MigrationStatus = 'migrated' | 'not-implemented' | 'needs-js-plugin' | 'not-portable';
export type FixStatus = 'implemented' | 'planned' | 'none';

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
    migrationStatus: MigrationStatus;
    reason: string | null;
    category: string | null;
    nursery: boolean;
    typeAware: boolean;
    fixStatus: FixStatus | null;
    default: boolean | null;
    docsUrl: string | null;
    /** True for rules native to oxlint with no ESLint equivalent (the `oxc` scope). */
    original: boolean;
    /** Canonical "<prefix>/<name>" key for this rule in an .oxlintrc.json `rules` object. */
    configKey: string;
  };
  presets: PresetRuleEntry[];
}

export interface Stats {
  label: string;
  total: number;
  migrated: number;
  notImplemented: number;
  needsJsPlugin: number;
  notPortable: number;
  eligible: number;
  nursery: number;
  typeAware: number;
  fixImplemented: number;
  fixPlanned: number;
  fixNone: number;
  deprecated: number;
}

export interface PluginSummary extends Stats {
  id: string;
  oxlintScope: string;
  sourcePackages: string[];
  /** True for the synthetic "Oxlint original" bucket (rules with no ESLint equivalent). */
  original: boolean;
}

export interface ConfigSummary {
  path: string;
  ruleCount: number;
}

export interface MigrationScopeSample {
  total: number;
  /** Rules with no pending ("planned but not implemented") autofix at this release. */
  fullyMigrated: number;
}

export interface MigrationSample {
  version: string;
  date: string;
  totalImplemented: number;
  /** Rules with no pending autofix at this release (a subset of totalImplemented). */
  fullyMigrated: number;
  byScope: Record<string, MigrationScopeSample>;
}

const rules = rulesJson as Rule[];

interface PluginsData extends Stats {
  generatedAt: string;
  oxlintVersion: string;
  plugins: PluginSummary[];
}

interface ConfigsData {
  generatedAt: string;
  configs: ConfigSummary[];
}

interface MigrationHistoryData {
  generatedAt: string;
  totalEligibleNow: number | null;
  samples: MigrationSample[];
}

const pluginsData: PluginsData = pluginsJson;
const configsData: ConfigsData = configsJson;
const migrationHistoryData = migrationHistoryJson as MigrationHistoryData;

export function getAllRules(): Rule[] {
  return rules;
}

export function getRuleById(id: string): Rule | undefined {
  return rules.find((r) => r.id === id);
}

export function getRulesByPlugin(pluginId: string): Rule[] {
  return rules.filter((r) => r.plugin === pluginId);
}

export function getSummary(): Stats & { generatedAt: string; oxlintVersion: string } {
  const { plugins: _plugins, ...stats } = pluginsData;
  void _plugins;
  return stats;
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

/** Raw JSON source of a generated preset, read straight from oxlint-config-presets/configs. */
export function getConfigSource(path: string): string | null {
  try {
    return readFileSync(join(configsDir, path), 'utf-8');
  } catch {
    return null;
  }
}

export function getRulesForConfig(path: string): { rule: Rule; severity: string; options: unknown[] | null }[] {
  const out: { rule: Rule; severity: string; options: unknown[] | null }[] = [];
  for (const rule of rules) {
    const entry = rule.presets.find((p) => p.config === path);
    if (entry) out.push({ rule, severity: entry.severity, options: entry.options });
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
  migrationStatus: MigrationStatus;
  reason: string | null;
  deprecated: boolean;
  recommended: boolean;
  category: string | null;
  nursery: boolean;
  typeAware: boolean;
  fixStatus: FixStatus | null;
  original: boolean;
  presetCount: number;
}

export function getRuleListItems(): RuleListItem[] {
  return rules.map((r) => ({
    id: r.id,
    plugin: r.plugin,
    pluginLabel: r.pluginLabel,
    name: r.name,
    migrationStatus: r.oxlint.migrationStatus,
    reason: r.oxlint.reason,
    deprecated: r.eslint.deprecated,
    recommended: r.eslint.recommended,
    category: r.oxlint.category,
    nursery: r.oxlint.nursery,
    typeAware: r.oxlint.typeAware,
    fixStatus: r.oxlint.fixStatus,
    original: r.oxlint.original,
    presetCount: r.presets.length,
  }));
}
