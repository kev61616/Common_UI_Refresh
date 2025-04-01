'use client'

import { useState, useEffect } from 'react'

export interface FilterOption {
  id: string
  label: string
  options: { value: string; label: string }[]
  defaultValue?: string
}

interface FilterBarProps {
  options: FilterOption[]
  onFilterChange: (filters: Record<string, string>) => void
  onSortChange?: (field: string, direction: 'asc' | 'desc') => void
  sortOptions?: { value: string; label: string }[]
  defaultSort?: { field: string; direction: 'asc' | 'desc' }
  showSort?: boolean
  className?: string
}

/**
 * A reusable, modular filter bar component that can be used across different pages
 * Supports multiple filter criteria and sorting options
 */
export function FilterBar({
  options,
  onFilterChange,
  onSortChange,
  sortOptions = [],
  defaultSort = { field: '', direction: 'asc' },
  showSort = true,
  className = ''
}: FilterBarProps) {
  // Track active filters
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  
  // Track sort state
  const [sortField, setSortField] = useState(defaultSort.field)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSort.direction)

  // Initialize default filter values
  useEffect(() => {
    const defaults: Record<string, string> = {}
    options.forEach(option => {
      if (option.defaultValue) {
        defaults[option.id] = option.defaultValue
      }
    })
    setActiveFilters(defaults)
    // Only call onFilterChange if we have default values
    if (Object.keys(defaults).length > 0) {
      onFilterChange(defaults)
    }
  }, [options, onFilterChange])

  // Handle filter change
  const handleFilterChange = (filterId: string, value: string) => {
    const newFilters = { ...activeFilters, [filterId]: value }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  // Handle sort field change
  const handleSortFieldChange = (field: string) => {
    setSortField(field)
    if (onSortChange) {
      onSortChange(field, sortDirection)
    }
  }

  // Handle sort direction toggle
  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    setSortDirection(newDirection)
    if (onSortChange && sortField) {
      onSortChange(sortField, newDirection)
    }
  }

  // Define pastel color scheme for filter categories
  const getCategoryColor = (filterId: string) => {
    const colorMap: Record<string, { bg: string, hoverBg: string, text: string, activeBg: string, activeText: string, darkBg: string, darkHoverBg: string, darkText: string, darkActiveBg: string, darkActiveText: string }> = {
      // Soft pink
      subject: {
        bg: 'bg-pink-100',
        hoverBg: 'hover:bg-pink-200',
        text: 'text-pink-700',
        activeBg: 'bg-pink-200',
        activeText: 'text-pink-800',
        darkBg: 'dark:bg-pink-900/20',
        darkHoverBg: 'dark:hover:bg-pink-900/30',
        darkText: 'dark:text-pink-300',
        darkActiveBg: 'dark:bg-pink-900/40',
        darkActiveText: 'dark:text-pink-200'
      },
      // Soft blue
      period: {
        bg: 'bg-blue-100',
        hoverBg: 'hover:bg-blue-200',
        text: 'text-blue-700',
        activeBg: 'bg-blue-200',
        activeText: 'text-blue-800',
        darkBg: 'dark:bg-blue-900/20',
        darkHoverBg: 'dark:hover:bg-blue-900/30',
        darkText: 'dark:text-blue-300',
        darkActiveBg: 'dark:bg-blue-900/40',
        darkActiveText: 'dark:text-blue-200'
      },
      // Soft green
      difficulty: {
        bg: 'bg-emerald-100',
        hoverBg: 'hover:bg-emerald-200',
        text: 'text-emerald-700',
        activeBg: 'bg-emerald-200',
        activeText: 'text-emerald-800',
        darkBg: 'dark:bg-emerald-900/20',
        darkHoverBg: 'dark:hover:bg-emerald-900/30',
        darkText: 'dark:text-emerald-300',
        darkActiveBg: 'dark:bg-emerald-900/40',
        darkActiveText: 'dark:text-emerald-200'
      },
      // Soft purple
      performance: {
        bg: 'bg-purple-100',
        hoverBg: 'hover:bg-purple-200',
        text: 'text-purple-700',
        activeBg: 'bg-purple-200',
        activeText: 'text-purple-800',
        darkBg: 'dark:bg-purple-900/20',
        darkHoverBg: 'dark:hover:bg-purple-900/30',
        darkText: 'dark:text-purple-300',
        darkActiveBg: 'dark:bg-purple-900/40',
        darkActiveText: 'dark:text-purple-200'
      },
      // Default (soft violet)
      default: {
        bg: 'bg-violet-100',
        hoverBg: 'hover:bg-violet-200',
        text: 'text-violet-700',
        activeBg: 'bg-violet-200',
        activeText: 'text-violet-800',
        darkBg: 'dark:bg-violet-900/20',
        darkHoverBg: 'dark:hover:bg-violet-900/30',
        darkText: 'dark:text-violet-300',
        darkActiveBg: 'dark:bg-violet-900/40',
        darkActiveText: 'dark:text-violet-200'
      }
    };

    return colorMap[filterId] || colorMap.default;
  };

  // Get color scheme for sort controls
  const sortColors = {
    bg: 'bg-amber-100',
    hoverBg: 'hover:bg-amber-200',
    text: 'text-amber-700',
    darkBg: 'dark:bg-amber-900/20',
    darkHoverBg: 'dark:hover:bg-amber-900/30',
    darkText: 'dark:text-amber-300',
    activeBg: 'bg-amber-200',
    darkActiveBg: 'dark:bg-amber-900/40'
  };

  return (
    <div className={`sticky top-[calc(var(--navbar-height,4.75rem)+8rem)] z-30 bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 py-6 px-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md mb-8 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V13a1 1 0 01-.293.707l-2 2A1 1 0 018 15v-3.586l-4.707-4.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Customize your view</p>
          </div>
        </div>
        <button 
          onClick={() => {
            const defaults: Record<string, string> = {};
            options.forEach(option => {
              defaults[option.id] = '';
            });
            setActiveFilters(defaults);
            onFilterChange(defaults);
          }}
          className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Filter options as pills */}
      <div className="space-y-4">
        {options.map(filter => {
          const colors = getCategoryColor(filter.id);
          
          return (
            <div key={filter.id} className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {filter.label}
              </label>
              <div className="flex flex-wrap gap-2">
                {filter.options.map(option => {
                  const isActive = activeFilters[filter.id] === option.value;
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange(filter.id, option.value)}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium transition-all
                        ${colors.bg} ${colors.darkBg} ${colors.text} ${colors.darkText}
                        ${isActive 
                          ? `${colors.activeBg} ${colors.darkActiveBg} ${colors.activeText} ${colors.darkActiveText} shadow-sm`
                          : `${colors.hoverBg} ${colors.darkHoverBg}`
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Sort controls */}
      {showSort && sortOptions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${sortColors.text} ${sortColors.darkText}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Sort
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map(option => {
                const isActive = sortField === option.value;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSortFieldChange(option.value)}
                    className={`
                      flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all
                      ${sortColors.bg} ${sortColors.darkBg} ${sortColors.text} ${sortColors.darkText}
                      ${isActive 
                        ? `${sortColors.activeBg} ${sortColors.darkActiveBg} shadow-sm`
                        : `${sortColors.hoverBg} ${sortColors.darkHoverBg}`
                      }
                    `}
                  >
                    {option.label}
                    {isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSortDirection();
                        }}
                        className="ml-1"
                      >
                        {sortDirection === 'asc' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </button>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Active filters display */}
      {Object.values(activeFilters).some(value => value !== '' && value !== 'all') && (
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500 dark:text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V13a1 1 0 01-.293.707l-2 2A1 1 0 018 15v-3.586l-4.707-4.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Active Filters</div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(activeFilters).map(([key, value]) => {
              const filterOption = options.find(opt => opt.id === key)
              if (!filterOption) return null
              
              const optionLabel = filterOption.options.find(opt => opt.value === value)?.label
              if (!optionLabel || value === '' || value === 'all') return null
              
              const colors = getCategoryColor(key);
              
              return (
                <div 
                  key={key} 
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${colors.activeBg} ${colors.darkActiveBg} ${colors.activeText} ${colors.darkActiveText}`}
                >
                  <span>{optionLabel}</span>
                  <button 
                    onClick={() => handleFilterChange(key, '')}
                    className={`ml-1.5 ${colors.activeText} ${colors.darkActiveText} hover:opacity-80`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
