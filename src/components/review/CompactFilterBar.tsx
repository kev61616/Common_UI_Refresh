'use client'

import { useState, useRef, useEffect } from 'react'
import { Dropdown } from '@/components/common/Dropdown'

interface FilterBarProps {
  filters: {
    subject: string[];
    type: string[];
    accuracyRange: [number, number];
    timeRange: [number, number];
    pace: string[];
    dateRange: [Date, Date];
    dates: string[];
  };
  onFilterChange: (filters: FilterBarProps['filters']) => void;
  onClearFilters: () => void;
  onFiltersApplied?: (filters: FilterBarProps['filters']) => void;
}

// Subject categories and subcategories
const subjectCategories = {
  'Reading': [
    'Main Purpose',
    'Main Idea',
    'Summary',
    'Specific Detail',
    'Supporting Evidence',
    'Supporting Quotation',
    'Underlined Function',
    'Logical Reasoning',
    'Two Texts',
    'Long Completion',
    'Structure of Text',
    'Vocabulary',
    'Data Analysis: Graph(s)',
    'Data Analysis: Table(s)'
  ],
  'Writing': [
    'Parts of Speech',
    'Sentence Structure',
    'Pronouns',
    'Agreement',
    'Punctuation',
    'Verb',
    'Degree',
    'Mood',
    'Voice',
    'Transition'
  ],
  'Math': [
    'Expressions, Equations, and Inequalities',
    'Linear and Nonlinear',
    'Statistical Analysis and Probability',
    'Triangle',
    'Rectangle',
    'Circle',
    'Parabola',
    'Cone',
    'Cube',
    'Cylinder',
    'Sphere',
    'Trigonometric Ratios and Functions'
  ]
};

// Flatten for type selection
const allTypes = [
  ...subjectCategories.Reading,
  ...subjectCategories.Writing,
  ...subjectCategories.Math
];

export function CompactFilterBar({
  filters,
  onFilterChange,
  onClearFilters,
  onFiltersApplied,
}: FilterBarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setActiveCategory(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Subject filter handler
  const handleSubjectChange = (subject: string) => {
    console.log('Subject filter changed:', subject);
    const newSubjects = filters.subject.includes(subject)
      ? filters.subject.filter(s => s !== subject)
      : [...filters.subject, subject];
    
    const updatedFilters = {
      ...filters,
      subject: newSubjects
    };
    
    // Make sure we're passing a completely new object
    onFilterChange({...updatedFilters});
    
    // Apply filters immediately
    if (onFiltersApplied) {
      onFiltersApplied({...updatedFilters});
    }
    
    // Close dropdown after selection - optional but can improve UX
    setActiveDropdown(null);
  };
  
  // Type filter handler
  const handleTypeChange = (type: string) => {
    console.log('Type filter changed:', type);
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    
    const updatedFilters = {
      ...filters,
      type: newTypes
    };
    
    // Make sure we're passing a completely new object
    onFilterChange({...updatedFilters});
    
    if (onFiltersApplied) {
      onFiltersApplied({...updatedFilters});
    }
  };
  
  // Date filter handler
  const handleDateChange = (date: string) => {
    console.log('Date filter changed:', date);
    const newDates = filters.dates?.includes(date)
      ? filters.dates.filter(d => d !== date)
      : [...(filters.dates || []), date];
    
    const updatedFilters = {
      ...filters,
      dates: newDates
    };
    
    // Make sure we're passing a completely new object
    onFilterChange({...updatedFilters});
    
    if (onFiltersApplied) {
      onFiltersApplied({...updatedFilters});
    }
    
    // Close dropdown after selection - optional but can improve UX
    setActiveDropdown(null);
  };
  
  // Has active filters check
  const hasActiveFilters = () => {
    return (
      filters.subject.length > 0 ||
      filters.type.length > 0 ||
      (filters.dates && filters.dates.length > 0)
    );
  };
  
  return (
    <div ref={dropdownRef} className="bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-sm border border-slate-100 p-3 dark:from-slate-800 dark:to-slate-800/80 dark:border-slate-700/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-500/5 to-transparent rounded-bl-full"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-indigo-500/[0.03] to-transparent rounded-tr-full"></div>
      
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
        {/* Left side - Filters */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Filter title */}
          <div className="flex items-center">
            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-md flex items-center justify-center shadow-sm mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 font-medium text-sm">
              Filters
            </span>
          </div>
          
          {/* Subject filter */}
          <Dropdown
            trigger={
              <button 
                className={`px-2.5 py-1.5 text-xs font-medium rounded-full border transition-colors duration-200 flex items-center gap-1.5 
                ${activeDropdown === 'subject' 
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800' 
                  : 'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-400'
                } ${filters.subject.length > 0 ? 'ring-1 ring-indigo-200 dark:ring-indigo-800' : ''}`}
                onClick={() => setActiveDropdown(activeDropdown === 'subject' ? null : 'subject')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span>Subject</span>
                {filters.subject.length > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] bg-indigo-100 text-indigo-600 rounded-full dark:bg-indigo-900 dark:text-indigo-300">
                    {filters.subject.length}
                  </span>
                )}
              </button>
            }
            isOpen={activeDropdown === 'subject'}
            onClose={() => setActiveDropdown(null)}
            placement="bottom-left"
            elevated={true}
            className="p-2 space-y-1 w-44 bg-indigo-50 dark:bg-indigo-900/30"
          >
            {Object.keys(subjectCategories).map(subject => (
              <button
                key={subject}
                onClick={() => handleSubjectChange(subject)}
                className={`w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 flex items-center ${
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
          
          {/* Type filter */}
          <Dropdown
            trigger={
              <button 
                className={`px-2.5 py-1.5 text-xs font-medium rounded-full border transition-colors duration-200 flex items-center gap-1.5 
                ${activeDropdown === 'type' 
                  ? 'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800' 
                  : 'bg-white text-slate-600 border-slate-200 hover:text-sky-600 hover:border-sky-200 hover:bg-sky-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-sky-900/30 dark:hover:text-sky-400'
                } ${filters.type.length > 0 ? 'ring-1 ring-sky-200 dark:ring-sky-800' : ''}`}
                onClick={() => {
                  setActiveDropdown(activeDropdown === 'type' ? null : 'type');
                  setActiveCategory(null);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>Type</span>
                {filters.type.length > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] bg-sky-100 text-sky-600 rounded-full dark:bg-sky-900 dark:text-sky-300">
                    {filters.type.length}
                  </span>
                )}
              </button>
            }
            isOpen={activeDropdown === 'type'}
            onClose={() => setActiveDropdown(null)}
            placement="bottom-left"
            elevated={true}
            className="p-2 space-y-1 w-64 bg-white dark:bg-slate-800 max-h-[400px] overflow-y-auto"
          >
            {/* Category selection */}
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-md mb-2">
              {Object.keys(subjectCategories).map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-1 text-xs font-medium py-1.5 px-2 ${
                    activeCategory === category
                      ? 'bg-white dark:bg-slate-600 rounded-md shadow-sm'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Show subcategories based on selected category */}
            {activeCategory && (
              <div className="space-y-1 mt-2">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-3 pb-1">
                  {activeCategory} Categories
                </div>
                {subjectCategories[activeCategory as keyof typeof subjectCategories].map(type => (
                  <button
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 flex items-center ${
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
            )}
            
            {/* Show all types when no category selected */}
            {!activeCategory && (
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-3 pb-1">
                  All Categories
                </div>
                <div className="max-h-[300px] overflow-y-auto pr-1">
                  {Object.keys(subjectCategories).map(category => (
                    <div key={category} className="mb-3">
                      <div className="text-xs font-medium text-slate-600 dark:text-slate-300 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-md mb-1">
                        {category}
                      </div>
                      {subjectCategories[category as keyof typeof subjectCategories].map(type => (
                        <button
                          key={type}
                          onClick={() => handleTypeChange(type)}
                          className={`w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 flex items-center ${
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
                  ))}
                </div>
              </div>
            )}
          </Dropdown>
          
          {/* Date filter */}
          <Dropdown
            trigger={
              <button 
                className={`px-2.5 py-1.5 text-xs font-medium rounded-full border transition-colors duration-200 flex items-center gap-1.5 
                ${activeDropdown === 'date' 
                  ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-800' 
                  : 'bg-white text-slate-600 border-slate-200 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-rose-900/30 dark:hover:text-rose-400'
                } ${filters.dates && filters.dates.length > 0 ? 'ring-1 ring-rose-200 dark:ring-rose-800' : ''}`}
                onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>Date</span>
                {filters.dates && filters.dates.length > 0 && (
                  <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-[10px] bg-rose-100 text-rose-600 rounded-full dark:bg-rose-900 dark:text-rose-300">
                    {filters.dates.length}
                  </span>
                )}
              </button>
            }
            isOpen={activeDropdown === 'date'}
            onClose={() => setActiveDropdown(null)}
            placement="bottom-left"
            elevated={true}
            className="p-2 space-y-1 w-44 bg-rose-50 dark:bg-rose-900/30"
          >
            {['Last 7 days', 'Last 30 days', 'This month', 'Last month', 'This year'].map(date => (
              <button
                key={date}
                onClick={() => handleDateChange(date)}
                className={`w-full px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 flex items-center ${
                  filters.dates?.includes(date)
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300'
                    : 'text-slate-700 hover:bg-rose-100/50 dark:text-slate-300 dark:hover:bg-rose-900/40'
                }`}
              >
                {filters.dates?.includes(date) ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {date}
              </button>
            ))}
          </Dropdown>
        </div>

        {/* Right side - Clear */}
        <div className="flex items-center gap-2">
          {/* Clear filters button */}
          {hasActiveFilters() && (
            <button
              onClick={() => {
                onClearFilters();
                if (onFiltersApplied) {
                  // Apply cleared filters to update the view
                  onFiltersApplied({
                    subject: [],
                    type: [],
                    accuracyRange: [0, 100],
                    timeRange: [0, 120],
                    pace: [],
                    dateRange: [new Date(), new Date()],
                    dates: []
                  });
                }
              }}
              className="px-2.5 py-1.5 text-xs font-medium rounded-full border border-slate-200 bg-white text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors duration-200 flex items-center gap-1.5 dark:bg-slate-800 dark:border-slate-700 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:border-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
