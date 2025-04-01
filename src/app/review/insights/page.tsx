'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { SimpleQuestionView } from '@/components/review/question-view-variants/SimpleQuestionView'
import { ModifiedStorytellingTimeline } from '@/components/review/timeline-view-variants/ModifiedStorytellingTimeline'
import { mockPracticeSets } from '@/lib/mockData'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// Component that handles the insights content with search params
function InsightsContent() {
  console.log('Insights Content Component loaded');
  
  // Get URL parameters
  const searchParams = useSearchParams();
  
  // Shared state for selected set
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  
  // Tab state with URL parameter support
  const [activeTab, setActiveTab] = useState<'questions' | 'timeline'>('questions');
  
  // Set active tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams?.get('tab');
    if (tabParam === 'timeline') {
      setActiveTab('timeline');
    } else if (tabParam === 'questions') {
      setActiveTab('questions');
    }
  }, [searchParams]);
  
  // Timeline sort configuration
  const [sortConfig, setSortConfig] = useState({
    key: 'dateCompleted',
    direction: 'desc' as 'asc' | 'desc'
  });
  
  // Handle sort changes for timeline
  const handleSortChange = (key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction });
  };
  
  // Handle set selection - shared between both views
  const handleSelectSet = (id: string) => {
    setSelectedSetId(id);
    console.log(`Selected set: ${id}`);
  };
  
  return (
    <div className="px-[2%] pb-8">
      {/* Main navigation links */}
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
          href="/review/insights"
          className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 font-medium text-sm md:text-base transition-all duration-200 rounded-md bg-sky-100 text-sky-700 shadow-sm dark:bg-sky-900/30 dark:text-sky-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="hidden sm:inline">Insights</span>
          <span className="sm:hidden">Insights</span>
        </Link>
      </div>
      
      {/* Subtabs for different insights views */}
      <div className="mb-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('questions')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'questions'
                ? 'border-sky-500 text-sky-700 dark:border-sky-400 dark:text-sky-300'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Question Analytics
            </div>
          </button>
          
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'timeline'
                ? 'border-sky-500 text-sky-700 dark:border-sky-400 dark:text-sky-300'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Learning Journey
            </div>
          </button>
        </div>
      </div>
      
      {/* Active view content */}
      <ErrorBoundary>
        {activeTab === 'questions' ? (
          <SimpleQuestionView 
            practiceSets={mockPracticeSets}
            onSelectSet={handleSelectSet}
            selectedSetId={selectedSetId}
          />
        ) : (
          <ModifiedStorytellingTimeline 
            practiceSets={mockPracticeSets}
            onSelectSet={handleSelectSet}
            selectedSetId={selectedSetId}
            sortConfig={sortConfig}
            onSortChange={handleSortChange}
          />
        )}
      </ErrorBoundary>
    </div>
  );
}

// Simple loading fallback component
function LoadingInsights() {
  return (
    <div className="px-[2%] pb-8 flex justify-center py-12">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">Loading insights view...</p>
      </div>
    </div>
  );
}

/**
 * Combined Insights View page that hosts both Question View and Timeline View as subtabs
 * Wrapped in Suspense to properly handle useSearchParams hook
 */
export default function InsightsViewPage() {
  console.log('Combined Insights View Page loaded');
  
  return (
    <Suspense fallback={<LoadingInsights />}>
      <InsightsContent />
    </Suspense>
  );
}
