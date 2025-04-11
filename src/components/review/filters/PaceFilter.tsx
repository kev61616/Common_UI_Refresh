'use client';

import React from 'react';
import { Dropdown } from '@/components/common/Dropdown';
import { useFilters } from './FilterContext';
import { FilterButton, FilterButtonIcons } from './FilterButton';
import { paceOptions, filterColors } from './filterData';

/**
 * Pace Filter Component
 * Allows users to filter content by pace (Fast, Normal, Slow)
 */
export function PaceFilter() {
  const { filters, updateFilter, activeDropdown, setActiveDropdown } = useFilters();

  // Handler for pace selection/deselection
  const handlePaceChange = (pace: string) => {
    console.log('Pace filter changed:', pace);

    // Toggle the selected pace
    const newPaces = filters.pace.includes(pace) ?
    filters.pace.filter((p) => p !== pace) :
    [...filters.pace, pace];

    // Update the filter state
    updateFilter('pace', newPaces);

    // Close dropdown after selection
    setActiveDropdown(null);
  };

  // Filter out only pace options (not difficulty levels)
  const activePaceCount = filters.pace.filter((p) => paceOptions.includes(p)).length;

  return (
    <Dropdown
      trigger={
      <FilterButton
        filterType="pace"
        label="Pace"
        icon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="evuuczo">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" data-oid=":bzss:c" />
            </svg>
        }
        activeColorClasses={filterColors.pace.active}
        inactiveColorClasses={filterColors.pace.inactive}
        ringColorClass={filterColors.pace.ring}
        count={activePaceCount} data-oid="w.450_p" />

      }
      isOpen={activeDropdown === 'pace'}
      onClose={() => setActiveDropdown(null)}
      placement="bottom-left"
      elevated={true}
      className={`p-2 space-y-1 w-44 ${filterColors.pace.dropdown}`} data-oid="tuh:tj9">

      {paceOptions.map((pace) =>
      <button
        key={pace}
        onClick={() => handlePaceChange(pace)}
        onMouseDown={() => handlePaceChange(pace)} // Add mousedown handler for better reliability
        type="button" // Explicitly set button type
        style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }} // Ensure clickability
        className={`w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 flex items-center cursor-pointer ${
        filters.pace.includes(pace) ?
        'border border-amber-500 text-amber-700 dark:border-amber-600 dark:text-amber-300' :
        'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/70'}`
        } data-oid="nvvd4ii">

          {filters.pace.includes(pace) ?
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2" viewBox="0 0 20 20" fill="currentColor" data-oid="9::r5sj">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" data-oid="y9.ea6v" />
            </svg> :

        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="-fqc-bf">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="9xiq-2s" />
            </svg>
        }
          {pace}
        </button>
      )}
    </Dropdown>);

}