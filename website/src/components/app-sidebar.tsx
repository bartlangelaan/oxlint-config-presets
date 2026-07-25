'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpenText,
  Boxes,
  GitFork,
  LayoutDashboard,
  LineChart,
  ListChecks,
  Package,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export interface SidebarPlugin {
  id: string;
  label: string;
  total: number;
  migrated: number;
}

export interface SidebarSummary {
  totalRules: number;
  totalMigrated: number;
  oxlintVersion: string;
}

export function AppSidebar({
  plugins,
  summary,
}: {
  plugins: SidebarPlugin[];
  summary: SidebarSummary;
}) {
  const pathname = usePathname();
  const pct = Math.round((summary.totalMigrated / summary.totalRules) * 100);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={
                <Link href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
                    <Boxes className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">oxlint-config-presets</span>
                    <span className="text-muted-foreground text-xs">
                      {pct}% of ESLint rules migrated
                    </span>
                  </div>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem href="/" pathname={pathname} icon={LayoutDashboard} label="Dashboard" />
              <NavItem
                href="/progress"
                pathname={pathname}
                icon={LineChart}
                label="Migration progress"
              />
              <NavItem href="/rules" pathname={pathname} icon={ListChecks} label="All rules" />
              <NavItem href="/configs" pathname={pathname} icon={Package} label="Config presets" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Rules by plugin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {plugins.map((plugin) => (
                <SidebarMenuItem key={plugin.id}>
                  <SidebarMenuButton
                    isActive={pathname === `/rules/${plugin.id}`}
                    tooltip={`${plugin.label}: ${plugin.migrated}/${plugin.total} migrated`}
                    render={
                      <Link href={`/rules/${plugin.id}`}>
                        <span>{plugin.label}</span>
                      </Link>
                    }
                  />
                  <SidebarMenuBadge>
                    {plugin.migrated}/{plugin.total}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <NavItem
            href="https://github.com/popup-plus/oxlint-config-presets"
            pathname={pathname}
            icon={GitFork}
            label="GitHub"
            external
          />
          <NavItem
            href="https://oxc.rs/docs/guide/usage/linter/rules.html"
            pathname={pathname}
            icon={BookOpenText}
            label="oxlint rule docs"
            external
          />
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function NavItem({
  href,
  pathname,
  icon: Icon,
  label,
  external,
}: {
  href: string;
  pathname: string | null;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  external?: boolean;
}) {
  const isActive = !external && pathname === href;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        tooltip={label}
        render={
          <Link
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
          >
            <Icon className={cn('size-4')} />
            <span>{label}</span>
          </Link>
        }
      />
    </SidebarMenuItem>
  );
}
