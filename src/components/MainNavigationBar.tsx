import { Suspense } from 'react'
import { ThemeSelector } from '@/components/ThemeSelector'
import NavigationClient from './NavigationClient'

// Loading component for the navigation
function NavigationLoading() {
  return (
    <div className="sticky top-0 z-50">
      <div 
        className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
        style={{ paddingTop: '2%', paddingBottom: '10px' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="bg-slate-200 dark:bg-slate-700 h-9 w-28 rounded-md animate-pulse"></div>
            <div className="flex-1 flex items-center justify-center">
              <div className="flex space-x-8 mx-8">
                <div className="bg-slate-200 dark:bg-slate-700 h-8 w-20 rounded-md animate-pulse"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-8 w-16 rounded-md animate-pulse"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-8 w-24 rounded-md animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-slate-200 dark:bg-slate-700 h-8 w-8 rounded-full animate-pulse"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-8 w-8 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main navigation bar that properly wraps the client component
export function MainNavigationBar() {
  return (
    <Suspense fallback={<NavigationLoading />}>
      <NavigationClient />
    </Suspense>
  )
}
