'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { useBreadcrumbContext, type BreadcrumbItemData } from '@/components/breadcrumb-context';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

function titleCase(segment: string) {
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Fallback breadcrumb derived from the URL when a page hasn't set a custom one. */
function useAutoBreadcrumb(): BreadcrumbItemData[] {
  const pathname = usePathname() ?? '/';
  const segments = pathname.split('/').filter(Boolean);
  return segments.map((segment, i) => ({
    label: titleCase(segment),
    href: i === segments.length - 1 ? undefined : '/' + segments.slice(0, i + 1).join('/'),
  }));
}

export function SiteHeader() {
  const { items } = useBreadcrumbContext();
  const auto = useAutoBreadcrumb();
  const crumbs = items ?? auto;

  return (
    <header className="bg-background/80 sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b backdrop-blur-sm">
      <div className="flex w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/">Home</Link>} />
            </BreadcrumbItem>
            {crumbs.map((crumb, i) => (
              <Fragment key={`${crumb.label}-${i}`}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink render={<Link href={crumb.href}>{crumb.label}</Link>} />
                  ) : (
                    <BreadcrumbPage className="font-mono">{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
