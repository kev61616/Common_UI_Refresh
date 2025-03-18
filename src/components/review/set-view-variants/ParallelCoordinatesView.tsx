'use client'

import React, { useState, useMemo } from 'react'
import { SetViewProps } from './types'

// A multi-dimensional data visualization that maps practice sets across parallel axes
export function ParallelCoordinatesView({ practiceSets, onSelectSet, selectedSetId, isLoading }: SetViewProps) {
  const [highlightedSubject, setHighlightedSubject] = useState<string | null>(null)
  const [highlightedSet, setHighlightedSet] = useState<string | null>(null)
  
  // If loading or no practice sets, show empty state
  if (isLoading || practiceSets.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center shadow-sm">
        <h3 className="text-xl font-bold mb-6">Parallel Coordinates View</h3>
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

  // Define axes for the parallel coordinates
  const axes = [
    { id: 'accuracy', label: 'Accuracy', min: 0, max: 100, unit: '%' },
    { id: 'timeSpent', label: 'Time Spent', min: 0, max: 100, unit: 'min' },
    { id: 'questionCount', label: 'Questions', min: 0, max: 50, unit: '' },
    { id: 'completionDate', label: 'Completion Date', min: 0, max: 100, unit: '' },
  ]
  
  // Process data for visualization
  const processedData = useMemo(() => {
    // Find min/max values for normalization
    const dateRange = practiceSets.reduce(
      (acc, set) => {
        const date = new Date(set.dateCompleted).getTime()
        return {
          min: Math.min(acc.min, date),
          max: Math.max(acc.max, date),
        }
      },
      { min: Infinity, max: -Infinity }
    )
    
    const timeRange = practiceSets.reduce(
      (acc, set) => {
        // Estimate time spent from pace
        let timeEstimate = 0
        if (set.pace === 'Fast') timeEstimate = 15
        else if (set.pace === 'Moderate') timeEstimate = 30
        else if (set.pace === 'Slow') timeEstimate = 60
        
        return {
          min: Math.min(acc.min, timeEstimate),
          max: Math.max(acc.max, timeEstimate),
        }
      },
      { min: Infinity, max: -Infinity }
    )
    
    const questionRange = practiceSets.reduce(
      (acc, set) => {
        // Estimate question count from type
        let questionEstimate = 0
        if (set.type.includes('Short')) questionEstimate = 10
        else if (set.type.includes('Full')) questionEstimate = 30
        else questionEstimate = 20
        
        return {
          min: Math.min(acc.min, questionEstimate),
          max: Math.max(acc.max, questionEstimate),
        }
      },
      { min: Infinity, max: -Infinity }
    )
    
    // Get the processed data for each set
    return practiceSets.map(set => {
      // Estimate time spent from pace
      let timeEstimate = 0
      if (set.pace === 'Fast') timeEstimate = 15
      else if (set.pace === 'Moderate') timeEstimate = 30
      else if (set.pace === 'Slow') timeEstimate = 60
      
      // Estimate question count from type
      let questionEstimate = 0
      if (set.type.includes('Short')) questionEstimate = 10
      else if (set.type.includes('Full')) questionEstimate = 30
      else questionEstimate = 20
      
      // Normalize date for visualization (0-100)
      const dateNormalized = ((new Date(set.dateCompleted).getTime() - dateRange.min) / 
        (dateRange.max - dateRange.min)) * 100
      
      // Normalize time for visualization (0-100)
      const timeNormalized = ((timeEstimate - timeRange.min) / 
        (timeRange.max - timeRange.min)) * 100
      
      // Normalize question count for visualization (0-100)
      const questionNormalized = ((questionEstimate - questionRange.min) / 
        (questionRange.max - questionRange.min)) * 100
      
      return {
        ...set,
        normalizedValues: {
          accuracy: set.accuracy,
          timeSpent: timeNormalized,
          questionCount: questionNormalized,
          completionDate: dateNormalized,
        },
        rawValues: {
          accuracy: `${set.accuracy}%`,
          timeSpent: `${timeEstimate} min`,
          questionCount: `${questionEstimate} questions`,
          completionDate: new Date(set.dateCompleted).toLocaleDateString(),
        }
      }
    })
  }, [practiceSets])
  
  // Get subject color
  const getSubjectColor = (subject: string, opacity: number = 1) => {
    switch (subject) {
      case 'Math':
        return {
          stroke: `rgba(99, 102, 241, ${opacity})`,
          dark: `rgba(129, 140, 248, ${opacity})`,
          fill: `rgba(224, 231, 255, ${opacity * 0.3})`,
          darkFill: `rgba(55, 65, 81, ${opacity * 0.3})`,
          textClass: 'text-indigo-600 dark:text-indigo-400',
          bgClass: `bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200`,
        }
      case 'Reading':
        return {
          stroke: `rgba(14, 165, 233, ${opacity})`,
          dark: `rgba(56, 189, 248, ${opacity})`,
          fill: `rgba(224, 242, 254, ${opacity * 0.3})`,
          darkFill: `rgba(55, 65, 81, ${opacity * 0.3})`,
          textClass: 'text-sky-600 dark:text-sky-400',
          bgClass: `bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-200`,
        }
      case 'Writing':
        return {
          stroke: `rgba(139, 92, 246, ${opacity})`,
          dark: `rgba(167, 139, 250, ${opacity})`,
          fill: `rgba(237, 233, 254, ${opacity * 0.3})`,
          darkFill: `rgba(55, 65, 81, ${opacity * 0.3})`,
          textClass: 'text-violet-600 dark:text-violet-400',
          bgClass: `bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200`,
        }
      default:
        return {
          stroke: `rgba(156, 163, 175, ${opacity})`,
          dark: `rgba(209, 213, 219, ${opacity})`,
          fill: `rgba(243, 244, 246, ${opacity * 0.3})`,
          darkFill: `rgba(55, 65, 81, ${opacity * 0.3})`,
          textClass: 'text-gray-600 dark:text-gray-400',
          bgClass: `bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200`,
        }
    }
  }
  
  // Constants for SVG dimensions
  const SVG_WIDTH = 800
  const SVG_HEIGHT = 400
  const PADDING = 60
  const AXIS_WIDTH = (SVG_WIDTH - 2 * PADDING) / (axes.length - 1)
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">Parallel Coordinates View</h3>
      
      {/* Visualization explanation */}
      <div className="mb-6 text-sm text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto">
        <p>This view maps each practice set across multiple performance dimensions simultaneously. 
        Lines represent individual sets, with higher values positioned toward the top of each axis.</p>
      </div>
      
      {/* Subject Filter Buttons */}
      <div className="flex justify-center mb-6 space-x-2 flex-wrap">
        <button
          onClick={() => setHighlightedSubject(null)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            highlightedSubject === null
              ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-800'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          All Subjects
        </button>
        
        {Array.from(new Set(practiceSets.map(set => set.subject))).map(subject => {
          const color = getSubjectColor(subject)
          return (
            <button
              key={subject}
              onClick={() => setHighlightedSubject(subject)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                highlightedSubject === subject
                  ? color.bgClass
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {subject}
            </button>
          )
        })}
      </div>
      
      {/* Parallel Coordinates Chart */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px] mx-auto w-full">
          <svg
            width="100%"
            height={SVG_HEIGHT}
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
            className="bg-white dark:bg-slate-850 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
          >
            {/* Axis lines */}
            {axes.map((axis, i) => (
              <line
                key={`axis-${axis.id}`}
                x1={PADDING + i * AXIS_WIDTH}
                y1={PADDING}
                x2={PADDING + i * AXIS_WIDTH}
                y2={SVG_HEIGHT - PADDING}
                stroke="currentColor"
                className="text-slate-300 dark:text-slate-600"
                strokeWidth="1"
              />
            ))}
            
            {/* Axis labels */}
            {axes.map((axis, i) => (
              <text
                key={`label-${axis.id}`}
                x={PADDING + i * AXIS_WIDTH}
                y={SVG_HEIGHT - PADDING / 2}
                textAnchor="middle"
                className="fill-slate-700 dark:fill-slate-300 text-xs"
              >
                {axis.label} {axis.unit ? `(${axis.unit})` : ''}
              </text>
            ))}
            
            {/* Grid lines and tick marks */}
            {axes.map((axis, axisIndex) => (
              <React.Fragment key={`grid-${axis.id}`}>
                {[0, 25, 50, 75, 100].map(tick => {
                  const y = PADDING + ((SVG_HEIGHT - 2 * PADDING) * (100 - tick)) / 100
                  return (
                    <React.Fragment key={`tick-${axis.id}-${tick}`}>
                      <line
                        x1={PADDING + axisIndex * AXIS_WIDTH - 5}
                        y1={y}
                        x2={PADDING + axisIndex * AXIS_WIDTH + 5}
                        y2={y}
                        stroke="currentColor"
                        className="text-slate-400 dark:text-slate-500"
                        strokeWidth="1"
                      />
                      <text
                        x={PADDING + axisIndex * AXIS_WIDTH}
                        y={y}
                        dx={-10}
                        dy={3}
                        textAnchor="end"
                        className="fill-slate-500 dark:fill-slate-400 text-[10px]"
                      >
                        {tick}
                      </text>
                    </React.Fragment>
                  )
                })}
              </React.Fragment>
            ))}
            
            {/* Polylines for each set */}
            {processedData.map((set, setIndex) => {
              const isHighlighted = 
                (highlightedSubject === null || highlightedSubject === set.subject) &&
                (highlightedSet === null || highlightedSet === set.id)
              
              const subjectColor = getSubjectColor(set.subject, isHighlighted ? 1 : 0.3)
              const isSelected = selectedSetId === set.id
              
              // Create points for the polyline
              const points = axes.map((axis, i) => {
                const value = set.normalizedValues[axis.id as keyof typeof set.normalizedValues]
                const x = PADDING + i * AXIS_WIDTH
                const y = PADDING + ((SVG_HEIGHT - 2 * PADDING) * (100 - (value as number))) / 100
                return `${x},${y}`
              }).join(' ')
              
              return (
                <g key={`set-${set.id}`} className="cursor-pointer">
                  <polyline
                    points={points}
                    fill="none"
                    className={`transition-opacity duration-200 ${
                      isHighlighted ? 'opacity-100' : 'opacity-30'
                    }`}
                    stroke={isSelected ? (document.documentElement.classList.contains('dark') ? subjectColor.dark : subjectColor.stroke) : (document.documentElement.classList.contains('dark') ? subjectColor.dark : subjectColor.stroke)}
                    strokeWidth={isSelected ? "3" : "2"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onMouseEnter={() => setHighlightedSet(set.id)}
                    onMouseLeave={() => setHighlightedSet(null)}
                    onClick={() => onSelectSet && onSelectSet(set.id)}
                  />
                  
                  {/* Data points on each axis */}
                  {axes.map((axis, i) => {
                    const value = set.normalizedValues[axis.id as keyof typeof set.normalizedValues]
                    const x = PADDING + i * AXIS_WIDTH
                    const y = PADDING + ((SVG_HEIGHT - 2 * PADDING) * (100 - (value as number))) / 100
                    
                    return (
                      <circle
                        key={`point-${set.id}-${axis.id}`}
                        cx={x}
                        cy={y}
                        r={isSelected ? 5 : (highlightedSet === set.id ? 4 : 3)}
                        fill={document.documentElement.classList.contains('dark') ? subjectColor.dark : subjectColor.stroke}
                        className={`transition-opacity duration-200 ${
                          isHighlighted ? 'opacity-100' : 'opacity-30'
                        }`}
                        onMouseEnter={() => setHighlightedSet(set.id)}
                        onMouseLeave={() => setHighlightedSet(null)}
                        onClick={() => onSelectSet && onSelectSet(set.id)}
                      />
                    )
                  })}
                  
                  {/* Tooltip on highlighted set */}
                  {highlightedSet === set.id && (
                    <g>
                      {axes.map((axis, i) => {
                        const value = set.normalizedValues[axis.id as keyof typeof set.normalizedValues]
                        const rawValue = set.rawValues[axis.id as keyof typeof set.rawValues]
                        const x = PADDING + i * AXIS_WIDTH
                        const y = PADDING + ((SVG_HEIGHT - 2 * PADDING) * (100 - (value as number))) / 100
                        
                        // Determine tooltip position to avoid edge overflow
                        const tooltipX = x > SVG_WIDTH - 120 ? x - 110 : x + 10
                        
                        return (
                          <g key={`tooltip-${set.id}-${axis.id}`} className="pointer-events-none">
                            <rect
                              x={tooltipX}
                              y={y - 20}
                              width="100"
                              height="20"
                              rx="4"
                              className="fill-white dark:fill-slate-800 stroke-slate-200 dark:stroke-slate-700"
                            />
                            <text
                              x={tooltipX + 50}
                              y={y - 8}
                              textAnchor="middle"
                              className="fill-slate-800 dark:fill-slate-200 text-xs"
                            >
                              {rawValue}
                            </text>
                          </g>
                        )
                      })}
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>
      
      {/* Set Details Table */}
      <div className="mt-8">
        <h4 className="font-bold text-lg mb-4">Practice Set Details</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Subject
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Accuracy
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Completion Date
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Pace
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
              {processedData
                .filter(set => highlightedSubject === null || set.subject === highlightedSubject)
                .map(set => {
                  const subjectColor = getSubjectColor(set.subject)
                  return (
                    <tr 
                      key={set.id} 
                      className={`${
                        selectedSetId === set.id 
                          ? 'bg-indigo-50 dark:bg-indigo-900/20' 
                          : highlightedSet === set.id 
                            ? 'bg-slate-50 dark:bg-slate-800/80' 
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      } cursor-pointer transition-colors`}
                      onClick={() => onSelectSet && onSelectSet(set.id)}
                      onMouseEnter={() => setHighlightedSet(set.id)}
                      onMouseLeave={() => setHighlightedSet(null)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subjectColor.bgClass}`}>
                          {set.subject}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-200 whitespace-nowrap">
                        {set.type}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-slate-900 dark:text-slate-200">
                            {set.accuracy}%
                          </div>
                          <div className="ml-2 w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full" 
                              style={{ 
                                width: `${set.accuracy}%`,
                                backgroundColor: document.documentElement.classList.contains('dark') 
                                  ? subjectColor.dark 
                                  : subjectColor.stroke
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {new Date(set.dateCompleted).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-200 whitespace-nowrap">
                        {set.pace}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}