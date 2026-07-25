'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { PluginSummary } from '@/lib/data';

const chartConfig = {
  migrated: { label: 'Migrated', color: '#10b981' },
  notImplemented: { label: 'Not yet implemented', color: '#f59e0b' },
  needsJsPlugin: { label: 'Needs JS plugin', color: '#0ea5e9' },
  notPortable: { label: 'Not portable (excluded)', color: 'var(--muted-foreground)' },
} satisfies ChartConfig;

export function PluginProgressChart({ plugins }: { plugins: PluginSummary[] }) {
  const data = plugins
    .slice()
    .sort((a, b) => b.eligible - a.eligible)
    .map((p) => ({
      label: p.label,
      migrated: p.migrated,
      notImplemented: p.notImplemented,
      needsJsPlugin: p.needsJsPlugin,
      notPortable: p.notPortable,
      eligible: p.eligible,
      total: p.total,
    }));

  const height = Math.max(280, data.length * 34);

  return (
    <ChartContainer config={chartConfig} className="w-full" style={{ height }}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 40, top: 4, bottom: 4 }}
        barCategoryGap={8}
      >
        <CartesianGrid horizontal={false} stroke="var(--border)" />
        <XAxis type="number" tickLine={false} axisLine={false} />
        <YAxis
          type="category"
          dataKey="label"
          tickLine={false}
          axisLine={false}
          width={96}
          tick={{ fontSize: 12 }}
        />
        <ChartTooltip
          cursor={{ fill: 'var(--muted)' }}
          content={
            <ChartTooltipContent
              formatter={(value, name, item) => {
                if (name !== 'migrated') return null;
                const p = item.payload as { eligible: number; total: number };
                return (
                  <span className="text-foreground font-mono font-medium tabular-nums">
                    {String(value)} / {p.eligible} target · {p.total} total
                  </span>
                );
              }}
            />
          }
        />
        <Bar dataKey="migrated" stackId="a" fill="var(--color-migrated)" radius={[4, 0, 0, 4]} />
        <Bar dataKey="notImplemented" stackId="a" fill="var(--color-notImplemented)" />
        <Bar dataKey="needsJsPlugin" stackId="a" fill="var(--color-needsJsPlugin)">
          <LabelList
            dataKey="eligible"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={11}
          />
        </Bar>
        <Bar
          dataKey="notPortable"
          stackId="a"
          fill="var(--color-notPortable)"
          fillOpacity={0.35}
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
