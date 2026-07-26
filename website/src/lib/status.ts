import { Ban, CheckCircle2, CircleDashed, PlugZap, type LucideIcon } from 'lucide-react';
import type { FixStatus, MigrationStatus } from '@/lib/data';

/**
 * Five buckets shown throughout the UI. "migrated" splits into two: rules
 * that are done (no outstanding autofix work) and rules that are migrated
 * but still have a planned-but-not-implemented autofix — both count as
 * "migrated" for the target/eligible math, but they're visibly different
 * shades of green everywhere a status is rendered.
 */
export type DisplayStatus =
  | 'migrated'
  | 'migrated-fix-planned'
  | 'not-implemented'
  | 'needs-js-plugin'
  | 'not-portable';

export function toDisplayStatus(rule: {
  migrationStatus: MigrationStatus;
  fixStatus: FixStatus | null;
}): DisplayStatus {
  if (rule.migrationStatus !== 'migrated') return rule.migrationStatus;
  return rule.fixStatus === 'planned' ? 'migrated-fix-planned' : 'migrated';
}

export const STATUS_META: Record<
  DisplayStatus,
  { label: string; short: string; icon: LucideIcon; className: string; dot: string }
> = {
  migrated: {
    label: 'Fully migrated',
    short: 'Migrated',
    icon: CheckCircle2,
    className: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  'migrated-fix-planned': {
    label: 'Migrated · 🚧 autofix planned',
    short: 'Migrated 🚧',
    icon: CheckCircle2,
    className: 'text-teal-600/80 dark:text-teal-400/80',
    dot: 'bg-teal-500/60',
  },
  'not-implemented': {
    label: 'Not yet implemented',
    short: 'Planned',
    icon: CircleDashed,
    className: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  'needs-js-plugin': {
    label: 'Needs JS plugin',
    short: 'JS plugin',
    icon: PlugZap,
    className: 'text-sky-700 dark:text-sky-400',
    dot: 'bg-sky-500',
  },
  'not-portable': {
    label: 'Not portable',
    short: 'Not portable',
    icon: Ban,
    className: 'text-muted-foreground line-through decoration-1',
    dot: 'bg-muted-foreground/50',
  },
};

/** Statuses that count toward the migration target ("eligible" rules). */
export const TARGET_STATUSES: DisplayStatus[] = [
  'migrated',
  'migrated-fix-planned',
  'not-implemented',
  'needs-js-plugin',
];

/** Fixed hex values for contexts that need a real color string (recharts fills). */
export const STATUS_CHART_COLOR: Record<DisplayStatus, string> = {
  migrated: '#059669',
  'migrated-fix-planned': '#6ee7b7',
  'not-implemented': '#f59e0b',
  'needs-js-plugin': '#0ea5e9',
  'not-portable': 'var(--muted-foreground)',
};

export const FIX_STATUS_META: Record<FixStatus, { label: string; className: string }> = {
  implemented: { label: 'Autofix available', className: 'text-emerald-700 dark:text-emerald-400' },
  planned: { label: '🚧 Autofix planned', className: 'text-amber-700 dark:text-amber-400' },
  none: { label: 'No autofix', className: 'text-muted-foreground' },
};
