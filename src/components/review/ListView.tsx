'use client'

import { useState } from 'react'
import { PracticeSet } from '@/lib/mockData'

interface ListViewProps {
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
}

export function ListView({ practiceSets, onSelectSet, selectedSetId }: ListViewProps) {
  // For pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  
  // Calculate total pages
  const totalPages = Math.ceil(practiceSets.length / itemsPerPage)
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = practiceSets.slice(indexOfFirstItem, indexOfLastItem)
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }
  
  // Get color class based on accuracy
  const getAccuracyColorClass = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
    if (accuracy >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
  }
  
  // Get color class based on pace
  const getPaceColorClass = (pace: string) => {
    if (pace === 'Fast') return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
    if (pace === 'Normal') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
  }
  
  // Get subject icon
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Math':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 12L12 7L17 12L12 17L7 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case 'Reading':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L6 6M6 6L8 8M6 6L8 4M6 6L4 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 16L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 20L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      case 'Writing':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 18L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 14L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 10L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M7 10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9C6.55228 9 7 9.44772 7 10Z" fill="currentColor" />
            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          </svg>
        )
    }
  }
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  
  return (
    <div className="space-y-6 p-[3%]">
      {/* List items */}
      {currentItems.length > 0 ? (
        currentItems.map((set) => (
          <div
            key={set.id}
            onClick={() => onSelectSet(set.id)}
            className={`bg-white rounded-xl shadow-md border p-5 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
              selectedSetId === set.id
              ? 'border-sky-500 ring-2 ring-sky-500/50'
              : 'border-slate-100 dark:border-slate-700/50'
            } dark:bg-slate-800/90 dark:hover:bg-slate-800`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Subject and Type */}
              <div className="flex items-center gap-3 md:w-1/4">
                <div className={`p-2 rounded-full ${set.subject === 'Math' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100' 
                  : set.subject === 'Reading' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'}`}>
                  {getSubjectIcon(set.subject)}
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">{set.subject}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{set.type}</div>
                </div>
              </div>
              
              {/* Accuracy and Time */}
              <div className="flex items-center gap-2 md:gap-6 md:w-1/2">
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Accuracy</div>
                  <div className={`inline-block px-2 py-0.5 rounded-full text-sm font-medium ${getAccuracyColorClass(set.accuracy)}`}>
                    {set.accuracy}%
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Time Used</div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {formatTime(set.timeUsed)}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Pace</div>
                  <div className={`inline-block px-2 py-0.5 rounded-full text-sm font-medium ${getPaceColorClass(set.pace)}`}>
                    {set.pace}
                  </div>
                </div>
              </div>
              
              {/* Date and Difficulty */}
              <div className="flex items-center justify-between md:w-1/4">
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Completed</div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {formatDate(set.dateCompleted)}
                  </div>
                </div>
                
                <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  set.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                  : set.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                }`}>
                  {set.difficulty}
                </div>
              </div>
            </div>
            
            {/* Additional features indicator */}
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-2">
              {/* Time of day */}
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>{set.timeOfDay}</span>
              </div>
              
              {/* Mistake types summary */}
              {set.mistakeTypes.conceptual > 0 && (
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span>{set.mistakeTypes.conceptual} conceptual</span>
                </div>
              )}
              
              {set.mistakeTypes.careless > 0 && (
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{set.mistakeTypes.careless} careless</span>
                </div>
              )}
              
              {set.mistakeTypes.timeManagement > 0 && (
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{set.mistakeTypes.timeManagement} time</span>
                </div>
              )}
              
              {/* Fatigue indicator */}
              {set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy > 15 && (
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span>Fatigue detected</span>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white text-center py-8 rounded-lg shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400">No practice sets match your filters</p>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-full shadow-lg overflow-hidden">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-2.5 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`relative inline-flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  currentPage === page
                    ? 'bg-sky-500 text-white shadow-inner'
                    : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-3 py-2.5 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}
