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

export interface ImplementedPoint {
  date: string;
  version: string;
  value: number;
  /**
   * Rules with no pending autofix at this point (a subset of `value`). Null
   * when this release didn't report fix status at all (unknown, not zero).
   */
  fullyMigrated: number | null;
}

export interface TargetPoint {
  date: string;
  target: number;
  /** The release that pushed the target to this value, if known — for the tooltip. */
  version?: string | null;
  package?: string | null;
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

function formatMonth(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

/**
 * Plots oxlint's own implemented/fully-migrated counts (dated by oxlint's own
 * release history) against the target (dated by every ESLint plugin's own,
 * independent release history) on one shared, continuous date axis — the two
 * series have entirely different sets of sample dates, so each is passed to
 * its own `<Area>`/`<Line>` via a per-series `data` prop rather than forcing
 * them into one shared array. A `type="number"` axis keyed on timestamp
 * positions every point by real elapsed time, not evenly-spaced by index.
 */
export function MigrationLineChart({
  implemented,
  target,
}: {
  implemented: ImplementedPoint[];
  target: TargetPoint[];
}) {
  const implementedData = implemented.map((p) => ({
    ts: new Date(p.date).getTime(),
    date: p.date,
    version: p.version,
    value: p.value,
    fullyMigrated: p.fullyMigrated,
  }));
  const targetData = target.map((p) => ({
    ts: new Date(p.date).getTime(),
    date: p.date,
    target: p.target,
    version: p.version ?? null,
    package: p.package ?? null,
  }));

  const allTs = [...implementedData.map((d) => d.ts), ...targetData.map((d) => d.ts)];
  const tsDomain: [number, number] =
    allTs.length > 0 ? [Math.min(...allTs), Math.max(...allTs)] : [0, 1];
  const maxValue = Math.max(
    0,
    ...implementedData.map((d) => d.value),
    ...targetData.map((d) => d.target),
  );
  const yMax = maxValue > 0 ? Math.ceil((maxValue * 1.08) / 10) * 10 : undefined;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground text-xs">
        Every published oxlint release ({implemented.length}) and every ESLint plugin release (
        {target.length}), plotted by actual date
      </p>
      <ChartContainer config={chartConfig} className="aspect-auto h-[320px] w-full">
        <AreaChart margin={{ left: 4, right: 12, top: 12, bottom: 0 }}>
          <defs>
            <linearGradient id="fillMigrated" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="ts"
            type="number"
            domain={tsDomain}
            tickFormatter={formatMonth}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={56}
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
                  const p = payload?.[0]?.payload as { date?: string } | undefined;
                  if (!p?.date) return '';
                  return new Date(p.date).toLocaleDateString('en-US', { dateStyle: 'medium' });
                }}
                formatter={(value, name, item) => {
                  const p = item.payload as { version?: string | null; package?: string | null };
                  const suffix =
                    name === 'target' && p.version
                      ? ` (${p.package ?? ''}@${p.version})`
                      : name === 'value' || name === 'fullyMigrated'
                        ? ` (oxlint@${(item.payload as { version?: string }).version ?? ''})`
                        : '';
                  return (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                        style={{ backgroundColor: `var(--color-${String(name)})` }}
                      />
                      <div className="flex flex-1 justify-between gap-2 leading-none">
                        <span className="text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig]?.label ?? name}
                        </span>
                        <span className="text-foreground font-mono font-medium tabular-nums">
                          {String(value)}
                          {suffix}
                        </span>
                      </div>
                    </>
                  );
                }}
                indicator="dot"
              />
            }
          />
          <Line
            data={targetData}
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
            data={implementedData}
            dataKey="value"
            type="monotone"
            fill="url(#fillMigrated)"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Area
            data={implementedData}
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
