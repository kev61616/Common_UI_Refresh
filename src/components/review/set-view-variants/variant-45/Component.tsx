'use client'

import React, { useState } from 'react'
import { SetViewProps } from '../../set-view-variants/types'

/**
 * 3D Bookshelf View
 * 
 * Displays study sets as books on a 3D perspective bookshelf:
 * - Each set is represented as a book with a distinctive spine
 * - Books are organized by subject in different shelf sections
 * - Interactive hover and selection effects with 3D perspective
 * - Color-coded and sized by subject, type, and difficulty
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null)
  
  // Group sets by subject to organize them on different shelves
  const setsBySubject: Record<string, typeof practiceSets> = {}
  
  practiceSets.forEach(set => {
    if (!setsBySubject[set.subject]) {
      setsBySubject[set.subject] = []
    }
    setsBySubject[set.subject].push(set)
  })
  
  // Get subject-specific styling
  const getSubjectStyles = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          mainColor: 'bg-blue-600',
          secondaryColor: 'bg-blue-200 dark:bg-blue-900',
          textColor: 'text-blue-800 dark:text-blue-200',
          accentColor: 'bg-sky-300 dark:bg-sky-700',
          shelfColor: 'from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-900'
        }
      case 'Reading':
        return {
          mainColor: 'bg-green-600',
          secondaryColor: 'bg-green-200 dark:bg-green-900',
          textColor: 'text-green-800 dark:text-green-200',
          accentColor: 'bg-emerald-300 dark:bg-emerald-700',
          shelfColor: 'from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-900'
        }
      case 'Writing':
        return {
          mainColor: 'bg-purple-600',
          secondaryColor: 'bg-purple-200 dark:bg-purple-900',
          textColor: 'text-purple-800 dark:text-purple-200',
          accentColor: 'bg-violet-300 dark:bg-violet-700',
          shelfColor: 'from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-900'
        }
      default:
        return {
          mainColor: 'bg-gray-600',
          secondaryColor: 'bg-gray-200 dark:bg-gray-800',
          textColor: 'text-gray-800 dark:text-gray-200',
          accentColor: 'bg-gray-300 dark:bg-gray-700',
          shelfColor: 'from-gray-100 to-gray-200 dark:from-gray-800/50 dark:to-gray-800'
        }
    }
  }
  
  // Get book styling based on set properties
  const getBookStyle = (set: typeof practiceSets[0]) => {
    const styles = []
    
    // Book height based on question count
    const questionCount = set.questions.length
    if (questionCount <= 10) {
      styles.push('h-32')
    } else if (questionCount <= 20) {
      styles.push('h-40')
    } else {
      styles.push('h-48')
    }
    
    // Book width based on difficulty
    switch (set.difficulty) {
      case 'Easy':
        styles.push('w-8')
        break
      case 'Medium':
        styles.push('w-10')
        break
      case 'Hard':
        styles.push('w-12')
        break
      default:
        styles.push('w-10')
    }
    
    // Book pattern based on type
    switch (set.type.toLowerCase()) {
      case 'algebra':
      case 'geometry':
      case 'statistics':
      case 'calculus':
        styles.push('border-l-4 border-r-4')
        break
      case 'comprehension':
      case 'vocabulary':
      case 'analysis':
        styles.push('border-t-4 border-b-4')
        break
      case 'grammar':
      case 'essay':
      case 'punctuation':
        styles.push('border-l-2 border-r-2 border-t-2 border-b-2')
        break
      default:
        styles.push('border-l border-r')
    }
    
    return styles.join(' ')
  }
  
  // Get book decoration based on completion percentage
  const getBookDecoration = (set: typeof practiceSets[0]) => {
    const completedQuestions = set.questions.filter(q => q.answered).length
    const totalQuestions = set.questions.length
    const completionRate = completedQuestions / totalQuestions
    
    if (completionRate >= 0.9) {
      // Gold trim for 90-100%
      return 'border-yellow-400 dark:border-yellow-500'
    } else if (completionRate >= 0.75) {
      // Silver trim for 75-89%
      return 'border-gray-300 dark:border-gray-400'
    } else if (completionRate >= 0.5) {
      // Bronze trim for 50-74%
      return 'border-amber-600 dark:border-amber-700'
    } else {
      // Plain trim for <50%
      return 'border-gray-600 dark:border-gray-700'
    }
  }
  
  // Format time spent on the set
  const formatTimeSpent = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${minutes}m`
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 h-full overflow-auto">
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-serif font-bold text-amber-800 dark:text-amber-300 mb-4">
          Library Bookshelf
        </h2>
        
        {/* Library sections by subject */}
        <div className="flex-1 space-y-12">
          {Object.entries(setsBySubject).map(([subject, sets], sectionIndex) => {
            const styles = getSubjectStyles(subject)
            
            return (
              <div key={subject} className="relative">
                {/* Section label */}
                <div className="mb-2 flex items-center">
                  <h3 className={`font-serif font-bold ${styles.textColor} text-xl`}>
                    {subject} Section
                  </h3>
                  <div className={`ml-3 h-0.5 flex-grow ${styles.mainColor}`}></div>
                </div>
                
                {/* Bookshelf */}
                <div className="relative">
                  {/* 3D bookshelf effect */}
                  <div 
                    className={`absolute inset-0 rounded-md bg-gradient-to-b ${styles.shelfColor}`}
                    style={{ 
                      transform: 'perspective(800px) rotateX(5deg)',
                      transformOrigin: 'center bottom',
                      height: '105%', // Slightly taller to account for perspective
                      zIndex: 0
                    }}
                  >
                    {/* Shelf edges */}
                    <div className="absolute top-0 w-full h-6 bg-amber-800/20 dark:bg-amber-900/30 rounded-t-md"></div>
                    <div className="absolute bottom-0 w-full h-6 bg-amber-950/30 dark:bg-amber-950/50 rounded-b-md"></div>
                  </div>
                  
                  {/* Books container */}
                  <div 
                    className="relative z-10 flex justify-start items-end py-8 px-6 min-h-[200px]"
                    style={{ 
                      transform: 'perspective(800px) rotateX(5deg)',
                      transformOrigin: 'center bottom'
                    }}
                  >
                    {sets.map((set, index) => {
                      const isSelected = set.id === selectedSetId
                      const isHovered = set.id === hoveredSetId
                      const completedQuestions = set.questions.filter(q => q.answered).length
                      const totalQuestions = set.questions.length
                      const completionPercentage = Math.round((completedQuestions / totalQuestions) * 100)
                      const bookStyle = getBookStyle(set)
                      const bookDecoration = getBookDecoration(set)
                      const subjectStyle = getSubjectStyles(set.subject)
                      
                      return (
                        <div 
                          key={set.id}
                          className={`
                            relative mx-1 transition-all duration-300 cursor-pointer
                            border ${bookDecoration} ${bookStyle} ${subjectStyle.mainColor}
                            ${isSelected ? 'translate-y-[-20px] shadow-xl z-20' : ''}
                            ${isHovered && !isSelected ? 'translate-y-[-10px] shadow-lg z-10' : ''}
                          `}
                          onClick={() => onSelectSet(set.id)}
                          onMouseEnter={() => setHoveredSetId(set.id)}
                          onMouseLeave={() => setHoveredSetId(null)}
                          style={{ transformOrigin: 'bottom center' }}
                        >
                          {/* Book spine content (vertical text) */}
                          <div className="h-full flex flex-col justify-between p-2 rotate-180"
                            style={{ writingMode: 'vertical-rl' }} // Vertical text
                          >
                            <div className="font-bold text-white truncate">
                              {set.type}
                            </div>
                            
                            {/* Accuracy rating as stars */}
                            <div className="flex mt-2 space-x-1">
                              {[...Array(5)].map((_, i) => {
                                const threshold = 20 * (i + 1)
                                return (
                                  <div 
                                    key={i} 
                                    className={`w-2 h-2 rounded-full ${
                                      set.accuracy >= threshold ? 'bg-yellow-300' : 'bg-gray-300/50'
                                    }`}
                                  />
                                )
                              })}
                            </div>
                            
                            {/* Level indicator */}
                            <div className="mt-auto text-xs text-white opacity-80 font-serif">
                              {set.difficulty}
                            </div>
                          </div>
                          
                          {/* Top of the book (only visible when pulled out) */}
                          <div className={`
                            absolute top-0 left-0 right-0 h-3 ${subjectStyle.secondaryColor}
                            transform -translate-y-3
                            ${isSelected || isHovered ? 'opacity-100' : 'opacity-0'}
                            transition-opacity duration-300
                          `}></div>
                          
                          {/* Book popup on hover/select for more details */}
                          <div className={`
                            absolute bottom-full left-0 mb-2 p-3 rounded-md shadow-lg bg-white dark:bg-gray-800
                            w-56 transform -translate-x-1/2 translate-y-0
                            ${isSelected || isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                            transition-all duration-300 z-30
                          `}>
                            <div className="font-bold text-gray-900 dark:text-white mb-1">
                              {set.type}
                            </div>
                            
                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {set.subject} • {set.difficulty} • {formatTimeSpent(set.timeUsed)}
                            </div>
                            
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                              Completed on {new Date(set.dateCompleted).toLocaleDateString()}
                            </div>
                            
                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full">
                              <div 
                                className={`h-1.5 rounded-full ${subjectStyle.mainColor}`}
                                style={{ width: `${completionPercentage}%` }}
                              ></div>
                            </div>
                            
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                              <span>Progress</span>
                              <span>{completedQuestions}/{totalQuestions} ({completionPercentage}%)</span>
                            </div>
                            
                            {/* Accuracy rating */}
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500 dark:text-gray-400">Accuracy</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => {
                                  const threshold = 20 * (i + 1)
                                  return (
                                    <svg 
                                      key={i} 
                                      className={`w-3 h-3 ${
                                        set.accuracy >= threshold ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                                      }`}
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  )
                                })}
                              </div>
                            </div>
                            
                            {/* Pointer for the popup */}
                            <div className="absolute w-3 h-3 bg-white dark:bg-gray-800 rotate-45 left-1/2 bottom-0 -mb-1.5 -ml-1.5"></div>
                          </div>
                        </div>
                      )
                    })}
                    
                    {/* Bookend */}
                    <div className="ml-2 h-24 w-6 bg-amber-800/80 dark:bg-amber-900/80 rounded-sm"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Library footer */}
        <div className="mt-8 text-center text-sm text-amber-700 dark:text-amber-400 italic">
          <p>— Hover over books to see details and click to select —</p>
        </div>
      </div>
    </div>
  )
}
