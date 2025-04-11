'use client';

import React from 'react';
import { Dropdown } from '@/components/common/Dropdown';
import { useFilters } from './FilterContext';
import { FilterButton, FilterButtonIcons } from './FilterButton';
import { datePresets, filterColors } from './filterData';

/**
 * Date Filter Component
 * Allows users to filter content by date ranges like "Last 7 days", "This month", etc.
 */
export function DateFilter() {
  const { filters, updateFilter, activeDropdown, setActiveDropdown } = useFilters();

  // Handler for date selection - single selection only
  const handleDateChange = (date: string) => {
    console.log('Date filter changed:', date);

    // Set the selected date (single selection)
    const newDates = filters.dates?.includes(date) ? [] : [date];

    // Update the filter state
    updateFilter('dates', newDates);

    // Close dropdown after selection
    setActiveDropdown(null);
  };

  return (
    <Dropdown
      trigger={
      <FilterButton
        filterType="date"
        label="Date"
        icon={FilterButtonIcons.date}
        activeColorClasses={filterColors.date.active}
        inactiveColorClasses={filterColors.date.inactive}
        ringColorClass={filterColors.date.ring}
        count={filters.dates?.length || 0} data-oid="s4spmib" />

      }
      isOpen={activeDropdown === 'date'}
      onClose={() => setActiveDropdown(null)}
      placement="bottom-left"
      elevated={true}
      className={`p-2 space-y-1 w-44 ${filterColors.date.dropdown}`} data-oid=":mknhwr">

      {datePresets.map((date) =>
      <button
        key={date}
        onClick={() => handleDateChange(date)}
        onMouseDown={() => handleDateChange(date)} // Add mousedown handler for better reliability
        type="button" // Explicitly set button type
        style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }} // Ensure clickability  
        className={`w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 flex items-center cursor-pointer ${
        filters.dates?.includes(date) ?
        'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300' :
        'text-slate-700 hover:bg-rose-100/50 dark:text-slate-300 dark:hover:bg-rose-900/40'}`
        } data-oid="2q3.19v">

          {filters.dates?.includes(date) ?
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2" viewBox="0 0 20 20" fill="currentColor" data-oid="qla:qkf">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" data-oid="dv191qa" />
            </svg> :

        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="u5-.f7l">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="i6qph3-" />
            </svg>
        }
          {date}
        </button>
      )}
    </Dropdown>);

}