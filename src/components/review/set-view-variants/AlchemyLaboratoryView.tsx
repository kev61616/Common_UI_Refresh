'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from './types'

export const AlchemyLaboratoryView: React.FC<SetViewProps> = ({ 
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
        <p className="text-slate-500 dark:text-slate-400">No alchemical elements to transmute</p>
      </div>
    )
  }
  
  // Render a stylized potion flask for a practice set
  const renderPotionFlask = (set: any, isSelected: boolean) => {
    // Determine potion properties based on set attributes
    const getPotionColor = (subject: string, accuracy: number) => {
      // Base color by subject
      let baseColor
      switch (subject) {
        case 'Math':
          baseColor = accuracy >= 70 ? 'from-blue-400 to-indigo-600' : 'from-blue-300 to-indigo-400'
          break
        case 'Reading':
          baseColor = accuracy >= 70 ? 'from-emerald-400 to-green-600' : 'from-emerald-300 to-green-400'
          break
        case 'Writing':
          baseColor = accuracy >= 70 ? 'from-amber-400 to-yellow-600' : 'from-amber-300 to-yellow-400'
          break
        case 'Science':
          baseColor = accuracy >= 70 ? 'from-violet-400 to-purple-600' : 'from-violet-300 to-purple-400'
          break
        default:
          baseColor = accuracy >= 70 ? 'from-rose-400 to-pink-600' : 'from-rose-300 to-pink-400'
      }
      
      return baseColor
    }
    
    // Determine potion shape based on question count
    const getPotionShape = (questionCount: number) => {
      // Different flask shapes for different question counts
      if (questionCount > 20) return 'potion-large'
      if (questionCount > 10) return 'potion-medium'
      return 'potion-small'
    }
    
    // Determine completion level (fill percentage)
    const getCompletionLevel = (completed: number, total: number) => {
      if (!total) return 0
      return Math.min(100, Math.max(5, Math.round((completed / total) * 100)))
    }
    
    // Determine potion glow effect based on accuracy
    const getPotionGlow = (accuracy: number) => {
      if (accuracy >= 90) return 'shadow-lg shadow-current'
      if (accuracy >= 70) return 'shadow-md shadow-current/70'
      return 'shadow-sm shadow-current/30'
    }
    
    // Extract properties
    const accuracy = set.accuracy || 0
    const completed = set.completedCount || 0
    const total = set.questions?.length || 0
    const subject = set.subject || 'Other'
    
    // Potion class setup
    const potionShape = getPotionShape(total)
    const potionColor = getPotionColor(subject, accuracy)
    const completionLevel = getCompletionLevel(completed, total)
    const potionGlow = getPotionGlow(accuracy)
    
    const flaskWidth = potionShape === 'potion-large' ? 120 : potionShape === 'potion-medium' ? 100 : 80
    const flaskHeight = potionShape === 'potion-large' ? 160 : potionShape === 'potion-medium' ? 140 : 120
    
    return (
      <div 
        className={`relative flex flex-col items-center ${
          isSelected ? 'scale-110 z-10' : 'hover:scale-105 transition-transform duration-300'
        }`}
      >
        {/* Potion Label */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-amber-800/80 dark:bg-amber-900/90 text-amber-100 text-xs rounded px-2 py-0.5 whitespace-nowrap z-10">
          {subject} Elixir
        </div>
        
        {/* Flask */}
        <div 
          className={`relative ${potionGlow} ${
            isSelected ? 'ring-2 ring-white dark:ring-white' : ''
          }`}
          style={{
            width: `${flaskWidth}px`,
            height: `${flaskHeight}px`
          }}
        >
          {/* Flask Glass Structure */}
          <svg viewBox="0 0 100 140" className="w-full h-full">
            {/* Flask outline */}
            <path 
              d="M30,0 L70,0 L70,40 Q100,70 100,100 Q100,140 50,140 Q0,140 0,100 Q0,70 30,40 L30,0 Z" 
              className="fill-none stroke-slate-400 dark:stroke-slate-500" 
              strokeWidth="1.5"
            />
            
            {/* Flask neck */}
            <path 
              d="M30,0 L70,0 L70,40 L30,40 L30,0 Z" 
              className="fill-slate-200 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-500" 
              strokeWidth="1.5"
              fillOpacity="0.5"
            />
            
            {/* Flask body */}
            <path 
              d="M30,40 Q0,70 0,100 Q0,140 50,140 Q100,140 100,100 Q100,70 70,40 L30,40 Z" 
              className="fill-slate-200 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-500" 
              strokeWidth="1.5"
              fillOpacity="0.5"
            />
            
            {/* Potion liquid */}
            <path 
              d={`M30,${140 - completionLevel} Q0,${120 - completionLevel * 0.5} 0,100 Q0,140 50,140 Q100,140 100,100 Q100,${120 - completionLevel * 0.5} 70,${140 - completionLevel} L30,${140 - completionLevel} Z`} 
              className={`bg-gradient-to-b ${potionColor} fill-current`}
              style={{
                filter: accuracy >= 80 ? 'url(#potion-glow)' : undefined
              }}
            />
            
            {/* Cork */}
            <rect x="35" y="-5" width="30" height="10" rx="2" className="fill-amber-800 dark:fill-amber-900" />
            
            {/* Bubbles */}
            {Array.from({ length: 3 + Math.round(accuracy / 20) }).map((_, i) => (
              <circle 
                key={`bubble-${i}`}
                cx={35 + Math.random() * 30}
                cy={100 - Math.random() * completionLevel * 0.5}
                r={1 + Math.random() * 3}
                className="fill-white dark:fill-white opacity-60"
              />
            ))}
            
            {/* Glass highlights */}
            <path 
              d="M30,10 L40,10 M30,20 L40,20 M30,30 L40,30" 
              className="stroke-white/40 dark:stroke-white/30" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Filters */}
            <defs>
              <filter id="potion-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
          </svg>
          
          {/* Accuracy Runes */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            {Array.from({ length: 5 }).map((_, i) => {
              const isActive = accuracy >= (i + 1) * 20
              return (
                <div 
                  key={`rune-${i}`}
                  className={`mx-1 text-xs ${isActive ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400/50 dark:text-slate-500/50'}`}
                >
                  {/* Different alchemical runes */}
                  {['☿', '♄', '♃', '♂', '☼'][i]}
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Potion Info */}
        <div className="mt-3 text-center">
          <div className={`font-medium text-sm truncate max-w-[150px] ${isSelected ? 'text-primary' : ''}`}>
            {set.title}
          </div>
          
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {completed}/{total} questions • {set.accuracy || 0}% potency
          </div>
        </div>
      </div>
    )
  }
  
  // Render a magical scroll for a practice set (alternative visualization)
  const renderScroll = (set: any, isSelected: boolean) => {
    // Calculate scroll height based on question count
    const getScrollHeight = (questionCount: number) => {
      return Math.min(300, Math.max(150, 80 + questionCount * 5))
    }
    
    const scrollHeight = getScrollHeight(set.questions?.length || 0)
    
    // Determine scroll damage based on accuracy (lower accuracy = more worn/damaged scroll)
    const getScrollCondition = (accuracy: number) => {
      if (accuracy >= 90) return 'pristine'
      if (accuracy >= 70) return 'good'
      if (accuracy >= 50) return 'worn'
      return 'damaged'
    }
    
    const scrollCondition = getScrollCondition(set.accuracy || 0)
    
    // Get scroll condition classes
    const getScrollClasses = () => {
      switch (scrollCondition) {
        case 'pristine':
          return 'bg-amber-50 dark:bg-amber-900/30'
        case 'good':
          return 'bg-amber-100 dark:bg-amber-900/40'
        case 'worn':
          return 'bg-amber-200 dark:bg-amber-900/50'
        case 'damaged':
          return 'bg-amber-300 dark:bg-amber-900/60'
      }
    }
    
    return (
      <div 
        className={`relative ${
          isSelected ? 'scale-110 z-10' : 'hover:scale-105 transition-transform duration-300'
        }`}
      >
        {/* Scroll Rollers */}
        <div className="absolute -top-3 inset-x-0 h-6 bg-amber-800 dark:bg-amber-900 rounded-full shadow-inner"></div>
        <div className="absolute -bottom-3 inset-x-0 h-6 bg-amber-800 dark:bg-amber-900 rounded-full shadow-inner"></div>
        
        {/* Scroll Paper */}
        <div 
          className={`px-6 pt-6 pb-4 rounded-lg border border-amber-300 dark:border-amber-700 ${getScrollClasses()} ${
            isSelected ? 'ring-2 ring-amber-500 dark:ring-amber-400' : ''
          }`}
          style={{
            minHeight: `${scrollHeight}px`,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23d97706\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")'
          }}
        >
          {/* Scroll Title */}
          <div className="text-center mb-4 font-serif">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100">{set.title}</h3>
            <div className="mt-1 font-medium text-xs text-amber-800 dark:text-amber-200 opacity-80">
              {set.subject || 'Unknown'} • {set.questions?.length || 0} incantations
            </div>
          </div>
          
          {/* Scroll Content (Runes & Symbols) */}
          <div className="space-y-3">
            {Array.from({ length: Math.min(8, Math.max(3, (set.questions?.length || 0) / 3)) }).map((_, i) => (
              <div key={`rune-line-${i}`} className="flex items-center gap-2">
                {/* Decorative Magic Symbol */}
                <span className="text-amber-800 dark:text-amber-400 opacity-80">
                  {['◆', '◇', '○', '●', '□', '■', '△', '▲', '✧', '✦'][i % 10]}
                </span>
                
                {/* Rune-like Line */}
                <div className="h-px flex-grow bg-amber-800/30 dark:bg-amber-400/30"></div>
                
                {/* Completion Symbol */}
                <span className="text-amber-800 dark:text-amber-400 opacity-80">
                  {i < ((set.completedCount || 0) / (set.questions?.length || 1)) * 8 ? '✓' : '?'}
                </span>
              </div>
            ))}
          </div>
          
          {/* Accuracy Seal */}
          <div className="mt-6 flex justify-end">
            <div 
              className={`h-16 w-16 rounded-full flex items-center justify-center ${
                (set.accuracy || 0) >= 70 ? 'bg-amber-500/20 dark:bg-amber-500/20' : 'bg-amber-800/10 dark:bg-amber-800/10'
              }`}
            >
              <div 
                className={`h-12 w-12 rounded-full flex items-center justify-center border-2 ${
                  (set.accuracy || 0) >= 70 ? 'border-amber-700 dark:border-amber-400' : 'border-amber-800/30 dark:border-amber-700/30'
                }`}
              >
                <span className="font-serif font-bold text-amber-900 dark:text-amber-300">
                  {set.accuracy || 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Render an alchemical apparatus for a practice set (another alternative visualization)
  const renderApparatus = (set: any, isSelected: boolean) => {
    // Determine apparatus type based on set properties
    const getApparatusType = (subject: string, questionCount: number) => {
      if (subject === 'Math') return 'alembic'
      if (subject === 'Reading') return 'astrolabe'
      if (subject === 'Writing') return 'codex'
      if (questionCount > 15) return 'athanor'
      return 'retort'
    }
    
    const apparatusType = getApparatusType(set.subject || 'Other', set.questions?.length || 0)
    
    // Get apparatus icon based on type
    const getApparatusIcon = () => {
      switch (apparatusType) {
        case 'alembic':
          return (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M40,10 L60,10 L60,30 Q80,40 80,70 Q80,90 50,90 Q20,90 20,70 Q20,40 40,30 L40,10 Z" 
                className="fill-none stroke-amber-800 dark:stroke-amber-400" 
                strokeWidth="2" 
              />
              <circle cx="50" cy="20" r="5" className="fill-amber-500/50 dark:fill-amber-500/50" />
              <path d="M40,70 Q50,80 60,70" className="fill-none stroke-amber-800 dark:stroke-amber-400" strokeWidth="1.5" />
            </svg>
          )
        case 'astrolabe':
          return (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="40" className="fill-none stroke-amber-800 dark:stroke-amber-400" strokeWidth="2" />
              <circle cx="50" cy="50" r="30" className="fill-none stroke-amber-800 dark:stroke-amber-400" strokeWidth="1" />
              <line x1="10" y1="50" x2="90" y2="50" className="stroke-amber-800 dark:stroke-amber-400" strokeWidth="1" />
              <line x1="50" y1="10" x2="50" y2="90" className="stroke-amber-800 dark:stroke-amber-400" strokeWidth="1" />
              <path d="M50,50 L70,30" className="stroke-amber-500 dark:stroke-amber-500" strokeWidth="2" />
            </svg>
          )
        case 'codex':
          return (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="20" y="20" width="60" height="70" rx="3" className="fill-none stroke-amber-800 dark:stroke-amber-400" strokeWidth="2" />
              <path d="M20,30 L80,30 M20,40 L80,40 M20,50 L80,50 M20,60 L60,60 M20,70 L50,70" 
                className="stroke-amber-800 dark:stroke-amber-400" 
                strokeWidth="1" 
                strokeDasharray="3,3" 
              />
              <circle cx="70" cy="70" r="10" className="fill-amber-500/30 dark:fill-amber-500/30 stroke-amber-800 dark:stroke-amber-400" strokeWidth="1" />
            </svg>
          )
        case 'athanor':
          return (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M30,20 L70,20 L80,50 L70,80 L30,80 L20,50 L30,20 Z" className="fill-none stroke-amber-800 dark:stroke-amber-400" strokeWidth="2" />
              <circle cx="50" cy="50" r="15" className="fill-amber-500/30 dark:fill-amber-500/30" />
              <path d="M35,35 L65,65 M35,65 L65,35" className="stroke-amber-800 dark:stroke-amber-400" strokeWidth="1" />
            </svg>
          )
        default: // retort
          return (
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M20,50 Q20,20 40,20 L60,20 Q80,20 80,50 Q80,80 50,80 Q20,80 20,50 Z" 
                className="fill-none stroke-amber-800 dark:stroke-amber-400" 
                strokeWidth="2" 
              />
              <path d="M40,20 Q40,35 50,35 Q60,35 60,20" 
                className="fill-none stroke-amber-800 dark:stroke-amber-400" 
                strokeWidth="1.5" 
              />
              <circle cx="50" cy="50" r="10" className="fill-amber-500/30 dark:fill-amber-500/30" />
            </svg>
          )
      }
    }
    
    // Determine materials based on accuracy
    const getMaterialClass = (accuracy: number) => {
      if (accuracy >= 90) return 'bg-gradient-to-b from-amber-200 to-yellow-400 dark:from-amber-700 dark:to-yellow-600'
      if (accuracy >= 70) return 'bg-gradient-to-b from-slate-300 to-gray-400 dark:from-slate-600 dark:to-gray-700'
      if (accuracy >= 50) return 'bg-gradient-to-b from-amber-700 to-amber-900 dark:from-amber-800 dark:to-amber-950'
      return 'bg-gradient-to-b from-slate-400 to-slate-600 dark:from-slate-700 dark:to-slate-800'
    }
    
    const materialClass = getMaterialClass(set.accuracy || 0)
    
    return (
      <div 
        className={`relative flex flex-col items-center ${
          isSelected ? 'scale-110 z-10' : 'hover:scale-105 transition-transform duration-300'
        }`}
      >
        {/* Apparatus Base */}
        <div 
          className={`w-24 h-24 rounded-lg ${materialClass} shadow-lg ${
            isSelected ? 'ring-2 ring-amber-500 dark:ring-amber-400' : ''
          }`}
        >
          {/* Apparatus Icon */}
          <div className="h-full w-full text-amber-900 dark:text-amber-300 p-2">
            {getApparatusIcon()}
          </div>
        </div>
        
        {/* Inscribed Circle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className={`h-28 w-28 rounded-full border-2 border-dashed ${
              (set.accuracy || 0) >= 70 ? 'border-amber-600 dark:border-amber-500' : 'border-amber-800/30 dark:border-amber-700/30'
            }`}
          ></div>
        </div>
        
        {/* Completion Markers */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * 2 * Math.PI
            const radius = 45
            const x = 60 + radius * Math.cos(angle)
            const y = 60 + radius * Math.sin(angle)
            
            const isCompleted = i < ((set.completedCount || 0) / (set.questions?.length || 1)) * 8
            
            return (
              <div 
                key={`marker-${i}`}
                className={`absolute w-2 h-2 rounded-full ${
                  isCompleted ? 'bg-amber-500 dark:bg-amber-400' : 'bg-amber-200/30 dark:bg-amber-700/30'
                }`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              ></div>
            )
          })}
        </div>
        
        {/* Apparatus Info */}
        <div className="mt-3 text-center">
          <div className={`font-medium text-sm truncate max-w-[150px] ${isSelected ? 'text-primary' : ''}`}>
            {set.title}
          </div>
          
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {apparatusType} • {set.accuracy || 0}% efficacy
          </div>
        </div>
      </div>
    )
  }
  
  // Group sets by alchemical categories (elements)
  const getAlchemicalCategory = (set: any) => {
    const subject = set.subject || 'Other'
    
    if (subject === 'Math') return 'Fire'
    if (subject === 'Reading') return 'Water'
    if (subject === 'Writing') return 'Air'
    if (subject === 'Science') return 'Earth'
    return 'Quintessence'
  }
  
  const groupedSets = sets.reduce((acc, set) => {
    const category = getAlchemicalCategory(set)
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(set)
    return acc
  }, {} as Record<string, typeof sets>)
  
  // Get visualization type based on alchemical category
  const getCategoryViz = (category: string) => {
    switch (category) {
      case 'Fire':
      case 'Water':
        return 'potion'
      case 'Air':
        return 'scroll'
      case 'Earth':
      case 'Quintessence':
        return 'apparatus'
    }
  }
  
  // Get section style based on alchemical category
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'Fire':
        return 'bg-gradient-to-r from-red-500/5 to-amber-500/5 dark:from-red-800/10 dark:to-amber-800/10'
      case 'Water':
        return 'bg-gradient-to-r from-blue-500/5 to-cyan-500/5 dark:from-blue-800/10 dark:to-cyan-800/10'
      case 'Air':
        return 'bg-gradient-to-r from-indigo-500/5 to-purple-500/5 dark:from-indigo-800/10 dark:to-purple-800/10'
      case 'Earth':
        return 'bg-gradient-to-r from-emerald-500/5 to-teal-500/5 dark:from-emerald-800/10 dark:to-teal-800/10'
      default:
        return 'bg-gradient-to-r from-gray-500/5 to-slate-500/5 dark:from-gray-800/10 dark:to-slate-800/10'
    }
  }
  
  // Get category symbol
  const getCategorySymbol = (category: string) => {
    switch (category) {
      case 'Fire':
        return '△'
      case 'Water':
        return '▽'
      case 'Air':
        return '○'
      case 'Earth':
        return '□'
      default:
        return '☉'
    }
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-center">Alchemy Laboratory</h3>
      
      <div className="bg-amber-50 dark:bg-slate-800/70 rounded-lg p-4 shadow-inner relative overflow-hidden">
        {/* Laboratory decorative elements */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <svg width="100%" height="100%" className="text-amber-900 dark:text-amber-200">
            <pattern id="alchemyPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M30,10 L70,10 M10,30 L30,50 L10,70 M90,30 L70,50 L90,70 M30,90 L70,90 M50,10 L50,90 M10,50 L90,50" 
                stroke="currentColor" 
                strokeWidth="1" 
                fill="none" 
              />
              <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#alchemyPattern)" />
          </svg>
        </div>
        
        {/* Laboratory workbench header */}
        <div className="border-b border-amber-200 dark:border-amber-800/30 pb-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="font-serif text-lg text-amber-900 dark:text-amber-200 flex items-center">
              <span className="mr-2">☽</span>
              <span>Laboratory of Mystical Learning</span>
              <span className="ml-2">☉</span>
            </div>
            
            <div className="font-serif text-amber-800 dark:text-amber-300 text-sm">
              Anno Domini {new Date().getFullYear()}
            </div>
          </div>
        </div>
        
        {/* Alchemical categories */}
        <div className="space-y-8">
          {Object.entries(groupedSets).map(([category, categorySets]) => (
            <div 
              key={category} 
              className={`p-6 rounded-lg border border-amber-200 dark:border-amber-800/50 ${getCategoryStyle(category)}`}
            >
              <h4 className="text-lg font-medium mb-4 font-serif flex items-center">
                <span className="w-6 h-6 flex items-center justify-center border border-amber-400 dark:border-amber-600 rounded-full mr-2 text-amber-700 dark:text-amber-400">
                  {getCategorySymbol(category)}
                </span>
                <span className="text-amber-900 dark:text-amber-200">
                  {category} Element • {categorySets.length} {categorySets.length === 1 ? 'concoction' : 'concoctions'}
                </span>
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {categorySets.map(set => (
                  <div 
                    key={set.id}
                    onClick={() => onSelectSet(set.id)}
                    className="cursor-pointer"
                  >
                    {getCategoryViz(category) === 'potion' && renderPotionFlask(set, set.id === selectedSetId)}
                    {getCategoryViz(category) === 'scroll' && renderScroll(set, set.id === selectedSetId)}
                    {getCategoryViz(category) === 'apparatus' && renderApparatus(set, set.id === selectedSetId)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Alchemical legend */}
        <div className="mt-8 pt-4 border-t border-amber-200 dark:border-amber-800/30">
          <h4 className="text-sm font-medium mb-3 text-center text-amber-900 dark:text-amber-200 font-serif">Alchemical Legend</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="text-xs text-amber-800 dark:text-amber-300">
              <div className="w-full flex justify-center mb-1">
                <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
              </div>
              Mathematics (Fire)
            </div>
            
            <div className="text-xs text-amber-800 dark:text-amber-300">
              <div className="w-full flex justify-center mb-1">
                <div className="w-5 h-5 bg-emerald-400 rounded-full"></div>
              </div>
              Reading (Water)
            </div>
            
            <div className="text-xs text-amber-800 dark:text-amber-300">
              <div className="w-full flex justify-center mb-1">
                <div className="w-5 h-5 bg-amber-400 rounded-full"></div>
              </div>
              Writing (Air)
            </div>
            
            <div className="text-xs text-amber-800 dark:text-amber-300">
              <div className="w-full flex justify-center mb-1">
                <div className="w-5 h-5 bg-violet-400 rounded-full"></div>
              </div>
              Science (Earth)
            </div>
            
            <div className="text-xs text-amber-800 dark:text-amber-300">
              <div className="w-full flex justify-center mb-1">
                <div className="w-5 h-5 bg-rose-400 rounded-full"></div>
              </div>
              Other (Quintessence)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}