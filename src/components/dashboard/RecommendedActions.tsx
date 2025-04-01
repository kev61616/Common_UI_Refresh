'use client'

import Link from 'next/link'

export function RecommendedActions() {
  return (
    <div className="p-3 h-full flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-grow">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-3 border border-indigo-100 dark:border-indigo-900/30 group hover:shadow-md transition-shadow">
          <div className="flex items-start">
            <div className="mb-1.5 text-indigo-500 dark:text-indigo-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-2 flex-1">
              <h4 className="font-medium text-sm text-slate-900 dark:text-white">Practice Data Analysis</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">30 min focused practice</p>
            </div>
          </div>
          <div className="mt-2">
            <Link 
              href="/practice/data-analysis"
              className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
            >
              Start practice
              <svg className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-3 border border-emerald-100 dark:border-emerald-900/30 group hover:shadow-md transition-shadow">
          <div className="flex items-start">
            <div className="mb-1.5 text-emerald-500 dark:text-emerald-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-2 flex-1">
              <h4 className="font-medium text-sm text-slate-900 dark:text-white">Reading Review</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">+12% improvement</p>
            </div>
          </div>
          <div className="mt-2">
            <Link 
              href="/review/set"
              className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center group-hover:text-emerald-700 dark:group-hover:text-emerald-300"
            >
              Review session
              <svg className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-3 border border-amber-100 dark:border-amber-900/30 group hover:shadow-md transition-shadow">
          <div className="flex items-start">
            <div className="mb-1.5 text-amber-500 dark:text-amber-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-2 flex-1">
              <h4 className="font-medium text-sm text-slate-900 dark:text-white">Schedule Test</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">Time for practice test</p>
            </div>
          </div>
          <div className="mt-2">
            <Link 
              href="/test/schedule"
              className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center group-hover:text-amber-700 dark:group-hover:text-amber-300"
            >
              Schedule test
              <svg className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
