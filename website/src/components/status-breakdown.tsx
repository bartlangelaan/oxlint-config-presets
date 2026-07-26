import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Stats } from '@/lib/data';
import { STATUS_META, TARGET_STATUSES, type DisplayStatus } from '@/lib/status';
import { cn } from '@/lib/utils';

export function TargetHeadline({ stats }: { stats: Stats }) {
  const pct = stats.eligible > 0 ? ((stats.migrated / stats.eligible) * 100).toFixed(1) : '0';
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Migrated / target ({stats.total.toLocaleString()} total, {stats.notPortable.toLocaleString()}{' '}
          not portable)
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">
          {stats.migrated.toLocaleString()} / {stats.eligible.toLocaleString()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-xs">
          {pct}% of rules that can (or will) ever be ported are migrated
        </p>
      </CardContent>
    </Card>
  );
}

export function StatusTiles({ stats }: { stats: Stats }) {
  const counts: Record<DisplayStatus, number> = {
    migrated: stats.fixImplemented + stats.fixNone,
    'migrated-fix-planned': stats.fixPlanned,
    'not-implemented': stats.notImplemented,
    'needs-js-plugin': stats.needsJsPlugin,
    'not-portable': stats.notPortable,
  };
  const statuses = (Object.keys(STATUS_META) as DisplayStatus[]).filter(
    (status) => status !== 'needs-js-plugin' || counts[status] > 0,
  );

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
      {statuses.map((status) => {
        const meta = STATUS_META[status];
        const Icon = meta.icon;
        const count = counts[status];
        const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
        const isTarget = TARGET_STATUSES.includes(status);
        return (
          <Card key={status} className={cn(!isTarget && 'border-dashed')}>
            <CardHeader className="gap-1">
              <CardDescription className={cn('flex items-center gap-1.5', meta.className)}>
                <Icon className="size-3.5 shrink-0" />
                {meta.label}
              </CardDescription>
              <CardTitle className="text-xl font-semibold tabular-nums">
                {count.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                {pct}% of all rules {!isTarget && '· excluded from target'}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function AutofixTiles({ stats }: { stats: Stats }) {
  const migrated = stats.migrated || 1;
  const tiles = [
    {
      label: 'Autofix available',
      count: stats.fixImplemented,
      className: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      label: '🚧 Autofix planned',
      count: stats.fixPlanned,
      className: 'text-amber-700 dark:text-amber-400',
    },
    {
      label: 'No autofix',
      count: stats.fixNone,
      className: 'text-muted-foreground',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {tiles.map((tile) => (
        <Card key={tile.label}>
          <CardHeader className="gap-1">
            <CardDescription className={tile.className}>{tile.label}</CardDescription>
            <CardTitle className="text-xl font-semibold tabular-nums">
              {tile.count.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              {Math.round((tile.count / migrated) * 100)}% of migrated rules
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
