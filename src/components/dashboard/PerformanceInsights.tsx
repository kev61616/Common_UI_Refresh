'use client'

import { useState } from 'react'
import { PracticeSet } from '@/lib/mockData'

interface PerformanceInsightsProps {
  practiceSets: PracticeSet[]
}

// Mock insights data - would be dynamically generated based on actual user data
const insightsMock = [
  {
    id: 'insight1',
    type: 'strength',
    title: 'Strong in Algebra',
    description: 'You consistently score above 90% in algebra topics. Focus on maintaining this strength.',
    metric: '+15%',
    subject: 'Math',
    actionLabel: 'Challenge yourself',
    actionLink: '/overview/math'
  },
  {
    id: 'insight2',
    type: 'weakness',
    title: 'Inference Questions Need Work',
    description: 'Your performance on reading inference questions is 23% below your average.',
    metric: '-23%',
    subject: 'Reading',
    actionLabel: 'Practice inference',
    actionLink: '/overview/reading'
  },
  {
    id: 'insight3',
    type: 'trend',
    title: 'Steady Writing Improvement',
    description: 'Your writing scores have improved by 12% over the last month.',
    metric: '+12%',
    subject: 'Writing',
    actionLabel: 'Continue practice',
    actionLink: '/overview/writing'
  },
  {
    id: 'insight4',
    type: 'opportunity',
    title: 'Time Management Opportunity',
    description: 'Spending 43% more time on reading passages than recommended.',
    metric: '+43%',
    subject: 'Reading',
    actionLabel: 'Time management strategies',
    actionLink: '/course/materials'
  },
  {
    id: 'insight5',
    type: 'pattern',
    title: 'Morning vs. Evening Performance',
    description: 'You score 18% higher when practicing in the morning vs. evening.',
    metric: '+18%',
    subject: 'All',
    actionLabel: 'View optimal schedule',
    actionLink: '/course/schedule'
  }
]

export function PerformanceInsights({ practiceSets }: PerformanceInsightsProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Get insight icon
  const getInsightIcon = (type: string) => {
    switch(type) {
      case 'strength':
        return (
          <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'weakness':
        return (
          <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'trend':
        return (
          <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      case 'opportunity':
        return (
          <svg className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        )
      default:
        return (
          <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        )
    }
  }
  
  // Get metric color
  const getMetricColor = (type: string, value: string) => {
    if (value.startsWith('+')) {
      return type === 'weakness' || type === 'opportunity' 
        ? 'text-amber-500 dark:text-amber-400' 
        : 'text-emerald-500 dark:text-emerald-400'
    }
    return 'text-rose-500 dark:text-rose-400'
  }
  
  // Navigate slides
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === insightsMock.length - 1 ? 0 : prev + 1))
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? insightsMock.length - 1 : prev - 1))
  }
  
  // Get current insight
  const currentInsight = insightsMock[currentSlide]
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <h3 className="font-medium text-slate-800 dark:text-white text-lg">Performance Insights</h3>
        
        {/* Slide navigation */}
        <div className="flex space-x-2">
          <button 
            onClick={prevSlide}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="Previous insight"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            aria-label="Next insight"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Insight card */}
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mr-4">
            {getInsightIcon(currentInsight.type)}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white text-lg">
                  {currentInsight.title}
                </h4>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {currentInsight.subject} • {currentInsight.type.charAt(0).toUpperCase() + currentInsight.type.slice(1)}
                </div>
              </div>
              
              <div className={`text-lg font-bold ${getMetricColor(currentInsight.type, currentInsight.metric)}`}>
                {currentInsight.metric}
              </div>
            </div>
            
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {currentInsight.description}
            </p>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400">Insight {currentSlide + 1} of {insightsMock.length}</span>
                <div className="ml-2 flex space-x-1">
                  {insightsMock.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'w-4 bg-indigo-500' 
                          : 'w-1.5 bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <a 
                href={currentInsight.actionLink}
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
              >
                {currentInsight.actionLabel}
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
