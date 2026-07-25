import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { RulesExplorer } from '@/components/rules-explorer';
import { getPlugin, getPlugins, getRuleListItems } from '@/lib/data';

export function generateStaticParams() {
  return getPlugins().map((p) => ({ plugin: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plugin: string }>;
}): Promise<Metadata> {
  const { plugin: pluginId } = await params;
  const plugin = getPlugin(pluginId);
  return {
    title: plugin ? plugin.label : 'Unknown plugin',
    description: plugin
      ? `${plugin.migrated}/${plugin.total} ${plugin.label} rules have an oxlint equivalent.`
      : undefined,
  };
}

export default async function PluginRulesPage({
  params,
}: {
  params: Promise<{ plugin: string }>;
}) {
  const { plugin: pluginId } = await params;
  const plugin = getPlugin(pluginId);
  if (!plugin) notFound();

  const rules = getRuleListItems();
  const plugins = getPlugins().map((p) => ({ id: p.id, label: p.label }));
  const pct = Math.round((plugin.migrated / plugin.total) * 100);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">{plugin.label}</h1>
          <Badge variant="outline" className="font-mono">
            {plugin.migrated}/{plugin.total} · {pct}%
          </Badge>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Source: {plugin.sourcePackages.map((s) => `\`${s}\``).join(', ')}. Rules oxlint has
          implemented use its <code className="bg-muted rounded px-1 py-0.5">{plugin.oxlintScope}</code>{' '}
          scope.
        </p>
      </div>
      <RulesExplorer
        rules={rules}
        plugins={plugins}
        defaultPlugin={plugin.id}
        showPluginFilter={false}
      />
    </div>
  );
}
