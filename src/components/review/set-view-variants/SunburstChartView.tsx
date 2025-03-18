'use client'

import React, { useState, useMemo } from 'react'
import { SetViewProps } from './types'

// Sunburst chart view inspired by hierarchical data visualization
export function SunburstChartView({ practiceSets, onSelectSet, selectedSetId, isLoading }: SetViewProps) {
  const [hoveredArc, setHoveredArc] = useState<string | null>(null)

  // If loading or no practice sets, show empty state
  if (isLoading || practiceSets.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center shadow-sm">
        <h3 className="text-xl font-bold mb-6">Sunburst Chart View</h3>
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

  // Organize data into hierarchical structure for sunburst chart
  const sunburstData = useMemo(() => {
    // Group by subject first
    const subjectGroups = practiceSets.reduce((acc, set) => {
      if (!acc[set.subject]) {
        acc[set.subject] = {
          name: set.subject,
          children: {},
          totalCount: 0,
          totalAccuracy: 0,
          sets: []
        }
      }
      
      // Group by type within subject
      if (!acc[set.subject].children[set.type]) {
        acc[set.subject].children[set.type] = {
          name: set.type,
          count: 0,
          totalAccuracy: 0,
          sets: []
        }
      }
      
      // Add set to appropriate group
      acc[set.subject].children[set.type].sets.push(set)
      acc[set.subject].children[set.type].count++
      acc[set.subject].children[set.type].totalAccuracy += set.accuracy
      
      // Update subject totals
      acc[set.subject].totalCount++
      acc[set.subject].totalAccuracy += set.accuracy
      acc[set.subject].sets.push(set)
      
      return acc
    }, {} as Record<string, any>)
    
    // Convert to array format for rendering
    return Object.values(subjectGroups).map(subject => ({
      ...subject,
      avgAccuracy: subject.totalAccuracy / subject.totalCount,
      children: Object.values(subject.children).map((type: any) => ({
        ...type,
        avgAccuracy: type.totalAccuracy / type.count
      }))
    }))
  }, [practiceSets])

  // Color mapping for subjects
  const getSubjectColor = (subject: string, isHovered: boolean) => {
    const baseOpacity = isHovered ? '1' : '0.8'
    const darkOpacity = isHovered ? '0.4' : '0.3'
    
    switch (subject) {
      case 'Math':
        return `bg-indigo-500/${baseOpacity} dark:bg-indigo-600/${darkOpacity}`
      case 'Reading':
        return `bg-sky-500/${baseOpacity} dark:bg-sky-600/${darkOpacity}`
      case 'Writing':
        return `bg-violet-500/${baseOpacity} dark:bg-violet-600/${darkOpacity}`
      default:
        return `bg-emerald-500/${baseOpacity} dark:bg-emerald-600/${darkOpacity}`
    }
  }

  // Get a color based on accuracy value
  const getAccuracyColor = (accuracy: number, isHovered: boolean) => {
    const baseOpacity = isHovered ? '1' : '0.8'
    const darkOpacity = isHovered ? '0.4' : '0.3'
    
    if (accuracy >= 90) return `bg-emerald-500/${baseOpacity} dark:bg-emerald-600/${darkOpacity}`
    if (accuracy >= 75) return `bg-green-500/${baseOpacity} dark:bg-green-600/${darkOpacity}`
    if (accuracy >= 60) return `bg-yellow-500/${baseOpacity} dark:bg-yellow-600/${darkOpacity}`
    if (accuracy >= 40) return `bg-orange-500/${baseOpacity} dark:bg-orange-600/${darkOpacity}`
    return `bg-red-500/${baseOpacity} dark:bg-red-600/${darkOpacity}`
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">Sunburst Chart View</h3>
      
      <div className="relative flex flex-col lg:flex-row">
        {/* Sunburst Chart */}
        <div className="w-full lg:w-2/3 flex justify-center items-center p-4">
          <div className="relative w-[500px] h-[500px]">
            {/* Center circle - aggregate stats */}
            <div 
              className="absolute left-1/2 top-1/2 w-32 h-32 -ml-16 -mt-16 rounded-full bg-slate-100 dark:bg-slate-800 
              flex flex-col items-center justify-center shadow-inner z-20 border-4 border-white dark:border-slate-700"
            >
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Overall</div>
              <div className="text-2xl font-bold">
                {Math.round(practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length)}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{practiceSets.length} sets</div>
            </div>
            
            {/* First ring - subjects */}
            {sunburstData.map((subject, index) => {
              // Calculate arc segment
              const segmentAngle = (2 * Math.PI) / sunburstData.length
              const startAngle = index * segmentAngle
              const endAngle = (index + 1) * segmentAngle
              
              // Calculate SVG arc path
              const innerRadius = 70
              const outerRadius = 150
              const startX1 = innerRadius * Math.cos(startAngle) + 250
              const startY1 = innerRadius * Math.sin(startAngle) + 250
              const endX1 = innerRadius * Math.cos(endAngle) + 250
              const endY1 = innerRadius * Math.sin(endAngle) + 250
              const startX2 = outerRadius * Math.cos(startAngle) + 250
              const startY2 = outerRadius * Math.sin(startAngle) + 250
              const endX2 = outerRadius * Math.cos(endAngle) + 250
              const endY2 = outerRadius * Math.sin(endAngle) + 250
              
              // Create arc path
              const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
              const path = `
                M ${startX1} ${startY1}
                A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${endX1} ${endY1}
                L ${endX2} ${endY2}
                A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${startX2} ${startY2}
                Z
              `
              
              // Calculate midpoint for label
              const midAngle = (startAngle + endAngle) / 2
              const labelRadius = (innerRadius + outerRadius) / 2
              const labelX = labelRadius * Math.cos(midAngle) + 250
              const labelY = labelRadius * Math.sin(midAngle) + 250
              
              // Determine if this subject is being hovered
              const isHovered = hoveredArc === subject.name
              
              return (
                <div key={subject.name} className="absolute inset-0">
                  {/* Subject arc */}
                  <svg className="w-full h-full">
                    <path
                      d={path}
                      className={`${getSubjectColor(subject.name, isHovered)} ${
                        isHovered ? 'stroke-white dark:stroke-slate-200' : 'stroke-white/50 dark:stroke-slate-700'
                      } stroke-2 cursor-pointer transition-all duration-200`}
                      onMouseEnter={() => setHoveredArc(subject.name)}
                      onMouseLeave={() => setHoveredArc(null)}
                    />
                  </svg>
                  
                  {/* Subject label */}
                  <div
                    className={`absolute text-sm font-medium transition-opacity text-white dark:text-white/90 
                              pointer-events-none transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap
                              ${isHovered ? 'opacity-100' : 'opacity-80'}`}
                    style={{ left: labelX, top: labelY }}
                  >
                    {subject.name}
                  </div>
                  
                  {/* Second ring - types within this subject */}
                  {subject.children.map((type: any, typeIndex: number) => {
                    // Calculate sub-segment for type
                    const typeSegmentSize = segmentAngle / subject.children.length
                    const typeStartAngle = startAngle + (typeIndex * typeSegmentSize)
                    const typeEndAngle = typeStartAngle + typeSegmentSize
                    
                    // Calculate SVG arc path for type
                    const typeInnerRadius = outerRadius + 5 // gap between rings
                    const typeOuterRadius = 220
                    const typeStartX1 = typeInnerRadius * Math.cos(typeStartAngle) + 250
                    const typeStartY1 = typeInnerRadius * Math.sin(typeStartAngle) + 250
                    const typeEndX1 = typeInnerRadius * Math.cos(typeEndAngle) + 250
                    const typeEndY1 = typeInnerRadius * Math.sin(typeEndAngle) + 250
                    const typeStartX2 = typeOuterRadius * Math.cos(typeStartAngle) + 250
                    const typeStartY2 = typeOuterRadius * Math.sin(typeStartAngle) + 250
                    const typeEndX2 = typeOuterRadius * Math.cos(typeEndAngle) + 250
                    const typeEndY2 = typeOuterRadius * Math.sin(typeEndAngle) + 250
                    
                    // Create arc path for type
                    const typeLargeArc = typeEndAngle - typeStartAngle > Math.PI ? 1 : 0
                    const typePath = `
                      M ${typeStartX1} ${typeStartY1}
                      A ${typeInnerRadius} ${typeInnerRadius} 0 ${typeLargeArc} 1 ${typeEndX1} ${typeEndY1}
                      L ${typeEndX2} ${typeEndY2}
                      A ${typeOuterRadius} ${typeOuterRadius} 0 ${typeLargeArc} 0 ${typeStartX2} ${typeStartY2}
                      Z
                    `
                    
                    // Determine if this type is being hovered
                    const isTypeHovered = hoveredArc === `${subject.name}-${type.name}`
                    
                    return (
                      <div key={`${subject.name}-${type.name}`} className="absolute inset-0">
                        {/* Type arc */}
                        <svg className="w-full h-full">
                          <path
                            d={typePath}
                            className={`${getAccuracyColor(type.avgAccuracy, isTypeHovered)} ${
                              isTypeHovered ? 'stroke-white dark:stroke-slate-200' : 'stroke-white/50 dark:stroke-slate-700'
                            } stroke-1 cursor-pointer transition-all duration-200`}
                            onMouseEnter={() => setHoveredArc(`${subject.name}-${type.name}`)}
                            onMouseLeave={() => setHoveredArc(null)}
                            onClick={() => {
                              // Find the first set with this subject and type
                              const targetSet = type.sets[0]
                              if (targetSet && onSelectSet) {
                                onSelectSet(targetSet.id)
                              }
                            }}
                          />
                        </svg>
                        
                        {/* Add individual practice sets as small dots in the outer ring */}
                        {type.sets.map((set: any, setIndex: number) => {
                          // Calculate position for this set
                          const setAngleOffset = (typeSegmentSize / (type.sets.length + 1)) * (setIndex + 1)
                          const setAngle = typeStartAngle + setAngleOffset
                          const setRadius = 245
                          const setX = setRadius * Math.cos(setAngle) + 250
                          const setY = setRadius * Math.sin(setAngle) + 250
                          
                          return (
                            <div
                              key={set.id}
                              className={`absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 
                                       cursor-pointer transition-all duration-200 border border-white/70 dark:border-slate-700 ${
                                        selectedSetId === set.id 
                                          ? 'ring-2 ring-white dark:ring-slate-200 z-30' 
                                          : ''
                                       } ${getAccuracyColor(set.accuracy, false)}`}
                              style={{ left: setX, top: setY }}
                              onClick={() => onSelectSet && onSelectSet(set.id)}
                            />
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Detail Panel */}
        <div className="w-full lg:w-1/3 p-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 h-full">
            <h4 className="font-bold text-lg mb-4">Practice Set Details</h4>
            
            {hoveredArc ? (
              <div>
                {hoveredArc.includes('-') ? (
                  // Show type details when hovering a type segment
                  (() => {
                    const [subjectName, typeName] = hoveredArc.split('-')
                    const subject = sunburstData.find(s => s.name === subjectName)
                    const type = subject?.children.find((t: any) => t.name === typeName)
                    
                    if (!subject || !type) return <p>No details available</p>
                    
                    return (
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <div className={`text-sm font-medium ${
                              subject.name === 'Math' ? 'text-indigo-600 dark:text-indigo-400' :
                              subject.name === 'Reading' ? 'text-sky-600 dark:text-sky-400' :
                              'text-violet-600 dark:text-violet-400'
                            }`}>
                              {subject.name}
                            </div>
                            <div className="text-xl font-bold">{type.name}</div>
                          </div>
                          <div className={`text-2xl font-bold ${
                            type.avgAccuracy >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                            type.avgAccuracy >= 75 ? 'text-green-600 dark:text-green-400' :
                            type.avgAccuracy >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                            type.avgAccuracy >= 40 ? 'text-orange-600 dark:text-orange-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {Math.round(type.avgAccuracy)}%
                          </div>
                        </div>
                        
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                          {type.count} practice set{type.count !== 1 ? 's' : ''}
                        </div>
                        
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 mb-3">
                          <div className="text-sm font-medium mb-2">Performance</div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                type.avgAccuracy >= 90 ? 'bg-emerald-500 dark:bg-emerald-400' :
                                type.avgAccuracy >= 75 ? 'bg-green-500 dark:bg-green-400' :
                                type.avgAccuracy >= 60 ? 'bg-yellow-500 dark:bg-yellow-400' :
                                type.avgAccuracy >= 40 ? 'bg-orange-500 dark:bg-orange-400' :
                                'bg-red-500 dark:bg-red-400'
                              }`}
                              style={{ width: `${type.avgAccuracy}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="text-sm font-medium mb-2">Practice Sets</div>
                        <div className="max-h-[280px] overflow-y-auto space-y-2 pr-1">
                          {type.sets.map((set: any) => (
                            <div
                              key={set.id}
                              onClick={() => onSelectSet && onSelectSet(set.id)}
                              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                selectedSetId === set.id
                                  ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'
                                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div className="font-medium">{set.type}</div>
                                <div className={`px-2 py-0.5 rounded-full text-xs ${
                                  set.accuracy >= 90 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                                  set.accuracy >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                  set.accuracy >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                  set.accuracy >= 40 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                  {set.accuracy}%
                                </div>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 flex justify-between mt-1">
                                <span>{new Date(set.dateCompleted).toLocaleDateString()}</span>
                                <span>Pace: {set.pace}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })()
                ) : (
                  // Show subject details when hovering a subject segment
                  (() => {
                    const subject = sunburstData.find(s => s.name === hoveredArc)
                    
                    if (!subject) return <p>No details available</p>
                    
                    return (
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-xl font-bold">{subject.name}</div>
                          <div className={`text-2xl font-bold ${
                            subject.avgAccuracy >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                            subject.avgAccuracy >= 75 ? 'text-green-600 dark:text-green-400' :
                            subject.avgAccuracy >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                            subject.avgAccuracy >= 40 ? 'text-orange-600 dark:text-orange-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {Math.round(subject.avgAccuracy)}%
                          </div>
                        </div>
                        
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                          {subject.totalCount} practice set{subject.totalCount !== 1 ? 's' : ''}
                        </div>
                        
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 mb-3">
                          <div className="text-sm font-medium mb-2">Overall Performance</div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                subject.avgAccuracy >= 90 ? 'bg-emerald-500 dark:bg-emerald-400' :
                                subject.avgAccuracy >= 75 ? 'bg-green-500 dark:bg-green-400' :
                                subject.avgAccuracy >= 60 ? 'bg-yellow-500 dark:bg-yellow-400' :
                                subject.avgAccuracy >= 40 ? 'bg-orange-500 dark:bg-orange-400' :
                                'bg-red-500 dark:bg-red-400'
                              }`}
                              style={{ width: `${subject.avgAccuracy}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="text-sm font-medium mb-2">By Type</div>
                        <div className="space-y-2">
                          {subject.children.map((type: any) => (
                            <div 
                              key={type.name}
                              className="bg-white dark:bg-slate-800 rounded-lg p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50"
                              onMouseEnter={() => setHoveredArc(`${subject.name}-${type.name}`)}
                            >
                              <div className="flex justify-between items-center">
                                <div className="font-medium">{type.name}</div>
                                <div className={`px-2 py-0.5 rounded-full text-xs ${
                                  type.avgAccuracy >= 90 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                                  type.avgAccuracy >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                  type.avgAccuracy >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                  type.avgAccuracy >= 40 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                  {Math.round(type.avgAccuracy)}%
                                </div>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {type.count} practice set{type.count !== 1 ? 's' : ''}
                              </div>
                              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden mt-2">
                                <div 
                                  className={`h-full ${
                                    type.avgAccuracy >= 90 ? 'bg-emerald-500 dark:bg-emerald-400' :
                                    type.avgAccuracy >= 75 ? 'bg-green-500 dark:bg-green-400' :
                                    type.avgAccuracy >= 60 ? 'bg-yellow-500 dark:bg-yellow-400' :
                                    type.avgAccuracy >= 40 ? 'bg-orange-500 dark:bg-orange-400' :
                                    'bg-red-500 dark:bg-red-400'
                                  }`}
                                  style={{ width: `${type.avgAccuracy}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })()
                )}
              </div>
            ) : (
              // Show overall stats when nothing is hovered
              <div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">
                    {Math.round(practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length)}%
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Overall Accuracy
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <div className="text-sm font-medium">Practice Sets</div>
                    <div className="text-2xl font-bold">{practiceSets.length}</div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <div className="text-sm font-medium">Subjects</div>
                    <div className="text-2xl font-bold">{sunburstData.length}</div>
                  </div>
                </div>
                
                <div className="text-sm font-medium mb-2">By Subject</div>
                <div className="space-y-2">
                  {sunburstData.map(subject => (
                    <div 
                      key={subject.name}
                      className="bg-white dark:bg-slate-800 rounded-lg p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      onMouseEnter={() => setHoveredArc(subject.name)}
                    >
                      <div className="flex justify-between items-center">
                        <div className={`font-medium ${
                          subject.name === 'Math' ? 'text-indigo-600 dark:text-indigo-400' :
                          subject.name === 'Reading' ? 'text-sky-600 dark:text-sky-400' :
                          'text-violet-600 dark:text-violet-400'
                        }`}>
                          {subject.name}
                        </div>
                        <div className={`px-2 py-0.5 rounded-full text-xs ${
                          subject.avgAccuracy >= 90 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                          subject.avgAccuracy >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          subject.avgAccuracy >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          subject.avgAccuracy >= 40 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {Math.round(subject.avgAccuracy)}%
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {subject.totalCount} practice set{subject.totalCount !== 1 ? 's' : ''}
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden mt-2">
                        <div 
                          className={`h-full ${
                            subject.avgAccuracy >= 90 ? 'bg-emerald-500 dark:bg-emerald-400' :
                            subject.avgAccuracy >= 75 ? 'bg-green-500 dark:bg-green-400' :
                            subject.avgAccuracy >= 60 ? 'bg-yellow-500 dark:bg-yellow-400' :
                            subject.avgAccuracy >= 40 ? 'bg-orange-500 dark:bg-orange-400' :
                            'bg-red-500 dark:bg-red-400'
                          }`}
                          style={{ width: `${subject.avgAccuracy}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-6 text-center">
                  Hover over the chart to see detailed information
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 px-4">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs">90-100%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">75-89%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs">60-74%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs">40-59%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">0-39%</span>
          </div>
          
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-600 mx-2"></div>
          
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-xs">Math</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-sky-500"></div>
            <span className="text-xs">Reading</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-violet-500"></div>
            <span className="text-xs">Writing</span>
          </div>
        </div>
      </div>
    </div>
  )
}