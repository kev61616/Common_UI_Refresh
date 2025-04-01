'use client'

import React, { useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { mockPracticeSets } from '@/lib/mockData'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ReviewNavigation } from '@/components/review/ReviewNavigation'
import { EnhancedMatrixGridView } from '@/components/review/question-view-variants/EnhancedMatrixGridView'
import { CompactFilterBar } from '@/components/common/CompactFilterBar'

/**
 * Client component for Question View page
 */
export default function QuestionViewClient() {
  // Safe to use useSearchParams() here since this component is wrapped in Suspense
  const searchParams = useSearchParams();
  
  // Use state for selected set
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  
  // Filter state - updated to support multi-select
  const [filters, setFilters] = useState<Record<string, string[] | string>>({
    subject: ['all'],
    difficulty: ['all'],
    status: ['all'],
    topic: ['all']
  });
  
  // Sort state
  const [sortField, setSortField] = useState<string>('dateCompleted');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Filter and sort options are now handled directly by the CompactFilterBar component
  
  // Handle individual filter changes - updated for multi-select
  const handleFilterChange = useCallback((category: string, values: string[] | string) => {
    setFilters(prev => ({
      ...prev,
      [category]: values
    }));
  }, []);
  
  // Handle sort changes
  const handleSortChange = useCallback((field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  }, []);
  
  return (
    <div className="px-[2%] pb-8">
      {/* Shared navigation component */}
      <ReviewNavigation />
      
      <ErrorBoundary>
        {/* Compact filter bar - consistent with other views */}
        <CompactFilterBar 
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
        
        {/* Question view with enhanced grid */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Questions</h3>
          </div>
          
          {/* Question grid */}
          <EnhancedMatrixGridView 
            practiceSets={mockPracticeSets}
            onSelectSet={(id: string) => {
              setSelectedSetId(id);
              console.log(`Selected set: ${id}`);
            }}
            selectedSetId={selectedSetId}
            sortConfig={{ key: sortField, direction: sortDirection }}
            filters={filters}
          />
        </div>
      </ErrorBoundary>
    </div>
  )
}
