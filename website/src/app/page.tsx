import { ArrowRight, ListChecks, Package, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { MigrationLineChart } from '@/components/charts/migration-line-chart';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getConfigs, getMigrationHistory, getPlugins, getSummary } from '@/lib/data';

export default function Home() {
  const summary = getSummary();
  const plugins = getPlugins();
  const configs = getConfigs();
  const history = getMigrationHistory();
  const pct = summary.eligible > 0 ? ((summary.migrated / summary.eligible) * 100).toFixed(1) : '0';

  const points = history.samples.map((s) => ({
    date: s.date,
    version: s.version,
    value: s.totalImplemented,
    fullyMigrated: s.fullyMigrated,
    target: s.target,
  }));

  const topPlugins = plugins
    .slice()
    .sort((a, b) => b.eligible - a.eligible)
    .slice(0, 4);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <Badge variant="outline" className="w-fit font-mono">
          oxlint {summary.oxlintVersion}
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          Where does oxlint stand on the ESLint ecosystem?
        </h1>
        <p className="text-muted-foreground max-w-2xl text-balance">
          A live look at which of the {summary.total.toLocaleString()} ESLint rules across 14
          plugins have an oxlint equivalent, which oxlint-config-presets presets enable each rule,
          and how migration has progressed over time. The target excludes{' '}
          {summary.notPortable.toLocaleString()} rules marked not portable.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Rules migrated"
          value={`${summary.migrated.toLocaleString()} / ${summary.eligible.toLocaleString()}`}
          sub={`${pct}% of the migration target`}
        />
        <StatCard
          label="Plugins tracked"
          value={String(plugins.length)}
          sub="from ESLint core to Vue"
        />
        <StatCard
          label="Config presets"
          value={String(configs.length)}
          sub="ready-made oxlint configs"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Migration progress over time</CardTitle>
          <CardDescription>
            Rules oxlint has implemented, from every oxlint release ever published since{' '}
            {new Date(history.samples[0]?.date).getFullYear()}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MigrationLineChart points={points} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-brand size-4" />
              Biggest plugins
            </CardTitle>
            <CardDescription>By total rule count, migrated vs. remaining.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {topPlugins.map((p) => {
              const pluginPct = p.eligible > 0 ? Math.round((p.migrated / p.eligible) * 100) : 0;
              return (
                <Link
                  key={p.id}
                  href={`/rules/${p.id}`}
                  className="group flex flex-col gap-1.5 rounded-lg border p-3 transition-colors hover:bg-accent"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{p.label}</span>
                    <span className="text-muted-foreground font-mono text-xs">
                      {p.migrated}/{p.eligible}
                    </span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className="bg-brand h-full rounded-full"
                      style={{ width: `${pluginPct}%` }}
                    />
                  </div>
                </Link>
              );
            })}
            <Link
              href="/progress"
              className="text-muted-foreground hover:text-foreground mt-1 flex items-center gap-1 text-sm"
            >
              See full breakdown <ArrowRight className="size-3.5" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="text-brand size-4" />
              Look up a rule
            </CardTitle>
            <CardDescription>
              Find out whether a specific ESLint rule has an oxlint equivalent, and which presets
              enable it.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-muted-foreground text-sm">
              Browse all {summary.total.toLocaleString()} rules, filter by plugin or migration
              status, and jump straight to a rule&apos;s detail page to see every config preset that
              turns it on.
            </p>
            <Link
              href="/rules"
              className="bg-brand text-brand-foreground inline-flex w-fit items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-90"
            >
              Browse all rules <ArrowRight className="size-3.5" />
            </Link>
            <div className="mt-2 flex items-center gap-2">
              <Package className="text-muted-foreground size-4" />
              <Link href="/configs" className="text-muted-foreground hover:text-foreground text-sm">
                Or browse the {configs.length} generated config presets directly
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-xs">{sub}</p>
      </CardContent>
    </Card>
  );
}
