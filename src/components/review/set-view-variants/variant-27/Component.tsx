'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from '../types'

/**
 * City District View
 * 
 * A data-driven visualization that represents practice sets as city districts/neighborhoods, with:
 * - Districts sized according to the number of questions (larger districts = more questions)
 * - Building heights representing performance accuracy (taller buildings = higher accuracy)
 * - District colors indicating subject categories 
 * - Building design styles reflecting difficulty levels
 * - Lighting effects showing recency of completion
 * 
 * Primary insight objective: To answer "How do my study investments (time/questions) correlate with performance outcomes?"
 * 
 * Data-to-visual mapping:
 * - District size → Question count (spatial area maps to investment volume)
 * - Building height → Accuracy (vertical dimension maps to performance level)
 * - Color scheme → Subject (categorical distinction)
 * - Building style → Difficulty (visual complexity increases with difficulty)
 * - Lighting effect → Recency (brighter for more recent)
 * 
 * This visualization enables users to:
 * 1. Identify which subjects receive most study investment (largest districts)
 * 2. Compare performance across different sized investments (height-to-area ratio)
 * 3. Spot patterns in performance-to-investment efficiency by subject
 * 4. Assess comparative difficulty distribution across their study portfolio
 */
export function Component({ practiceSets, selectedSetId, onSelectSet }: SetViewProps) {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null)

  // Helper function to get color based on subject
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math': return { 
        bg: 'bg-blue-100 dark:bg-blue-900/40', 
        border: 'border-blue-300 dark:border-blue-700',
        building: 'from-blue-200 to-blue-400 dark:from-blue-800 dark:to-blue-600',
        text: 'text-blue-900 dark:text-blue-200' 
      }
      case 'Reading': return { 
        bg: 'bg-emerald-100 dark:bg-emerald-900/40', 
        border: 'border-emerald-300 dark:border-emerald-700',
        building: 'from-emerald-200 to-emerald-400 dark:from-emerald-800 dark:to-emerald-600',
        text: 'text-emerald-900 dark:text-emerald-200' 
      }
      case 'Writing': return { 
        bg: 'bg-amber-100 dark:bg-amber-900/40', 
        border: 'border-amber-300 dark:border-amber-700',
        building: 'from-amber-200 to-amber-400 dark:from-amber-800 dark:to-amber-600',
        text: 'text-amber-900 dark:text-amber-200' 
      }
      default: return { 
        bg: 'bg-gray-100 dark:bg-gray-800/40', 
        border: 'border-gray-300 dark:border-gray-700',
        building: 'from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-600',
        text: 'text-gray-900 dark:text-gray-200' 
      }
    }
  }

  // Calculate relative size based on question count (normalized to largest set)
  const calculateDistrictSize = (questionCount: number) => {
    const maxQuestions = Math.max(...practiceSets.map(set => set.questions.length))
    const minSize = 30 // minimum percentage size
    const sizePercentage = minSize + ((questionCount / maxQuestions) * (100 - minSize))
    return sizePercentage
  }

  // Calculate building height based on accuracy
  const calculateBuildingHeight = (accuracy: number) => {
    const minHeight = 15 // px
    return minHeight + (accuracy / 100) * 85 // max height 100px
  }

  // Get recency factor (0-1) for lighting effect
  const getRecencyFactor = (dateCompleted: string) => {
    const completedDate = new Date(dateCompleted).getTime()
    const now = new Date().getTime()
    const oneDay = 24 * 60 * 60 * 1000
    const daysDifference = Math.abs((now - completedDate) / oneDay)
    
    // Scale from 0-60 days to 1-0 (newer = brighter)
    return Math.max(0, Math.min(1, 1 - (daysDifference / 60)))
  }

  // Compute number of buildings based on question count
  const getBuildingCount = (questionCount: number) => {
    // Scale: minimum 3 buildings, maximum 12
    return Math.max(3, Math.min(12, Math.floor(questionCount / 3)))
  }

  // Get building design based on difficulty
  const getBuildingStyle = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'rounded-sm'
      case 'Medium': return 'rounded-t-md' 
      case 'Hard': return 'rounded-t-lg'
      default: return 'rounded-sm'
    }
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        City Districts View
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
        Districts represent sets, buildings show accuracy (height), questions (number), and subjects (color).
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceSets.map(set => {
          const isSelected = set.id === selectedSetId
          const isHovered = set.id === hoveredSet
          const colors = getSubjectColor(set.subject)
          const districtSize = calculateDistrictSize(set.questions.length)
          const buildingCount = getBuildingCount(set.questions.length)
          const recencyFactor = getRecencyFactor(set.dateCompleted)
          const buildingStyle = getBuildingStyle(set.difficulty)
          
          return (
            <div
              key={set.id}
              className={`
                relative border ${colors.border} ${colors.bg} rounded-lg overflow-hidden shadow-md
                transition-all duration-300 cursor-pointer
                ${isSelected ? 'ring-4 ring-blue-500 scale-105 z-10' : ''}
                ${isHovered ? 'shadow-lg transform translate-y-[-4px]' : ''}
              `}
              onClick={() => onSelectSet(set.id)}
              onMouseEnter={() => setHoveredSet(set.id)}
              onMouseLeave={() => setHoveredSet(null)}
              style={{
                width: `${districtSize}%`,
                minWidth: '220px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              {/* District header */}
              <div className="flex justify-between items-center p-3">
                <div>
                  <h3 className={`font-bold ${colors.text}`}>
                    {set.subject} District
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {set.type} • {set.difficulty}
                  </p>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">
                  {new Date(set.dateCompleted).toLocaleDateString()}
                </div>
              </div>
              
              {/* City skyline */}
              <div className="relative h-[120px] p-3 flex items-end justify-center">
                {/* City background effects - haze and lighting */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-gray-200/30 to-transparent dark:from-blue-900/20 dark:to-transparent"
                  style={{ opacity: 0.3 + (recencyFactor * 0.7) }}
                />
                
                {/* Buildings */}
                <div className="flex items-end justify-center w-full gap-1 z-10">
                  {Array.from({ length: buildingCount }).map((_, i) => {
                    // Create varied heights around the accuracy value
                    const variationFactor = 0.85 + (Math.random() * 0.3)
                    const height = calculateBuildingHeight(set.accuracy) * variationFactor
                    const width = 100 / buildingCount // distribute evenly
                    
                    return (
                      <div 
                        key={i}
                        className={`
                          bg-gradient-to-t ${colors.building} ${buildingStyle}
                          ${isHovered ? 'shadow-lg' : 'shadow'}
                        `}
                        style={{
                          height: `${height}px`,
                          width: `${Math.max(8, width - 1)}%`,
                          boxShadow: isHovered ? `0 0 ${Math.floor(10 * recencyFactor)}px rgba(255,255,255,${recencyFactor * 0.5})` : 'none'
                        }}
                      >
                        {/* Windows */}
                        {height > 40 && (
                          <div className="h-full w-full flex flex-col justify-end overflow-hidden">
                            {Array.from({ length: Math.floor(height / 12) }).map((_, j) => (
                              <div key={j} className="w-full flex justify-around mb-2">
                                {Array.from({ length: 2 }).map((_, k) => (
                                  <div 
                                    key={k} 
                                    className="h-1.5 w-1.5 bg-yellow-100 dark:bg-white opacity-75"
                                    style={{ opacity: Math.random() > 0.3 ? 0.8 : 0 }}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
                
                {/* Ground / road */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-300 dark:bg-gray-700" />
              </div>
              
              {/* District metrics */}
              <div className="grid grid-cols-3 gap-1 p-2 bg-white/90 dark:bg-gray-800/90 text-center">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy</div>
                  <div className="font-semibold text-sm">{set.accuracy}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Questions</div>
                  <div className="font-semibold text-sm">{set.questions.length}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Time</div>
                  <div className="font-semibold text-sm">{Math.floor(set.timeUsed / 60)}m</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}