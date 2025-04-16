'use client';

import { useState, useEffect } from 'react';
import { ClientOnly, SuppressHydrationWarning } from '@/lib/clientUtils';

interface StudyStreakProps {
  currentStreak?: number;
  longestStreak?: number;
  streakData?: Array<{date: string;completed: boolean;}>;
}

// Static data for server rendering and initial client render
const generateStaticCalendarData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    // Use a fixed date string format that doesn't depend on locale
    date: `2025-03-${String(i + 1).padStart(2, '0')}`,
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
  const [calendarData, setCalendarData] = useState<Array<{date: string;completed: boolean;}>>(streakData);
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
  const monthlyGoalPercentage = Math.min(Math.round(currentStreak / 30 * 100), 100);

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
    <div className="h-full flex flex-col" data-oid="1fl32oh">
      {/* Header with streak badge */}
      <div className="flex items-center justify-end pt-4 pb-2 px-6 border-b border-gray-100 dark:border-slate-700" data-oid="bvwpo-2">
        <div className="bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-medium flex items-center" data-oid="t4_1.3r">
          <span className="mr-1" data-oid="p5u5wor">🔥</span>
          {currentStreak} days
        </div>
      </div>

      {/* Main stats section */}
      <div className="flex justify-between items-center py-8 px-6" data-oid="puq6oy4">
        {/* Current streak */}
        <div className="text-center" data-oid="7j6h7_y">
          <div className="text-5xl font-bold text-orange-500" data-oid="x3aogk0">{currentStreak}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-2" data-oid="-aakg0r">Current Streak</div>
        </div>
        
        {/* Vertical divider */}
        <div className="h-20 w-px bg-slate-200 dark:bg-slate-700" data-oid=":8utn2_"></div>
        
        {/* Longest streak */}
        <div className="text-center" data-oid="v.prrn2">
          <div className="text-5xl font-bold text-slate-700 dark:text-slate-300" data-oid="e64dg.w">{longestStreak}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-2" data-oid="12lvt-2">Longest Streak</div>
        </div>
        
        {/* Vertical divider */}
        <div className="h-20 w-px bg-slate-200 dark:bg-slate-700" data-oid="cx7dhgq"></div>
        
        {/* Monthly goal */}
        <div className="text-center" data-oid="i2z6ft1">
          <div className="relative w-16 h-16 mx-auto" data-oid="kmeau7l">
            <svg className="w-full h-full" viewBox="0 0 36 36" data-oid="8do-4hq">
              {/* Background circle */}
              <circle
                cx="18" cy="18" r="15.5"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
                className="dark:stroke-slate-700" data-oid="4ib5.le">
              </circle>
              
              {/* Progress circle */}
              <circle
                cx="18" cy="18" r="15.5"
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                strokeDasharray="97.5"
                strokeDashoffset={97.5 - 97.5 * monthlyGoalPercentage / 100}
                transform="rotate(-90 18 18)"
                className="transition-all duration-1000 ease-out" data-oid="4t.ffu_">
              </circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-800 dark:text-white" data-oid="h3zpmoz">
              {monthlyGoalPercentage}%
            </div>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-2" data-oid="9yix71o">Monthly Goal</div>
        </div>
      </div>

      {/* Calendar section */}
      <div className="px-6 pb-4" data-oid="uft1bde">
        <h4 className="text-base font-medium text-slate-800 dark:text-slate-200 mb-3" data-oid="f-ot0x:">Last 30 Days</h4>
        
        {/* Weekday headers in a row */}
        <div className="grid grid-cols-7 gap-2 mb-2" data-oid=":t7cqir">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) =>
          <div key={idx} className="flex justify-center" data-oid="zu1-07v">
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400" data-oid="q-sg:6h">
                {day}
              </div>
            </div>
          )}
        </div>
        
        {/* Calendar grid - showing only day numbers with completion status */}
        <div className="grid grid-cols-7 gap-2" data-oid="-05ckzg">
          {calendarData.map((day, idx) => {
            const dayNumber = getDayNumber(day.date);
            const currentIsToday = isToday(day.date);

            // This ensures server and client render the same initial HTML
            return (
              <div key={idx} className="flex justify-center" data-oid=".fm0vim">
                {/* Use SuppressHydrationWarning to handle potential client/server differences */}
                <SuppressHydrationWarning data-oid="xxuvw7_">
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium select-none
                      ${day.completed ?
                    'bg-orange-500 text-white' :
                    'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}
                      ${
                    currentIsToday && isClient ?
                    'ring-2 ring-blue-400 dark:ring-blue-500' :
                    ''}
                    `
                    } data-oid="xh_4ei.">

                    {dayNumber || '-'}
                  </div>
                </SuppressHydrationWarning>
              </div>);

          })}
        </div>
      </div>

      {/* No achievements section as requested */}
    </div>);

}
