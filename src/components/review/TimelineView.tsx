'use client'

import { useEffect, useRef, useState } from 'react'
import { PracticeSet } from '@/lib/mockData'

interface TimelineViewProps {
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
}

export function TimelineView({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    set: PracticeSet | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    set: null,
  })
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }
  
  // Determine the date range
  const dateRange = practiceSets.length > 0
    ? {
        min: new Date(Math.min(...practiceSets.map(s => new Date(s.dateCompleted).getTime()))),
        max: new Date(Math.max(...practiceSets.map(s => new Date(s.dateCompleted).getTime()))),
      }
    : { min: new Date(), max: new Date() }
  
  // Update dimensions when window size changes
  useEffect(() => {
    if (!svgRef.current) return
    
    const updateDimensions = () => {
      const containerWidth = svgRef.current?.parentElement?.clientWidth || 800
      setDimensions({
        width: containerWidth,
        height: 500,
      })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])
  
  // Function to convert date to x position
  const dateToX = (date: Date) => {
    const range = dateRange.max.getTime() - dateRange.min.getTime()
    const offset = date.getTime() - dateRange.min.getTime()
    return (offset / range) * (dimensions.width - 100) + 50
  }
  
  // Function to convert accuracy to y position (inverted, higher accuracy = lower y)
  const accuracyToY = (accuracy: number) => {
    return (100 - accuracy) * 4 + 50 // 50px top padding, scale by 4
  }
  
  // Group sets by week
  const weekBuckets: { [key: string]: PracticeSet[] } = {}
  
  practiceSets.forEach(set => {
    const date = new Date(set.dateCompleted)
    const weekStart = new Date(date)
    weekStart.setDate(date.getDate() - date.getDay()) // Start of week (Sunday)
    const weekKey = weekStart.toISOString().split('T')[0]
    
    if (!weekBuckets[weekKey]) {
      weekBuckets[weekKey] = []
    }
    
    weekBuckets[weekKey].push(set)
  })
  
  // Calculate cluster centers for recommendations
  const clusters = Object.entries(weekBuckets).map(([weekKey, sets]) => {
    const avgAccuracy = sets.reduce((sum, set) => sum + set.accuracy, 0) / sets.length
    const avgDate = new Date(sets.reduce((sum, set) => sum + new Date(set.dateCompleted).getTime(), 0) / sets.length)
    
    return {
      week: weekKey,
      x: dateToX(avgDate),
      y: accuracyToY(avgAccuracy),
      sets: sets,
      avgAccuracy,
      trends: {
        improving: sets.length > 1 && avgAccuracy > 
          (sets.reduce((sum, set) => sum + (set.subject === sets[0].subject ? set.accuracy : 0), 0) / 
           sets.filter(set => set.subject === sets[0].subject).length) - 3,
        needsWork: avgAccuracy < 70
      }
    }
  })
  
  // Handle mouse over for tooltip
  const handleMouseOver = (set: PracticeSet, event: React.MouseEvent) => {
    const svgRect = svgRef.current?.getBoundingClientRect()
    if (!svgRect) return
    
    setTooltip({
      visible: true,
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top,
      set,
    })
  }
  
  // Handle mouse out for tooltip
  const handleMouseOut = () => {
    setTooltip({
      ...tooltip,
      visible: false,
    })
  }
  
  // Get color based on subject
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math': return { light: '#c7d2fe', dark: '#4f46e5' } // Indigo
      case 'Reading': return { light: '#d1fae5', dark: '#059669' } // Emerald 
      case 'Writing': return { light: '#fef3c7', dark: '#d97706' } // Amber
      default: return { light: '#e2e8f0', dark: '#64748b' } // Slate
    }
  }
  
  // Xaxis increments 
  const xAxisIncrements = 5
  const xAxisLabelDates = Array.from({ length: xAxisIncrements }, (_, i) => {
    const timestamp = dateRange.min.getTime() + (i * (dateRange.max.getTime() - dateRange.min.getTime()) / (xAxisIncrements - 1))
    return new Date(timestamp)
  })
  
  // Show message if no data
  if (practiceSets.length === 0) {
    return (
      <div className="bg-white text-center py-8 rounded-lg shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <p className="text-slate-500 dark:text-slate-400">No practice sets match your filters</p>
      </div>
    )
  }
  
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-lg shadow-md border border-slate-200 p-[2.5%] relative overflow-hidden dark:from-slate-800 dark:to-slate-800/90 dark:border-slate-700">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/[0.03] to-transparent rounded-bl-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-sky-500/[0.02] to-transparent rounded-tr-full pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row justify-between mb-5 relative z-10">
        <h3 className="font-semibold text-xl flex items-center">
          <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-lg flex items-center justify-center shadow-sm mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-sky-600 dark:from-indigo-400 dark:to-sky-400">
            1. Standard Timeline View
          </span>
        </h3>
        <div className="flex flex-wrap gap-3 mt-3 lg:mt-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 rounded-full shadow-sm border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700/50">
            <span className="inline-block w-3 h-3 rounded-full bg-indigo-500 shadow-sm"></span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Math</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 rounded-full shadow-sm border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700/50">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Reading</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 rounded-full shadow-sm border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700/50">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 shadow-sm"></span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Writing</span>
          </div>
        </div>
      </div>
    
      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <svg 
            ref={svgRef}
            width={dimensions.width} 
            height={dimensions.height} 
            className="font-sans"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          >
            {/* Y-axis and labels */}
            <line 
              x1="50" 
              y1="50" 
              x2="50" 
              y2={dimensions.height - 50} 
              stroke="#94a3b8" 
              strokeWidth="1"
            />
            {[0, 25, 50, 75, 100].map((accuracy, i) => (
              <g key={`y-${i}`}>
                <text 
                  x="25" 
                  y={accuracyToY(accuracy) + 5} 
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="12"
                >
                  {accuracy}%
                </text>
                <line 
                  x1="45" 
                  y1={accuracyToY(accuracy)} 
                  x2={dimensions.width - 50} 
                  y2={accuracyToY(accuracy)} 
                  stroke="#e2e8f0" 
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              </g>
            ))}
            <text 
              x="25" 
              y="25" 
              textAnchor="middle" 
              fill="#64748b"
              fontSize="14"
              fontWeight="500"
            >
              Accuracy
            </text>
            
            {/* X-axis and labels */}
            <line 
              x1="50" 
              y1={dimensions.height - 50} 
              x2={dimensions.width - 50} 
              y2={dimensions.height - 50} 
              stroke="#94a3b8" 
              strokeWidth="1"
            />
            {xAxisLabelDates.map((date, i) => (
              <g key={`x-${i}`}>
                <text 
                  x={dateToX(date)} 
                  y={dimensions.height - 30} 
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="12"
                >
                  {formatDate(date.toISOString())}
                </text>
                <line 
                  x1={dateToX(date)} 
                  y1={dimensions.height - 45} 
                  x2={dateToX(date)} 
                  y2={dimensions.height - 55} 
                  stroke="#94a3b8" 
                  strokeWidth="1"
                />
              </g>
            ))}
            <text 
              x={dimensions.width / 2} 
              y={dimensions.height - 10} 
              textAnchor="middle" 
              fill="#64748b"
              fontSize="14"
              fontWeight="500"
            >
              Date
            </text>
            
            {/* Cluster ellipses */}
            {clusters.map((cluster, i) => (
              <ellipse
                key={`cluster-${i}`}
                cx={cluster.x}
                cy={cluster.y}
                rx={Math.min(30 + cluster.sets.length * 5, 60)}
                ry={Math.min(20 + cluster.sets.length * 3, 50)}
                fill="rgba(148, 163, 184, 0.1)"
                stroke="#94a3b8"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            ))}
            
            {/* Data points */}
            {practiceSets.map((set) => {
              const colors = getSubjectColor(set.subject)
              const x = dateToX(new Date(set.dateCompleted))
              const y = accuracyToY(set.accuracy)
              const size = 10 + (set.timeUsed / 300) // Size based on time spent
              
              return (
                <g 
                  key={set.id}
                  onClick={() => onSelectSet(set.id)}
                  onMouseOver={(e) => handleMouseOver(set, e)}
                  onMouseOut={handleMouseOut}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={size}
                    fill={selectedSetId === set.id ? colors.dark : colors.light}
                    stroke={colors.dark}
                    strokeWidth={selectedSetId === set.id ? 3 : 1.5}
                  />
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={selectedSetId === set.id ? '#fff' : colors.dark}
                    fontSize="10"
                    fontWeight={selectedSetId === set.id ? 'bold' : 'normal'}
                  >
                    {set.accuracy}
                  </text>
                </g>
              )
            })}
            
            {/* Recommendation annotations */}
            {clusters.map((cluster, i) => {
              if (cluster.trends.improving) {
                return (
                  <g key={`improve-${i}`}>
                    <path
                      d={`M ${cluster.x + 40} ${cluster.y - 30} L ${cluster.x + 20} ${cluster.y - 10} L ${cluster.x + 10} ${cluster.y}`}
                      stroke="#059669"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="3,2"
                    />
                    <rect
                      x={cluster.x + 40}
                      y={cluster.y - 60}
                      width="120"
                      height="30"
                      rx="4"
                      fill="#d1fae5"
                      stroke="#059669"
                    />
                    <text
                      x={cluster.x + 100}
                      y={cluster.y - 45}
                      textAnchor="middle"
                      fill="#065f46"
                      fontSize="11"
                    >
                      Improving trend!
                    </text>
                  </g>
                )
              }
              if (cluster.trends.needsWork) {
                return (
                  <g key={`needs-work-${i}`}>
                    <path
                      d={`M ${cluster.x - 40} ${cluster.y - 30} L ${cluster.x - 20} ${cluster.y - 10} L ${cluster.x - 10} ${cluster.y}`}
                      stroke="#dc2626"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="3,2"
                    />
                    <rect
                      x={cluster.x - 160}
                      y={cluster.y - 60}
                      width="120"
                      height="30"
                      rx="4"
                      fill="#fee2e2"
                      stroke="#dc2626"
                    />
                    <text
                      x={cluster.x - 100}
                      y={cluster.y - 45}
                      textAnchor="middle"
                      fill="#7f1d1d"
                      fontSize="11"
                    >
                      Needs more practice
                    </text>
                  </g>
                )
              }
              return null
            })}
            
            {/* Tooltip */}
            {tooltip.visible && tooltip.set && (
              <g>
                <rect
                  x={tooltip.x + 10}
                  y={tooltip.y - 60}
                  width="160"
                  height="120"
                  rx="4"
                  fill="white"
                  stroke="#94a3b8"
                  opacity="0.95"
                />
                <text
                  x={tooltip.x + 20}
                  y={tooltip.y - 40}
                  fill="#0f172a"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {tooltip.set.subject} - {tooltip.set.type}
                </text>
                <text x={tooltip.x + 20} y={tooltip.y - 20} fill="#64748b" fontSize="11">
                  Accuracy: {tooltip.set.accuracy}%
                </text>
                <text x={tooltip.x + 20} y={tooltip.y} fill="#64748b" fontSize="11">
                  Time: {formatTime(tooltip.set.timeUsed)}
                </text>
                <text x={tooltip.x + 20} y={tooltip.y + 20} fill="#64748b" fontSize="11">
                  Pace: {tooltip.set.pace}
                </text>
                <text x={tooltip.x + 20} y={tooltip.y + 40} fill="#64748b" fontSize="11">
                  Date: {formatDate(tooltip.set.dateCompleted)}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
      
      {/* Additional learning insights - with enhanced styling */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/70 relative z-10">
        <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Learning Insights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Time of day performance - with enhanced styling */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl shadow-sm border border-slate-200 dark:from-slate-800 dark:to-slate-700/80 dark:border-slate-700/70">
            <h5 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Best time to study
            </h5>
            {(practiceSets.filter(s => s.timeOfDay === 'Morning').reduce((sum, s) => sum + s.accuracy, 0) / 
              Math.max(1, practiceSets.filter(s => s.timeOfDay === 'Morning').length)) >
             (practiceSets.filter(s => s.timeOfDay === 'Afternoon').reduce((sum, s) => sum + s.accuracy, 0) / 
              Math.max(1, practiceSets.filter(s => s.timeOfDay === 'Afternoon').length)) &&
             (practiceSets.filter(s => s.timeOfDay === 'Morning').reduce((sum, s) => sum + s.accuracy, 0) / 
              Math.max(1, practiceSets.filter(s => s.timeOfDay === 'Morning').length)) >
             (practiceSets.filter(s => s.timeOfDay === 'Evening').reduce((sum, s) => sum + s.accuracy, 0) / 
              Math.max(1, practiceSets.filter(s => s.timeOfDay === 'Evening').length)) ? (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You perform best in the <span className="font-medium text-emerald-600 dark:text-emerald-400">morning</span>. Consider scheduling important practice then.
              </p>
            ) : (practiceSets.filter(s => s.timeOfDay === 'Afternoon').reduce((sum, s) => sum + s.accuracy, 0) / 
                Math.max(1, practiceSets.filter(s => s.timeOfDay === 'Afternoon').length)) >
               (practiceSets.filter(s => s.timeOfDay === 'Evening').reduce((sum, s) => sum + s.accuracy, 0) / 
                Math.max(1, practiceSets.filter(s => s.timeOfDay === 'Evening').length)) ? (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You perform best in the <span className="font-medium text-emerald-600 dark:text-emerald-400">afternoon</span>. Consider scheduling important practice then.
              </p>
            ) : (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You perform best in the <span className="font-medium text-emerald-600 dark:text-emerald-400">evening</span>. Consider scheduling important practice then.
              </p>
            )}
          </div>
          
          {/* Fatigue detection - with enhanced styling */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl shadow-sm border border-slate-200 dark:from-slate-800 dark:to-slate-700/80 dark:border-slate-700/70">
            <h5 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m3.364-5.364l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 9v3m0 0v3m0-3h.01" />
              </svg>
              Session endurance
            </h5>
            {practiceSets.reduce((count, set) => 
              set.sessionFatigue.earlyAccuracy - set.sessionFatigue.lateAccuracy > 15 ? count + 1 : count, 0) > 3 ? (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                You show <span className="font-medium text-amber-600 dark:text-amber-400">fatigue patterns</span> in longer sessions. Try shorter, more focused practice periods.
              </p>
            ) : (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Your <span className="font-medium text-emerald-600 dark:text-emerald-400">endurance is strong</span> and consistency remains high throughout practice sessions.
              </p>
            )}
          </div>
          
          {/* Mistake patterns - with enhanced styling */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl shadow-sm border border-slate-200 dark:from-slate-800 dark:to-slate-700/80 dark:border-slate-700/70">
            <h5 className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Error patterns
            </h5>
            {practiceSets.reduce((sum, set) => sum + set.mistakeTypes.conceptual, 0) >
             practiceSets.reduce((sum, set) => sum + set.mistakeTypes.careless, 0) &&
             practiceSets.reduce((sum, set) => sum + set.mistakeTypes.conceptual, 0) >
             practiceSets.reduce((sum, set) => sum + set.mistakeTypes.timeManagement, 0) ? (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Most of your errors are <span className="font-medium text-rose-600 dark:text-rose-400">conceptual</span>. Focus on strengthening fundamental understanding.
              </p>
            ) : practiceSets.reduce((sum, set) => sum + set.mistakeTypes.careless, 0) >
                practiceSets.reduce((sum, set) => sum + set.mistakeTypes.timeManagement, 0) ? (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Most of your errors are <span className="font-medium text-amber-600 dark:text-amber-400">careless</span>. Try double-checking your work more carefully.
              </p>
            ) : (
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Most of your errors relate to <span className="font-medium text-blue-600 dark:text-blue-400">time management</span>. Practice with timed conditions more often.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
