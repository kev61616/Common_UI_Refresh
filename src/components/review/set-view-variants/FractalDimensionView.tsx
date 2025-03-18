'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from './types'

export const FractalDimensionView: React.FC<SetViewProps> = ({ 
  sets, 
  selectedSetId, 
  onSelectSet, 
  isLoading = false 
}) => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fractal pattern generation functions
  const generateFractalPattern = (level: number, size: number, accuracy: number, isSelected: boolean) => {
    // Base shape and colors based on performance
    const baseColor = getColorFromAccuracy(accuracy)
    const selectedColor = isSelected ? 'border-white dark:border-white shadow-lg' : ''
    
    // Fractal complexity based on level
    let pattern
    
    if (level <= 1) {
      // Base level pattern
      pattern = (
        <div 
          className={`rounded-lg border-2 ${baseColor} ${selectedColor} overflow-hidden transform transition-all duration-300`}
          style={{ 
            width: `${size}px`, 
            height: `${size}px`,
            transform: isSelected ? 'scale(1.05)' : undefined
          }}
        ></div>
      )
    } else {
      // Create subdivisions for higher levels
      const subSize = size / 2
      
      // Pattern depends on level for visual variety
      if (level % 3 === 0) {
        // Spiral pattern
        pattern = (
          <div 
            className={`relative rounded-lg border-2 ${baseColor} ${selectedColor} overflow-hidden transform transition-all duration-300`}
            style={{ 
              width: `${size}px`, 
              height: `${size}px`,
              transform: isSelected ? 'scale(1.05)' : undefined
            }}
          >
            <div className="absolute left-0 top-0">
              {generateFractalPattern(level - 1, subSize, accuracy * 0.95, false)}
            </div>
            <div className="absolute right-0 top-0">
              {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
            </div>
            <div className="absolute left-0 bottom-0">
              {generateFractalPattern(level - 1, subSize, accuracy * 0.85, false)}
            </div>
            <div className="absolute right-0 bottom-0">
              {generateFractalPattern(level - 1, subSize, accuracy * 0.8, false)}
            </div>
          </div>
        )
      } else if (level % 3 === 1) {
        // Centered pattern
        pattern = (
          <div 
            className={`relative rounded-lg border-2 ${baseColor} ${selectedColor} flex items-center justify-center transform transition-all duration-300`}
            style={{ 
              width: `${size}px`, 
              height: `${size}px`,
              transform: isSelected ? 'scale(1.05)' : undefined
            }}
          >
            {generateFractalPattern(level - 1, size * 0.6, accuracy * 0.9, false)}
          </div>
        )
      } else {
        // H pattern
        pattern = (
          <div 
            className={`relative rounded-lg border-2 ${baseColor} ${selectedColor} flex flex-col items-center transform transition-all duration-300`}
            style={{ 
              width: `${size}px`, 
              height: `${size}px`,
              transform: isSelected ? 'scale(1.05)' : undefined
            }}
          >
            <div className="flex-1 w-full flex justify-around items-center">
              <div className="transform scale-75">
                {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
              </div>
              <div className="transform scale-75">
                {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
              </div>
            </div>
            <div className="flex-1 w-full flex justify-center items-center">
              <div className="transform scale-75">
                {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
              </div>
            </div>
            <div className="flex-1 w-full flex justify-around items-center">
              <div className="transform scale-75">
                {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
              </div>
              <div className="transform scale-75">
                {generateFractalPattern(level - 1, subSize, accuracy * 0.9, false)}
              </div>
            </div>
          </div>
        )
      }
    }
    
    return pattern
  }
  
  // Determine color based on accuracy
  const getColorFromAccuracy = (accuracy: number) => {
    if (accuracy >= 90) {
      return 'border-emerald-500 dark:border-emerald-400 bg-emerald-500/20 dark:bg-emerald-400/20'
    } else if (accuracy >= 70) {
      return 'border-blue-500 dark:border-blue-400 bg-blue-500/20 dark:bg-blue-400/20'
    } else if (accuracy >= 50) {
      return 'border-amber-500 dark:border-amber-400 bg-amber-500/20 dark:bg-amber-400/20'
    } else {
      return 'border-rose-500 dark:border-rose-400 bg-rose-500/20 dark:bg-rose-400/20'
    }
  }
  
  // Group sets by subject for better organization
  const groupedSets = sets?.reduce((acc, set) => {
    const subject = set.subject || 'Other'
    if (!acc[subject]) {
      acc[subject] = []
    }
    acc[subject].push(set)
    return acc
  }, {} as Record<string, typeof sets>) || {}
  
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
      <h3 className="text-xl font-bold mb-4 text-center">Fractal Dimension View</h3>
      
      <div className="space-y-6">
        {Object.entries(groupedSets).map(([subject, subjectSets]) => (
          <div key={subject} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-lg font-medium mb-3 border-b pb-2 border-slate-200 dark:border-slate-700">
              {subject}
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {subjectSets.map(set => {
                // Determine fractal complexity based on set properties
                const complexity = Math.min(3, 1 + Math.floor(set.questions.length / 10))
                
                return (
                  <div 
                    key={set.id}
                    onClick={() => onSelectSet(set.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex justify-center mb-3">
                      {generateFractalPattern(
                        complexity, 
                        120, 
                        set.accuracy || 50, 
                        set.id === selectedSetId
                      )}
                    </div>
                    
                    <div className="text-center">
                      <div className={`font-medium truncate ${set.id === selectedSetId ? 'text-primary' : ''}`}>
                        {set.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {set.questions.length} questions · {set.accuracy}% accuracy
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          <span className="font-medium">Fractal Legend:</span> 
          <span className="ml-2">Pattern complexity represents question count | </span>
          <span>Colors represent performance levels</span>
        </div>
        
        <div className="flex justify-center mt-3 space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1.5"></div>
            <span className="text-xs">90%+</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1.5"></div>
            <span className="text-xs">70-89%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1.5"></div>
            <span className="text-xs">50-69%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-rose-500 mr-1.5"></div>
            <span className="text-xs">&lt; 50%</span>
          </div>
        </div>
      </div>
    </div>
  )
}