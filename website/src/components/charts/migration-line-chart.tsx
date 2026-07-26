'use client';

import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

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

export function MigrationLineChart({
  points,
  targetValue,
  targetLabel,
}: {
  points: MigrationChartPoint[];
  targetValue: number | null;
  targetLabel?: string;
}) {
  const data = points.map((p) => ({
    date: p.date,
    label: formatMonth(p.date),
    version: p.version,
    value: p.value,
  }));

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground text-xs">Every published oxlint release ({points.length})</p>
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
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
