'use client'

import React, { useState } from 'react'
import { PracticeSet } from '@/lib/mockData'
import { TimelineView3 } from '../TimelineView3'
import { EnhancedTimelineView } from './EnhancedTimelineView'
import { TimelineInspiredListView } from './TimelineInspiredListView'
import { TimelineInspiredSetView } from './TimelineInspiredSetView'
import { getDataWithFallback } from '@/lib/dataUtils'

type TimelineViewType = 'standard' | 'enhanced' | 'crystal' | 'museum' | 'bookshelf'

interface TimelineViewTabsProps {
  practiceSets: PracticeSet[];
  onSelectSet?: (id: string) => void;
  selectedSetId?: string | null;
}

/**
 * TimelineViewTabs - Provides a tabbed interface to switch between different
 * timeline view formats (standard and enhanced visualizations)
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
      <div className="flex flex-wrap sticky top-[calc(var(--navbar-height,4.75rem)+8rem)] z-30 bg-white dark:bg-slate-900 py-2 gap-2 mb-4">
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
          onClick={() => setActiveView('crystal')}
          className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            activeView === 'crystal'
              ? 'bg-purple-100 text-purple-700 shadow-sm dark:bg-purple-900/30 dark:text-purple-400'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/80'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
            Crystal Collection
          </div>
        </button>

        <button
          onClick={() => setActiveView('museum')}
          className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            activeView === 'museum'
              ? 'bg-amber-100 text-amber-700 shadow-sm dark:bg-amber-900/30 dark:text-amber-400'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/80'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1v1a1 1 0 11-2 0v-1H7v1a1 1 0 11-2 0v-1a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
            </svg>
            Museum Gallery
          </div>
        </button>

        <button
          onClick={() => setActiveView('bookshelf')}
          className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            activeView === 'bookshelf'
              ? 'bg-emerald-100 text-emerald-700 shadow-sm dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/80'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            3D Bookshelf
          </div>
        </button>
      </div>
      
      {/* View content */}
      <div className="w-full">
        {activeView === 'standard' ? (
          <TimelineView3 {...dataWithFallback} />
        ) : activeView === 'enhanced' ? (
          <EnhancedTimelineView {...dataWithFallback} />
        ) : activeView === 'crystal' ? (
          <div className="crystal-collection-view">
            <div className="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-100 dark:border-purple-800/30 shadow-lg">
              <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                Crystal Collection View
              </h3>
              <div className="crystal-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <TimelineInspiredListView {...dataWithFallback} />
              </div>
            </div>
          </div>
        ) : activeView === 'museum' ? (
          <div className="museum-gallery-view">
            <div className="p-6 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100 dark:border-amber-800/30 shadow-lg">
              <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1v1a1 1 0 11-2 0v-1H7v1a1 1 0 11-2 0v-1a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                </svg>
                Museum Gallery View
              </h3>
              <div className="museum-items grid grid-cols-1 md:grid-cols-2 gap-6">
                <TimelineInspiredSetView {...dataWithFallback} />
              </div>
            </div>
          </div>
        ) : (
          <div className="bookshelf-view">
            <div className="p-6 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800/30 shadow-lg">
              <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-300 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                3D Bookshelf View
              </h3>
              <div className="bookshelf-items grid grid-cols-1 gap-6 perspective-800">
                <div className="transform-style-3d rotate-x-10">
                  <TimelineInspiredListView {...dataWithFallback} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
