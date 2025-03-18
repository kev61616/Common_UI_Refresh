'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from '../types'

/**
 * Celestial Observatory View
 * 
 * A cosmic-themed visualization that presents practice sets as celestial bodies
 * within an observatory dome. Features:
 * - Interactive star field background with parallax effect
 * - Practice sets represented as planets and stars
 * - Subject-specific color theming with cosmic gradients
 * - Orbital paths and movement for an immersive experience
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null)
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([])

  // Generate random stars for the background
  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 0.2 + 0.1,
          opacity: Math.random() * 0.5 + 0.3
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  // Helper function to get celestial body type based on set attributes
  const getCelestialBodyType = (set: typeof practiceSets[0]) => {
    if (set.difficulty === 'Hard') return 'planet'
    if (set.questions.length > 20) return 'star'
    if (set.accuracy > 85) return 'comet'
    return 'asteroid'
  }

  // Helper function to get color scheme based on subject
  const getSubjectColors = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          primary: 'from-blue-600 to-indigo-900',
          secondary: 'from-cyan-400 to-blue-600',
          ring: 'from-blue-400/30 via-indigo-500/20 to-purple-500/30',
          text: 'text-blue-200',
          accent: 'bg-blue-400'
        }
      case 'Reading':
        return {
          primary: 'from-purple-600 to-indigo-900',
          secondary: 'from-fuchsia-400 to-purple-600',
          ring: 'from-fuchsia-400/30 via-purple-500/20 to-indigo-500/30',
          text: 'text-purple-200',
          accent: 'bg-purple-400'
        }
      case 'Writing':
        return {
          primary: 'from-emerald-600 to-teal-900',
          secondary: 'from-green-400 to-emerald-600',
          ring: 'from-green-400/30 via-emerald-500/20 to-teal-500/30',
          text: 'text-emerald-200',
          accent: 'bg-emerald-400'
        }
      default:
        return {
          primary: 'from-gray-600 to-gray-900',
          secondary: 'from-gray-400 to-gray-600',
          ring: 'from-gray-400/30 via-gray-500/20 to-gray-500/30',
          text: 'text-gray-200',
          accent: 'bg-gray-400'
        }
    }
  }

  // Helper function to get animation delay based on set index
  const getAnimationDelay = (index: number) => {
    return `${index * 2}s`
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-lg overflow-hidden">
      <h3 className="text-xl font-bold mb-6 text-center">Celestial Observatory View</h3>
      
      {/* Observatory dome */}
      <div className="relative rounded-t-[180px] rounded-b-xl h-[600px] overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 p-8">
        {/* Star background */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}rem`,
                height: `${star.size}rem`,
                opacity: star.opacity,
                animationDelay: `${i % 5}s`
              }}
            />
          ))}
          
          {/* Nebula effects */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-purple-700/10 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-blue-700/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-emerald-700/10 blur-3xl" />
        </div>
        
        {/* Observatory dome structure */}
        <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-slate-700 to-transparent" />
        <div className="absolute inset-x-[10%] top-0 h-[1px] bg-slate-600/50" />
        <div className="absolute inset-y-0 left-[10%] w-[1px] bg-slate-600/30" />
        <div className="absolute inset-y-0 right-[10%] w-[1px] bg-slate-600/30" />
        <div className="absolute inset-x-[20%] top-[5%] h-[1px] bg-slate-600/20" />
        <div className="absolute inset-x-[30%] top-[15%] h-[1px] bg-slate-600/20" />
        
        {/* Celestial bodies container */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
          {practiceSets.map((set, index) => {
            const isSelected = selectedSetId === set.id
            const isHovered = hoveredSet === set.id
            const celestialType = getCelestialBodyType(set)
            const colors = getSubjectColors(set.subject)
            const animationDelay = getAnimationDelay(index)
            
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
                {/* Orbit rings */}
                {(isSelected || isHovered) && (
                  <>
                    <div className={`absolute -inset-6 rounded-full border border-slate-500/20 animate-spin-slow`} style={{ animationDuration: '60s' }} />
                    <div className={`absolute -inset-12 rounded-full border border-slate-500/15 animate-spin-slow-reverse`} style={{ animationDuration: '120s' }} />
                    <div className={`absolute -inset-16 rounded-full border border-slate-500/10 animate-spin-slow`} style={{ animationDuration: '180s' }} />
                  </>
                )}
                
                {/* Celestial body */}
                <div className={`
                  relative aspect-square rounded-full overflow-hidden p-4
                  flex flex-col items-center justify-center text-center
                  transition-all duration-500 ease-out shadow-xl
                  bg-gradient-to-br ${colors.primary}
                  ${isSelected || isHovered ? 'shadow-lg shadow-indigo-500/20' : ''}
                `}>
                  {/* Glow effect */}
                  <div className={`
                    absolute inset-0 opacity-70 mix-blend-soft-light
                    bg-gradient-to-br ${colors.secondary}
                  `} />
                  
                  {/* Rings for planets */}
                  {celestialType === 'planet' && (
                    <div className={`
                      absolute -inset-3 opacity-40 rounded-full
                      bg-gradient-to-r ${colors.ring}
                      blur-md z-0 transform -rotate-12 scale-[0.7]
                    `} />
                  )}
                  
                  {/* Comet tail */}
                  {celestialType === 'comet' && (
                    <div className={`
                      absolute -right-24 top-1/2 w-32 h-8 -translate-y-1/2
                      bg-gradient-to-l ${colors.ring} blur-md
                      animate-pulse
                    `} />
                  )}
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Subject icon */}
                    <div className={`w-12 h-12 rounded-full ${colors.accent} bg-opacity-30 flex items-center justify-center mb-2`}>
                      {set.subject === 'Math' ? (
                        <span className="text-white text-lg">∑</span>
                      ) : set.subject === 'Reading' ? (
                        <span className="text-white text-lg">📚</span>
                      ) : (
                        <span className="text-white text-lg">✏️</span>
                      )}
                    </div>
                    
                    {/* Set info */}
                    <h4 className="text-white font-bold">{set.type}</h4>
                    <p className={`text-xs ${colors.text} mt-1 mb-2`}>{set.difficulty} • {set.questions.length} questions</p>
                    
                    {/* Accuracy gauge */}
                    <div className="w-full max-w-[80%] h-1.5 bg-slate-700/50 rounded-full overflow-hidden mt-2">
                      <div 
                        className={`h-full ${colors.accent}`}
                        style={{ width: `${set.accuracy}%` }}
                      />
                    </div>
                    <p className={`text-xs ${colors.text} mt-1`}>{set.accuracy}% accuracy</p>
                    
                    {/* Date */}
                    <p className="text-slate-400 text-xs mt-2">
                      {new Date(set.dateCompleted).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}
              </div>
            )
          })}
        </div>
        
        {/* Observatory base */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-800/70 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-600" />
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.7; }
        }
        
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 120s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 120s linear infinite;
        }
      `}</style>
    </div>
  )
}