'use client'

import React, { useState, useEffect } from 'react'
import { PracticeSet } from '@/lib/mockData'
import { TimelineViewProps } from './types'
import { format, parseISO } from 'date-fns'

export const WeatherPatternTimeline: React.FC<TimelineViewProps> = ({
  practiceSets,
  onSelectSet,
  selectedSetId
}) => {
  const [groupedSets, setGroupedSets] = useState<Record<string, PracticeSet[]>>({})
  const [hoverSetId, setHoverSetId] = useState<string | null>(null)

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
  }, [practiceSets])

  // Get weather condition based on accuracy and difficulty
  const getWeatherCondition = (set: PracticeSet) => {
    if (set.accuracy >= 90) return 'sunny'
    if (set.accuracy >= 75) return 'partly-cloudy'
    if (set.accuracy >= 60) return 'cloudy'
    if (set.accuracy >= 45) return 'rainy'
    return 'stormy'
  }

  // Get temperature based on pace
  const getTemperature = (set: PracticeSet) => {
    if (set.pace === 'Fast') return 'hot'
    if (set.pace === 'Normal') return 'warm'
    return 'cool'
  }

  // Get wind intensity based on number of questions
  const getWindIntensity = (set: PracticeSet) => {
    const count = set.questions.length
    if (count > 25) return 'high'
    if (count > 15) return 'medium'
    return 'low'
  }

  // Get atmosphere based on time of day
  const getAtmosphere = (set: PracticeSet) => {
    return set.timeOfDay.toLowerCase()
  }

  // Get subject-specific color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math': return 'from-blue-500 to-blue-600'
      case 'Reading': return 'from-emerald-500 to-emerald-600'
      case 'Writing': return 'from-amber-500 to-amber-600'
      default: return 'from-slate-500 to-slate-600'
    }
  }

  // Generate weather icon markup
  const getWeatherIcon = (condition: string, temperature: string, windIntensity: string) => {
    let icon = ''
    
    switch (condition) {
      case 'sunny':
        icon = `
          <div class="absolute w-10 h-10 rounded-full bg-yellow-400 shadow-lg animate-pulse-slow"></div>
        `
        break
      case 'partly-cloudy':
        icon = `
          <div class="absolute w-6 h-6 rounded-full bg-yellow-400 -translate-x-4 shadow-lg"></div>
          <div class="absolute w-10 h-5 rounded-full bg-white/90 translate-x-1 shadow-lg"></div>
        `
        break
      case 'cloudy':
        icon = `
          <div class="absolute w-8 h-4 rounded-full bg-white/90 -translate-x-2 shadow-lg"></div>
          <div class="absolute w-10 h-5 rounded-full bg-white/90 translate-x-2 translate-y-2 shadow-lg"></div>
        `
        break
      case 'rainy':
        icon = `
          <div class="absolute w-10 h-4 rounded-full bg-slate-400 shadow-lg"></div>
          <div class="absolute h-5 w-px bg-sky-400 -rotate-15 translate-x-1 translate-y-4 shadow-lg animate-fall-slow"></div>
          <div class="absolute h-5 w-px bg-sky-400 -rotate-15 translate-x-3 translate-y-5 shadow-lg animate-fall-fast"></div>
          <div class="absolute h-5 w-px bg-sky-400 -rotate-15 translate-x-5 translate-y-4 shadow-lg animate-fall-med"></div>
        `
        break
      case 'stormy':
        icon = `
          <div class="absolute w-10 h-5 rounded-full bg-slate-600 shadow-lg"></div>
          <div class="absolute translate-y-1 translate-x-4">
            <svg width="14" height="14" viewBox="0 0 24 24" class="text-yellow-400 animate-flash">
              <path fill="currentColor" d="M11 14.5L7 18.5V16H4L8 12L11 14.5ZM12.5 10L9 13L13 17H16L12.5 10ZM20 10H23L19 14.5L15 11V20H12L16.5 10H20Z" />
            </svg>
          </div>
        `
        break
      default:
        icon = ''
    }
    
    // Add wind effect based on intensity
    if (windIntensity !== 'low') {
      const windLines = windIntensity === 'high' ? 3 : 2
      let windMarkup = ''
      
      for (let i = 0; i < windLines; i++) {
        const length = windIntensity === 'high' ? 12 : 8
        const yOffset = i * 2
        windMarkup += `
          <div class="absolute h-0.5 w-${length} bg-slate-300/50 -translate-x-12 translate-y-${yOffset} animate-wind-${i+1}"></div>
        `
      }
      
      icon += windMarkup
    }
    
    // Add temperature effect
    let temperatureClass = ''
    switch (temperature) {
      case 'hot':
        temperatureClass = 'bg-gradient-to-b from-red-100/10 to-red-300/20'
        break
      case 'warm':
        temperatureClass = 'bg-gradient-to-b from-amber-100/10 to-amber-200/10'
        break
      case 'cool':
        temperatureClass = 'bg-gradient-to-b from-blue-100/10 to-blue-200/10'
        break
      default:
        temperatureClass = ''
    }
    
    return `
      <div class="relative w-16 h-16 flex items-center justify-center ${temperatureClass} rounded-full">
        ${icon}
      </div>
    `
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, 'MMM d')
  }

  // Calculate atmosphere gradient
  const getAtmosphereGradient = (atmosphere: string) => {
    switch (atmosphere) {
      case 'morning': 
        return 'bg-gradient-to-r from-amber-100/30 to-blue-100/30 dark:from-amber-900/20 dark:to-blue-900/20'
      case 'afternoon': 
        return 'bg-gradient-to-r from-blue-100/30 to-sky-100/30 dark:from-blue-900/20 dark:to-sky-900/20'
      case 'evening': 
        return 'bg-gradient-to-r from-indigo-100/30 to-purple-100/30 dark:from-indigo-900/20 dark:to-purple-900/20'
      default: 
        return 'bg-gradient-to-r from-slate-100/30 to-slate-200/30 dark:from-slate-800/20 dark:to-slate-700/20'
    }
  }

  // Render timeline month by month
  return (
    <div className="weather-pattern-timeline space-y-8 pb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Weather Pattern Timeline</h2>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-slate-700 dark:text-slate-300">Math</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
            <span className="text-slate-700 dark:text-slate-300">Reading</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
            <span className="text-slate-700 dark:text-slate-300">Writing</span>
          </div>
        </div>
      </div>
      
      <div className="weather-legend mb-6 grid grid-cols-5 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 mb-2" dangerouslySetInnerHTML={{ __html: getWeatherIcon('sunny', 'warm', 'low') }}></div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Sunny<br/>(90%+ Accuracy)</p>
        </div>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 mb-2" dangerouslySetInnerHTML={{ __html: getWeatherIcon('partly-cloudy', 'warm', 'low') }}></div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Partly Cloudy<br/>(75-89% Accuracy)</p>
        </div>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 mb-2" dangerouslySetInnerHTML={{ __html: getWeatherIcon('cloudy', 'warm', 'low') }}></div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Cloudy<br/>(60-74% Accuracy)</p>
        </div>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 mb-2" dangerouslySetInnerHTML={{ __html: getWeatherIcon('rainy', 'warm', 'low') }}></div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Rainy<br/>(45-59% Accuracy)</p>
        </div>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 mb-2" dangerouslySetInnerHTML={{ __html: getWeatherIcon('stormy', 'warm', 'low') }}></div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Stormy<br/>(&lt;45% Accuracy)</p>
        </div>
      </div>
      
      {Object.entries(groupedSets).map(([month, sets]) => (
        <div key={month} className="month-group">
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 sticky top-0 bg-white dark:bg-slate-900 py-3 z-10">{month}</h3>
          
          <div className="weather-forecast space-y-4 mt-4">
            {sets.map(set => {
              const weatherCondition = getWeatherCondition(set)
              const temperature = getTemperature(set)
              const windIntensity = getWindIntensity(set)
              const atmosphere = getAtmosphere(set)
              const subjectColor = getSubjectColor(set.subject)
              const isSelected = set.id === selectedSetId
              const isHovered = set.id === hoverSetId
              
              return (
                <div 
                  key={set.id}
                  className={`weather-day ${getAtmosphereGradient(atmosphere)} 
                    rounded-xl overflow-hidden transition-all duration-300
                    ${isSelected ? 'border-2 border-blue-500 dark:border-blue-400 shadow-lg scale-102' : 'border border-slate-200 dark:border-slate-700'} 
                    ${isHovered ? 'shadow-md' : ''}
                    cursor-pointer`}
                  onClick={() => onSelectSet?.(set.id)}
                  onMouseEnter={() => setHoverSetId(set.id)}
                  onMouseLeave={() => setHoverSetId(null)}
                >
                  <div className="p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
                    {/* Date */}
                    <div className="date-column text-center">
                      <div className="inline-block bg-white dark:bg-slate-800 px-3 py-2 rounded-lg shadow-sm">
                        <span className="block text-sm font-medium text-slate-500 dark:text-slate-400">
                          {formatDate(set.dateCompleted)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Weather visualization */}
                    <div className="weather-column flex items-center space-x-4">
                      <div 
                        className="weather-icon"
                        dangerouslySetInnerHTML={{ __html: getWeatherIcon(weatherCondition, temperature, windIntensity) }}
                      ></div>
                      
                      <div className="weather-details">
                        <h4 className="text-md font-medium text-slate-800 dark:text-slate-200">
                          {set.subject}: {set.type}
                        </h4>
                        <div className="mt-1 flex items-center space-x-4">
                          <div className="flex items-center">
                            <span className="text-xs text-slate-600 dark:text-slate-400 mr-1">Accuracy</span>
                            <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${subjectColor}`}
                                style={{ width: `${set.accuracy}%` }}
                              ></div>
                            </div>
                            <span className="ml-1 text-xs font-medium text-slate-700 dark:text-slate-300">{set.accuracy}%</span>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="text-xs text-slate-600 dark:text-slate-400 mr-1">Questions</span>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{set.questions.length}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="text-xs text-slate-600 dark:text-slate-400 mr-1">Pace</span>
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{set.pace}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Session difficulty */}
                    <div className="difficulty-column">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                        ${set.difficulty === 'Hard' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 
                          set.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'}`}
                      >
                        {set.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  {/* Expanded details when selected */}
                  {isSelected && (
                    <div className="expanded-details p-4 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="stat-box p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                          <h5 className="text-xs font-medium text-slate-500 dark:text-slate-400">Mistake Types</h5>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-slate-600 dark:text-slate-400">Conceptual</span>
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{set.mistakeTypes.conceptual}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-slate-600 dark:text-slate-400">Careless</span>
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{set.mistakeTypes.careless}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-slate-600 dark:text-slate-400">Time Management</span>
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{set.mistakeTypes.timeManagement}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="stat-box p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                          <h5 className="text-xs font-medium text-slate-500 dark:text-slate-400">Performance Trend</h5>
                          <div className="mt-2 space-y-1">
                            <div className="performance-chart h-10 relative">
                              <div className="absolute inset-0 flex items-end">
                                <div className="h-full w-1/4 flex flex-col justify-end">
                                  <div 
                                    className={`w-full bg-gradient-to-t ${subjectColor} rounded-t-sm`}
                                    style={{ height: `${set.sessionFatigue.earlyAccuracy}%` }}
                                  ></div>
                                </div>
                                <div className="h-full w-1/4 flex flex-col justify-end">
                                  <div 
                                    className={`w-full bg-gradient-to-t ${subjectColor} rounded-t-sm opacity-90`}
                                    style={{ height: `${set.sessionFatigue.earlyAccuracy * 0.9}%` }}
                                  ></div>
                                </div>
                                <div className="h-full w-1/4 flex flex-col justify-end">
                                  <div 
                                    className={`w-full bg-gradient-to-t ${subjectColor} rounded-t-sm opacity-80`}
                                    style={{ height: `${set.sessionFatigue.lateAccuracy * 1.1}%` }}
                                  ></div>
                                </div>
                                <div className="h-full w-1/4 flex flex-col justify-end">
                                  <div 
                                    className={`w-full bg-gradient-to-t ${subjectColor} rounded-t-sm opacity-70`}
                                    style={{ height: `${set.sessionFatigue.lateAccuracy}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                              <span>Beginning</span>
                              <span>End</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="stat-box p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                          <h5 className="text-xs font-medium text-slate-500 dark:text-slate-400">Time & Pace</h5>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-slate-600 dark:text-slate-400">Total Time</span>
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                {Math.floor(set.timeUsed / 60)} minutes
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-slate-600 dark:text-slate-400">Avg. Per Question</span>
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                {Math.round(set.timeUsed / set.questions.length)} seconds
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-slate-600 dark:text-slate-400">Period of Day</span>
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                {set.timeOfDay}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="weather-forecast mt-3 text-xs text-center text-slate-600 dark:text-slate-400">
                        {weatherCondition === 'sunny' && "Clear skies indicate excellent performance!"}
                        {weatherCondition === 'partly-cloudy' && "A few clouds but overall good conditions."}
                        {weatherCondition === 'cloudy' && "Overcast performance with room for improvement."}
                        {weatherCondition === 'rainy' && "Challenging session with several areas to review."}
                        {weatherCondition === 'stormy' && "Difficult session requiring significant review."}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
      
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes fall-slow {
          0% { transform: translateY(0) rotate(-15deg); opacity: 0.7; }
          100% { transform: translateY(10px) rotate(-15deg); opacity: 0; }
        }
        
        @keyframes fall-med {
          0% { transform: translateY(0) rotate(-15deg); opacity: 0.7; }
          100% { transform: translateY(10px) rotate(-15deg); opacity: 0; }
        }
        
        @keyframes fall-fast {
          0% { transform: translateY(0) rotate(-15deg); opacity: 0.7; }
          100% { transform: translateY(10px) rotate(-15deg); opacity: 0; }
        }
        
        @keyframes flash {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes wind-1 {
          0% { transform: translateX(-48px) translateY(0); }
          100% { transform: translateX(-24px) translateY(0); opacity: 0; }
        }
        
        @keyframes wind-2 {
          0% { transform: translateX(-48px) translateY(2px); }
          100% { transform: translateX(-24px) translateY(2px); opacity: 0; }
        }
        
        @keyframes wind-3 {
          0% { transform: translateX(-48px) translateY(4px); }
          100% { transform: translateX(-24px) translateY(4px); opacity: 0; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-fall-slow {
          animation: fall-slow 2s ease-in infinite;
        }
        
        .animate-fall-med {
          animation: fall-med 1.5s ease-in infinite;
          animation-delay: 0.5s;
        }
        
        .animate-fall-fast {
          animation: fall-fast 1s ease-in infinite;
          animation-delay: 0.3s;
        }
        
        .animate-flash {
          animation: flash 1s ease-in-out infinite;
        }
        
        .animate-wind-1 {
          animation: wind-1 2s linear infinite;
        }
        
        .animate-wind-2 {
          animation: wind-2 2s linear infinite;
          animation-delay: 0.5s;
        }
        
        .animate-wind-3 {
          animation: wind-3 2s linear infinite;
          animation-delay: 1s;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        .-rotate-15 {
          transform: rotate(-15deg);
        }
      `}</style>
    </div>
  )
}