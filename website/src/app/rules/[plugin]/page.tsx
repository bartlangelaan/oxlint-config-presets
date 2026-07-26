import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LineChart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { RulesExplorer } from '@/components/rules-explorer';
import { SetBreadcrumb } from '@/components/breadcrumb-context';
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
  const pct = plugin.eligible > 0 ? Math.round((plugin.migrated / plugin.eligible) * 100) : 0;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 md:p-8">
      <SetBreadcrumb items={[{ label: 'All rules', href: '/rules' }, { label: plugin.label }]} />
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">{plugin.label}</h1>
          {plugin.original ? (
            <Badge variant="outline" className="font-mono">
              {plugin.total} rules, no ESLint equivalent
            </Badge>
          ) : (
            <>
              <Badge variant="outline" className="font-mono">
                {plugin.migrated}/{plugin.eligible} target · {pct}%
              </Badge>
              {plugin.notPortable > 0 ? (
                <Badge variant="outline" className="text-muted-foreground">
                  {plugin.notPortable} not portable (of {plugin.total} total)
                </Badge>
              ) : null}
            </>
          )}
        </div>
        <p className="text-muted-foreground max-w-2xl">
          {plugin.original ? (
            <>
              Rules oxlint invented itself — no source ESLint plugin, nothing to migrate. They use
              its <code className="bg-muted rounded px-1 py-0.5">{plugin.oxlintScope}</code> scope.
            </>
          ) : (
            <>
              Source: {plugin.sourcePackages.map((s) => `\`${s}\``).join(', ')}. Rules oxlint has
              implemented use its <code className="bg-muted rounded px-1 py-0.5">{plugin.oxlintScope}</code>{' '}
              scope.
            </>
          )}
        </p>
        {!plugin.original ? (
          <Link
            href={`/progress/${plugin.id}`}
            className="text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-1.5 text-sm"
          >
            <LineChart className="size-3.5" /> View migration progress over time for {plugin.label}
          </Link>
        ) : null}
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
