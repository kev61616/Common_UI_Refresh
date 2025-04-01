'use client'

import React, { useState } from 'react'
import { QuestionViewProps } from './types'
import { EnhancedMatrixGridView } from './EnhancedMatrixGridView'
import { CollapsibleKanbanView } from './CollapsibleKanbanView'
import { SimpleQuestionView } from './SimpleQuestionView'
import { getDataWithFallback } from '@/lib/dataUtils'
import { ErrorBoundary } from '@/components/ErrorBoundary'

type QuestionViewType = 'matrix' | 'kanban'

/**
 * QuestionViewTabs - Provides a tabbed interface to switch between different
 * question view formats (matrix and kanban board)
 */
export function QuestionViewTabs(props: QuestionViewProps) {
  // Debug data loading
  console.log('QuestionViewTabs received practiceSets:', props.practiceSets?.length);
  
  // Use the utility function to get data with fallback
  const dataWithFallback = {
    ...props,
    practiceSets: getDataWithFallback(props.practiceSets)
  };
  
  // State for active tab
  const [activeView, setActiveView] = useState<QuestionViewType>('matrix')
  
  return (
    <div className="w-full">
      {/* Add error handling for the entire component */}
      <ErrorBoundary fallback={<SimpleQuestionView {...dataWithFallback} />}>
        {/* Tab navigation - enhanced design */}
        <div className="flex sticky top-[calc(var(--navbar-height,4.75rem)+8rem)] z-30 bg-white dark:bg-slate-900 py-2 space-x-2 mb-4">
        <button
          onClick={() => setActiveView('matrix')}
          className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            activeView === 'matrix'
              ? 'bg-sky-100 text-sky-700 shadow-sm dark:bg-sky-900/30 dark:text-sky-400'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/80'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            General View
          </div>
        </button>
        
        <button
          onClick={() => setActiveView('kanban')}
          className={`px-5 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            activeView === 'kanban'
              ? 'bg-sky-100 text-sky-700 shadow-sm dark:bg-sky-900/30 dark:text-sky-400'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/80'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 011-1h2z" />
            </svg>
            Kanban Board
          </div>
        </button>
        </div>
        
        {/* View content with fallback for each sub-view */}
        <div className="w-full">
          {activeView === 'matrix' ? (
            <ErrorBoundary fallback={<SimpleQuestionView {...dataWithFallback} />}>
              <EnhancedMatrixGridView {...dataWithFallback} />
            </ErrorBoundary>
          ) : (
            <ErrorBoundary fallback={<SimpleQuestionView {...dataWithFallback} />}>
              <CollapsibleKanbanView {...dataWithFallback} />
            </ErrorBoundary>
          )}
        </div>
      </ErrorBoundary>
    </div>
  )
}
