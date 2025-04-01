'use client'

import { useState, useEffect } from 'react'

interface StudyStreakProps {
  currentStreak?: number;
  longestStreak?: number;
  streakData?: Array<{date: string, completed: boolean}>;
}

export function StudyStreak({ 
  currentStreak = 5, 
  longestStreak = 14,
  streakData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    completed: Math.random() > 0.3 || i >= 25 // More likely to be completed in recent days
  }))
}: StudyStreakProps) {
  const [animatedStreak, setAnimatedStreak] = useState(0);
  
  // Animate streak counter
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStreak(prev => {
        if (prev < currentStreak) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, [currentStreak]);

  // Get day name (e.g., "Mon", "Tue")
  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 1);
  };

  // Calculate streak percentage for badge display
  const streakPercentage = Math.min((currentStreak / 30) * 100, 100);
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <h3 className="font-medium text-slate-900 dark:text-white">Study Streak</h3>
        <div className="text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
          🔥 {currentStreak} days
        </div>
      </div>
      
      <div className="p-5">
        {/* Streak visualization */}
        <div className="mb-6 relative">
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 dark:text-orange-400 flex items-center">
                <span className="mr-2">{animatedStreak}</span>
                <span className="text-lg">days</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Current Streak</div>
            </div>
            
            <div className="h-12 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-700 dark:text-slate-300 flex items-end">
                <span>{longestStreak}</span>
                <span className="text-sm ml-1 mb-1">days</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Longest Streak</div>
            </div>
            
            <div className="h-12 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
            
            <div className="text-center relative">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl relative"
                style={{
                  background: `conic-gradient(#f97316 ${streakPercentage}%, #e2e8f0 0)`,
                }}
              >
                <div className="absolute inset-1.5 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <span className="text-slate-900 dark:text-white">
                    {Math.round(streakPercentage)}%
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Monthly Goal</div>
            </div>
          </div>
        </div>
        
        {/* Streak calendar */}
        <div>
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Last 30 Days</div>
          <div className="grid grid-cols-15 gap-1 overflow-x-auto pb-2">
            {streakData.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div 
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs
                    ${day.completed 
                      ? 'bg-orange-500 dark:bg-orange-600 text-white' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }
                    ${(new Date(day.date)).toDateString() === new Date().toDateString() 
                      ? 'ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-slate-800' 
                      : ''
                    }
                  `}
                >
                  {getDayName(day.date)}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                  {day.date.split('-')[2]}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Streak badges/awards */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Achievements</div>
          <div className="flex space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-lg">🔥</span>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-lg">⭐</span>
            </div>
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
              <span className="text-slate-400 dark:text-slate-500 text-lg">?</span>
            </div>
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
              <span className="text-slate-400 dark:text-slate-500 text-lg">?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
