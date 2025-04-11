'use client';

import { useEffect, useState } from 'react';
import { PracticeSet } from '@/lib/mockData';

interface TimelineViewProps {
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
}

/**
 * Timeline Inspired Set View - Calendar-based visualization of practice sets
 * Adapted from TimelineView3 for use as a Set View
 */
export function TimelineInspiredSetView({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    // Default to the month of the most recent practice set, or current month if none
    if (practiceSets.length === 0) return new Date();
    return new Date(Math.max(...practiceSets.map((set) => new Date(set.dateCompleted).getTime())));
  });

  const [hoverSet, setHoverSet] = useState<PracticeSet | null>(null);

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format date for display - MM DD 'YY format
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  // Format date to Mar 16 '25 format
  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(2);
    return `${month} ${day} '${year}`;
  };

  // Group practice sets by date
  const practiceSetsByDate: Record<string, PracticeSet[]> = {};

  practiceSets.forEach((set) => {
    const date = new Date(set.dateCompleted).toISOString().split('T')[0];
    if (!practiceSetsByDate[date]) {
      practiceSetsByDate[date] = [];
    }
    practiceSetsByDate[date].push(set);
  });

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() - 1);
      return newMonth;
    });
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + 1);
      return newMonth;
    });
  };

  // Navigate to current month
  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  // Calculate average accuracy for a day's practice sets
  const getDayAccuracy = (sets: PracticeSet[]) => {
    if (sets.length === 0) return 0;
    return Math.round(sets.reduce((sum, set) => sum + set.accuracy, 0) / sets.length);
  };

  // Get color based on accuracy
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300';
    if (accuracy >= 80) return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400';
    if (accuracy >= 70) return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400';
    if (accuracy >= 60) return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400';
    return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
  };

  // Get subject icons
  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Math':
        return (
          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 text-xs font-medium">
            M
          </span>);

      case 'Reading':
        return (
          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-medium">
            R
          </span>);

      case 'Writing':
        return (
          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 text-xs font-medium">
            W
          </span>);

      default:
        return null;
    }
  };

  // Render calendar
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-28 p-2 border border-slate-200 dark:border-slate-700"></div>
      );
    }

    // Add cells for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const todaySets = practiceSetsByDate[dateString] || [];
      const isToday = new Date().toISOString().split('T')[0] === dateString;

      days.push(
        <div
          key={`day-${day}`}
          className={`min-h-28 p-2 border border-slate-200 dark:border-slate-700 relative ${
          isToday ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`
          }>

          <div className="text-right mb-1">
            <span className={`text-xs font-medium ${
            isToday ? 'bg-blue-500 text-white dark:bg-blue-600 rounded-full w-5 h-5 inline-flex items-center justify-center' : 'text-slate-500 dark:text-slate-400'}`
            }>
              {day}
            </span>
          </div>
          
          {todaySets.length > 0 ?
          <div className="space-y-1">
              {todaySets.length <= 3 ?
            // Show individual practice sets if there are 3 or fewer
            todaySets.map((set) =>
            <div
              key={set.id}
              onClick={() => onSelectSet(set.id)}
              onMouseEnter={() => setHoverSet(set)}
              onMouseLeave={() => setHoverSet(null)}
              className={`text-xs p-1 rounded cursor-pointer transition-colors duration-200 ${
              getAccuracyColor(set.accuracy)} ${

              selectedSetId === set.id ? 'ring-2 ring-sky-500 dark:ring-sky-400' : ''}`
              }>

                    <div className="flex justify-between items-center">
                      <div className="font-medium truncate">{set.subject}</div>
                      <div className="text-[10px]">{set.accuracy}%</div>
                    </div>
                  </div>
            ) :

            // Show summary if there are more than 3
            <div
              className={`text-xs p-1 rounded cursor-pointer ${
              getAccuracyColor(getDayAccuracy(todaySets))}`
              }
              onClick={() => {
                if (todaySets.length > 0) onSelectSet(todaySets[0].id);
              }}
              onMouseEnter={() => setHoverSet(todaySets[0])}
              onMouseLeave={() => setHoverSet(null)}>

                  <div className="flex justify-between items-center">
                    <div className="font-medium">Summary</div>
                    <div className="text-[10px]">{getDayAccuracy(todaySets)}%</div>
                  </div>
                  <div className="flex mt-1 gap-1">
                    {todaySets.some((set) => set.subject === 'Math') && getSubjectIcon('Math')}
                    {todaySets.some((set) => set.subject === 'Reading') && getSubjectIcon('Reading')}
                    {todaySets.some((set) => set.subject === 'Writing') && getSubjectIcon('Writing')}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-600 dark:text-slate-400">
                    {todaySets.length} practice sets
                  </div>
                </div>
            }
            </div> :
          null}
        </div>
      );
    }

    return days;
  };

  // If no practice sets match the filters, show a message
  if (practiceSets.length === 0) {
    return (
      <div className="bg-white text-center py-8 rounded-lg shadow-sm border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
        <p className="text-slate-500 dark:text-slate-400">No practice sets match your filters</p>
      </div>);

  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 relative overflow-hidden dark:bg-slate-800 dark:border-slate-700">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            {formatDate(currentMonth)}
          </span>
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-xs font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg dark:bg-sky-900/30 dark:text-sky-300 dark:hover:bg-sky-900/40">

            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px">
        {/* Weekday headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) =>
        <div
          key={day}
          className="py-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">

            {day}
          </div>
        )}
        
        {/* Calendar days */}
        {renderCalendar()}
      </div>
      
      {/* Practice set hover details */}
      {hoverSet &&
      <div className="absolute bottom-4 right-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-3 min-w-[250px] z-10">
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium text-slate-900 dark:text-white">{hoverSet.subject}</div>
            <div className={`px-2 py-0.5 text-xs rounded-full ${
          hoverSet.accuracy >= 90 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' :
          hoverSet.accuracy >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' :
          'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'}`
          }>
              {hoverSet.accuracy}%
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{hoverSet.type}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Date: {formatShortDate(hoverSet.dateCompleted)}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Time: {formatTime(hoverSet.timeUsed)}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Difficulty: {hoverSet.difficulty}</div>
        </div>
      }
    </div>);

}