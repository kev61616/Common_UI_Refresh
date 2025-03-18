'use client'

import React, { useState } from 'react'
import { QuestionViewProps } from '../../question-view-variants/types'
import { PracticeSet } from '@/lib/mockData'

/**
 * Interactive Learning Path
 * 
 * An engaging visualization that shows questions as nodes on a learning path:
 * - Visual learning journey with branching pathways
 * - Questions grouped by concepts and difficulty
 * - Color-coded mastery indicators
 * - Interactive elements to explore question details
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  
  // Get all questions from practice sets
  const allQuestions = practiceSets.flatMap(set => 
    set.questions.map(q => ({
      ...q,
      setId: set.id,
      subject: set.subject,
      topic: set.type // Using set type as topic for grouping
    }))
  )
  
  // Group questions by subject and topic
  const groupedQuestions: Record<string, typeof allQuestions> = {}
  
  allQuestions.forEach(question => {
    const groupKey = `${question.subject}:${question.topic}`
    if (!groupedQuestions[groupKey]) {
      groupedQuestions[groupKey] = []
    }
    groupedQuestions[groupKey].push(question)
  })
  
  // Convert difficulty string to number
  const getDifficultyValue = (difficulty: any): number => {
    if (typeof difficulty === 'number') return difficulty
    
    // Handle string difficulty values
    switch(difficulty) {
      case 'Easy': return 1
      case 'Medium': return 3 
      case 'Hard': return 5
      default: return 3 // Default to medium
    }
  }
  
  // Sort groups by difficulty (average)
  const sortedGroups = Object.entries(groupedQuestions)
    .map(([key, questions]) => {
      // Calculate average difficulty with proper type handling
      const totalDifficulty = questions.reduce((sum: number, q) => sum + getDifficultyValue(q.difficulty), 0)
      const avgDifficulty = totalDifficulty / questions.length
      
      const [subject, topic] = key.split(':')
      return { key, subject, topic, questions, avgDifficulty }
    })
    .sort((a, b) => a.avgDifficulty - b.avgDifficulty)
  
  // Calculate mastery level for a question
  const getMasteryLevel = (question: any) => {
    if (!question.answered) return 'not-attempted'
    if (question.isCorrect && question.difficulty >= 4) return 'mastered'
    if (question.isCorrect) return 'understood'
    if (question.attempts > 2) return 'struggling'
    return 'learning'
  }
  
  // Get color based on mastery level
  const getMasteryColor = (masteryLevel: string) => {
    switch (masteryLevel) {
      case 'mastered': return 'bg-emerald-500 dark:bg-emerald-600'
      case 'understood': return 'bg-sky-500 dark:bg-sky-600'
      case 'learning': return 'bg-amber-500 dark:bg-amber-600'
      case 'struggling': return 'bg-rose-500 dark:bg-rose-600'
      default: return 'bg-gray-400 dark:bg-gray-600'
    }
  }
  
  // Get icon for each mastery level
  const getMasteryIcon = (masteryLevel: string) => {
    switch (masteryLevel) {
      case 'mastered':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        )
      case 'understood':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'learning':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case 'struggling':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }
  
  // Format difficulty as stars
  const formatDifficulty = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty)
  }
  
  // Handle question selection by selecting its parent set
  const handleQuestionClick = (question: any) => {
    onSelectSet(question.setId)
  }
  
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg h-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Interactive Learning Path
      </h2>
      
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Your personalized learning journey showing progress across different topics and concepts.
      </p>
      
      {/* Main view container */}
      <div className="overflow-x-auto pb-4">
        <div className="min-w-max">
          {/* Learning path with nodes */}
          <div className="relative space-y-10 pl-6 pr-4">
            <div className="absolute left-4 top-4 bottom-0 w-1 bg-gray-200 dark:bg-gray-700"></div>
            
            {sortedGroups.map((group, groupIndex) => {
              const isExpanded = expandedGroup === group.key
              
              return (
                <div key={group.key} className="relative">
                  {/* Topic group header */}
                  <div 
                    className={`
                      flex items-center mb-4 cursor-pointer -ml-6
                      ${isExpanded ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}
                    `}
                    onClick={() => setExpandedGroup(isExpanded ? null : group.key)}
                  >
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full 
                      ${isExpanded ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}
                      shadow-md z-10
                    `}>
                      <svg 
                        className={`w-5 h-5 ${isExpanded ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d={isExpanded 
                            ? "M19 9l-7 7-7-7" 
                            : "M9 5l7 7-7 7"
                          } 
                        />
                      </svg>
                    </div>
                    
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold">{group.topic}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {group.subject} • {formatDifficulty(Math.round(group.avgDifficulty))} • 
                        {group.questions.length} question{group.questions.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  {/* Questions in this group */}
                  {isExpanded && (
                    <div 
                      className="grid gap-4 ml-8 mb-8"
                      style={{ 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      }}
                    >
                      {group.questions.map((question: any, qIndex: number) => {
                        const isSelected = question.setId === selectedSetId
                        const isHovered = question.id === hoveredNode
                        const masteryLevel = getMasteryLevel(question)
                        
                        return (
                          <div 
                            key={question.id}
                            className={`
                              relative bg-white dark:bg-gray-800 rounded-lg p-4 border transition-all duration-300
                              ${isSelected ? 'ring-2 ring-blue-500 border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'}
                              ${isHovered ? 'shadow-md transform scale-[1.02]' : 'shadow'}
                              hover:shadow-md
                            `}
                            onClick={() => handleQuestionClick(question)}
                            onMouseEnter={() => setHoveredNode(question.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                          >
                            {/* Mastery indicator */}
                            <div className="absolute top-0 right-0 m-4 flex space-x-1 items-center">
                              <span className={`
                                flex items-center justify-center w-6 h-6 rounded-full text-white
                                ${getMasteryColor(masteryLevel)}
                              `}>
                                {getMasteryIcon(masteryLevel)}
                              </span>
                            </div>
                            
                            {/* Question number */}
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                              Question {qIndex + 1}
                            </div>
                            
                            {/* Question text (truncated) */}
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                              {question.text}
                            </h4>
                            
                            {/* Difficulty and stats */}
                            <div className="flex justify-between items-center text-sm mt-3">
                              <div className="text-amber-500 dark:text-amber-400">
                                {formatDifficulty(question.difficulty)}
                              </div>
                              
                              <div className="flex space-x-3 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{question.timeSpent}s</span>
                                </div>
                                
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  <span>{question.views}</span>
                                </div>
                                
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span>{question.attempts}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Mastery Levels</h3>
        <div className="flex flex-wrap gap-4">
          {['mastered', 'understood', 'learning', 'struggling', 'not-attempted'].map(level => (
            <div key={level} className="flex items-center">
              <span className={`
                flex items-center justify-center w-6 h-6 rounded-full text-white mr-2
                ${getMasteryColor(level)}
              `}>
                {getMasteryIcon(level)}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                {level.replace('-', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
