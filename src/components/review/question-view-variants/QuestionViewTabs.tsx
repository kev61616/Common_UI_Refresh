'use client'

import React, { useState } from 'react'
import { QuestionViewProps } from './types'
import { EnhancedMatrixGridView } from './EnhancedMatrixGridView'
import { QuestionKanbanView } from './QuestionKanbanView'

type QuestionViewType = 'matrix' | 'kanban'

/**
 * QuestionViewTabs - Provides a tabbed interface to switch between different
 * question view formats (matrix and kanban board)
 */
export function QuestionViewTabs(props: QuestionViewProps) {
  // State for active tab
  const [activeView, setActiveView] = useState<QuestionViewType>('matrix')
  
  return (
    <div className="w-full">
      {/* Tab navigation - more compact version */}
      <div className="flex mb-4 border-b dark:border-slate-700">
        <button
          onClick={() => setActiveView('matrix')}
          className={`px-4 py-2 text-xs font-medium transition-colors relative ${
            activeView === 'matrix'
              ? 'text-sky-600 dark:text-sky-400'
              : 'text-slate-600 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400'
          }`}
        >
          General View
          {activeView === 'matrix' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 dark:bg-sky-400"></span>
          )}
        </button>
        
        <button
          onClick={() => setActiveView('kanban')}
          className={`px-4 py-2 text-xs font-medium transition-colors relative ${
            activeView === 'kanban'
              ? 'text-sky-600 dark:text-sky-400'
              : 'text-slate-600 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400'
          }`}
        >
          Kanban Board
          {activeView === 'kanban' && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 dark:bg-sky-400"></span>
          )}
        </button>
      </div>
      
      {/* View content */}
      <div className="w-full">
        {activeView === 'matrix' ? (
          <EnhancedMatrixGridView {...props} />
        ) : (
          <QuestionKanbanView {...props} />
        )}
      </div>
    </div>
  )
}
