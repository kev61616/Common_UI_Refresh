'use client'

import React, { useState, useEffect, useRef } from 'react'
import { TimelineViewProps } from '../../timeline-view-variants/types'
import { PracticeSet } from '@/lib/mockData'

/**
 * Interactive Story Timeline
 * 
 * A narrative-focused timeline that presents study sessions as chapters in a story:
 * - Visual storytelling approach with rich illustrations and animations
 * - Interactive elements that reveal detailed information about study sessions
 * - Clear progression and narrative arc showing learning journey
 * - Milestones and achievements highlighted as plot points
 */
export function Component({ practiceSets, selectedSetId, onSelectSet }: TimelineViewProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  
  // Transform practice sets into timeline data format for ease of use
  const timelineData = practiceSets.map(set => ({
    id: set.id,
    date: set.dateCompleted,
    subject: set.subject,
    type: set.type,
    score: set.accuracy,
    questionsCompleted: set.questions.filter(q => q.answered).length,
    totalQuestions: set.questions.length,
    timeSpent: Math.round(set.timeUsed / 60) // Convert seconds to minutes
  }))
  
  // Auto-scroll to selected item
  useEffect(() => {
    if (!selectedSetId || !timelineRef.current) return
    
    const selectedElement = document.getElementById(`timeline-item-${selectedSetId}`)
    if (!selectedElement) return
    
    setIsScrolling(true)
    
    const timelineRect = timelineRef.current.getBoundingClientRect()
    const itemRect = selectedElement.getBoundingClientRect()
    
    timelineRef.current.scrollTo({
      left: itemRect.left - timelineRect.left - timelineRect.width / 2 + itemRect.width / 2,
      behavior: 'smooth',
    })
    
    // Reset scrolling state after animation
    setTimeout(() => setIsScrolling(false), 1000)
  }, [selectedSetId])
  
  // Format date as "Jan 15" or similar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
  
  // Sort timeline data by date
  const sortedTimelineData = [...timelineData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  
  // Group timeline items by month for chapter styling
  type TimelineItem = typeof timelineData[0]
  const timelineByMonth: Record<string, TimelineItem[]> = {}
  
  sortedTimelineData.forEach(item => {
    const date = new Date(item.date)
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    
    if (!timelineByMonth[monthYear]) {
      timelineByMonth[monthYear] = []
    }
    timelineByMonth[monthYear].push(item)
  })
  
  // Color scale based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500'
    if (score >= 75) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    if (score >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }
  
  // Get icon based on session type
  const getSessionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'quiz':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M8,14H6v-2h2V14z M8,11H6V9h2V11z M8,8H6V6h2V8z M18,14h-8v-2h8V14z M18,11h-8V9h8V11z M18,8h-8V6h8V8z" />
          </svg>
        )
      case 'practice':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H16L12,22L8,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M18,14V12H12V14H18M18,11V9H12V11H18M18,8V6H12V8H18M6,14H8.5L9,14.5L9.5,14H12V6H6V14Z" />
          </svg>
        )
      case 'review':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
          </svg>
        )
      case 'exam':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16,2H8A2,2 0 0,0 6,4V20A2,2 0 0,0 8,22H16A2,2 0 0,0 18,20V4A2,2 0 0,0 16,2M16,20H8V4H16V20M13,14.5V16H10V10H13V11.5H11.5V12.5H13V14H11.5V14.5H13Z" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z" />
          </svg>
        )
    }
  }
  
  // Determine if an item represents a milestone (high score or completion)
  const isMilestone = (item: TimelineItem) => {
    return item.score >= 90 || item.questionsCompleted === item.totalQuestions
  }
  
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md h-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Interactive Story Timeline
      </h2>
      
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Your learning journey visualized as an interactive story. Explore chapters of your progress!
      </p>
      
      {/* Timeline container */}
      <div 
        ref={timelineRef}
        className="relative mt-8 pb-10 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
      >
        <div className="min-w-max">
          <div className="flex space-x-10 px-8">
            {/* Timeline chapters by month */}
            {Object.entries(timelineByMonth).map(([monthYear, items], chapterIndex) => (
              <div key={monthYear} className="flex flex-col">
                <h3 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
                  Chapter {chapterIndex + 1}: {monthYear}
                </h3>
                
                {/* Timeline track */}
                <div className="relative">
                  <div className="absolute left-0 top-16 w-full h-1 bg-gray-300 dark:bg-gray-700"></div>
                  
                  {/* Month's timeline items */}
                  <div className="flex space-x-12 relative">
                    {items.map((item, idx) => {
                      const isSelected = item.id === selectedSetId
                      const isExpanded = item.id === expandedItem
                      const isLastItem = idx === items.length - 1
                      
                      return (
                        <div 
                          key={item.id}
                          id={`timeline-item-${item.id}`}
                          className={`
                            relative flex flex-col items-center transition-all duration-300
                            ${isExpanded ? 'scale-105' : ''}
                          `}
                        >
                          {/* Date label */}
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {formatDate(item.date)}
                          </div>
                          
                          {/* Timeline node */}
                          <div 
                            className={`
                              relative z-10 flex items-center justify-center w-10 h-10 rounded-full
                              transition-all duration-300 cursor-pointer
                              ${isSelected ? 'ring-4 ring-blue-400 ring-opacity-50' : ''}
                              ${isMilestone(item) ? 'bg-purple-600 shadow-lg shadow-purple-200 dark:shadow-purple-900/30' : `${getScoreColor(item.score)}`}
                            `}
                            onClick={() => {
                              onSelectSet(item.id)
                              setExpandedItem(isExpanded ? null : item.id)
                            }}
                          >
                            <span className="text-white">
                              {getSessionIcon(item.type)}
                            </span>
                            
                            {/* Animated pulse for milestones */}
                            {isMilestone(item) && (
                              <span className="absolute w-full h-full rounded-full bg-purple-400 opacity-50 animate-ping"></span>
                            )}
                          </div>
                          
                          {/* Line to next item */}
                          {!isLastItem && (
                            <div className="absolute left-10 top-16 w-12 h-1 bg-gray-300 dark:bg-gray-700"></div>
                          )}
                          
                          {/* Session type */}
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">
                            {item.type}
                          </div>
                          
                          {/* Expanded view with details */}
                          {isExpanded && (
                            <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-64 border border-gray-200 dark:border-gray-700 animate-fadeIn">
                              <div className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                                {item.subject}: {item.type}
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">Score:</span>
                                  <span className="font-semibold">{item.score}%</span>
                                </div>
                                
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                                  <span className="font-semibold">{item.questionsCompleted}/{item.totalQuestions}</span>
                                </div>
                                
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600 dark:text-gray-400">Time spent:</span>
                                  <span className="font-semibold">{item.timeSpent} min</span>
                                </div>
                                
                                {/* Progress bar */}
                                <div className="mt-2">
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                      className={`${getScoreColor(item.score)} h-2 rounded-full`}
                                      style={{ width: `${item.score}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                {/* Milestone badge */}
                                {isMilestone(item) && (
                                  <div className="mt-2 bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-center">
                                    <span className="text-purple-800 dark:text-purple-300 text-sm font-semibold">
                                      🏆 Achievement Unlocked!
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Navigation hints */}
      <div className="mt-6 flex justify-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md">
          <p>Click on any node to see detailed information and select that session.</p>
          <p className="mt-1">Your achievements and milestones are highlighted in purple.</p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        
        .scrollbar-thumb-blue-500::-webkit-scrollbar-thumb {
          background-color: rgb(59, 130, 246);
          border-radius: 9999px;
        }
        
        .scrollbar-track-gray-200::-webkit-scrollbar-track {
          background-color: rgb(229, 231, 235);
          border-radius: 9999px;
        }
      `}</style>
    </div>
  )
}
