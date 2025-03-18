'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from './types'

export function QuantumPhysicsView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  
  // Add wave animation effect
  const [wavePhase, setWavePhase] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePhase((prev) => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  if (!practiceSets || practiceSets.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-center">55. Quantum Physics View</h3>
        <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <p className="mb-4">No practice sets available.</p>
          <p>Complete some sets to see this visualization.</p>
        </div>
      </div>
    )
  }

  // Filter sets based on active filter
  const filteredSets = activeFilter === 'all' 
    ? practiceSets 
    : practiceSets.filter(set => set.subject === activeFilter)

  // Calculate position for each quantum particle using a grid-like layout
  const calculatePositions = (sets: typeof practiceSets) => {
    return sets.map((set, index) => {
      const row = Math.floor(index / 4)
      const col = index % 4
      return {
        set,
        x: 25 + col * 180,
        y: 150 + row * 190,
        radius: 30 + (set.accuracy / 100) * 20, // Size varies by accuracy
        energy: set.accuracy / 100 // Energy level based on accuracy
      }
    })
  }

  const particlesData = calculatePositions(filteredSets)

  // Generate wave pattern SVG path
  const generateWavePath = (x: number, y: number, radius: number, energy: number) => {
    const points = []
    const pointCount = 12
    const waveHeight = 10 + energy * 20
    
    for (let i = 0; i <= pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2
      const waveOffset = Math.sin((angle * 3) + (wavePhase / 15)) * waveHeight
      const distance = radius + waveOffset
      const px = x + Math.cos(angle) * distance
      const py = y + Math.sin(angle) * distance
      
      if (i === 0) {
        points.push(`M ${px} ${py}`)
      } else {
        points.push(`L ${px} ${py}`)
      }
    }
    
    points.push('Z') // Close the path
    return points.join(' ')
  }

  // Generate probability field gradient
  const generateGradientId = (setId: string) => `quantum-gradient-${setId.replace(/\W/g, '')}`

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm overflow-hidden">
      <h3 className="text-xl font-bold mb-6 text-center">55. Quantum Physics View</h3>
      
      {/* Filters */}
      <div className="flex justify-center mb-6 space-x-4">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeFilter === 'all' 
              ? 'bg-indigo-500 text-white' 
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          All Fields
        </button>
        <button 
          onClick={() => setActiveFilter('Math')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeFilter === 'Math' 
              ? 'bg-indigo-500 text-white' 
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          Mathematics
        </button>
        <button 
          onClick={() => setActiveFilter('Reading')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeFilter === 'Reading' 
              ? 'bg-indigo-500 text-white' 
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          Reading
        </button>
        <button 
          onClick={() => setActiveFilter('Writing')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeFilter === 'Writing' 
              ? 'bg-indigo-500 text-white' 
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          Writing
        </button>
      </div>
      
      {/* Quantum visualization area */}
      <div className="relative bg-slate-900 dark:bg-black rounded-xl overflow-hidden min-h-[600px]">
        {/* Quantum grid background - creates a subtle grid pattern */}
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
          {Array.from({ length: 400 }).map((_, i) => (
            <div 
              key={i} 
              className="border-[0.5px] border-indigo-500/5 dark:border-indigo-400/5"
            />
          ))}
        </div>
        
        {/* SVG for quantum particles and waves */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Define gradients for each particle */}
          <defs>
            {particlesData.map(({ set }) => (
              <radialGradient
                key={`gradient-${set.id}`}
                id={generateGradientId(set.id)}
                cx="50%"
                cy="50%"
                r="50%"
                fx="50%"
                fy="50%"
              >
                <stop 
                  offset="0%" 
                  stopColor={
                    set.subject === 'Math' ? 'rgba(129, 140, 248, 0.8)' : 
                    set.subject === 'Reading' ? 'rgba(56, 189, 248, 0.8)' : 
                    'rgba(167, 139, 250, 0.8)'
                  } 
                />
                <stop 
                  offset="50%" 
                  stopColor={
                    set.subject === 'Math' ? 'rgba(99, 102, 241, 0.4)' : 
                    set.subject === 'Reading' ? 'rgba(14, 165, 233, 0.4)' : 
                    'rgba(139, 92, 246, 0.4)'
                  } 
                />
                <stop offset="100%" stopColor="rgba(30, 41, 59, 0)" />
              </radialGradient>
            ))}
          </defs>
          
          {/* Probability fields (larger diffuse areas around particles) */}
          {particlesData.map(({ set, x, y, radius, energy }) => (
            <circle 
              key={`field-${set.id}`}
              cx={x}
              cy={y}
              r={radius * 4}
              fill={`url(#${generateGradientId(set.id)})`}
              className="pointer-events-none"
            />
          ))}
          
          {/* Wave patterns */}
          {particlesData.map(({ set, x, y, radius, energy }) => (
            <path
              key={`wave-${set.id}`}
              d={generateWavePath(x, y, radius * 1.8, energy)}
              fill="none"
              stroke={
                set.subject === 'Math' ? 'rgba(129, 140, 248, 0.7)' : 
                set.subject === 'Reading' ? 'rgba(56, 189, 248, 0.7)' : 
                'rgba(167, 139, 250, 0.7)'
              }
              strokeWidth="1.5"
              className="pointer-events-none"
            />
          ))}
          
          {/* Connection lines between related particles (same subject) */}
          {particlesData.map(({ set: set1, x: x1, y: y1 }, index) => {
            // Connect to at most 2 other particles of the same subject to avoid too many lines
            return particlesData
              .filter((_, idx) => idx > index && idx <= index + 2 && particlesData[idx].set.subject === set1.subject)
              .map(({ set: set2, x: x2, y: y2 }) => (
                <line
                  key={`connection-${set1.id}-${set2.id}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={
                    set1.subject === 'Math' ? 'rgba(129, 140, 248, 0.3)' : 
                    set1.subject === 'Reading' ? 'rgba(56, 189, 248, 0.3)' : 
                    'rgba(167, 139, 250, 0.3)'
                  }
                  strokeWidth="1"
                  strokeDasharray="4 2"
                  className="pointer-events-none"
                />
              ))
          })}
        </svg>
        
        {/* Interactive quantum particles */}
        <div className="relative h-full">
          {particlesData.map(({ set, x, y, radius }) => (
            <div
              key={set.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300
                ${selectedSetId === set.id ? 'scale-110 z-50' : 'hover:scale-105 z-30'}`}
              style={{ left: `${x}px`, top: `${y}px` }}
              onClick={() => onSelectSet(set.id)}
            >
              {/* Core particle */}
              <div 
                className={`rounded-full flex items-center justify-center text-white font-bold text-sm
                  ${selectedSetId === set.id ? 'ring-2 ring-offset-1 ring-white/30' : ''}
                  ${set.subject === 'Math' 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-500/30' 
                    : set.subject === 'Reading' 
                      ? 'bg-gradient-to-r from-sky-600 to-sky-400 shadow-lg shadow-sky-500/30' 
                      : 'bg-gradient-to-r from-violet-600 to-violet-400 shadow-lg shadow-violet-500/30'}`}
                style={{ 
                  width: `${radius * 1.8}px`, 
                  height: `${radius * 1.8}px`,
                }}
              >
                {set.accuracy}%
              </div>
              
              {/* Information on hover/select */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl p-3
                  transition-opacity duration-200 z-50
                  ${selectedSetId === set.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 pointer-events-none'}`}
              >
                <div className="text-sm font-bold truncate">{set.subject} - {set.type}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {new Date(set.dateCompleted).toLocaleDateString()}
                </div>
                
                {selectedSetId === set.id && (
                  <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between text-xs">
                      <span>Accuracy:</span>
                      <span>{set.accuracy}%</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Pace:</span>
                      <span>{set.pace}</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Energy level:</span>
                      <span>{Math.round(set.accuracy / 10)}/10</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Quantum physics formulas as decorative elements */}
        <div className="absolute bottom-4 left-4 text-slate-500/30 dark:text-slate-400/20 font-mono text-xs">
          E = hν
        </div>
        <div className="absolute top-4 right-4 text-slate-500/30 dark:text-slate-400/20 font-mono text-xs">
          Ψ(x) = Ae^ikx + Be^-ikx
        </div>
        <div className="absolute bottom-4 right-4 text-slate-500/30 dark:text-slate-400/20 font-mono text-xs">
          ΔxΔp ≥ ℏ/2
        </div>
        
        {/* Information legend */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
          <h4 className="font-bold text-xs uppercase tracking-wider mb-2 opacity-70">Quantum Properties</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span>Mathematics Particles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sky-500"></div>
              <span>Reading Particles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-violet-500"></div>
              <span>Writing Particles</span>
            </div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
              <div className="w-5 h-[1px] bg-white/50"></div>
              <span>Quantum Entanglement</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/50">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
                <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.5" />
              </svg>
              <span>Probability Field</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}