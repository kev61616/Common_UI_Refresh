'use client'

import React from 'react'

interface SubjectFilterProps {
  subjects: string[]
  filterSubject: string | null
  setFilterSubject: (subject: string | null) => void
}

/**
 * Enhanced subject filter with a more beautiful design
 * Displays Reading, Writing, and Math alongside percentages
 */
export function SubjectFilter({
  subjects,
  filterSubject,
  setFilterSubject
}: SubjectFilterProps) {
  if (subjects.length === 0) return null
  
  // Subject colors and percentages (static for demo)
  const subjectInfo: {
    [key: string]: { color: string; percent: number };
  } = {
    'Reading': { color: 'from-blue-500 to-blue-400', percent: 78 },
    'Writing': { color: 'from-amber-500 to-amber-400', percent: 85 },
    'Math': { color: 'from-indigo-500 to-indigo-400', percent: 72 },
  };
  
  return (
    <div className="mb-8 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* All Subjects */}
        <div 
          onClick={() => setFilterSubject(null)}
          className={`rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all duration-300 ${
            filterSubject === null
              ? 'border-2 border-indigo-400 scale-105 transform rotate-1'
              : 'border border-slate-200 dark:border-slate-700 hover:scale-105'
          }`}
        >
          <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white p-4">
            <div className="text-lg font-bold mb-1">All Subjects</div>
            <div className="flex items-center">
              <div className="text-2xl font-bold">78%</div>
              <div className="ml-2 text-xs opacity-75">overall</div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-2 text-xs text-slate-500 dark:text-slate-400">
            277 questions total
          </div>
        </div>
        
        {/* Individual Subject Cards */}
        {subjects.map((subject, index) => (
          <div 
            key={`${subject}-${index}`}
            onClick={() => setFilterSubject(subject)}
            className={`rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all duration-300 ${
              filterSubject === subject
                ? 'border-2 border-indigo-400 scale-105 transform rotate-1'
                : 'border border-slate-200 dark:border-slate-700 hover:scale-105'
            }`}
          >
            <div className={`bg-gradient-to-r ${subjectInfo[subject]?.color || 'from-gray-700 to-gray-600'} text-white p-4`}>
              <div className="text-lg font-bold mb-1">{subject}</div>
              <div className="flex items-center">
                <div className="text-2xl font-bold">{subjectInfo[subject]?.percent || 70}%</div>
                <div className="ml-2 text-xs opacity-75">accuracy</div>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-2 text-xs text-slate-500 dark:text-slate-400">
              {subject === 'Reading' ? '111' : subject === 'Writing' ? '81' : '85'} questions
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
