'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export interface MigrationChartPoint {
  date: string;
  version: string;
  value: number;
}

const chartConfig = {
  value: {
    label: 'Rules implemented',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

function formatMonth(dateIso: string) {
  return new Date(dateIso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/** Keep only the last sample published in each calendar month. */
function toMonthly(points: MigrationChartPoint[]): MigrationChartPoint[] {
  const byMonth = new Map<string, MigrationChartPoint>();
  for (const point of points) byMonth.set(point.date.slice(0, 7), point);
  return [...byMonth.values()];
}

export function MigrationLineChart({
  points,
  targetValue,
  targetLabel,
}: {
  points: MigrationChartPoint[];
  targetValue: number | null;
  targetLabel?: string;
}) {
  const [granularity, setGranularity] = useState<'all' | 'monthly'>(
    points.length > 80 ? 'monthly' : 'all',
  );

  const monthly = useMemo(() => toMonthly(points), [points]);
  const shown = granularity === 'all' ? points : monthly;

  const data = shown.map((p) => ({
    date: p.date,
    label: formatMonth(p.date),
    version: p.version,
    value: p.value,
  }));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs">
          {granularity === 'all'
            ? `Every published release (${points.length})`
            : `One point per month (${monthly.length})`}
        </p>
        <ToggleGroup
          value={[granularity]}
          onValueChange={(values) => {
            const next = values[0] as 'all' | 'monthly' | undefined;
            if (next) setGranularity(next);
          }}
          size="sm"
        >
          <ToggleGroupItem value="all">All releases</ToggleGroupItem>
          <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
        </ToggleGroup>
      </div>
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
            domain={[0, targetValue ? Math.ceil((targetValue * 1.08) / 10) * 10 : 'auto']}
          />
          {targetValue ? (
            <ReferenceLine
              y={targetValue}
              stroke="var(--muted-foreground)"
              strokeDasharray="4 4"
              label={{
                value: targetLabel ?? `${targetValue} rules (target)`,
                position: 'insideTopRight',
                fill: 'var(--muted-foreground)',
                fontSize: 11,
              }}
            />
          ) : null}
          <ChartTooltip
            cursor={false}
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
          <Area
            dataKey="value"
            type="monotone"
            fill="url(#fillMigrated)"
            stroke="var(--color-value)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
