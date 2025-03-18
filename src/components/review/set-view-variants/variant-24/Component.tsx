'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from '../types'

/**
 * Seasonal Garden View
 * 
 * Primary Insight Objective: Reveal how time-of-day, seasonality, and environmental 
 * factors affect learning performance patterns.
 * 
 * Data-to-Visual Mapping:
 * - Season mapped to quadrants (revealing time-based performance patterns)
 * - Time of day mapped to position within season (morning/afternoon/evening clustering)
 * - Subject mapped to plant type (enabling subject-comparison within timeframes)
 * - Accuracy mapped to bloom/growth state (visual indicator of performance)
 * - Difficulty mapped to plant size (allows comparing performance across difficulty levels)
 * 
 * Analytical Value:
 * - Identify optimal learning times for different subjects
 * - Detect seasonal performance fluctuations
 * - Compare effectiveness across different environmental conditions
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null)
  const [groupedSets, setGroupedSets] = useState<{
    [key: string]: typeof practiceSets
  }>({})
  
  // Analyze sets to detect performance patterns by season and time of day
  useEffect(() => {
    const groups: {[key: string]: typeof practiceSets} = {
      'spring-morning': [],
      'spring-afternoon': [],
      'spring-evening': [],
      'summer-morning': [],
      'summer-afternoon': [],
      'summer-evening': [],
      'fall-morning': [],
      'fall-afternoon': [],
      'fall-evening': [],
      'winter-morning': [],
      'winter-afternoon': [],
      'winter-evening': [],
    }
    
    practiceSets.forEach(set => {
      const date = new Date(set.dateCompleted)
      const month = date.getMonth()
      const hours = date.getHours()
      
      // Determine season based on month
      let season = 'winter'
      if (month >= 2 && month <= 4) season = 'spring'
      else if (month >= 5 && month <= 7) season = 'summer'
      else if (month >= 8 && month <= 10) season = 'fall'
      
      // Determine time of day
      let timeOfDay = 'afternoon'
      if (hours < 12) timeOfDay = 'morning'
      else if (hours >= 18) timeOfDay = 'evening'
      
      // Group by season and time of day
      const key = `${season}-${timeOfDay}`
      groups[key].push(set)
    })
    
    setGroupedSets(groups)
  }, [practiceSets])
  
  // Helper function to get performance analysis for a time period
  const getPerformanceMetrics = (sets: typeof practiceSets) => {
    if (sets.length === 0) return { avgAccuracy: 0, subjectStrengths: {} }
    
    const avgAccuracy = sets.reduce((sum, set) => sum + set.accuracy, 0) / sets.length
    
    // Analyze subject strengths
    const subjectData: {[key: string]: {count: number, totalAccuracy: number}} = {}
    sets.forEach(set => {
      if (!subjectData[set.subject]) {
        subjectData[set.subject] = { count: 0, totalAccuracy: 0 }
      }
      subjectData[set.subject].count++
      subjectData[set.subject].totalAccuracy += set.accuracy
    })
    
    const subjectStrengths: {[key: string]: number} = {}
    for (const subject in subjectData) {
      subjectStrengths[subject] = subjectData[subject].totalAccuracy / subjectData[subject].count
    }
    
    return { avgAccuracy, subjectStrengths }
  }
  
  // Get season name with first letter capitalized
  const formatSeason = (seasonKey: string) => {
    const season = seasonKey.split('-')[0]
    return season.charAt(0).toUpperCase() + season.slice(1)
  }
  
  // Get time of day with first letter capitalized
  const formatTimeOfDay = (timeKey: string) => {
    const time = timeKey.split('-')[1]
    return time.charAt(0).toUpperCase() + time.slice(1)
  }
  
  // Get subject icon
  const getSubjectIcon = (subject: string) => {
    switch(subject) {
      case 'Math': return '∑'
      case 'Reading': return '📚'
      case 'Writing': return '✏️'
      default: return '📋'
    }
  }
  
  // Generate a color gradient based on accuracy percentage
  const getAccuracyGradient = (accuracy: number, subject: string) => {
    let baseColor = ''
    
    switch(subject) {
      case 'Math':
        baseColor = 'from-blue-500 to-blue-300'
        break
      case 'Reading':
        baseColor = 'from-purple-500 to-purple-300'
        break
      case 'Writing':
        baseColor = 'from-emerald-500 to-emerald-300'
        break
      default:
        baseColor = 'from-gray-500 to-gray-300'
    }
    
    if (accuracy < 70) {
      return baseColor.replace('500', '300').replace('300', '200')
    } else if (accuracy > 85) {
      return baseColor.replace('500', '600').replace('300', '400')
    }
    
    return baseColor
  }
  
  // Get season-specific background and colors
  const getSeasonStyle = (season: string) => {
    switch(season) {
      case 'spring':
        return {
          bg: 'from-green-100 to-emerald-50',
          accent: 'bg-pink-200',
          border: 'border-green-200',
          text: 'text-emerald-800'
        }
      case 'summer':
        return {
          bg: 'from-yellow-50 to-amber-50',
          accent: 'bg-amber-200',
          border: 'border-yellow-200',
          text: 'text-amber-800'
        }
      case 'fall':
        return {
          bg: 'from-orange-50 to-amber-100',
          accent: 'bg-orange-200',
          border: 'border-orange-200',
          text: 'text-orange-800'
        }
      case 'winter':
        return {
          bg: 'from-blue-50 to-indigo-50',
          accent: 'bg-blue-200',
          border: 'border-blue-200',
          text: 'text-blue-800'
        }
      default:
        return {
          bg: 'from-gray-50 to-gray-100',
          accent: 'bg-gray-200',
          border: 'border-gray-200',
          text: 'text-gray-800'
        }
    }
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-center">Seasonal Garden View</h3>
      <div className="text-sm text-center mb-6 text-gray-600 dark:text-gray-400">
        This view reveals how time-of-day and seasonal factors affect learning performance
      </div>
      
      {/* Garden grid - 4 seasons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['spring', 'summer', 'fall', 'winter'].map(season => {
          const seasonStyle = getSeasonStyle(season)
          
          // Get all sets for this season to analyze seasonal patterns
          const seasonSets = [
            ...groupedSets[`${season}-morning`] || [],
            ...groupedSets[`${season}-afternoon`] || [],
            ...groupedSets[`${season}-evening`] || []
          ]
          
          const metrics = getPerformanceMetrics(seasonSets)
          const hasData = seasonSets.length > 0
          
          return (
            <div 
              key={season}
              className={`rounded-xl overflow-hidden border ${seasonStyle.border} shadow-sm`}
            >
              {/* Season header */}
              <div className={`p-3 bg-gradient-to-r ${seasonStyle.bg} ${seasonStyle.text} font-medium flex justify-between items-center`}>
                <span>{formatSeason(season)} Garden</span>
                {hasData && (
                  <span className="text-sm">
                    Avg: {metrics.avgAccuracy.toFixed(1)}%
                  </span>
                )}
              </div>
              
              {/* Garden plots (times of day) */}
              <div className="p-4 bg-white dark:bg-gray-800 grid grid-cols-3 gap-3">
                {['morning', 'afternoon', 'evening'].map(timeOfDay => {
                  const key = `${season}-${timeOfDay}`
                  const sets = groupedSets[key] || []
                  const timeMetrics = getPerformanceMetrics(sets)
                  
                  return (
                    <div key={timeOfDay} className="flex flex-col">
                      <div className={`text-xs ${seasonStyle.text} mb-2 font-medium text-center`}>
                        {formatTimeOfDay(timeOfDay)}
                        {sets.length > 0 && ` (${sets.length})`}
                      </div>
                      
                      {/* Garden bed */}
                      <div className={`
                        h-48 rounded-md p-2 relative
                        border border-dashed ${seasonStyle.border}
                        flex flex-wrap content-end gap-2
                        ${sets.length === 0 ? 'bg-gray-50 dark:bg-gray-900/30' : ''}
                      `}>
                        {/* Time-specific insights */}
                        {sets.length === 0 ? (
                          <div className="text-xs text-gray-400 dark:text-gray-500 absolute inset-0 flex items-center justify-center p-2 text-center">
                            No practice data during {formatSeason(season)} {timeOfDay}
                          </div>
                        ) : (
                          <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                            {timeMetrics.avgAccuracy.toFixed(0)}%
                          </div>
                        )}
                        
                        {/* Plants (practice sets) */}
                        {sets.map((set) => {
                          const isSelected = selectedSetId === set.id
                          const isHovered = hoveredSet === set.id
                          const plantHeight = 20 + (set.accuracy / 3) // 20-53px based on accuracy
                          
                          // Calculate growth stage based on accuracy
                          let growthStage = 'seedling'
                          if (set.accuracy >= 90) growthStage = 'fullBloom'
                          else if (set.accuracy >= 75) growthStage = 'budding'
                          else if (set.accuracy >= 60) growthStage = 'growing'
                          
                          return (
                            <div
                              key={set.id}
                              className={`
                                relative cursor-pointer transition-all duration-300
                                ${isSelected ? 'z-10 scale-110' : 'hover:scale-105'}
                              `}
                              onClick={() => onSelectSet(set.id)}
                              onMouseEnter={() => setHoveredSet(set.id)}
                              onMouseLeave={() => setHoveredSet(null)}
                            >
                              {/* Plant visualization */}
                              <div className="flex flex-col items-center">
                                {/* Plant top (flower/leaves) */}
                                {growthStage !== 'seedling' && (
                                  <div className={`relative w-12 h-12`}>
                                    {set.subject === 'Math' && (
                                      // Math - geometric flower
                                      <div className={`
                                        absolute inset-0 rounded-full
                                        bg-gradient-to-b ${getAccuracyGradient(set.accuracy, set.subject)}
                                        ${growthStage === 'fullBloom' ? 'scale-100' : 'scale-75'}
                                        transition-all duration-500
                                      `}>
                                        {growthStage === 'fullBloom' && (
                                          <div className="absolute inset-2 rounded-full bg-white/30"></div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {set.subject === 'Reading' && (
                                      // Reading - book-shaped flower
                                      <div className={`
                                        absolute inset-[10%] 
                                        bg-gradient-to-tr ${getAccuracyGradient(set.accuracy, set.subject)}
                                        ${growthStage === 'fullBloom' ? 'rounded-sm' : 'rounded-full'}
                                        transition-all duration-500
                                      `}>
                                        {growthStage === 'fullBloom' && (
                                          <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-1 h-[80%] bg-white/30"></div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {set.subject === 'Writing' && (
                                      // Writing - script-like pattern
                                      <div className={`
                                        absolute inset-[15%] 
                                        bg-gradient-to-br ${getAccuracyGradient(set.accuracy, set.subject)}
                                        ${growthStage === 'fullBloom' ? 'rounded-tr-2xl rounded-bl-2xl' : 'rounded-full'}
                                        transition-all duration-500
                                      `}>
                                        {growthStage === 'fullBloom' && (
                                          <div className="absolute inset-y-0 right-0 w-1/2 rounded-tr-2xl rounded-br-2xl bg-white/20"></div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                {/* Plant stem */}
                                <div 
                                  className={`w-1.5 bg-green-500 rounded-full transition-all duration-500
                                    ${growthStage === 'seedling' ? 'h-2' : ''}
                                    ${growthStage === 'growing' ? 'h-4' : ''}
                                    ${growthStage === 'budding' ? 'h-6' : ''}
                                    ${growthStage === 'fullBloom' ? 'h-8' : ''}
                                  `}
                                ></div>
                                
                                {/* Plant base/pot - shows subject */}
                                <div className={`
                                  w-8 h-4 -mt-1 rounded-b-md flex items-center justify-center
                                  ${set.subject === 'Math' ? 'bg-blue-100 dark:bg-blue-900/50' : ''}
                                  ${set.subject === 'Reading' ? 'bg-purple-100 dark:bg-purple-900/50' : ''}
                                  ${set.subject === 'Writing' ? 'bg-emerald-100 dark:bg-emerald-900/50' : ''}
                                `}>
                                  <span className="text-xs">
                                    {getSubjectIcon(set.subject)}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Tooltip on hover/selection */}
                              {(isHovered || isSelected) && (
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-20 text-xs">
                                  <div className="font-medium">{set.subject}: {set.type}</div>
                                  <div className="flex justify-between mt-1">
                                    <div>Accuracy: {set.accuracy}%</div>
                                    <div>Questions: {set.questions.length}</div>
                                  </div>
                                  <div className="mt-1 text-gray-500 dark:text-gray-400">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                      
                      {/* Performance insights for this time period */}
                      {sets.length > 0 && (
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                          {Object.entries(timeMetrics.subjectStrengths).map(([subject, accuracy]) => (
                            <div key={subject} className="flex items-center gap-1">
                              <span>{getSubjectIcon(subject)}</span>
                              <div 
                                className={`h-1.5 rounded-full mt-0.5 ${
                                  subject === 'Math' ? 'bg-blue-400' : 
                                  subject === 'Reading' ? 'bg-purple-400' : 'bg-emerald-400'
                                }`}
                                style={{ width: `${accuracy / 2}px` }}
                              ></div>
                              <span>{Math.round(accuracy)}%</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              
              {/* Season performance insights */}
              {hasData && (
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 text-xs border-t border-gray-200 dark:border-gray-700">
                  <div className="font-medium mb-1">Season Insights:</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Sessions:</span> {seasonSets.length}
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Avg Accuracy:</span> {metrics.avgAccuracy.toFixed(1)}%
                    </div>
                    {Object.entries(metrics.subjectStrengths).map(([subject, accuracy]) => (
                      <div key={subject}>
                        <span className="text-gray-500 dark:text-gray-400">{subject}:</span> {Math.round(accuracy)}%
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* Legend and insights */}
      <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-sm">
        <h4 className="font-medium mb-2">Insight Guide</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="font-medium text-xs text-gray-500 dark:text-gray-400 mb-1">Plant Growth States</div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-300"></div>
                <div className="w-1.5 h-2 bg-green-500 rounded-full"></div>
                <div className="w-6 h-3 rounded-b-md bg-blue-100 dark:bg-blue-900/50"></div>
                <div className="text-xs mt-1">Seedling<br/>&lt;60%</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                <div className="w-1.5 h-4 bg-green-500 rounded-full"></div>
                <div className="w-6 h-3 rounded-b-md bg-blue-100 dark:bg-blue-900/50"></div>
                <div className="text-xs mt-1">Growing<br/>60-74%</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
                <div className="w-6 h-3 rounded-b-md bg-blue-100 dark:bg-blue-900/50"></div>
                <div className="text-xs mt-1">Budding<br/>75-89%</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-600 relative">
                  <div className="absolute inset-1 rounded-full bg-white/30"></div>
                </div>
                <div className="w-1.5 h-8 bg-green-500 rounded-full"></div>
                <div className="w-6 h-3 rounded-b-md bg-blue-100 dark:bg-blue-900/50"></div>
                <div className="text-xs mt-1">Bloom<br/>90%+</div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="font-medium text-xs text-gray-500 dark:text-gray-400 mb-1">Subject Types</div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-xs">Math</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span className="text-xs">Reading</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <span className="text-xs">Writing</span>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
              This visualization reveals patterns in your learning effectiveness across different 
              seasons and times of day. Compare garden plots to identify your optimal learning times.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}