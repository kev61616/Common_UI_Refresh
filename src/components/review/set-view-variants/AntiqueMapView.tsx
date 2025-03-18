'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from './types'

export const AntiqueMapView: React.FC<SetViewProps> = ({ 
  sets, 
  selectedSetId, 
  onSelectSet, 
  isLoading = false 
}) => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400">No territories to explore in this realm</p>
      </div>
    )
  }
  
  // Generate a unique territory ID for each set
  const getTerritoryId = (index: number, total: number) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const number = Math.floor((index / total) * 100) + 1
    const letter = letters[index % letters.length]
    
    return `${letter}${number}`
  }
  
  // Calculate territory size based on set properties
  const getTerritorySize = (set: any) => {
    const baseSize = 70
    const questionFactor = set.questions.length / 10
    
    return Math.max(baseSize, baseSize + questionFactor * 10)
  }
  
  // Generate a "hand-drawn" path for territory borders
  const generateTerritoryPath = (size: number, roughness: number = 0.2) => {
    const points = []
    const numPoints = 8
    const centerX = 0
    const centerY = 0
    
    // Generate points around a circle with some randomness
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2
      const radius = size + (Math.random() * size * roughness) - (size * roughness / 2)
      
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      points.push([x, y])
    }
    
    // Close the path
    points.push(points[0])
    
    // Convert points to SVG path
    let path = `M${points[0][0]},${points[0][1]}`
    
    for (let i = 1; i < points.length; i++) {
      const [x1, y1] = points[i-1]
      const [x2, y2] = points[i]
      
      // Add a slight curve for a more hand-drawn look
      const cpX1 = x1 + (x2 - x1) * 0.8 + Math.random() * 10 - 5
      const cpY1 = y1 + (y2 - y1) * 0.2 + Math.random() * 10 - 5
      
      path += ` C${cpX1},${cpY1} ${x2 - 10},${y2 - 10} ${x2},${y2}`
    }
    
    return path
  }
  
  // Generate decorative elements for the map
  const getMapDecoration = () => {
    return (
      <>
        {/* Compass Rose */}
        <g transform="translate(80, 80)" className="text-slate-700 dark:text-slate-300">
          <circle cx="0" cy="0" r="30" className="fill-none stroke-current stroke-1" />
          <circle cx="0" cy="0" r="20" className="fill-none stroke-current stroke-1" />
          <circle cx="0" cy="0" r="3" className="fill-current" />
          
          {/* Cardinal directions */}
          <line x1="0" y1="-30" x2="0" y2="-10" className="stroke-current stroke-1" />
          <line x1="30" y1="0" x2="10" y2="0" className="stroke-current stroke-1" />
          <line x1="0" y1="30" x2="0" y2="10" className="stroke-current stroke-1" />
          <line x1="-30" y1="0" x2="-10" y2="0" className="stroke-current stroke-1" />
          
          <text x="0" y="-35" textAnchor="middle" className="fill-current text-[8px] font-serif">N</text>
          <text x="35" y="0" textAnchor="middle" dy="3" className="fill-current text-[8px] font-serif">E</text>
          <text x="0" y="40" textAnchor="middle" className="fill-current text-[8px] font-serif">S</text>
          <text x="-35" y="0" textAnchor="middle" dy="3" className="fill-current text-[8px] font-serif">W</text>
          
          {/* Ordinal directions */}
          <line x1="21" y1="-21" x2="7" y2="-7" className="stroke-current stroke-1" />
          <line x1="21" y1="21" x2="7" y2="7" className="stroke-current stroke-1" />
          <line x1="-21" y1="21" x2="-7" y2="7" className="stroke-current stroke-1" />
          <line x1="-21" y1="-21" x2="-7" y2="-7" className="stroke-current stroke-1" />
          
          {/* Decorative points */}
          <path d="M0,-40 L3,-33 L0,-35 L-3,-33 Z" className="fill-current" />
          <path d="M40,0 L33,3 L35,0 L33,-3 Z" className="fill-current" />
          <path d="M0,40 L-3,33 L0,35 L3,33 Z" className="fill-current" />
          <path d="M-40,0 L-33,-3 L-35,0 L-33,3 Z" className="fill-current" />
        </g>
        
        {/* Border decoration */}
        <rect 
          x="10" 
          y="10" 
          width="980" 
          height="580" 
          className="fill-none stroke-slate-700 dark:stroke-slate-300 stroke-1" 
        />
        
        <rect 
          x="20" 
          y="20" 
          width="960" 
          height="560" 
          className="fill-none stroke-slate-700 dark:stroke-slate-300 stroke-1 opacity-60" 
        />
        
        {/* Map title */}
        <g transform="translate(500, 50)">
          <text 
            textAnchor="middle" 
            className="fill-slate-700 dark:fill-slate-300 text-lg font-serif"
          >
            Atlas of Learning Territories
          </text>
          <line 
            x1="-200" 
            y1="15" 
            x2="200" 
            y2="15" 
            className="stroke-slate-700 dark:stroke-slate-300 stroke-1" 
          />
        </g>
        
        {/* Sea texture */}
        {Array.from({ length: 30 }).map((_, i) => (
          <path 
            key={`wave-${i}`}
            d={`M${Math.random() * 900 + 50},${Math.random() * 500 + 50} q10,5 20,0 q10,-5 20,0 q10,5 20,0`}
            className="fill-none stroke-slate-400 dark:stroke-slate-600 stroke-[0.5] opacity-20"
          />
        ))}
      </>
    )
  }
  
  // Generate terrain features based on set properties
  const getTerrainFeatures = (set: any, size: number) => {
    const features = []
    
    // Mountains for difficult sets
    if (set.difficulty === 'Hard' || set.questions.length > 20) {
      for (let i = 0; i < 3; i++) {
        const x = (Math.random() - 0.5) * size * 0.7
        const y = (Math.random() - 0.5) * size * 0.7
        
        features.push(
          <path 
            key={`mountain-${i}`}
            d={`M${x-10},${y+10} L${x},${y-10} L${x+10},${y+10} Z`}
            className="fill-slate-600 dark:fill-slate-400 opacity-40"
          />
        )
      }
    }
    
    // Forests for medium sets
    if (set.difficulty === 'Medium' || (set.questions.length > 10 && set.questions.length <= 20)) {
      for (let i = 0; i < 5; i++) {
        const x = (Math.random() - 0.5) * size * 0.8
        const y = (Math.random() - 0.5) * size * 0.8
        
        features.push(
          <circle 
            key={`forest-${i}`}
            cx={x}
            cy={y}
            r={3}
            className="fill-emerald-700 dark:fill-emerald-600 opacity-40"
          />
        )
      }
    }
    
    // Rivers for all sets
    if (Math.random() > 0.5) {
      const startX = -size / 2
      const startY = (Math.random() - 0.5) * size
      
      const cp1X = (Math.random() - 0.5) * size * 0.8
      const cp1Y = (Math.random() - 0.5) * size * 0.8
      
      const cp2X = (Math.random() - 0.5) * size * 0.8
      const cp2Y = (Math.random() - 0.5) * size * 0.8
      
      const endX = size / 2
      const endY = (Math.random() - 0.5) * size
      
      features.push(
        <path 
          key="river"
          d={`M${startX},${startY} C${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`}
          className="fill-none stroke-blue-500 dark:stroke-blue-400 stroke-1 opacity-30"
          strokeDasharray="1,1"
        />
      )
    }
    
    return features
  }
  
  // Calculate geographic layout positions for sets
  const calculateMapLayout = () => {
    const positions: Record<string, { x: number, y: number }> = {}
    const territorySizes: Record<string, number> = {}
    
    // Group sets by subject
    const subjectGroups = sets.reduce((acc, set) => {
      const subject = set.subject || 'Other'
      if (!acc[subject]) {
        acc[subject] = []
      }
      acc[subject].push(set)
      return acc
    }, {} as Record<string, typeof sets>)
    
    // Arrange subjects in continents
    const subjectPositions: Record<string, { x: number, y: number }> = {
      'Math': { x: 250, y: 200 },
      'Reading': { x: 700, y: 300 },
      'Writing': { x: 400, y: 450 },
      'Other': { x: 600, y: 150 }
    }
    
    // Position each set within its subject continent
    Object.entries(subjectGroups).forEach(([subject, subjectSets]) => {
      const basePos = subjectPositions[subject] || { x: 500, y: 300 }
      const setCount = subjectSets.length
      
      subjectSets.forEach((set, i) => {
        // Arrange in a rough circle around the subject center
        const angle = (i / setCount) * Math.PI * 2
        const radius = 120 + Math.random() * 30
        
        const x = basePos.x + Math.cos(angle) * radius
        const y = basePos.y + Math.sin(angle) * radius
        
        positions[set.id] = { x, y }
        territorySizes[set.id] = getTerritorySize(set)
      })
    })
    
    return { positions, territorySizes }
  }
  
  // Calculate layout once
  const { positions, territorySizes } = calculateMapLayout()
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-center">Antique Map View</h3>
      
      <div className="bg-amber-50 dark:bg-slate-800 rounded-lg overflow-hidden relative mx-auto w-full max-w-screen-lg">
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-auto"
          style={{ 
            filter: 'url(#paper-texture)' 
          }}
        >
          <defs>
            {/* Paper texture filter */}
            <filter id="paper-texture">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
            </filter>
            
            {/* Territory pattern */}
            <pattern id="territory-pattern" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="none" />
              <path d="M 0,10 L 20,10 M 10,0 L 10,20" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          
          {/* Background and decorations */}
          <rect 
            x="0" 
            y="0" 
            width="1000" 
            height="600" 
            className="fill-amber-50 dark:fill-slate-800" 
          />
          
          {getMapDecoration()}
          
          {/* Subject continents */}
          {Object.entries(positions).map(([setId, position]) => {
            const matchingSet = sets.find(set => set.id === setId)
            if (!matchingSet) return null
            
            const size = territorySizes[setId]
            const territoryId = getTerritoryId(sets.indexOf(matchingSet), sets.length)
            const isSelected = setId === selectedSetId
            
            // Determine territory color based on subject
            const getSubjectColor = (subject: string) => {
              switch(subject) {
                case 'Math': return 'fill-blue-200 dark:fill-blue-900/40 stroke-blue-700 dark:stroke-blue-400'
                case 'Reading': return 'fill-emerald-200 dark:fill-emerald-900/40 stroke-emerald-700 dark:stroke-emerald-400'
                case 'Writing': return 'fill-amber-200 dark:fill-amber-900/40 stroke-amber-700 dark:stroke-amber-400'
                default: return 'fill-purple-200 dark:fill-purple-900/40 stroke-purple-700 dark:stroke-purple-400'
              }
            }
            
            // Calculate performance-based opacity
            const perfOpacity = (matchingSet.accuracy || 50) / 100
            
            // Determine pattern style based on accuracy
            const getPatternStyle = () => {
              if (matchingSet.accuracy >= 90) return 'url(#territory-pattern)'
              return 'none'
            }
            
            return (
              <g 
                key={setId} 
                transform={`translate(${position.x}, ${position.y})`}
                onClick={() => onSelectSet(setId)}
                className="cursor-pointer"
              >
                {/* Territory shape */}
                <path 
                  d={generateTerritoryPath(size)}
                  className={`${getSubjectColor(matchingSet.subject || 'Other')} stroke-1 ${
                    isSelected ? 'stroke-2 stroke-white dark:stroke-white' : ''
                  }`}
                  style={{ 
                    fillOpacity: perfOpacity * 0.6 + 0.2, 
                    fill: isSelected ? getPatternStyle() : 'none'
                  }}
                />
                
                {/* Add terrain features */}
                {getTerrainFeatures(matchingSet, size)}
                
                {/* Territory label */}
                <text 
                  textAnchor="middle" 
                  dy="0.3em"
                  className={`fill-slate-700 dark:fill-slate-300 text-xs font-serif ${
                    isSelected ? 'font-bold' : ''
                  }`}
                >
                  {matchingSet.title.length > 15 
                    ? matchingSet.title.substring(0, 12) + '...' 
                    : matchingSet.title}
                </text>
                
                {/* Territory ID */}
                <text 
                  textAnchor="middle" 
                  y={15}
                  className="fill-slate-600 dark:fill-slate-400 text-[9px] font-mono opacity-70"
                >
                  {territoryId}
                </text>
                
                {/* Small city marker */}
                <circle 
                  cx="0" 
                  cy="-3" 
                  r="2" 
                  className="fill-slate-700 dark:fill-slate-300" 
                />
              </g>
            )
          })}
          
          {/* Legend */}
          <g transform="translate(850, 500)">
            <rect 
              x="0" 
              y="0" 
              width="120" 
              height="80" 
              className="fill-amber-100/50 dark:fill-slate-700/50 stroke-slate-700 dark:stroke-slate-300 stroke-1" 
            />
            
            <text 
              x="60" 
              y="15" 
              textAnchor="middle" 
              className="fill-slate-700 dark:fill-slate-300 text-xs font-serif"
            >
              Legend
            </text>
            
            <line 
              x1="10" 
              y1="20" 
              x2="110" 
              y2="20" 
              className="stroke-slate-700 dark:stroke-slate-300 stroke-1 opacity-30" 
            />
            
            <g transform="translate(10, 35)">
              <rect 
                width="10" 
                height="10" 
                className="fill-blue-200 dark:fill-blue-900/40 stroke-blue-700 dark:stroke-blue-400 stroke-1" 
              />
              <text 
                x="15" 
                y="8" 
                className="fill-slate-700 dark:fill-slate-300 text-[8px]"
              >
                Mathematics
              </text>
            </g>
            
            <g transform="translate(10, 50)">
              <rect 
                width="10" 
                height="10" 
                className="fill-emerald-200 dark:fill-emerald-900/40 stroke-emerald-700 dark:stroke-emerald-400 stroke-1" 
              />
              <text 
                x="15" 
                y="8" 
                className="fill-slate-700 dark:fill-slate-300 text-[8px]"
              >
                Reading
              </text>
            </g>
            
            <g transform="translate(10, 65)">
              <rect 
                width="10" 
                height="10" 
                className="fill-amber-200 dark:fill-amber-900/40 stroke-amber-700 dark:stroke-amber-400 stroke-1" 
              />
              <text 
                x="15" 
                y="8" 
                className="fill-slate-700 dark:fill-slate-300 text-[8px]"
              >
                Writing
              </text>
            </g>
          </g>
        </svg>
      </div>
      
      {/* Selected set details */}
      {selectedSetId && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <h4 className="font-medium mb-2 border-b pb-1 border-slate-200 dark:border-slate-700">
            Territory Details
          </h4>
          
          {(() => {
            const selectedSet = sets.find(set => set.id === selectedSetId)
            if (!selectedSet) return null
            
            const territoryId = getTerritoryId(sets.indexOf(selectedSet), sets.length)
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Name</div>
                  <div className="font-medium">{selectedSet.title}</div>
                </div>
                
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Region</div>
                  <div className="font-medium">{selectedSet.subject || 'Uncharted'}</div>
                </div>
                
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Coordinates</div>
                  <div className="font-medium">{territoryId}</div>
                </div>
                
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Size</div>
                  <div className="font-medium">{selectedSet.questions.length} leagues</div>
                </div>
                
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Explored</div>
                  <div className="font-medium">{selectedSet.accuracy || 0}%</div>
                </div>
                
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Last Expedition</div>
                  <div className="font-medium">
                    {selectedSet.lastReviewed 
                      ? new Date(selectedSet.lastReviewed).toLocaleDateString() 
                      : 'Never'}
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}