'use client'

import { useMemo } from 'react'
import { PracticeSet } from '@/lib/mockData'

interface StudyStreakProps {
  practiceSets: PracticeSet[]
}

// Helper function to get day of week (0-6, where 0 is Sunday)
const getDayOfWeek = (dateString: string): number => {
  return new Date(dateString).getDay()
}

// Helper function to get study dates as a simple object
const getStudyDates = (practiceSets: PracticeSet[]): Record<string, number> => {
  const dateMap: Record<string, number> = {}
  
  practiceSets.forEach(set => {
    const date = new Date(set.dateCompleted)
    const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    
    if (dateMap[dateKey]) {
      dateMap[dateKey]++
    } else {
      dateMap[dateKey] = 1
    }
  })
  
  return dateMap
}

export function StudyStreak({ practiceSets }: StudyStreakProps) {
  // Calculate current streak and statistics
  const { 
    currentStreak, 
    longestStreak,
    totalDays,
    weekdayDistribution,
    timeOfDayDistribution,
    idealStudyTime
  } = useMemo(() => {
    if (!practiceSets.length) {
      return { 
        currentStreak: 0, 
        longestStreak: 0,
        totalDays: 0,
        weekdayDistribution: Array(7).fill(0),
        timeOfDayDistribution: { Morning: 0, Afternoon: 0, Evening: 0 },
        idealStudyTime: 'N/A'
      }
    }
    
    // Get unique study dates
    const studyDates = getStudyDates(practiceSets)
    const uniqueDates = Object.keys(studyDates).sort()
    
    // Calculate total study days
    const totalDays = uniqueDates.length
    
    // Calculate current streak
    let currentStreak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    let checkDate = new Date(today)
    
    // Check today
    const todayKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    let foundToday = studyDates[todayKey] > 0
    
    if (foundToday) {
      currentStreak = 1
    }
    
    // Check previous days
    while (true) {
      // Move to previous day
      checkDate.setDate(checkDate.getDate() - 1)
      const dateKey = `${checkDate.getFullYear()}-${checkDate.getMonth() + 1}-${checkDate.getDate()}`
      
      // If we found today, or if we're continuing a streak
      if ((foundToday || currentStreak > 0) && studyDates[dateKey] > 0) {
        currentStreak++
      } else if (currentStreak > 0 || foundToday) {
        // Break on first gap if we've started counting
        break
      } else if (!foundToday && !studyDates[dateKey]) {
        // If we haven't found today and still finding empty days, continue
        continue
      } else if (!foundToday && studyDates[dateKey]) {
        // If we haven't found today but found a study day
        foundToday = false
        currentStreak = 1
      }
      
      // Safety check - don't go back more than 60 days
      const daysDiff = (today.getTime() - checkDate.getTime()) / (1000 * 3600 * 24)
      if (daysDiff > 60) break
    }
    
    // Calculate longest streak
    let longestStreak = 0
    let tempStreak = 0
    let prevDate: Date | null = null
    
    uniqueDates.forEach(dateStr => {
      const date = new Date(dateStr)
      
      if (prevDate) {
        // Calculate day difference
        const diffDays = Math.round((date.getTime() - prevDate.getTime()) / (1000 * 3600 * 24))
        
        if (diffDays === 1) {
          // Consecutive day
          tempStreak++
        } else {
          // Break in streak
          longestStreak = Math.max(longestStreak, tempStreak)
          tempStreak = 1
        }
      } else {
        tempStreak = 1
      }
      
      prevDate = date
    })
    
    // Final check for longest streak
    longestStreak = Math.max(longestStreak, tempStreak)
    
    // Calculate weekday distribution
    const weekdayDistribution = Array(7).fill(0)
    practiceSets.forEach(set => {
      const dayOfWeek = getDayOfWeek(set.dateCompleted)
      weekdayDistribution[dayOfWeek]++
    })
    
    // Calculate time of day distribution
    const timeOfDayDistribution = {
      Morning: 0,
      Afternoon: 0,
      Evening: 0
    }
    
    practiceSets.forEach(set => {
      timeOfDayDistribution[set.timeOfDay]++
    })
    
    // Determine ideal study time based on performance
    const timePerformance = {
      Morning: { total: 0, accuracy: 0 },
      Afternoon: { total: 0, accuracy: 0 },
      Evening: { total: 0, accuracy: 0 }
    }
    
    practiceSets.forEach(set => {
      timePerformance[set.timeOfDay].total++
      timePerformance[set.timeOfDay].accuracy += set.accuracy
    })
    
    let bestTime = 'N/A'
    let bestAccuracy = 0
    
    Object.entries(timePerformance).forEach(([time, data]) => {
      if (data.total > 0) {
        const avgAccuracy = data.accuracy / data.total
        if (avgAccuracy > bestAccuracy) {
          bestAccuracy = avgAccuracy
          bestTime = time
        }
      }
    })
    
    return { 
      currentStreak, 
      longestStreak, 
      totalDays,
      weekdayDistribution,
      timeOfDayDistribution,
      idealStudyTime: bestTime
    }
  }, [practiceSets])
  
  // Get day names (starting from Sunday)
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-5 border-b border-slate-200 dark:border-slate-700">
        <h3 className="font-medium text-slate-800 dark:text-white text-lg">Study Habits</h3>
      </div>
      
      <div className="p-5">
        {/* Current streak */}
        <div className="flex items-center justify-center mb-5">
          <div className="text-center">
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Current streak</div>
            <div className="flex items-center justify-center">
              <svg className="h-5 w-5 text-amber-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
              </svg>
              <span className="text-3xl font-bold text-slate-800 dark:text-white">{currentStreak}</span>
              <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">days</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Longest: {longestStreak} days</div>
          </div>
        </div>
        
        {/* Study pattern overview */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Study Days</div>
            <div className="text-xl font-bold text-slate-800 dark:text-white">{totalDays}</div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Ideal Study Time</div>
            <div className="text-xl font-bold text-slate-800 dark:text-white">{idealStudyTime}</div>
          </div>
        </div>
        
        {/* Weekly pattern visualization */}
        <div className="mb-5">
          <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Weekly Pattern</h4>
          <div className="flex h-16 items-end justify-between">
            {weekdayDistribution.map((count, i) => {
              // Calculate height percentage (min 5%, max 100%)
              const maxCount = Math.max(...weekdayDistribution)
              const heightPercentage = maxCount > 0 
                ? Math.max(5, Math.round((count / maxCount) * 100))
                : 5
              
              // Determine if this is the most active day
              const isMaxDay = count > 0 && count === maxCount
              
              return (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-full mx-0.5 rounded-t ${
                      isMaxDay ? 'bg-indigo-500 dark:bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                  <div className={`text-xs mt-1 ${
                    isMaxDay ? 'font-medium text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {dayNames[i]}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Time of day distribution */}
        <div>
          <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Time of Day</h4>
          <div className="flex gap-1">
            {Object.entries(timeOfDayDistribution).map(([time, count]) => {
              // Calculate width percentage
              const total = Object.values(timeOfDayDistribution).reduce((sum, c) => sum + c, 0)
              const widthPercentage = total > 0 ? Math.max(5, Math.round((count / total) * 100)) : 0
              
              // Determine colors
              let bgColor = 'bg-slate-300 dark:bg-slate-600'
              if (time === 'Morning') bgColor = 'bg-sky-400 dark:bg-sky-600'
              if (time === 'Afternoon') bgColor = 'bg-amber-400 dark:bg-amber-600'
              if (time === 'Evening') bgColor = 'bg-indigo-400 dark:bg-indigo-600'
              
              return (
                <div 
                  key={time} 
                  className={`h-3 rounded-full ${bgColor}`}
                  style={{ width: `${widthPercentage}%` }}
                  title={`${time}: ${count} sessions (${widthPercentage}%)`}
                ></div>
              )
            })}
          </div>
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1.5">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-sky-400 dark:bg-sky-600 mr-1"></div>
              Morning
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-amber-400 dark:bg-amber-600 mr-1"></div>
              Afternoon
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-indigo-400 dark:bg-indigo-600 mr-1"></div>
              Evening
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 