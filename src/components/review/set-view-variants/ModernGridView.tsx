'use client';

import { SetViewProps } from './types';

export function ModernGridView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="-n855bm">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="s:07110">7. Modern Grid View</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-oid=".iy-_f0">
        {practiceSets.map((set) =>
        <div
          key={set.id}
          onClick={() => onSelectSet && onSelectSet(set.id)}
          className={`p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-200 
                      ${selectedSetId === set.id ?
          'ring-2 ring-indigo-500 shadow-md dark:ring-indigo-500' :
          'hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 cursor-pointer'}`} data-oid="su_pfld">

            <div className="flex items-center justify-between mb-4" data-oid="n7rsmab">
              <span className={`px-2.5 py-1 text-xs rounded-full font-medium
                              ${set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' :
            set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
            'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'}`} data-oid="i270ar5">
                {set.subject}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="3t8g2_v">
                {new Date(set.dateCompleted).toLocaleDateString()}
              </span>
            </div>
            
            <div className="mb-4" data-oid="_:.svba">
              <h4 className="font-bold text-lg" data-oid="qavrcq3">{set.type}</h4>
              <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="uovl.xn">{set.pace}</div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg grid grid-cols-2 gap-3" data-oid="x7g7gro">
              <div className="text-center" data-oid="fx15:7k">
                <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="cusn_ob">Accuracy</div>
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400" data-oid="233fux:">{set.accuracy}%</div>
              </div>
              <div className="text-center" data-oid="6-f4xz-">
                <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="2t3i6hj">Time</div>
                <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400" data-oid="s1tb3u5">{Math.floor(set.timeUsed / 60)} min</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}