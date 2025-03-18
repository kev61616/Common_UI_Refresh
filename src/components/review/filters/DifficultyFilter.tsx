'use client'

import React from 'react';
import { Dropdown } from '@/components/common/Dropdown';
import { useFilters } from './FilterContext';
import { FilterButton, FilterButtonIcons } from './FilterButton';
import { difficultyLevels, filterColors } from './filterData';

/**
 * Difficulty Filter Component
 * Allows users to filter content by difficulty level (Easy, Medium, Hard)
 */
export function DifficultyFilter() {
  const { filters, updateFilter, activeDropdown, setActiveDropdown } = useFilters();
  
  // Handler for difficulty selection/deselection
  const handleDifficultyChange = (difficulty: string) => {
    console.log('Difficulty filter changed:', difficulty);
    
    // Toggle the selected difficulty
    const newDifficulties = filters.pace.includes(difficulty)
      ? filters.pace.filter(d => d !== difficulty)
      : [...filters.pace, difficulty];
    
    // Update the filter state
    updateFilter('pace', newDifficulties);
    
    // Close dropdown after selection
    setActiveDropdown(null);
  };
  
  return (
    <Dropdown
      trigger={
        <FilterButton
          filterType="difficulty"
          label="Difficulty"
          icon={(
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          )}
          activeColorClasses={filterColors.difficulty.active}
          inactiveColorClasses={filterColors.difficulty.inactive}
          ringColorClass={filterColors.difficulty.ring}
          count={filters.pace.filter(p => difficultyLevels.includes(p)).length}
        />
      }
      isOpen={activeDropdown === 'difficulty'}
      onClose={() => setActiveDropdown(null)}
      placement="bottom-left"
      elevated={true}
      className={`p-2 space-y-1 w-44 ${filterColors.difficulty.dropdown}`}
    >
      {difficultyLevels.map(level => (
        <button
          key={level}
          onClick={() => handleDifficultyChange(level)}
          onMouseDown={() => handleDifficultyChange(level)} // Add mousedown handler for better reliability
          type="button" // Explicitly set button type
          style={{ position: 'relative', zIndex: 10000, pointerEvents: 'auto' }} // Ensure clickability
          className={`w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 flex items-center cursor-pointer ${
            filters.pace.includes(level)
              ? 'border border-purple-500 text-purple-700 dark:border-purple-600 dark:text-purple-300'
              : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/70'
          }`}
        >
          {filters.pace.includes(level) ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {level}
        </button>
      ))}
    </Dropdown>
  );
}
