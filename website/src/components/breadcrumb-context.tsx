'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface BreadcrumbItemData {
  label: string;
  href?: string;
}

interface BreadcrumbContextValue {
  items: BreadcrumbItemData[] | null;
  setItems: (items: BreadcrumbItemData[] | null) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextValue | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BreadcrumbItemData[] | null>(null);
  return <BreadcrumbContext.Provider value={{ items, setItems }}>{children}</BreadcrumbContext.Provider>;
}

export function useBreadcrumbContext(): BreadcrumbContextValue {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error('useBreadcrumbContext must be used within a BreadcrumbProvider');
  return ctx;
}

/**
 * Render this from a page (server components can render client components as
 * children) to override the header's auto-generated, URL-derived breadcrumb
 * with real labels — e.g. a scoped package's actual name instead of its
 * URL-safe slug, or a rule's plugin label instead of a title-cased path
 * segment.
 */
export function SetBreadcrumb({ items }: { items: BreadcrumbItemData[] }) {
  const { setItems } = useBreadcrumbContext();
  const key = JSON.stringify(items);

  useEffect(() => {
    setItems(items);
    return () => setItems(null);
  }, [key]);

  return null;
}
