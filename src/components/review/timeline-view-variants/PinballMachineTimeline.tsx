'use client'

import React, { useState, useEffect, useRef } from 'react'
import { PracticeSet } from '@/lib/mockData'
import { TimelineViewProps } from './types'
import { format, parseISO, differenceInDays } from 'date-fns'

export const PinballMachineTimeline: React.FC<TimelineViewProps> = ({
  practiceSets,
  onSelectSet,
  selectedSetId
}) => {
  const [groupedSets, setGroupedSets] = useState<Record<string, PracticeSet[]>>({})
  const [hoverSetId, setHoverSetId] = useState<string | null>(null)
  const [activeMonths, setActiveMonths] = useState<string[]>([])
  const [ballPosition, setBallPosition] = useState<{ x: number, y: number } | null>(null)
  const [ballAnimation, setBallAnimation] = useState<boolean>(false)
  const [ballPath, setBallPath] = useState<{ x: number, y: number }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

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
    
    setGroupedSets(grouped)
    
    // Set most recent month as active by default
    if (Object.keys(grouped).length > 0) {
      setActiveMonths([Object.keys(grouped)[Object.keys(grouped).length - 1]])
    }
  }, [practiceSets])

  // Get subject-specific styles
  const getSubjectStyles = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          bg: 'bg-blue-500',
          text: 'text-blue-500 dark:text-blue-400',
          border: 'border-blue-500',
          light: 'bg-blue-100 dark:bg-blue-900/30',
          gradient: 'from-blue-500 to-blue-600',
          shadow: 'shadow-blue-500/20',
          glow: 'shadow-blue-500/40',
          ballColor: '#3b82f6',
          bumperColor: 'from-blue-400 to-blue-600'
        }
      case 'Reading':
        return {
          bg: 'bg-emerald-500',
          text: 'text-emerald-500 dark:text-emerald-400',
          border: 'border-emerald-500',
          light: 'bg-emerald-100 dark:bg-emerald-900/30',
          gradient: 'from-emerald-500 to-emerald-600',
          shadow: 'shadow-emerald-500/20',
          glow: 'shadow-emerald-500/40',
          ballColor: '#10b981',
          bumperColor: 'from-emerald-400 to-emerald-600'
        }
      case 'Writing':
        return {
          bg: 'bg-amber-500',
          text: 'text-amber-500 dark:text-amber-400',
          border: 'border-amber-500',
          light: 'bg-amber-100 dark:bg-amber-900/30',
          gradient: 'from-amber-500 to-amber-600',
          shadow: 'shadow-amber-500/20',
          glow: 'shadow-amber-500/40',
          ballColor: '#f59e0b',
          bumperColor: 'from-amber-400 to-amber-600'
        }
      default:
        return {
          bg: 'bg-slate-500',
          text: 'text-slate-500 dark:text-slate-400',
          border: 'border-slate-500',
          light: 'bg-slate-100 dark:bg-slate-800',
          gradient: 'from-slate-500 to-slate-600',
          shadow: 'shadow-slate-500/20',
          glow: 'shadow-slate-500/40',
          ballColor: '#64748b',
          bumperColor: 'from-slate-400 to-slate-600'
        }
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, 'MMM d')
  }

  // Generate a pinball animation path
  const generateBallPath = (startX: number, startY: number, bumperPositions: {x: number, y: number}[], accuracy: number) => {
    const path: {x: number, y: number}[] = [{x: startX, y: startY}]
    let currentX = startX
    let currentY = startY
    
    // Higher accuracy means more controlled ball path (hitting more bumpers)
    const bumperCount = Math.max(2, Math.floor(accuracy / 20))
    
    for (let i = 0; i < bumperCount; i++) {
      // Find nearest bumper
      let nearestBumper = bumperPositions[Math.floor(Math.random() * bumperPositions.length)]
      
      // Add some randomness to the path
      const bezierPoints = []
      const pointCount = Math.floor(Math.random() * 3) + 2
      
      for (let j = 0; j < pointCount; j++) {
        const randomOffsetX = (Math.random() - 0.5) * 50
        const randomOffsetY = (Math.random() - 0.5) * 50
        bezierPoints.push({
          x: currentX + (nearestBumper.x - currentX) * (j+1)/(pointCount+1) + randomOffsetX,
          y: currentY + (nearestBumper.y - currentY) * (j+1)/(pointCount+1) + randomOffsetY
        })
      }
      
      // Add bezier points to path
      path.push(...bezierPoints)
      
      // Add bumper position
      path.push({x: nearestBumper.x, y: nearestBumper.y})
      
      currentX = nearestBumper.x
      currentY = nearestBumper.y
    }
    
    // Add final points leading to the bottom
    const finalPoints = []
    const pointCount = Math.floor(Math.random() * 3) + 2
    
    for (let j = 0; j < pointCount; j++) {
      const randomOffsetX = (Math.random() - 0.5) * 50
      finalPoints.push({
        x: currentX + randomOffsetX,
        y: currentY + (window.innerHeight - currentY) * (j+1)/(pointCount+1)
      })
    }
    
    path.push(...finalPoints)
    
    return path
  }

  // Handle month selection and animate a pinball
  const handleMonthSelect = (month: string) => {
    if (activeMonths.includes(month)) {
      setActiveMonths(activeMonths.filter(m => m !== month))
    } else {
      setActiveMonths([...activeMonths, month])
      
      // Animate a ball dropping from the selected month
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        // Get the month element directly with a more specific selector
        const monthElement = document.querySelector(`.month-selector[data-month="${month}"]`)
        
        if (monthElement) {
          const monthRect = monthElement.getBoundingClientRect()
          const startX = monthRect.left + monthRect.width / 2 - containerRect.left
          const startY = monthRect.bottom - containerRect.top
          
          // Get bumper positions
          const bumperElements = document.querySelectorAll('.pinball-bumper')
          const bumperPositions: {x: number, y: number}[] = []
          
          bumperElements.forEach(el => {
            const rect = el.getBoundingClientRect()
            bumperPositions.push({
              x: rect.left + rect.width / 2 - containerRect.left,
              y: rect.top + rect.height / 2 - containerRect.top
            })
          })
          
          // Generate path
          const avgAccuracy = groupedSets[month].reduce((sum, set) => sum + set.accuracy, 0) / groupedSets[month].length
          const path = generateBallPath(startX, startY, bumperPositions, avgAccuracy)
          
          // Start animation
          setBallPosition({x: startX, y: startY})
          setBallPath(path)
          setBallAnimation(true)
          
          // Animate along path
          let currentPointIndex = 0
          const animationInterval = setInterval(() => {
            if (currentPointIndex < path.length - 1) {
              currentPointIndex++
              setBallPosition(path[currentPointIndex])
            } else {
              clearInterval(animationInterval)
              setTimeout(() => {
                setBallAnimation(false)
                setBallPosition(null)
              }, 500)
            }
          }, 50)
        }
      }
    }
  }

  // Get difficulty-based bumper size
  const getBumperSize = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'w-10 h-10'
      case 'Medium': return 'w-12 h-12'
      case 'Hard': return 'w-14 h-14'
      default: return 'w-12 h-12'
    }
  }

  // Get accuracy-based glow intensity
  const getGlowIntensity = (accuracy: number) => {
    if (accuracy >= 90) return 'shadow-lg animate-glow-strong'
    if (accuracy >= 75) return 'shadow-md animate-glow-medium'
    if (accuracy >= 60) return 'shadow-sm animate-glow-soft'
    return ''
  }
  
  // Get score value based on accuracy
  const getScoreValue = (accuracy: number) => {
    if (accuracy >= 90) return 1000
    if (accuracy >= 80) return 500
    if (accuracy >= 70) return 250
    if (accuracy >= 60) return 100
    return 50
  }
  
  // Get flipper animation state based on selected set
  const getFlipperState = (side: 'left' | 'right') => {
    if (!selectedSetId) return ''
    
    const selectedSet = Object.values(groupedSets).flat().find(set => set.id === selectedSetId)
    if (!selectedSet) return ''
    
    // Animate left flipper for even-numbered sets, right for odd
    const setNumber = parseInt(selectedSet.id.split('-')[1], 10)
    if (side === 'left' && setNumber % 2 === 0) return 'active'
    if (side === 'right' && setNumber % 2 === 1) return 'active'
    
    return ''
  }

  return (
    <div ref={containerRef} className="pinball-machine-timeline relative min-h-[800px] border-4 border-slate-800 dark:border-slate-700 rounded-t-3xl bg-slate-900 dark:bg-slate-950 overflow-hidden pt-16 pb-8 px-4">
      {/* Machine header with title and lights */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-slate-800 dark:bg-black border-b-2 border-slate-700 dark:border-slate-800 flex items-center justify-between px-6">
        <h2 className="text-2xl font-bold text-white font-arcade tracking-wide">TIMELINE PINBALL</h2>
        
        <div className="flex space-x-3">
          {Array.from({length: 5}).map((_, i) => (
            <div 
              key={`light-${i}`} 
              className={`w-4 h-4 rounded-full ${i % 2 === 0 ? 'bg-red-500' : i % 3 === 0 ? 'bg-blue-500' : 'bg-amber-500'} animate-blink-${i+1}`}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Month selectors (launch plungers) */}
      <div className="month-selectors absolute top-20 right-4 flex flex-col space-y-3 z-20">
        {Object.keys(groupedSets).map(month => (
          <div 
            key={month}
            data-month={month}
            className={`month-selector relative px-3 py-2 rounded bg-slate-800 dark:bg-slate-900 border-2 
              ${activeMonths.includes(month) ? 'border-amber-500 text-amber-500' : 'border-slate-700 text-slate-400'} 
              cursor-pointer transition-all duration-300 hover:border-amber-400 hover:text-amber-400`}
            onClick={() => handleMonthSelect(month)}
          >
            <div className="text-sm font-medium">{month}</div>
            <div className="text-xs mt-1">
              {groupedSets[month].length} sessions
            </div>
            {/* Plunger */}
            <div className={`absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-12 bg-red-600 rounded-l-md transition-transform duration-300
              ${activeMonths.includes(month) ? 'transform -translate-x-1' : 'transform translate-x-0'}`}>
              <div className="absolute top-0 left-0 right-0 h-2 bg-red-400 rounded-tl-md"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scoreboard */}
      <div className="scoreboard absolute top-20 left-4 bg-black border-2 border-slate-700 rounded px-4 py-2 font-arcade">
        <div className="text-amber-500 text-xs mb-1">SCORE</div>
        <div className="text-red-500 text-2xl">
          {Object.values(groupedSets)
            .flat()
            .filter(set => activeMonths.includes(format(parseISO(set.dateCompleted), 'MMMM yyyy')))
            .reduce((sum, set) => sum + getScoreValue(set.accuracy), 0)
            .toString()
            .padStart(8, '0')}
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm border border-slate-700 rounded-lg p-2 flex items-center space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
          <span className="text-xs text-slate-300">Math</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></div>
          <span className="text-xs text-slate-300">Reading</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
          <span className="text-xs text-slate-300">Writing</span>
        </div>
      </div>
      
      {/* Pinball playfield */}
      <div className="pinball-playfield relative mt-12 mb-24 mx-auto max-w-4xl min-h-[500px] bg-slate-950 rounded-lg border border-slate-800">
        {/* Practice sets as bumpers */}
        <div className="bumpers-container relative p-8">
          {Object.entries(groupedSets).map(([month, sets]) => (
            <React.Fragment key={month}>
              {activeMonths.includes(month) && sets.map((set, index) => {
                const styles = getSubjectStyles(set.subject)
                const isSelected = set.id === selectedSetId
                const isHovered = set.id === hoverSetId
                const bumperSize = getBumperSize(set.difficulty)
                const glowClass = getGlowIntensity(set.accuracy)
                
                // Position bumpers in a grid-like pattern with some randomness
                const row = Math.floor(index / 3)
                const col = index % 3
                const baseX = col * 33 + 16 // percentage
                const baseY = row * 100 + 15 // pixels
                const randomX = Math.random() * 10 - 5 // +/- 5% random offset
                const randomY = Math.random() * 20 - 10 // +/- 10px random offset
                const posX = baseX + randomX
                const posY = baseY + randomY
                
                return (
                  <div
                    key={set.id}
                    className={`pinball-bumper absolute ${bumperSize} rounded-full cursor-pointer transition-all duration-300
                      ${isSelected || isHovered ? 'scale-110 z-10' : 'scale-100 z-0'}
                      ${glowClass}`}
                    style={{ 
                      left: `${posX}%`, 
                      top: `${posY}px`,
                      boxShadow: `0 0 8px 2px ${styles.ballColor}40`
                    }}
                    onClick={() => onSelectSet?.(set.id)}
                    onMouseEnter={() => setHoverSetId(set.id)}
                    onMouseLeave={() => setHoverSetId(null)}
                  >
                    {/* Bumper inner */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${styles.bumperColor} overflow-hidden`}>
                      {/* Bumper shine */}
                      <div className="absolute top-0 left-1/4 right-1/4 h-1/4 bg-white/30 rounded-b-full"></div>
                      
                      {/* Score value */}
                      <div className="absolute inset-0 flex items-center justify-center text-white font-arcade text-sm">
                        {getScoreValue(set.accuracy)}
                      </div>
                    </div>
                    
                    {/* Score value popup on selection */}
                    {isSelected && (
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-yellow-400 px-3 py-1 rounded font-arcade animate-bounce-once">
                        {getScoreValue(set.accuracy)} PTS!
                      </div>
                    )}
                    
                    {/* Info popup on hover */}
                    {(isHovered || isSelected) && (
                      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 bg-black/80 border border-slate-700 rounded p-2 text-sm z-20">
                        <div className="text-white">{set.subject}: {set.type}</div>
                        <div className="text-slate-300 text-xs">{formatDate(set.dateCompleted)}</div>
                        <div className="flex justify-between mt-1">
                          <span className="text-slate-400 text-xs">Accuracy</span>
                          <span className="text-white text-xs">{set.accuracy}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
        
        {/* Pinball flippers */}
        <div className="flippers-container absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="relative w-64 h-24">
            {/* Left flipper */}
            <div className={`flipper-left absolute bottom-0 left-0 w-24 h-10 origin-bottom-left ${getFlipperState('left')}`}>
              <div className="h-full rounded-r-full bg-red-600"></div>
            </div>
            
            {/* Right flipper */}
            <div className={`flipper-right absolute bottom-0 right-0 w-24 h-10 origin-bottom-right ${getFlipperState('right')}`}>
              <div className="h-full rounded-l-full bg-red-600"></div>
            </div>
          </div>
        </div>
        
        {/* Animations and effects */}
        {ballAnimation && ballPosition && (
          <div 
            className="absolute w-6 h-6 rounded-full z-30 transition-all duration-100 ease-in-out shadow-md"
            style={{ 
              left: `${ballPosition.x - 12}px`, 
              top: `${ballPosition.y - 12}px`,
              background: selectedSetId 
                ? (Object.values(groupedSets).flat().find(set => set.id === selectedSetId)?.subject === 'Math' 
                  ? '#3b82f6' : Object.values(groupedSets).flat().find(set => set.id === selectedSetId)?.subject === 'Reading'
                  ? '#10b981' : '#f59e0b') 
                : '#f59e0b'
            }}
          >
            {/* Ball shine */}
            <div className="absolute top-0 left-1/4 right-1/4 h-1/4 bg-white/30 rounded-b-full"></div>
          </div>
        )}
      </div>
      
      {/* Detail panel when a set is selected */}
      {selectedSetId && (
        <div className="details-panel mx-auto max-w-4xl bg-black border-2 border-slate-700 rounded-lg p-4 font-arcade">
          {Object.values(groupedSets).flat().filter(set => set.id === selectedSetId).map(set => {
            const styles = getSubjectStyles(set.subject)
            
            return (
              <div key={`detail-${set.id}`} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <div className={`text-lg ${styles.text} mb-1`}>{set.subject}: {set.type}</div>
                  <div className="text-slate-400 text-sm">{formatDate(set.dateCompleted)}</div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <div className="text-slate-500 text-xs">BONUS</div>
                      <div className="text-white">{getScoreValue(set.accuracy)}</div>
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <div className="text-slate-500 text-xs">ACCURACY</div>
                      <div className="text-white">{set.accuracy}%</div>
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <div className="text-slate-500 text-xs">BALLS</div>
                      <div className="text-white">{set.questions.length}</div>
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <div className="text-slate-500 text-xs">DIFFICULTY</div>
                      <div className="text-white">{set.difficulty}</div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <div className="text-white text-sm mb-3">ROUND STATISTICS</div>
                  
                  <div className="bg-slate-900 p-3 rounded border border-slate-800 grid grid-cols-3 gap-3">
                    <div>
                      <div className="text-slate-500 text-xs">TIME</div>
                      <div className="text-white">{Math.floor(set.timeUsed / 60)} min</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">PACE</div>
                      <div className="text-white">{set.pace}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 text-xs">PLAYTIME</div>
                      <div className="text-white">{set.timeOfDay}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <div className="text-slate-500 text-xs">CONCEPT MISS</div>
                      <div className="text-red-500">{set.mistakeTypes.conceptual}</div>
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <div className="text-slate-500 text-xs">CARELESS</div>
                      <div className="text-amber-500">{set.mistakeTypes.careless}</div>
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                      <div className="text-slate-500 text-xs">TIME MISS</div>
                      <div className="text-blue-500">{set.mistakeTypes.timeManagement}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 bg-slate-900 p-3 rounded border border-slate-800">
                    <div className="flex justify-between mb-2">
                      <div className="text-slate-500 text-xs">PERFORMANCE</div>
                      <div className="text-white text-xs">
                        {set.accuracy >= 90 ? 'HIGH SCORE!' : 
                         set.accuracy >= 75 ? 'GREAT GAME!' : 
                         set.accuracy >= 60 ? 'GOOD GAME' : 
                         'TRY AGAIN'}
                      </div>
                    </div>
                    
                    <div className="relative h-4 bg-slate-800 rounded overflow-hidden">
                      <div 
                        className={`h-full ${styles.bg}`}
                        style={{ width: `${set.accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      {/* CSS for animations */}
      <style jsx>{`
        @font-face {
          font-family: 'ArcadeClassic';
          src: url('https://cdn.jsdelivr.net/npm/@fontsource/press-start-2p@4.5.0/files/press-start-2p-cyrillic-ext-400-normal.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        
        .font-arcade {
          font-family: 'ArcadeClassic', monospace;
          letter-spacing: 1px;
        }
        
        @keyframes blink-1 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes blink-2 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes blink-3 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes blink-4 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes blink-5 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        .animate-blink-1 {
          animation: blink-1 1s ease-in-out infinite;
        }
        
        .animate-blink-2 {
          animation: blink-2 1.3s ease-in-out infinite;
        }
        
        .animate-blink-3 {
          animation: blink-3 0.8s ease-in-out infinite;
        }
        
        .animate-blink-4 {
          animation: blink-4 1.5s ease-in-out infinite;
        }
        
        .animate-blink-5 {
          animation: blink-5 0.9s ease-in-out infinite;
        }
        
        @keyframes glow-soft {
          0%, 100% { box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.3); }
        }
        
        @keyframes glow-medium {
          0%, 100% { box-shadow: 0 0 8px 2px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: 0 0 12px 3px rgba(255, 255, 255, 0.4); }
        }
        
        @keyframes glow-strong {
          0%, 100% { box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.4); }
          50% { box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.6); }
        }
        
        .animate-glow-soft {
          animation: glow-soft 2s ease-in-out infinite;
        }
        
        .animate-glow-medium {
          animation: glow-medium 1.5s ease-in-out infinite;
        }
        
        .animate-glow-strong {
          animation: glow-strong 1s ease-in-out infinite;
        }
        
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        
        .animate-bounce-once {
          animation: bounce-once 0.5s ease-out;
        }
        
        .flipper-left, .flipper-right {
          transition: transform 0.2s ease-in-out;
        }
        
        .flipper-left.active {
          transform: rotate(-30deg);
        }
        
        .flipper-right.active {
          transform: rotate(30deg);
        }
      `}</style>
    </div>
  )
}