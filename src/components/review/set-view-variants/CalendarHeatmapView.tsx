'use client'

import { useState, useMemo } from 'react'
import { SetViewProps } from './types'

/**
 * CalendarHeatmapView - Calendar-based heatmap visualization of practice set performance over time
 * 
 * This component creates a calendar visualization that shows when practice sets were completed
 * and uses color intensity to represent performance metrics (accuracy, difficulty). It helps
 * users identify patterns in their study habits and performance over time.
 */
export function CalendarHeatmapView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  // State for selected filters and view options
  const [selectedSubject, setSelectedSubject] = useState<string | 'all'>('all')
  const [colorMetric, setColorMetric] = useState<'accuracy' | 'difficulty' | 'pace'>('accuracy')
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y'>('3m')
  
  // Get all available subjects
  const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
  
  // Filter practice sets by selected subject
  const filteredSets = useMemo(() => {
    let filtered = [...practiceSets]
    
    // Filter by subject if not 'all'
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(set => set.subject === selectedSubject)
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime())
    
    return filtered
  }, [practiceSets, selectedSubject])
  
  // Calculate date range based on selected time range
  const dateRange = useMemo(() => {
    const today = new Date()
    let startDate: Date
    
    switch (timeRange) {
      case '1m':
        startDate = new Date(today)
        startDate.setMonth(today.getMonth() - 1)
        break
      case '3m':
        startDate = new Date(today)
        startDate.setMonth(today.getMonth() - 3)
        break
      case '6m':
        startDate = new Date(today)
        startDate.setMonth(today.getMonth() - 6)
        break
      case '1y':
        startDate = new Date(today)
        startDate.setFullYear(today.getFullYear() - 1)
        break
    }
    
    // Adjust to start of day for both dates
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(today)
    endDate.setHours(23, 59, 59, 999)
    
    return { startDate, endDate }
  }, [timeRange])
  
  // Generate calendar data
  const calendarData = useMemo(() => {
    const { startDate, endDate } = dateRange
    
    // Filter sets within the date range
    const setsInRange = filteredSets.filter(set => {
      const setDate = new Date(set.dateCompleted)
      return setDate >= startDate && setDate <= endDate
    })
    
    // Generate months
    const months: Array<{
      name: string
      year: number
      month: number
      weeks: Array<{
        weekNum: number
        days: Array<{
          date: Date
          dayOfMonth: number
          isCurrentMonth: boolean
          sets: typeof practiceSets
          intensity: number
        }>
      }>
    }> = []
    
    // Start with the current month at the end date
    let currentDate = new Date(endDate)
    currentDate.setDate(1) // Set to first day of month
    
    // Create months until we're before the start date
    while (currentDate >= startDate) {
      const monthName = currentDate.toLocaleString('default', { month: 'long' })
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth()
      
      // Create weeks for the month
      const weeks: typeof months[number]['weeks'] = []
      
      // Get the first day of the month
      const firstDay = new Date(year, month, 1)
      // Get the last day of the month
      const lastDay = new Date(year, month + 1, 0)
      
      // Start with the first day of the week containing the first day of the month
      let weekStartDate = new Date(firstDay)
      weekStartDate.setDate(firstDay.getDate() - firstDay.getDay()) // Adjust to start of week (Sunday)
      
      let weekNum = 0
      
      // Process each week until we're past the last day of the month
      while (weekStartDate <= lastDay) {
        const days: typeof months[number]['weeks'][number]['days'] = []
        
        // Process 7 days for the week
        for (let i = 0; i < 7; i++) {
          const currentDay = new Date(weekStartDate)
          currentDay.setDate(weekStartDate.getDate() + i)
          
          // Check if this day is in the current month
          const isCurrentMonth = currentDay.getMonth() === month
          
          // Find sets completed on this day
          const daySets = setsInRange.filter(set => {
            const setDate = new Date(set.dateCompleted)
            return (
              setDate.getFullYear() === currentDay.getFullYear() &&
              setDate.getMonth() === currentDay.getMonth() &&
              setDate.getDate() === currentDay.getDate()
            )
          })
          
          // Calculate the intensity value based on the selected metric
          let intensity = 0
          if (daySets.length > 0) {
            if (colorMetric === 'accuracy') {
              // Average accuracy (0-100 range)
              intensity = daySets.reduce((sum, set) => sum + set.accuracy, 0) / daySets.length
              // Normalize to 0-1
              intensity = intensity / 100
            } else if (colorMetric === 'difficulty') {
              // Count of 'Hard' sets as proportion of total
              const hardSets = daySets.filter(set => set.difficulty === 'Hard').length
              intensity = hardSets / daySets.length
            } else if (colorMetric === 'pace') {
              // Count of 'Fast' sets as proportion of total
              const fastSets = daySets.filter(set => set.pace === 'Fast').length
              intensity = fastSets / daySets.length
            }
          }
          
          days.push({
            date: new Date(currentDay),
            dayOfMonth: currentDay.getDate(),
            isCurrentMonth,
            sets: daySets,
            intensity
          })
        }
        
        weeks.push({
          weekNum,
          days
        })
        
        // Move to the next week
        weekStartDate.setDate(weekStartDate.getDate() + 7)
        weekNum++
      }
      
      months.push({
        name: monthName,
        year,
        month,
        weeks
      })
      
      // Move to the previous month
      currentDate.setMonth(currentDate.getMonth() - 1)
    }
    
    return months
  }, [dateRange, filteredSets, colorMetric])
  
  // Get color based on intensity and metric
  const getColorForIntensity = (intensity: number) => {
    if (intensity === 0) return 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
    
    // Different color schemes based on the metric
    if (colorMetric === 'accuracy') {
      // Blue gradient for accuracy (higher is better)
      if (intensity < 0.2) return 'bg-blue-50 dark:bg-blue-900/20'
      if (intensity < 0.4) return 'bg-blue-100 dark:bg-blue-900/30'
      if (intensity < 0.6) return 'bg-blue-200 dark:bg-blue-900/50'
      if (intensity < 0.8) return 'bg-blue-300 dark:bg-blue-900/70'
      return 'bg-blue-400 dark:bg-blue-900/90'
    }
    
    if (colorMetric === 'difficulty') {
      // Purple gradient for difficulty (darker = more difficult)
      if (intensity < 0.2) return 'bg-purple-50 dark:bg-purple-900/20'
      if (intensity < 0.4) return 'bg-purple-100 dark:bg-purple-900/30'
      if (intensity < 0.6) return 'bg-purple-200 dark:bg-purple-900/50'
      if (intensity < 0.8) return 'bg-purple-300 dark:bg-purple-900/70'
      return 'bg-purple-400 dark:bg-purple-900/90'
    }
    
    // Teal gradient for pace (darker = faster pace)
    if (intensity < 0.2) return 'bg-teal-50 dark:bg-teal-900/20'
    if (intensity < 0.4) return 'bg-teal-100 dark:bg-teal-900/30'
    if (intensity < 0.6) return 'bg-teal-200 dark:bg-teal-900/50'
    if (intensity < 0.8) return 'bg-teal-300 dark:bg-teal-900/70'
    return 'bg-teal-400 dark:bg-teal-900/90'
  }
  
  // Helper to format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }
  
  // Get label for selected metric
  const getMetricLabel = () => {
    switch (colorMetric) {
      case 'accuracy': return 'Accuracy'
      case 'difficulty': return 'Difficulty Level'
      case 'pace': return 'Completion Pace'
    }
  }
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm h-full">
      <h3 className="text-xl font-bold mb-4 text-center">Calendar Heatmap View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {/* Subject selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Subject</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value as 'all' | string)}
          >
            <option value="all">All Subjects</option>
            {subjects.map((subject, i) => (
              <option key={i} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        {/* Color metric selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Color By</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={colorMetric}
            onChange={(e) => setColorMetric(e.target.value as 'accuracy' | 'difficulty' | 'pace')}
          >
            <option value="accuracy">Accuracy</option>
            <option value="difficulty">Difficulty</option>
            <option value="pace">Pace</option>
          </select>
        </div>
        
        {/* Time range selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Time Range</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '1m' | '3m' | '6m' | '1y')}
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>
      
      {/* Calendar legend */}
      <div className="mb-4 flex justify-center items-center gap-2">
        <span className="text-sm font-medium">{getMetricLabel()}: </span>
        <div className="flex items-center">
          <span className="w-4 h-4 inline-block bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mr-1"></span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">None</span>
        </div>
        <div className="flex items-center">
          <span className={`w-4 h-4 inline-block ${colorMetric === 'accuracy' ? 'bg-blue-100 dark:bg-blue-900/30' : colorMetric === 'difficulty' ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-teal-100 dark:bg-teal-900/30'} mr-1`}></span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">Low</span>
        </div>
        <div className="flex items-center">
          <span className={`w-4 h-4 inline-block ${colorMetric === 'accuracy' ? 'bg-blue-200 dark:bg-blue-900/50' : colorMetric === 'difficulty' ? 'bg-purple-200 dark:bg-purple-900/50' : 'bg-teal-200 dark:bg-teal-900/50'} mr-1`}></span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">Medium</span>
        </div>
        <div className="flex items-center">
          <span className={`w-4 h-4 inline-block ${colorMetric === 'accuracy' ? 'bg-blue-300 dark:bg-blue-900/70' : colorMetric === 'difficulty' ? 'bg-purple-300 dark:bg-purple-900/70' : 'bg-teal-300 dark:bg-teal-900/70'} mr-1`}></span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mr-2">High</span>
        </div>
        <div className="flex items-center">
          <span className={`w-4 h-4 inline-block ${colorMetric === 'accuracy' ? 'bg-blue-400 dark:bg-blue-900/90' : colorMetric === 'difficulty' ? 'bg-purple-400 dark:bg-purple-900/90' : 'bg-teal-400 dark:bg-teal-900/90'} mr-1`}></span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Very High</span>
        </div>
      </div>
      
      {/* Calendar */}
      <div className="overflow-y-auto max-h-[600px] pr-2">
        {calendarData.length === 0 ? (
          <div className="flex items-center justify-center py-12 bg-white dark:bg-slate-800 rounded-lg">
            <p className="text-slate-500 dark:text-slate-400">No practice sets found in the selected date range.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {calendarData.map((month, monthIndex) => (
              <div key={monthIndex} className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
                <h4 className="font-medium mb-3">{month.name} {month.year}</h4>
                
                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                    <div key={i} className="text-xs text-center font-medium text-slate-500 dark:text-slate-400">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar grid */}
                {month.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
                    {week.days.map((day, dayIndex) => {
                      // Calculate styles based on state
                      const isSelected = day.sets.some(set => set.id === selectedSetId)
                      const hasActivity = day.sets.length > 0
                      
                      return (
                        <div 
                          key={dayIndex}
                          className={`
                            aspect-square rounded-md p-1 flex flex-col items-center justify-center
                            ${!day.isCurrentMonth ? 'opacity-40' : ''}
                            ${hasActivity ? 'cursor-pointer hover:ring-2 hover:ring-slate-300 dark:hover:ring-slate-600' : ''}
                            ${isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
                            ${getColorForIntensity(day.intensity)}
                          `}
                          onClick={() => {
                            if (hasActivity && day.sets[0]) {
                              onSelectSet(day.sets[0].id)
                            }
                          }}
                        >
                          <div className="text-xs font-medium mb-1">{day.dayOfMonth}</div>
                          {hasActivity && (
                            <div className="text-[10px] font-medium">
                              {day.sets.length} {day.sets.length === 1 ? 'set' : 'sets'}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Practice set details for selected day */}
      {selectedSetId && (
        <div className="mt-6 bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
          <h4 className="font-medium mb-3">Selected Practice Set</h4>
          {filteredSets.filter(set => set.id === selectedSetId).map(set => (
            <div key={set.id} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{set.subject} - {set.type}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {formatDate(new Date(set.dateCompleted))}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-mono font-medium text-lg ${
                    set.accuracy >= 80 ? 'text-green-600 dark:text-green-400' :
                    set.accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {set.accuracy}%
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {set.difficulty} · {set.pace} pace
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100 dark:border-slate-700">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Questions</div>
                  <div className="font-medium">{set.questions.length}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Conceptual Errors</div>
                  <div className="font-medium">{set.mistakeTypes.conceptual}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Careless Errors</div>
                  <div className="font-medium">{set.mistakeTypes.careless}</div>
                </div>
              </div>
              
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span>Fatigue Impact:</span>
                  <span className="font-mono">
                    {set.sessionFatigue.earlyAccuracy}% → {set.sessionFatigue.lateAccuracy}%
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all" 
                    style={{ width: `${(set.sessionFatigue.lateAccuracy / set.sessionFatigue.earlyAccuracy) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Instructions */}
      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center">
        <p>Click on a colored day to view details for the practice sets completed on that day.</p>
      </div>
    </div>
  )
}
