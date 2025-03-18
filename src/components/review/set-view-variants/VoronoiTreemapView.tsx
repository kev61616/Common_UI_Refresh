'use client'

import React, { useState, useMemo } from 'react'
import { SetViewProps } from './types'

// A Voronoi treemap visualization for practice set data
export function VoronoiTreemapView({ practiceSets, onSelectSet, selectedSetId, isLoading }: SetViewProps) {
  const [highlightedCell, setHighlightedCell] = useState<string | null>(null)
  
  // If loading or no practice sets, show empty state
  if (isLoading || practiceSets.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center shadow-sm">
        <h3 className="text-xl font-bold mb-6">Voronoi Treemap View</h3>
        <div className="p-8 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          {isLoading ? (
            <p>Loading practice sets...</p>
          ) : (
            <>
              <p className="mb-4">No practice sets found.</p>
              <p>Complete some practice sets to see your data here.</p>
            </>
          )}
        </div>
      </div>
    )
  }

  // Group practice sets by subject and type
  const groupedData = useMemo(() => {
    const grouped = practiceSets.reduce(
      (acc, set) => {
        // Create subject group if it doesn't exist
        if (!acc[set.subject]) {
          acc[set.subject] = {
            name: set.subject,
            types: {},
            totalCount: 0,
            totalAccuracy: 0,
            sets: []
          }
        }
        
        // Create type group if it doesn't exist
        if (!acc[set.subject].types[set.type]) {
          acc[set.subject].types[set.type] = {
            name: set.type,
            count: 0,
            totalAccuracy: 0,
            sets: []
          }
        }
        
        // Add set to both type and subject groups
        acc[set.subject].types[set.type].sets.push(set)
        acc[set.subject].types[set.type].count++
        acc[set.subject].types[set.type].totalAccuracy += set.accuracy
        
        acc[set.subject].sets.push(set)
        acc[set.subject].totalCount++
        acc[set.subject].totalAccuracy += set.accuracy
        
        return acc
      },
      {} as Record<string, any>
    )
    
    // Convert to array format for easier rendering
    return Object.values(grouped).map(subject => ({
      ...subject,
      avgAccuracy: subject.totalAccuracy / subject.totalCount,
      types: Object.values(subject.types).map((type: any) => ({
        ...type,
        avgAccuracy: type.totalAccuracy / type.count
      }))
    }))
  }, [practiceSets])
  
  // Generate a simplified Voronoi-like shape for each cell
  const generateVoronoiPath = (centerX: number, centerY: number, radius: number, irregularity: number = 0.3) => {
    const points = []
    const numPoints = 8 + Math.round(Math.random() * 5) // 8-13 points for variety
    
    for (let i = 0; i < numPoints; i++) {
      // Get angle for this point (divide circle into roughly equal segments with some randomness)
      const angle = (i / numPoints) * Math.PI * 2
      
      // Add randomness to radius for each point
      const randRadius = radius * (1 - irregularity + Math.random() * irregularity * 2)
      
      // Calculate point position
      const x = centerX + Math.cos(angle) * randRadius
      const y = centerY + Math.sin(angle) * randRadius
      
      points.push({ x, y })
    }
    
    // Create SVG path from points
    const pathData = points.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z'
    
    return pathData
  }
  
  // Color functions for subjects and performance levels
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          bg: 'bg-indigo-100 dark:bg-indigo-900/30',
          border: 'border-indigo-200 dark:border-indigo-800',
          text: 'text-indigo-800 dark:text-indigo-300',
          fill: 'fill-indigo-100 dark:fill-indigo-900/30',
          stroke: 'stroke-indigo-200 dark:stroke-indigo-800',
          gradient: ['rgba(79, 70, 229, 0.2)', 'rgba(79, 70, 229, 0.1)'],
          darkGradient: ['rgba(79, 70, 229, 0.15)', 'rgba(79, 70, 229, 0.05)']
        }
      case 'Reading':
        return {
          bg: 'bg-sky-100 dark:bg-sky-900/30',
          border: 'border-sky-200 dark:border-sky-800',
          text: 'text-sky-800 dark:text-sky-300',
          fill: 'fill-sky-100 dark:fill-sky-900/30',
          stroke: 'stroke-sky-200 dark:stroke-sky-800',
          gradient: ['rgba(14, 165, 233, 0.2)', 'rgba(14, 165, 233, 0.1)'],
          darkGradient: ['rgba(14, 165, 233, 0.15)', 'rgba(14, 165, 233, 0.05)']
        }
      case 'Writing':
        return {
          bg: 'bg-violet-100 dark:bg-violet-900/30',
          border: 'border-violet-200 dark:border-violet-800',
          text: 'text-violet-800 dark:text-violet-300',
          fill: 'fill-violet-100 dark:fill-violet-900/30',
          stroke: 'stroke-violet-200 dark:stroke-violet-800',
          gradient: ['rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.1)'],
          darkGradient: ['rgba(139, 92, 246, 0.15)', 'rgba(139, 92, 246, 0.05)']
        }
      default:
        return {
          bg: 'bg-gray-100 dark:bg-gray-900/30',
          border: 'border-gray-200 dark:border-gray-800',
          text: 'text-gray-800 dark:text-gray-300',
          fill: 'fill-gray-100 dark:fill-gray-900/30',
          stroke: 'stroke-gray-200 dark:stroke-gray-800',
          gradient: ['rgba(156, 163, 175, 0.2)', 'rgba(156, 163, 175, 0.1)'],
          darkGradient: ['rgba(156, 163, 175, 0.15)', 'rgba(156, 163, 175, 0.05)']
        }
    }
  }
  
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) {
      return {
        text: 'text-emerald-700 dark:text-emerald-400',
        bg: 'bg-emerald-100 dark:bg-emerald-900/20',
        gradient: ['rgba(16, 185, 129, 0.2)', 'rgba(16, 185, 129, 0.1)'],
        darkGradient: ['rgba(16, 185, 129, 0.15)', 'rgba(16, 185, 129, 0.05)']
      }
    } else if (accuracy >= 75) {
      return {
        text: 'text-green-700 dark:text-green-400',
        bg: 'bg-green-100 dark:bg-green-900/20',
        gradient: ['rgba(34, 197, 94, 0.2)', 'rgba(34, 197, 94, 0.1)'],
        darkGradient: ['rgba(34, 197, 94, 0.15)', 'rgba(34, 197, 94, 0.05)']
      }
    } else if (accuracy >= 60) {
      return {
        text: 'text-yellow-700 dark:text-yellow-400',
        bg: 'bg-yellow-100 dark:bg-yellow-900/20',
        gradient: ['rgba(234, 179, 8, 0.2)', 'rgba(234, 179, 8, 0.1)'],
        darkGradient: ['rgba(234, 179, 8, 0.15)', 'rgba(234, 179, 8, 0.05)']
      }
    } else {
      return {
        text: 'text-red-700 dark:text-red-400',
        bg: 'bg-red-100 dark:bg-red-900/20',
        gradient: ['rgba(239, 68, 68, 0.2)', 'rgba(239, 68, 68, 0.1)'],
        darkGradient: ['rgba(239, 68, 68, 0.15)', 'rgba(239, 68, 68, 0.05)']
      }
    }
  }
  
  // Find a practice set by ID
  const findSet = (setId: string) => {
    return practiceSets.find(set => set.id === setId)
  }
  
  // Find the subject and type of a set for highlighting
  const findSetLocation = (setId: string) => {
    let subjectName = null
    let typeName = null
    
    for (const subject of groupedData) {
      for (const type of subject.types) {
        const found = type.sets.find((s: any) => s.id === setId)
        if (found) {
          subjectName = subject.name
          typeName = type.name
          break
        }
      }
      if (subjectName && typeName) break
    }
    
    return { subjectName, typeName }
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">Voronoi Treemap View</h3>
      
      {/* Explanation */}
      <div className="mb-6 text-sm text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto">
        <p>This view organizes practice sets into an organic, space-filling diagram where cell size represents 
        question count and cell color represents performance.</p>
      </div>
      
      {/* Main Visualization */}
      <div className="relative min-h-[600px] bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm">
        <svg 
          viewBox="0 0 1000 700" 
          className="w-full h-full" 
          style={{ maxHeight: '700px' }}
        >
          {/* Background gradient */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" className="dark:stop-color-slate-900" />
              <stop offset="100%" stopColor="#f1f5f9" className="dark:stop-color-slate-800" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="1000" height="700" fill="url(#bgGradient)" rx="12" ry="12" />
          
          {/* Subject regions */}
          {groupedData.map((subject, sIndex) => {
            // Generate radial layout positions for subjects
            const subjectAngle = ((2 * Math.PI) / groupedData.length) * sIndex - Math.PI / 2
            const subjectRadius = 250
            const centerX = 500 + Math.cos(subjectAngle) * (subjectRadius / 2)
            const centerY = 350 + Math.sin(subjectAngle) * (subjectRadius / 2)
            
            // Calculate subject cell size based on number of sets
            const subjectWeight = subject.totalCount / practiceSets.length
            const subjectSize = 150 + (subjectWeight * 100)
            
            // Generate irregular shape for subject cell
            const subjectPath = generateVoronoiPath(centerX, centerY, subjectSize, 0.1)
            
            // Get colors for this subject
            const subjectColors = getSubjectColor(subject.name)
            
            // Generate radial positions for type cells within this subject
            const typeCount = subject.types.length
            
            // Generate subject cell gradient
            const gradientId = `subject-gradient-${sIndex}`
            const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
            
            return (
              <g key={`subject-${sIndex}`}>
                {/* Define gradient for this subject */}
                <defs>
                  <radialGradient id={gradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop 
                      offset="0%" 
                      stopColor={isDark ? subjectColors.darkGradient[0] : subjectColors.gradient[0]} 
                    />
                    <stop 
                      offset="100%" 
                      stopColor={isDark ? subjectColors.darkGradient[1] : subjectColors.gradient[1]} 
                    />
                  </radialGradient>
                </defs>
                
                {/* Subject cell */}
                <path 
                  d={subjectPath} 
                  fill={`url(#${gradientId})`}
                  className={`${subjectColors.stroke} stroke-[2]`}
                  strokeDasharray={highlightedCell === subject.name ? "5,5" : "0"}
                  onMouseEnter={() => setHighlightedCell(subject.name)}
                  onMouseLeave={() => setHighlightedCell(null)}
                />
                
                {/* Subject label */}
                <text 
                  x={centerX} 
                  y={centerY - subjectSize / 2 - 10} 
                  textAnchor="middle" 
                  className={`${subjectColors.text} text-base font-semibold`}
                >
                  {subject.name}
                </text>
                
                {/* Type cells */}
                {subject.types.map((type: any, tIndex: number) => {
                  // Calculate position for this type
                  const typeAngle = ((2 * Math.PI) / typeCount) * tIndex + subjectAngle
                  const typeRadius = subjectSize * 0.6
                  const typeCenterX = centerX + Math.cos(typeAngle) * (typeRadius / 2)
                  const typeCenterY = centerY + Math.sin(typeAngle) * (typeRadius / 2)
                  
                  // Calculate type cell size based on number of sets
                  const typeWeight = type.count / subject.totalCount
                  const typeSize = 30 + (typeWeight * 70) 
                  
                  // Generate irregular shape for type cell
                  const typePath = generateVoronoiPath(typeCenterX, typeCenterY, typeSize, 0.2)
                  
                  // Color based on average accuracy
                  const accuracyColors = getAccuracyColor(type.avgAccuracy)
                  
                  // Generate gradient for this type
                  const typeGradientId = `type-gradient-${sIndex}-${tIndex}`
                  const typeHighlighted = highlightedCell === `${subject.name}-${type.name}`
                  const selectedSetLocation = selectedSetId ? findSetLocation(selectedSetId) : null
                  const isTypeOfSelectedSet = 
                    selectedSetLocation && 
                    selectedSetLocation.subjectName === subject.name && 
                    selectedSetLocation.typeName === type.name
                  
                  return (
                    <g key={`type-${sIndex}-${tIndex}`}>
                      {/* Define gradient for this type */}
                      <defs>
                        <radialGradient id={typeGradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                          <stop 
                            offset="0%" 
                            stopColor={isDark ? accuracyColors.darkGradient[0] : accuracyColors.gradient[0]} 
                          />
                          <stop 
                            offset="100%" 
                            stopColor={isDark ? accuracyColors.darkGradient[1] : accuracyColors.gradient[1]} 
                          />
                        </radialGradient>
                      </defs>
                      
                      {/* Type cell */}
                      <path 
                        d={typePath} 
                        fill={`url(#${typeGradientId})`}
                        stroke={isTypeOfSelectedSet ? "currentColor" : (typeHighlighted ? "currentColor" : "none")}
                        className={`cursor-pointer ${isTypeOfSelectedSet ? 'text-indigo-500 dark:text-indigo-400 stroke-[3]' : 'text-slate-300 dark:text-slate-700 stroke-[1.5]'}`}
                        strokeDasharray={typeHighlighted ? "5,5" : "0"}
                        onMouseEnter={() => setHighlightedCell(`${subject.name}-${type.name}`)}
                        onMouseLeave={() => setHighlightedCell(null)}
                        onClick={() => {
                          // Find the first set of this type to select
                          if (type.sets.length > 0) {
                            onSelectSet(type.sets[0].id)
                          }
                        }}
                      />
                      
                      {/* Type label */}
                      <text 
                        x={typeCenterX} 
                        y={typeCenterY} 
                        textAnchor="middle" 
                        dominantBaseline="middle"
                        className={`text-xs font-medium ${
                          typeHighlighted || isTypeOfSelectedSet
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-700 dark:text-slate-300'
                        } pointer-events-none`}
                      >
                        {type.name}
                      </text>
                      
                      {/* Individual set nodes for this type */}
                      {type.sets.map((set: any, sIndex: number) => {
                        // Calculate position for this set
                        const setCount = type.sets.length
                        const setAngle = ((2 * Math.PI) / Math.max(setCount, 6)) * sIndex + typeAngle
                        const setDistance = typeSize * 0.6
                        const setCenterX = typeCenterX + Math.cos(setAngle) * (setDistance / 2)
                        const setCenterY = typeCenterY + Math.sin(setAngle) * (setDistance / 2)
                        
                        // Size based on accuracy
                        const setSize = 12 + (set.accuracy / 10)
                        const isSelected = selectedSetId === set.id
                        
                        return (
                          <g key={`set-${set.id}`}>
                            <circle
                              cx={setCenterX}
                              cy={setCenterY}
                              r={setSize / 2}
                              className={`cursor-pointer ${
                                isSelected
                                  ? 'fill-indigo-500 dark:fill-indigo-400 stroke-white dark:stroke-slate-900 stroke-2'
                                  : `${accuracyColors.bg} stroke-white/30 dark:stroke-slate-700 stroke-1`
                              }`}
                              onClick={() => onSelectSet(set.id)}
                            />
                            
                            {/* Set details tooltip on hover */}
                            {(highlightedCell === `set-${set.id}` || isSelected) && (
                              <g>
                                <rect
                                  x={setCenterX + 10}
                                  y={setCenterY - 30}
                                  width="120"
                                  height="60"
                                  rx="4"
                                  className="fill-white dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-700"
                                />
                                <text
                                  x={setCenterX + 20}
                                  y={setCenterY - 10}
                                  className="text-xs font-medium text-slate-900 dark:text-white"
                                >
                                  {set.type}
                                </text>
                                <text
                                  x={setCenterX + 20}
                                  y={setCenterY + 10}
                                  className={`text-xs ${accuracyColors.text}`}
                                >
                                  Accuracy: {set.accuracy}%
                                </text>
                                <text
                                  x={setCenterX + 20}
                                  y={setCenterY + 25}
                                  className="text-xs text-slate-500 dark:text-slate-400"
                                >
                                  {new Date(set.dateCompleted).toLocaleDateString()}
                                </text>
                              </g>
                            )}
                          </g>
                        )
                      })}
                    </g>
                  )
                })}
              </g>
            )
          })}
          
          {/* Legend */}
          <g transform="translate(20, 20)">
            <rect 
              x="0" 
              y="0" 
              width="200" 
              height="120" 
              className="fill-white/80 dark:fill-slate-800/80 stroke-slate-200 dark:stroke-slate-700" 
              rx="4" 
            />
            <text 
              x="10" 
              y="20" 
              className="text-sm font-semibold text-slate-900 dark:text-white"
            >
              Legend
            </text>
            
            {/* Accuracy color scale */}
            <text 
              x="10" 
              y="40" 
              className="text-xs text-slate-700 dark:text-slate-300"
            >
              Cell Color = Accuracy
            </text>
            <g transform="translate(10, 50)">
              <rect x="0" y="0" width="15" height="10" className="fill-emerald-100 dark:fill-emerald-900/20 stroke-emerald-200 dark:stroke-emerald-800" rx="2" />
              <text x="20" y="8" className="text-xs text-slate-600 dark:text-slate-400">90-100%</text>
            </g>
            <g transform="translate(90, 50)">
              <rect x="0" y="0" width="15" height="10" className="fill-green-100 dark:fill-green-900/20 stroke-green-200 dark:stroke-green-800" rx="2" />
              <text x="20" y="8" className="text-xs text-slate-600 dark:text-slate-400">75-89%</text>
            </g>
            <g transform="translate(10, 70)">
              <rect x="0" y="0" width="15" height="10" className="fill-yellow-100 dark:fill-yellow-900/20 stroke-yellow-200 dark:stroke-yellow-800" rx="2" />
              <text x="20" y="8" className="text-xs text-slate-600 dark:text-slate-400">60-74%</text>
            </g>
            <g transform="translate(90, 70)">
              <rect x="0" y="0" width="15" height="10" className="fill-red-100 dark:fill-red-900/20 stroke-red-200 dark:stroke-red-800" rx="2" />
              <text x="20" y="8" className="text-xs text-slate-600 dark:text-slate-400">0-59%</text>
            </g>
            
            {/* Cell size explanation */}
            <text 
              x="10" 
              y="95" 
              className="text-xs text-slate-700 dark:text-slate-300"
            >
              Cell Size = Question Count
            </text>
          </g>
        </svg>
      </div>
      
      {/* Detail panel for selected set */}
      {selectedSetId && (
        <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="font-bold text-lg mb-4">Selected Practice Set</h4>
          
          {(() => {
            const set = findSet(selectedSetId)
            if (!set) return <p>Set not found</p>
            
            const subjectColors = getSubjectColor(set.subject)
            const accuracyColors = getAccuracyColor(set.accuracy)
            
            return (
              <div>
                <div className="flex justify-between mb-4">
                  <div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-md text-sm font-medium ${subjectColors.bg} ${subjectColors.text}`}>
                      {set.subject}
                    </div>
                    <div className="text-xl font-bold mt-1">{set.type}</div>
                  </div>
                  <div className={`text-2xl font-bold ${accuracyColors.text}`}>
                    {set.accuracy}%
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-md p-3">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Completion Date</div>
                    <div className="font-medium">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-md p-3">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Pace</div>
                    <div className="font-medium">{set.pace}</div>
                  </div>
                </div>
                
                <div className={`p-3 rounded-md ${accuracyColors.bg}`}>
                  <div className="text-sm font-medium mb-1">Performance</div>
                  <div className="w-full bg-white/50 dark:bg-slate-700/50 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${accuracyColors.bg} opacity-100`}
                      style={{ width: `${set.accuracy}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}