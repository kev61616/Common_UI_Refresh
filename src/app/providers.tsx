'use client';

import { ThemeProvider } from 'next-themes';
import { DashboardLayoutProvider } from '@/contexts/DashboardLayoutContext';

export function Providers({ children }: {children: React.ReactNode;}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange data-oid="_j0b8ps">
      <DashboardLayoutProvider data-oid="p7h.33w">
        {children}
      </DashboardLayoutProvider>
    </ThemeProvider>);

}