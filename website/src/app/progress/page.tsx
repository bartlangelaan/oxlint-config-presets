import type { Metadata } from 'next';
import Link from 'next/link';

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
import { getMigrationHistory, getPlugins, getSummary } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Migration progress',
  description: 'Are we oxlint yet? Tracking ESLint rule migration progress over time.',
};

export default function ProgressPage() {
  const summary = getSummary();
  const plugins = getPlugins().slice().sort((a, b) => b.total - a.total);
  const history = getMigrationHistory();
  const first = history.samples[0];
  const last = history.samples.at(-1);
  const pct = ((summary.totalMigrated / summary.totalRules) * 100).toFixed(1);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <Badge variant="outline" className="w-fit">
          Are we oxlint yet?
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">Migration progress</h1>
        <p className="text-muted-foreground max-w-3xl text-balance">
          oxlint reimplements ESLint&apos;s most-used rules in Rust. This page tracks how many of
          the {summary.totalRules.toLocaleString()} rules across 14 ESLint plugins now have an
          oxlint equivalent, sampled monthly from every oxlint release published on npm since{' '}
          {first ? new Date(first.date).toLocaleDateString('en-US', { dateStyle: 'medium' }) : '2023'}
          .
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Rules migrated today</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              {summary.totalMigrated.toLocaleString()} / {summary.totalRules.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">{pct}% of the ESLint ecosystem</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Since {first ? new Date(first.date).getFullYear() : ''}</CardDescription>
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
              oxlint@{summary.oxlintVersion}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">{last?.totalImplemented} rules implemented</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implemented rules over time</CardTitle>
          <CardDescription>
            One sample per month (the latest release published that month). The dashed line marks
            today&apos;s total ESLint rule count across all 14 tracked plugins.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MigrationLineChart samples={history.samples} totalEslintRulesNow={history.totalEslintRulesNow} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progress by plugin</CardTitle>
          <CardDescription>Migrated vs. remaining rules, today.</CardDescription>
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
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plugins.map((p) => {
                const pluginPct = Math.round((p.migrated / p.total) * 100);
                return (
                  <TableRow key={p.id}>
                    <TableCell>
                      <Link href={`/rules/${p.id}`} className="font-medium hover:underline">
                        {p.label}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{p.migrated}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums">{p.total}</TableCell>
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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-xs">
        Methodology: rule counts come straight from{' '}
        <code className="bg-muted rounded px-1 py-0.5">oxlint --rules --format json</code> at each
        sampled release, cross-referenced against each ESLint plugin&apos;s own rule registry using
        the same logic as oxc&apos;s{' '}
        <a
          className="underline underline-offset-2"
          href="https://github.com/oxc-project/oxc/blob/main/tasks/lint_rules/src/eslint-rules.mjs"
          target="_blank"
          rel="noreferrer"
        >
          tasks/lint_rules
        </a>{' '}
        scripts. The historical line counts oxlint&apos;s own implemented-rule total at each
        release; today&apos;s headline number additionally credits typescript-eslint rules that
        oxlint covers via its type-aware core rules, so the two figures can differ slightly.
      </p>
    </div>
  );
}
