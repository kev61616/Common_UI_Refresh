import { Suspense } from 'react';
import ReviewNavigationClient from './ReviewNavigationClient';

/**
 * ReviewNavigation with proper Suspense boundaries for useSearchParams
 * Shows the same 3 main tabs consistently across all review-related pages
 */
export function ReviewNavigation() {
  return (
    <Suspense fallback={<NavigationLoading data-oid="j1-kxfx" />} data-oid="3rsznhz">
      <ReviewNavigationClient data-oid="tnmy9tm" />
    </Suspense>);

}

// Simplified loading component for navigation
function NavigationLoading() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 sticky top-[calc(var(--navbar-height,4.75rem))] z-40 py-3 px-1" data-oid="dq39f-z">
      <div className="max-w-7xl mx-auto" data-oid="nuv9k:w">
        <div className="flex flex-wrap gap-2 mb-1" data-oid="e2fh87m">
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" data-oid=":i-jmc0"></div>
          <div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" data-oid="ubmd_i3"></div>
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" data-oid="s4tmh2."></div>
        </div>
      </div>
    </div>);

}