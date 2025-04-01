import { Metadata } from 'next'
import { Suspense } from 'react'
import { TabsDemo } from '@/components/review/tabs/TabsDemo'

export const metadata: Metadata = {
  title: 'Tab Component Demo - Syntax',
  description: 'Interactive showcase of tab component variants with different visual themes',
}

// Loading spinner component for Suspense fallback
function TabsDemoLoading() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="h-8 w-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 dark:text-slate-400 ml-3">Loading tab components...</p>
    </div>
  );
}

/**
 * Tab Components Demo Page
 * 
 * Showcases all available tab component variants in a comprehensive demo.
 * This page is useful for developers to explore the different tab styles
 * and see how they behave in different states.
 * 
 * Wrapped in Suspense to handle React 18 client-side only hooks properly.
 */
export default function TabsDemoPage() {
  return (
    <Suspense fallback={<TabsDemoLoading />}>
      <TabsDemo />
    </Suspense>
  )
}
