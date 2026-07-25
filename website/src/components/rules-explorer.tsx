'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CheckCircle2, CircleDashed, Search } from 'lucide-react';

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
import { Button } from '@/components/ui/button';
import type { RuleListItem } from '@/lib/data';

const PAGE_SIZE = 40;

type StatusFilter = 'all' | 'migrated' | 'not-migrated';

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
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rules.filter((r) => {
      if (plugin !== 'all' && r.plugin !== plugin) return false;
      if (status === 'migrated' && !r.migrated) return false;
      if (status === 'not-migrated' && r.migrated) return false;
      if (q && !`${r.pluginLabel} ${r.name}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rules, plugin, status, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  function updateFilter<T>(setter: (v: T) => void, value: T) {
    setter(value);
    setPage(0);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            placeholder="Search rules…"
            className="pl-8"
            value={query}
            onChange={(e) => updateFilter(setQuery, e.target.value)}
          />
        </div>
        {showPluginFilter ? (
          <Select value={plugin} onValueChange={(v) => updateFilter(setPlugin, v ?? 'all')}>
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
        <Select
          value={status}
          onValueChange={(v) => updateFilter(setStatus, v ?? 'all')}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="migrated">Migrated</SelectItem>
            <SelectItem value="not-migrated">Not migrated</SelectItem>
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
            {pageItems.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <Link
                    href={`/rules/${r.plugin}/${r.name}`}
                    className="block max-w-[52vw] truncate font-mono text-sm font-medium hover:underline sm:max-w-none sm:inline-block"
                  >
                    {r.name}
                  </Link>
                  {r.deprecated ? (
                    <Badge variant="secondary" className="ml-2 hidden text-[10px] sm:inline-flex">
                      deprecated
                    </Badge>
                  ) : null}
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
                  {r.migrated ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-3.5" />
                      <span className="hidden sm:inline">Migrated</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                      <CircleDashed className="size-3.5" />
                      <span className="hidden sm:inline">{r.skipReason ?? 'Not yet'}</span>
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {pageItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground h-24 text-center">
                  No rules match your filters.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>

      {pageCount > 1 ? (
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">
            Page {currentPage + 1} of {pageCount}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= pageCount - 1}
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
