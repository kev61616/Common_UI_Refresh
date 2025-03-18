'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from './types'

export const VirtualRealityGalleryView: React.FC<SetViewProps> = ({ 
  sets, 
  selectedSetId, 
  onSelectSet, 
  isLoading = false 
}) => {
  const [mounted, setMounted] = useState(false)
  const [perspective, setPerspective] = useState<'overhead' | 'first-person'>('overhead')
  const [activeRoom, setActiveRoom] = useState<string | null>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useEffect(() => {
    // When a set is selected, activate its room
    if (selectedSetId) {
      const selectedSet = sets.find(set => set.id === selectedSetId)
      if (selectedSet) {
        setActiveRoom(selectedSet.subject)
      }
    }
  }, [selectedSetId, sets])
  
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
        <p className="text-slate-500 dark:text-slate-400">No practice sets available</p>
      </div>
    )
  }
  
  // Group sets by subject (represents different rooms in VR gallery)
  const galleries = sets.reduce((acc: Record<string, any[]>, set) => {
    const subject = set.subject || 'Other'
    if (!acc[subject]) acc[subject] = []
    acc[subject].push(set)
    return acc
  }, {})
  
  // VR Theme properties based on subject
  const getVRTheme = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          name: 'Geometric Pavilion',
          floorColor: 'from-blue-900 to-indigo-900',
          wallColor: 'from-blue-800 to-indigo-800',
          accentColor: 'text-cyan-400 dark:text-cyan-300',
          bgColor: 'bg-gradient-to-br from-blue-900/90 to-indigo-900/90',
          description: 'A pavilion showcasing mathematical precision and geometric patterns'
        }
      case 'Reading':
        return {
          name: 'Literary Library',
          floorColor: 'from-emerald-900 to-green-900',
          wallColor: 'from-emerald-800 to-green-800',
          accentColor: 'text-emerald-400 dark:text-emerald-300',
          bgColor: 'bg-gradient-to-br from-emerald-900/90 to-green-900/90',
          description: 'A virtual library showcasing literature and reading materials'
        }
      case 'Writing':
        return {
          name: 'Author\'s Studio',
          floorColor: 'from-amber-900 to-orange-900',
          wallColor: 'from-amber-800 to-orange-800',
          accentColor: 'text-amber-400 dark:text-amber-300',
          bgColor: 'bg-gradient-to-br from-amber-900/90 to-orange-900/90',
          description: 'A creative space showcasing writing projects and composition'
        }
      default:
        return {
          name: 'Exploration Hall',
          floorColor: 'from-violet-900 to-purple-900',
          wallColor: 'from-violet-800 to-purple-800',
          accentColor: 'text-violet-400 dark:text-violet-300',
          bgColor: 'bg-gradient-to-br from-violet-900/90 to-purple-900/90',
          description: 'A diverse hall showcasing various study subjects'
        }
    }
  }
  
  // Exhibit display style based on set properties
  const getExhibitStyle = (set: any) => {
    // Base on accuracy and difficulty
    const accuracy = set.accuracy || 0
    const difficulty = set.difficulty || 'Medium'
    
    let size = 'medium'
    let displayType = 'standard'
    
    // Size based on difficulty
    if (difficulty === 'Expert') size = 'large'
    else if (difficulty === 'Hard') size = 'medium-large'
    else if (difficulty === 'Medium') size = 'medium'
    else size = 'small'
    
    // Display type based on accuracy
    if (accuracy >= 90) displayType = 'premium'
    else if (accuracy >= 75) displayType = 'enhanced'
    else if (accuracy >= 60) displayType = 'standard'
    else displayType = 'basic'
    
    return {
      size,
      displayType,
      sizeClass: size === 'large' ? 'col-span-2 row-span-2' : 
                 size === 'medium-large' ? 'col-span-2' : 
                 size === 'medium' ? '' : 
                 'scale-90'
    }
  }
  
  // Render overhead museum map
  const renderOverheadMap = () => {
    return (
      <div className="relative bg-gray-900 border border-gray-800 rounded-lg p-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="vr-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#vr-grid)" />
          </svg>
        </div>
        
        <h3 className="text-white text-lg font-bold mb-4 relative z-10">VR Gallery Map</h3>
        
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {Object.entries(galleries).map(([subject, subjectSets], index) => {
            const theme = getVRTheme(subject)
            const isActive = activeRoom === subject
            
            return (
              <div 
                key={subject}
                className={`
                  relative bg-gradient-to-br ${theme.floorColor} 
                  border-2 rounded-lg p-3 cursor-pointer transition-all duration-300
                  ${isActive 
                    ? 'border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                    : 'border-gray-700 hover:border-gray-500'}
                `}
                onClick={() => setActiveRoom(subject)}
              >
                {/* Room design */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Exhibit markers */}
                <div className="flex flex-wrap justify-center items-center gap-1 min-h-[100px]">
                  {subjectSets.map((set, i) => (
                    <div 
                      key={set.id}
                      className={`
                        w-3 h-3 rounded-full transition-all
                        ${set.id === selectedSetId 
                          ? 'bg-white animate-pulse' 
                          : `bg-${theme.accentColor.split('-')[1]}-400 opacity-70 hover:opacity-100`}
                      `}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectSet(set.id)
                      }}
                    ></div>
                  ))}
                </div>
                
                <div className="text-white text-center mt-2">
                  <div className="font-medium text-sm">{theme.name}</div>
                  <div className="text-xs opacity-70">{subjectSets.length} exhibits</div>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="flex justify-center mt-6 relative z-10">
          <button 
            onClick={() => setPerspective('first-person')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Enter First-Person View
          </button>
        </div>
      </div>
    )
  }
  
  // Render exhibit for a set in the first-person gallery view
  const renderExhibit = (set: any, isSelected: boolean) => {
    const theme = getVRTheme(set.subject)
    const exhibit = getExhibitStyle(set)
    
    return (
      <div 
        className={`
          ${exhibit.sizeClass}
          relative border rounded-lg overflow-hidden transition-all duration-300
          ${isSelected ? 'transform scale-[1.03] z-10 ring-2 ring-white' : 'hover:scale-[1.01]'}
          cursor-pointer min-h-[180px] perspective
        `}
        onClick={() => onSelectSet(set.id)}
      >
        {/* 3D frame effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
          <div className="absolute inset-0 transform preserve-3d" style={{ transform: 'rotateX(5deg)' }}>
            {/* Floor */}
            <div className={`absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t ${theme.floorColor}`}></div>
            
            {/* Back wall */}
            <div className={`absolute inset-x-0 top-0 h-3/4 bg-gradient-to-b ${theme.wallColor}`}></div>
            
            {/* Exhibit display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className={`
                  ${exhibit.displayType === 'premium' ? 'bg-white/10 backdrop-blur-sm border border-white/30' : 
                    exhibit.displayType === 'enhanced' ? 'bg-white/5 backdrop-blur-sm border border-white/20' : 
                    'bg-black/30'}
                  rounded-lg p-4 w-4/5 transform preserve-3d text-white
                `}
                style={{ transform: `translateZ(10px)` }}
              >
                <div className="mb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{set.type}</h3>
                    <div className={`${theme.accentColor} bg-white/10 rounded-full px-2 py-0.5 text-xs font-medium`}>
                      {set.accuracy}%
                    </div>
                  </div>
                  <p className="text-xs opacity-80">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </p>
                </div>
                
                {/* Exhibit content visualization - varies by type */}
                <div className="mt-2 space-y-2">
                  {exhibit.displayType === 'premium' && (
                    <>
                      <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                      <div className="flex justify-between items-center text-xs">
                        <span>Difficulty: {set.difficulty}</span>
                        <span>Questions: {set.questions?.length || 0}</span>
                      </div>
                      <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                    </>
                  )}
                  
                  {(exhibit.displayType === 'premium' || exhibit.displayType === 'enhanced') && (
                    <div className="flex justify-center my-2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme.floorColor} flex items-center justify-center`}>
                        <span className="text-white text-xs">{set.subject[0]}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center text-xs">
                    {exhibit.displayType === 'premium' ? 'Master Exhibit' : 
                     exhibit.displayType === 'enhanced' ? 'Featured Exhibit' : 
                     exhibit.displayType === 'standard' ? 'Standard Exhibit' : 
                     'Basic Exhibit'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Spotlights */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-6">
              <div className="relative h-full w-full">
                <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full opacity-80 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full opacity-80 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-80 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Render the first-person gallery view
  const renderFirstPersonView = () => {
    // If no room is active, default to the first one
    const currentRoom = activeRoom || Object.keys(galleries)[0]
    const currentGallery = galleries[currentRoom] || []
    const theme = getVRTheme(currentRoom)
    
    return (
      <div className={`relative rounded-lg overflow-hidden ${theme.bgColor} min-h-[600px]`}>
        {/* Gallery room atmosphere */}
        <div className="absolute inset-0">
          {/* Floor grid */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 opacity-30">
            <svg width="100%" height="100%" className={theme.accentColor}>
              <pattern id="floor-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#floor-grid)" />
            </svg>
          </div>
          
          {/* Ceiling lights */}
          <div className="absolute inset-x-0 top-0 h-24 flex justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="relative mx-4">
                <div className="absolute top-6 w-3 h-3 bg-white rounded-full opacity-60 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
                <div className="absolute top-10 w-24 h-36 bg-white/5" style={{ 
                  clipPath: 'polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%)'
                }}></div>
              </div>
            ))}
          </div>
          
          {/* Ambient particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full ${theme.accentColor} opacity-30`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s linear infinite`,
                  animationDelay: `-${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Gallery header */}
        <div className="relative z-10 p-6 text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">{theme.name}</h3>
            <button 
              onClick={() => setPerspective('overhead')}
              className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm"
            >
              Return to Map
            </button>
          </div>
          <p className="opacity-70 text-sm">{theme.description}</p>
          
          {/* Room selector */}
          <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
            {Object.entries(galleries).map(([subject, sets]) => (
              <button
                key={subject}
                className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                  subject === currentRoom 
                    ? 'bg-white text-gray-900 font-medium' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                onClick={() => setActiveRoom(subject)}
              >
                {getVRTheme(subject).name} ({sets.length})
              </button>
            ))}
          </div>
        </div>
        
        {/* Gallery exhibits */}
        <div className="relative z-10 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentGallery.map(set => renderExhibit(set, set.id === selectedSetId))}
          </div>
          
          {currentGallery.length === 0 && (
            <div className="min-h-[300px] flex items-center justify-center bg-black/20 rounded-lg">
              <p className="text-white opacity-70">No exhibits in this gallery</p>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  return (
    <div className="border border-gray-900 dark:border-gray-900 rounded-xl shadow-xl overflow-hidden">
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(0) translateX(10px); }
          75% { transform: translateY(10px) translateX(5px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
      
      {perspective === 'overhead' ? renderOverheadMap() : renderFirstPersonView()}
    </div>
  )
}