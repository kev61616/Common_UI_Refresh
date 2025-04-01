'use client'

import React, { useState } from 'react'
import { ModifiedStorytellingTimeline } from '@/components/review/timeline-view-variants/ModifiedStorytellingTimeline'
import { mockPracticeSets } from '@/lib/mockData'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Link from 'next/link'

/**
 * Standalone Timeline View page that bypasses the combined review page to avoid errors
 * This provides a direct access route to the timeline view functionality
 */
export default function TimelineViewPage() {
  console.log('Direct Timeline View Page loaded');
  
  // Use state for selected set and sort configuration
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'dateCompleted',
    direction: 'desc' as 'asc' | 'desc'
  });
  
  // Handle sort changes
  const handleSortChange = (key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction });
  };
  
  return (
    <div className="px-[2%] pb-8">
      {/* Navigation links */}
      <div className="flex flex-wrap gap-2 md:gap-3 pb-4 pt-2 px-1 mb-4 sticky top-[calc(var(--navbar-height,4.75rem))] z-40 bg-white dark:bg-slate-900">
        <Link 
          href="/review/set"
          className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 font-medium text-sm md:text-base transition-all duration-200 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/80"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span className="hidden sm:inline">Set View</span>
          <span className="sm:hidden">Sets</span>
        </Link>
        
        <Link
          href="/review/question"
          className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 font-medium text-sm md:text-base transition-all duration-200 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/80"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="hidden sm:inline">Question View</span>
          <span className="sm:hidden">Questions</span>
        </Link>
        
        <Link
          href="/review/timeline"
          className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 font-medium text-sm md:text-base transition-all duration-200 rounded-md bg-sky-100 text-sky-700 shadow-sm dark:bg-sky-900/30 dark:text-sky-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="hidden sm:inline">Timeline View</span>
          <span className="sm:hidden">Timeline</span>
        </Link>
      </div>
      
      <ErrorBoundary>
        <ModifiedStorytellingTimeline 
          practiceSets={mockPracticeSets}
          onSelectSet={(id) => {
            setSelectedSetId(id);
            console.log(`Selected set: ${id}`);
          }}
          selectedSetId={selectedSetId}
          sortConfig={sortConfig}
          onSortChange={handleSortChange}
        />
      </ErrorBoundary>
    </div>
  )
}
