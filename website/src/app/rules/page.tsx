import type { Metadata } from 'next';

import { RulesExplorer } from '@/components/rules-explorer';
import { SetBreadcrumb } from '@/components/breadcrumb-context';
import { getPlugins, getRuleListItems, getSummary } from '@/lib/data';

export const metadata: Metadata = {
  title: 'All rules',
  description: 'Browse every ESLint rule oxlint targets and whether it has an oxlint equivalent.',
};

export default function RulesPage() {
  const rules = getRuleListItems();
  const plugins = getPlugins().map((p) => ({ id: p.id, label: p.label }));
  const summary = getSummary();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 md:p-8">
      <SetBreadcrumb items={[{ label: 'All rules' }]} />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">All rules</h1>
        <p className="text-muted-foreground max-w-2xl">
          {summary.total.toLocaleString()} ESLint rules across {plugins.length} plugins.
          Search, filter by plugin or migration status, then open a rule to see exactly which
          oxlint-config-presets presets enable or disable it.
        </p>
      </div>
      <RulesExplorer rules={rules} plugins={plugins} />
    </div>
  );
}
