import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { configHref, getAllRules, getRuleById } from '@/lib/data';
import { FIX_STATUS_META, STATUS_META } from '@/lib/status';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return getAllRules().map((r) => ({ plugin: r.plugin, rule: r.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plugin: string; rule: string }>;
}): Promise<Metadata> {
  const { plugin, rule } = await params;
  const found = getRuleById(`${plugin}__${rule}`);
  return {
    title: found ? `${found.pluginLabel}/${found.name}` : 'Unknown rule',
    description: found?.eslint.description ?? undefined,
  };
}

const SEVERITY_STYLE: Record<string, string> = {
  error: 'text-destructive',
  deny: 'text-destructive',
  warn: 'text-amber-600 dark:text-amber-400',
  off: 'text-muted-foreground',
};

export default async function RuleDetailPage({
  params,
}: {
  params: Promise<{ plugin: string; rule: string }>;
}) {
  const { plugin, rule } = await params;
  const found = getRuleById(`${plugin}__${rule}`);
  if (!found) notFound();

  const enabledPresets = found.presets.filter((p) => p.severity !== 'off');
  const disabledPresets = found.presets.filter((p) => p.severity === 'off');
  const status = STATUS_META[found.oxlint.migrationStatus];
  const StatusIcon = status.icon;
  const migrated = found.oxlint.migrationStatus === 'migrated';

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/rules/${found.plugin}`} className="text-muted-foreground text-sm hover:underline">
            {found.pluginLabel}
          </Link>
          <span className="text-muted-foreground">/</span>
          <h1 className="font-mono text-2xl font-semibold tracking-tight">{found.name}</h1>
        </div>
        {found.eslint.description ? (
          <p className="text-muted-foreground max-w-2xl text-balance">{found.eslint.description}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            className={cn(
              'gap-1',
              migrated
                ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                : found.oxlint.migrationStatus === 'not-portable'
                  ? 'bg-muted text-muted-foreground'
                  : found.oxlint.migrationStatus === 'needs-js-plugin'
                    ? 'bg-sky-600 text-white dark:bg-sky-500'
                    : 'bg-amber-500 text-white dark:bg-amber-600',
            )}
          >
            <StatusIcon className="size-3.5" /> {status.label}
          </Badge>
          {found.oxlint.category ? (
            <Badge variant="outline" className="font-mono capitalize">
              {found.oxlint.category}
            </Badge>
          ) : null}
          {found.oxlint.nursery ? (
            <Badge
              variant="outline"
              className="gap-1 border-violet-500/40 text-violet-700 dark:text-violet-400"
            >
              <Sparkles className="size-3.5" /> Nursery (experimental)
            </Badge>
          ) : null}
          {found.oxlint.typeAware ? (
            <Badge variant="outline" className="border-sky-500/40 text-sky-700 dark:text-sky-400">
              Type-aware
            </Badge>
          ) : null}
          {found.oxlint.default ? <Badge variant="outline">On by default in oxlint</Badge> : null}
          {found.eslint.recommended ? <Badge variant="outline">ESLint recommended</Badge> : null}
          {found.eslint.deprecated ? <Badge variant="destructive">Deprecated in ESLint</Badge> : null}
        </div>
        {migrated && found.oxlint.fixStatus ? (
          <p className={cn('text-sm font-medium', FIX_STATUS_META[found.oxlint.fixStatus].className)}>
            {FIX_STATUS_META[found.oxlint.fixStatus].label}
          </p>
        ) : null}
        {!migrated && found.oxlint.reason ? (
          <p className="max-w-2xl rounded-lg border border-dashed p-3 text-sm text-balance">
            <span className="font-medium">Why: </span>
            {found.oxlint.reason}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-3 text-sm">
          {found.eslint.docsUrl ? (
            <a
              href={found.eslint.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              ESLint docs <ExternalLink className="size-3.5" />
            </a>
          ) : null}
          {found.oxlint.docsUrl ? (
            <a
              href={found.oxlint.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              oxlint docs <ExternalLink className="size-3.5" />
            </a>
          ) : null}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How to enable or disable this rule</CardTitle>
        </CardHeader>
        <CardContent>
          {!migrated ? (
            <p className="text-muted-foreground text-sm">
              This rule has no oxlint equivalent{' '}
              {found.oxlint.migrationStatus === 'not-portable' ? 'and will not get one' : 'yet'}, so
              no oxlint-config-presets preset can enable it.
              {found.oxlint.migrationStatus !== 'not-portable'
                ? ' Once oxlint implements it, presets that enable the source ESLint rule will pick it up automatically the next time configs are regenerated.'
                : ''}
            </p>
          ) : found.presets.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              oxlint implements this rule, but none of the generated presets in
              oxlint-config-presets currently turn it on. You can still enable it directly in your{' '}
              <code className="bg-muted rounded px-1 py-0.5">.oxlintrc.json</code>.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-muted-foreground text-sm">
                {enabledPresets.length} preset{enabledPresets.length === 1 ? '' : 's'} enable this
                rule
                {disabledPresets.length > 0
                  ? `, and ${disabledPresets.length} explicitly turn${disabledPresets.length === 1 ? 's' : ''} it off`
                  : ''}
                . Extend any of them in your{' '}
                <code className="bg-muted rounded px-1 py-0.5">.oxlintrc.json</code>{' '}
                <code className="bg-muted rounded px-1 py-0.5">extends</code> array.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Preset</TableHead>
                    <TableHead className="text-right">Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {found.presets
                    .slice()
                    .sort((a, b) => a.config.localeCompare(b.config))
                    .map((p) => (
                      <TableRow key={p.config}>
                        <TableCell>
                          <Link
                            href={configHref(p.config)}
                            className="block max-w-[60vw] truncate font-mono text-sm hover:underline sm:max-w-none sm:inline-block"
                          >
                            {p.config}
                          </Link>
                        </TableCell>
                        <TableCell
                          className={`text-right font-mono text-sm whitespace-nowrap ${SEVERITY_STYLE[p.severity] ?? ''}`}
                        >
                          {p.severity}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
