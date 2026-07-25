import { Ban, CheckCircle2, CircleDashed, PlugZap, type LucideIcon } from 'lucide-react';
import type { FixStatus, MigrationStatus } from '@/lib/data';

export const STATUS_META: Record<
  MigrationStatus,
  { label: string; short: string; icon: LucideIcon; className: string; dot: string }
> = {
  migrated: {
    label: 'Migrated',
    short: 'Migrated',
    icon: CheckCircle2,
    className: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
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
export const TARGET_STATUSES: MigrationStatus[] = ['migrated', 'not-implemented', 'needs-js-plugin'];

export const FIX_STATUS_META: Record<FixStatus, { label: string; className: string }> = {
  implemented: { label: 'Autofix available', className: 'text-emerald-700 dark:text-emerald-400' },
  planned: { label: '🚧 Autofix planned', className: 'text-amber-700 dark:text-amber-400' },
  none: { label: 'No autofix', className: 'text-muted-foreground' },
};
