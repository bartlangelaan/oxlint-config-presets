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
  migrated: {
    label: 'Migrated',
    color: 'var(--chart-1)',
  },
  remaining: {
    label: 'Remaining',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function PluginProgressChart({ plugins }: { plugins: PluginSummary[] }) {
  const data = plugins
    .slice()
    .sort((a, b) => b.total - a.total)
    .map((p) => ({
      label: p.label,
      migrated: p.migrated,
      remaining: p.total - p.migrated,
      total: p.total,
    }));

  const height = Math.max(280, data.length * 34);

  return (
    <ChartContainer config={chartConfig} className="w-full" style={{ height }}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 8, right: 32, top: 4, bottom: 4 }}
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
                const total = (item.payload as { total: number }).total;
                return (
                  <span className="text-foreground font-mono font-medium tabular-nums">
                    {String(value)} / {total} migrated
                  </span>
                );
              }}
            />
          }
        />
        <Bar dataKey="migrated" stackId="a" fill="var(--color-migrated)" radius={[4, 0, 0, 4]} />
        <Bar dataKey="remaining" stackId="a" fill="var(--color-remaining)" radius={[0, 4, 4, 0]}>
          <LabelList
            dataKey="total"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={11}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
