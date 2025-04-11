'use client';

import React, { useState, useCallback } from 'react';
import { SetViewTable } from '@/components/review/SetViewTable';
import { mockPracticeSets } from '@/lib/mockData';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ReviewNavigation } from '@/components/review/ReviewNavigation';
import { CompactFilterBar } from '@/components/common/CompactFilterBar';

/**
 * Standalone Set View page with filtering and sorting capabilities
 */
export default function SetViewPage() {
  // Track the selected set
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);

  // Filter state - updated to support multi-select
  const [filters, setFilters] = useState<Record<string, string[] | string>>({
    subject: ['all'],
    difficulty: ['all'],
    period: ['all'],
    performance: ['all']
  });

  // Sort state
  const [sortField, setSortField] = useState<string>('dateCompleted');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filters and sorting are now handled by the CompactFilterBar component

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

  // Handle set selection and special signals for sorting
  const handleSelectSet = useCallback((id: string) => {
    // Check if this is a sort signal
    if (id.startsWith('sort:')) {
      const [_, field, direction] = id.split(':');
      setSortField(field);
      setSortDirection(direction as 'asc' | 'desc');
    } else {
      setSelectedSetId(id);
      console.log(`Selected set: ${id}`);
    }
  }, []);

  return (
    <div className="px-[2%] pb-8" data-oid="glyzy:y">
      {/* Shared navigation component */}
      <ReviewNavigation data-oid="f7w.3sf" />
      
      <ErrorBoundary data-oid="zk-ae29">
        {/* Compact filter bar - single line with dropdown menus */}
        <CompactFilterBar
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange} data-oid="es-.jgf" />

        
        {/* Set view table with filtering and sorting */}
        <SetViewTable
          practiceSets={mockPracticeSets}
          onSelectSet={handleSelectSet}
          selectedSetId={selectedSetId}
          sortField={sortField}
          sortDirection={sortDirection}
          filters={filters} data-oid="-0tjhvb" />

      </ErrorBoundary>
    </div>);

}