'use client';

import React, { useState, useCallback, Suspense } from 'react';
import { EnhancedCollapsibleBoardView } from '@/components/review/board/EnhancedCollapsibleBoardView';
import { mockPracticeSets } from '@/lib/mockData';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ReviewNavigation } from '@/components/review/ReviewNavigation';
import { CompactFilterBar } from '@/components/common/CompactFilterBar';

// Loading component for Suspense fallback
function KanbanViewLoading() {
  return (
    <div className="px-[2%] pb-8" data-oid="oq_:8tt">
      <ReviewNavigation data-oid="h3p9r25" />
      <div className="flex justify-center py-12" data-oid="-797ti6">
        <div className="flex flex-col items-center" data-oid="dcdcoa9">
          <div className="h-8 w-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4" data-oid=":k:8em6"></div>
          <p className="text-slate-600 dark:text-slate-400" data-oid="bcsna8s">Loading kanban board view...</p>
        </div>
      </div>
    </div>);

}

// Main component with all the interactive features
function KanbanViewContent() {
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
    setFilters((prev) => ({
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
    <div className="px-[2%] pb-8" data-oid="dj:v:lb">
      {/* Shared navigation component */}
      <ReviewNavigation data-oid="nt6n27r" />
      
      <ErrorBoundary data-oid="gcv.amk">
        {/* Compact filter bar - consistent with other views */}
        <CompactFilterBar
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange} data-oid="w59tqve" />

        
        <EnhancedCollapsibleBoardView
          practiceSets={mockPracticeSets}
          onSelectSet={(id) => {
            setSelectedSetId(id);
            console.log(`Selected set: ${id}`);
          }}
          selectedSetId={selectedSetId}
          sortConfig={{ key: sortField, direction: sortDirection }}
          onSortChange={handleSortChange}
          filters={filters} data-oid="yo9z8zt" />

      </ErrorBoundary>
    </div>);

}

/**
 * Board View page wrapped in Suspense boundary to properly handle
 * client-side hooks including useSearchParams
 */
export default function BoardViewPage() {
  return (
    <Suspense fallback={<KanbanViewLoading data-oid="n_i8_-j" />} data-oid="62j51e2">
      <KanbanViewContent data-oid="4v-xp6x" />
    </Suspense>);

}