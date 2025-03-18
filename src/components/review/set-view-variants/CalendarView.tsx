'use client'

import { SetViewProps } from './types'

export function CalendarView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">5. Calendar View</h3>
      <div className="grid grid-cols-7 gap-1">
        {/* Calendar header */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-sm py-2">{day}</div>
        ))}
        
        {/* Calendar days with practice indicators */}
        {Array.from({ length: 35 }, (_, i) => {
          const hasActivity = Math.random() > 0.65;
          return (
            <div 
              key={i} 
              className={`aspect-square border rounded flex flex-col items-center justify-center relative cursor-pointer
                        ${hasActivity ? 'bg-sky-50 dark:bg-sky-900/30 hover:bg-sky-100 dark:hover:bg-sky-800/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}
            >
              <span className="text-sm">{i + 1}</span>
              {hasActivity && (
                <div className="absolute bottom-1 flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                  <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
                  <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Sample sets below calendar */}
      <div className="mt-6 space-y-2">
        {practiceSets.slice(0, 3).map(set => (
          <div 
            key={set.id}
            onClick={() => onSelectSet && onSelectSet(set.id)}
            className={`p-3 rounded-lg border cursor-pointer transition-all 
                       ${selectedSetId === set.id 
                         ? 'border-indigo-400 bg-indigo-50 shadow dark:bg-indigo-900/30 dark:border-indigo-700' 
                         : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 dark:border-slate-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20'}`}
          >
            <div className="flex justify-between items-center">
              <div className="font-medium">{set.subject} - {set.type}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{new Date(set.dateCompleted).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
