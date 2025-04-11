'use client';

import React, { useState } from 'react';
import { QuestionViewProps } from './types';

// Extend QuestionViewProps to include initialTab
interface ExtendedQuestionViewProps extends QuestionViewProps {
  initialTab?: 'flashcard' | 'list' | 'time' | 'performance';
}
import { EnhancedMatrixGridView } from './EnhancedMatrixGridView';
import { SimpleQuestionView } from './SimpleQuestionView';
import { FlashcardView } from './FlashcardView';
import { getDataWithFallback } from '@/lib/dataUtils';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PerformanceInsights } from '@/components/review/performance-insights/PerformanceInsightsSimple';

// Updated to include the new flashcard type
type QuestionViewType = 'flashcard' | 'list' | 'time' | 'performance';

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
  const [activeView, setActiveView] = useState<QuestionViewType>(props.initialTab || 'flashcard');

  return (
    <div className="w-full" data-oid="i_gh0kl">
      {/* Add error handling for the entire component */}
      <ErrorBoundary fallback={<SimpleQuestionView {...dataWithFallback} data-oid="m-5oijy" />} data-oid="wci4mb_">
        {/* Tab navigation - beautiful enhanced design with subtle gradient backgrounds */}
        <div className="flex justify-center sticky top-[calc(var(--navbar-height,4.75rem)+8rem)] z-30 py-4 mb-6" data-oid=".mif44i">
          <div className="flex rounded-xl p-1 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 backdrop-blur-sm shadow-lg border border-slate-200/70 dark:border-slate-700/40" data-oid="t.5jhwn">
            <button
              onClick={() => setActiveView('flashcard')}
              className={`relative px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
              activeView === 'flashcard' ?
              'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-[1.02]' :
              'bg-white/70 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid="mff15c:">

              <div className="flex items-center" data-oid="fhjm89l">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor" data-oid="13ogmz5">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" data-oid="4xgetr4" />
                </svg>
                Flashcards
              </div>
              {activeView === 'flashcard' &&
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white rounded-full opacity-70" data-oid="g33cwdy"></span>
              }
            </button>
            
            <button
              onClick={() => setActiveView('list')}
              className={`relative px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
              activeView === 'list' ?
              'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-[1.02]' :
              'bg-white/70 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid="7wgnwlx">

              <div className="flex items-center" data-oid="8692tcj">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor" data-oid="0bov7ab">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" data-oid="ejcks-l" />
                </svg>
                Matrix View
              </div>
              {activeView === 'list' &&
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white rounded-full opacity-70" data-oid="lj1.jnr"></span>
              }
            </button>
            
            <button
              onClick={() => setActiveView('time')}
              className={`relative px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
              activeView === 'time' ?
              'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-[1.02]' :
              'bg-white/70 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid="10g_blu">

              <div className="flex items-center" data-oid="bj3msj6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor" data-oid="tvb1af.">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" data-oid="x0rt9m_" />
                </svg>
                Time View
              </div>
              {activeView === 'time' &&
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white rounded-full opacity-70" data-oid="sxf3:af"></span>
              }
            </button>
            
            <button
              onClick={() => setActiveView('performance')}
              className={`relative px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
              activeView === 'performance' ?
              'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-[1.02]' :
              'bg-white/70 text-slate-700 hover:bg-slate-100 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid="1u0cajm">

              <div className="flex items-center" data-oid="-4d-r-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor" data-oid=":j6d943">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" data-oid="a4_0kdh" />
                </svg>
                Performance
              </div>
              {activeView === 'performance' &&
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-white rounded-full opacity-70" data-oid="95h2ck_"></span>
              }
            </button>
          </div>
        </div>
        
        {/* View content with fallback for each sub-view */}
        <div className="w-full" data-oid="yd3j87y">
          {activeView === 'flashcard' ?
          <ErrorBoundary fallback={<SimpleQuestionView {...dataWithFallback} data-oid="30m0mcn" />} data-oid="uy7:.2u">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700" data-oid=":298pp7">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4 flex items-center" data-oid="h8gm859">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" data-oid="kxk3f09">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" data-oid="suya3hc" />
                  </svg>
                  Flashcard Study Mode
                </h3>
                <FlashcardView {...dataWithFallback} data-oid=".ws3x9:" />
              </div>
            </ErrorBoundary> :
          activeView === 'list' ?
          <ErrorBoundary fallback={<SimpleQuestionView {...dataWithFallback} data-oid="_u4jzeb" />} data-oid="vuie2mm">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700" data-oid="bj36ki3">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4 flex items-center" data-oid="ip6pvkg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" data-oid="p-rge6u">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" data-oid="dujd..z" />
                  </svg>
                  Matrix View
                </h3>
                <EnhancedMatrixGridView {...dataWithFallback} data-oid="vzi2-2z" />
              </div>
            </ErrorBoundary> :
          activeView === 'time' ?
          <ErrorBoundary fallback={<SimpleQuestionView {...dataWithFallback} data-oid="lu-33e." />} data-oid="kmox:nz">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700" data-oid="ecueyn1">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4 flex items-center" data-oid="ozaxt4.">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor" data-oid="9r0wyyh">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" data-oid="wanz:7u" />
                  </svg>
                  Questions by Completion Time
                </h3>
                {/* Use the same view but with time-based sorting for now */}
                <EnhancedMatrixGridView
                {...dataWithFallback}
                sortConfig={{ key: 'timeUsed', direction: 'asc' }} data-oid="shbrqdd" />

              </div>
            </ErrorBoundary> :

          <ErrorBoundary fallback={<div className="p-4 text-red-500" data-oid="3cor0p8">Failed to load performance insights</div>} data-oid="e5954di">
              <PerformanceInsights data-oid="a.cmaoo" />
            </ErrorBoundary>
          }
        </div>
      </ErrorBoundary>
    </div>);

}