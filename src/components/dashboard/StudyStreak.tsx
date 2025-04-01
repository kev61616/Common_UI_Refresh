'use client'

import { useState, useEffect } from 'react'
import { ClientOnly, SuppressHydrationWarning } from '@/lib/clientUtils'

interface StudyStreakProps {
  currentStreak?: number;
  longestStreak?: number;
  streakData?: Array<{date: string, completed: boolean}>;
}

// Static data for server rendering and initial client render
const generateStaticCalendarData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    // Use a fixed date string format that doesn't depend on locale
    date: `2025-03-${String(i+1).padStart(2, '0')}`,
    // Deterministic pattern for completion status
    completed: i % 3 === 0 || i % 5 === 0 || i >= 25
  }));
};

export function StudyStreak({ 
  currentStreak = 5, 
  longestStreak = 14,
  streakData = generateStaticCalendarData()
}: StudyStreakProps) {
  // These states will only be used after hydration
  const [calendarData, setCalendarData] = useState<Array<{date: string, completed: boolean}>>(streakData);
  const [today, setToday] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  // Generate actual data only on client side after hydration
  useEffect(() => {
    setIsClient(true);
    
    // Now it's safe to use the actual current date
    const currentDate = new Date().toISOString().split('T')[0];
    setToday(currentDate);
    
    // Generate streak data based on actual dates
    const data = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      const dateStr = date.toISOString().split('T')[0];
      
      // Generate deterministic completion data based on index
      const completed = i % 3 === 0 || i % 5 === 0 || i >= 25;
      
      return { date: dateStr, completed };
    });
    
    setCalendarData(data);
  }, []);
  
  // Calculate streak percentage for badge display (e.g., 5/30 = 17%)
  const monthlyGoalPercentage = Math.min(Math.round((currentStreak / 30) * 100), 100);
  
  // Get day name without using browser APIs that cause hydration mismatches
  const getDayName = (dateStr: string) => {
    if (!dateStr) return '';
    
    // This mapping always returns consistent results, server or client
    // Date format must be YYYY-MM-DD
    const dayMap = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    try {
      // Use fixed numeric approach to get weekday (0-6)
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const dayIndex = date.getDay(); // 0-6 (Sun-Sat)
      return dayMap[dayIndex];
    } catch (e) {
      return '-';
    }
  };
  
  // Get day number without causing hydration issues
  const getDayNumber = (dateStr: string) => {
    if (!dateStr) return '';
    // This will always return the same value server and client
    return dateStr.split('-')[2] || '';
  };
  
  // Only mark "today" on client-side to avoid hydration mismatch
  const isToday = (dateStr: string) => {
    if (!isClient || !today || !dateStr) return false;
    return dateStr === today;
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Header with streak badge */}
      <div className="flex items-center justify-end pt-4 pb-2 px-6 border-b border-gray-100 dark:border-slate-700">
        <div className="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <span className="mr-1">🔥</span>
          {currentStreak} days
        </div>
      </div>

      {/* Main stats section */}
      <div className="flex justify-between items-center py-8 px-6">
        {/* Current streak */}
        <div className="text-center">
          <div className="text-5xl font-bold text-orange-500">{currentStreak}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">Current Streak</div>
        </div>
        
        {/* Vertical divider */}
        <div className="h-20 w-px bg-slate-200 dark:bg-slate-700"></div>
        
        {/* Longest streak */}
        <div className="text-center">
          <div className="text-5xl font-bold text-slate-700 dark:text-slate-300">{longestStreak}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">Longest Streak</div>
        </div>
        
        {/* Vertical divider */}
        <div className="h-20 w-px bg-slate-200 dark:bg-slate-700"></div>
        
        {/* Monthly goal */}
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              {/* Background circle */}
              <circle 
                cx="18" cy="18" r="15.5" 
                fill="none" 
                stroke="#e2e8f0" 
                strokeWidth="3"
                className="dark:stroke-slate-700"
              ></circle>
              
              {/* Progress circle */}
              <circle 
                cx="18" cy="18" r="15.5" 
                fill="none" 
                stroke="#f97316" 
                strokeWidth="3"
                strokeDasharray="97.5"
                strokeDashoffset={97.5 - (97.5 * monthlyGoalPercentage / 100)}
                transform="rotate(-90 18 18)"
                className="transition-all duration-1000 ease-out"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-800 dark:text-white">
              {monthlyGoalPercentage}%
            </div>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">Monthly Goal</div>
        </div>
      </div>

      {/* Calendar section */}
      <div className="px-6 pb-4">
        <h4 className="text-base font-medium text-slate-800 dark:text-slate-200 mb-3">Last 30 Days</h4>
        
        {/* Weekday headers in a row */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
            <div key={idx} className="flex justify-center">
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {day}
              </div>
            </div>
          ))}
        </div>
        
        {/* Calendar grid - showing only day numbers with completion status */}
        <div className="grid grid-cols-7 gap-2">
          {calendarData.map((day, idx) => {
            const dayNumber = getDayNumber(day.date);
            const currentIsToday = isToday(day.date);

            // This ensures server and client render the same initial HTML
            return (
              <div key={idx} className="flex justify-center">
                {/* Use SuppressHydrationWarning to handle potential client/server differences */}
                <SuppressHydrationWarning>
                  <div 
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium select-none
                      ${day.completed 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }
                      ${currentIsToday && isClient
                        ? 'ring-2 ring-blue-400 dark:ring-blue-500' 
                        : ''
                      }
                    `}
                  >
                    {dayNumber || '-'}
                  </div>
                </SuppressHydrationWarning>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements section */}
      <div className="mt-auto px-6 pt-4 pb-6 border-t border-slate-100 dark:border-slate-700">
        <h4 className="text-base font-medium text-slate-800 dark:text-slate-200 mb-3">Achievements</h4>
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white text-lg">🔥</span>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white text-lg">⭐</span>
          </div>
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
            <span className="text-slate-400 dark:text-slate-500 text-xl">?</span>
          </div>
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
            <span className="text-slate-400 dark:text-slate-500 text-xl">?</span>
          </div>
        </div>
      </div>
    </div>
  )
}
