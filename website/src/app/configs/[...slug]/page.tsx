import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
import { configPathToSlug, getConfig, getConfigs, getRulesForConfig, slugToConfigPath } from '@/lib/data';

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

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-mono text-2xl font-semibold tracking-tight">{path}</h1>
        <p className="text-muted-foreground">{config.ruleCount} rules</p>
        <pre className="bg-muted overflow-x-auto rounded-lg p-3 text-xs">
          <code>{`"extends": ["oxlint-config-presets/${path}"]`}</code>
        </pre>
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
                <TableHead className="text-right">Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map(({ rule, severity }) => (
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
                  <TableCell
                    className={`text-right font-mono text-sm whitespace-nowrap ${SEVERITY_STYLE[severity] ?? ''}`}
                  >
                    {severity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
