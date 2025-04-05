'use client'

import { useState } from 'react'
// Removed Button and Typography imports from @/components/ui
import { Heading } from '@/components/catalyst/heading'; // Import Catalyst Heading
import { ReviewFilters, SortConfig } from '@/hooks/useReviewPageState'; // Import types
import { FilterBarHeader } from './filters/FilterBarHeader';
import { SubjectFilter } from './filters/SubjectFilter';
import { TypeFilter } from './filters/TypeFilter';
import { SortControl } from './filters/SortControl';
import { AccuracyRangeFilter } from './filters/AccuracyRangeFilter';
import { TimeRangeFilter } from './filters/TimeRangeFilter';
import { PaceFilter } from './filters/PaceFilter';
import { DateRangeFilter } from './filters/DateRangeFilter';

interface FilterBarProps {
  // Use the imported types
  filters: ReviewFilters;
  sortConfig: SortConfig;
  onFilterChange: (filters: ReviewFilters) => void;
  onSortChange: (key: string, direction: 'asc' | 'desc') => void;
  onClearFilters: () => void;
  // Add onFiltersApplied if needed by a potential Apply button
}

export function FilterBar({
  filters,
  sortConfig,
  onFilterChange,
  onSortChange,
  onClearFilters,
}: FilterBarProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // --- Handler functions are now passed down to sub-components ---

  // Subject filter handler - Updated to accept string[] from CheckboxGroup
  const handleSubjectChange = (newSubjects: string[]) => {
    // The CheckboxGroup already provides the new array
    onFilterChange({ ...filters, subject: newSubjects });
  };

  // Type filter handler - Updated to accept string[] from CheckboxGroup
  const handleTypeChange = (newTypes: string[]) => {
    // The CheckboxGroup already provides the new array
    onFilterChange({ ...filters, type: newTypes });
  };

  // Pace filter handler - Updated to accept string[] from CheckboxGroup
  const handlePaceChange = (newPaces: string[]) => {
    // The CheckboxGroup already provides the new array
    onFilterChange({ ...filters, pace: newPaces });
  };

  // Accuracy range handler
  const handleAccuracyRangeChange = (rangeType: 'min' | 'max', value: number) => {
    const newRange: [number, number] = [...filters.accuracyRange];
    if (rangeType === 'min') newRange[0] = value;
    else newRange[1] = value;
    // Basic validation
    if (newRange[0] > newRange[1]) {
        if (rangeType === 'min') newRange[0] = newRange[1];
        else newRange[1] = newRange[0];
    }
    onFilterChange({ ...filters, accuracyRange: newRange });
  };

  // Time range handler
  const handleTimeRangeChange = (rangeType: 'min' | 'max', value: number) => {
    const newRange: [number, number] = [...filters.timeRange];
     if (rangeType === 'min') newRange[0] = value;
    else newRange[1] = value;
     // Basic validation
    if (newRange[0] > newRange[1]) {
        if (rangeType === 'min') newRange[0] = newRange[1];
        else newRange[1] = newRange[0];
    }
    onFilterChange({ ...filters, timeRange: newRange });
  };

  // Date range handler
  const handleDateRangeChange = (rangeType: 'start' | 'end', dateString: string) => {
    try {
        const newDate = new Date(dateString);
        // Check if the date is valid before updating
        if (!isNaN(newDate.getTime())) {
            const newRange: [Date, Date] = [...filters.dateRange];
            if (rangeType === 'start') newRange[0] = newDate;
            else newRange[1] = newDate;
             // Basic validation
            if (newRange[0] > newRange[1]) {
                if (rangeType === 'start') newRange[0] = newRange[1];
                else newRange[1] = newRange[0];
            }
            onFilterChange({ ...filters, dateRange: newRange });
        } else {
            console.warn("Invalid date string received:", dateString);
        }
    } catch (error) {
        console.error("Error parsing date string:", error);
    }
  };

  return (
    // Use semantic colors and spacing scale
    <div className="bg-gradient-to-b from-card to-background/80 rounded-xl shadow-lg border border-border p-5 dark:from-slate-800 dark:to-slate-800/80 dark:border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-bl-full pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-accent-500/[0.03] to-transparent rounded-tr-full pointer-events-none"></div>

      <div className="relative z-10">
        <FilterBarHeader
          showAdvancedFilters={showAdvancedFilters}
          onToggleAdvanced={() => setShowAdvancedFilters(!showAdvancedFilters)}
          onClearFilters={onClearFilters}
        />

        {/* Basic filters */}
        {/* Use spacing scale gap-5, mb-5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <SubjectFilter
            selectedSubjects={filters.subject}
            onChange={handleSubjectChange}
          />
          <TypeFilter
            selectedTypes={filters.type}
            onChange={handleTypeChange}
          />
          <SortControl
            sortConfig={sortConfig}
            onSortChange={onSortChange}
          />
        </div>

        {/* Advanced filters */}
        {showAdvancedFilters && (
          <div className="mt-6 relative"> {/* Use spacing scale mt-6 */}
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-500/[0.02] to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary-500/[0.01] to-transparent rounded-tr-full pointer-events-none"></div>

            {/* Section header */}
            <div className="mb-5 border-t border-border pt-5"> {/* Use spacing scale mb-5, pt-5 */}
              <div className="flex items-center gap-2 mb-5"> {/* Use spacing scale gap-2, mb-5 */}
                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-accent-500 to-primary-600 opacity-80"></div> {/* Use spacing scale h-8, w-1 */}
                {/* Use Catalyst Heading */}
                <Heading level={5} className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-600 dark:from-accent-400 dark:to-primary-400">
                  Advanced Filters
                </Heading>
              </div>
            </div>

             {/* Use spacing scale gap-5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <AccuracyRangeFilter
                range={filters.accuracyRange}
                onChange={handleAccuracyRangeChange}
              />
              <TimeRangeFilter
                range={filters.timeRange}
                onChange={handleTimeRangeChange}
              />
              <PaceFilter
                selectedPaces={filters.pace}
                onChange={handlePaceChange}
              />
              <DateRangeFilter
                range={filters.dateRange}
                onChange={handleDateRangeChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
