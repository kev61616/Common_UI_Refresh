'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock upcoming test data
const upcomingTestsMock = [
  {
    id: 'test1',
    title: 'SAT Practice Test #8',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    type: 'practice',
    subject: 'Full Test',
    preparedness: 85,
    location: 'Online'
  },
  {
    id: 'test2',
    title: 'Official SAT',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    type: 'official',
    subject: 'Full Test',
    preparedness: 78,
    location: 'Central High School'
  },
  {
    id: 'test3',
    title: 'Math Assessment',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    type: 'assessment',
    subject: 'Math',
    preparedness: 92,
    location: 'Online'
  }
]

export function UpcomingTests() {
  const [activeTab, setActiveTab] = useState<'all' | 'practice' | 'official'>('all')
  
  // Filter tests based on active tab
  const filteredTests = upcomingTestsMock.filter(test => 
    activeTab === 'all' || test.type === activeTab
  )
  
  // Format date for display
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }
  
  // Calculate days remaining
  const getDaysRemaining = (date: Date) => {
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    return `${diffDays} days`
  }
  
  // Get preparedness status and color
  const getPreparednessStatus = (score: number) => {
    if (score >= 90) return { text: 'Well prepared', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' }
    if (score >= 75) return { text: 'Adequately prepared', color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' }
    return { text: 'Needs more practice', color: 'text-rose-500 bg-rose-50 dark:bg-rose-900/20' }
  }
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <h3 className="font-medium text-slate-800 dark:text-white text-lg">Upcoming Tests</h3>
        
        {/* Tab navigation */}
        <div className="flex bg-slate-100 dark:bg-slate-700/50 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'all' 
                ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'practice' 
                ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Practice
          </button>
          <button
            onClick={() => setActiveTab('official')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'official' 
                ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Official
          </button>
        </div>
      </div>
      
      {filteredTests.length > 0 ? (
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredTests.map(test => {
            const preparedness = getPreparednessStatus(test.preparedness)
            const urgencyClass = 
              getDaysRemaining(test.date) === 'Today' || getDaysRemaining(test.date) === 'Tomorrow'
                ? 'animate-pulse text-rose-500 dark:text-rose-400'
                : 'text-slate-500 dark:text-slate-400'
            
            return (
              <div key={test.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors duration-150">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      {test.title}
                      {test.type === 'official' && (
                        <span className="ml-2 text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                          Official
                        </span>
                      )}
                    </h4>
                    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {test.subject} • {test.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${urgencyClass}`}>
                      {getDaysRemaining(test.date)}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {formatDate(test.date)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Preparedness:</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${preparedness.color}`}>
                      {preparedness.text}
                    </span>
                  </div>
                  
                  <Link
                    href={`/test/prep/${test.id}`}
                    className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
                  >
                    Prepare now
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                  <div 
                    className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                    style={{ width: `${test.preparedness}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="text-2xl mb-2">📅</div>
          <h4 className="text-slate-800 dark:text-white font-medium">No upcoming tests</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Schedule your next test to start preparing</p>
          <Link
            href="/test/schedule"
            className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Schedule Test
          </Link>
        </div>
      )}
      
      <div className="border-t border-slate-200 dark:border-slate-700">
        <Link 
          href="/test/schedule"
          className="block p-4 text-sm text-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors duration-150"
        >
          View all tests
        </Link>
      </div>
    </div>
  )
}
