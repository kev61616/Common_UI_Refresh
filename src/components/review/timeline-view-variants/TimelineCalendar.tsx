'use client';

import { useState } from 'react';
import { TimelineViewProps } from './types';

/**
 * Timeline Calendar (Timeline View Variant 11)
 * Displays practice sets in a calendar grid view with heat map intensity
 */
export function TimelineCalendar({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Find min/max dates to determine date range
  const dateRange = practiceSets.reduce(
    (range, set) => {
      const date = new Date(set.dateCompleted);
      return {
        min: date < range.min ? date : range.min,
        max: date > range.max ? date : range.max
      };
    },
    { min: new Date(), max: new Date(0) }
  );

  // Get the month range for the calendar
  const startDate = new Date(dateRange.min);
  startDate.setDate(1); // First day of month

  const endDate = new Date(dateRange.max);
  endDate.setDate(1);
  endDate.setMonth(endDate.getMonth() + 1); // First day of next month

  // Calculate the number of months to display
  const monthDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
  endDate.getMonth() - startDate.getMonth();

  // Calendar state - which month to focus on
  const [focusMonthOffset, setFocusMonthOffset] = useState(monthDiff - 1); // Start with most recent

  // Calculate the month to display
  const calcMonth = (offset: number) => {
    const month = new Date(startDate);
    month.setMonth(month.getMonth() + offset);
    return month;
  };

  const currentMonth = calcMonth(focusMonthOffset);

  // Generate calendar days for the current month
  const generateCalendarDays = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Determine first day of week (0 = Sunday)
    const startDayOfWeek = firstDay.getDay();

    // Create array of weeks
    const weeks: {
      date: Date | null;
      sets: typeof practiceSets;
      isCurrentMonth: boolean;
    }[][] = [];

    let currentWeek: {
      date: Date | null;
      sets: typeof practiceSets;
      isCurrentMonth: boolean;
    }[] = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      // Show days from previous month
      const prevMonthDate = new Date(year, monthIndex, -startDayOfWeek + i + 1);
      currentWeek.push({
        date: prevMonthDate,
        sets: getPracticeSetsForDate(prevMonthDate),
        isCurrentMonth: false
      });
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      currentWeek.push({
        date,
        sets: getPracticeSetsForDate(date),
        isCurrentMonth: true
      });

      // Start a new week if this is the last day of the week
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Add days from next month to complete the last week
    if (currentWeek.length > 0) {
      const daysToAdd = 7 - currentWeek.length;
      for (let i = 1; i <= daysToAdd; i++) {
        const nextMonthDate = new Date(year, monthIndex + 1, i);
        currentWeek.push({
          date: nextMonthDate,
          sets: getPracticeSetsForDate(nextMonthDate),
          isCurrentMonth: false
        });
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  // Helper to get practice sets for a specific date
  const getPracticeSetsForDate = (date: Date | null) => {
    if (!date) return [];

    return practiceSets.filter((set) => {
      const setDate = new Date(set.dateCompleted);
      return setDate.getFullYear() === date.getFullYear() &&
      setDate.getMonth() === date.getMonth() &&
      setDate.getDate() === date.getDate();
    });
  };

  // Generate calendar
  const calendar = generateCalendarDays(currentMonth);

  // Get all sets for current month
  const monthSets = practiceSets.filter((set) => {
    const setDate = new Date(set.dateCompleted);
    return setDate.getMonth() === currentMonth.getMonth() &&
    setDate.getFullYear() === currentMonth.getFullYear();
  });

  // Calculate statistics for the month
  const monthStats = {
    total: monthSets.length,
    avgAccuracy: monthSets.length > 0 ?
    Math.round(monthSets.reduce((sum, set) => sum + set.accuracy, 0) / monthSets.length) :
    0,
    subjects: monthSets.reduce<Record<string, number>>((acc, set) => {
      acc[set.subject] = (acc[set.subject] || 0) + 1;
      return acc;
    }, {})
  };

  // Get color for date cell based on number of sets and accuracy
  const getDateCellColor = (dateSets: typeof practiceSets) => {
    if (dateSets.length === 0) return 'bg-white dark:bg-slate-800';

    // Calculate average accuracy
    const avgAccuracy = Math.round(dateSets.reduce((sum, set) => sum + set.accuracy, 0) / dateSets.length);

    // Color based on accuracy and intensity based on set count
    const intensity = Math.min(dateSets.length, 5) * 20; // Up to 5 sets = 100% intensity

    if (avgAccuracy >= 85) {
      return `bg-emerald-${intensity} dark:bg-emerald-${900 - intensity} text-white`;
    } else if (avgAccuracy >= 70) {
      return `bg-amber-${intensity} dark:bg-amber-${900 - intensity} ${intensity >= 300 ? 'text-white' : ''}`;
    } else {
      return `bg-rose-${intensity} dark:bg-rose-${900 - intensity} ${intensity >= 200 ? 'text-white' : ''}`;
    }
  };

  // Get summary text for the day
  const getDaySummary = (dateSets: typeof practiceSets) => {
    if (dateSets.length === 0) return "No practice";
    if (dateSets.length === 1) return `1 set: ${dateSets[0].subject}`;

    // Count by subject
    const subjectCounts = dateSets.reduce<Record<string, number>>((acc, set) => {
      acc[set.subject] = (acc[set.subject] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(subjectCounts).
    map(([subject, count]) => `${subject}: ${count}`).
    join(', ');
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="fi_swro">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="c_u6p-w">11. Timeline Calendar</h3>
      
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-6" data-oid="t9c-zoa">
        <button
          onClick={() => setFocusMonthOffset(Math.max(0, focusMonthOffset - 1))}
          disabled={focusMonthOffset === 0}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed" data-oid="ojnofgp">

          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="d4ox0tl">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" data-oid="x.z_p2u" />
          </svg>
        </button>
        
        <h4 className="text-xl font-bold" data-oid="6tcs6_1">
          {currentMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </h4>
        
        <button
          onClick={() => setFocusMonthOffset(Math.min(monthDiff - 1, focusMonthOffset + 1))}
          disabled={focusMonthOffset === monthDiff - 1}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed" data-oid="7kgp9j3">

          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="657:i0k">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" data-oid="m1:ho9p" />
          </svg>
        </button>
      </div>
      
      {/* Month statistics */}
      <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-lg mb-6" data-oid="weyst.0">
        <h5 className="font-bold mb-2" data-oid="d-lascd">Month Summary</h5>
        <div className="grid grid-cols-3 gap-4 mb-2" data-oid="xv5qebe">
          <div data-oid="_4adehd">
            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="9yac4g6">Sets</div>
            <div className="text-lg font-bold" data-oid="otdpur2">{monthStats.total}</div>
          </div>
          <div data-oid="hacrq:2">
            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="d3pztee">Avg. Accuracy</div>
            <div className="text-lg font-bold" data-oid="gahrdda">{monthStats.avgAccuracy}%</div>
          </div>
          <div data-oid="7h2qywd">
            <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="4qd_w-p">Active Days</div>
            <div className="text-lg font-bold" data-oid="r0jaw1f">
              {calendar.flat().filter((day) => day.sets.length > 0 && day.isCurrentMonth).length}
            </div>
          </div>
        </div>
        
        {/* Subject breakdown */}
        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="pa9k9r:">
          {Object.entries(monthStats.subjects).length > 0 ?
          Object.entries(monthStats.subjects).
          map(([subject, count]) => `${subject}: ${count}`).
          join(' • ') :
          'No practice sets this month'}
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden" data-oid="48r-dzc">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 text-center bg-slate-100 dark:bg-slate-800 font-medium text-sm py-2 border-b border-slate-200 dark:border-slate-700" data-oid="3phlq.m">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) =>
          <div key={day} data-oid="bk4sm2j">{day}</div>
          )}
        </div>
        
        {/* Calendar weeks */}
        <div className="bg-white dark:bg-slate-900" data-oid="aanac.z">
          {calendar.map((week, weekIndex) =>
          <div key={weekIndex} className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-700 last:border-b-0" data-oid="l18:w.q">
              {week.map((day, dayIndex) =>
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={`min-h-[80px] p-1 border-r border-slate-200 dark:border-slate-700 last:border-r-0
                            ${!day.isCurrentMonth ? 'text-slate-400 dark:text-slate-600' : ''}`} data-oid="z1h:_r9">

                  {/* Date header */}
                  <div className="text-right text-xs font-medium p-1" data-oid="syqk8iu">
                    {day.date?.getDate()}
                  </div>
                  
                  {/* Set indicators */}
                  {day.sets.length > 0 &&
              <div
                onClick={() => day.sets.length > 0 && onSelectSet(day.sets[0].id)}
                className={`rounded p-1 mt-1 text-xs cursor-pointer transition-colors
                                hover:ring-1 hover:ring-indigo-300 dark:hover:ring-indigo-700
                                ${getDateCellColor(day.sets)}`} data-oid="yzok-1v">

                      <div className="font-bold" data-oid=":p-y_xb">{day.sets.length > 1 ? `${day.sets.length} sets` : '1 set'}</div>
                      <div className="mt-0.5 truncate" data-oid="x7uz-rz">{getDaySummary(day.sets)}</div>
                      {day.sets.some((set) => set.id === selectedSetId) &&
                <div className="mt-1 text-[10px] font-medium bg-white/20 dark:bg-black/20 rounded-sm px-1 py-0.5" data-oid="4yjn6.1">
                          Selected
                        </div>
                }
                    </div>
              }
                </div>
            )}
            </div>
          )}
        </div>
      </div>
      
      {/* Selected set details */}
      {selectedSetId &&
      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700" data-oid="z4c.mpm">
          {(() => {
          const set = practiceSets.find((s) => s.id === selectedSetId);
          if (!set) return null;

          return (
            <>
                <h5 className="font-bold mb-2 flex justify-between" data-oid="xni5-0i">
                  <span data-oid="h3:selc">Selected Set Details</span>
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400" data-oid="g8xupxm">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </span>
                </h5>
                
                <div className="flex justify-between mb-4" data-oid="8hc0gik">
                  <div className={`px-3 py-1 text-sm rounded-full ${
                set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' :
                set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
                'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'}`
                } data-oid="3nt6cep">
                    {set.subject}
                  </div>
                  
                  <div className="text-2xl font-bold" data-oid="jbtjqzj">
                    {set.accuracy}%
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-center mb-2" data-oid="yendp4_">
                  <div className="bg-white dark:bg-slate-900 p-2 rounded" data-oid="we48onx">
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid=".updt3k">Type</div>
                    <div className="font-medium" data-oid="hqgn4:-">{set.type}</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded" data-oid="eirlhdx">
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="83xuxst">Time</div>
                    <div className="font-medium" data-oid="v-s654p">{Math.floor(set.timeUsed / 60)}:{(set.timeUsed % 60).toString().padStart(2, '0')}</div>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2 rounded" data-oid="rpmip_h">
                    <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="aa5dph0">Pace</div>
                    <div className="font-medium" data-oid="vmoe0d2">{set.pace}</div>
                  </div>
                </div>
              </>);

        })()}
        </div>
      }
    </div>);

}