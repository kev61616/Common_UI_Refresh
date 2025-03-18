import { useState, useRef, useEffect } from 'react'

interface FilterOption {
  id: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedOptions,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle selection status for an option
  const toggleOption = (optionId: string) => {
    const newSelected = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    
    onChange(newSelected);
  };
  
  // Count selected options for the badge
  const selectedCount = selectedOptions.length;
  
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 text-sm rounded-md flex items-center gap-2 transition ${
          isOpen || selectedCount > 0
            ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300'
            : 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
        }`}
      >
        {label}
        {selectedCount > 0 && (
          <span className="bg-sky-200 text-sky-800 text-xs px-1.5 py-0.5 rounded-full dark:bg-sky-800 dark:text-sky-200">
            {selectedCount}
          </span>
        )}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-10 overflow-hidden">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              
              return (
                <button
                  key={option.id}
                  className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center group ${
                    isSelected
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                  onClick={() => toggleOption(option.id)}
                >
                  {/* Animated checkbox */}
                  <div className={`w-5 h-5 mr-3 flex-shrink-0 border rounded transition-all duration-200 flex items-center justify-center ${
                    isSelected
                      ? 'border-sky-500 bg-sky-500 dark:border-sky-400 dark:bg-sky-400'
                      : 'border-slate-300 dark:border-slate-600 group-hover:border-sky-400'
                  }`}>
                    <svg 
                      className={`h-3 w-3 text-white transition-all duration-200 ${
                        isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-75'
                      }`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
