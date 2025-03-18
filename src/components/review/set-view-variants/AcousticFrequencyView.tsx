'use client'

import React, { useState } from 'react'
import { SetViewProps } from './types'

/**
 * Acoustic Frequency View
 * 
 * A sound-inspired visualization representing practice sets as audio frequencies
 * and waveforms with musical metaphors.
 * 
 * Primary insight objective: To answer "How do my learning patterns create rhythm and harmony?"
 * 
 * Data-to-visual mapping:
 * - Waveform amplitude → Set performance (higher amplitude = better performance)
 * - Frequency spectrum → Question difficulty distribution (lower frequencies = easier questions)
 * - Wave complexity → Set complexity (more oscillations = more complex material)
 * - Harmonic patterns → Subject relationships (aligned waves show connected concepts)
 * - Color spectrum → Subject domain (using color to indicate different subjects)
 * 
 * This visualization enables users to:
 * 1. Discover rhythms and patterns in their practice performance
 * 2. Identify harmonic and dissonant relationships between content areas
 * 3. Recognize frequency ranges where they perform best
 * 4. See their learning as a continuous musical composition
 */
export function AcousticFrequencyView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredSet, setHoveredSet] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'waveform' | 'frequency'>('waveform')
  
  // Generate waveform points based on practice set data
  const generateWaveform = (set: typeof practiceSets[0], width: number, height: number) => {
    const points: { x: number, y: number }[] = []
    const questionCount = set.questions.length
    
    // Create amplitude based on accuracy
    const baseAmplitude = (height / 2) * (set.accuracy / 100)
    
    // Create frequency based on question count and difficulty
    const frequencyFactor = set.difficulty === 'Hard' ? 8 : 
                           set.difficulty === 'Medium' ? 5 : 3
    
    // Generate points
    for (let i = 0; i < width; i++) {
      const x = i
      
      // Create complex wave by combining multiple frequencies
      let y = Math.sin(i / (width / (questionCount * frequencyFactor))) * baseAmplitude
      
      // Add complexity based on question difficulty
      if (set.difficulty === 'Medium' || set.difficulty === 'Hard') {
        y += Math.sin(i / (width / (questionCount * frequencyFactor * 2))) * (baseAmplitude * 0.3)
      }
      
      // Add more complexity for hard questions
      if (set.difficulty === 'Hard') {
        y += Math.sin(i / (width / (questionCount * frequencyFactor * 4))) * (baseAmplitude * 0.15)
      }
      
      // Center the waveform
      y = height / 2 - y
      
      points.push({ x, y })
    }
    
    return points
  }
  
  // Generate frequency bars based on practice set data
  const generateFrequencyBars = (set: typeof practiceSets[0], barCount: number) => {
    const bars: number[] = []
    
    // Create frequency distribution
    for (let i = 0; i < barCount; i++) {
      // Base height on accuracy and random variation
      const baseHeight = (set.accuracy / 100) * 0.7
      
      // Different frequency patterns based on subject
      let height
      if (set.subject === 'Math') {
        // Math has stronger mid-range frequencies
        const midPoint = barCount / 2
        const distanceFromMid = Math.abs(i - midPoint) / midPoint
        height = baseHeight * (1 - distanceFromMid * 0.7) + (Math.random() * 0.2)
      } else if (set.subject === 'Reading') {
        // Reading has stronger low frequencies
        const position = i / barCount
        height = baseHeight * (1 - position * 0.6) + (Math.random() * 0.2)
      } else {
        // Writing has more evenly distributed frequencies
        height = baseHeight * (0.7 + Math.random() * 0.5)
      }
      
      // Apply difficulty factor
      if (set.difficulty === 'Hard') {
        // Hard questions create more high-frequency content
        const position = i / barCount
        height *= (0.8 + position * 0.4)
      } else if (set.difficulty === 'Easy') {
        // Easy questions create more low-frequency content
        const position = i / barCount
        height *= (1.2 - position * 0.4)
      }
      
      // Store normalized height (0-1)
      bars.push(Math.min(1, Math.max(0.05, height)))
    }
    
    return bars
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">48. Acoustic Frequency View</h3>
      
      {/* Tab switcher */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'waveform' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('waveform')}
          >
            Waveform View
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'frequency' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            onClick={() => setActiveTab('frequency')}
          >
            Frequency Spectrum
          </button>
        </div>
      </div>
      
      {/* View container */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 relative overflow-hidden min-h-[500px]">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-4 gap-0">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-r border-slate-200 dark:border-slate-800 h-full"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-4 gap-0">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-b border-slate-200 dark:border-slate-800 w-full"></div>
          ))}
        </div>
        
        {/* Waveform View */}
        {activeTab === 'waveform' && (
          <div className="relative z-10 space-y-10">
            <div className="text-center mb-6">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Study patterns visualized as sound waves. Amplitude shows performance, complexity shows difficulty.
              </p>
            </div>
            
            {practiceSets.map((set, index) => {
              const isActive = selectedSetId === set.id || hoveredSet === set.id
              const waveHeight = 80 // Height of each waveform
              const wavePoints = generateWaveform(set, 1000, waveHeight)
              
              // Generate SVG path for waveform
              const path = wavePoints.map((p, i) => 
                `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`
              ).join(' ')
              
              // Dynamic colors based on subject
              const getSubjectColor = (subject: string) => {
                switch (subject) {
                  case 'Math': return {
                    stroke: isActive ? '#3b82f6' : '#93c5fd',
                    fill: isActive ? 'url(#mathGradient)' : 'url(#mathGradientLight)'
                  }
                  case 'Reading': return {
                    stroke: isActive ? '#10b981' : '#6ee7b7',
                    fill: isActive ? 'url(#readingGradient)' : 'url(#readingGradientLight)'
                  }
                  default: return {
                    stroke: isActive ? '#f59e0b' : '#fcd34d',
                    fill: isActive ? 'url(#writingGradient)' : 'url(#writingGradientLight)'
                  }
                }
              }
              
              const colors = getSubjectColor(set.subject)
              
              return (
                <div 
                  key={set.id}
                  className={`transition-all duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}
                >
                  <div 
                    className={`mb-1 flex justify-between transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        set.subject === 'Math' ? 'bg-blue-500' : 
                        set.subject === 'Reading' ? 'bg-emerald-500' : 
                        'bg-amber-500'
                      }`}></div>
                      <span className="font-medium text-sm">{set.subject}: {set.type}</span>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {set.accuracy}% accuracy
                    </div>
                  </div>
                  
                  <div 
                    className="relative border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-md"
                    style={{ height: `${waveHeight}px` }}
                    onClick={() => onSelectSet(set.id)}
                    onMouseEnter={() => setHoveredSet(set.id)}
                    onMouseLeave={() => setHoveredSet(null)}
                  >
                    <svg width="100%" height="100%" preserveAspectRatio="none">
                      {/* Gradient definitions */}
                      <defs>
                        <linearGradient id="mathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="mathGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.02" />
                        </linearGradient>
                        
                        <linearGradient id="readingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="readingGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.02" />
                        </linearGradient>
                        
                        <linearGradient id="writingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="writingGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                      
                      {/* Center line */}
                      <line 
                        x1="0" 
                        y1={waveHeight / 2} 
                        x2="100%" 
                        y2={waveHeight / 2} 
                        stroke="#e5e7eb" 
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        className="dark:stroke-slate-700"
                      />
                      
                      {/* Waveform path */}
                      <path 
                        d={path} 
                        fill="none" 
                        stroke={colors.stroke} 
                        strokeWidth={isActive ? 2 : 1.5} 
                        className="transition-all duration-300"
                      />
                      
                      {/* Fill area under the curve */}
                      <path 
                        d={`${path} L1000,${waveHeight} L0,${waveHeight} Z`} 
                        fill={colors.fill}
                        className="transition-all duration-300"
                      />
                    </svg>
                    
                    {/* Difficulty indicator */}
                    <div className="absolute top-2 right-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        set.difficulty === 'Easy' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : set.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {set.difficulty}
                      </span>
                    </div>
                    
                    {/* Time position indicator */}
                    <div className="absolute bottom-2 left-2 text-xs text-slate-500 dark:text-slate-400">
                      {new Date(set.dateCompleted).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        
        {/* Frequency Spectrum View */}
        {activeTab === 'frequency' && (
          <div className="relative z-10">
            <div className="text-center mb-6">
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Study patterns visualized as frequency spectrums. Higher frequencies represent more complex content.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practiceSets.map((set, index) => {
                const isActive = selectedSetId === set.id || hoveredSet === set.id
                const barCount = 32 // Number of frequency bars
                const barHeights = generateFrequencyBars(set, barCount)
                const maxBarHeight = 120 // Maximum bar height in pixels
                
                // Get color based on subject
                const getBarColor = (subject: string) => {
                  switch (subject) {
                    case 'Math': return isActive ? 'bg-blue-500' : 'bg-blue-400'
                    case 'Reading': return isActive ? 'bg-emerald-500' : 'bg-emerald-400'
                    default: return isActive ? 'bg-amber-500' : 'bg-amber-400'
                  }
                }
                
                const barColor = getBarColor(set.subject)
                
                return (
                  <div 
                    key={set.id}
                    className={`transition-all duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}
                  >
                    <div 
                      className={`mb-2 flex justify-between transition-opacity ${isActive ? 'opacity-100' : 'opacity-70'}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          set.subject === 'Math' ? 'bg-blue-500' : 
                          set.subject === 'Reading' ? 'bg-emerald-500' : 
                          'bg-amber-500'
                        }`}></div>
                        <span className="font-medium text-sm">{set.subject}: {set.type}</span>
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {set.accuracy}% accuracy
                      </div>
                    </div>
                    
                    <div 
                      className="p-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg cursor-pointer hover:shadow-md transition-all duration-300"
                      onClick={() => onSelectSet(set.id)}
                      onMouseEnter={() => setHoveredSet(set.id)}
                      onMouseLeave={() => setHoveredSet(null)}
                    >
                      {/* Frequency analyzer mockup */}
                      <div className="relative h-32">
                        {/* Background grid */}
                        <div className="absolute inset-0 grid grid-rows-4 gap-0">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="border-b border-slate-100 dark:border-slate-700 w-full"></div>
                          ))}
                        </div>
                        
                        {/* Frequency labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400 dark:text-slate-500 px-1">
                          <span>20Hz</span>
                          <span>100Hz</span>
                          <span>1kHz</span>
                          <span>10kHz</span>
                          <span>20kHz</span>
                        </div>
                        
                        {/* Frequency bars */}
                        <div className="absolute inset-0 flex items-end justify-between pt-4 pb-6">
                          {barHeights.map((height, i) => (
                            <div
                              key={i}
                              className={`w-1.5 ${barColor} transition-all duration-300 rounded-t-sm`}
                              style={{ 
                                height: `${height * maxBarHeight}px`,
                                opacity: isActive ? 0.9 : 0.6
                              }}
                            ></div>
                          ))}
                        </div>
                        
                        {/* Difficulty indicator */}
                        <div className="absolute top-1 right-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            set.difficulty === 'Easy' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                              : set.difficulty === 'Medium'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}>
                            {set.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      {/* Additional stats */}
                      <div className="mt-2 flex justify-between border-t border-slate-100 dark:border-slate-700 pt-2 text-xs text-slate-500 dark:text-slate-400">
                        <div>Questions: {set.questions.length}</div>
                        <div>Time: {set.timeUsed}s</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom info bar */}
      <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 mr-3 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-700 dark:text-slate-300">
              <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
              <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
            </svg>
          </div>
          <div>
            <div className="font-medium">Acoustic Learning Patterns</div>
            <div className="text-slate-500 dark:text-slate-400 text-xs">
              Switch views to explore your study patterns as sound waves or frequency spectrums
            </div>
          </div>
        </div>
        <div className="pr-2">
          <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-medium">
            {practiceSets.length} sets
          </span>
        </div>
      </div>
    </div>
  )
}