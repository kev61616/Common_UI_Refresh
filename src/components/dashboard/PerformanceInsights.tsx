'use client'

import { useState, useEffect } from 'react'
import { PracticeSet } from '@/lib/mockData'
import Link from 'next/link'

interface PerformanceInsightsProps {
  practiceSets: PracticeSet[]
}

// Mock insights data - would be dynamically generated based on actual user data
const insightsMock = [
  {
    id: 'insight1',
    type: 'strength',
    title: 'Strong in Algebra',
    description: 'You consistently score above 90% in algebra topics.',
    metric: '+15%',
    subject: 'Math',
    trend: [80, 82, 85, 88, 92, 95], // Last 6 scores
    actionLabel: 'Challenge',
    actionLink: '/overview/math'
  },
  {
    id: 'insight2',
    type: 'weakness',
    title: 'Inference Questions',
    description: 'Reading inference questions are 23% below your average.',
    metric: '-23%',
    subject: 'Reading',
    trend: [75, 70, 65, 62, 60, 52], // Last 6 scores
    actionLabel: 'Practice',
    actionLink: '/overview/reading'
  },
  {
    id: 'insight3',
    type: 'trend',
    title: 'Writing Improvement',
    description: 'Writing scores have improved by 12% over the last month.',
    metric: '+12%',
    subject: 'Writing',
    trend: [60, 65, 68, 70, 70, 72], // Last 6 scores
    actionLabel: 'Continue',
    actionLink: '/overview/writing'
  },
  {
    id: 'insight4',
    type: 'opportunity',
    title: 'Time Management',
    description: 'Spending 43% more time on reading passages than recommended.',
    metric: '+43%',
    subject: 'Reading',
    trend: [30, 35, 40, 38, 42, 43], // Time in minutes
    actionLabel: 'Strategies',
    actionLink: '/course/materials'
  },
  {
    id: 'insight5',
    type: 'pattern',
    title: 'Morning vs. Evening',
    description: 'You score 18% higher when practicing in the morning vs. evening.',
    metric: '+18%',
    subject: 'All',
    trend: [
      { label: 'Morning', value: 82 },
      { label: 'Afternoon', value: 75 },
      { label: 'Evening', value: 64 }
    ],
    actionLabel: 'Schedule',
    actionLink: '/course/schedule'
  }
]

export function PerformanceInsights({ practiceSets }: PerformanceInsightsProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animateIn, setAnimateIn] = useState(true)
  const [animatedValue, setAnimatedValue] = useState(0)
  
  // Handle slide animation
  const changeSlide = (index: number) => {
    // First animate out
    setAnimateIn(false)
    
    // Then change slide and animate in
    setTimeout(() => {
      setCurrentSlide(index)
      setAnimateIn(true)
      animateMetric()
    }, 300)
  }
  
  // Animate the metric value
  const animateMetric = () => {
    const targetValue = parseInt(insightsMock[currentSlide].metric.replace(/[^0-9-]/g, ''))
    setAnimatedValue(0)
    
    const duration = 1000 // ms
    const frames = 20
    const step = Math.abs(targetValue) / frames
    
    let current = 0
    const interval = setInterval(() => {
      if (current < Math.abs(targetValue)) {
        current += step
        setAnimatedValue(Math.min(current, Math.abs(targetValue)))
      } else {
        clearInterval(interval)
      }
    }, duration / frames)
  }
  
  // Initialize animation
  useEffect(() => {
    animateMetric()
  }, [])
  
  // Get insight icon with enhanced styling
  const getInsightIcon = (type: string) => {
    let iconContent, colorClass

    switch(type) {
      case 'strength':
        iconContent = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        colorClass = 'text-emerald-500'
        break
      case 'weakness':
        iconContent = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        colorClass = 'text-amber-500'
        break
      case 'trend':
        iconContent = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        colorClass = 'text-indigo-500'
        break
      case 'opportunity':
        iconContent = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        colorClass = 'text-sky-500'
        break
      default:
        iconContent = <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        colorClass = 'text-purple-500'
    }
    
    return (
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mr-3">
        <svg className={`h-4 w-4 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {iconContent}
        </svg>
      </div>
    )
  }
  
  // Get metric color
  const getMetricColor = (type: string, value: string) => {
    if (value.startsWith('+')) {
      return type === 'weakness' || type === 'opportunity' 
        ? 'text-amber-500 dark:text-amber-400' 
        : 'text-emerald-500 dark:text-emerald-400'
    } else {
      return 'text-rose-500 dark:text-rose-400'
    }
  }
  
  // Navigate slides
  const nextSlide = () => {
    const nextIndex = currentSlide === insightsMock.length - 1 ? 0 : currentSlide + 1
    changeSlide(nextIndex)
  }
  
  const prevSlide = () => {
    const prevIndex = currentSlide === 0 ? insightsMock.length - 1 : currentSlide - 1
    changeSlide(prevIndex)
  }
  
  // Get current insight
  const currentInsight = insightsMock[currentSlide]
  const metricColor = getMetricColor(currentInsight.type, currentInsight.metric)
  
  // Render chart based on insight type
  const renderMicroChart = () => {
    const trend = currentInsight.trend

    // For basic trend line (array of numbers)
    if (Array.isArray(trend) && typeof trend[0] === 'number') {
      const values = trend as number[]
      const max = Math.max(...values)
      const min = Math.min(...values)
      const range = max - min
      
      // Calculate if trend is improving overall
      const isImproving = values[values.length - 1] > values[0]
      const gradientColors = isImproving 
        ? 'from-emerald-500/20 to-teal-500/10' 
        : 'from-rose-500/20 to-red-500/10'
      
      return (
        <div className="h-full w-full flex flex-col">
          {/* Graph title */}
          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
            <div className="flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full mr-1 ${isImproving ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              <span>{isImproving ? 'Improving trend' : 'Declining trend'}</span>
            </div>
            <div>Last 6 sessions</div>
          </div>
          
          {/* Main graph */}
          <div className="relative flex-grow">
            {/* Area background gradient */}
            <div 
              className={`absolute inset-x-0 bottom-0 bg-gradient-to-t ${gradientColors} rounded-md`} 
              style={{ 
                height: `${((max - min) / max) * 100}%`,
                bottom: `${(min / max) * 100}%`
              }}
            ></div>
            
            {/* Line chart with data points */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox={`0 0 ${values.length - 1} 100`}
              preserveAspectRatio="none"
            >
              {/* Connect lines */}
              <polyline 
                points={values.map((v, i) => `${i}, ${100 - ((v - min) / range) * 100}`).join(' ')}
                fill="none"
                stroke={isImproving ? '#10b981' : '#ef4444'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-sm"
              />
              
              {/* Data points */}
              {values.map((value, i) => (
                <circle 
                  key={i}
                  cx={i} 
                  cy={100 - ((value - min) / range) * 100} 
                  r="2.5" 
                  fill="white"
                  stroke={isImproving ? '#10b981' : '#ef4444'}
                  strokeWidth="1.5"
                  className="drop-shadow-sm"
                />
              ))}
            </svg>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 inset-x-0 flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500">
              <div>Start</div>
              <div className="text-center text-xs font-medium">
                {isImproving 
                  ? <span className="text-emerald-500">+{values[values.length-1] - values[0]}%</span>
                  : <span className="text-rose-500">-{values[0] - values[values.length-1]}%</span>
                }
              </div>
              <div>Now</div>
            </div>
          </div>
        </div>
      )
    }
    
    // For comparison data (array of objects with label and value)
    if (Array.isArray(trend) && typeof trend[0] === 'object' && 'label' in trend[0]) {
      const comparisons = trend as Array<{label: string, value: number}>
      const max = Math.max(...comparisons.map(c => c.value))
      
      return (
        <div className="h-full w-full flex flex-col">
          {/* Graph title */}
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
            Performance by time of day
          </div>
          
          {/* Chart */}
          <div className="relative flex-grow flex items-end justify-around">
            {/* Bar chart */}
            {comparisons.map((item, i) => {
              // Calculate height percentage
              const heightPercentage = (item.value / max) * 100
              
              // Determine colors
              let color, gradient
              if (i === 0) {
                color = 'bg-emerald-500'
                gradient = 'from-emerald-500 to-teal-400'
              } else if (i === comparisons.length - 1) {
                color = 'bg-rose-500'
                gradient = 'from-rose-500 to-red-400'
              } else {
                color = 'bg-blue-500'
                gradient = 'from-blue-500 to-indigo-400'
              }
                
              return (
                <div key={i} className="flex flex-col items-center px-2 h-full justify-end w-1/3">
                  {/* Bar value */}
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {item.value}%
                  </div>
                  
                  {/* Bar */}
                  <div className="w-full relative rounded-t-lg overflow-hidden" 
                    style={{ height: `${heightPercentage}%` }}>
                    <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-80`}></div>
                    <div className={`absolute inset-0 ${color} opacity-20`}></div>
                  </div>
                  
                  {/* Bar label */}
                  <div className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                    {item.label}
                  </div>
                </div>
              )
            })}
            
            {/* Grid lines */}
            <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none">
              {[0, 25, 50, 75, 100].map((mark) => (
                <div key={mark} className="w-full flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700/50"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
    
    return null
  }
  
  return (
    <div className="h-full flex flex-col">
      {/* Insights grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-grow">
        {/* Main insight card */}
        <div className="md:col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/20 rounded-xl p-4 relative overflow-hidden">
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-400/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative">
            {/* Header with type badge */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                {getInsightIcon(currentInsight.type)}
                <span className="ml-1 text-xs font-medium bg-white/50 dark:bg-white/10 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                  {currentInsight.type.charAt(0).toUpperCase() + currentInsight.type.slice(1)}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {currentInsight.subject}
              </div>
            </div>
            
            {/* Title and metric */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {currentInsight.title}
              </h3>
              <div className={`text-2xl font-bold ${metricColor}`}>
                {currentInsight.metric.startsWith('+') ? '+' : ''}
                {Math.round(animatedValue)}%
              </div>
            </div>
            
            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              {currentInsight.description}
            </p>
            
            {/* Data visualization */}
            <div className="h-28 sm:h-36 md:h-48 mb-4">
              {renderMicroChart()}
            </div>
            
            {/* Action button */}
            <Link 
              href={currentInsight.actionLink}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {currentInsight.actionLabel}
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Insights navigation */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
          <div className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex justify-between items-center">
            <span>Other Insights</span>
            <span className="text-xs text-slate-500">{currentSlide + 1}/{insightsMock.length}</span>
          </div>
          
          <div className="space-y-2">
            {insightsMock.map((insight, idx) => (
              <button 
                key={idx}
                onClick={() => changeSlide(idx)}
                className={`w-full text-left p-2.5 rounded-lg transition-all ${
                  idx === currentSlide 
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 shadow-sm' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'
                }`}
              >
                <div className="flex items-center">
                  <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mr-3">
                    {idx + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h5 className="text-sm font-medium text-slate-900 dark:text-white truncate pr-2">
                        {insight.title}
                      </h5>
                      <div className={`text-xs font-medium ${getMetricColor(insight.type, insight.metric)}`}>
                        {insight.metric}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {insight.subject} • {insight.type}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
