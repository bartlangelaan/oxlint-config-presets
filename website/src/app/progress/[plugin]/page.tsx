import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ListChecks } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MigrationLineChart } from '@/components/charts/migration-line-chart';
import { AutofixTiles, StatusTiles, TargetHeadline } from '@/components/status-breakdown';
import { getMigrationHistory, getPlugin, getPlugins } from '@/lib/data';

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
    title: plugin ? `${plugin.label} migration progress` : 'Unknown plugin',
    description: plugin
      ? `${plugin.migrated}/${plugin.eligible} ${plugin.label} rules migrated to oxlint.`
      : undefined,
  };
}

export default async function PluginProgressPage({
  params,
}: {
  params: Promise<{ plugin: string }>;
}) {
  const { plugin: pluginId } = await params;
  const plugin = getPlugin(pluginId);
  if (!plugin) notFound();

  const history = getMigrationHistory();
  const points = history.samples.map((s) => ({
    date: s.date,
    version: s.version,
    value: s.byScope[plugin.oxlintScope] ?? 0,
  }));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <Link href="/progress" className="text-muted-foreground text-sm hover:underline">
          Migration progress
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">{plugin.label}</h1>
          <Badge variant="outline" className="font-mono">
            {plugin.oxlintScope}
          </Badge>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Source: {plugin.sourcePackages.map((s) => `\`${s}\``).join(', ')}.
        </p>
        <Link
          href={`/rules/${plugin.id}`}
          className="text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-1.5 text-sm"
        >
          <ListChecks className="size-3.5" /> Browse {plugin.label} rules
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TargetHeadline stats={plugin} />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Status breakdown</h2>
        <StatusTiles stats={plugin} />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Autofix progress</h2>
        <AutofixTiles stats={plugin} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{plugin.label} rules implemented over time</CardTitle>
          <CardDescription>
            Every oxlint release ever published on npm, counting rules under the{' '}
            <code className="bg-muted rounded px-1 py-0.5">{plugin.oxlintScope}</code> scope. The
            dashed line marks today&apos;s target ({plugin.eligible} rules).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MigrationLineChart
            points={points}
            targetValue={plugin.eligible}
            targetLabel={`${plugin.eligible} rules (target)`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
