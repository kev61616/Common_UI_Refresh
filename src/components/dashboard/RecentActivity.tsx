'use client'

import { useMemo } from 'react'
import { PracticeSet } from '@/lib/mockData'

interface RecentActivityProps {
  practiceSets: PracticeSet[]
}

export function RecentActivity({ practiceSets }: RecentActivityProps) {
  // Get most recent practice sets, limited to 5
  const recentSets = useMemo(() => {
    return [...practiceSets]
      .sort((a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime())
      .slice(0, 5)
  }, [practiceSets])
  
  // Format relative date
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return `${Math.floor(diffDays / 30)} months ago`
  }
  
  // Get subject color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
      case 'Reading': return 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
      case 'Writing': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    }
  }
  
  // Determine accuracy class
  const getAccuracyClass = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600 dark:text-green-400'
    if (accuracy >= 60) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-600 dark:text-red-400'
  }
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
      <h3 className="font-medium text-slate-800 dark:text-white text-lg mb-4">Recent Activity</h3>
      
      {recentSets.length === 0 ? (
        <div className="py-4 text-center text-slate-500 dark:text-slate-400">
          No recent practice sets found.
        </div>
      ) : (
        <div className="space-y-3">
          {recentSets.map(set => (
            <div key={set.id} className="flex items-center bg-slate-50 dark:bg-slate-850/50 rounded-lg p-3 relative overflow-hidden group">
              {/* Left accent border based on performance */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                set.accuracy >= 80 ? 'bg-green-500' : set.accuracy >= 60 ? 'bg-amber-500' : 'bg-red-500'
              }`}></div>
              
              {/* Subject tag */}
              <div className={`rounded-md px-2 py-1 text-xs font-medium ${getSubjectColor(set.subject)}`}>
                {set.subject}
              </div>
              
              {/* Activity info */}
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium text-slate-800 dark:text-white">{set.type}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{formatRelativeDate(set.dateCompleted)}</p>
              </div>
              
              {/* Score */}
              <div className={`text-sm font-semibold ${getAccuracyClass(set.accuracy)}`}>
                {set.accuracy}%
              </div>
              
              {/* Hover arrow indicator */}
              <div className="ml-2 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </div>
          ))}
          
          {/* View all link */}
          <div className="text-center mt-4">
            <a href="/review/by-set" className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors">
              View all practice sets →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
