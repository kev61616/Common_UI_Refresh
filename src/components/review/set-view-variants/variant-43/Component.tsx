'use client'

import React, { useState } from 'react'
import { SetViewProps } from '../../set-view-variants/types'

/**
 * Crystal Collection View
 * 
 * A crystal-themed visualization representing study sets as unique gemstones:
 * - Each set is visualized as a unique crystal with facets showing different properties
 * - Animated light reflections and facet highlights on hover/selection
 * - Color and size represent subject and importance/difficulty
 * - Structured in a virtual crystal cave arrangement
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null)
  
  // Sort sets by subject and completion percentage
  const sortedSets = [...practiceSets].sort((a, b) => {
    // First sort by subject
    if (a.subject < b.subject) return -1
    if (a.subject > b.subject) return 1
    
    // Then by accuracy
    return b.accuracy - a.accuracy
  })
  
  // Get subject-specific color
  const getSubjectColor = (subject: string): string => {
    switch (subject) {
      case 'Math': return 'from-blue-300 to-blue-600 dark:from-blue-400 dark:to-blue-700'
      case 'Reading': return 'from-green-300 to-green-600 dark:from-green-400 dark:to-green-700'
      case 'Writing': return 'from-purple-300 to-purple-600 dark:from-purple-400 dark:to-purple-700'
      case 'Science': return 'from-teal-300 to-teal-600 dark:from-teal-400 dark:to-teal-700'
      case 'History': return 'from-amber-300 to-amber-600 dark:from-amber-400 dark:to-amber-700'
      default: return 'from-gray-300 to-gray-600 dark:from-gray-400 dark:to-gray-700'
    }
  }
  
  // Get crystal type and corresponding SVG
  const getCrystalType = (set: typeof practiceSets[0]): string => {
    const difficultyMap: Record<string, string> = {
      'Easy': 'Quartz',
      'Medium': 'Amethyst',
      'Hard': 'Diamond'
    }
    return difficultyMap[set.difficulty] || 'Crystal'
  }
  
  // Get crystal face count based on questions
  const getFaceCount = (set: typeof practiceSets[0]): number => {
    const count = set.questions.length
    if (count <= 5) return 4 // tetrahedron
    if (count <= 10) return 6 // cube
    if (count <= 20) return 8 // octahedron
    if (count <= 30) return 12 // dodecahedron
    return 20 // icosahedron
  }
  
  // Get crystal size based on importance/difficulty
  const getCrystalSize = (set: typeof practiceSets[0]): string => {
    switch (set.difficulty) {
      case 'Easy': return 'w-24 h-24'
      case 'Medium': return 'w-28 h-28'
      case 'Hard': return 'w-32 h-32'
      default: return 'w-24 h-24'
    }
  }
  
  // Calculate clarity (opacity) based on accuracy
  const getCrystalClarity = (set: typeof practiceSets[0]): number => {
    return 0.5 + (set.accuracy / 200) // Range from 0.5 to 1.0
  }
  
  // Generate crystal SVG
  const renderCrystal = (set: typeof practiceSets[0], isHovered: boolean, isSelected: boolean) => {
    const crystalType = getCrystalType(set)
    const faceCount = getFaceCount(set)
    const subjectColor = getSubjectColor(set.subject)
    const clarity = getCrystalClarity(set)
    const baseTransform = isHovered ? 'rotate(-15deg)' : 'rotate(0deg)'
    const selectedTransform = isSelected ? 'scale(1.1)' : 'scale(1)'
    
    // Simple crystal SVG based on type
    if (crystalType === 'Quartz') {
      return (
        <div 
          className={`relative ${getCrystalSize(set)} bg-gradient-to-br ${subjectColor} rounded-md transform transition-all duration-300`}
          style={{ 
            clipPath: 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)',
            opacity: clarity,
            transform: `${baseTransform} ${selectedTransform}`
          }}
        >
          {/* Facets */}
          <div className="absolute inset-0 bg-white opacity-20 rounded-md"
            style={{ clipPath: 'polygon(50% 0%, 90% 20%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 10% 20%)' }}>
          </div>
          
          {/* Light reflection */}
          <div className="absolute inset-0 bg-white opacity-40 rounded-full blur-md"
            style={{ 
              width: '30%', 
              height: '30%', 
              top: '10%', 
              left: '10%', 
              filter: 'blur(4px)',
              animation: isHovered ? 'pulse 2s infinite' : 'none'
            }}>
          </div>
          
          {/* Center data */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold drop-shadow-md text-lg">
              {Math.round(set.accuracy)}%
            </span>
          </div>
        </div>
      )
    } else if (crystalType === 'Amethyst') {
      return (
        <div 
          className={`relative ${getCrystalSize(set)} bg-gradient-to-br ${subjectColor} transform transition-all duration-300`}
          style={{ 
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
            opacity: clarity,
            transform: `${baseTransform} ${selectedTransform}`
          }}
        >
          {/* Facets */}
          <div className="absolute inset-0 bg-white opacity-30"
            style={{ clipPath: 'polygon(50% 20%, 80% 50%, 50% 80%, 20% 50%)' }}>
          </div>
          
          {/* Light reflections */}
          <div className="absolute bg-white opacity-40 rounded-full blur-sm"
            style={{ 
              width: '40%', 
              height: '40%', 
              top: '10%', 
              left: '10%', 
              filter: 'blur(4px)',
              animation: isHovered ? 'pulse 2s infinite' : 'none'
            }}>
          </div>
          
          {/* Center data */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold drop-shadow-md text-lg">
              {Math.round(set.accuracy)}%
            </span>
          </div>
        </div>
      )
    } else { // Diamond or default
      return (
        <div 
          className={`relative ${getCrystalSize(set)} bg-gradient-to-br ${subjectColor} transform transition-all duration-300`}
          style={{ 
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            opacity: clarity,
            transform: `${baseTransform} ${selectedTransform}`
          }}
        >
          {/* Facets */}
          <div className="absolute inset-0 bg-white opacity-30"
            style={{ clipPath: 'polygon(50% 25%, 75% 50%, 50% 75%, 25% 50%)' }}>
          </div>
          
          {/* Light reflections */}
          <div className="absolute bg-white opacity-60 rounded-full blur-md"
            style={{ 
              width: '30%', 
              height: '30%', 
              top: '20%', 
              left: '20%', 
              filter: 'blur(3px)',
              animation: isHovered ? 'pulse 1.5s infinite' : 'none'
            }}>
          </div>
          
          {/* Center data */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold drop-shadow-md text-lg">
              {Math.round(set.accuracy)}%
            </span>
          </div>
        </div>
      )
    }
  }
  
  return (
    <div className="p-6 bg-gradient-to-b from-gray-900 to-indigo-950 dark:from-gray-950 dark:to-indigo-950 rounded-xl shadow-lg h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Crystal Collection
        </h2>
        <p className="text-gray-300">
          Explore your sets visualized as precious gemstones. The clarity and size represent your mastery and difficulty.
        </p>
      </div>
      
      {/* Main crystal display */}
      <div className="relative">
        {/* Background cave effect */}
        <div className="absolute inset-0 bg-indigo-900/20 rounded-lg -z-10 animate-pulse" 
          style={{ animationDuration: '10s' }}>
        </div>
        
        {/* Crystal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
          {sortedSets.map(set => {
            const isSelected = set.id === selectedSetId
            const isHovered = set.id === hoveredSetId
            const completedQuestions = set.questions.filter(q => q.answered).length
            const totalQuestions = set.questions.length
            
            return (
              <div 
                key={set.id}
                className={`
                  p-6 flex flex-col items-center justify-center bg-gray-800/40 backdrop-blur-sm 
                  rounded-lg transition-all duration-300 cursor-pointer
                  ${isSelected ? 'ring-2 ring-white/70 shadow-lg' : ''}
                  ${isHovered ? 'bg-gray-800/70 transform scale-105' : ''}
                `}
                onClick={() => onSelectSet(set.id)}
                onMouseEnter={() => setHoveredSetId(set.id)}
                onMouseLeave={() => setHoveredSetId(null)}
              >
                {/* Crystal visualization */}
                <div className="mb-4 relative">
                  {/* Glow effect for selected/hovered */}
                  {(isSelected || isHovered) && (
                    <div className="absolute inset-0 -z-10 rounded-full blur-xl opacity-70 animate-pulse"
                      style={{ 
                        background: set.subject === 'Math' ? 'radial-gradient(circle, rgba(59,130,246,0.7) 0%, rgba(59,130,246,0) 70%)' :
                                  set.subject === 'Reading' ? 'radial-gradient(circle, rgba(16,185,129,0.7) 0%, rgba(16,185,129,0) 70%)' :
                                  'radial-gradient(circle, rgba(139,92,246,0.7) 0%, rgba(139,92,246,0) 70%)',
                        width: '150%',
                        height: '150%',
                        left: '-25%',
                        top: '-25%'
                      }}
                    ></div>
                  )}
                  
                  {renderCrystal(set, isHovered, isSelected)}
                </div>
                
                {/* Set info */}
                <div className="w-full text-center">
                  <div className="text-white font-medium mb-1 truncate">
                    {set.type}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm mb-1">
                    <div className="text-gray-400">
                      {getCrystalType(set)}
                    </div>
                    <div className="text-gray-400">
                      {completedQuestions}/{totalQuestions}
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mb-1">
                    <div 
                      className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      style={{ width: `${(completedQuestions / totalQuestions) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mt-1">
                    {set.subject} • {set.difficulty}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-300">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
            <span>Math</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span>Reading</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
            <span>Writing</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white mr-1"
              style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}>
            </div>
            <span>Diamond = Hard</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white mr-1"
              style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)' }}>
            </div>
            <span>Amethyst = Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white mr-1"
              style={{ clipPath: 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)' }}>
            </div>
            <span>Quartz = Easy</span>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
