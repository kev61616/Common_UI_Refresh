'use client';

// Define a client-side detection utility
const isClient = typeof window !== 'undefined';

import { useState, useRef, useEffect, useMemo, useCallback, useLayoutEffect } from 'react';
import { useClickAway } from '../../hooks/useClickAway';

interface FilterOption {
  id: string;
  label: string;
  category: 'subject' | 'difficulty' | 'period' | 'accuracy' | 'sort';
}

interface CompactFilterBarProps {
  activeFilters: Record<string, string[] | string>;
  onFilterChange: (category: string, values: string[] | string) => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onSortChange?: (field: string, direction: 'asc' | 'desc') => void;
}

/**
 * CompactFilterBar - Condensed one-line filtering and sorting component
 * Provides clean, minimal UI for filtering and sorting in tables
 */
export function CompactFilterBar({
  activeFilters,
  onFilterChange,
  sortField = 'dateCompleted',
  sortDirection = 'desc',
  onSortChange
}: CompactFilterBarProps): JSX.Element {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownContentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [dropdownWidths, setDropdownWidths] = useState<Record<string, number>>({});

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  const filterOptions: FilterOption[] = [
  // Subject filter options
  { id: 'all', label: 'Select All', category: 'subject' },
  { id: 'Math', label: 'Math', category: 'subject' },
  { id: 'Reading', label: 'Reading', category: 'subject' },
  { id: 'Writing', label: 'Writing', category: 'subject' },

  // Difficulty filter options
  { id: 'all', label: 'Select All', category: 'difficulty' },
  { id: 'Easy', label: 'Easy', category: 'difficulty' },
  { id: 'Medium', label: 'Medium', category: 'difficulty' },
  { id: 'Hard', label: 'Hard', category: 'difficulty' },

  // Time period filter options
  { id: 'all', label: 'Select All', category: 'period' },
  { id: 'week', label: 'Last 7 Days', category: 'period' },
  { id: 'month', label: 'Last 30 Days', category: 'period' },

  // Accuracy filter options (renamed from Performance)
  { id: 'all', label: 'Select All', category: 'accuracy' },
  { id: 'excellent', label: 'Excellent (90%+)', category: 'accuracy' },
  { id: 'good', label: 'Good (70-89%)', category: 'accuracy' },
  { id: 'needs-improvement', label: 'Needs Improvement (<70%)', category: 'accuracy' }];


  const sortOptions = [
  { id: 'dateCompleted', label: 'Date' },
  { id: 'subject', label: 'Subject' },
  { id: 'accuracy', label: 'Accuracy' },
  { id: 'timeUsed', label: 'Time Used' },
  { id: 'difficulty', label: 'Difficulty' }];


  // Default widths for server-side rendering (helps avoid hydration mismatch)
  const defaultWidths: Record<string, number> = {
    subject: 160,
    difficulty: 150,
    period: 160,
    accuracy: 190,
    sort: 150
  };

  // We're measuring the rendered DOM elements directly for precise width calculation
  // but only on the client side
  const measureDropdownWidth = useCallback((dropdownElement: HTMLElement | null, category: string) => {
    // Skip measurement if not in browser or if element is missing
    if (!isClient || !dropdownElement) return;

    try {
      // Create a hidden container to render items for measurement
      const measuringContainer = document.createElement('div');
      measuringContainer.style.position = 'absolute';
      measuringContainer.style.visibility = 'hidden';
      measuringContainer.style.left = '-9999px';
      measuringContainer.style.fontSize = '0.75rem'; // Match text-xs
      measuringContainer.style.padding = '0';
      measuringContainer.style.maxWidth = 'none';
      measuringContainer.style.whiteSpace = 'nowrap';
      document.body.appendChild(measuringContainer);

      let maxWidth = 0;
      let items: HTMLElement[] = [];

      // Get all child items
      const children = Array.from(dropdownElement.children);
      children.forEach((child) => {
        // Clone the item
        const clone = child.cloneNode(true) as HTMLElement;
        measuringContainer.appendChild(clone);
        items.push(clone);
      });

      // Force browser to calculate layout
      measuringContainer.getBoundingClientRect();

      // Measure each item
      items.forEach((item) => {
        // Add 32px padding (16px each side) + 16px for icon + 8px extra safety margin
        const itemWidth = item.getBoundingClientRect().width + 56;
        maxWidth = Math.max(maxWidth, itemWidth);
      });

      // Use a minimum width even if no items
      const finalWidth = Math.max(maxWidth, 120);

      // Update the state with the measured width
      setDropdownWidths((prev) => ({
        ...prev,
        [category]: finalWidth
      }));

      // Clean up
      document.body.removeChild(measuringContainer);
    } catch (error) {
      // Fallback in case of error - use default width
      setDropdownWidths((prev) => ({
        ...prev,
        [category]: defaultWidths[category] || 150
      }));
      console.error(`Error measuring dropdown ${category}:`, error);
    }
  }, []);

  // Use regular useEffect instead of useLayoutEffect to avoid SSR issues
  useEffect(() => {
    // Only run this code on the client
    if (!isClient) return;

    if (activeDropdown) {
      const dropdownElement = dropdownContentRefs.current[activeDropdown];
      if (dropdownElement) {
        // Small timeout to ensure the DOM is fully rendered
        setTimeout(() => {
          measureDropdownWidth(dropdownElement, activeDropdown);
        }, 0);
      }
    }
  }, [activeDropdown, measureDropdownWidth]);

  useClickAway(dropdownRef, () => setActiveDropdown(null));


  // Handle hover to open dropdown
  const handleMouseEnter = (category: string) => {
    // Clear any existing timeout
    if (hoverTimeout) clearTimeout(hoverTimeout);

    // Set a short timeout to avoid unwanted dropdowns during fast mouse movements
    const timeout = setTimeout(() => {
      setActiveDropdown(category);
    }, 150);

    setHoverTimeout(timeout);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleFilterSelect = (category: string, value: string) => {
    // Handle multi-select logic
    if (value === 'all') {
      onFilterChange(category, ['all']);
    } else {
      const currentValues = Array.isArray(activeFilters[category]) ?
      [...(activeFilters[category] as string[])] :
      [];

      // Toggle the value
      if (currentValues.includes(value)) {
        const newValues = currentValues.filter((v) => v !== value && v !== 'all');
        onFilterChange(category, newValues.length > 0 ? newValues : ['all']);
      } else {
        const newValues = [...currentValues.filter((v) => v !== 'all'), value];
        onFilterChange(category, newValues);
      }
    }
  };

  const handleSortSelect = (field: string) => {
    if (onSortChange) {
      const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
      onSortChange(field, newDirection);
    }
    setActiveDropdown(null);
  };

  // Get category label for display purposes
  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case 'subject':return 'Subject';
      case 'difficulty':return 'Difficulty';
      case 'period':return 'Time';
      case 'accuracy':return 'Accuracy';
      case 'status':return 'Status';
      case 'topic':return 'Topic';
      default:return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  // Get active filter label with selected values
  const getActiveFilterLabel = (category: string): string => {
    const values = activeFilters[category];

    if (Array.isArray(values)) {
      if (values.length === 0 || values.length === 1 && values[0] === 'all') {
        // Return the category name instead of "All"
        return getCategoryLabel(category);
      }

      if (values.length === 1) {
        const option = filterOptions.find((opt) => opt.category === category && opt.id === values[0]);
        return option?.label || getCategoryLabel(category);
      }

      return `${values.length} selected`;
    } else {
      // Backward compatibility with string values
      const value = values || 'all';
      if (value === 'all') {
        return getCategoryLabel(category);
      }

      const option = filterOptions.find((opt) => opt.category === category && opt.id === value);
      return option?.label || getCategoryLabel(category);
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'subject':
        return 'text-pink-600 bg-pink-50 border-pink-200 dark:bg-pink-900/20 dark:border-pink-800';
      case 'difficulty':
        return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'period':
        return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      case 'accuracy':
        return 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800';
      case 'sort':
        return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700';
    }
  };

  const getSortLabel = (): string => {
    const option = sortOptions.find((opt) => opt.id === sortField);
    return `${option?.label || 'Date'} ${sortDirection === 'asc' ? '↑' : '↓'}`;
  };

  // Initialize with default widths on server side
  useEffect(() => {
    if (isClient) {
      setDropdownWidths(defaultWidths);
    }
  }, []);

  return (
    <div ref={dropdownRef} className="flex flex-col gap-2 py-2 mb-4" suppressHydrationWarning data-oid="u5zweby">
      {/* Top row with filter buttons */}
      <div className="relative flex items-center gap-2" data-oid="mpfd551">
        <div className="text-slate-500 dark:text-slate-400 mr-1" data-oid="g0_.vr3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" data-oid="wwdhtu-">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V13a1 1 0 01-.293.707l-2 2A1 1 0 018 15v-3.586l-4.707-4.707A1 1 0 013 6V3z" clipRule="evenodd" data-oid="582yg:x" />
          </svg>
        </div>
        
        {/* Filter buttons */}
        {['subject', 'difficulty', 'period', 'accuracy'].map((category) =>
        <div key={category} className="relative" data-oid=".kpcyna">
            <button
            onClick={() => toggleDropdown(category)}
            onMouseEnter={() => handleMouseEnter(category)}
            className={`w-24 px-3 py-1.5 text-xs rounded-full border ${getCategoryColor(category)} hover:bg-opacity-80 transition-colors text-center truncate`} data-oid=".qm8s2w">

              {getActiveFilterLabel(category)}
            </button>
            
            {activeDropdown === category &&
          <div
            ref={(el) => {dropdownContentRefs.current[category] = el;}}
            suppressHydrationWarning
            style={{ width: dropdownWidths[category] ? `${dropdownWidths[category]}px` : `${defaultWidths[category]}px` }}
            className={`absolute top-8 left-0 z-10 w-auto min-w-[12rem] ${getCategoryColor(category)} rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden`} data-oid="g4b3qld">

                {/* Option list */}
                {filterOptions.
            filter((option) => option.category === category && option.id !== 'all').
            map((option) => {
              const values = Array.isArray(activeFilters[category]) ? activeFilters[category] : [activeFilters[category]];
              const isSelected = values.includes(option.id);

              return (
                <div
                  key={option.id}
                  onClick={() => handleFilterSelect(category, option.id)}
                  className={`flex items-center w-full px-4 py-2 text-xs cursor-pointer hover:bg-white/20 dark:hover:bg-slate-900/20 ${
                  isSelected ? 'bg-white/30 font-medium' : ''}`
                  } data-oid="s0-pid3">

                        <div className="flex-shrink-0 w-4 h-4 mr-2" data-oid="73t8ytp">
                          {isSelected &&
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" data-oid="69vt12r">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" data-oid="5nbc51." />
                            </svg>
                    }
                        </div>
                        <span data-oid="jbaakcl">{option.label}</span>
                      </div>);

            })}
              </div>
          }
          </div>
        )}
        
        {/* Sort button */}
        <div className="relative ml-auto" data-oid="vf_3-f2">
          <button
            onClick={() => toggleDropdown('sort')}
            onMouseEnter={() => handleMouseEnter('sort')}
            className={`w-24 px-3 py-1.5 text-xs rounded-full border ${getCategoryColor('sort')} hover:bg-opacity-80 transition-colors flex items-center justify-center gap-1`} data-oid="4-cml4h">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" data-oid="gd9d35x">
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" data-oid="cqqcpuo" />
            </svg>
            <span className="truncate" data-oid="yoxnigg">{getSortLabel()}</span>
          </button>
          
          {activeDropdown === 'sort' &&
          <div
            ref={(el) => {dropdownContentRefs.current['sort'] = el;}}
            suppressHydrationWarning
            style={{ width: dropdownWidths['sort'] ? `${dropdownWidths['sort']}px` : `${defaultWidths['sort']}px` }}
            className={`absolute top-8 right-0 z-10 w-auto min-w-[12rem] ${getCategoryColor('sort')} rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden`} data-oid=":7mq4q8">

              {sortOptions.
            filter((option) => option.id !== 'dateCompleted') // Remove the Date option
            .map((option) =>
            <button
              key={option.id}
              onClick={() => handleSortSelect(option.id)}
              className={`block w-full text-right px-4 py-2 text-xs hover:bg-white/20 dark:hover:bg-slate-900/20 ${
              sortField === option.id ? 'bg-white/30 font-medium' : ''}`
              } data-oid="1_z22j7">

                  {option.label} {sortField === option.id ? sortDirection === 'asc' ? '↑' : '↓' : ''}
                </button>
            )}
            </div>
          }
        </div>
      </div>
    </div>);

}