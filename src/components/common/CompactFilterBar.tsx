'use client'

import { useState, useRef } from 'react'
import { useClickAway } from '../../hooks/useClickAway'

interface FilterOption {
  id: string
  label: string
  category: 'subject' | 'difficulty' | 'period' | 'accuracy' | 'sort'
}

interface CompactFilterBarProps {
  activeFilters: Record<string, string[] | string>
  onFilterChange: (category: string, values: string[] | string) => void
  sortField?: string
  sortDirection?: 'asc' | 'desc'
  onSortChange?: (field: string, direction: 'asc' | 'desc') => void
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
}: CompactFilterBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  useClickAway(dropdownRef, () => setActiveDropdown(null))
  
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
    { id: 'needs-improvement', label: 'Needs Improvement (<70%)', category: 'accuracy' },
  ]
  
  const sortOptions = [
    { id: 'dateCompleted', label: 'Date' },
    { id: 'subject', label: 'Subject' },
    { id: 'accuracy', label: 'Accuracy' },
    { id: 'timeUsed', label: 'Time Used' },
    { id: 'difficulty', label: 'Difficulty' }
  ]
  
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }
  
  const handleFilterSelect = (category: string, value: string) => {
    // Handle multi-select logic
    if (value === 'all') {
      onFilterChange(category, ['all'])
    } else {
      const currentValues = Array.isArray(activeFilters[category]) 
        ? [...activeFilters[category] as string[]] 
        : []
      
      // Toggle the value
      if (currentValues.includes(value)) {
        const newValues = currentValues.filter(v => v !== value && v !== 'all')
        onFilterChange(category, newValues.length > 0 ? newValues : ['all'])
      } else {
        const newValues = [...currentValues.filter(v => v !== 'all'), value]
        onFilterChange(category, newValues)
      }
    }
  }
  
  const handleSortSelect = (field: string) => {
    if (onSortChange) {
      const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc'
      onSortChange(field, newDirection)
    }
    setActiveDropdown(null)
  }
  
  // Get category label for display purposes
  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case 'subject': return 'Subject'
      case 'difficulty': return 'Difficulty'
      case 'period': return 'Time'
      case 'accuracy': return 'Accuracy'
      case 'status': return 'Status'
      case 'topic': return 'Topic'
      default: return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }
  
  // Get active filter label with selected values
  const getActiveFilterLabel = (category: string): string => {
    const values = activeFilters[category]
    
    if (Array.isArray(values)) {
      if (values.length === 0 || (values.length === 1 && values[0] === 'all')) {
        // Return the category name instead of "All"
        return getCategoryLabel(category)
      }
      
      if (values.length === 1) {
        const option = filterOptions.find(opt => opt.category === category && opt.id === values[0])
        return option?.label || getCategoryLabel(category)
      }
      
      return `${values.length} selected`
    } else {
      // Backward compatibility with string values
      const value = values || 'all'
      if (value === 'all') {
        return getCategoryLabel(category)
      }
      
      const option = filterOptions.find(opt => opt.category === category && opt.id === value)
      return option?.label || getCategoryLabel(category)
    }
  }
  
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'subject':
        return 'text-pink-600 bg-pink-50 border-pink-200 dark:bg-pink-900/20 dark:border-pink-800'
      case 'difficulty':
        return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
      case 'period':
        return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
      case 'accuracy':
        return 'text-purple-600 bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800'
      case 'sort':
        return 'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
    }
  }
  
  const getSortLabel = (): string => {
    const option = sortOptions.find(opt => opt.id === sortField)
    return `${option?.label || 'Date'} ${sortDirection === 'asc' ? '↑' : '↓'}`
  }
  
  return (
    <div ref={dropdownRef} className="flex flex-col gap-2 py-2 mb-4">
      {/* Top row with filter buttons */}
      <div className="relative flex items-center gap-2">
        <div className="text-slate-500 dark:text-slate-400 mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V13a1 1 0 01-.293.707l-2 2A1 1 0 018 15v-3.586l-4.707-4.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Filter buttons */}
        {['subject', 'difficulty', 'period', 'accuracy'].map(category => (
          <div key={category} className="relative">
            <button
              onClick={() => toggleDropdown(category)}
              className={`w-24 px-3 py-1.5 text-xs rounded-full border ${getCategoryColor(category)} hover:bg-opacity-80 transition-colors text-center truncate`}
            >
              {getActiveFilterLabel(category)}
            </button>
            
            {activeDropdown === category && (
              <div className="absolute top-8 left-0 z-10 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Option list */}
                {filterOptions
                  .filter(option => option.category === category && option.id !== 'all')
                  .map(option => {
                    const values = Array.isArray(activeFilters[category]) ? activeFilters[category] : [activeFilters[category]]
                    const isSelected = values.includes(option.id)
                    
                    return (
                      <div
                        key={option.id}
                        onClick={() => handleFilterSelect(category, option.id)}
                        className={`flex items-center w-full px-4 py-2 text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 ${
                          isSelected ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-300' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex-shrink-0 w-4 h-4 mr-2">
                          {isSelected && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span>{option.label}</span>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        ))}
        
        {/* Sort button */}
        <div className="relative ml-auto">
          <button
            onClick={() => toggleDropdown('sort')}
            className={`w-24 px-3 py-1.5 text-xs rounded-full border ${getCategoryColor('sort')} hover:bg-opacity-80 transition-colors flex items-center justify-center gap-1`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
            <span className="truncate">{getSortLabel()}</span>
          </button>
          
          {activeDropdown === 'sort' && (
            <div className="absolute top-8 right-0 z-10 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              {sortOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleSortSelect(option.id)}
                  className={`block w-full text-left px-4 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700 ${
                    sortField === option.id ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-300' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {option.label} {sortField === option.id ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
