'use client';

import Link from 'next/link';
import { useDeferredValue, useMemo, useState } from 'react';
import { Search, Sparkles, Wrench } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { MigrationStatus, RuleListItem } from '@/lib/data';
import { FIX_STATUS_META, STATUS_META } from '@/lib/status';
import { cn } from '@/lib/utils';

type StatusFilter = 'all' | MigrationStatus;

export function RulesExplorer({
  rules,
  plugins,
  defaultPlugin = 'all',
  showPluginFilter = true,
}: {
  rules: RuleListItem[];
  plugins: { id: string; label: string }[];
  defaultPlugin?: string;
  showPluginFilter?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [plugin, setPlugin] = useState(defaultPlugin);
  const [status, setStatus] = useState<StatusFilter>('all');
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return rules.filter((r) => {
      if (plugin !== 'all' && r.plugin !== plugin) return false;
      if (status !== 'all' && r.migrationStatus !== status) return false;
      if (q && !`${r.pluginLabel} ${r.name}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rules, plugin, status, deferredQuery]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            placeholder="Search rules…"
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {showPluginFilter ? (
          <Select value={plugin} onValueChange={(v) => setPlugin(v ?? 'all')}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Plugin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All plugins</SelectItem>
              {plugins.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}
        <Select value={status} onValueChange={(v) => setStatus(v ?? 'all')}>
          <SelectTrigger className="w-full sm:w-56">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {(Object.keys(STATUS_META) as MigrationStatus[]).map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_META[s].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-muted-foreground text-sm">
        {filtered.length.toLocaleString()} rule{filtered.length === 1 ? '' : 's'}
      </p>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule</TableHead>
              <TableHead className="hidden sm:table-cell">Plugin</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell text-right">Presets</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => {
              const meta = STATUS_META[r.migrationStatus];
              const Icon = meta.icon;
              return (
                <TableRow key={r.id}>
                  <TableCell>
                    <Link
                      href={`/rules/${r.plugin}/${r.name}`}
                      className="block max-w-[52vw] truncate font-mono text-sm font-medium hover:underline sm:max-w-none sm:inline-block"
                    >
                      {r.name}
                    </Link>
                    <span className="ml-1.5 hidden gap-1 sm:inline-flex">
                      {r.deprecated ? (
                        <Badge variant="secondary" className="text-[10px]">
                          deprecated
                        </Badge>
                      ) : null}
                      {r.nursery ? (
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge
                              variant="outline"
                              className="gap-0.5 border-violet-500/40 text-[10px] text-violet-700 dark:text-violet-400"
                            >
                              <Sparkles className="size-2.5" /> nursery
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>Experimental, opt-in oxlint rule</TooltipContent>
                        </Tooltip>
                      ) : null}
                      {r.typeAware ? (
                        <Badge
                          variant="outline"
                          className="border-sky-500/40 text-[10px] text-sky-700 dark:text-sky-400"
                        >
                          type-aware
                        </Badge>
                      ) : null}
                      {r.fixStatus && r.fixStatus !== 'none' ? (
                        <Tooltip>
                          <TooltipTrigger>
                            <Wrench
                              className={cn(
                                'size-3',
                                r.fixStatus === 'implemented'
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-amber-600 dark:text-amber-400',
                              )}
                            />
                          </TooltipTrigger>
                          <TooltipContent>{FIX_STATUS_META[r.fixStatus].label}</TooltipContent>
                        </Tooltip>
                      ) : null}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden sm:table-cell">
                    {r.pluginLabel}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {r.category ? (
                      <Badge variant="outline" className="font-mono text-[10px] capitalize">
                        {r.category}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell text-right font-mono text-xs tabular-nums">
                    {r.presetCount || '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={cn('inline-flex items-center gap-1 text-xs font-medium', meta.className)}>
                      <Icon className="size-3.5 shrink-0" />
                      <span className="hidden sm:inline">{meta.short}</span>
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground h-24 text-center">
                  No rules match your filters.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
