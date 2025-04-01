'use client'

import { ThemeProvider } from 'next-themes'
import { DashboardLayoutProvider } from '@/contexts/DashboardLayoutContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <DashboardLayoutProvider>
        {children}
      </DashboardLayoutProvider>
    </ThemeProvider>
  )
}
