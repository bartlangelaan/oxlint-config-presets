import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';
import { SetBreadcrumb } from '@/components/breadcrumb-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  configPathToSlug,
  getConfig,
  getConfigs,
  getConfigSource,
  getRulesForConfig,
  slugToConfigPath,
} from '@/lib/data';
import { formatExtendsSnippet } from '@/lib/rule-config';
import { cn } from '@/lib/utils';

export function generateStaticParams() {
  return getConfigs().map((c) => ({ slug: configPathToSlug(c.path) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = slugToConfigPath(slug);
  const config = getConfig(path);
  return {
    title: config ? path : 'Unknown config',
    description: config ? `${config.ruleCount} rules enabled by oxlint-config-presets/${path}.` : undefined,
  };
}

const SEVERITY_STYLE: Record<string, string> = {
  error: 'text-destructive',
  deny: 'text-destructive',
  warn: 'text-amber-600 dark:text-amber-400',
  off: 'text-muted-foreground',
};

export default async function ConfigDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slugToConfigPath(slug);
  const config = getConfig(path);
  if (!config) notFound();

  const rules = getRulesForConfig(path).sort((a, b) => a.rule.name.localeCompare(b.rule.name));
  const source = getConfigSource(path);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-4 md:p-8">
      <SetBreadcrumb items={[{ label: 'Config presets', href: '/configs' }, { label: path }]} />
      <div className="flex flex-col gap-2">
        <h1 className="font-mono text-2xl font-semibold tracking-tight">{path}</h1>
        <p className="text-muted-foreground">{config.ruleCount} rules</p>
        <CodeBlock code={formatExtendsSnippet(path)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rules in this preset</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule</TableHead>
                <TableHead className="hidden sm:table-cell">Plugin</TableHead>
                <TableHead className="text-right">Configuration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map(({ rule, severity, options }) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <Link
                      href={`/rules/${rule.plugin}/${rule.name}`}
                      className="block max-w-[48vw] truncate font-mono text-sm hover:underline sm:max-w-none sm:inline-block"
                    >
                      {rule.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="text-[10px]">
                      {rule.pluginLabel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {options ? (
                      <details className="group inline-block text-right">
                        <summary
                          className={cn(
                            'inline-flex cursor-pointer list-none items-center gap-1 font-mono text-sm whitespace-nowrap',
                            SEVERITY_STYLE[severity] ?? '',
                          )}
                        >
                          {severity}
                          <span className="text-muted-foreground text-[10px] no-underline group-open:hidden">
                            (+ options)
                          </span>
                        </summary>
                        <CodeBlock
                          code={JSON.stringify(options.length === 1 ? options[0] : options, null, 2)}
                          className="mt-2 text-left"
                        />
                      </details>
                    ) : (
                      <span
                        className={cn('font-mono text-sm whitespace-nowrap', SEVERITY_STYLE[severity] ?? '')}
                      >
                        {severity}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {source ? (
        <details className="group">
          <summary className="text-muted-foreground hover:text-foreground cursor-pointer list-none text-sm font-medium">
            <span className="inline-flex items-center gap-1">
              <span className="group-open:hidden">Show full source</span>
              <span className="hidden group-open:inline">Hide full source</span>
            </span>
          </summary>
          <CodeBlock code={source} className="mt-2 max-h-[32rem]" />
        </details>
      ) : null}
    </div>
  );
}
