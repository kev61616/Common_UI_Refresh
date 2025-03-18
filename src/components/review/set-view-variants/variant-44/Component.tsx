'use client'

import React, { useState } from 'react'
import { SetViewProps } from '../../set-view-variants/types'

/**
 * Museum Gallery View
 * 
 * Presents study sets as exhibits in a museum gallery:
 * - Study sets displayed as framed artworks/exhibits
 * - Different wings/sections based on subject matter
 * - Interactive gallery with detailed information cards
 * - Art gallery-inspired layout and aesthetics
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  
  // Group practice sets by subject
  const galleryWings: Record<string, typeof practiceSets> = {}
  
  practiceSets.forEach(set => {
    if (!galleryWings[set.subject]) {
      galleryWings[set.subject] = []
    }
    galleryWings[set.subject].push(set)
  })
  
  // Sort sets within each wing by completion percentage
  Object.keys(galleryWings).forEach(subject => {
    galleryWings[subject].sort((a, b) => {
      const aCompleted = a.questions.filter(q => q.answered).length / a.questions.length
      const bCompleted = b.questions.filter(q => q.answered).length / b.questions.length
      return bCompleted - aCompleted // Sort by completion percentage descending
    })
  })
  
  // Get subject-specific styling
  const getSubjectStyles = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          accent: 'bg-blue-600 dark:bg-blue-700',
          textAccent: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-300 dark:border-blue-700',
          bg: 'bg-blue-50 dark:bg-blue-900/20',
          frameColor: 'from-blue-700 to-blue-900 dark:from-blue-800 dark:to-blue-950'
        }
      case 'Reading':
        return {
          accent: 'bg-green-600 dark:bg-green-700',
          textAccent: 'text-green-600 dark:text-green-400',
          border: 'border-green-300 dark:border-green-700',
          bg: 'bg-green-50 dark:bg-green-900/20',
          frameColor: 'from-green-700 to-green-900 dark:from-green-800 dark:to-green-950'
        }
      case 'Writing':
        return {
          accent: 'bg-purple-600 dark:bg-purple-700',
          textAccent: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-300 dark:border-purple-700',
          bg: 'bg-purple-50 dark:bg-purple-900/20',
          frameColor: 'from-purple-700 to-purple-900 dark:from-purple-800 dark:to-purple-950'
        }
      default:
        return {
          accent: 'bg-gray-600 dark:bg-gray-700',
          textAccent: 'text-gray-600 dark:text-gray-400',
          border: 'border-gray-300 dark:border-gray-700',
          bg: 'bg-gray-50 dark:bg-gray-900/20',
          frameColor: 'from-gray-700 to-gray-900 dark:from-gray-800 dark:to-gray-950'
        }
    }
  }
  
  // Get study set display style based on type/difficulty
  const getFrameStyle = (set: typeof practiceSets[0]) => {
    const styles = []
    
    // Frame style based on set type
    switch (set.type.toLowerCase()) {
      case 'algebra':
      case 'geometry':
      case 'statistics':
      case 'calculus':
        // Math-related sets get geometric frames
        styles.push('border-[10px] border-double')
        break
      case 'comprehension':
      case 'vocabulary':
      case 'analysis':
        // Reading-related sets get classic frames
        styles.push('border-[8px]')
        break
      case 'grammar':
      case 'essay':
      case 'punctuation':
        // Writing-related sets get ornate frames
        styles.push('border-[12px] border-double')
        break
      default:
        styles.push('border-[8px]')
    }
    
    // Set size based on difficulty
    switch (set.difficulty) {
      case 'Easy':
        styles.push('h-40 sm:h-48')
        break
      case 'Medium':
        styles.push('h-48 sm:h-56')
        break
      case 'Hard':
        styles.push('h-56 sm:h-64')
        break
      default:
        styles.push('h-48')
    }
    
    return styles.join(' ')
  }
  
  // Get exhibit pattern based on accuracy
  const getExhibitPattern = (set: typeof practiceSets[0]) => {
    const accuracy = set.accuracy
    
    if (accuracy >= 90) {
      return (
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-current" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '15px 15px',
            }}>
          </div>
        </div>
      )
    } else if (accuracy >= 75) {
      return (
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-current" 
            style={{ 
              backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
              backgroundSize: '15px 15px',
            }}>
          </div>
        </div>
      )
    } else if (accuracy >= 60) {
      return (
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-current" 
            style={{ 
              backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor)',
              backgroundSize: '20px 20px',
            }}>
          </div>
        </div>
      )
    } else {
      return (
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" 
            style={{ 
              backgroundImage: 'linear-gradient(45deg, currentColor 6%, transparent 6%, transparent 94%, currentColor 94%), linear-gradient(135deg, currentColor 6%, transparent 6%, transparent 94%, currentColor 94%)',
              backgroundSize: '24px 24px',
            }}>
          </div>
        </div>
      )
    }
  }
  
  return (
    <div className="bg-neutral-50 dark:bg-gray-900 rounded-xl shadow-lg h-full overflow-auto">
      {/* Museum header with name */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-800 dark:text-white">
              Knowledge Museum Gallery
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-serif">
              Explore our collection of study sets, curated by subject in dedicated wings
            </p>
          </div>
          
          {/* Museum logo/icon */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-8 h-8 border-4 border-gray-800 dark:border-white"></div>
            <div className="text-gray-800 dark:text-white font-serif text-sm">
              EST. 2025
            </div>
          </div>
        </div>
      </div>
      
      {/* Museum gallery content */}
      <div className="p-6">
        {Object.entries(galleryWings).map(([subject, sets]) => {
          const styles = getSubjectStyles(subject)
          const isExpanded = expandedSection === subject
          
          return (
            <div 
              key={subject}
              className={`mb-12 ${styles.border} border rounded-lg overflow-hidden transition-all duration-300`}
            >
              {/* Wing header */}
              <div 
                className={`${styles.accent} px-6 py-4 flex justify-between items-center cursor-pointer`}
                onClick={() => setExpandedSection(isExpanded ? null : subject)}
              >
                <h3 className="text-xl font-serif font-bold text-white">
                  {subject} Wing
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">
                    {sets.length} {sets.length === 1 ? 'Exhibit' : 'Exhibits'}
                  </span>
                  <svg 
                    className={`w-5 h-5 text-white transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Wing content - gallery of exhibits */}
              <div 
                className={`${styles.bg} p-6 transition-all duration-500 ease-in-out overflow-hidden ${
                  isExpanded || expandedSection === null ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 p-0'
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {sets.map(set => {
                    const isSelected = set.id === selectedSetId
                    const isHovered = set.id === hoveredSetId
                    const completedQuestions = set.questions.filter(q => q.answered).length
                    const totalQuestions = set.questions.length
                    const completionPercentage = Math.round((completedQuestions / totalQuestions) * 100)
                    
                    return (
                      <div 
                        key={set.id}
                        className={`
                          relative group flex flex-col bg-white dark:bg-gray-800 shadow-md
                          transition-all duration-300 cursor-pointer
                          ${isSelected ? 'ring-2 ring-offset-2 ring-orange-500 dark:ring-offset-gray-900 scale-[1.02] z-10' : ''}
                          ${isHovered ? 'shadow-lg scale-[1.01]' : ''}
                        `}
                        onClick={() => onSelectSet(set.id)}
                        onMouseEnter={() => setHoveredSetId(set.id)}
                        onMouseLeave={() => setHoveredSetId(null)}
                      >
                        {/* Exhibit frame */}
                        <div 
                          className={`
                            relative flex-1 flex items-center justify-center overflow-hidden
                            ${getFrameStyle(set)} ${styles.textAccent}
                            border-gradient-to-b ${styles.frameColor}
                          `}
                        >
                          {/* Background pattern based on accuracy */}
                          {getExhibitPattern(set)}
                          
                          {/* Exhibit content - Visual representation of completion */}
                          <div className="text-center z-10 px-4">
                            <div className="text-4xl font-serif font-bold mb-2">
                              {Math.round(set.accuracy)}%
                            </div>
                            <div className="text-sm">
                              Accuracy
                            </div>
                          </div>
                          
                          {/* Exhibit tag */}
                          <div className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 px-2 py-1 text-xs">
                            {set.difficulty}
                          </div>
                          
                          {/* "Now viewing" indicator for selected exhibits */}
                          {isSelected && (
                            <div className="absolute top-0 left-0 w-full bg-orange-500 text-white text-xs px-2 py-1 text-center">
                              Now Viewing
                            </div>
                          )}
                        </div>
                        
                        {/* Exhibit information */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="font-medium text-gray-900 dark:text-white truncate mb-1">
                            {set.type}
                          </div>
                          
                          {/* Progress bar */}
                          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
                            <div 
                              className={`h-1 rounded-full ${styles.accent}`}
                              style={{ width: `${completionPercentage}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Progress: {completionPercentage}%</span>
                            <span>{completedQuestions}/{totalQuestions}</span>
                          </div>
                        </div>
                        
                        {/* Info badge that appears on hover */}
                        <div className={`
                          absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent
                          p-4 pt-8 text-white transform transition-all duration-300
                          ${isHovered ? 'opacity-100' : 'opacity-0 translate-y-4'}
                        `}>
                          <div className="text-xs font-medium">
                            Time spent: {Math.round(set.timeUsed / 60)} minutes
                          </div>
                          <div className="text-xs">
                            {set.timeOfDay} • {new Date(set.dateCompleted).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Museum footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 text-center text-gray-600 dark:text-gray-400 text-xs font-serif">
        <p>Thank you for visiting the Knowledge Museum Gallery • Please explore all exhibits</p>
      </div>
    </div>
  )
}
