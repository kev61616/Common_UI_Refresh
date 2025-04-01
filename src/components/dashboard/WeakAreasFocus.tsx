'use client'

import { useState, useEffect, useMemo } from 'react'
import { PracticeSet } from '@/lib/mockData'
import Link from 'next/link'

interface WeakAreasFocusProps {
  practiceSets: PracticeSet[]
}

interface WeakArea {
  id: string
  topic: string
  subtopic: string
  accuracy: number
  previousAccuracy: number
  trend: 'improving' | 'declining' | 'stable'
  questionCount: number
  suggestedResources: Array<{
    title: string
    link: string
    type: 'video' | 'practice' | 'lesson' | 'guide'
  }>
  priority: 'high' | 'medium' | 'low'
}

export function WeakAreasFocus({ practiceSets }: WeakAreasFocusProps) {
  // Animation state
  const [animatedAreas, setAnimatedAreas] = useState<string[]>([])
  
  // Calculate the weakest areas based on practice performance
  const weakAreas = useMemo((): WeakArea[] => {
    // This would normally be calculated from real data
    // For this example, we'll use mock data that looks realistic
    return [
      {
        id: 'algebraic-expressions',
        topic: 'Algebraic Expressions',
        subtopic: 'Quadratic Equations',
        accuracy: 48,
        previousAccuracy: 42,
        trend: 'improving',
        questionCount: 17,
        priority: 'high',
        suggestedResources: [
          { title: 'Video tutorial', link: '/videos/quadratic-equations', type: 'video' },
          { title: 'Practice problems', link: '/practice/quadratic-equations', type: 'practice' },
          { title: 'Concept review', link: '/lessons/quadratic-equations', type: 'lesson' }
        ]
      },
      {
        id: 'data-analysis',
        topic: 'Data Analysis',
        subtopic: 'Interpreting Charts',
        accuracy: 56,
        previousAccuracy: 60,
        trend: 'declining',
        questionCount: 12,
        priority: 'high',
        suggestedResources: [
          { title: 'Interactive charts', link: '/interactive/data-charts', type: 'practice' },
          { title: 'Visual guide', link: '/guide/reading-charts', type: 'guide' },
          { title: 'Step-by-step', link: '/lessons/chart-analysis', type: 'lesson' }
        ]
      },
      {
        id: 'reading-comprehension',
        topic: 'Reading Comprehension',
        subtopic: 'Drawing Inferences',
        accuracy: 62,
        previousAccuracy: 55,
        trend: 'improving',
        questionCount: 25,
        priority: 'medium',
        suggestedResources: [
          { title: 'Reading strategies', link: '/guide/inference-skills', type: 'guide' },
          { title: 'Practice passages', link: '/practice/inference-questions', type: 'practice' },
          { title: 'Technique video', link: '/videos/inference-techniques', type: 'video' }
        ]
      },
      {
        id: 'grammar-rules',
        topic: 'Grammar Rules',
        subtopic: 'Verb Tense Agreement',
        accuracy: 67,
        previousAccuracy: 67,
        trend: 'stable',
        questionCount: 20,
        priority: 'medium',
        suggestedResources: [
          { title: 'Grammar guide', link: '/guide/verb-tense', type: 'guide' },
          { title: 'Quick quiz', link: '/practice/verb-tense-quiz', type: 'practice' },
          { title: 'Error analysis', link: '/lessons/common-tense-errors', type: 'lesson' }
        ]
      }
    ]
  }, [])
  
  // Animate areas appearing one by one
  useEffect(() => {
    const timer = setTimeout(() => {
      const animationOrder = weakAreas.map(area => area.id)
      let currentIndex = 0
      
      const interval = setInterval(() => {
        if (currentIndex < animationOrder.length) {
          setAnimatedAreas(prev => [...prev, animationOrder[currentIndex]])
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 150)
      
      return () => clearInterval(interval)
    }, 300) // Delay start
    
    return () => clearTimeout(timer)
  }, [weakAreas])
  
  // Get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return (
          <span className="inline-flex items-center text-emerald-500">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </span>
        )
      case 'declining':
        return (
          <span className="inline-flex items-center text-rose-500">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center text-slate-400">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
          </span>
        )
    }
  }
  
  // Get resource icon
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'practice':
        return (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        )
      case 'guide':
        return (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case 'lesson':
      default:
        return (
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        )
    }
  }
  
  // Get bar color based on accuracy
  const getBarColor = (accuracy: number) => {
    if (accuracy < 50) return 'bg-red-500'
    if (accuracy < 65) return 'bg-amber-500'
    return 'bg-yellow-500'
  }
  
  return (
    <div className="p-3 h-full flex flex-col">
      {/* Cards Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-grow">
        {weakAreas.map((area, index) => {
          const barColor = getBarColor(area.accuracy)
          const trendIcon = getTrendIcon(area.trend)
          const isAnimated = animatedAreas.includes(area.id)
          
          // Calculate percentage change for display
          const percentChange = Math.abs(area.accuracy - area.previousAccuracy)
          const changeText = percentChange > 0 ? `${percentChange}%` : ''
          
          return (
            <div 
              key={area.id}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300"
              style={{
                opacity: isAnimated ? 1 : 0,
                transform: isAnimated ? 'translateY(0)' : 'translateY(15px)',
                transition: `opacity 300ms ease-out ${index * 100}ms, transform 300ms ease-out ${index * 100}ms`
              }}
            >
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <div className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[130px] sm:max-w-full">
                      {area.topic}
                    </div>
                    {trendIcon}
                    {percentChange > 0 && (
                      <span className={`text-xs ${area.trend === 'improving' ? 'text-emerald-500' : area.trend === 'declining' ? 'text-rose-500' : 'text-slate-400'}`}>
                        {changeText}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-slate-700 dark:text-slate-300">{area.accuracy}%</div>
                </div>
                
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-2 truncate">{area.subtopic}</div>
                
                {/* Compact Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden mb-3">
                  <div
                    className={`h-1.5 rounded-full ${barColor}`}
                    style={{ width: `${area.accuracy}%` }}
                  ></div>
                </div>
                
                {/* Resources and Practice */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {area.suggestedResources.slice(0, 2).map((resource, i) => (
                      <Link
                        key={i}
                        href={resource.link}
                        className="flex items-center justify-center p-1 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        <span className="text-indigo-500 dark:text-indigo-400">
                          {getResourceIcon(resource.type)}
                        </span>
                      </Link>
                    ))}
                    {area.suggestedResources.length > 2 && (
                      <span className="flex items-center justify-center text-[10px] font-medium text-slate-500 dark:text-slate-400">
                        +{area.suggestedResources.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <Link
                    href={`/practice/${area.id}`}
                    className="flex items-center px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md transition-colors shadow-sm"
                  >
                    Practice
                    <svg className="ml-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Action buttons - Responsive and compact */}
      <div className="mt-3 flex gap-2 flex-wrap justify-between">
        <Link
          href="/personalized-plan"
          className="flex-1 min-w-[120px] flex items-center justify-center px-3 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 font-medium text-xs shadow-sm transition-colors"
        >
          <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Study Plan
        </Link>
        
        <Link
          href="/recommended-topics"
          className="flex-1 min-w-[120px] flex items-center justify-center px-3 py-2 rounded-lg text-slate-800 dark:text-white bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-medium text-xs hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
        >
          <svg className="h-3.5 w-3.5 mr-1 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
          All Topics
        </Link>
      </div>
    </div>
  )
}
