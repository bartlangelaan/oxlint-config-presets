import { ExternalLink, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SetBreadcrumb } from '@/components/breadcrumb-context';
import { CodeBlock } from '@/components/code-block';
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
import { configHref, getAllRules, getRuleById, type PresetRuleEntry } from '@/lib/data';
import { formatCategorySnippet, formatExtendsSnippet, formatRuleSnippet } from '@/lib/rule-config';
import { STATUS_META, toDisplayStatus } from '@/lib/status';
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

const BADGE_CLASS: Record<string, string> = {
  migrated: 'bg-emerald-600 text-white dark:bg-emerald-500',
  'migrated-fix-planned': 'bg-teal-600 text-white dark:bg-teal-500',
  'not-implemented': 'bg-amber-500 text-white dark:bg-amber-600',
  'needs-js-plugin': 'bg-sky-600 text-white dark:bg-sky-500',
  'not-portable': 'bg-muted text-muted-foreground',
};

function PresetTable({ presets }: { presets: PresetRuleEntry[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Preset</TableHead>
          <TableHead className="text-right">Configuration</TableHead>
          <TableHead className="text-right">Add it</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {presets
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
              <TableCell className="text-right">
                {p.options ? (
                  <details className="group inline-block text-right">
                    <summary
                      className={cn(
                        'inline-flex cursor-pointer list-none items-center gap-1 font-mono text-sm whitespace-nowrap',
                        SEVERITY_STYLE[p.severity] ?? '',
                      )}
                    >
                      {p.severity}
                      <span className="text-muted-foreground text-[10px] no-underline group-open:hidden">
                        (+ options)
                      </span>
                    </summary>
                    <CodeBlock
                      code={JSON.stringify(
                        p.options.length === 1 ? p.options[0] : p.options,
                        null,
                        2,
                      )}
                      className="mt-2 text-left"
                    />
                  </details>
                ) : (
                  <span
                    className={cn(
                      'font-mono text-sm whitespace-nowrap',
                      SEVERITY_STYLE[p.severity] ?? '',
                    )}
                  >
                    {p.severity}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <details className="group inline-block text-right">
                  <summary className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer list-none items-center gap-1 text-xs whitespace-nowrap">
                    Show snippet
                  </summary>
                  <CodeBlock code={formatExtendsSnippet(p.config)} className="mt-2 text-left" />
                </details>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

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
  const displayStatus = toDisplayStatus(found.oxlint);
  const status = STATUS_META[displayStatus];
  const StatusIcon = status.icon;
  const migrated = found.oxlint.migrationStatus === 'migrated';
  const configKey = found.oxlint.configKey;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-4 md:p-8">
      <SetBreadcrumb
        items={[
          { label: 'All rules', href: '/rules' },
          { label: found.pluginLabel, href: `/rules/${found.plugin}` },
          { label: found.name },
        ]}
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/rules/${found.plugin}`}
            className="text-muted-foreground text-sm hover:underline"
          >
            {found.pluginLabel}
          </Link>
          <span className="text-muted-foreground">/</span>
          <h1 className="font-mono text-2xl font-semibold tracking-tight">{found.name}</h1>
        </div>
        {found.eslint.description ? (
          <p className="text-muted-foreground max-w-2xl text-balance">{found.eslint.description}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={cn('gap-1', BADGE_CLASS[displayStatus])}>
            <StatusIcon className="size-3.5" /> {status.label}
          </Badge>
          {found.oxlint.original ? (
            <Badge variant="outline" className="border-brand/40 text-brand">
              Oxlint original — no ESLint equivalent
            </Badge>
          ) : null}
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
          {found.eslint.deprecated ? (
            <Badge variant="destructive">Deprecated in ESLint</Badge>
          ) : null}
        </div>
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

      {!migrated ? (
        <Card>
          <CardHeader>
            <CardTitle>How to enable this rule</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              This rule has no oxlint equivalent{' '}
              {found.oxlint.migrationStatus === 'not-portable' ? 'and will not get one' : 'yet'}, so
              it can&apos;t be enabled.
              {found.oxlint.migrationStatus !== 'not-portable'
                ? ' Once oxlint implements it, presets that enable the source ESLint rule will pick it up automatically the next time configs are regenerated.'
                : ''}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>How to enable this rule</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Manually</h3>
                <p className="text-muted-foreground text-xs">
                  Add it directly to your{' '}
                  <code className="bg-muted rounded px-1 py-0.5">.oxlintrc.json</code>.
                </p>
                <CodeBlock code={formatRuleSnippet(configKey, 'error')} />
              </div>

              {found.oxlint.category ? (
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium">
                    Via the <span className="font-mono capitalize">{found.oxlint.category}</span>{' '}
                    category
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    Turns on every{' '}
                    <span className="font-mono capitalize">{found.oxlint.category}</span> rule, not
                    just this one — a broader stroke than enabling it individually.
                  </p>
                  <CodeBlock code={formatCategorySnippet(found.oxlint.category, 'warn')} />
                </div>
              ) : null}

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Via a preset</h3>
                {enabledPresets.length > 0 ? (
                  <>
                    <p className="text-muted-foreground text-xs">
                      {enabledPresets.length} oxlint-config-presets preset
                      {enabledPresets.length === 1 ? '' : 's'} already enable{' '}
                      {enabledPresets.length === 1 ? 's' : ''} this rule as shown. Extend one from
                      your <code className="bg-muted rounded px-1 py-0.5">.oxlintrc.json</code> —
                      click &quot;Show snippet&quot; on a row for the exact{' '}
                      <code className="bg-muted rounded px-1 py-0.5">extends</code> config.
                    </p>
                    <PresetTable presets={enabledPresets} />
                  </>
                ) : (
                  <p className="text-muted-foreground text-xs">
                    No generated preset currently enables this rule.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How to disable this rule</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Manually</h3>
                <CodeBlock code={formatRuleSnippet(configKey, 'off')} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Via a preset</h3>
                {disabledPresets.length > 0 ? (
                  <>
                    <p className="text-muted-foreground text-xs">
                      {disabledPresets.length} preset{disabledPresets.length === 1 ? '' : 's'}{' '}
                      explicitly turn{disabledPresets.length === 1 ? 's' : ''} this rule off.
                      Extending one of these also disables it.
                    </p>
                    <PresetTable presets={disabledPresets} />
                  </>
                ) : (
                  <p className="text-muted-foreground text-xs">
                    No generated preset disables this rule by default — it&apos;s either enabled or
                    left untouched everywhere.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
