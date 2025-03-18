'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'

interface FilterBarProps {
  filters: {
    subject: string[];
    type: string[];
    accuracyRange: [number, number];
    timeRange: [number, number];
    pace: string[];
    dateRange: [Date, Date];
  };
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onFilterChange: (filters: FilterBarProps['filters']) => void;
  onSortChange: (key: string, direction: 'asc' | 'desc') => void;
  onClearFilters: () => void;
}

export function FilterBar({
  filters,
  sortConfig,
  onFilterChange,
  onSortChange,
  onClearFilters,
}: FilterBarProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  
  // Subject filter handler
  const handleSubjectChange = (subject: string) => {
    const newSubjects = filters.subject.includes(subject)
      ? filters.subject.filter(s => s !== subject)
      : [...filters.subject, subject]
    
    onFilterChange({
      ...filters,
      subject: newSubjects
    })
  }
  
  // Type filter handler
  const handleTypeChange = (type: string) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type]
    
    onFilterChange({
      ...filters,
      type: newTypes
    })
  }
  
  // Pace filter handler
  const handlePaceChange = (pace: string) => {
    const newPaces = filters.pace.includes(pace)
      ? filters.pace.filter(p => p !== pace)
      : [...filters.pace, pace]
    
    onFilterChange({
      ...filters,
      pace: newPaces
    })
  }
  
  // Accuracy range handler
  const handleAccuracyRangeChange = (rangeType: 'min' | 'max', value: number) => {
    const newRange: [number, number] = [...filters.accuracyRange] as [number, number]
    if (rangeType === 'min') {
      newRange[0] = value
    } else {
      newRange[1] = value
    }
    
    onFilterChange({
      ...filters,
      accuracyRange: newRange
    })
  }
  
  // Time range handler
  const handleTimeRangeChange = (rangeType: 'min' | 'max', value: number) => {
    const newRange: [number, number] = [...filters.timeRange] as [number, number]
    if (rangeType === 'min') {
      newRange[0] = value
    } else {
      newRange[1] = value
    }
    
    onFilterChange({
      ...filters,
      timeRange: newRange
    })
  }
  
  // Date range handler
  const handleDateRangeChange = (rangeType: 'start' | 'end', dateString: string) => {
    const newRange: [Date, Date] = [...filters.dateRange] as [Date, Date]
    if (rangeType === 'start') {
      newRange[0] = new Date(dateString)
    } else {
      newRange[1] = new Date(dateString)
    }
    
    onFilterChange({
      ...filters,
      dateRange: newRange
    })
  }
  
  // Format date for input
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }
  
  // Sort handler
  const handleSortChange = (key: string) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    onSortChange(key, direction)
  }
  
  return (
    <div className="bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-lg border border-slate-100 p-[3%] dark:from-slate-800 dark:to-slate-800/80 dark:border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-500/5 to-transparent rounded-bl-full"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-indigo-500/[0.03] to-transparent rounded-tr-full"></div>
      
      <div className="relative z-10 flex flex-wrap justify-between items-center mb-5">
        <h3 className="font-semibold text-slate-800 dark:text-white text-lg flex items-center">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">
            Filters & Sort
          </span>
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-200 hover:bg-sky-50 flex items-center gap-1.5 dark:border-slate-700 dark:text-slate-300 dark:hover:text-sky-400 dark:hover:border-sky-700 dark:hover:bg-sky-950/30"
          >
            {showAdvancedFilters ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span>Hide Advanced</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>Show Advanced</span>
              </>
            )}
          </button>
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-100 hover:from-red-50 hover:to-red-50 flex items-center gap-1.5 dark:from-slate-800 dark:to-slate-700 dark:border-slate-600 dark:text-slate-300 dark:hover:text-red-400 dark:hover:border-red-900/50 dark:hover:from-red-950/30 dark:hover:to-red-900/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Clear All</span>
          </button>
        </div>
      </div>
      
      {/* Basic filters - with improved styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 relative z-10">
        {/* Subject Filter */}
        <div className="bg-white/50 rounded-xl p-3 border border-slate-100 shadow-sm dark:bg-slate-800/30 dark:border-slate-700/50">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-indigo-500 dark:text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            Subject
          </label>
          <div className="flex flex-wrap gap-2">
            {['Reading', 'Writing', 'Math'].map(subject => (
              <button
                key={subject}
                onClick={() => handleSubjectChange(subject)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                  filters.subject.includes(subject)
                    ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-indigo-600 shadow-sm dark:from-indigo-600 dark:to-indigo-700 dark:border-indigo-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-indigo-400 dark:hover:border-indigo-800'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
        
        {/* Type Filter */}
        <div className="bg-white/50 rounded-xl p-3 border border-slate-100 shadow-sm dark:bg-slate-800/30 dark:border-slate-700/50">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-sky-500 dark:text-sky-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Type
          </label>
          <div className="flex flex-wrap gap-2">
            {['Algebra', 'Geometry', 'Comprehension', 'Grammar', 'Vocabulary'].map(type => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                  filters.type.includes(type)
                    ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white border-sky-600 shadow-sm dark:from-sky-600 dark:to-sky-700 dark:border-sky-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-sky-600 hover:border-sky-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-sky-400 dark:hover:border-sky-800'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {/* Sort - with improved styling */}
        <div className="bg-white/50 rounded-xl p-3 border border-slate-100 shadow-sm dark:bg-slate-800/30 dark:border-slate-700/50">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-purple-500 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
            </svg>
            Sort By
          </label>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <select
                className="w-full px-3 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 appearance-none pl-10 pr-10 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-purple-700 dark:focus:ring-purple-900 dark:focus:ring-opacity-25"
                value={sortConfig.key}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="dateCompleted">Date</option>
                <option value="accuracy">Accuracy</option>
                <option value="timeUsed">Time</option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01" />
                </svg>
              </div>
            </div>
            <button
              onClick={() => onSortChange(sortConfig.key, sortConfig.direction === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-colors duration-200 flex items-center justify-center shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-purple-950/30 dark:hover:border-purple-800 dark:hover:text-purple-400"
            >
              {sortConfig.direction === 'asc' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Advanced filters - with enhanced styling */}
      {showAdvancedFilters && (
        <div className="mt-6 relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/[0.02] to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-sky-500/[0.01] to-transparent rounded-tr-full pointer-events-none"></div>
          
          {/* Section header */}
          <div className="mb-5 border-t border-slate-200 dark:border-slate-700/80 pt-5">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 opacity-80"></div>
              <h4 className="font-medium text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                Advanced Filters
              </h4>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Accuracy Range */}
            <div className="bg-white/70 p-4 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-800/30 dark:border-slate-700/50">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Accuracy Range
              </label>
              <div className="mt-3">
                <div className="relative pt-5">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-700/60">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{ width: `${filters.accuracyRange[1]}%` }}
                    ></div>
                    <div 
                      className="h-full bg-gradient-to-r from-slate-300 to-slate-300 rounded-full absolute top-0"
                      style={{ width: `${filters.accuracyRange[0]}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-slate-500">
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={filters.accuracyRange[0]}
                        onChange={(e) => handleAccuracyRangeChange('min', parseInt(e.target.value))}
                        className="w-14 px-2 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-indigo-800 dark:focus:ring-indigo-900 dark:focus:ring-opacity-25"
                      />
                      <span className="mx-2">-</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={filters.accuracyRange[1]}
                        onChange={(e) => handleAccuracyRangeChange('max', parseInt(e.target.value))}
                        className="w-14 px-2 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-indigo-800 dark:focus:ring-indigo-900 dark:focus:ring-opacity-25"
                      />
                      <span className="ml-1.5 text-slate-600 dark:text-slate-400">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Time Range */}
            <div className="bg-white/70 p-4 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-800/30 dark:border-slate-700/50">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-sky-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Time Range (min)
              </label>
              <div className="mt-3">
                <div className="relative pt-5">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-700/60">
                    <div 
                      className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
                      style={{ width: `${(filters.timeRange[1] / 120) * 100}%` }}
                    ></div>
                    <div 
                      className="h-full bg-gradient-to-r from-slate-300 to-slate-300 rounded-full absolute top-0"
                      style={{ width: `${(filters.timeRange[0] / 120) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-slate-500">
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={filters.timeRange[0]}
                        onChange={(e) => handleTimeRangeChange('min', parseInt(e.target.value))}
                        className="w-14 px-2 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-sky-800 dark:focus:ring-sky-900 dark:focus:ring-opacity-25"
                      />
                      <span className="mx-2">-</span>
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={filters.timeRange[1]}
                        onChange={(e) => handleTimeRangeChange('max', parseInt(e.target.value))}
                        className="w-14 px-2 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm focus:border-sky-300 focus:ring focus:ring-sky-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-sky-800 dark:focus:ring-sky-900 dark:focus:ring-opacity-25"
                      />
                      <span className="ml-1.5 text-slate-600 dark:text-slate-400">min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pace */}
            <div className="bg-white/70 p-4 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-800/30 dark:border-slate-700/50">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Pace
              </label>
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  { label: 'Fast', icon: 'M13 5l7 7-7 7M5 5l7 7-7 7' },
                  { label: 'Normal', icon: 'M9 5l7 7-7 7M5 5l7 7-7 7' },
                  { label: 'Slow', icon: 'M10 19l-7-7 7-7m4 14l-7-7 7-7' }
                ].map(pace => (
                  <button
                    key={pace.label}
                    onClick={() => handlePaceChange(pace.label)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 flex items-center gap-1.5 ${
                      filters.pace.includes(pace.label)
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600 shadow-sm dark:from-amber-600 dark:to-amber-700 dark:border-amber-700'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-amber-600 hover:border-amber-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:text-amber-400 dark:hover:border-amber-800'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={pace.icon} />
                    </svg>
                    {pace.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Date Range */}
            <div className="bg-white/70 p-4 rounded-xl shadow-sm border border-slate-100 dark:bg-slate-800/30 dark:border-slate-700/50 md:col-span-3">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Date Range
              </label>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mt-3">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 dark:text-slate-400 text-xs">From</span>
                  </div>
                  <input
                    type="date"
                    value={formatDate(filters.dateRange[0])}
                    onChange={(e) => handleDateRangeChange('start', e.target.value)}
                    className="pl-14 pr-3 py-2 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 w-full shadow-sm focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-rose-800 dark:focus:ring-rose-900 dark:focus:ring-opacity-25"
                  />
                </div>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 dark:text-slate-400 text-xs">To</span>
                  </div>
                  <input
                    type="date"
                    value={formatDate(filters.dateRange[1])}
                    onChange={(e) => handleDateRangeChange('end', e.target.value)}
                    className="pl-10 pr-3 py-2 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 w-full shadow-sm focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-25 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:border-rose-800 dark:focus:ring-rose-900 dark:focus:ring-opacity-25"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
