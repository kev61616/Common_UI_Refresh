'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Import Button component
import { ModularFilterBar } from './filters/ModularFilterBar'; // Assuming this is the preferred filter bar
import { ReviewFilters } from '@/hooks/useReviewPageState'; // Import type from hook

interface FilterSectionProps {
  initialFilters: ReviewFilters;
  onFilterChange: (newFilters: ReviewFilters) => void;
  onClearFilters: () => void;
  onFiltersApplied: (newFilters: ReviewFilters) => void; // Pass this down if ModularFilterBar needs it
}

// TODO: Move icon to central Icon component
function FilterIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
 return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
 )
}

export function FilterSection({
  initialFilters,
  onFilterChange,
  onClearFilters,
  onFiltersApplied
}: FilterSectionProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Calculate active filter count (simplified example)
  // TODO: Make this logic more robust based on default filter values
  const activeFilterCount =
    (initialFilters.subject.length > 0 ? 1 : 0) +
    (initialFilters.type.length > 0 ? 1 : 0) +
    (initialFilters.dates.length > 0 ? 1 : 0) +
    (initialFilters.accuracyRange[0] > 0 || initialFilters.accuracyRange[1] < 100 ? 1 : 0) +
    (initialFilters.timeRange[0] > 0 || initialFilters.timeRange[1] < 120 ? 1 : 0) +
    (initialFilters.pace.length > 0 ? 1 : 0);


  return (
    // Use spacing scale pb-2, space-y-2
    <div className="pb-2 space-y-2">
      {/* Mobile filter toggle */}
       {/* Use spacing scale px-1 */}
      <div className="flex justify-end md:hidden px-1">
        {/* Use Button component */}
        <Button
          variant="outline" // Use outline variant
          size="sm"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="gap-2" // Use spacing scale gap-2
        >
          <FilterIcon className="h-4 w-4" /> {/* Use spacing scale h-4, w-4 */}
          Filters
          {activeFilterCount > 0 && (
             // Use spacing scale ml-1, w-5, h-5
            <span className="ml-1 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button> {/* Correctly close Button tag */}
      </div>

      {/* Filter bar - desktop visible, mobile conditionally visible */}
       {/* Use spacing scale px-1 */}
      <div className={`${showMobileFilters ? 'block' : 'hidden md:block'} px-1`}>
        {/* Add bottom margin mb-4 */}
        {/* Removed extra wrapping div */}
        <ModularFilterBar
          initialFilters={initialFilters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
          onFiltersApplied={onFiltersApplied} // Pass down apply handler
        />
      </div>
    </div>
  );
}
