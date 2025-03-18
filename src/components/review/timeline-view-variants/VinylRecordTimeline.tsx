'use client'

import React, { useState, useEffect } from 'react'
import { PracticeSet } from '@/lib/mockData'
import { TimelineViewProps } from './types'
import { format, parseISO, differenceInDays } from 'date-fns'

export const VinylRecordTimeline: React.FC<TimelineViewProps> = ({
  practiceSets,
  onSelectSet,
  selectedSetId
}) => {
  const [groupedSets, setGroupedSets] = useState<Record<string, PracticeSet[]>>({})
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const [hoverSetId, setHoverSetId] = useState<string | null>(null)
  const [rotationAngles, setRotationAngles] = useState<Record<string, number>>({})
  const [playingRecord, setPlayingRecord] = useState<string | null>(null)

  // Group practice sets by month
  useEffect(() => {
    const grouped: Record<string, PracticeSet[]> = {}
    
    practiceSets.forEach(set => {
      const date = parseISO(set.dateCompleted)
      const monthYear = format(date, 'MMMM yyyy')
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = []
      }
      
      grouped[monthYear].push(set)
    })
    
    // Set initial rotation angles at 0
    const initialAngles: Record<string, number> = {}
    Object.keys(grouped).forEach(month => {
      initialAngles[month] = 0
    })
    
    setRotationAngles(initialAngles)
    setGroupedSets(grouped)
    
    // Select the month with the most recent practice set by default
    if (Object.keys(grouped).length > 0) {
      const months = Object.keys(grouped)
      const mostRecentMonth = months[months.length - 1]
      setSelectedMonth(mostRecentMonth)
    }
  }, [practiceSets])

  // Rotate record when playing
  useEffect(() => {
    if (playingRecord) {
      const interval = setInterval(() => {
        setRotationAngles(prev => ({
          ...prev,
          [playingRecord]: (prev[playingRecord] + 1) % 360
        }))
      }, 50)
      
      return () => clearInterval(interval)
    }
  }, [playingRecord])

  // Get subject-specific color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          bg: 'bg-blue-500',
          darkBg: 'dark:bg-blue-600',
          text: 'text-blue-500',
          darkText: 'dark:text-blue-400',
          lightBg: 'bg-blue-100',
          darkLightBg: 'dark:bg-blue-900/20',
          border: 'border-blue-400',
          darkBorder: 'dark:border-blue-600',
          vinyl: 'from-blue-900 to-blue-950',
          label: 'from-blue-200 to-blue-300',
          gradient: 'from-blue-400/20 to-blue-500/50',
          glow: 'shadow-blue-500/20',
          arm: '#3b82f6'
        }
      case 'Reading':
        return {
          bg: 'bg-emerald-500',
          darkBg: 'dark:bg-emerald-600',
          text: 'text-emerald-500',
          darkText: 'dark:text-emerald-400',
          lightBg: 'bg-emerald-100',
          darkLightBg: 'dark:bg-emerald-900/20',
          border: 'border-emerald-400',
          darkBorder: 'dark:border-emerald-600',
          vinyl: 'from-emerald-900 to-emerald-950',
          label: 'from-emerald-200 to-emerald-300',
          gradient: 'from-emerald-400/20 to-emerald-500/50',
          glow: 'shadow-emerald-500/20',
          arm: '#10b981'
        }
      case 'Writing':
        return {
          bg: 'bg-amber-500',
          darkBg: 'dark:bg-amber-600',
          text: 'text-amber-500',
          darkText: 'dark:text-amber-400',
          lightBg: 'bg-amber-100',
          darkLightBg: 'dark:bg-amber-900/20',
          border: 'border-amber-400',
          darkBorder: 'dark:border-amber-600',
          vinyl: 'from-amber-900 to-amber-950',
          label: 'from-amber-200 to-amber-300',
          gradient: 'from-amber-400/20 to-amber-500/50',
          glow: 'shadow-amber-500/20',
          arm: '#f59e0b'
        }
      default:
        return {
          bg: 'bg-slate-500',
          darkBg: 'dark:bg-slate-600',
          text: 'text-slate-500',
          darkText: 'dark:text-slate-400',
          lightBg: 'bg-slate-100',
          darkLightBg: 'dark:bg-slate-900/20',
          border: 'border-slate-400',
          darkBorder: 'dark:border-slate-600',
          vinyl: 'from-slate-800 to-slate-950',
          label: 'from-slate-200 to-slate-300',
          gradient: 'from-slate-400/20 to-slate-500/50',
          glow: 'shadow-slate-500/20',
          arm: '#64748b'
        }
    }
  }

  // Calculate track position on vinyl record
  const calculateTrackPosition = (index: number, total: number, radius: number) => {
    // Position sets from inner radius (40%) to outer radius (95%)
    const minRadius = radius * 0.4
    const maxRadius = radius * 0.95
    
    // Calculate position based on index
    const trackRadius = minRadius + ((maxRadius - minRadius) * (index / (total || 1)))
    
    return trackRadius
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, 'MMM d')
  }

  // Format month as album title
  const formatAlbumTitle = (month: string) => {
    return `${month} Sessions`
  }

  // Get album flavor text based on overall month performance
  const getAlbumFlavor = (sets: PracticeSet[]) => {
    if (sets.length === 0) return "No tracks recorded"
    
    const avgAccuracy = sets.reduce((sum, set) => sum + set.accuracy, 0) / sets.length
    
    if (avgAccuracy >= 90) return "Platinum Collection"
    if (avgAccuracy >= 80) return "Greatest Hits"
    if (avgAccuracy >= 70) return "Studio Album"
    if (avgAccuracy >= 60) return "Live Recording"
    return "Underground Demo"
  }

  // Get album art pattern based on month performance
  const getAlbumArtPattern = (sets: PracticeSet[]) => {
    if (sets.length === 0) return "album-art-default"
    
    const subjects = sets.map(set => set.subject)
    const uniqueSubjects = Array.from(new Set(subjects))
    
    if (uniqueSubjects.includes('Math') && uniqueSubjects.includes('Reading') && uniqueSubjects.includes('Writing')) {
      return "album-art-mixed"
    }
    
    if (uniqueSubjects.includes('Math')) return "album-art-math"
    if (uniqueSubjects.includes('Reading')) return "album-art-reading"
    if (uniqueSubjects.includes('Writing')) return "album-art-writing"
    
    return "album-art-default"
  }

  // Toggle record play/pause
  const togglePlayRecord = (month: string) => {
    if (playingRecord === month) {
      setPlayingRecord(null)
    } else {
      setPlayingRecord(month)
    }
  }

  return (
    <div className="vinyl-record-timeline pb-4">
      {/* Header with title and legend */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="vinyl-icon w-10 h-10 relative">
            <div className="absolute inset-0 rounded-full bg-black dark:bg-slate-800"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-slate-700 dark:border-slate-400 opacity-60"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Vinyl Record Timeline</h2>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Math</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Reading</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
            <span className="text-sm text-slate-700 dark:text-slate-300">Writing</span>
          </div>
        </div>
      </div>
      
      {/* Album selection */}
      <div className="album-selector mb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Object.entries(groupedSets).map(([month, sets]) => {
          const isSelected = month === selectedMonth
          const isPlaying = month === playingRecord
          const albumPattern = getAlbumArtPattern(sets)
          
          return (
            <div 
              key={month}
              className={`album-cover relative cursor-pointer transition-all duration-300
                ${isSelected ? 'scale-105 shadow-lg' : 'scale-100 shadow'}`}
              onClick={() => setSelectedMonth(month)}
            >
              {/* Album cover */}
              <div className={`aspect-square rounded-md overflow-hidden border border-slate-200 dark:border-slate-700
                ${isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}`}>
                <div className={`w-full h-full ${albumPattern}`}></div>
                
                {/* Album title overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-3">
                  <div className="text-white font-bold leading-tight">{formatAlbumTitle(month)}</div>
                  <div className="text-white/80 text-xs">{getAlbumFlavor(sets)}</div>
                  <div className="text-white/60 text-xs mt-1">{sets.length} tracks</div>
                </div>
              </div>
              
              {/* Play/pause button */}
              <button 
                className={`absolute top-2 right-2 h-8 w-8 rounded-full flex items-center justify-center transition
                  ${isPlaying ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-800'}`}
                onClick={(e) => {
                  e.stopPropagation()
                  togglePlayRecord(month)
                }}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          )
        })}
      </div>
      
      {/* Selected vinyl record and tracks */}
      {selectedMonth && groupedSets[selectedMonth] && (
        <div className="vinyl-player flex flex-col md:flex-row gap-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
          {/* Vinyl record visualization */}
          <div className="vinyl-visual flex-shrink-0 relative w-full md:w-[350px] aspect-square">
            {/* Record player base */}
            <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
            
            {/* Turntable */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-slate-300 dark:bg-slate-600"></div>
            
            {/* Vinyl record */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-gradient-to-br from-slate-800 to-slate-950 transition-transform duration-300"
              style={{ transform: `translate(-50%, -50%) rotate(${rotationAngles[selectedMonth]}deg)` }}
            >
              {/* Grooves */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border border-slate-700 opacity-50"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-slate-700 opacity-50"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border border-slate-700 opacity-50"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full border border-slate-700 opacity-50"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full border border-slate-700 opacity-50"></div>
              
              {/* Practice sets as tracks */}
              {groupedSets[selectedMonth].map((set, index) => {
                const trackRadius = calculateTrackPosition(index, groupedSets[selectedMonth].length, 42.5)
                const trackWidth = 2 + (set.accuracy / 25) // Track width based on accuracy
                const subjectStyle = getSubjectColor(set.subject)
                const isSelected = set.id === selectedSetId
                const isHovered = set.id === hoverSetId
                
                return (
                  <div 
                    key={set.id}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300
                      ${isSelected ? 'ring-2 ring-white dark:ring-blue-400' : ''}
                      pointer-events-none`}
                    style={{ 
                      width: `${trackRadius * 2}%`, 
                      height: `${trackRadius * 2}%`, 
                      boxShadow: isHovered || isSelected ? `0 0 10px ${subjectStyle.arm}` : 'none' 
                    }}
                  >
                    {/* Track groove (semi-circle at session position) */}
                    <div 
                      className={`absolute top-0 left-1/2 -translate-x-1/2 w-${trackWidth} bg-gradient-to-r ${subjectStyle.gradient} overflow-hidden opacity-70`}
                      style={{ 
                        height: `${trackWidth}px`,
                        width: trackWidth,
                        borderRadius: '50%',
                        transformOrigin: 'bottom center',
                        transform: 'rotate(180deg)'
                      }}
                    ></div>
                  </div>
                )
              })}
              
              {/* Label */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center shadow-inner">
                <div className="text-center p-2">
                  <div className="text-sm font-bold text-slate-800 dark:text-white truncate leading-tight">
                    {formatAlbumTitle(selectedMonth)}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-300 mt-1">
                    {getAlbumFlavor(groupedSets[selectedMonth])}
                  </div>
                  <div className="text-[10px] mt-2 text-slate-400 dark:text-slate-400">
                    {groupedSets[selectedMonth].length} tracks
                  </div>
                </div>
              </div>
              
              {/* Center hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5%] h-[5%] rounded-full bg-slate-400 dark:bg-slate-500"></div>
            </div>
            
            {/* Tonearm */}
            {selectedSetId && selectedMonth === playingRecord && groupedSets[selectedMonth].some(set => set.id === selectedSetId) && (
              <>
                {groupedSets[selectedMonth].filter(set => set.id === selectedSetId).map((set, i) => {
                  const index = groupedSets[selectedMonth].findIndex(s => s.id === set.id)
                  const trackRadius = calculateTrackPosition(index, groupedSets[selectedMonth].length, 45)
                  const tonarmX = 50 + (trackRadius * Math.cos((rotationAngles[selectedMonth] * Math.PI) / 180))
                  const tonarmY = 50 + (trackRadius * Math.sin((rotationAngles[selectedMonth] * Math.PI) / 180))
                  const subjectStyle = getSubjectColor(set.subject)
                  
                  return (
                    <svg 
                      key={`tonearm-${set.id}`} 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
                      viewBox="0 0 100 100"
                    >
                      {/* Tonearm base */}
                      <circle cx="85" cy="15" r="3" fill="#64748b" />
                      
                      {/* Tonearm */}
                      <line
                        x1="85"
                        y1="15"
                        x2={tonarmX}
                        y2={tonarmY}
                        stroke={subjectStyle.arm}
                        strokeWidth="1"
                      />
                      
                      {/* Tonearm head */}
                      <circle cx={tonarmX} cy={tonarmY} r="1.5" fill={subjectStyle.arm} />
                    </svg>
                  )
                })}
              </>
            )}
          </div>
          
          {/* Track listing and details */}
          <div className="tracks-panel flex-1">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                {formatAlbumTitle(selectedMonth)}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {getAlbumFlavor(groupedSets[selectedMonth])} • {groupedSets[selectedMonth].length} tracks
              </p>
            </div>
            
            {/* Track list */}
            <div className="track-list space-y-3">
              {groupedSets[selectedMonth].map((set, index) => {
                const isSelected = set.id === selectedSetId
                const isPlaying = isSelected && selectedMonth === playingRecord
                const subjectStyle = getSubjectColor(set.subject)
                
                // Calculate runtime from time used
                const minutes = Math.floor(set.timeUsed / 60)
                const seconds = set.timeUsed % 60
                const runtime = `${minutes}:${seconds.toString().padStart(2, '0')}`
                
                return (
                  <div 
                    key={set.id}
                    className={`track-item p-3 rounded-lg transition-all duration-200 cursor-pointer
                      ${isSelected ? `${subjectStyle.lightBg} ${subjectStyle.darkLightBg} ${subjectStyle.border} ${subjectStyle.darkBorder} border` : 
                                  'hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-transparent'}`}
                    onClick={() => onSelectSet?.(set.id)}
                    onMouseEnter={() => setHoverSetId(set.id)}
                    onMouseLeave={() => setHoverSetId(null)}
                  >
                    <div className="flex items-center">
                      {/* Track number */}
                      <div className={`track-number w-8 h-8 rounded-full flex items-center justify-center mr-3
                        ${isPlaying ? `${subjectStyle.bg} ${subjectStyle.darkBg} text-white` : 
                                    'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                        {isPlaying ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      
                      {/* Track info */}
                      <div className="flex-1">
                        <div className="font-medium text-slate-800 dark:text-white">
                          {set.subject}: {set.type}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {formatDate(set.dateCompleted)} • {set.questions.length} questions • {runtime}
                        </div>
                      </div>
                      
                      {/* Accuracy meter */}
                      <div className="ml-4 flex flex-col items-end">
                        <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                          {set.accuracy}%
                        </div>
                        <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                          <div 
                            className={`h-full ${subjectStyle.bg} ${subjectStyle.darkBg}`}
                            style={{ width: `${set.accuracy}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded details when selected */}
                    {isSelected && (
                      <div className="track-details mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Performance stats */}
                        <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Performance
                          </h4>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="stat-item">
                              <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                              <div className="font-medium text-slate-800 dark:text-white">{set.accuracy}%</div>
                            </div>
                            <div className="stat-item">
                              <div className="text-xs text-slate-500 dark:text-slate-400">Difficulty</div>
                              <div className="font-medium text-slate-800 dark:text-white">{set.difficulty}</div>
                            </div>
                            <div className="stat-item">
                              <div className="text-xs text-slate-500 dark:text-slate-400">Questions</div>
                              <div className="font-medium text-slate-800 dark:text-white">{set.questions.length}</div>
                            </div>
                            <div className="stat-item">
                              <div className="text-xs text-slate-500 dark:text-slate-400">Pace</div>
                              <div className="font-medium text-slate-800 dark:text-white">{set.pace}</div>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Mistakes</div>
                            <div className="flex items-center space-x-2">
                              <div className="px-2 py-1 rounded bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 text-xs">
                                {set.mistakeTypes.conceptual} conceptual
                              </div>
                              <div className="px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 text-xs">
                                {set.mistakeTypes.careless} careless
                              </div>
                              <div className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs">
                                {set.mistakeTypes.timeManagement} time
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Session fatigue */}
                        <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-3">
                          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                            Session Progress
                          </h4>
                          
                          <div className="h-24 relative">
                            {/* Fatigue visualization */}
                            <div className="absolute inset-x-8 inset-y-0">
                              {/* Grid lines */}
                              <div className="absolute top-0 left-0 right-0 h-px bg-slate-200 dark:bg-slate-700"></div>
                              <div className="absolute top-1/3 left-0 right-0 h-px bg-slate-200 dark:bg-slate-700"></div>
                              <div className="absolute top-2/3 left-0 right-0 h-px bg-slate-200 dark:bg-slate-700"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200 dark:bg-slate-700"></div>
                              
                              {/* Early/Late labels */}
                              <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400">
                                Early
                              </div>
                              <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-xs text-slate-500 dark:text-slate-400">
                                Late
                              </div>
                              
                              {/* Fatigue curves */}
                              <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {/* Accuracy line */}
                                <path 
                                  d={`M 0,${100 - set.sessionFatigue.earlyAccuracy} C 50,${100 - (set.sessionFatigue.earlyAccuracy + set.sessionFatigue.lateAccuracy) / 2} 50,${100 - (set.sessionFatigue.earlyAccuracy + set.sessionFatigue.lateAccuracy) / 2} 100,${100 - set.sessionFatigue.lateAccuracy}`} 
                                  stroke={subjectStyle.arm}
                                  strokeWidth="2"
                                  fill="none"
                                />
                                
                                {/* Pace line */}
                                <path 
                                  d={`M 0,${100 - set.sessionFatigue.earlyPace} C 50,${100 - (set.sessionFatigue.earlyPace + set.sessionFatigue.latePace) / 2} 50,${100 - (set.sessionFatigue.earlyPace + set.sessionFatigue.latePace) / 2} 100,${100 - set.sessionFatigue.latePace}`} 
                                  stroke={subjectStyle.arm}
                                  strokeWidth="2"
                                  strokeDasharray="4 2"
                                  fill="none"
                                  opacity="0.6"
                                />
                              </svg>
                            </div>
                          </div>
                          
                          <div className="mt-1 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                            <div className="flex items-center">
                              <div className="w-3 h-1 bg-slate-500 dark:bg-slate-400 mr-1"></div>
                              <span>Accuracy</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-1 bg-slate-500 dark:bg-slate-400 opacity-60 mr-1" style={{ borderStyle: 'dashed' }}></div>
                              <span>Pace</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* CSS for album art patterns */}
      <style jsx>{`
        .album-art-math {
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          background-size: cover;
        }
        
        .album-art-reading {
          background: linear-gradient(135deg, #065f46 0%, #10b981 100%);
          background-size: cover;
        }
        
        .album-art-writing {
          background: linear-gradient(135deg, #92400e 0%, #f59e0b 100%);
          background-size: cover;
        }
        
        .album-art-mixed {
          background: linear-gradient(135deg, #1e40af 0%, #065f46 50%, #92400e 100%);
          background-size: cover;
        }
        
        .album-art-default {
          background: linear-gradient(135deg, #475569 0%, #94a3b8 100%);
          background-size: cover;
        }
        
        .album-art-math::before,
        .album-art-reading::before,
        .album-art-writing::before,
        .album-art-mixed::before,
        .album-art-default::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='0.5'/%3E%3Ccircle cx='10' cy='10' r='0.5'/%3E%3Ccircle cx='30' cy='10' r='0.5'/%3E%3Ccircle cx='10' cy='30' r='0.5'/%3E%3Ccircle cx='30' cy='30' r='0.5'/%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  )
}