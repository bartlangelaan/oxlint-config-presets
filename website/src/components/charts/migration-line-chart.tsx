'use client';

import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { MigrationSample } from '@/lib/data';

const chartConfig = {
  totalImplemented: {
    label: 'Migrated rules',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

function formatMonth(dateIso: string) {
  return new Date(dateIso).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

export function MigrationLineChart({
  samples,
  totalEslintRulesNow,
}: {
  samples: MigrationSample[];
  totalEslintRulesNow: number | null;
}) {
  const data = samples.map((s) => ({
    date: s.date,
    label: formatMonth(s.date),
    version: s.version,
    totalImplemented: s.totalImplemented,
  }));

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[320px] w-full">
      <AreaChart data={data} margin={{ left: 4, right: 12, top: 12, bottom: 0 }}>
        <defs>
          <linearGradient id="fillMigrated" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-totalImplemented)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-totalImplemented)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={40}
          interval="preserveStartEnd"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={40}
          domain={[0, totalEslintRulesNow ? Math.ceil(totalEslintRulesNow / 100) * 100 : 'auto']}
        />
        {totalEslintRulesNow ? (
          <ReferenceLine
            y={totalEslintRulesNow}
            stroke="var(--muted-foreground)"
            strokeDasharray="4 4"
            label={{
              value: `${totalEslintRulesNow} ESLint rules today`,
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
          dataKey="totalImplemented"
          type="monotone"
          fill="url(#fillMigrated)"
          stroke="var(--color-totalImplemented)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
