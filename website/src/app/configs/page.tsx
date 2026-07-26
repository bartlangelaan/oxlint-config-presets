import type { Metadata } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SetBreadcrumb } from '@/components/breadcrumb-context';
import { configHref, getConfigs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Config presets',
  description: 'All generated oxlint-config-presets presets, grouped by source styleguide.',
};

export default function ConfigsPage() {
  const configs = getConfigs();
  const grouped = new Map<string, typeof configs>();
  for (const c of configs) {
    const top = c.path.split('/')[0].replace(/\.json$/, '');
    if (!grouped.has(top)) grouped.set(top, []);
    grouped.get(top)!.push(c);
  }
  const groups = [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 md:p-8">
      <SetBreadcrumb items={[{ label: 'Config presets' }]} />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Config presets</h1>
        <p className="text-muted-foreground max-w-2xl">
          {configs.length} oxlint configs generated from popular ESLint styleguides. Extend any of
          them from <code className="bg-muted rounded px-1 py-0.5">.oxlintrc.json</code>:{' '}
          <code className="bg-muted rounded px-1 py-0.5">
            &quot;extends&quot;: [&quot;oxlint-config-presets/airbnb.json&quot;]
          </code>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([group, items]) => (
          <Card key={group}>
            <CardHeader>
              <CardTitle className="font-mono text-base">{group}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1.5">
              {items
                .sort((a, b) => a.path.localeCompare(b.path))
                .map((c) => (
                  <Link
                    key={c.path}
                    href={configHref(c.path)}
                    className="hover:bg-accent flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors"
                  >
                    <span className="font-mono">{c.path}</span>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {c.ruleCount}
                    </Badge>
                  </Link>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
