'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Line, ReferenceLine, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
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

function formatFullDate(dateIso: string) {
  return new Date(dateIso).toLocaleDateString('en-US', { dateStyle: 'medium' });
}

export function MigrationLineChart({ points }: { points: MigrationChartPoint[] }) {
  const data = useMemo(
    () =>
      points.map((p) => ({
        date: p.date,
        label: formatMonth(p.date),
        version: p.version,
        value: p.value,
        fullyMigrated: p.fullyMigrated,
        target: p.target,
      })),
    [points],
  );

  const maxValue = Math.max(0, ...data.map((d) => Math.max(d.value, d.target ?? 0)));
  const yMax = maxValue > 0 ? Math.ceil((maxValue * 1.08) / 10) * 10 : undefined;

  // Packing ~200 releases into a container-width chart leaves well under a
  // pixel per point, so most releases are unreliable to hit by hovering —
  // ordinary mouse movement samples too coarsely to land on every one of
  // them. Give the chart real width — scrollable inside its own box, not the
  // page — which helps, but the release stepper below is what actually
  // guarantees every single release is reachable, independent of mouse
  // precision.
  const PX_PER_POINT = 10;
  const minWidth = Math.max(640, data.length * PX_PER_POINT);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, data.length - 1));
  const active = data[activeIndex];

  function goTo(index: number) {
    const clamped = Math.min(data.length - 1, Math.max(0, index));
    setActiveIndex(clamped);
    const container = scrollRef.current;
    if (!container) return;
    const pointCenter = clamped * PX_PER_POINT;
    const targetScrollLeft = pointCenter - container.clientWidth / 2;
    container.scrollTo({
      left: Math.min(container.scrollWidth - container.clientWidth, Math.max(0, targetScrollLeft)),
      behavior: 'smooth',
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-muted-foreground text-xs">
          Every published oxlint release ({points.length}) — use the stepper to inspect any one of
          them exactly, or scroll to browse
        </p>
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={activeIndex === 0}
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous release"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-muted-foreground w-16 text-center font-mono text-xs tabular-nums">
            {activeIndex + 1} / {data.length}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={activeIndex === data.length - 1}
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next release"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {active ? (
        <div className="bg-muted/40 flex flex-wrap items-center gap-x-5 gap-y-1 rounded-lg border px-3 py-2 text-sm">
          <span className="font-medium">
            oxlint@{active.version}{' '}
            <span className="text-muted-foreground font-normal">
              · {formatFullDate(active.date)}
            </span>
          </span>
          <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
            <span
              className="inline-block size-2 rounded-full"
              style={{ backgroundColor: 'var(--chart-1)' }}
            />
            Migrated: <span className="text-foreground font-mono tabular-nums">{active.value}</span>
          </span>
          <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
            <span
              className="inline-block size-2 rounded-full"
              style={{ backgroundColor: STATUS_CHART_COLOR.migrated }}
            />
            Fully migrated:{' '}
            <span className="text-foreground font-mono tabular-nums">
              {active.fullyMigrated ?? '—'}
            </span>
          </span>
          <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
            <span className="border-muted-foreground inline-block size-2 rounded-full border border-dashed" />
            Target:{' '}
            <span className="text-foreground font-mono tabular-nums">{active.target ?? '—'}</span>
          </span>
        </div>
      ) : null}

      {/*
        `contain: inline-size` makes this box's own width independent of its
        (much wider) scrolling content, so the fixed-width chart below can't
        force this flex/grid ancestor chain to grow past the viewport —
        without it, several ancestors here are flex items with no explicit
        width, and their automatic min-size ends up reflecting the chart's
        full content width instead of respecting overflow-x-auto.
      */}
      <div className="min-w-0 overflow-x-auto" style={{ contain: 'inline-size' }} ref={scrollRef}>
        <div style={{ minWidth: `${minWidth}px` }}>
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
                domain={[0, yMax ?? 'auto']}
              />
              {active ? (
                <ReferenceLine
                  x={active.label}
                  stroke="var(--foreground)"
                  strokeOpacity={0.35}
                  strokeWidth={1.5}
                />
              ) : null}
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(_, payload) => {
                      const p = payload?.[0]?.payload as
                        | { date: string; version: string }
                        | undefined;
                      if (!p) return '';
                      return `${formatFullDate(p.date)} · oxlint@${p.version}`;
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
                dot={{ r: 1.5, strokeWidth: 0, fill: 'var(--color-value)' }}
                activeDot={{ r: 4 }}
              />
              <Area
                dataKey="fullyMigrated"
                type="monotone"
                fill="none"
                stroke="var(--color-fullyMigrated)"
                strokeWidth={2}
                dot={{ r: 1.5, strokeWidth: 0, fill: 'var(--color-fullyMigrated)' }}
                activeDot={{ r: 4 }}
                connectNulls={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
