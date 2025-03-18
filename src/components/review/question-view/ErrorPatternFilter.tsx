import React from 'react'
import { ErrorPattern } from './types'
import { ErrorPatternIcon, PatternDetectionIcon } from './icons'

interface ErrorPatternFilterProps {
  errorPatterns: ErrorPattern[];
  selectedPatterns: string[];
  togglePattern: (pattern: string) => void;
}

export const ErrorPatternFilter: React.FC<ErrorPatternFilterProps> = ({
  errorPatterns,
  selectedPatterns,
  togglePattern
}) => {
  if (errorPatterns.length === 0) return null;
  
  return (
    <div className="md:w-3/5">
      <h3 className="text-sm font-medium text-slate-700 mb-3 dark:text-slate-300 flex items-center gap-1.5">
        <ErrorPatternIcon />
        Error Pattern Detection
      </h3>
      <div className="flex flex-wrap gap-2">
        {errorPatterns.map(pattern => (
          <button 
            key={pattern.name}
            onClick={() => togglePattern(pattern.name)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              selectedPatterns.includes(pattern.name)
                ? 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/50 dark:text-purple-200 dark:border-purple-700'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
            }`}
          >
            <PatternDetectionIcon />
            {pattern.description} ({pattern.count})
          </button>
        ))}
      </div>
    </div>
  )
}
