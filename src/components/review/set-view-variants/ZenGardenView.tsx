'use client'

import React, { useState } from 'react'
import { SetViewProps } from './types'

/**
 * Zen Garden View
 * 
 * A contemplative visualization where practice sets appear as rocks and patterns in sand
 * within a Japanese Zen garden aesthetic.
 * 
 * Primary insight objective: To answer "How does my study material balance help me achieve mindful learning?"
 * 
 * Data-to-visual mapping:
 * - Rock size → Set size/importance (visual weight corresponds to content volume)
 * - Rock placement → Time relationship (position reflects chronological or conceptual proximity)
 * - Sand patterns → Subject connections (ripple patterns show relationships between sets)
 * - Rock texture → Material difficulty (rougher texture = more challenging material)
 * - Plant elements → Growth/mastery indicators (moss and small plants show mastery development)
 * 
 * This visualization enables users to:
 * 1. Understand the balance and harmony of their study materials
 * 2. Recognize patterns and relationships between different content areas
 * 3. Identify areas of focus vs. areas of neglect
 * 4. Appreciate the aesthetic balance of their learning approach
 */
export function ZenGardenView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [hoveredRock, setHoveredRock] = useState<string | null>(null)
  
  // Organize sets by subject (for different sand pattern areas)
  const subjectGroups = practiceSets.reduce((groups, set) => {
    if (!groups[set.subject]) {
      groups[set.subject] = []
    }
    groups[set.subject].push(set)
    return groups
  }, {} as Record<string, typeof practiceSets>)
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">47. Zen Garden View</h3>
      
      <div className="zen-garden relative h-[600px] bg-[#f8f4e8] dark:bg-slate-800 rounded-lg overflow-hidden">
        {/* Garden background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f4e8] to-[#e8e4d8] dark:from-slate-800 dark:to-slate-900"></div>
        
        {/* Sand base */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="opacity-30 dark:opacity-20">
            <pattern id="sandTexture" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0,0 L10,10 M20,0 L30,10 M0,20 L10,30 M20,20 L30,30" stroke="#ccc" strokeWidth="1" fill="none" className="dark:stroke-slate-600" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#sandTexture)" />
          </svg>
        </div>
        
        {/* Garden content */}
        <div className="relative h-full p-6 flex flex-col">
          <div className="flex-1 flex">
            {/* Left zen area (Math) */}
            {subjectGroups['Math'] && (
              <div className="w-1/3 relative">
                <div className="absolute inset-0 overflow-hidden">
                  {/* Sand pattern */}
                  <svg className="w-full h-full">
                    <pattern id="mathPattern" patternUnits="userSpaceOnUse" width="200" height="200">
                      <path 
                        d="M0,100 C50,80 150,120 200,100 M0,50 C50,30 150,70 200,50 M0,150 C50,130 150,170 200,150" 
                        fill="none" 
                        stroke="#d9d3c2" 
                        strokeWidth="3"
                        className="dark:stroke-slate-700"
                      />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#mathPattern)" opacity="0.6" />
                  </svg>
                  
                  {/* Rocks (Math sets) */}
                  {subjectGroups['Math'].map((set, index) => {
                    // Calculate position based on index and accuracy
                    const posX = 20 + ((index % 3) * 30)
                    const posY = 20 + (Math.floor(index / 3) * 30)
                    const size = 35 + (set.questions.length / 2) // Rock size based on question count
                    
                    return (
                      <div 
                        key={set.id}
                        onClick={() => onSelectSet(set.id)}
                        onMouseEnter={() => setHoveredRock(set.id)}
                        onMouseLeave={() => setHoveredRock(null)}
                        className={`absolute rounded-full cursor-pointer transition-all duration-300 overflow-hidden
                          ${selectedSetId === set.id ? 'ring-4 ring-blue-300 dark:ring-blue-500 z-20' : 'z-10'}
                          ${hoveredRock === set.id ? 'shadow-lg scale-105' : 'shadow'}
                        `}
                        style={{
                          left: `${posX}%`,
                          top: `${posY}%`,
                          width: `${size}px`,
                          height: `${size}px`,
                          background: `radial-gradient(circle at ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%, #a3a3a3, #6b7280)`,
                        }}
                      >
                        {/* Moss on top of rock (based on accuracy) */}
                        {set.accuracy > 75 && (
                          <div 
                            className="absolute rounded-full bg-green-200 dark:bg-green-800 opacity-80"
                            style={{
                              width: `${size * 0.7}px`,
                              height: `${size * 0.4}px`,
                              top: `${Math.random() * 5}px`,
                              left: `${Math.random() * 20}px`,
                              transform: `rotate(${Math.random() * 360}deg)`,
                            }}
                          ></div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            
            {/* Center zen area (Reading) */}
            {subjectGroups['Reading'] && (
              <div className="w-1/3 relative">
                <div className="absolute inset-0 overflow-hidden">
                  {/* Sand pattern */}
                  <svg className="w-full h-full">
                    <pattern id="readingPattern" patternUnits="userSpaceOnUse" width="200" height="200">
                      <circle 
                        cx="100" 
                        cy="100" 
                        r="80" 
                        fill="none" 
                        stroke="#d9d3c2" 
                        strokeWidth="2"
                        className="dark:stroke-slate-700"
                      />
                      <circle 
                        cx="100" 
                        cy="100" 
                        r="60" 
                        fill="none" 
                        stroke="#d9d3c2" 
                        strokeWidth="2"
                        className="dark:stroke-slate-700"
                      />
                      <circle 
                        cx="100" 
                        cy="100" 
                        r="40" 
                        fill="none" 
                        stroke="#d9d3c2" 
                        strokeWidth="2"
                        className="dark:stroke-slate-700"
                      />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#readingPattern)" opacity="0.6" />
                  </svg>
                  
                  {/* Rocks (Reading sets) */}
                  {subjectGroups['Reading'].map((set, index) => {
                    // Calculate position in circular pattern
                    const angle = (index / subjectGroups['Reading'].length) * Math.PI * 2
                    const radius = 30 + (set.accuracy / 3) // Higher accuracy = farther from center
                    const posX = 50 + radius * Math.cos(angle)
                    const posY = 50 + radius * Math.sin(angle)
                    const size = 30 + (set.questions.length / 2) // Rock size based on question count
                    
                    return (
                      <div 
                        key={set.id}
                        onClick={() => onSelectSet(set.id)}
                        onMouseEnter={() => setHoveredRock(set.id)}
                        onMouseLeave={() => setHoveredRock(null)}
                        className={`absolute rounded-full cursor-pointer transition-all duration-300 overflow-hidden
                          ${selectedSetId === set.id ? 'ring-4 ring-emerald-300 dark:ring-emerald-500 z-20' : 'z-10'}
                          ${hoveredRock === set.id ? 'shadow-lg scale-105' : 'shadow'}
                        `}
                        style={{
                          left: `${posX}%`,
                          top: `${posY}%`,
                          width: `${size}px`,
                          height: `${size * 0.7}px`,
                          background: `radial-gradient(circle at ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%, #a3a3a3, #4b5563)`,
                        }}
                      >
                        {/* Small plant on rock for high accuracy */}
                        {set.accuracy > 85 && (
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
                            <div className="relative w-1 h-8 bg-green-700 dark:bg-green-600"></div>
                            <div className="absolute top-1 left-0 w-3 h-1 bg-green-700 dark:bg-green-600 transform -rotate-20"></div>
                            <div className="absolute top-3 left-0 w-4 h-1 bg-green-700 dark:bg-green-600 transform -rotate-10"></div>
                            <div className="absolute top-2 right-0 w-3 h-1 bg-green-700 dark:bg-green-600 transform rotate-20"></div>
                            <div className="absolute top-4 right-0 w-2 h-1 bg-green-700 dark:bg-green-600 transform rotate-10"></div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
            
            {/* Right zen area (Writing) */}
            {subjectGroups['Writing'] && (
              <div className="w-1/3 relative">
                <div className="absolute inset-0 overflow-hidden">
                  {/* Sand pattern */}
                  <svg className="w-full h-full">
                    <pattern id="writingPattern" patternUnits="userSpaceOnUse" width="200" height="200">
                      <path 
                        d="M0,0 L200,200 M0,40 L160,200 M40,0 L200,160 M0,80 L120,200 M80,0 L200,120 M0,120 L80,200 M120,0 L200,80 M0,160 L40,200 M160,0 L200,40 M0,200 L200,0" 
                        fill="none" 
                        stroke="#d9d3c2" 
                        strokeWidth="1.5"
                        className="dark:stroke-slate-700"
                      />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#writingPattern)" opacity="0.6" />
                  </svg>
                  
                  {/* Rocks (Writing sets) */}
                  {subjectGroups['Writing'].map((set, index) => {
                    // Calculate positions in a zigzag pattern
                    const row = Math.floor(index / 2)
                    const posX = index % 2 === 0 ? 30 : 60
                    const posY = 20 + row * 25
                    const size = 25 + (set.questions.length / 2) // Rock size based on question count
                    
                    return (
                      <div 
                        key={set.id}
                        onClick={() => onSelectSet(set.id)}
                        onMouseEnter={() => setHoveredRock(set.id)}
                        onMouseLeave={() => setHoveredRock(null)}
                        className={`absolute rounded-sm cursor-pointer transition-all duration-300 overflow-hidden
                          ${selectedSetId === set.id ? 'ring-4 ring-amber-300 dark:ring-amber-500 z-20' : 'z-10'}
                          ${hoveredRock === set.id ? 'shadow-lg scale-105' : 'shadow'}
                        `}
                        style={{
                          left: `${posX}%`,
                          top: `${posY}%`,
                          width: `${size}px`,
                          height: `${size * 1.2}px`,
                          background: `linear-gradient(45deg, #9ca3af, #6b7280)`,
                          transform: `rotate(${(index % 3 - 1) * 15}deg)`,
                        }}
                      >
                        {/* Moss or lichen on rock based on accuracy */}
                        {set.accuracy > 70 && (
                          <div 
                            className="absolute rounded-full bg-green-300 dark:bg-green-700 mix-blend-overlay"
                            style={{
                              width: `${10 + (set.accuracy / 10)}px`,
                              height: `${10 + (set.accuracy / 10)}px`,
                              top: `${Math.random() * size / 2}px`,
                              left: `${Math.random() * size / 2}px`,
                            }}
                          ></div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
          
          {/* Legend and info panel at bottom */}
          <div className="mt-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            {hoveredRock || selectedSetId ? (
              <div className="flex items-start">
                <div className="flex-1">
                  {/* Set details */}
                  {practiceSets.map(set => {
                    if (set.id !== (hoveredRock || selectedSetId)) return null;
                    
                    return (
                      <div key={set.id} className="flex flex-col">
                        <h4 className="font-medium text-lg text-slate-900 dark:text-white">{set.type}</h4>
                        <div className="flex items-center mt-1">
                          <div className={`w-3 h-3 rounded-full mr-2 ${
                            set.subject === 'Math' ? 'bg-blue-500' : 
                            set.subject === 'Reading' ? 'bg-emerald-500' : 
                            'bg-amber-500'
                          }`}></div>
                          <span className="text-slate-600 dark:text-slate-300">{set.subject}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                            <div className="font-medium">{set.accuracy}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Questions</div>
                            <div className="font-medium">{set.questions.length}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Difficulty</div>
                            <div className="font-medium">{set.difficulty}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="max-w-[200px] text-sm ml-4 py-1 px-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <div className="font-medium mb-1 text-slate-900 dark:text-white">Zen Garden Elements</div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">
                    Rocks represent study sets. Their size, shape, and arrangement reflect their importance in your learning journey.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start text-sm">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Mathematics - Linear Patterns</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                    <span>Reading - Circular Patterns</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span>Writing - Angular Patterns</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium mb-1">Contemplative Learning</div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs max-w-[300px]">
                    This Zen garden represents your learning journey. Each rock is a practice set; 
                    its size, position, and surrounding patterns reflect its role in your knowledge landscape.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}