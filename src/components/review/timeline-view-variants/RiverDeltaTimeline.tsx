'use client'

import React, { useState, useEffect, useRef } from 'react'
import { PracticeSet } from '@/lib/mockData'
import { TimelineViewProps } from './types'
import { format, parseISO, differenceInDays } from 'date-fns'

export function RiverDeltaTimeline({
  practiceSets,
  onSelectSet,
  selectedSetId
}: TimelineViewProps) {
  const [groupedSets, setGroupedSets] = useState<Record<string, PracticeSet[]>>({})
  const [hoverSetId, setHoverSetId] = useState<string | null>(null)
  const [waterfallAnimation, setWaterfallAnimation] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Group practice sets by month
  useEffect(() => {
    const grouped: Record<string, PracticeSet[]> = {}
    
    // Sort sets by date first
    const sortedSets = [...practiceSets].sort((a, b) => 
      new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
    )
    
    sortedSets.forEach(set => {
      const date = parseISO(set.dateCompleted)
      const monthYear = format(date, 'MMMM yyyy')
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = []
      }
      
      grouped[monthYear].push(set)
    })
    
    setGroupedSets(grouped)
    
    // Start waterfall animation after a short delay
    setTimeout(() => {
      setWaterfallAnimation(true)
    }, 500)
  }, [practiceSets])

  // Calculate river path points
  const calculateRiverPath = () => {
    const months = Object.keys(groupedSets)
    if (months.length === 0) return ''
    
    // Main river starts at top center
    let path = 'M 50,0'
    
    // Generate meandering path downward
    const segmentHeight = 100 / (months.length + 1)
    
    months.forEach((_, index) => {
      const yPos = (index + 1) * segmentHeight
      const xVariation = Math.sin(index * 0.5) * 10 // Meandering left-right
      const controlX1 = 50 + xVariation - 5
      const controlY1 = yPos - segmentHeight * 0.7
      const controlX2 = 50 + xVariation + 5
      const controlY2 = yPos - segmentHeight * 0.3
      const endX = 50 + xVariation
      const endY = yPos
      
      // Add cubic bezier curve segment
      path += ` C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`
    })
    
    // End at bottom
    path += ` L 50,100`
    
    return path
  }

  // Get subject-specific styles
  const getSubjectStyles = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          bg: 'bg-blue-500',
          lightBg: 'bg-blue-100 dark:bg-blue-900/30',
          text: 'text-blue-500 dark:text-blue-400',
          border: 'border-blue-500 dark:border-blue-600',
          riverColor: '#3b82f6',
          streamColor: '#93c5fd',
          accent: '#1d4ed8'
        }
      case 'Reading':
        return {
          bg: 'bg-emerald-500',
          lightBg: 'bg-emerald-100 dark:bg-emerald-900/30',
          text: 'text-emerald-500 dark:text-emerald-400',
          border: 'border-emerald-500 dark:border-emerald-600',
          riverColor: '#10b981',
          streamColor: '#6ee7b7',
          accent: '#065f46'
        }
      case 'Writing':
        return {
          bg: 'bg-amber-500',
          lightBg: 'bg-amber-100 dark:bg-amber-900/30',
          text: 'text-amber-500 dark:text-amber-400',
          border: 'border-amber-500 dark:border-amber-600',
          riverColor: '#f59e0b',
          streamColor: '#fcd34d',
          accent: '#b45309'
        }
      default:
        return {
          bg: 'bg-slate-500',
          lightBg: 'bg-slate-100 dark:bg-slate-800',
          text: 'text-slate-500 dark:text-slate-400',
          border: 'border-slate-500 dark:border-slate-600',
          riverColor: '#64748b',
          streamColor: '#cbd5e1',
          accent: '#475569'
        }
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, 'MMM d')
  }

  // Generate a flowing river with animated water droplets
  const generateFlowingRiver = (width: string, color: string, direction: string = 'to-bottom', animate: boolean = true) => {
    const droplets = []
    const dropletCount = 8
    
    for (let i = 0; i < dropletCount; i++) {
      const delay = i * 0.7 // stagger animation start times
      const duration = Math.random() * 3 + 2 // random duration between 2-5s
      const size = Math.random() * 6 + 4 // random size between 4-10px
      
      // Calculate initial position based on river width
      const position = Math.random() * 80 + 10 // random position 10%-90% across river
      
      droplets.push(
        <div 
          key={`droplet-${i}`}
          className={`absolute rounded-full opacity-80 ${animate ? 'animate-flow' : ''}`}
          style={{ 
            width: `${size}px`, 
            height: `${size}px`, 
            backgroundColor: color,
            left: `${position}%`,
            top: direction === 'to-bottom' ? '0%' : undefined,
            bottom: direction === 'to-top' ? '0%' : undefined,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        ></div>
      )
    }
    
    return (
      <div className={`relative w-${width} h-full overflow-hidden`}>
        {droplets}
      </div>
    )
  }

  // Get the confluence type for a practice set
  const getConfluenceType = (set: PracticeSet) => {
    if (set.accuracy >= 90) return 'major-tributary'
    if (set.accuracy >= 75) return 'tributary'
    if (set.accuracy >= 60) return 'stream'
    return 'brook'
  }

  // Get the tributary width based on question count
  const getTributaryWidth = (set: PracticeSet) => {
    const count = set.questions.length
    if (count >= 25) return '6'
    if (count >= 15) return '4'
    return '3'
  }

  // Get the water flow indicator
  const getWaterFlow = (set: PracticeSet) => {
    switch (set.pace) {
      case 'Fast': return 'rapid'
      case 'Normal': return 'steady'
      case 'Slow': return 'gentle'
      default: return 'steady'
    }
  }

  // Get the river basin type (ecosystem metaphor)
  const getRiverBasin = (set: PracticeSet) => {
    switch (set.difficulty) {
      case 'Hard': return 'mountain'
      case 'Medium': return 'valley'
      case 'Easy': return 'plain'
      default: return 'valley'
    }
  }

  return (
    <div ref={containerRef} className="river-delta-timeline relative pb-8">
      {/* Header with title and legend */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500">
              <path fillRule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM14.5 13.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM18.064 13.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 13.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5.936 13.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">River Delta Timeline</h2>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Math</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Reading</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Writing</span>
          </div>
        </div>
      </div>
      
      {/* River legend */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-8 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center">
          <div className="w-8 h-4 bg-blue-500 rounded-sm mr-2"></div>
          <span className="text-sm text-slate-700 dark:text-slate-300">Major Tributary (90%+)</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-3 bg-blue-400 rounded-sm mr-2"></div>
          <span className="text-sm text-slate-700 dark:text-slate-300">Tributary (75-89%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-2 bg-blue-300 rounded-sm mr-2"></div>
          <span className="text-sm text-slate-700 dark:text-slate-300">Stream (60-74%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-1.5 bg-blue-200 rounded-sm mr-2"></div>
          <span className="text-sm text-slate-700 dark:text-slate-300">Brook (&lt;60%)</span>
        </div>
      </div>
      
      {/* River delta visualization */}
      <div className="river-visualization relative min-h-[600px] bg-gradient-to-b from-blue-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Main river */}
        <div className="main-river absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* River path */}
            <path 
              d={calculateRiverPath()}
              fill="none" 
              stroke="#60a5fa" 
              strokeWidth="8"
              strokeLinecap="round"
              className={waterfallAnimation ? 'animate-river-flow' : ''}
            />
          </svg>
          
          {/* Animated water flowing down the main river */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full">
            {waterfallAnimation && generateFlowingRiver('8', '#93c5fd')}
          </div>
        </div>
        
        {/* Month labels along river */}
        {Object.entries(groupedSets).map(([month, _], index) => {
          // Position month labels along the river path
          const yPosition = ((index + 1) / (Object.keys(groupedSets).length + 1)) * 100
          const xVariation = Math.sin(index * 0.5) * 10 // Match river's meandering
          const xPosition = 50 + xVariation
          
          return (
            <div 
              key={month}
              className="absolute transform -translate-x-1/2 bg-white dark:bg-slate-800 px-2 py-1 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 z-10"
              style={{ 
                left: `${xPosition}%`, 
                top: `${yPosition}%` 
              }}
            >
              <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{month}</div>
            </div>
          )
        })}
        
        {/* Tributaries with practice sets */}
        {Object.entries(groupedSets).map(([month, sets], monthIndex) => {
          const monthYPosition = ((monthIndex + 1) / (Object.keys(groupedSets).length + 1)) * 100
          const xVariation = Math.sin(monthIndex * 0.5) * 10
          const riverX = 50 + xVariation
          
          return (
            <React.Fragment key={month}>
              {sets.map((set, setIndex) => {
                const styles = getSubjectStyles(set.subject)
                const isSelected = set.id === selectedSetId
                const isHovered = set.id === hoverSetId
                const confluenceType = getConfluenceType(set)
                const tributaryWidth = getTributaryWidth(set)
                const waterFlow = getWaterFlow(set)
                const riverBasin = getRiverBasin(set)
                
                // Alternate tributaries left and right of the main river
                const isLeft = setIndex % 2 === 0
                
                // Calculate tributary positions
                const tributaryLength = Math.random() * 20 + 20 // Length between 20-40% of container width
                const yVariation = (setIndex * 5) - 10 // Vertical variation within month section
                const tributaryStartX = isLeft ? riverX - Number(tributaryWidth)/2 : riverX + Number(tributaryWidth)/2
                const tributaryStartY = monthYPosition + yVariation
                const tributaryEndX = isLeft ? riverX - tributaryLength : riverX + tributaryLength
                
                // Card position at the end of the tributary
                const cardX = isLeft ? tributaryEndX - 10 : tributaryEndX + 10
                const cardY = tributaryStartY
                
                return (
                  <div key={set.id} className="tributary-group">
                    {/* Tributary river */}
                    <div 
                      className="tributary absolute"
                      style={{ 
                        height: `${tributaryWidth}px`,
                        top: `${tributaryStartY}%`,
                        left: `${Math.min(tributaryStartX, tributaryEndX)}%`,
                        width: `${Math.abs(tributaryEndX - tributaryStartX)}%`,
                        background: confluenceType === 'major-tributary' ? styles.riverColor :
                                  confluenceType === 'tributary' ? styles.streamColor :
                                  confluenceType === 'stream' ? `${styles.streamColor}90` : 
                                  `${styles.streamColor}70`,
                        transform: isLeft ? 'none' : 'scaleX(-1)',
                        opacity: isSelected || isHovered ? 1 : 0.8,
                        transition: 'opacity 0.3s ease, width 0.3s ease'
                      }}
                    >
                      {/* Animated water flowing in tributary */}
                      {waterfallAnimation && generateFlowingRiver(tributaryWidth, isLeft ? styles.streamColor : styles.riverColor, isLeft ? 'to-bottom' : 'to-top')}
                    </div>
                    
                    {/* Practice set card */}
                    <div 
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300
                        rounded-lg border shadow-sm overflow-hidden
                        ${isSelected ? `scale-110 z-30 ring-2 ring-${styles.border}` : 'z-20 scale-100 hover:shadow-md'}
                        ${isSelected || isHovered ? styles.lightBg : 'bg-white dark:bg-slate-800'} 
                        ${isLeft ? 'text-left' : 'text-right'}`}
                      style={{ 
                        left: `${cardX}%`, 
                        top: `${cardY}%`,
                        width: '240px',
                        borderColor: isSelected ? styles.accent : 'rgb(226, 232, 240)',
                        borderWidth: isSelected ? '2px' : '1px'
                      }}
                      onClick={() => onSelectSet?.(set.id)}
                      onMouseEnter={() => setHoverSetId(set.id)}
                      onMouseLeave={() => setHoverSetId(null)}
                    >
                      <div className={`h-1 ${styles.bg}`}></div>
                      <div className="p-3">
                        <div className="flex items-start justify-between">
                          <h3 className={`font-medium ${styles.text}`}>
                            {set.subject}: {set.type}
                          </h3>
                          {isLeft && (
                            <div className={`ml-2 px-2 py-0.5 rounded text-xs font-medium bg-opacity-20 ${styles.bg} text-slate-700 dark:text-slate-300`}>
                              {confluenceType.replace('-', ' ')}
                            </div>
                          )}
                          {!isLeft && (
                            <div className={`mr-2 px-2 py-0.5 rounded text-xs font-medium bg-opacity-20 ${styles.bg} text-slate-700 dark:text-slate-300`}>
                              {confluenceType.replace('-', ' ')}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {formatDate(set.dateCompleted)}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Flow</div>
                            <div className="font-medium text-slate-700 dark:text-slate-300">{waterFlow}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Basin</div>
                            <div className="font-medium text-slate-700 dark:text-slate-300">{riverBasin}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Volume</div>
                            <div className="font-medium text-slate-700 dark:text-slate-300">{set.questions.length}</div>
                          </div>
                        </div>
                        
                        {/* Expanded info when selected */}
                        {isSelected && (
                          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-center mb-2">
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Water Quality</div>
                              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{set.accuracy}%</div>
                            </div>
                            
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className={styles.bg}
                                style={{ width: `${set.accuracy}%`, height: '100%' }}
                              ></div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mt-3">
                              <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Watershed Analysis</div>
                                <div className="mt-1 space-y-1 text-xs">
                                  <div className="flex justify-between">
                                    <span>Conceptual Issues</span>
                                    <span className="font-medium">{set.mistakeTypes.conceptual}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Careless Errors</span>
                                    <span className="font-medium">{set.mistakeTypes.careless}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Time Management</span>
                                    <span className="font-medium">{set.mistakeTypes.timeManagement}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Flow Patterns</div>
                                <div className="flex items-end h-16 mt-1 space-x-1">
                                  <div className="flex-1 flex flex-col justify-end">
                                    <div className="text-[8px] text-center text-slate-500">Early</div>
                                    <div 
                                      className={styles.bg}
                                      style={{ height: `${set.sessionFatigue.earlyAccuracy * 0.7}%` }}
                                    ></div>
                                  </div>
                                  
                                  <div className="flex-1 flex flex-col justify-end">
                                    <div className="text-[8px] text-center text-slate-500">Mid</div>
                                    <div 
                                      className={styles.bg}
                                      style={{ height: `${(set.sessionFatigue.earlyAccuracy + set.sessionFatigue.lateAccuracy) / 2 * 0.7}%` }}
                                    ></div>
                                  </div>
                                  
                                  <div className="flex-1 flex flex-col justify-end">
                                    <div className="text-[8px] text-center text-slate-500">Late</div>
                                    <div 
                                      className={styles.bg}
                                      style={{ height: `${set.sessionFatigue.lateAccuracy * 0.7}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3 text-xs text-center py-1 rounded-sm bg-slate-100 dark:bg-slate-700">
                              {set.accuracy >= 90 ? "Crystal clear waters flow freely through this thriving ecosystem." : 
                               set.accuracy >= 75 ? "Clean waters support a healthy and balanced ecosystem." : 
                               set.accuracy >= 60 ? "Moderately clear waters with some sedimentation present." : 
                               "Cloudy waters indicate issues requiring attention."}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </React.Fragment>
          )
        })}
        
        {/* Delta at the bottom */}
        <div className="river-delta absolute bottom-0 left-0 right-0 h-[100px]">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Delta shape - fan out from the main river */}
            <path 
              d="M 50,0 L 70,100 L 30,100 Z" 
              fill="#93c5fd" 
              opacity="0.4"
            />
            <path 
              d="M 50,20 L 80,100 L 20,100 Z" 
              fill="#93c5fd" 
              opacity="0.3"
            />
            <path 
              d="M 50,40 L 90,100 L 10,100 Z" 
              fill="#93c5fd" 
              opacity="0.2"
            />
            
            {/* Delta channels */}
            <path 
              d="M 50,0 L 40,100" 
              stroke="#60a5fa" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.8"
            />
            <path 
              d="M 50,20 L 50,100" 
              stroke="#60a5fa" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.8"
            />
            <path 
              d="M 50,10 L 60,100" 
              stroke="#60a5fa" 
              strokeWidth="2" 
              fill="none" 
              opacity="0.8"
            />
          </svg>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes flow {
          0% {
            transform: translateY(0);
            opacity: 0.7;
          }
          100% {
            transform: translateY(calc(100vh));
            opacity: 0;
          }
        }
        
        .animate-flow {
          animation: flow linear infinite;
        }
        
        @keyframes river-flow {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        .animate-river-flow {
          stroke-dasharray: 10, 5;
          animation: river-flow 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
