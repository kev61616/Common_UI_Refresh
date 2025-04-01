import { Suspense } from 'react'
import ReviewNavigationClient from './ReviewNavigationClient'

/**
 * ReviewNavigation with proper Suspense boundaries for useSearchParams
 * Shows the same 3 main tabs consistently across all review-related pages
 */
export function ReviewNavigation() {
  return (
    <Suspense fallback={<NavigationLoading />}>
      <ReviewNavigationClient />
    </Suspense>
  )
}

// Simplified loading component for navigation
function NavigationLoading() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 sticky top-[calc(var(--navbar-height,4.75rem))] z-40 py-3 px-1">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-1">
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          <div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
