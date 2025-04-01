'use client'

import { useState } from 'react'
import { PracticeSet } from '@/lib/mockData'
import { getDataWithFallback } from '@/lib/dataUtils'
import { ClientOnly, SubjectIcon } from './ClientOnlyIcons'
import { ClientDateFormatter } from './ClientDateFormatter'
import { 
  ClientAccuracyMeter, 
  ClientMistakeTypes, 
  ClientTimeFormat, 
  ClientFatigueDisplay 
} from './ClientOnlyMetrics'
import { ClientBadge } from './ClientOnlyBadges'

interface SetViewTableProps {
  practiceSets: PracticeSet[];
  onSelectSet?: (id: string) => void;
  selectedSetId?: string | null;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  filters?: Record<string, string[] | string>;
}

/**
 * SetViewTable - A clean, tabular view of practice sets with detailed performance metrics
 * 
 * This standalone production component provides a timeline-inspired table view
 * that showcases practice sets with rich performance data and visual indicators.
 */
export function SetViewTable({ 
  practiceSets, 
  onSelectSet, 
  selectedSetId,
  sortField = 'dateCompleted', 
  sortDirection = 'desc',
  filters = {} 
}: SetViewTableProps) {
  // Use the utility function to get data with fallback
  const rawSets = getDataWithFallback(practiceSets);
  
  // Apply filters with multi-select support
  const filteredSets = rawSets.filter(set => {
    // Subject filter - check if 'all' is selected or if the set's subject is in the selected values
    const subjectFilter = filters.subject;
    if (subjectFilter && Array.isArray(subjectFilter) && !subjectFilter.includes('all')) {
      if (!subjectFilter.includes(set.subject)) return false;
    } else if (typeof subjectFilter === 'string' && subjectFilter !== 'all' && set.subject !== subjectFilter) {
      return false;
    }
    
    // Difficulty filter
    const difficultyFilter = filters.difficulty;
    if (difficultyFilter && Array.isArray(difficultyFilter) && !difficultyFilter.includes('all')) {
      if (!difficultyFilter.includes(set.difficulty)) return false;
    } else if (typeof difficultyFilter === 'string' && difficultyFilter !== 'all' && set.difficulty !== difficultyFilter) {
      return false;
    }
    
    // Time period filter (assuming dateCompleted is an ISO string)
    const periodFilter = filters.period;
    if (periodFilter) {
      const periodsToCheck = Array.isArray(periodFilter) ? periodFilter : [periodFilter];
      
      // Skip check if 'all' is among the selected values
      if (!periodsToCheck.includes('all')) {
        const setDate = new Date(set.dateCompleted);
        const now = new Date();
        let passesTimeFilter = false;
        
        for (const period of periodsToCheck) {
          if (period === 'week') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (setDate >= weekAgo) {
              passesTimeFilter = true;
              break;
            }
          } else if (period === 'month') {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            if (setDate >= monthAgo) {
              passesTimeFilter = true;
              break;
            }
          }
        }
        
        if (!passesTimeFilter) return false;
      }
    }
    
    // Performance filter
    const performanceFilter = filters.performance;
    if (performanceFilter) {
      const performancesToCheck = Array.isArray(performanceFilter) ? performanceFilter : [performanceFilter];
      
      // Skip check if 'all' is among the selected values
      if (!performancesToCheck.includes('all')) {
        let passesPerformanceFilter = false;
        
        for (const performance of performancesToCheck) {
          if (performance === 'excellent' && set.accuracy >= 90) {
            passesPerformanceFilter = true;
            break;
          } else if (performance === 'good' && set.accuracy >= 70 && set.accuracy < 90) {
            passesPerformanceFilter = true;
            break;
          } else if (performance === 'needs-improvement' && set.accuracy < 70) {
            passesPerformanceFilter = true;
            break;
          }
        }
        
        if (!passesPerformanceFilter) return false;
      }
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedSets = [...filteredSets].sort((a, b) => {
    let comparison = 0;
    
    // Sort by the specified field
    switch (sortField) {
      case 'dateCompleted':
        comparison = new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime();
        break;
      case 'accuracy':
        comparison = a.accuracy - b.accuracy;
        break;
      case 'timeUsed':
        comparison = a.timeUsed - b.timeUsed;
        break;
      case 'subject':
        comparison = a.subject.localeCompare(b.subject);
        break;
      case 'difficulty':
        // Convert difficulty to numerical value for sorting
        const difficultyMap: Record<string, number> = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        comparison = (difficultyMap[a.difficulty] || 0) - (difficultyMap[b.difficulty] || 0);
        break;
      default:
        comparison = 0;
    }
    
    // Apply sort direction
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  const sets = sortedSets;
  
  // For pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  
  // Calculate total pages
  const totalPages = Math.ceil(sets.length / itemsPerPage)
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sets.slice(indexOfFirstItem, indexOfLastItem)
  
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
  const getAccuracyStyle = (accuracy: number) => {
    if (accuracy >= 90) return 'text-green-600 dark:text-green-400'
    if (accuracy >= 70) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }
  
  // Get progress bar color based on accuracy
  const getProgressBarColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-500 dark:bg-green-400'
    if (accuracy >= 70) return 'bg-yellow-500 dark:bg-yellow-400'
    return 'bg-red-500 dark:bg-red-400'
  }
  
  // Get badge for difficulty
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded dark:bg-green-900/40 dark:text-green-300">Easy</span>
      case 'Medium':
        return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded dark:bg-yellow-900/40 dark:text-yellow-300">Medium</span>
      case 'Hard':
        return <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded dark:bg-red-900/40 dark:text-red-300">Hard</span>
      default:
        return null
    }
  }
  
  // Get badge for pace
  const getPaceBadge = (pace: string) => {
    switch (pace) {
      case 'Fast':
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded dark:bg-blue-900/40 dark:text-blue-300">Fast</span>
      case 'Normal':
        return <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded dark:bg-green-900/40 dark:text-green-300">Normal</span>
      case 'Slow':
        return <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded dark:bg-orange-900/40 dark:text-orange-300">Slow</span>
      default:
        return null
    }
  }
  
  // Using the ClientOnly icon component to prevent hydration errors
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  
  // Handle set selection
  const handleSelectSet = (id: string) => {
    if (onSelectSet) {
      onSelectSet(id);
    }
  }
  
  return (
    <div className="p-4">
      {/* Table style list */}
      <div className="overflow-x-auto bg-white dark:bg-slate-900 shadow-md rounded-lg px-0">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50"
                onClick={() => onSelectSet && onSelectSet(`sort:subject:${sortField === 'subject' && sortDirection === 'asc' ? 'desc' : 'asc'}`)}
              >
                Subject
                {sortField === 'subject' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50"
                onClick={() => onSelectSet && onSelectSet(`sort:dateCompleted:${sortField === 'dateCompleted' && sortDirection === 'asc' ? 'desc' : 'asc'}`)}
              >
                Date
                {sortField === 'dateCompleted' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50"
                onClick={() => onSelectSet && onSelectSet(`sort:accuracy:${sortField === 'accuracy' && sortDirection === 'asc' ? 'desc' : 'asc'}`)}
              >
                Performance
                {sortField === 'accuracy' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50"
                onClick={() => onSelectSet && onSelectSet(`sort:timeUsed:${sortField === 'timeUsed' && sortDirection === 'asc' ? 'desc' : 'asc'}`)}
              >
                Time Used
                {sortField === 'timeUsed' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50"
                onClick={() => onSelectSet && onSelectSet(`sort:difficulty:${sortField === 'difficulty' && sortDirection === 'asc' ? 'desc' : 'asc'}`)}
              >
                Difficulty
                {sortField === 'difficulty' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider dark:text-slate-400">
                Pace
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200 dark:bg-slate-900 dark:divide-slate-700">
            {currentItems.length > 0 ? (
              currentItems.map((set) => (
                <tr 
                  key={set.id}
                  onClick={() => handleSelectSet(set.id)}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/70 cursor-pointer transition-colors duration-150 ${
                    selectedSetId === set.id 
                    ? 'bg-sky-50 dark:bg-sky-900/20 border-l-4 border-sky-500' 
                    : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <SubjectIcon subject={set.subject} id={set.id} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900 dark:text-white" suppressHydrationWarning>
                          {set.subject}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400" suppressHydrationWarning>
                          {set.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-white">
                      <ClientDateFormatter dateString={set.dateCompleted} format="medium" fallback="--" />
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400" suppressHydrationWarning>
                      {set.timeOfDay}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col items-center">
                      <ClientAccuracyMeter accuracy={set.accuracy} id={set.id} />
                      <ClientMistakeTypes 
                        conceptual={set.mistakeTypes.conceptual}
                        careless={set.mistakeTypes.careless}
                        timeManagement={set.mistakeTypes.timeManagement}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                      <ClientTimeFormat seconds={set.timeUsed} />
                    </div>
                    <ClientFatigueDisplay 
                      earlyAccuracy={set.sessionFatigue.earlyAccuracy} 
                      lateAccuracy={set.sessionFatigue.lateAccuracy}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      <ClientBadge type={set.difficulty} fallback={null} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      <ClientBadge type={set.pace} fallback={null} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                  No practice sets match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-5 px-2">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
            <span className="font-medium">{Math.min(indexOfLastItem, sets.length)}</span> of{' '}
            <span className="font-medium">{sets.length}</span> results
          </div>
          
          <nav className="inline-flex shadow-sm -space-x-px">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-500 dark:text-indigo-400'
                    : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
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
