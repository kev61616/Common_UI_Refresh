'use client';

import { ThemeProvider } from 'next-themes';
import { DashboardLayoutProvider } from '@/contexts/DashboardLayoutContext';
import { LayoutProvider } from '@/contexts/LayoutContext';

export function Providers({ children }: {children: React.ReactNode;}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange data-oid="_j0b8ps">
      <DashboardLayoutProvider data-oid="p7h.33w">
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </DashboardLayoutProvider>
    </ThemeProvider>
  );
}
