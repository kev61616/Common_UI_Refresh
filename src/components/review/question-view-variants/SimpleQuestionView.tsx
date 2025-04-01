'use client'

import React from 'react'
import { QuestionViewProps } from './types'
import { getDataWithFallback } from '@/lib/dataUtils'

/**
 * A simplified question view that can be used as a fallback
 * when the more complex views encounter errors
 */
export function SimpleQuestionView(props: QuestionViewProps) {
  // Get data with fallback
  const practiceSets = getDataWithFallback(props.practiceSets);
  
  // Extract just enough information for a basic view - using static calculations to avoid hydration errors
  const calculateQuestionsCount = () => {
    // Ensure consistent calculation between server and client
    return practiceSets.reduce((total, set) => {
      // Force proper type handling to avoid hydration mismatches
      const questionsLength = set.questions && Array.isArray(set.questions) ? set.questions.length : 0;
      return total + questionsLength;
    }, 0);
  };
  
  // Use memoized static value to avoid recalculation during hydration
  const questionsCount = calculateQuestionsCount();
  
  // Extract unique subjects
  const subjects = React.useMemo(() => {
    return Array.from(new Set(practiceSets.map(set => set.subject)));
  }, [practiceSets]);
  
  // Calculate accuracy average with consistent rounding behavior
  const accuracyAvg = React.useMemo(() => {
    if (practiceSets.length === 0) return 0;
    
    const sum = practiceSets.reduce((acc, set) => acc + set.accuracy, 0);
    // Use Math.floor to ensure consistent rounding between server and client
    return Math.floor(sum / practiceSets.length);
  }, [practiceSets]);
  
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
        Question View (Simple Mode)
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Overview card */}
        <div className="bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-sky-100 dark:border-sky-800/30">
          <h3 className="text-lg font-medium text-sky-800 dark:text-sky-300 mb-4">Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Practice Sets:</span>
              <span className="font-semibold text-slate-800 dark:text-white">{practiceSets.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Total Questions:</span>
              <span className="font-semibold text-slate-800 dark:text-white">{questionsCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Average Accuracy:</span>
              <span className="font-semibold text-slate-800 dark:text-white">{accuracyAvg}%</span>
            </div>
          </div>
        </div>
        
        {/* Subjects card */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
          <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-300 mb-4">Subjects</h3>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-800/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium"
              >
                {subject}
              </span>
            ))}
            {subjects.length === 0 && (
              <span className="text-slate-500 dark:text-slate-400">No subjects found</span>
            )}
          </div>
        </div>
        
        {/* Actions card */}
        <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800/30">
          <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300 mb-4">Actions</h3>
          <div className="space-y-3">
            <button 
              className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              onClick={() => alert('This would navigate to the full question bank')}
            >
              Browse Question Bank
            </button>
            <button 
              className="w-full py-2 bg-white hover:bg-slate-50 text-purple-700 border border-purple-200 rounded-lg transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-purple-300 dark:border-purple-800/50"
              onClick={() => window.location.href = '/review?view=set'}
            >
              Switch to Set View
            </button>
          </div>
        </div>
      </div>
      
      {/* Recent sets preview */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Recent Practice Sets</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700/50">
                <th className="text-left p-3 text-sm font-semibold text-slate-700 dark:text-slate-300 border-b dark:border-slate-600">Title</th>
                <th className="text-left p-3 text-sm font-semibold text-slate-700 dark:text-slate-300 border-b dark:border-slate-600">Subject</th>
                <th className="text-left p-3 text-sm font-semibold text-slate-700 dark:text-slate-300 border-b dark:border-slate-600">Questions</th>
                <th className="text-left p-3 text-sm font-semibold text-slate-700 dark:text-slate-300 border-b dark:border-slate-600">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {practiceSets.slice(0, 5).map((set, index) => (
                <tr key={set.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 text-sm text-slate-800 dark:text-slate-300 border-b dark:border-slate-700">
                    {`${set.subject} - ${set.type} (${set.id})`}
                  </td>
                  <td className="p-3 text-sm text-slate-800 dark:text-slate-300 border-b dark:border-slate-700">{set.subject}</td>
                  <td className="p-3 text-sm text-slate-800 dark:text-slate-300 border-b dark:border-slate-700">{set.questions?.length || 0}</td>
                  <td className="p-3 text-sm border-b dark:border-slate-700">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        set.accuracy >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        set.accuracy >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}
                    >
                      {set.accuracy}%
                    </span>
                  </td>
                </tr>
              ))}
              {practiceSets.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-slate-500 dark:text-slate-400">
                    No practice sets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800/30 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Note</h3>
            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
              <p>
                You're seeing this simplified view because there was an issue with the enhanced Question View. 
                We're working on a solution. In the meantime, you can still access your practice data through this view.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
