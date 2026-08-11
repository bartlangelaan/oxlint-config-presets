import type { Metadata } from 'next';
import Link from 'next/link';
import { LineChart } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MigrationLineChart } from '@/components/charts/migration-line-chart';
import { PluginProgressChart } from '@/components/charts/plugin-progress-chart';
import { AutofixTiles, StatusTiles, TargetHeadline } from '@/components/status-breakdown';
import { SetBreadcrumb } from '@/components/breadcrumb-context';
import { getMigrationHistory, getPlugins, getSummary } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Migration progress',
  description: 'Are we oxlint yet? Tracking ESLint rule migration progress over time.',
};

export default function ProgressPage() {
  const stats = getSummary();
  // "Oxlint original" isn't part of the ESLint migration target, so it's excluded here.
  const plugins = getPlugins()
    .filter((p) => !p.original)
    .sort((a, b) => b.eligible - a.eligible);
  const history = getMigrationHistory();
  const first = history.samples[0];
  const last = history.samples.at(-1);

  const points = history.samples.map((s) => ({
    date: s.date,
    version: s.version,
    value: s.totalImplemented,
    fullyMigrated: s.fullyMigrated,
  }));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 md:p-8">
      <SetBreadcrumb items={[{ label: 'Migration progress' }]} />
      <div className="flex flex-col gap-2">
        <Badge variant="outline" className="w-fit">
          Are we oxlint yet?
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">Migration progress</h1>
        <p className="text-muted-foreground max-w-3xl text-balance">
          The target is every ESLint rule oxlint <em>can or will</em> port — that excludes the{' '}
          {stats.notPortable.toLocaleString()} rules oxlint has explicitly decided not to port
          (superseded, covered by a type-aware equivalent, architecturally out of scope, …). Of the{' '}
          {stats.total.toLocaleString()} rules across 14 ESLint plugins, that leaves a target of{' '}
          {stats.eligible.toLocaleString()}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TargetHeadline stats={stats} />
        <Card>
          <CardHeader>
            <CardDescription>
              Since {first ? new Date(first.date).getFullYear() : ''}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              +{last && first ? last.totalImplemented - first.totalImplemented : 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              rules implemented since oxlint@{first?.version}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Current release</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              oxlint@{stats.oxlintVersion}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">{last?.totalImplemented} rules implemented</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Status breakdown</h2>
        <StatusTiles stats={stats} />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Autofix progress</h2>
        <p className="text-muted-foreground text-sm">
          Among migrated rules, how many have an autofix implemented, planned (oxlint&apos;s docs
          mark these 🚧), or none.
        </p>
        <AutofixTiles stats={stats} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implemented rules over time</CardTitle>
          <CardDescription>
            Every oxlint release ever published on npm. The top line is every rule migrated,
            including ones with a planned-but-not-implemented autofix; the bottom line is rules
            with nothing outstanding. The dashed line marks today&apos;s target (rules that are
            migrated, not-yet-implemented, or need a JS plugin — i.e. everything except &quot;not
            portable&quot;).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MigrationLineChart
            points={points}
            targetValue={history.target}
            targetLabel={history.target ? `${history.target} rules (target)` : undefined}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progress by plugin</CardTitle>
          <CardDescription>
            Migrated vs. remaining target rules, today. The faint trailing segment is rules marked
            not portable (excluded from the target).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PluginProgressChart plugins={plugins} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All plugins</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plugin</TableHead>
                <TableHead className="text-right">Migrated</TableHead>
                <TableHead className="text-right">Target</TableHead>
                <TableHead className="hidden text-right sm:table-cell">Not portable</TableHead>
                <TableHead className="text-right">Progress</TableHead>
                <TableHead className="hidden text-right md:table-cell">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plugins.map((p) => {
                const pluginPct = p.eligible > 0 ? Math.round((p.migrated / p.eligible) * 100) : 0;
                return (
                  <TableRow key={p.id}>
                    <TableCell>
                      <Link href={`/rules/${p.id}`} className="font-medium hover:underline">
                        {p.label}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{p.migrated}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{p.eligible}</TableCell>
                    <TableCell className="text-muted-foreground hidden text-right font-mono tabular-nums sm:table-cell">
                      {p.notPortable}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
                          <div
                            className="bg-brand h-full rounded-full"
                            style={{ width: `${pluginPct}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground w-10 text-right font-mono text-xs tabular-nums">
                          {pluginPct}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-right md:table-cell">
                      <Link
                        href={`/progress/${p.id}`}
                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs"
                      >
                        <LineChart className="size-3.5" /> View
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-xs">
        Methodology: rule counts come straight from{' '}
        <code className="bg-muted rounded px-1 py-0.5">oxlint --rules --format json</code>,
        cross-referenced against each ESLint plugin&apos;s own rule registry using the same logic
        as oxc&apos;s{' '}
        <a
          className="underline underline-offset-2"
          href="https://github.com/oxc-project/oxc/blob/main/tasks/lint_rules/src/eslint-rules.mjs"
          target="_blank"
          rel="noreferrer"
        >
          tasks/lint_rules
        </a>{' '}
        scripts, plus <code className="bg-muted rounded px-1 py-0.5">@oxlint/migrate</code>&apos;s
        skip-reason reporter to tell &quot;not yet implemented&quot; apart from &quot;not
        portable&quot;. The historical chart counts oxlint&apos;s own implemented-rule total at
        each release (a purely oxlint-side number); today&apos;s status breakdown additionally
        classifies rules oxlint has decided not to port, which the historical series can&apos;t do
        retroactively without re-running that classification at every past release.
      </p>
    </div>
  );
}
