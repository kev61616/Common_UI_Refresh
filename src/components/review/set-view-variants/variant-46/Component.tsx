'use client'

import React, { useState } from 'react'
import { SetViewProps } from '../../set-view-variants/types'

/**
 * Constellation Map View
 * 
 * A space-themed visualization that represents study sets as constellations:
 * - Each set is visualized as a constellation of stars
 * - Stars represent questions and are connected by lines
 * - Brightness/size of stars reflects accuracy and mastery
 * - Interactive hover animations and cosmic theme
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null)
  
  // Group sets by subject for organization
  const setsBySubject: Record<string, typeof practiceSets> = {}
  
  practiceSets.forEach(set => {
    if (!setsBySubject[set.subject]) {
      setsBySubject[set.subject] = []
    }
    setsBySubject[set.subject].push(set)
  })
  
  // Get subject-specific color scheme
  const getSubjectColors = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          primary: 'text-blue-500 dark:text-blue-400',
          secondary: 'text-cyan-400 dark:text-cyan-300',
          accent: 'bg-blue-400 dark:bg-blue-500',
          border: 'border-blue-400/50 dark:border-blue-600/50',
          glow: 'shadow-blue-500/20 dark:shadow-blue-400/40',
          region: 'from-blue-900/10 to-blue-900/0 dark:from-blue-500/20 dark:to-blue-800/0'
        }
      case 'Reading':
        return {
          primary: 'text-green-500 dark:text-green-400',
          secondary: 'text-emerald-400 dark:text-emerald-300',
          accent: 'bg-green-400 dark:bg-green-500',
          border: 'border-green-400/50 dark:border-green-600/50',
          glow: 'shadow-green-500/20 dark:shadow-green-400/40',
          region: 'from-green-900/10 to-green-900/0 dark:from-green-500/20 dark:to-green-800/0'
        }
      case 'Writing':
        return {
          primary: 'text-purple-500 dark:text-purple-400',
          secondary: 'text-violet-400 dark:text-violet-300',
          accent: 'bg-purple-400 dark:bg-purple-500',
          border: 'border-purple-400/50 dark:border-purple-600/50',
          glow: 'shadow-purple-500/20 dark:shadow-purple-400/40',
          region: 'from-purple-900/10 to-purple-900/0 dark:from-purple-500/20 dark:to-purple-800/0'
        }
      default:
        return {
          primary: 'text-gray-500 dark:text-gray-400',
          secondary: 'text-gray-400 dark:text-gray-300',
          accent: 'bg-gray-400 dark:bg-gray-500',
          border: 'border-gray-400/50 dark:border-gray-600/50',
          glow: 'shadow-gray-500/20 dark:shadow-gray-400/40',
          region: 'from-gray-900/10 to-gray-900/0 dark:from-gray-500/20 dark:to-gray-800/0'
        }
    }
  }
  
  // Define types for constellation points and lines
  interface ConstellationPoint {
    x: number;
    y: number;
    size: number;
    brightness: number;
    question: any; // Using 'any' here as we're just passing through the question object
  }
  
  interface ConstellationLine {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
  }
  
  // Generate random but fixed constellation pattern points for a set
  const getConstellationPoints = (set: typeof practiceSets[0], areaWidth: number, areaHeight: number) => {
    // Use set ID as seed for deterministic randomness
    const seed = set.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    // Simple pseudo-random generator with seed
    const seededRandom = (min: number, max: number, offset = 0) => {
      const randomValue = Math.sin(seed + offset) * 10000
      return min + (randomValue - Math.floor(randomValue)) * (max - min)
    }
    
    // Calculate center point of the constellation based on set ID
    const centerX = areaWidth / 2 + seededRandom(-areaWidth / 4, areaWidth / 4, 0)
    const centerY = areaHeight / 2 + seededRandom(-areaHeight / 4, areaHeight / 4, 1)
    
    // Generate points for each question in a pattern around the center
    const points: ConstellationPoint[] = set.questions.map((question, i) => {
      const angle = seededRandom(0, Math.PI * 2, i * 2)
      const distance = seededRandom(30, 100, i * 2 + 1)
      
      return {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        size: question.correct ? 4 : 2, // Larger stars for correct answers
        brightness: question.correct ? 1 : 0.6, // Brighter stars for correct answers
        question
      }
    })
    
    // Add connecting lines between stars (questions)
    const lines: ConstellationLine[] = []
    
    // Connect stars in sequential pairs based on topic
    const pointsByTopic: Record<string, typeof points> = {}
    points.forEach(point => {
      const topic = point.question.topic
      if (!pointsByTopic[topic]) {
        pointsByTopic[topic] = []
      }
      pointsByTopic[topic].push(point)
    })
    
    // Create connecting lines within each topic
    Object.values(pointsByTopic).forEach(topicPoints => {
      if (topicPoints.length > 1) {
        for (let i = 0; i < topicPoints.length - 1; i++) {
          lines.push({
            x1: topicPoints[i].x,
            y1: topicPoints[i].y,
            x2: topicPoints[i + 1].x,
            y2: topicPoints[i + 1].y,
            opacity: 0.3
          })
        }
        
        // Connect the last point to the first to complete the constellation
        if (topicPoints.length > 2) {
          lines.push({
            x1: topicPoints[topicPoints.length - 1].x,
            y1: topicPoints[topicPoints.length - 1].y,
            x2: topicPoints[0].x,
            y2: topicPoints[0].y,
            opacity: 0.2
          })
        }
      }
    })
    
    return { centerX, centerY, points, lines }
  }
  
  // Format accuracy as star rating
  const formatStarRating = (accuracy: number) => {
    const fullStars = Math.floor(accuracy / 20)
    const hasHalfStar = (accuracy % 20) >= 10
    
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return (
              <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )
          } else if (i === fullStars && hasHalfStar) {
            return (
              <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <defs>
                  <linearGradient id={`halfStar-${accuracy}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="#CBD5E1" />
                  </linearGradient>
                </defs>
                <path fill={`url(#halfStar-${accuracy})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )
          } else {
            return (
              <svg key={i} className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )
          }
        })}
      </div>
    )
  }
  
  // Extract distinct topics from all sets
  const getAllTopics = () => {
    const topics = new Set<string>()
    practiceSets.forEach(set => 
      set.questions.forEach(q => topics.add(q.topic))
    )
    return Array.from(topics)
  }
  
  // Get random color for topic
  const getTopicColor = (topic: string) => {
    // Generate color based on string hash
    const hash = topic.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0)
    const hue = Math.abs(hash) % 360
    return `hsl(${hue}, 70%, 60%)`
  }
  
  return (
    <div className="bg-gray-950 text-white h-full overflow-auto p-6">
      {/* Background "stars" */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static star field */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '15px 15px'
          }}
        ></div>
        
        {/* Small twinkling stars */}
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite ${Math.random() * 5}s`
            }}
          ></div>
        ))}
        
        {/* Larger colorful stars */}
        {[...Array(15)].map((_, i) => {
          const colors = ['bg-blue-400', 'bg-yellow-300', 'bg-red-400', 'bg-purple-400', 'bg-green-400']
          return (
            <div 
              key={i + 'large'}
              className={`absolute rounded-full ${colors[Math.floor(Math.random() * colors.length)]}`}
              style={{
                width: Math.random() * 3 + 2 + 'px',
                height: Math.random() * 3 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.6 + 0.4,
                boxShadow: `0 0 3px currentColor, 0 0 6px currentColor`,
                animation: `twinkle ${Math.random() * 7 + 4}s ease-in-out infinite ${Math.random() * 5}s`
              }}
            ></div>
          )
        })}
        
        {/* Nebula/cosmic clouds */}
        <div 
          className="absolute opacity-10 dark:opacity-15"
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(138, 43, 226, 0.4), transparent 50%), radial-gradient(circle at 30% 70%, rgba(0, 191, 255, 0.4), transparent 50%)',
            filter: 'blur(40px)'
          }}
        ></div>
      </div>
      
      {/* Main content area */}
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-mono">
            <span className="text-blue-400">★</span> Constellation Map <span className="text-blue-400">★</span>
          </h2>
          
          {/* Legend for star types */}
          <div className="flex space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-white shadow-white/60 mr-2"></div>
              <span className="text-sm text-gray-300">Correct Answer</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-white opacity-60 mr-2"></div>
              <span className="text-sm text-gray-300">Incorrect Answer</span>
            </div>
          </div>
        </div>
        
        {/* Galaxy regions by subject */}
        <div className="space-y-10">
          {Object.entries(setsBySubject).map(([subject, sets]) => {
            const colors = getSubjectColors(subject)
            
            return (
              <div key={subject} className="relative">
                {/* Subject header */}
                <div className="mb-4">
                  <h3 className={`text-xl font-mono ${colors.primary} border-b border-current pb-1`}>
                    {subject} Galaxy Region
                  </h3>
                </div>
                
                {/* Galaxy region background */}
                <div 
                  className={`absolute inset-0 -m-6 rounded-xl bg-gradient-to-b ${colors.region} -z-10`}
                ></div>
                
                {/* Constellation sets grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {sets.map(set => {
                    const isSelected = set.id === selectedSetId
                    const isHovered = set.id === hoveredSetId
                    const constellationHeight = 240
                    const constellationWidth = 320
                    
                    // Get constellation points
                    const { centerX, centerY, points, lines } = getConstellationPoints(
                      set, 
                      constellationWidth, 
                      constellationHeight
                    )
                    
                    return (
                      <div 
                        key={set.id}
                        className={`
                          relative overflow-hidden bg-gray-950/70 border backdrop-blur-sm
                          rounded-lg transition-all duration-300 cursor-pointer
                          ${colors.border} ${colors.glow}
                          ${isSelected ? 'shadow-lg scale-105 border-opacity-100' : 'border-opacity-40 shadow'}
                          ${isHovered && !isSelected ? 'shadow-md scale-[1.02]' : ''}
                        `}
                        style={{ boxShadow: isSelected ? `0 0 30px -10px currentColor` : '' }}
                        onClick={() => onSelectSet(set.id)}
                        onMouseEnter={() => setHoveredSetId(set.id)}
                        onMouseLeave={() => setHoveredSetId(null)}
                      >
                        {/* Visualization area */}
                        <div 
                          className="relative h-60 overflow-hidden"
                          style={{ background: 'radial-gradient(circle at center, rgba(20, 24, 40, 0.7) 0%, rgba(10, 12, 24, 0.9) 100%)' }}
                        >
                          {/* Center name of the constellation */}
                          <div 
                            className={`absolute font-mono ${colors.secondary} text-opacity-70 text-xs`}
                            style={{ 
                              left: centerX, 
                              top: centerY + 10, 
                              transform: 'translate(-50%, 0)',
                              textShadow: '0 0 4px currentColor'
                            }}
                          >
                            {set.type.toUpperCase()}
                          </div>
                          
                          {/* Constellation lines */}
                          <svg className="absolute inset-0 w-full h-full">
                            {lines.map((line, i) => (
                              <line 
                                key={i}
                                x1={line.x1} 
                                y1={line.y1} 
                                x2={line.x2} 
                                y2={line.y2} 
                                stroke="currentColor" 
                                className={colors.secondary}
                                strokeWidth="1" 
                                strokeOpacity={line.opacity}
                                strokeDasharray={isSelected || isHovered ? "0" : "3,3"}
                              />
                            ))}
                          </svg>
                          
                          {/* Stars (questions) */}
                          {points.map((point, i) => (
                            <div 
                              key={i}
                              className={`
                                absolute rounded-full bg-white transition-all duration-300
                                ${isHovered ? 'animate-pulse' : ''}
                              `}
                              style={{ 
                                left: point.x, 
                                top: point.y,
                                width: point.size + (isHovered ? 1 : 0) + 'px',
                                height: point.size + (isHovered ? 1 : 0) + 'px',
                                opacity: point.brightness,
                                transform: 'translate(-50%, -50%)',
                                boxShadow: `0 0 ${point.size}px rgba(255, 255, 255, ${point.brightness / 2})`
                              }}
                            >
                              {/* Star tooltip on hover */}
                              {isHovered && (
                                <div 
                                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full w-32 p-1 bg-gray-900 text-white text-xs rounded border border-gray-700 opacity-0 group-hover:opacity-100 pointer-events-none"
                                  style={{
                                    marginTop: '-8px',
                                    zIndex: 10,
                                    display: 'none' // Hidden for now to avoid clutter
                                  }}
                                >
                                  {point.question.topic}
                                </div>
                              )}
                            </div>
                          ))}
                          
                          {/* Interactive hover effects */}
                          {isHovered && (
                            <div 
                              className="absolute w-20 h-20 rounded-full pointer-events-none opacity-10"
                              style={{
                                background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
                                left: centerX,
                                top: centerY,
                                transform: 'translate(-50%, -50%)'
                              }}
                            ></div>
                          )}
                          
                          {/* Selection indicator */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-white text-gray-900 rounded-full px-2 py-0.5 text-xs font-bold">
                              Selected
                            </div>
                          )}
                        </div>
                        
                        {/* Constellation info card */}
                        <div className="p-4">
                          {/* Set title and stats */}
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h4 className={`font-mono font-bold ${colors.primary}`}>{set.type}</h4>
                              <div className="text-xs text-gray-400">
                                {set.questions.length} {set.questions.length === 1 ? 'star' : 'stars'} • {set.difficulty}
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              {formatStarRating(set.accuracy)}
                              <div className="text-xs text-gray-400 mt-1">
                                {Math.round(set.accuracy)}% Accuracy
                              </div>
                            </div>
                          </div>
                          
                          {/* Completion percentage */}
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>Progress</span>
                              <span>
                                {set.questions.filter(q => q.answered).length}/{set.questions.length}
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${colors.accent}`} 
                                style={{ 
                                  width: `${(set.questions.filter(q => q.answered).length / set.questions.length) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
