'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initialFilters } from './filterData';

// Filter state type definition
export interface FilterState {
  subject: string[];
  type: string[];
  accuracyRange: [number, number];
  timeRange: [number, number];
  pace: string[];
  dateRange: [Date, Date];
  dates: string[];
}

// Filter context interface
interface FilterContextType {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  activeDropdown: string | null;
  setActiveDropdown: (dropdown: string | null) => void;
}

// Create the context with default values
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Filter provider props
interface FilterProviderProps {
  children: ReactNode;
  initialState?: FilterState;
  onFiltersChanged?: (filters: FilterState) => void;
}

/**
 * Filter Provider Component
 * Manages the state for all filters and provides methods to update them
 */
export function FilterProvider({
  children,
  initialState = initialFilters,
  onFiltersChanged
}: FilterProviderProps) {
  // State management
  const [filters, setFilters] = useState<FilterState>(initialState);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Update a specific filter
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    console.log(`Updating filter ${String(key)}:`, value);
    
    // Create new filters object
    const newFilters = { ...filters, [key]: value };
    
    // Update state
    setFilters(newFilters);
    
    // Call the callback if provided, but in a setTimeout to avoid the React warning
    // about updating during render
    if (onFiltersChanged) {
      setTimeout(() => {
        onFiltersChanged(newFilters);
      }, 0);
    }
  };

  // Reset filters to initial state
  const resetFilters = () => {
    console.log('Resetting all filters');
    setFilters(initialState);
    
    // Call the callback if provided
    if (onFiltersChanged) {
      onFiltersChanged(initialState);
    }
  };

  // Context value
  const value = {
    filters,
    updateFilter,
    resetFilters,
    activeDropdown,
    setActiveDropdown
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

/**
 * Custom hook to use the filter context
 * Throws an error if used outside of a FilterProvider
 */
export function useFilters() {
  const context = useContext(FilterContext);
  
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  
  return context;
}
