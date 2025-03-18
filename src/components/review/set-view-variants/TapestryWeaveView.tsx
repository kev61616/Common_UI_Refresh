'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from './types'

export const TapestryWeaveView: React.FC<SetViewProps> = ({ 
  sets, 
  selectedSetId, 
  onSelectSet, 
  isLoading = false 
}) => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Group sets by subject
  const groupedSets = sets?.reduce((acc, set) => {
    const subject = set.subject || 'Other'
    if (!acc[subject]) {
      acc[subject] = []
    }
    acc[subject].push(set)
    return acc
  }, {} as Record<string, typeof sets>) || {}
  
  // Generate a woven pattern SVG for each set
  const generateWovenPattern = (set: any, isSelected: boolean) => {
    // Color palette based on subject
    const subjectColors: Record<string, string[]> = {
      'Math': ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a'],
      'Reading': ['#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
      'Writing': ['#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'],
      'Other': ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95']
    }
    
    const colors = subjectColors[set.subject || 'Other']
    
    // Pattern density based on question count
    const density = Math.min(10, Math.max(4, Math.floor(set.questions.length / 5)))
    
    // Pattern variants based on accuracy
    const accuracyVariant = Math.floor((set.accuracy || 50) / 20)
    
    // Size of the pattern
    const size = 160
    const cellSize = size / density
    
    // Generate woven grid pattern
    const getWovenGrid = () => {
      const grid = []
      
      for (let y = 0; y < density; y++) {
        for (let x = 0; x < density; x++) {
          // Determine color index based on position and accuracy
          const colorIndex = (x + y + accuracyVariant) % colors.length
          
          // Pattern determination (horizontal or vertical thread)
          const isHorizontal = (y % 2 === 0 && x % 2 === 0) || (y % 2 === 1 && x % 2 === 1)
          
          // Calculate position
          const xPos = x * cellSize
          const yPos = y * cellSize
          
          // Create rect element for the thread
          grid.push(
            <rect 
              key={`${x}-${y}`}
              x={xPos}
              y={yPos}
              width={cellSize}
              height={cellSize}
              fill={colors[colorIndex]}
              opacity={isHorizontal ? 0.8 : 0.6}
              rx={1}
            />
          )
          
          // Add thread detail lines
          const detailColor = isHorizontal ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'
          
          if (isHorizontal) {
            // Horizontal thread details
            grid.push(
              <line 
                key={`h-detail-${x}-${y}`}
                x1={xPos}
                y1={yPos + cellSize / 2}
                x2={xPos + cellSize}
                y2={yPos + cellSize / 2}
                stroke={detailColor}
                strokeWidth={0.5}
              />
            )
          } else {
            // Vertical thread details
            grid.push(
              <line 
                key={`v-detail-${x}-${y}`}
                x1={xPos + cellSize / 2}
                y1={yPos}
                x2={xPos + cellSize / 2}
                y2={yPos + cellSize}
                stroke={detailColor}
                strokeWidth={0.5}
              />
            )
          }
        }
      }
      
      return grid
    }
    
    // Add decorative elements based on set properties
    const getDecorativeElements = () => {
      const elements = []
      
      // Add symbolic patterns based on accuracy
      if (set.accuracy >= 90) {
        // Gold thread details for excellent performance
        for (let i = 0; i < 3; i++) {
          elements.push(
            <path 
              key={`gold-${i}`}
              d={`M${20 + i * 50},20 Q${size / 2},${size - 40} ${size - 20 - i * 50},${size - 20}`}
              stroke="#f59e0b"
              strokeWidth={2}
              fill="none"
              opacity={0.8}
            />
          )
        }
      } else if (set.accuracy >= 70) {
        // Silver thread details for good performance
        for (let i = 0; i < 2; i++) {
          elements.push(
            <path 
              key={`silver-${i}`}
              d={`M${30 + i * 60},${size - 30} Q${size / 2},40 ${size - 30 - i * 60},${size - 30}`}
              stroke="#94a3b8"
              strokeWidth={2}
              fill="none"
              opacity={0.7}
            />
          )
        }
      }
      
      // Add symbolic pattern based on completion status
      const completionRatio = set.completedCount / set.questions.length
      
      if (completionRatio > 0) {
        elements.push(
          <circle 
            key="completion-circle"
            cx={size / 2}
            cy={size / 2}
            r={size / 4 * completionRatio}
            fill="none"
            stroke={colors[0]}
            strokeWidth={3}
            opacity={0.9}
          />
        )
      }
      
      return elements
    }
    
    return (
      <div 
        className={`relative group cursor-pointer transition-all duration-300 ${
          isSelected ? 'scale-105 z-10' : 'hover:scale-105'
        }`}
        onClick={() => onSelectSet(set.id)}
      >
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
            isSelected ? 'ring-4 ring-white/50 shadow-xl' : 'group-hover:shadow-lg'
          }`}
        >
          {/* Background */}
          <rect 
            x={0} 
            y={0} 
            width={size} 
            height={size} 
            fill="#f8fafc" 
            className="dark:fill-slate-800" 
          />
          
          {/* Woven pattern */}
          {getWovenGrid()}
          
          {/* Decorative elements */}
          {getDecorativeElements()}
          
          {/* Border */}
          <rect 
            x={0} 
            y={0} 
            width={size} 
            height={size} 
            fill="none" 
            stroke={colors[0]} 
            strokeWidth={isSelected ? 4 : 2} 
            className={isSelected ? 'stroke-white dark:stroke-white' : ''}
            opacity={isSelected ? 0.8 : 0.5}
            rx={8}
          />
        </svg>
        
        <div className="mt-3 text-center">
          <div className={`font-medium truncate ${isSelected ? 'text-primary' : ''}`}>
            {set.title}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {set.questions.length} questions · {set.accuracy}% accuracy
          </div>
        </div>
      </div>
    )
  }
  
  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400">No practice sets available to visualize</p>
      </div>
    )
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-5 text-center">Tapestry Weave View</h3>
      
      <div className="grid grid-cols-1 gap-8">
        {Object.entries(groupedSets).map(([subject, subjectSets]) => (
          <div key={subject}>
            <h4 className="text-lg font-medium mb-4 border-b pb-2 border-slate-200 dark:border-slate-700">
              {subject}
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {subjectSets.map(set => (
                <div key={set.id}>
                  {generateWovenPattern(set, set.id === selectedSetId)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium">Tapestry Legend:</span>
          <span className="ml-2">Weave density represents question count | </span>
          <span>Pattern complexity represents performance | </span>
          <span>Color schemes represent subjects</span>
        </div>
      </div>
    </div>
  )
}