'use client'

import React, { useState } from 'react'
import { PracticeSet } from '@/lib/mockData'
import { TimelineView } from './TimelineView'
import { EnhancedTimelineView, CalendarTimelineView } from './variants'
import { getDataWithFallback } from '@/lib/dataUtils'

type TimelineViewType = 'standard' | 'enhanced' | 'calendar'

interface TimelineViewTabsProps {
  practiceSets: PracticeSet[];
  onSelectSet?: (id: string) => void;
  selectedSetId?: string | null;
}

/**
 * TimelineViewTabs - Provides a tabbed interface to switch between different
 * timeline view formats (standard, enhanced, and calendar visualizations)
 */
export function TimelineViewTabs(props: TimelineViewTabsProps) {
  // Use the utility function to get data with fallback and ensure required props
  const dataWithFallback = {
    ...props,
    practiceSets: getDataWithFallback(props.practiceSets),
    // Ensure onSelectSet is always defined with a default no-op function if not provided
    onSelectSet: props.onSelectSet || ((_id: string) => {}),
    // Ensure selectedSetId is always string | null, not undefined
    selectedSetId: props.selectedSetId ?? null
  };
  
  // State for active tab
  const [activeView, setActiveView] = useState<TimelineViewType>('enhanced')
  
  return (
    <div className="w-full">
      {/* Tab navigation - enhanced design */}
      <div className="flex sticky top-[calc(var(--navbar-height,4.75rem)+8rem)] z-30 bg-white dark:bg-slate-900 py-2 space-x-2 mb-4">
        <button
          onClick={() => setActiveView('standard')}
          className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            activeView === 'standard'
              ? 'bg-sky-100 text-sky-700 shadow-sm dark:bg-sky-900/30 dark:text-sky-400'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/80'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Standard Timeline
          </div>
        </button>
        
        <button
          onClick={() => setActiveView('enhanced')}
          className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            activeView === 'enhanced'
              ? 'bg-sky-100 text-sky-700 shadow-sm dark:bg-sky-900/30 dark:text-sky-400'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/80'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h6a1 1 0 100-2H3zm0 4a1 1 0 100 2h8a1 1 0 100-2H3zm8 4a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            Enhanced Journey View
          </div>
        </button>

        <button
          onClick={() => setActiveView('calendar')}
          className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            activeView === 'calendar'
              ? 'bg-sky-100 text-sky-700 shadow-sm dark:bg-sky-900/30 dark:text-sky-400'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/80'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Calendar View
          </div>
        </button>
      </div>
      
      {/* View content */}
      <div className="w-full">
        {activeView === 'standard' ? (
          <TimelineView {...dataWithFallback} />
        ) : activeView === 'enhanced' ? (
          <EnhancedTimelineView {...dataWithFallback} />
        ) : (
          <CalendarTimelineView {...dataWithFallback} />
        )}
      </div>
    </div>
  )
}
