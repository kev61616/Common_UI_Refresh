'use client';

import { SetViewProps } from './types';

export function CalendarView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="afy--hg">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="cqgvmm5">5. Calendar View</h3>
      <div className="grid grid-cols-7 gap-1" data-oid="sxfa9z:">
        {/* Calendar header */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) =>
        <div key={day} className="text-center font-semibold text-sm py-2" data-oid="ep39ydy">{day}</div>
        )}
        
        {/* Calendar days with practice indicators */}
        {Array.from({ length: 35 }, (_, i) => {
          const hasActivity = Math.random() > 0.65;
          return (
            <div
              key={i}
              className={`aspect-square border rounded flex flex-col items-center justify-center relative cursor-pointer
                        ${hasActivity ? 'bg-sky-50 dark:bg-sky-900/30 hover:bg-sky-100 dark:hover:bg-sky-800/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}`} data-oid="1m.ub:1">

              <span className="text-sm" data-oid="qqxcud5">{i + 1}</span>
              {hasActivity &&
              <div className="absolute bottom-1 flex gap-0.5" data-oid="e.q.oku">
                  <div className="w-1 h-1 rounded-full bg-sky-500" data-oid="lsnb96k"></div>
                  <div className="w-1 h-1 rounded-full bg-indigo-500" data-oid="3piys9r"></div>
                  <div className="w-1 h-1 rounded-full bg-purple-500" data-oid="bezkqlf"></div>
                </div>
              }
            </div>);

        })}
      </div>
      
      {/* Sample sets below calendar */}
      <div className="mt-6 space-y-2" data-oid="gl94134">
        {practiceSets.slice(0, 3).map((set) =>
        <div
          key={set.id}
          onClick={() => onSelectSet && onSelectSet(set.id)}
          className={`p-3 rounded-lg border cursor-pointer transition-all 
                       ${selectedSetId === set.id ?
          'border-indigo-400 bg-indigo-50 shadow dark:bg-indigo-900/30 dark:border-indigo-700' :
          'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 dark:border-slate-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20'}`} data-oid="jmlj8ny">

            <div className="flex justify-between items-center" data-oid="8iocusy">
              <div className="font-medium" data-oid="et4ndmd">{set.subject} - {set.type}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="binvtd_">{new Date(set.dateCompleted).toLocaleDateString()}</div>
            </div>
          </div>
        )}
      </div>
    </div>);

}