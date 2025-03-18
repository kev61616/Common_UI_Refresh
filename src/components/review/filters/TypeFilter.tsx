'use client'

import React, { useState } from 'react';
import { Dropdown } from '@/components/common/Dropdown';
import { useFilters } from './FilterContext';
import { FilterButton, FilterButtonIcons } from './FilterButton';
import { subjectCategories, filterColors } from './filterData';

/**
 * Type Filter Component
 * Enhanced with 3-column display for subject categories
 * Options are filtered based on selected subjects
 */
export function TypeFilter() {
  const { filters, updateFilter, activeDropdown, setActiveDropdown } = useFilters();
  
  // Handler for type selection/deselection
  const handleTypeChange = (type: string) => {
    console.log('Type filter changed:', type);
    
    // Toggle the selected type
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    
    // Update the filter state
    updateFilter('type', newTypes);
  };
  
  // Determine which subject categories to show based on selected subjects
  const visibleSubjects = filters.subject.length > 0 
    ? filters.subject 
    : Object.keys(subjectCategories);
    
  return (
    <Dropdown
      trigger={
        <FilterButton
          filterType="type"
          label="Type"
          icon={FilterButtonIcons.type}
          activeColorClasses={filterColors.type.active}
          inactiveColorClasses={filterColors.type.inactive}
          ringColorClass={filterColors.type.ring}
          count={filters.type.length}
        />
      }
      isOpen={activeDropdown === 'type'}
      onClose={() => setActiveDropdown(null)}
      placement="bottom-left"
      elevated={true}
      className={`p-4 ${filterColors.type.dropdown} max-h-[500px] overflow-y-auto w-[600px] max-w-[90vw]`}
    >
      {/* Header with instruction */}
      <div className="pb-3 text-center border-b border-slate-200 dark:border-slate-700 mb-3">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Select question types to filter
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {filters.subject.length > 0 
            ? 'Showing types for selected subjects' 
            : 'Showing all question types'}
        </p>
      </div>
      
      {/* 3-column layout for categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleSubjects.map(subject => (
          <div key={subject} className="space-y-2">
            {/* Subject header */}
            <div className="bg-gradient-to-r from-slate-100 to-white dark:from-slate-700 dark:to-slate-800 rounded-lg p-2 shadow-sm">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {subject}
              </h4>
            </div>
            
            {/* Type options */}
            <div className="space-y-1 ml-1">
              {subjectCategories[subject as keyof typeof subjectCategories].map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  onMouseDown={() => handleTypeChange(type)}
                  type="button"
                  style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }}
                  className={`w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 flex items-center cursor-pointer ${
                    filters.type.includes(type)
                      ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/70'
                  }`}
                >
                  {filters.type.includes(type) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span className="truncate">{type}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state - when no subjects are available */}
      {visibleSubjects.length === 0 && (
        <div className="py-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No subject categories available
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Please select at least one subject to view available types
          </p>
        </div>
      )}
    </Dropdown>
  );
}
