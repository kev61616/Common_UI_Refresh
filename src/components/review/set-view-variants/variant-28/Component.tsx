'use client'

import React, { useState } from 'react'
import { SetViewProps } from '../types'

/**
 * Library Archive View
 * 
 * A data-driven visualization that represents practice sets as book collections within a library archive, with:
 * - Archive shelves organized by subject areas (color-coded sections)
 * - Books of different sizes representing question sets (thicker books = more questions)
 * - Book bindings styled according to performance (ornate bindings = higher accuracy)
 * - Shelf ordering indicating chronology (newest at eye level)
 * - Book conditions showing recency (newer books appear fresher)
 * 
 * Primary insight objective: To answer "How has my study material diversity and performance evolved over time?"
 * 
 * Data-to-visual mapping:
 * - Shelf section → Subject (categorical organization)
 * - Book thickness → Question count (physical size maps to content volume)
 * - Binding style → Accuracy (ornate detail increases with performance quality)
 * - Shelf position → Recency (temporal organization)
 * - Book condition → Time spent (wear patterns indicate study intensity)
 * 
 * This visualization enables users to:
 * 1. See distribution of study efforts across subjects (shelf space allocation)
 * 2. Track performance changes over time within subject areas (binding evolution)
 * 3. Identify patterns in study material selection (book size patterns)
 * 4. Compare relative investment across different subject areas (shelf comparison)
 */
export function Component({ practiceSets, selectedSetId, onSelectSet }: SetViewProps) {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null)
  
  // Group practice sets by subject
  const subjectGroups = practiceSets.reduce((groups, set) => {
    if (!groups[set.subject]) {
      groups[set.subject] = []
    }
    groups[set.subject].push(set)
    return groups
  }, {} as Record<string, typeof practiceSets>)
  
  // Sort sets within each subject by date (newest first)
  Object.keys(subjectGroups).forEach(subject => {
    subjectGroups[subject].sort((a, b) => {
      return new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()
    })
  })
  
  // Helper function to get shelf style based on subject
  const getShelfStyle = (subject: string) => {
    switch (subject) {
      case 'Math': return { 
        bg: 'bg-blue-50 dark:bg-blue-900/20', 
        border: 'border-blue-200 dark:border-blue-800',
        wood: 'bg-amber-800 dark:bg-amber-950',
        label: 'bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100'
      }
      case 'Reading': return { 
        bg: 'bg-emerald-50 dark:bg-emerald-900/20', 
        border: 'border-emerald-200 dark:border-emerald-800',
        wood: 'bg-amber-800 dark:bg-amber-950',
        label: 'bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100'
      }
      case 'Writing': return { 
        bg: 'bg-amber-50 dark:bg-amber-900/20', 
        border: 'border-amber-200 dark:border-amber-800',
        wood: 'bg-amber-800 dark:bg-amber-950',
        label: 'bg-amber-100 dark:bg-amber-800 text-amber-900 dark:text-amber-100'
      }
      default: return { 
        bg: 'bg-gray-50 dark:bg-gray-800/20', 
        border: 'border-gray-200 dark:border-gray-700',
        wood: 'bg-amber-800 dark:bg-amber-950',
        label: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
      }
    }
  }
  
  // Helper function to get book style based on set data
  const getBookStyle = (set: (typeof practiceSets)[0]) => {
    // Color palette based on accuracy
    let colorClass = 'bg-red-400 dark:bg-red-700'
    if (set.accuracy >= 90) colorClass = 'bg-green-400 dark:bg-green-700'
    else if (set.accuracy >= 75) colorClass = 'bg-green-300 dark:bg-green-600'
    else if (set.accuracy >= 60) colorClass = 'bg-yellow-400 dark:bg-yellow-600'
    else if (set.accuracy >= 40) colorClass = 'bg-orange-400 dark:bg-orange-700'
    
    // Calculate book thickness based on question count
    const maxQuestions = Math.max(...practiceSets.map(s => s.questions.length))
    const minWidth = 10 // px
    const maxWidth = 40 // px
    const width = minWidth + ((set.questions.length / maxQuestions) * (maxWidth - minWidth))
    
    // Calculate book height based on time spent
    const maxTime = Math.max(...practiceSets.map(s => s.timeUsed))
    const minHeight = 60 // px
    const maxHeight = 100 // px
    const height = minHeight + ((set.timeUsed / maxTime) * (maxHeight - minHeight))
    
    // Get book pattern based on difficulty
    let patternClass = ''
    switch (set.difficulty) {
      case 'Easy':
        patternClass = 'bg-gradient-to-b from-white/10 to-transparent'
        break
      case 'Medium':
        patternClass = 'bg-gradient-to-b from-white/10 via-transparent to-white/10'
        break
      case 'Hard':
        patternClass = 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent'
        break
    }
    
    // Calculate book condition based on recency
    const now = new Date().getTime()
    const completedDate = new Date(set.dateCompleted).getTime()
    const daysDifference = Math.abs((now - completedDate) / (24 * 60 * 60 * 1000))
    const maxDays = 60
    const conditionFactor = 1 - Math.min(daysDifference / maxDays, 1)
    const opacity = 0.7 + (conditionFactor * 0.3)
    
    return {
      colorClass,
      patternClass,
      style: {
        width: `${width}px`,
        height: `${height}px`,
        opacity
      }
    }
  }
  
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Library Archive View
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
        Browse your practice sets organized as books in a library archive. Book thickness shows question count, height shows time spent, and color shows performance.
      </p>
      
      <div className="space-y-10">
        {Object.keys(subjectGroups).map(subject => {
          const sets = subjectGroups[subject]
          const shelfStyle = getShelfStyle(subject)
          
          return (
            <div key={subject} className={`rounded-lg overflow-hidden ${shelfStyle.bg} ${shelfStyle.border} border shadow-md`}>
              {/* Shelf label */}
              <div className={`py-2 px-4 flex justify-between items-center ${shelfStyle.label}`}>
                <h3 className="font-bold">{subject} Archive</h3>
                <span className="text-xs">{sets.length} sets</span>
              </div>
              
              {/* Bookshelf */}
              <div className="p-4 relative">
                {/* Books */}
                <div className="flex items-end h-[150px] mb-1 px-2">
                  {sets.map(set => {
                    const isSelected = set.id === selectedSetId
                    const isHovered = set.id === hoveredSet
                    const bookStyle = getBookStyle(set)
                    
                    return (
                      <div 
                        key={set.id}
                        className="flex flex-col items-center mx-1 relative pb-1 group"
                        onMouseEnter={() => setHoveredSet(set.id)}
                        onMouseLeave={() => setHoveredSet(null)}
                      >
                        {/* Book */}
                        <div
                          className={`
                            ${bookStyle.colorClass} ${bookStyle.patternClass}
                            rounded-t-sm rounded-r-sm border-t border-r border-l border-white/20 dark:border-black/20
                            cursor-pointer transition-all duration-200 relative z-10
                            ${isSelected ? 'ring-2 ring-blue-500 z-20 translate-y-[-8px]' : ''}
                            ${isHovered ? 'translate-y-[-5px] shadow-md z-20' : ''}
                          `}
                          style={bookStyle.style}
                          onClick={() => onSelectSet(set.id)}
                        >
                          {/* Book title (rotated on spine) */}
                          <div className="absolute inset-0 flex items-center justify-center origin-left -rotate-90 overflow-hidden p-1">
                            <span className="text-white text-xs truncate font-medium whitespace-nowrap">
                              {set.type}
                            </span>
                          </div>
                          
                          {/* Reading level indicator (lines on the spine) */}
                          <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center space-y-1">
                            {Array.from({ length: set.difficulty === 'Easy' ? 1 : set.difficulty === 'Medium' ? 2 : 3 }).map((_, i) => (
                              <div key={i} className="h-px w-3/4 bg-white/40 dark:bg-white/30" />
                            ))}
                          </div>
                          
                          {/* Accuracy badge */}
                          <div className="absolute top-1 right-1 flex items-center justify-center">
                            <div className={`
                              h-2 w-2 rounded-full
                              ${set.accuracy >= 90 ? 'bg-green-300' : 
                                set.accuracy >= 75 ? 'bg-green-200' : 
                                set.accuracy >= 60 ? 'bg-yellow-300' : 
                                set.accuracy >= 40 ? 'bg-orange-300' : 
                                'bg-red-300'}
                            `} />
                          </div>
                        </div>
                        
                        {/* Book information tooltip */}
                        <div className={`
                          absolute bottom-full mb-2 bg-white dark:bg-gray-800 
                          shadow-lg rounded p-2 text-xs w-40 z-30
                          transition-opacity duration-200
                          ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                        `}>
                          <div className="font-bold">{set.type}</div>
                          <div className="text-gray-500 dark:text-gray-400 text-xxs">
                            {new Date(set.dateCompleted).toLocaleDateString()}
                          </div>
                          <div className="grid grid-cols-2 gap-1 mt-1 text-xxs">
                            <div>Accuracy: <span className="font-medium">{set.accuracy}%</span></div>
                            <div>Questions: <span className="font-medium">{set.questions.length}</span></div>
                            <div>Time: <span className="font-medium">{Math.floor(set.timeUsed / 60)}m</span></div>
                            <div>Difficulty: <span className="font-medium">{set.difficulty}</span></div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Shelf wood */}
                <div className={`h-3 ${shelfStyle.wood} w-full rounded-sm shadow-md`} />
              </div>
            </div>
          )
        })}
      </div>
      
      <style jsx>{`
        .text-xxs {
          font-size: 0.65rem;
          line-height: 1rem;
        }
      `}</style>
    </div>
  )
}