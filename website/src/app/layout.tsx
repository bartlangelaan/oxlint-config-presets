import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppSidebar } from '@/components/app-sidebar';
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
  const plugins = getPlugins()
    .slice()
    .sort((a, b) => b.total - a.total)
    .map((p) => ({ id: p.id, label: p.label, total: p.total, migrated: p.migrated }));

  return (
    <html lang="en" className={cn('font-sans', geist.variable, geistMono.variable)} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar plugins={plugins} summary={summary} />
              <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">{children}</div>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
