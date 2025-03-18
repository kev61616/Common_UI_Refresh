'use client'

import React, { useState, useEffect } from 'react'
import { PracticeSet } from '@/lib/mockData'
import { TimelineViewProps } from './types'
import { format, parseISO } from 'date-fns'

export function FilmStripTimeline({
  practiceSets,
  onSelectSet,
  selectedSetId
}: TimelineViewProps) {
  const [groupedSets, setGroupedSets] = useState<Record<string, PracticeSet[]>>({})
  const [hoverSetId, setHoverSetId] = useState<string | null>(null)

  // Group practice sets by month
  useEffect(() => {
    const grouped: Record<string, PracticeSet[]> = {}
    
    practiceSets.forEach(set => {
      const date = parseISO(set.dateCompleted)
      const monthYear = format(date, 'MMMM yyyy')
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = []
      }
      
      grouped[monthYear].push(set)
    })
    
    setGroupedSets(grouped)
  }, [practiceSets])

  // Get subject-specific color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          bg: 'bg-blue-500 dark:bg-blue-600',
          text: 'text-blue-500 dark:text-blue-400',
          border: 'border-blue-500 dark:border-blue-600',
          shadow: 'shadow-blue-500/20 dark:shadow-blue-600/20',
          icon: '🧮'
        }
      case 'Reading':
        return {
          bg: 'bg-emerald-500 dark:bg-emerald-600',
          text: 'text-emerald-500 dark:text-emerald-400',
          border: 'border-emerald-500 dark:border-emerald-600',
          shadow: 'shadow-emerald-500/20 dark:shadow-emerald-600/20',
          icon: '📚'
        }
      case 'Writing':
        return {
          bg: 'bg-amber-500 dark:bg-amber-600',
          text: 'text-amber-500 dark:text-amber-400',
          border: 'border-amber-500 dark:border-amber-600',
          shadow: 'shadow-amber-500/20 dark:shadow-amber-600/20',
          icon: '✏️'
        }
      default:
        return {
          bg: 'bg-slate-500 dark:bg-slate-600',
          text: 'text-slate-500 dark:text-slate-400',
          border: 'border-slate-500 dark:border-slate-600',
          shadow: 'shadow-slate-500/20 dark:shadow-slate-600/20',
          icon: '📝'
        }
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, 'MMM d')
  }

  // Get performance rating
  const getPerformanceRating = (accuracy: number) => {
    if (accuracy >= 90) return { stars: '★★★★★', label: 'Excellent' }
    if (accuracy >= 80) return { stars: '★★★★☆', label: 'Very Good' }
    if (accuracy >= 70) return { stars: '★★★☆☆', label: 'Good' }
    if (accuracy >= 60) return { stars: '★★☆☆☆', label: 'Fair' }
    return { stars: '★☆☆☆☆', label: 'Needs Work' }
  }

  // Get frame style based on performance
  const getFrameStyle = (accuracy: number) => {
    if (accuracy >= 90) return 'frame-excellent'
    if (accuracy >= 80) return 'frame-good'
    if (accuracy >= 70) return 'frame-average'
    if (accuracy >= 60) return 'frame-fair'
    return 'frame-needswork'
  }

  // Get scene imagery based on subject and type
  const getSceneImagery = (set: PracticeSet) => {
    const baseClass = 'w-full h-full absolute inset-0'
    
    // Math patterns
    if (set.subject === 'Math') {
      if (set.type === 'Algebra') {
        return (
          <div className={`${baseClass} math-algebra-pattern`}></div>
        )
      }
      if (set.type === 'Geometry') {
        return (
          <div className={`${baseClass} math-geometry-pattern`}></div>
        )
      }
      if (set.type === 'Statistics') {
        return (
          <div className={`${baseClass} math-statistics-pattern`}></div>
        )
      }
      if (set.type === 'Calculus') {
        return (
          <div className={`${baseClass} math-calculus-pattern`}></div>
        )
      }
      return (
        <div className={`${baseClass} math-general-pattern`}></div>
      )
    }
    
    // Reading patterns
    if (set.subject === 'Reading') {
      if (set.type === 'Comprehension') {
        return (
          <div className={`${baseClass} reading-comprehension-pattern`}></div>
        )
      }
      if (set.type === 'Vocabulary') {
        return (
          <div className={`${baseClass} reading-vocabulary-pattern`}></div>
        )
      }
      if (set.type === 'Analysis') {
        return (
          <div className={`${baseClass} reading-analysis-pattern`}></div>
        )
      }
      return (
        <div className={`${baseClass} reading-general-pattern`}></div>
      )
    }
    
    // Writing patterns
    if (set.subject === 'Writing') {
      if (set.type === 'Grammar') {
        return (
          <div className={`${baseClass} writing-grammar-pattern`}></div>
        )
      }
      if (set.type === 'Essay') {
        return (
          <div className={`${baseClass} writing-essay-pattern`}></div>
        )
      }
      if (set.type === 'Punctuation') {
        return (
          <div className={`${baseClass} writing-punctuation-pattern`}></div>
        )
      }
      return (
        <div className={`${baseClass} writing-general-pattern`}></div>
      )
    }
    
    // Default pattern
    return (
      <div className={`${baseClass} default-pattern`}></div>
    )
  }

  return (
    <div className="film-strip-timeline space-y-8 pb-12">
      {/* Header with title and legend */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 relative">
            <div className="absolute inset-0 flex flex-col">
              <div className="h-1 bg-black dark:bg-white"></div>
              <div className="flex-1"></div>
              <div className="h-1 bg-black dark:bg-white"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="h-6 w-6 border-2 border-black dark:border-white rounded-full flex items-center justify-center">
                <div className="h-4 w-4 border-2 border-black dark:border-white rounded-full"></div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Film Strip Timeline</h2>
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
      
      {/* Film strip with months as reels */}
      {Object.entries(groupedSets).map(([month, sets]) => (
        <div key={month} className="month-reel mb-10">
          <div className="flex items-center">
            {/* Film reel icon */}
            <div className="film-reel-icon h-12 w-12 mr-3 relative flex-shrink-0">
              <div className="h-12 w-12 rounded-full border-4 border-slate-800 dark:border-slate-200 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-slate-800 dark:bg-slate-200 absolute top-1 left-1/2 -translate-x-1/2"></div>
                <div className="h-2 w-2 rounded-full bg-slate-800 dark:bg-slate-200 absolute top-1/2 -translate-y-1/2 left-1"></div>
                <div className="h-2 w-2 rounded-full bg-slate-800 dark:bg-slate-200 absolute top-1/2 -translate-y-1/2 right-1"></div>
                <div className="h-2 w-2 rounded-full bg-slate-800 dark:bg-slate-200 absolute bottom-1 left-1/2 -translate-x-1/2"></div>
                <div className="h-4 w-4 rounded-full bg-slate-800 dark:bg-slate-200"></div>
              </div>
            </div>
            
            {/* Month title */}
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">{month}</h3>
          </div>
          
          {/* Film strip */}
          <div className="ml-6 mt-4 flex items-stretch relative">
            {/* Left sprocket holes */}
            <div className="sprocket-holes w-6 flex-shrink-0 flex flex-col bg-slate-900 dark:bg-slate-800 mr-1">
              {Array.from({ length: Math.max(6, sets.length * 2) }).map((_, i) => (
                <div key={i} className="h-4 flex-shrink-0 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-slate-700 dark:bg-slate-600"></div>
                </div>
              ))}
            </div>
            
            {/* Film frames */}
            <div className="film-frames flex-1 bg-slate-900 dark:bg-slate-800 overflow-hidden">
              <div className="flex flex-col">
                {sets.map((set) => {
                  const subjectStyle = getSubjectColor(set.subject)
                  const performance = getPerformanceRating(set.accuracy)
                  const frameStyle = getFrameStyle(set.accuracy)
                  const isSelected = set.id === selectedSetId
                  const isHovered = set.id === hoverSetId
                  
                  return (
                    <div
                      key={set.id}
                      className={`film-frame relative border-b-2 border-slate-700 dark:border-slate-600 p-1
                        ${isSelected ? 'selected-frame' : ''} 
                        ${isHovered ? 'hovered-frame' : ''}`}
                      onClick={() => onSelectSet?.(set.id)}
                      onMouseEnter={() => setHoverSetId(set.id)}
                      onMouseLeave={() => setHoverSetId(null)}
                    >
                      <div className={`frame-inner relative h-40 p-0.5 cursor-pointer transition ${frameStyle}`}>
                        {/* Scene imagery */}
                        <div className="scene-imagery relative h-full w-full overflow-hidden">
                          {getSceneImagery(set)}
                          
                          {/* Content overlay */}
                          <div className="absolute inset-0 p-3 flex flex-col">
                            {/* Title card */}
                            <div className={`title-card p-2 ${subjectStyle.bg} text-white rounded mb-2`}>
                              <div className="flex items-center">
                                <span className="mr-2">{subjectStyle.icon}</span>
                                <span className="font-medium">{set.subject}: {set.type}</span>
                              </div>
                              <div className="text-xs opacity-80 mt-1">{formatDate(set.dateCompleted)}</div>
                            </div>
                            
                            {/* Info on hover/select */}
                            <div className={`flex-1 flex flex-col justify-between transition-opacity duration-300 
                              ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`}>
                              
                              <div className="stats-panel grid grid-cols-2 gap-2 text-center bg-black/50 rounded p-2 backdrop-blur-sm">
                                <div>
                                  <div className="text-xs text-white/80">Accuracy</div>
                                  <div className="text-white font-medium">{set.accuracy}%</div>
                                </div>
                                <div>
                                  <div className="text-xs text-white/80">Questions</div>
                                  <div className="text-white font-medium">{set.questions.length}</div>
                                </div>
                              </div>
                              
                              <div className="mt-auto">
                                <div className="rating bg-black/50 rounded px-2 py-1 text-center backdrop-blur-sm">
                                  <div className="text-yellow-400 font-mono">{performance.stars}</div>
                                  <div className="text-xs text-white/90">{performance.label}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Film frame number */}
                      <div className="frame-number absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-mono">
                        {String(set.id).padStart(3, '0')}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Right sprocket holes */}
            <div className="sprocket-holes w-6 flex-shrink-0 flex flex-col bg-slate-900 dark:bg-slate-800 ml-1">
              {Array.from({ length: Math.max(6, sets.length * 2) }).map((_, i) => (
                <div key={i} className="h-4 flex-shrink-0 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-slate-700 dark:bg-slate-600"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Detailed view panel when selected */}
          {sets.some(set => set.id === selectedSetId) && (
            <div className="ml-16 mt-6 filmstrip-detail-panel bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-4">
              {sets.filter(set => set.id === selectedSetId).map(set => {
                const subjectStyle = getSubjectColor(set.subject)
                
                return (
                  <div key={`detail-${set.id}`} className="grid md:grid-cols-2 gap-6">
                    <div className="frame-detail">
                      <h4 className={`text-lg font-medium ${subjectStyle.text} mb-1`}>
                        {set.subject}: {set.type}
                      </h4>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Completed on {format(parseISO(set.dateCompleted), 'MMMM d, yyyy')}
                      </div>
                      
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="stat-box p-3 bg-slate-100 dark:bg-slate-700 rounded">
                          <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                          <div className="text-lg font-medium text-slate-800 dark:text-slate-200">{set.accuracy}%</div>
                        </div>
                        <div className="stat-box p-3 bg-slate-100 dark:bg-slate-700 rounded">
                          <div className="text-xs text-slate-500 dark:text-slate-400">Questions</div>
                          <div className="text-lg font-medium text-slate-800 dark:text-slate-200">{set.questions.length}</div>
                        </div>
                        <div className="stat-box p-3 bg-slate-100 dark:bg-slate-700 rounded">
                          <div className="text-xs text-slate-500 dark:text-slate-400">Difficulty</div>
                          <div className="text-lg font-medium text-slate-800 dark:text-slate-200">{set.difficulty}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Mistake Types</div>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Conceptual</div>
                            <div className="font-medium text-slate-800 dark:text-slate-200">{set.mistakeTypes.conceptual}</div>
                          </div>
                          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Careless</div>
                            <div className="font-medium text-slate-800 dark:text-slate-200">{set.mistakeTypes.careless}</div>
                          </div>
                          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Time</div>
                            <div className="font-medium text-slate-800 dark:text-slate-200">{set.mistakeTypes.timeManagement}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mr-2">Director's Rating:</div>
                          <div className="text-yellow-500 font-medium">{getPerformanceRating(set.accuracy).stars}</div>
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          {set.accuracy >= 90 ? "An outstanding performance deserving recognition. Every element executed with precision." :
                           set.accuracy >= 80 ? "A strong performance with memorable moments. Just a few minor improvements needed." :
                           set.accuracy >= 70 ? "A solid effort with good technique. Some scenes could use a retake." :
                           set.accuracy >= 60 ? "Shows potential but needs significant direction. Consider rehearsing more." :
                           "Needs a complete reshoot. Focus on mastering the basic techniques first."}
                        </div>
                      </div>
                    </div>
                    
                    <div className="performance-graph">
                      <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3">Performance Timeline</h4>
                      
                      <div className="relative h-52 bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                        <div className="absolute left-12 right-4 top-10 bottom-8">
                          {/* Horizontal lines */}
                          <div className="absolute left-0 right-0 h-px bg-slate-300 dark:bg-slate-600" style={{ top: '0%' }}></div>
                          <div className="absolute left-0 right-0 h-px bg-slate-300 dark:bg-slate-600" style={{ top: '25%' }}></div>
                          <div className="absolute left-0 right-0 h-px bg-slate-300 dark:bg-slate-600" style={{ top: '50%' }}></div>
                          <div className="absolute left-0 right-0 h-px bg-slate-300 dark:bg-slate-600" style={{ top: '75%' }}></div>
                          <div className="absolute left-0 right-0 h-px bg-slate-300 dark:bg-slate-600" style={{ top: '100%' }}></div>
                          
                          {/* Y-axis labels */}
                          <div className="absolute -left-8 -top-3 text-xs text-slate-500 dark:text-slate-400">100%</div>
                          <div className="absolute -left-8 top-[25%] -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400">75%</div>
                          <div className="absolute -left-8 top-[50%] -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400">50%</div>
                          <div className="absolute -left-8 top-[75%] -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400">25%</div>
                          <div className="absolute -left-8 bottom-[-3px] text-xs text-slate-500 dark:text-slate-400">0%</div>
                          
                          {/* X-axis labels */}
                          <div className="absolute left-[0%] bottom-[-20px] text-xs text-slate-500 dark:text-slate-400">Start</div>
                          <div className="absolute left-[33%] bottom-[-20px] text-xs text-slate-500 dark:text-slate-400">Early</div>
                          <div className="absolute left-[66%] bottom-[-20px] text-xs text-slate-500 dark:text-slate-400">Middle</div>
                          <div className="absolute right-0 bottom-[-20px] text-xs text-slate-500 dark:text-slate-400">End</div>
                          
                          {/* Performance line */}
                          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                            <path
                              d={`M 0 ${100 - set.sessionFatigue.earlyAccuracy}
                                 L ${33} ${100 - set.sessionFatigue.earlyAccuracy}
                                 L ${66} ${100 - (set.sessionFatigue.earlyAccuracy + set.sessionFatigue.lateAccuracy) / 2}
                                 L 100 ${100 - set.sessionFatigue.lateAccuracy}`}
                              stroke={set.subject === 'Math' ? '#3b82f6' : 
                                     set.subject === 'Reading' ? '#10b981' : 
                                     '#f59e0b'}
                              strokeWidth="2"
                              fill="none"
                            />
                          </svg>
                          
                          {/* Data points */}
                          <div className="absolute left-[0%] h-2 w-2 rounded-full bg-slate-800 dark:bg-white"
                            style={{ top: `calc(${100 - set.sessionFatigue.earlyAccuracy}% - 4px)` }}></div>
                          <div className="absolute left-[33%] h-2 w-2 rounded-full bg-slate-800 dark:bg-white"
                            style={{ top: `calc(${100 - set.sessionFatigue.earlyAccuracy}% - 4px)` }}></div>
                          <div className="absolute left-[66%] h-2 w-2 rounded-full bg-slate-800 dark:bg-white"
                            style={{ top: `calc(${100 - (set.sessionFatigue.earlyAccuracy + set.sessionFatigue.lateAccuracy) / 2}% - 4px)` }}></div>
                          <div className="absolute right-[0%] h-2 w-2 rounded-full bg-slate-800 dark:bg-white"
                            style={{ top: `calc(${100 - set.sessionFatigue.lateAccuracy}% - 4px)` }}></div>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded">
                          <div className="text-xs text-slate-500 dark:text-slate-400">Time Used</div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {Math.floor(set.timeUsed / 60)} minutes
                          </div>
                        </div>
                        <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded">
                          <div className="text-xs text-slate-500 dark:text-slate-400">Pace</div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {set.pace}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ))}
      
      {/* CSS for film strip patterns and effects */}
      <style jsx>{`
        .sprocket-holes {
          border-left: 2px solid #1f2937;
          border-right: 2px solid #1f2937;
        }
        
        .dark .sprocket-holes {
          border-left: 2px solid #0f172a;
          border-right: 2px solid #0f172a;
        }
        
        .film-frame {
          position: relative;
        }
        
        .film-frame:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
          pointer-events: none;
        }
        
        .frame-inner {
          background-color: rgba(0, 0, 0, 0.3);
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }
        
        .selected-frame .frame-inner {
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        
        .hovered-frame .frame-inner {
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        /* Frame styles based on performance */
        .frame-excellent {
          background-color: rgba(250, 204, 21, 0.2);
        }
        
        .frame-good {
          background-color: rgba(52, 211, 153, 0.2);
        }
        
        .frame-average {
          background-color: rgba(59, 130, 246, 0.2);
        }
        
        .frame-fair {
          background-color: rgba(251, 146, 60, 0.2);
        }
        
        .frame-needswork {
          background-color: rgba(239, 68, 68, 0.2);
        }
        
        /* Scene imagery patterns */
        .math-algebra-pattern {
          background: linear-gradient(45deg, rgba(30, 64, 175, 0.2) 25%, transparent 25%, transparent 50%, rgba(30, 64, 175, 0.2) 50%, rgba(30, 64, 175, 0.2) 75%, transparent 75%, transparent);
          background-size: 10px 10px;
        }
        
        .math-geometry-pattern {
          background-image: radial-gradient(rgba(30, 64, 175, 0.3) 2px, transparent 2px);
          background-size: 20px 20px;
        }
        
        .math-statistics-pattern {
          background-image: linear-gradient(rgba(30, 64, 175, 0.2) 1px, transparent 1px), linear-gradient(to right, rgba(30, 64, 175, 0.2) 1px, transparent 1px);
          background-size: 10px 10px;
        }
        
        .math-calculus-pattern {
          background: repeating-linear-gradient(-45deg, rgba(30, 64, 175, 0.1), rgba(30, 64, 175, 0.1) 5px, rgba(30, 64, 175, 0.2) 5px, rgba(30, 64, 175, 0.2) 10px);
        }
        
        .math-general-pattern {
          background-image: repeating-linear-gradient(0deg, rgba(30, 64, 175, 0.2), rgba(30, 64, 175, 0.2) 1px, transparent 1px, transparent 20px);
        }
        
        .reading-comprehension-pattern {
          background: linear-gradient(90deg, rgba(5, 150, 105, 0.2) 25%, transparent 25%, transparent 50%, rgba(5, 150, 105, 0.2) 50%, rgba(5, 150, 105, 0.2) 75%, transparent 75%, transparent);
          background-size: 20px 20px;
        }
        
        .reading-vocabulary-pattern {
          background-image: repeating-linear-gradient(45deg, rgba(5, 150, 105, 0.1), rgba(5, 150, 105, 0.1) 10px, transparent 10px, transparent 20px);
        }
        
        .reading-analysis-pattern {
          background: radial-gradient(circle, rgba(5, 150, 105, 0.2) 1px, transparent 1px);
          background-size: 15px 15px;
        }
        
        .reading-general-pattern {
          background-image: repeating-linear-gradient(90deg, rgba(5, 150, 105, 0.1), rgba(5, 150, 105, 0.1) 1px, transparent 1px, transparent 20px);
        }
        
        .writing-grammar-pattern {
          background: linear-gradient(45deg, rgba(217, 119, 6, 0.2) 25%, transparent 25%, transparent 50%, rgba(217, 119, 6, 0.2) 50%, rgba(217, 119, 6, 0.2) 75%, transparent 75%, transparent);
          background-size: 15px 15px;
        }
        
        .writing-essay-pattern {
          background-image: repeating-linear-gradient(0deg, rgba(217, 119, 6, 0.1), rgba(217, 119, 6, 0.1) 1px, transparent 1px, transparent 10px);
        }
        
        .writing-punctuation-pattern {
          background: radial-gradient(circle, rgba(217, 119, 6, 0.3) 1px, transparent 1px);
          background-size: 10px 10px;
        }
        
        .writing-general-pattern {
          background-image: repeating-linear-gradient(90deg, rgba(217, 119, 6, 0.1), rgba(217, 119, 6, 0.1) 1px, transparent 1px, transparent 15px);
        }
        
        .default-pattern {
          background-image: linear-gradient(rgba(100, 116, 139, 0.2) 1px, transparent 1px), linear-gradient(to right, rgba(100, 116, 139, 0.2) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}