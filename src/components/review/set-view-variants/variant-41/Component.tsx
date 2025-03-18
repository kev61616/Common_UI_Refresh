'use client'

import React, { useState, useEffect, useRef } from 'react'
import { SetViewProps } from '../../set-view-variants/types'

/**
 * Holographic Card View
 * 
 * A futuristic holographic card view for practice sets that features:
 * - Interactive 3D tilting effect with parallax
 * - Holographic gradient effects that respond to mouse position
 * - Visual indicators for subject/accuracy using color coding
 * - Clean information hierarchy with modern typography
 */
export function Component({ practiceSets, selectedSetId, onSelectSet }: SetViewProps) {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Helper function to get color based on subject
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math': return 'from-blue-500 to-cyan-300'
      case 'Reading': return 'from-purple-500 to-pink-300'
      case 'Writing': return 'from-green-500 to-emerald-300'
      default: return 'from-gray-500 to-gray-300'
    }
  }
  
  // Helper function to get icon based on subject
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Math': return '∑'
      case 'Reading': return '📚'
      case 'Writing': return '✏️'
      default: return '📋'
    }
  }
  
  // Helper function to get performance indicator color
  const getPerformanceColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-500'
    if (accuracy >= 75) return 'bg-green-300'
    if (accuracy >= 60) return 'bg-yellow-400'
    if (accuracy >= 40) return 'bg-orange-400'
    return 'bg-red-500'
  }
  
  // Format time from seconds to minutes:seconds
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  
  // Handle 3D effect
  useEffect(() => {
    if (!containerRef.current) return
    
    const container = containerRef.current
    const cards = Array.from(container.querySelectorAll('.holographic-card')) as HTMLElement[]
    
    const handleMouseMove = (e: Event) => {
      const event = e as MouseEvent
      const card = event.currentTarget as HTMLElement
      const cardRect = card.getBoundingClientRect()
      const cardContent = card.querySelector('.card-content') as HTMLElement
      if (!cardContent) return
      
      // Calculate mouse position relative to card center
      const centerX = cardRect.left + cardRect.width / 2
      const centerY = cardRect.top + cardRect.height / 2
      const posX = event.clientX - centerX
      const posY = event.clientY - centerY
      
      // Calculate rotation (limited to +/- 10 degrees)
      const rotateY = posX * 10 / (cardRect.width / 2)
      const rotateX = -posY * 10 / (cardRect.height / 2)
      
      // Apply transform
      cardContent.style.setProperty('--rotateX', `${rotateX}deg`)
      cardContent.style.setProperty('--rotateY', `${rotateY}deg`)
    }
    
    const handleMouseLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement
      const cardContent = card.querySelector('.card-content') as HTMLElement
      if (!cardContent) return
      
      // Reset transform
      cardContent.style.setProperty('--rotateX', '0deg')
      cardContent.style.setProperty('--rotateY', '0deg')
    }
    
    // Add event listeners to all cards
    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)
    })
    
    // Clean up event listeners on unmount
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [practiceSets]) // Re-run when practice sets change
  
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg min-h-[600px]" ref={containerRef}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Holographic Card View
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceSets.map(set => {
          const isSelected = set.id === selectedSetId
          const isHovered = set.id === hoveredSet
          
          return (
            <div
              key={set.id}
              className={`
                holographic-card relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300
                ${isSelected ? 'ring-4 ring-blue-500 scale-105' : ''}
                shadow-xl backdrop-blur-sm
              `}
              onClick={() => onSelectSet(set.id)}
              onMouseEnter={() => setHoveredSet(set.id)}
              onMouseLeave={() => setHoveredSet(null)}
              style={{
                perspective: '1500px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Base card with tilt effect */}
              <div 
                className={`
                  card-content relative h-72 p-5 
                  transform transition-transform duration-200 ease-out
                  ${isHovered ? 'card-tilt' : ''}
                  bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black
                `}
              >
                {/* Holographic overlay effects */}
                <div 
                  className={`
                    absolute inset-0 bg-gradient-to-r ${getSubjectColor(set.subject)}
                    opacity-20 mix-blend-overlay holographic-shimmer transition-opacity duration-300
                    ${isHovered ? 'opacity-40' : 'opacity-20'}
                  `}
                />
                
                {/* Subject icon background */}
                <div className="absolute right-4 top-4 text-4xl opacity-20 blur-sm">
                  {getSubjectIcon(set.subject)}
                </div>
                
                {/* Glare effect on hover */}
                <div 
                  className={`
                    absolute inset-0 bg-gradient-to-tr from-white to-transparent
                    opacity-0 transition-opacity duration-300 pointer-events-none
                    ${isHovered ? 'opacity-10' : ''}
                  `}
                />
                
                {/* Top performance bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-800">
                  <div 
                    className={`h-full ${getPerformanceColor(set.accuracy)}`}
                    style={{ width: `${set.accuracy}%` }}
                  />
                </div>
                
                {/* Content */}
                <div className="relative flex flex-col h-full z-10">
                  <div className="mb-2 flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-white">
                        {set.subject}: {set.type}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {new Date(set.dateCompleted).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {/* Holographic badge */}
                    <div 
                      className={`
                        flex items-center justify-center w-10 h-10 rounded-full 
                        bg-gradient-to-br ${getSubjectColor(set.subject)}
                        shadow-lg transition-transform duration-300
                        ${isHovered ? 'scale-110' : ''}
                      `}
                    >
                      <span className="text-white font-bold">
                        {getSubjectIcon(set.subject)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Metrics section */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-gray-400 text-xs">Accuracy</div>
                      <div className="text-lg text-white font-semibold flex items-end">
                        {set.accuracy}%
                        <span 
                          className={`ml-2 w-2 h-2 rounded-full ${getPerformanceColor(set.accuracy)}`}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-gray-400 text-xs">Time Spent</div>
                      <div className="text-lg text-white font-semibold">
                        {formatTime(set.timeUsed)}
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-gray-400 text-xs">Questions</div>
                      <div className="text-lg text-white font-semibold">
                        {set.questions.length}
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-gray-400 text-xs">Difficulty</div>
                      <div className="text-lg text-white font-semibold">
                        {set.difficulty}
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom holographic line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-30" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <style jsx>{`
        .holographic-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .holographic-shimmer {
          background-size: 200% 200%;
          animation: shimmer 3s ease infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .card-tilt {
          transform: rotateX(var(--rotateX)) rotateY(var(--rotateY));
        }
      `}</style>
    </div>
  )
}
