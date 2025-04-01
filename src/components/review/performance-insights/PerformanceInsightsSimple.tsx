'use client'

import React, { useState } from 'react'

type TimeFilterType = 'week' | 'month' | 'year' | 'all'

export function PerformanceInsights() {
  // State for time filter
  const [timeFilter, setTimeFilter] = useState<TimeFilterType>('month')
  
  return (
    <div className="mb-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Performance Insights
          </h3>
          
          {/* Time period selector */}
          <div className="flex rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 p-1">
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeFilter === 'week'
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeFilter === 'month'
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeFilter('year')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeFilter === 'year'
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              This Year
            </button>
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeFilter === 'all'
                  ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              All Time
            </button>
          </div>
        </div>
        
        {/* Performance metrics summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/30 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30 shadow-sm">
            <div className="text-sm text-blue-600 dark:text-blue-300 font-medium mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Average Accuracy
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">84.5%</div>
              <div className="ml-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">+6.8%</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/30 rounded-lg p-4 border border-violet-100 dark:border-violet-800/30 shadow-sm">
            <div className="text-sm text-violet-600 dark:text-violet-300 font-medium mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Average Speed
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-violet-800 dark:text-violet-200">78.0</div>
              <div className="ml-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">+12.2%</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/30 rounded-lg p-4 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
            <div className="text-sm text-emerald-600 dark:text-emerald-300 font-medium mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Total Questions
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">248</div>
              <div className="ml-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">+12%</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/30 rounded-lg p-4 border border-amber-100 dark:border-amber-800/30 shadow-sm">
            <div className="text-sm text-amber-600 dark:text-amber-300 font-medium mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              Study Streaks
            </div>
            <div className="flex items-end">
              <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">14</div>
              <div className="ml-2 text-xs font-medium text-amber-600 dark:text-amber-400">days</div>
            </div>
          </div>
        </div>
        
        {/* Accuracy Chart */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-300">Accuracy Performance</h4>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-4">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-1.5 bg-blue-500"></span>
                Your Performance
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-1.5 bg-blue-200/70 dark:bg-blue-700/40"></span>
                Peer Benchmark
              </div>
            </div>
          </div>
          
          {/* SVG Chart - Simplified version with hardcoded paths */}
          <div className="relative h-[250px] w-full overflow-hidden bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-slate-500 dark:text-slate-400 py-4">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
            </div>
            
            {/* Chart area */}
            <div className="absolute left-10 right-0 top-0 bottom-0">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-0">
                {/* Grid is created with borders */}
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
              </div>
              
              {/* Hardcoded SVG chart with performance trends */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Benchmark area */}
                <path
                  d="M0,60 L100,55 L200,50 L300,45 L400,40 L500,30 L600,25 L600,120 L500,125 L400,130 L300,135 L200,130 L100,125 L0,120 Z"
                  fill="rgba(96, 165, 250, 0.15)"
                  stroke="none"
                />
                
                {/* Benchmark upper line */}
                <path
                  d="M0,60 L100,55 L200,50 L300,45 L400,40 L500,30 L600,25"
                  fill="none"
                  stroke="rgba(96, 165, 250, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                />
                
                {/* Benchmark lower line */}
                <path
                  d="M0,120 L100,125 L200,130 L300,135 L400,130 L500,125 L600,120"
                  fill="none"
                  stroke="rgba(96, 165, 250, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                />
                
                {/* Student performance line */}
                <path
                  d="M0,95 L100,90 L200,85 L300,70 L400,60 L500,50 L600,45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                <circle cx="0" cy="95" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="100" cy="90" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="200" cy="85" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="300" cy="70" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="400" cy="60" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="500" cy="50" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="600" cy="45" r="4" fill="white" stroke="#3b82f6" strokeWidth="2" />
              </svg>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between px-12 mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Mar 1</span>
            <span>Mar 5</span>
            <span>Mar 10</span>
            <span>Mar 15</span>
            <span>Mar 20</span>
            <span>Mar 25</span>
            <span>Mar 30</span>
          </div>
        </div>
        
        {/* Speed Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-300">Speed Performance</h4>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-4">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-1.5 bg-purple-500"></span>
                Your Performance
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-1.5 bg-purple-200/70 dark:bg-purple-700/40"></span>
                Peer Benchmark
              </div>
            </div>
          </div>
          
          {/* SVG Chart - Simplified version with hardcoded paths */}
          <div className="relative h-[250px] w-full overflow-hidden bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-xs text-slate-500 dark:text-slate-400 py-4">
              <span>90</span>
              <span>70</span>
              <span>50</span>
            </div>
            
            {/* Chart area */}
            <div className="absolute left-10 right-0 top-0 bottom-0">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-0">
                {/* Grid is created with borders */}
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
                <div className="border-b border-l border-slate-200 dark:border-slate-700"></div>
              </div>
              
              {/* Hardcoded SVG chart with performance trends */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Benchmark area */}
                <path
                  d="M0,70 L100,65 L200,60 L300,55 L400,50 L500,45 L600,40 L600,130 L500,135 L400,140 L300,145 L200,140 L100,135 L0,130 Z"
                  fill="rgba(147, 51, 234, 0.15)"
                  stroke="none"
                />
                
                {/* Benchmark upper line */}
                <path
                  d="M0,70 L100,65 L200,60 L300,55 L400,50 L500,45 L600,40"
                  fill="none"
                  stroke="rgba(147, 51, 234, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                />
                
                {/* Benchmark lower line */}
                <path
                  d="M0,130 L100,135 L200,140 L300,145 L400,140 L500,135 L600,130"
                  fill="none"
                  stroke="rgba(147, 51, 234, 0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="5,5"
                />
                
                {/* Student performance line */}
                <path
                  d="M0,125 L100,120 L200,115 L300,100 L400,85 L500,70 L600,60"
                  fill="none"
                  stroke="#9333ea"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                <circle cx="0" cy="125" r="4" fill="white" stroke="#9333ea" strokeWidth="2" />
                <circle cx="100" cy="120" r="4" fill="white" stroke="#9333ea" strokeWidth="2" />
                <circle cx="200" cy="115" r="4" fill="white" stroke="#9333ea" strokeWidth="2" />
                <circle cx="300" cy="100" r="4" fill="white" stroke="#9333ea" strokeWidth="2" />
                <circle cx="400" cy="85" r="4" fill="white" stroke="#9333ea" strokeWidth="2" />
                <circle cx="500" cy="70" r="4" fill="white" stroke="#9333ea" strokeWidth="2" />
                <circle cx="600" cy="60" r="4" fill="white" stroke="#9333ea" strokeWidth="2" />
              </svg>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between px-12 mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Mar 1</span>
            <span>Mar 5</span>
            <span>Mar 10</span>
            <span>Mar 15</span>
            <span>Mar 20</span>
            <span>Mar 25</span>
            <span>Mar 30</span>
          </div>
        </div>
      </div>
    </div>
  )
}
