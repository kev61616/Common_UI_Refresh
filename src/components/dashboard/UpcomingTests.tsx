'use client'

import { useState, useEffect } from 'react'
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
    location: 'Online',
    duration: 180, // minutes
    missingSkills: ['Quadratic Equations', 'Data Analysis']
  },
  {
    id: 'test2',
    title: 'Official SAT',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    type: 'official',
    subject: 'Full Test',
    preparedness: 78,
    location: 'Central High School',
    duration: 180, // minutes
    missingSkills: ['Reading Inference', 'Grammar Usage', 'Word Problems']
  },
  {
    id: 'test3',
    title: 'Math Assessment',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    type: 'assessment',
    subject: 'Math',
    preparedness: 92,
    location: 'Online',
    duration: 60, // minutes
    missingSkills: []
  }
]

export function UpcomingTests() {
  const [activeTab, setActiveTab] = useState<'all' | 'practice' | 'official'>('all')
  const [animatedTests, setAnimatedTests] = useState<string[]>([])
  
  // Animate tests appearing one by one
  useEffect(() => {
    const testIds = upcomingTestsMock.map(test => test.id)
    let currentIndex = 0
    
    const interval = setInterval(() => {
      if (currentIndex < testIds.length) {
        setAnimatedTests(prev => [...prev, testIds[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 200)
    
    return () => clearInterval(interval)
  }, [])
  
  // Filter tests based on active tab
  const filteredTests = upcomingTestsMock.filter(test => 
    activeTab === 'all' || test.type === activeTab
  ).sort((a, b) => a.date.getTime() - b.date.getTime())
  
  // Format date for display
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric'
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
    return `${diffDays}d`
  }
  
  // Get bar color based on preparedness
  const getPreparednessColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500'
    if (score >= 75) return 'bg-amber-500'
    return 'bg-rose-500'
  }
  
  // Get type badge style
  const getTypeBadge = (type: string) => {
    switch(type) {
      case 'official': 
        return {
          bg: 'bg-indigo-100 dark:bg-indigo-900/30',
          text: 'text-indigo-700 dark:text-indigo-300',
          short: 'OFF'
        }
      case 'practice': 
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/30',
          text: 'text-blue-700 dark:text-blue-300',
          short: 'PRX'
        }
      default: 
        return {
          bg: 'bg-purple-100 dark:bg-purple-900/30',
          text: 'text-purple-700 dark:text-purple-300',
          short: 'AST'
        }
    }
  }
  
  return (
    <div className="p-3 h-full flex flex-col">
      {/* Tab navigation - Simplified */}
      <div className="flex justify-end mb-2">
        <div className="flex rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 text-[10px] font-medium">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2 py-1 transition-colors ${
              activeTab === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-2 py-1 transition-colors ${
              activeTab === 'practice' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Practice
          </button>
          <button
            onClick={() => setActiveTab('official')}
            className={`px-2 py-1 transition-colors ${
              activeTab === 'official' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Official
          </button>
        </div>
      </div>
      
      {filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 flex-grow">
          {filteredTests.map((test, index) => {
            const barColor = getPreparednessColor(test.preparedness)
            const typeBadge = getTypeBadge(test.type)
            const daysRemaining = getDaysRemaining(test.date)
            const isUrgent = daysRemaining === 'Today' || daysRemaining === 'Tomorrow'
            const isAnimated = animatedTests.includes(test.id)
            
            return (
              <div 
                key={test.id}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow transition-all duration-300"
                style={{
                  opacity: isAnimated ? 1 : 0,
                  transform: isAnimated ? 'translateY(0)' : 'translateY(15px)',
                  transition: `opacity 300ms ease-out ${index * 150}ms, transform 300ms ease-out ${index * 150}ms`
                }}
              >
                <div className="relative">
                  {/* Preparedness indicator bar */}
                  <div className="absolute top-0 left-0 right-0 h-1">
                    <div className={`h-full ${barColor}`} style={{ width: `${test.preparedness}%` }}></div>
                  </div>
                
                  <div className="pt-2 px-3 pb-3">
                    <div className="flex justify-between items-start mb-1.5">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[140px]">
                        {test.title}
                      </h4>
                      
                      <div className={`text-xs font-bold px-1.5 py-0.5 rounded flex items-center ${
                        isUrgent 
                          ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400' 
                          : 'text-slate-700 dark:text-slate-300'
                      }`}>
                        {isUrgent && (
                          <span className="inline-block w-1.5 h-1.5 bg-rose-500 rounded-full mr-1 animate-pulse"></span>
                        )}
                        {daysRemaining}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.5 rounded-sm text-[10px] font-medium ${typeBadge.bg} ${typeBadge.text}`}>
                          {typeBadge.short}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{test.duration}m</span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{formatDate(test.date)}</span>
                    </div>
                    
                    {/* Ready indicator and action */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{test.preparedness}%</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">ready</span>
                      </div>
                      
                      <Link
                        href={`/test/prep/${test.id}`}
                        className="flex items-center px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md transition-colors shadow-sm"
                      >
                        Prepare
                        <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="p-3 text-center h-40 flex flex-col items-center justify-center">
          <div className="w-10 h-10 mb-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
            <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">No upcoming tests</p>
          <Link
            href="/test/schedule"
            className="text-xs px-2 py-1 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Schedule Test
          </Link>
        </div>
      )}
      
      {/* Link to calendar */}
      <div className="mt-auto pt-2 border-t border-slate-200 dark:border-slate-700">
        <Link 
          href="/test/calendar"
          className="flex items-center justify-center text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          View calendar
        </Link>
      </div>
    </div>
  )
}
