'use client';

import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { STATUS_CHART_COLOR } from '@/lib/status';

export interface MigrationChartPoint {
  date: string;
  version: string;
  value: number;
  /**
   * Rules with no pending autofix at this point (a subset of `value`). Null
   * when this release didn't report fix status at all (unknown, not zero).
   */
  fullyMigrated: number | null;
  /**
   * How many eligible ESLint rules existed as of this point — the real
   * target denominator, which grows as plugins add rules. Null if
   * collect-eslint-history.mjs hasn't been run yet.
   */
  target: number | null;
}

const chartConfig = {
  value: {
    label: 'Migrated (incl. autofix planned)',
    color: 'var(--chart-1)',
  },
  fullyMigrated: {
    label: 'Fully migrated',
    color: STATUS_CHART_COLOR.migrated,
  },
  target: {
    label: 'Target (eligible ESLint rules)',
    color: 'var(--muted-foreground)',
  },
} satisfies ChartConfig;

function formatMonth(dateIso: string) {
  return new Date(dateIso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function MigrationLineChart({ points }: { points: MigrationChartPoint[] }) {
  // `label` is the X-axis dataKey, so it must be unique per point — the ISO
  // date (millisecond precision) always is, unlike a month-formatted string,
  // which collapses every release in the same month onto one shared value
  // and made all but one of them unreachable by hover. The axis still shows
  // "Jun 2023"-style ticks via tickFormatter below.
  const data = points.map((p) => ({
    label: p.date,
    date: p.date,
    version: p.version,
    value: p.value,
    fullyMigrated: p.fullyMigrated,
    target: p.target,
  }));

  const maxValue = Math.max(0, ...data.map((d) => Math.max(d.value, d.target ?? 0)));
  const yMax = maxValue > 0 ? Math.ceil((maxValue * 1.08) / 10) * 10 : undefined;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground text-xs">
        Every published oxlint release ({points.length})
      </p>
      <ChartContainer config={chartConfig} className="aspect-auto h-[320px] w-full">
        <AreaChart data={data} margin={{ left: 4, right: 12, top: 12, bottom: 0 }}>
          <defs>
            <linearGradient id="fillMigrated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="label"
            tickFormatter={formatMonth}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={56}
            interval="preserveStartEnd"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={40}
            domain={[0, yMax ?? 'auto']}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(_, payload) => {
                  const p = payload?.[0]?.payload as { date: string; version: string } | undefined;
                  if (!p) return '';
                  return `${new Date(p.date).toLocaleDateString('en-US', { dateStyle: 'medium' })} · oxlint@${p.version}`;
                }}
                indicator="dot"
              />
            }
          />
          <Line
            dataKey="target"
            type="stepAfter"
            stroke="var(--color-target)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            activeDot={{ r: 3 }}
            connectNulls={false}
          />
          <Area
            dataKey="value"
            type="monotone"
            fill="url(#fillMigrated)"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Area
            dataKey="fullyMigrated"
            type="monotone"
            fill="none"
            stroke="var(--color-fullyMigrated)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            connectNulls={false}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
