import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppSidebar } from '@/components/app-sidebar';
import { BreadcrumbProvider } from '@/components/breadcrumb-context';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getPlugins, getSummary } from '@/lib/data';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: {
    default: 'oxlint-config-presets',
    template: '%s · oxlint-config-presets',
  },
  description:
    'Browse which ESLint rules oxlint has migrated, which oxlint-config-presets presets enable them, and track migration progress over time.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const summary = getSummary();
  const allPlugins = getPlugins();
  const plugins = allPlugins
    .filter((p) => !p.original)
    .sort((a, b) => b.eligible - a.eligible)
    .map((p) => ({ id: p.id, label: p.label, eligible: p.eligible, migrated: p.migrated }));
  const originalPlugin = allPlugins.find((p) => p.original);

  return (
    <html lang="en" className={cn('font-sans', geist.variable, geistMono.variable)} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <BreadcrumbProvider>
            <TooltipProvider>
              <SidebarProvider>
                <AppSidebar
                  plugins={plugins}
                  originalPlugin={
                    originalPlugin
                      ? { id: originalPlugin.id, label: originalPlugin.label, total: originalPlugin.total }
                      : null
                  }
                  summary={summary}
                />
                <SidebarInset>
                  <SiteHeader />
                  <div className="flex flex-1 flex-col">{children}</div>
                </SidebarInset>
              </SidebarProvider>
            </TooltipProvider>
          </BreadcrumbProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
