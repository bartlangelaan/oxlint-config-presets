'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { PluginSummary } from '@/lib/data';
import { STATUS_CHART_COLOR, STATUS_META } from '@/lib/status';

const chartConfig = {
  migrated: { label: STATUS_META.migrated.label, color: STATUS_CHART_COLOR.migrated },
  migratedFixPlanned: {
    label: STATUS_META['migrated-fix-planned'].label,
    color: STATUS_CHART_COLOR['migrated-fix-planned'],
  },
  notImplemented: {
    label: STATUS_META['not-implemented'].label,
    color: STATUS_CHART_COLOR['not-implemented'],
  },
  needsJsPlugin: {
    label: STATUS_META['needs-js-plugin'].label,
    color: STATUS_CHART_COLOR['needs-js-plugin'],
  },
  notPortable: { label: 'Not portable (excluded)', color: STATUS_CHART_COLOR['not-portable'] },
} satisfies ChartConfig;

export function PluginProgressChart({ plugins }: { plugins: PluginSummary[] }) {
  const showJsPlugin = plugins.some((p) => p.needsJsPlugin > 0);

  const data = plugins
    .slice()
    .sort((a, b) => b.eligible - a.eligible)
    .map((p) => ({
      label: p.label,
      migrated: p.fixImplemented + p.fixNone,
      migratedFixPlanned: p.fixPlanned,
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
                const p = item.payload as {
                  eligible: number;
                  total: number;
                  migratedFixPlanned: number;
                };
                const migratedTotal = Number(value) + p.migratedFixPlanned;
                return (
                  <span className="text-foreground font-mono font-medium tabular-nums">
                    {migratedTotal} / {p.eligible} target · {p.total} total
                  </span>
                );
              }}
            />
          }
        />
        <Bar dataKey="migrated" stackId="a" fill="var(--color-migrated)" radius={[4, 0, 0, 4]} />
        <Bar dataKey="migratedFixPlanned" stackId="a" fill="var(--color-migratedFixPlanned)" />
        <Bar dataKey="notImplemented" stackId="a" fill="var(--color-notImplemented)" />
        {showJsPlugin ? (
          <Bar dataKey="needsJsPlugin" stackId="a" fill="var(--color-needsJsPlugin)" />
        ) : null}
        <Bar
          dataKey="notPortable"
          stackId="a"
          fill="var(--color-notPortable)"
          fillOpacity={0.35}
          radius={[0, 4, 4, 0]}
        >
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
