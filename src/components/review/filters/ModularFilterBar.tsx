'use client';

import React, { useRef, useEffect } from 'react';
import { SubjectFilter } from './SubjectFilter';
import { TypeFilter } from './TypeFilter';
import { DateFilter } from './DateFilter';
import { RangeSliderFilter } from './RangeSliderFilter';
import { DifficultyFilter } from './DifficultyFilter';
import { PaceFilter } from './PaceFilter';
import { FilterProvider, useFilters, FilterState } from './FilterContext';
import { initialFilters } from './filterData';
import { FilterButtonIcons } from './FilterButton';

interface ModularFilterBarProps {
  initialFilters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  onFiltersApplied?: (filters: FilterState) => void;
  onClearFilters?: () => void;
}

/**
 * Container component for filter buttons
 */
function FilterButtons() {
  const { filters, resetFilters, activeDropdown, setActiveDropdown } = useFilters();

  // Check if any filters are active
  const hasActiveFilters =
  filters.subject.length > 0 ||
  filters.type.length > 0 ||
  filters.dates.length > 0 ||
  filters.pace.length > 0 ||
  filters.accuracyRange[0] > 0 ||
  filters.accuracyRange[1] < 100 ||
  filters.timeRange[0] > 0 ||
  filters.timeRange[1] < 120;

  // Close dropdowns when clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setActiveDropdown]);

  return (
    <div ref={dropdownRef} className="bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-sm border border-slate-100 p-3 dark:from-slate-800 dark:to-slate-800/80 dark:border-slate-700/50 relative overflow-hidden" data-oid="7t_:dbl">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-500/5 to-transparent rounded-bl-full" data-oid="luyw4lh"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-indigo-500/[0.03] to-transparent rounded-tr-full" data-oid="eqjuzsl"></div>
      
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2" data-oid="2x9pfxd">
        {/* Left side - Filters */}
        <div className="flex items-center flex-wrap gap-2" data-oid="78gk0z:">
          {/* Filter title with hint */}
          <div className="flex items-center" data-oid="zp4qyaf">
            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-md flex items-center justify-center shadow-sm mr-2" data-oid="dexsm66">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="_5dd4s9">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" data-oid="jb0xyte" />
              </svg>
            </div>
            <div data-oid="rc1upu5">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 font-medium text-sm" data-oid="qe003dt">
                Filters
              </span>
            </div>
          </div>
          
          {/* Individual filter components */}
          <SubjectFilter data-oid="4uz5tr7" />
          <TypeFilter data-oid="ulwpx65" />
          <DateFilter data-oid="glgzxa6" />
          <RangeSliderFilter
            filterType="accuracyRange"
            label="Accuracy"
            min={0}
            max={100}
            step={5}
            unit="%" data-oid="ahzh4nj" />

          {/* Add newly created components for Difficulty and Pace filters */}
          <DifficultyFilter data-oid="u5kl5a6" />
          <PaceFilter data-oid="liuy0.9" />
        </div>

        {/* Right side - Clear */}
        <div className="flex items-center gap-2" data-oid="jojmak7">
          {/* Filter status */}
          {hasActiveFilters &&
          <div className="text-xs text-slate-500 dark:text-slate-400 mr-1 hidden sm:block" data-oid="kp7:tdn">
              {filters.subject.length + filters.type.length + filters.dates.length + filters.pace.length} active filters
            </div>
          }
          
          {/* Clear filters button - Always visible with appropriate styling */}
          <button
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-full border transition-colors duration-200 flex items-center gap-1.5 ${
            hasActiveFilters ?
            'border-slate-200 bg-white text-red-500 hover:bg-red-50 hover:border-red-200 dark:bg-slate-800 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:border-red-800' :
            'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800/50 dark:border-slate-700/50 dark:text-slate-500'}`
            } data-oid="4a8inx0">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="1gxp3t8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" data-oid="lvz2x:k" />
            </svg>
            <span data-oid="wie2dc8">Clear All</span>
          </button>
        </div>
      </div>
      
      {/* Filter tip removed */}
    </div>);

}

/**
 * Modular Filter Bar Component
 * A container for all filter components, using context for state management
 */
export function ModularFilterBar({
  initialFilters: propInitialFilters = initialFilters,
  onFilterChange,
  onFiltersApplied,
  onClearFilters
}: ModularFilterBarProps) {
  // Handle filter changes propagation to parent component
  const handleFiltersChanged = (filters: FilterState) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }

    if (onFiltersApplied) {
      onFiltersApplied(filters);
    }
  };

  // Pass through the onClearFilters callback to the FilterContext
  const handleResetFilters = () => {
    if (onClearFilters) {
      onClearFilters();
    }
  };

  return (
    <FilterProvider
      initialState={propInitialFilters}
      onFiltersChanged={handleFiltersChanged}
      onResetFilters={handleResetFilters} data-oid="-whpvrx">

      <FilterButtons data-oid="1pch_sn" />
    </FilterProvider>);

}