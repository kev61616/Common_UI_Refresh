'use client'

import React from 'react';
import { Dropdown } from '@/components/common/Dropdown';
import { useFilters } from './FilterContext';
import { FilterButton, FilterButtonIcons } from './FilterButton';
import { subjectCategories, filterColors } from './filterData';

/**
 * Subject Filter Component
 * Allows users to filter content by subject (Reading, Writing, Math)
 */
export function SubjectFilter() {
  const { filters, updateFilter, activeDropdown, setActiveDropdown } = useFilters();
  
  // Handler for subject selection/deselection
  const handleSubjectChange = (subject: string) => {
    console.log('Subject filter changed:', subject);
    
    // Toggle the selected subject
    const newSubjects = filters.subject.includes(subject)
      ? filters.subject.filter(s => s !== subject)
      : [...filters.subject, subject];
    
    // Update the filter state
    updateFilter('subject', newSubjects);
    
    // Close dropdown after selection
    setActiveDropdown(null);
  };
  
  return (
    <Dropdown
      trigger={
        <FilterButton
          filterType="subject"
          label="Subject"
          icon={FilterButtonIcons.subject}
          activeColorClasses={filterColors.subject.active}
          inactiveColorClasses={filterColors.subject.inactive}
          ringColorClass={filterColors.subject.ring}
          count={filters.subject.length}
        />
      }
      isOpen={activeDropdown === 'subject'}
      onClose={() => setActiveDropdown(null)}
      placement="bottom-left"
      elevated={true}
      className={`p-2 space-y-1 w-44 ${filterColors.subject.dropdown}`}
    >
      {Object.keys(subjectCategories).map(subject => (
        <button
          key={subject}
          onClick={() => handleSubjectChange(subject)}
          onMouseDown={() => handleSubjectChange(subject)} // Add mousedown handler for better reliability
          type="button" // Explicitly set button type
          style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }} // Ensure clickability
          className={`w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 flex items-center cursor-pointer ${
            filters.subject.includes(subject)
              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
              : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/70'
          }`}
        >
          {filters.subject.includes(subject) ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {subject}
        </button>
      ))}
    </Dropdown>
  );
}
