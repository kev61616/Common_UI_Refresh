'use client'

import React, { useState } from 'react'
import { SetViewProps } from './types'

export function DeepOceanView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [activeDepthZone, setActiveDepthZone] = useState<string>('all')
  
  if (!practiceSets || practiceSets.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-center">57. Deep Ocean View</h3>
        <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <p className="mb-4">No data to explore in the ocean depths.</p>
          <p>Complete some sets to begin your underwater expedition.</p>
        </div>
      </div>
    )
  }

  // Ocean depth zones
  const depthZones = [
    { 
      id: 'sunlight', 
      name: 'Sunlight Zone (0-200m)', 
      color: 'from-sky-300 to-blue-500',
      description: 'High performance, recent practice sets (90%+ accuracy)',
      minAccuracy: 90
    },
    { 
      id: 'twilight', 
      name: 'Twilight Zone (200-1000m)', 
      color: 'from-blue-500 to-blue-700',
      description: 'Good performance, developing mastery (75-89% accuracy)',
      minAccuracy: 75,
      maxAccuracy: 89
    },
    { 
      id: 'midnight', 
      name: 'Midnight Zone (1000-4000m)', 
      color: 'from-blue-700 to-blue-900',
      description: 'Average performance, needs additional practice (60-74% accuracy)',
      minAccuracy: 60,
      maxAccuracy: 74
    },
    { 
      id: 'abyss', 
      name: 'Abyssal Zone (4000-6000m)', 
      color: 'from-blue-900 to-slate-900',
      description: 'Lower performance, challenging topics (40-59% accuracy)',
      minAccuracy: 40,
      maxAccuracy: 59
    },
    { 
      id: 'trench', 
      name: 'Hadal Zone (6000m+)', 
      color: 'from-slate-900 to-black',
      description: 'Lowest performance, most difficult topics (<40% accuracy)',
      maxAccuracy: 39
    }
  ]
  
  // Assign marine life categories based on subject and performance
  const mapSetsToMarineOrganisms = () => {
    return practiceSets.map(set => {
      // Determine depth zone based on accuracy
      let depthZone
      
      if (set.accuracy >= 90) {
        depthZone = 'sunlight'
      } else if (set.accuracy >= 75) {
        depthZone = 'twilight'
      } else if (set.accuracy >= 60) {
        depthZone = 'midnight'
      } else if (set.accuracy >= 40) {
        depthZone = 'abyss'
      } else {
        depthZone = 'trench'
      }
      
      // Determine marine life type based on subject
      let organismType
      let description
      
      if (set.subject === 'Math') {
        if (set.accuracy >= 85) {
          organismType = 'dolphin'
          description = 'Intelligent and agile dolphins represent high-performing math skills'
        } else if (set.accuracy >= 70) {
          organismType = 'turtle'
          description = 'Methodical sea turtles represent solid mathematical reasoning'
        } else if (set.accuracy >= 55) {
          organismType = 'crab'
          description = 'Sideways-moving crabs represent mathematical challenges'
        } else if (set.accuracy >= 40) {
          organismType = 'anglerfish'
          description = 'Deep-sea anglerfish represent difficult math concepts'
        } else {
          organismType = 'blobfish'
          description = 'Pressure-adapted blobfish represent the most challenging math topics'
        }
      } else if (set.subject === 'Reading') {
        if (set.accuracy >= 85) {
          organismType = 'reef'
          description = 'Colorful coral reefs represent diverse reading comprehension skills'
        } else if (set.accuracy >= 70) {
          organismType = 'jellyfish'
          description = 'Translucent jellyfish represent flowing reading analysis'
        } else if (set.accuracy >= 55) {
          organismType = 'squid'
          description = 'Multi-armed squid represent complex reading connections'
        } else if (set.accuracy >= 40) {
          organismType = 'nautilus'
          description = 'Ancient nautilus represents challenging foundational reading skills'
        } else {
          organismType = 'isopod'
          description = 'Deep-sea isopods represent the most difficult reading concepts'
        }
      } else { // Writing
        if (set.accuracy >= 85) {
          organismType = 'whale'
          description = 'Majestic whales represent eloquent writing abilities'
        } else if (set.accuracy >= 70) {
          organismType = 'octopus'
          description = 'Creative octopuses represent adaptable writing skills'
        } else if (set.accuracy >= 55) {
          organismType = 'seahorse'
          description = 'Unique seahorses represent developing writing style'
        } else if (set.accuracy >= 40) {
          organismType = 'eel'
          description = 'Elusive eels represent challenging writing concepts'
        } else {
          organismType = 'viperfish'
          description = 'Intimidating viperfish represent the most difficult writing areas'
        }
      }
      
      // Generate position data for organism
      const depthZoneIndex = depthZones.findIndex(zone => zone.id === depthZone)
      const verticalPosition = 30 + (depthZoneIndex * 15) + (Math.random() * 10)
      const horizontalPosition = 10 + (Math.random() * 80)
      
      return {
        set,
        depthZone,
        organismType,
        description,
        position: {
          top: `${verticalPosition}%`,
          left: `${horizontalPosition}%`,
        },
        size: 6 + (set.accuracy / 10) // Size based on accuracy
      }
    })
  }
  
  const marineOrganisms = mapSetsToMarineOrganisms()
  
  // Filter organisms by active depth zone
  const filteredOrganisms = activeDepthZone === 'all' 
    ? marineOrganisms 
    : marineOrganisms.filter(organism => organism.depthZone === activeDepthZone)
  
  // Helper function to get organism icon/image based on type
  const getOrganismIcon = (type: string, isSelected: boolean) => {
    // Ocean life emoji mapping - could be replaced with proper SVG or images
    const emojiMap: Record<string, string> = {
      dolphin: '🐬',
      turtle: '🐢',
      crab: '🦀',
      anglerfish: '🎣', // Using fishing pole as approximation
      blobfish: '🫠', // Using melting face as approximation
      reef: '🪸',
      jellyfish: '🪼',
      squid: '🦑',
      nautilus: '🐚',
      isopod: '🪲', // Using beetle as approximation
      whale: '🐋',
      octopus: '🐙',
      seahorse: '🦄', // Using unicorn as approximation
      eel: '🐍', // Using snake as approximation
      viperfish: '🦈', // Using shark as approximation
    }
    
    // Use the emoji with a container for styling
    return (
      <div 
        className={`flex items-center justify-center rounded-full transition-transform duration-300
          ${isSelected ? 'transform scale-125 z-50 shadow-lg ring-2 ring-white/30' : 'hover:scale-110'}`}
      >
        <span className="text-4xl" role="img" aria-label={type}>
          {emojiMap[type] || '🌊'}
        </span>
      </div>
    )
  }
  
  // Function to get depth zone background gradient
  const getDepthZoneGradient = (zoneId: string) => {
    const zone = depthZones.find(z => z.id === zoneId)
    return zone ? `bg-gradient-to-b ${zone.color}` : 'bg-blue-500'
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">57. Deep Ocean View</h3>
      
      {/* Depth zone selector */}
      <div className="flex justify-center mb-6 space-x-4">
        <button 
          onClick={() => setActiveDepthZone('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
            ${activeDepthZone === 'all' 
              ? 'bg-indigo-500 text-white' 
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          All Depths
        </button>
        {depthZones.map(zone => (
          <button 
            key={zone.id}
            onClick={() => setActiveDepthZone(zone.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
              ${activeDepthZone === zone.id 
                ? 'bg-indigo-500 text-white' 
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            {zone.id.charAt(0).toUpperCase() + zone.id.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Ocean visualization */}
      <div className="relative w-full min-h-[600px] overflow-hidden rounded-xl">
        {/* Ocean depth zones background */}
        <div className="absolute inset-0 flex flex-col">
          {depthZones.map(zone => (
            <div 
              key={zone.id}
              className={`flex-1 ${getDepthZoneGradient(zone.id)} 
                ${activeDepthZone === 'all' || activeDepthZone === zone.id 
                  ? 'opacity-100' 
                  : 'opacity-30'} 
                transition-opacity duration-500`}
            >
              {/* Zone label */}
              <div className="absolute left-4 text-white font-mono text-sm opacity-70">
                {zone.name}
              </div>
            </div>
          ))}
        </div>
        
        {/* Light rays in sunlight zone */}
        <div className="absolute top-0 inset-x-0 h-[20%] overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute top-0 bg-yellow-300/10 origin-top transform rotate-3"
              style={{ 
                left: `${10 + (i * 8)}%`, 
                width: '4px', 
                height: '100%',
                filter: 'blur(2px)' 
              }}
            ></div>
          ))}
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 3}px`, 
                height: `${1 + Math.random() * 3}px`,
                animationDuration: `${10 + Math.random() * 20}s`,
                animationDelay: `${Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Marine organisms */}
        <div className="relative z-10 h-full">
          {filteredOrganisms.map(({ set, organismType, description, position, size, depthZone }) => (
            <div 
              key={set.id}
              className="absolute cursor-pointer transition-all duration-300"
              style={{ 
                top: position.top, 
                left: position.left,
              }}
              onClick={() => onSelectSet(set.id)}
            >
              {/* Organism icon/image */}
              {getOrganismIcon(organismType, selectedSetId === set.id)}
              
              {/* Info tooltip on selection */}
              {selectedSetId === set.id && (
                <div className="absolute mt-2 -translate-x-1/2 left-1/2 w-64 bg-black/75 backdrop-blur-sm text-white p-3 rounded-lg shadow-xl z-50">
                  <div className="font-bold">{set.subject} - {set.type}</div>
                  <div className="text-sm mt-1 text-blue-200">{organismType.charAt(0).toUpperCase() + organismType.slice(1)}</div>
                  <div className="text-xs mt-1 text-slate-300">{description}</div>
                  
                  <div className="grid grid-cols-2 gap-x-2 mt-3 text-xs">
                    <div>
                      <div className="text-slate-400">Accuracy</div>
                      <div className="font-medium">{set.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Depth Zone</div>
                      <div className="font-medium">{depthZone.charAt(0).toUpperCase() + depthZone.slice(1)}</div>
                    </div>
                    <div className="mt-2">
                      <div className="text-slate-400">Completed</div>
                      <div className="font-medium">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                    </div>
                    <div className="mt-2">
                      <div className="text-slate-400">Pace</div>
                      <div className="font-medium">{set.pace}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Oceanographic UI elements */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-slate-700/50 rounded-lg p-2 text-green-300 font-mono text-xs">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <div>Sonar Active</div>
          </div>
          <div className="mt-1">Depth: {activeDepthZone === 'all' ? '0-6000+' : activeDepthZone === 'sunlight' ? '0-200' : activeDepthZone === 'twilight' ? '200-1000' : activeDepthZone === 'midnight' ? '1000-4000' : activeDepthZone === 'abyss' ? '4000-6000' : '6000+'} meters</div>
          <div className="mt-1">Pressure: {activeDepthZone === 'all' ? '1-1100' : activeDepthZone === 'sunlight' ? '1-20' : activeDepthZone === 'twilight' ? '20-100' : activeDepthZone === 'midnight' ? '100-400' : activeDepthZone === 'abyss' ? '400-600' : '600-1100'} atm</div>
          <div className="mt-1">Temp: {activeDepthZone === 'all' ? '25-2°C' : activeDepthZone === 'sunlight' ? '25-15°C' : activeDepthZone === 'twilight' ? '15-5°C' : '4-2°C'}</div>
        </div>
        
        {/* Active zone information */}
        {activeDepthZone !== 'all' && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3">
            <h4 className="text-white font-bold text-sm">
              {depthZones.find(z => z.id === activeDepthZone)?.name}
            </h4>
            <p className="text-slate-300 text-xs mt-1">
              {depthZones.find(z => z.id === activeDepthZone)?.description}
            </p>
            <div className="text-xs text-slate-400 mt-2">
              Sets found: {filteredOrganisms.length} • 
              Avg. accuracy: {filteredOrganisms.length > 0 ? Math.round(filteredOrganisms.reduce((sum, org) => sum + org.set.accuracy, 0) / filteredOrganisms.length) : 0}%
            </div>
          </div>
        )}
        
        {/* Deep sea legend */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-slate-700/50 rounded-lg p-2 text-xs text-white">
          <h4 className="font-bold mb-1">Marine Life Legend</h4>
          <div className="grid grid-cols-3 gap-x-4 gap-y-1">
            <div className="flex items-center">
              <span className="mr-1">🐬</span>
              <span className="text-slate-300">Math (90%+)</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">🪸</span>
              <span className="text-slate-300">Reading (90%+)</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">🐋</span>
              <span className="text-slate-300">Writing (90%+)</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">🦀</span>
              <span className="text-slate-300">Math (55-70%)</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">🦑</span>
              <span className="text-slate-300">Reading (55-70%)</span>
            </div>
            <div className="flex items-center">
              <span className="mr-1">🐙</span>
              <span className="text-slate-300">Writing (55-70%)</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }
        .animate-float {
          animation-name: float;
          animation-duration: 15s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  )
}