'use client'

import { useMemo } from 'react'
import { PracticeSet } from '@/lib/mockData'

interface ActivityTimelineProps {
  practiceSets: PracticeSet[]
}

export function ActivityTimeline({ practiceSets }: ActivityTimelineProps) {
  // Process practice sets to create timeline items
  const timelineItems = useMemo(() => {
    // Sort by date (most recent first)
    const sortedSets = [...practiceSets].sort((a, b) => 
      new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()
    ).slice(0, 10) // Limit to most recent 10 activities
    
    return sortedSets.map(set => {
      // Calculate duration in minutes
      const durationMinutes = Math.round(set.timeUsed / 60)
      
      // Determine icon based on subject
      const getSubjectIcon = () => {
        switch(set.subject) {
          case 'Reading':
            return (
              <svg className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            )
          case 'Writing':
            return (
              <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            )
          case 'Math':
            return (
              <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            )
          default:
            return (
              <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )
        }
      }
      
      // Format date
      const formattedDate = new Date(set.dateCompleted).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      })
      
      // Determine status color based on accuracy
      let statusColor = 'bg-red-500'
      if (set.accuracy >= 80) statusColor = 'bg-emerald-500'
      else if (set.accuracy >= 60) statusColor = 'bg-amber-500'
      
      return {
        id: set.id,
        subject: set.subject,
        type: set.type,
        date: formattedDate,
        accuracy: set.accuracy,
        statusColor,
        icon: getSubjectIcon(),
        questionCount: set.questions.length,
        durationMinutes,
        difficulty: set.difficulty,
        timeOfDay: set.timeOfDay
      }
    })
  }, [practiceSets])

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-5 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-slate-800 dark:text-white text-lg">Study Timeline</h3>
          <a 
            href="/history" 
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center"
          >
            View all
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="p-2">
        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute top-0 left-5 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
          
          {/* Timeline items */}
          <div className="space-y-1">
            {timelineItems.map((item, index) => (
              <div 
                key={item.id}
                className={`relative pl-10 pr-4 py-3 flex items-center rounded-lg ${
                  index === 0 ? 'bg-indigo-50 dark:bg-slate-700/50' : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[16px] mt-0.5">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 ${item.statusColor}`}></div>
                </div>
                
                {/* Subject icon */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mr-3">
                  {item.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                        {item.subject} {item.type}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.date} • {item.difficulty} • {item.timeOfDay}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        item.accuracy >= 80 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                          : item.accuracy >= 60 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {item.accuracy}%
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-1.5 text-xs gap-3">
                    <div className="flex items-center text-slate-500 dark:text-slate-400">
                      <svg className="mr-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.questionCount} questions
                    </div>
                    <div className="flex items-center text-slate-500 dark:text-slate-400">
                      <svg className="mr-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.durationMinutes} min
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 