'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from '../types'

/**
 * Coral Reef Ecosystem View
 * 
 * An underwater-themed visualization that represents practice sets as coral formations
 * in a vibrant reef ecosystem. Features:
 * - Dynamic water surface with gentle wave animation
 * - Bubbles animation for added underwater immersion
 * - Coral formations representing practice sets with different structures based on attributes
 * - Fish and sea creatures swimming through the environment
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null)
  const [bubbles, setBubbles] = useState<Array<{ x: number, y: number, size: number, speed: number }>>([])

  // Generate random bubbles for animation
  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = []
      for (let i = 0; i < 30; i++) {
        newBubbles.push({
          x: Math.random() * 100,
          y: 100 + Math.random() * 20, // Start from below the visible area
          size: Math.random() * 12 + 4,
          speed: Math.random() * 3 + 1
        })
      }
      setBubbles(newBubbles)
    }

    generateBubbles()

    // Animate bubbles rising
    const animationInterval = setInterval(() => {
      setBubbles(prevBubbles => 
        prevBubbles.map(bubble => ({
          ...bubble,
          y: bubble.y - bubble.speed,
          x: bubble.x + (Math.random() * 0.6 - 0.3), // Add slight horizontal drift
          // Reset bubbles that have risen to the top
          ...(bubble.y < -10 ? {
            y: 100 + Math.random() * 20,
            x: Math.random() * 100,
          } : {})
        }))
      )
    }, 100)

    return () => clearInterval(animationInterval)
  }, [])

  // Helper function to get coral type based on set attributes
  const getCoralType = (set: typeof practiceSets[0]) => {
    if (set.questions.length > 25) return 'brain'
    if (set.accuracy > 90) return 'staghorn'
    if (set.difficulty === 'Hard') return 'pillar'
    if (set.subject === 'Math') return 'table'
    if (set.subject === 'Reading') return 'fan'
    return 'soft'
  }

  // Helper function to get color scheme based on subject
  const getSubjectColors = (subject: string, accuracy: number) => {
    // Base colors by subject
    let primary, secondary, accent
    
    if (subject === 'Math') {
      primary = 'from-blue-400 to-cyan-600'
      secondary = 'from-sky-300 to-blue-500'
      accent = 'bg-blue-300'
    } else if (subject === 'Reading') {
      primary = 'from-purple-400 to-fuchsia-600'
      secondary = 'from-fuchsia-300 to-purple-500'
      accent = 'bg-purple-300'
    } else if (subject === 'Writing') {
      primary = 'from-emerald-400 to-teal-600'
      secondary = 'from-green-300 to-emerald-500'
      accent = 'bg-emerald-300'
    } else {
      primary = 'from-orange-400 to-amber-600'
      secondary = 'from-amber-300 to-orange-500'
      accent = 'bg-amber-300'
    }
    
    // Adjust vibrancy based on accuracy
    if (accuracy < 60) {
      return {
        primary: primary.replace('400', '300').replace('600', '500'),
        secondary: secondary.replace('300', '200').replace('500', '400'),
        accent: accent.replace('300', '200'),
        highlight: 'bg-orange-200',
        textColor: 'text-gray-700'
      }
    } else if (accuracy > 85) {
      return {
        primary: primary.replace('400', '500').replace('600', '700'),
        secondary: secondary.replace('300', '400').replace('500', '600'),
        accent: accent.replace('300', '400'),
        highlight: 'bg-green-200',
        textColor: 'text-white'
      }
    }
    
    return {
      primary,
      secondary,
      accent,
      highlight: 'bg-yellow-200',
      textColor: 'text-gray-800'
    }
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-lg overflow-hidden">
      <h3 className="text-xl font-bold mb-6 text-center">Coral Reef Ecosystem View</h3>
      
      {/* Underwater environment */}
      <div className="relative h-[600px] rounded-xl overflow-hidden bg-gradient-to-b from-cyan-600 via-blue-700 to-blue-900">
        {/* Water surface animation */}
        <div className="absolute inset-x-0 top-0 h-16 opacity-70 overflow-hidden">
          <div className="absolute inset-0 bg-cyan-400 water-surface"></div>
          <div className="absolute inset-0 bg-cyan-300 water-surface-alt" style={{ animationDelay: '-2s' }}></div>
        </div>
        
        {/* Sunlight rays from surface */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 -top-10 w-20 h-[120%] bg-gradient-to-b from-cyan-300/40 to-transparent rotate-12 blur-md"></div>
          <div className="absolute right-1/3 -top-10 w-32 h-[120%] bg-gradient-to-b from-cyan-300/30 to-transparent -rotate-12 blur-md"></div>
        </div>
        
        {/* Bubbles */}
        {bubbles.map((bubble, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/40 bg-white/10"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              transition: 'top 0.5s linear, left 0.5s linear',
            }}
          />
        ))}
        
        {/* Seabed */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-amber-800 via-amber-700/70 to-transparent"></div>
        
        {/* Decorative seaweed and rocks */}
        <div className="absolute left-[5%] bottom-0 w-8 h-48 bg-gradient-to-t from-green-800 to-green-600 rounded-full origin-bottom -rotate-6 blur-[1px]"></div>
        <div className="absolute left-[8%] bottom-0 w-6 h-32 bg-gradient-to-t from-green-800 to-green-600 rounded-full origin-bottom rotate-3 blur-[1px]"></div>
        <div className="absolute left-[15%] bottom-0 w-10 h-40 bg-gradient-to-t from-green-800 to-green-600 rounded-full origin-bottom -rotate-12 blur-[1px]"></div>
        
        <div className="absolute right-[10%] bottom-0 w-12 h-24 bg-gradient-to-t from-green-800 to-green-600 rounded-full origin-bottom rotate-6 blur-[1px]"></div>
        <div className="absolute right-[15%] bottom-0 w-8 h-36 bg-gradient-to-t from-green-800 to-green-600 rounded-full origin-bottom -rotate-3 blur-[1px]"></div>
        
        <div className="absolute left-[25%] bottom-0 w-20 h-16 bg-gray-700 rounded-full blur-[1px]"></div>
        <div className="absolute right-[30%] bottom-0 w-24 h-12 bg-gray-800 rounded-full blur-[1px]"></div>
        
        {/* Practice set corals container */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-24 px-6 pb-20">
          {practiceSets.map((set, index) => {
            const isSelected = selectedSetId === set.id
            const isHovered = hoveredSet === set.id
            const coralType = getCoralType(set)
            const colors = getSubjectColors(set.subject, set.accuracy)
            
            return (
              <div
                key={set.id}
                className={`
                  relative group cursor-pointer
                  transition-all duration-500 ease-out
                  ${isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'}
                `}
                onClick={() => onSelectSet(set.id)}
                onMouseEnter={() => setHoveredSet(set.id)}
                onMouseLeave={() => setHoveredSet(null)}
              >
                {/* Base coral structure */}
                <div className={`
                  relative rounded-lg overflow-hidden
                  flex flex-col justify-end
                  h-64
                  transition-all duration-500
                  ${isSelected || isHovered ? 'shadow-lg shadow-cyan-400/20' : ''}
                `}>
                  {/* Coral formation based on type */}
                  {coralType === 'brain' && (
                    <div className="absolute inset-x-0 bottom-0 h-full">
                      <div className={`
                        absolute inset-x-0 bottom-0 rounded-t-[100%] h-3/4
                        bg-gradient-to-t ${colors.primary}
                      `}></div>
                      {/* Brain coral texture */}
                      <div className="absolute inset-0 flex flex-wrap justify-center items-center">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div 
                            key={i}
                            className={`w-10 h-8 m-1 rounded-full ${colors.accent} opacity-50`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {coralType === 'staghorn' && (
                    <div className="absolute inset-x-0 bottom-0 h-full">
                      <div className={`
                        absolute inset-x-0 bottom-0 h-1/4 
                        bg-gradient-to-t ${colors.secondary}
                      `}></div>
                      {/* Staghorn branches */}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div 
                          key={i}
                          className={`
                            absolute bottom-0 w-4 
                            bg-gradient-to-t ${colors.primary}
                            rounded-t-full
                          `}
                          style={{
                            height: `${Math.random() * 30 + 50}%`,
                            left: `${(i + 0.5) * (100 / 8)}%`,
                            transform: `rotate(${Math.random() * 20 - 10}deg)`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                  
                  {coralType === 'pillar' && (
                    <div className="absolute inset-x-0 bottom-0 h-full">
                      <div className={`
                        absolute inset-x-[20%] bottom-0 h-3/4
                        bg-gradient-to-t ${colors.primary}
                        rounded-t-lg
                      `}></div>
                      <div className={`
                        absolute inset-x-[15%] bottom-[10%] h-1/4
                        bg-gradient-to-t ${colors.secondary}
                        rounded-t-lg
                      `}></div>
                      <div className={`
                        absolute inset-x-[30%] bottom-[20%] h-1/3
                        bg-gradient-to-t ${colors.secondary}
                        rounded-t-lg
                      `}></div>
                    </div>
                  )}
                  
                  {coralType === 'table' && (
                    <div className="absolute inset-x-0 bottom-0 h-full">
                      <div className={`
                        absolute inset-x-[40%] bottom-0 h-2/3
                        bg-gradient-to-t ${colors.primary}
                        rounded-md
                      `}></div>
                      <div className={`
                        absolute inset-x-[10%] bottom-[45%] h-8
                        bg-gradient-to-t ${colors.secondary}
                        rounded-md
                      `}></div>
                      <div className={`
                        absolute inset-x-[5%] bottom-[55%] h-6
                        bg-gradient-to-t ${colors.secondary}
                        rounded-md
                      `}></div>
                    </div>
                  )}
                  
                  {coralType === 'fan' && (
                    <div className="absolute inset-x-0 bottom-0 h-full">
                      <div className={`
                        absolute inset-x-[40%] bottom-0 h-1/4
                        bg-gradient-to-t ${colors.primary}
                        rounded-t-md
                      `}></div>
                      <div className={`
                        absolute bottom-[20%] left-[20%] right-[20%] h-1/2
                        bg-gradient-to-t ${colors.secondary}
                        rounded-t-[100%]
                      `}></div>
                    </div>
                  )}
                  
                  {coralType === 'soft' && (
                    <div className="absolute inset-x-0 bottom-0 h-full">
                      <div className={`
                        absolute inset-x-[35%] bottom-0 h-1/3
                        bg-gradient-to-t ${colors.primary}
                        rounded-t-md
                      `}></div>
                      {/* Soft coral tentacles */}
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div 
                          key={i}
                          className={`
                            absolute bottom-[30%] w-3
                            bg-gradient-to-t ${colors.secondary}
                            rounded-full
                          `}
                          style={{
                            height: `${Math.random() * 20 + 20}%`,
                            left: `${10 + (i * 7)}%`,
                            transform: `rotate(${Math.random() * 40 - 20}deg)`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                  
                  {/* Content panel */}
                  <div className="relative z-10 mt-auto backdrop-blur-sm bg-white/10 p-4 border-t border-white/20">
                    <h4 className={`font-bold ${colors.textColor}`}>{set.subject}: {set.type}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <div className="text-xs text-white/80">Accuracy</div>
                        <div className="flex items-center">
                          <div 
                            className={`h-1.5 rounded-full ${colors.highlight}`}
                            style={{ width: `${set.accuracy / 2}px` }}
                          ></div>
                          <span className="ml-2 text-white text-sm">{set.accuracy}%</span>
                        </div>
                      </div>
                      <div className="text-white/80 text-xs">
                        {set.questions.length} Qs
                        <div>{set.difficulty}</div>
                      </div>
                    </div>
                    <div className="text-white/60 text-xs mt-2">
                      {new Date(set.dateCompleted).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {/* Selected state decoration */}
                  {isSelected && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8">
                      <div className="absolute inset-0 bg-cyan-400/50 rounded-full animate-ping"></div>
                      <div className="absolute inset-[25%] bg-white rounded-full"></div>
                    </div>
                  )}
                  
                  {/* Hover fish */}
                  {isHovered && (
                    <div className="absolute top-1/3 left-0 w-8 h-4 animate-fish-swim">
                      <div className={`absolute inset-0 ${colors.accent} rounded-r-full`}></div>
                      <div className="absolute right-0 top-1/2 w-2 h-4 -translate-y-1/2 border-l border-gray-700 border-t-[6px] border-b-[6px] border-r-0 border-t-transparent border-b-transparent"></div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        .water-surface {
          transform: translateX(0);
          animation: wave 8s ease-in-out infinite;
          background: linear-gradient(transparent 40%, rgba(255, 255, 255, 0.4) 60%, transparent);
          height: 200%;
        }
        
        .water-surface-alt {
          transform: translateX(0);
          animation: wave-alt 10s ease-in-out infinite;
          background: linear-gradient(transparent 40%, rgba(255, 255, 255, 0.3) 60%, transparent);
          height: 200%;
        }
        
        @keyframes wave {
          0%, 100% { transform: translateX(0) rotateZ(0deg); }
          50% { transform: translateX(-5%) rotateZ(-1deg); }
        }
        
        @keyframes wave-alt {
          0%, 100% { transform: translateX(0) rotateZ(0.5deg); }
          50% { transform: translateX(5%) rotateZ(0deg); }
        }
        
        @keyframes fish-swim {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-fish-swim {
          animation: fish-swim 3s linear infinite;
        }
      `}</style>
    </div>
  )
}