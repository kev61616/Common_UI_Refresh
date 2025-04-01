'use client'

import React, { useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { EnhancedCollapsibleBoardView } from '@/components/review/board/EnhancedCollapsibleBoardView'
import { mockPracticeSets } from '@/lib/mockData'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ReviewNavigation } from '@/components/review/ReviewNavigation'
import { CompactFilterBar } from '@/components/common/CompactFilterBar'

/**
 * Client component version of Board View page that can safely use client hooks
 */
export default function BoardViewClient() {
  // Safe to use useSearchParams here since we're in a client component
  const searchParams = useSearchParams()
  
  // State for selected set
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);
  
  // Filter state - updated to support multi-select
  const [filters, setFilters] = useState<Record<string, string[] | string>>({
    subject: ['all'],
    difficulty: ['all'],
    period: ['all'],
    performance: ['all']
  });
  
  // Sort state - consistent naming with other views
  const [sortField, setSortField] = useState<string>('dateCompleted');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
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
        
        <EnhancedCollapsibleBoardView 
          practiceSets={mockPracticeSets}
          onSelectSet={(id) => {
            setSelectedSetId(id);
            console.log(`Selected set: ${id}`);
          }}
          selectedSetId={selectedSetId}
          sortConfig={{ key: sortField, direction: sortDirection }}
          onSortChange={handleSortChange}
          filters={filters}
        />
      </ErrorBoundary>
    </div>
  )
}
