'use client'

import React, { useState } from 'react'
import { QuestionViewProps } from './types'

// Extend QuestionViewProps to include initialTab
interface ExtendedQuestionViewProps extends QuestionViewProps {
  initialTab?: 'flashcard' | 'list' | 'time' | 'performance';
}
// Removed EnhancedMatrixGridView import
import { SimpleQuestionView } from './SimpleQuestionView'
import { FlashcardView } from './FlashcardView'
import { getDataWithFallback } from '@/lib/dataUtils'
import { Notebook, LayoutGrid, Clock, BarChart } from 'lucide-react' // Use Lucide icons
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { PerformanceInsights } from '@/components/review/performance-insights/PerformanceInsightsSimple'

// Updated to include the new flashcard type
type QuestionViewType = 'flashcard' | 'list' | 'time' | 'performance'

/**
 * QuestionViewTabs - Provides a tabbed interface to switch between different
 * question view formats (flashcard view, list view, time view, and performance insights)
 */
export function QuestionViewTabs(props: ExtendedQuestionViewProps) {
  // Debug data loading
  console.log('QuestionViewTabs received practiceSets:', props.practiceSets?.length);
  
  // Use the utility function to get data with fallback
  const dataWithFallback = {
    ...props,
    practiceSets: getDataWithFallback(props.practiceSets)
  };
  
  // State for active tab, use initialTab if provided, default to flashcard
  const [activeView, setActiveView] = useState<QuestionViewType>(props.initialTab || 'flashcard')
  
  return (
    <div className="w-full">
      {/* Add error handling for the entire component */}
      <ErrorBoundary fallback={<SimpleQuestionView {...dataWithFallback} />}>
        {/* Tab navigation - beautiful enhanced design with subtle gradient backgrounds */}
        <div className="flex justify-center sticky top-[calc(var(--navbar-height,4.75rem)+8rem)] z-30 py-4 mb-6">
          <div className="flex rounded-xl p-1 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 backdrop-blur-sm shadow-lg border border-slate-200/70 dark:border-slate-700/40">
            <button
              onClick={() => setActiveView('flashcard')}
              className={`relative px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeView === 'flashcard'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-[1.02]'
                  : 'bg-white/70 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center">
                <Notebook className="h-4 w-4 mr-2" /> {/* Use Lucide icon */}
                Flashcards
              </div>
              {activeView === 'flashcard' && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white rounded-full opacity-70"></span>
              )}
            </button>
            
            <button
              onClick={() => setActiveView('list')}
              className={`relative px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeView === 'list'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-[1.02]'
                  : 'bg-white/70 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center">
                <LayoutGrid className="h-4 w-4 mr-2" /> {/* Use Lucide icon */}
                Matrix View
              </div>
              {activeView === 'list' && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white rounded-full opacity-70"></span>
              )}
            </button>
            
            <button
              onClick={() => setActiveView('time')}
              className={`relative px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeView === 'time'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-[1.02]'
                  : 'bg-white/70 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" /> {/* Use Lucide icon */}
                Time View
              </div>
              {activeView === 'time' && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white rounded-full opacity-70"></span>
              )}
            </button>
            
            <button
              onClick={() => setActiveView('performance')}
              className={`relative px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                activeView === 'performance'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-[1.02]'
                  : 'bg-white/70 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center">
                <BarChart className="h-4 w-4 mr-2" /> {/* Use Lucide icon */}
                Performance
              </div>
              {activeView === 'performance' && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white rounded-full opacity-70"></span>
              )}
            </button>
          </div>
        </div>
        
        {/* View content with fallback for each sub-view */}
        <div className="w-full">
          {activeView === 'flashcard' ? (
            <ErrorBoundary fallback={<SimpleQuestionView {...dataWithFallback} />}>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  Flashcard Study Mode
                </h3>
                <FlashcardView {...dataWithFallback} />
              </div>
            </ErrorBoundary>
          ) : activeView === 'list' ? (
            <ErrorBoundary fallback={<SimpleQuestionView {...dataWithFallback} />}>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4 flex items-center">
                  <LayoutGrid className="h-5 w-5 mr-2 text-indigo-500" /> {/* Use Lucide icon */}
                  Matrix View
                </h3>
                {/* Removed EnhancedMatrixGridView */}
                <p className="text-sm text-muted-foreground">Matrix view component needs to be implemented or replaced.</p>
              </div>
            </ErrorBoundary>
          ) : activeView === 'time' ? (
            <ErrorBoundary fallback={<SimpleQuestionView {...dataWithFallback} />}>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-indigo-500" /> {/* Use Lucide icon */}
                  Questions by Completion Time
                </h3>
                {/* Removed EnhancedMatrixGridView */}
                <p className="text-sm text-muted-foreground">Time view component needs to be implemented or replaced.</p>
              </div>
            </ErrorBoundary>
          ) : (
            <ErrorBoundary fallback={<div className="p-4 text-red-500">Failed to load performance insights</div>}>
              <PerformanceInsights />
            </ErrorBoundary>
          )}
        </div>
      </ErrorBoundary>
    </div>
  )
}
