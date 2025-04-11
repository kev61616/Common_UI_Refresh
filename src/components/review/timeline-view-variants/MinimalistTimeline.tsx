'use client';

import { TimelineViewProps } from './types';

/**
 * Minimalist Timeline (Timeline View Variant 14)
 * A clean, distraction-free view of practice history focusing on essential information
 */
export function MinimalistTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Sort sets by date
  const sortedSets = [...practiceSets].sort((a, b) =>
  new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="_ao6d72">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="s7y5gb9">14. Minimalist Timeline</h3>
      
      <div className="max-w-3xl mx-auto" data-oid="883.hj6">
        {/* Summary stats in minimal style */}
        <div className="mb-12 grid grid-cols-3 gap-6" data-oid="tcwxolu">
          <div className="text-center" data-oid="32s1dho">
            <div className="text-4xl font-light text-slate-800 dark:text-slate-200 mb-1" data-oid="sfqg.oa">
              {practiceSets.length}
            </div>
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400" data-oid="1-13rgo">
              Practice Sets
            </div>
          </div>
          <div className="text-center" data-oid="x3y.xqm">
            <div className="text-4xl font-light text-slate-800 dark:text-slate-200 mb-1" data-oid="u0vxdgw">
              {Math.round(practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length)}%
            </div>
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400" data-oid="ck9su2-">
              Average Accuracy
            </div>
          </div>
          <div className="text-center" data-oid="lfkvfm9">
            <div className="text-4xl font-light text-slate-800 dark:text-slate-200 mb-1" data-oid="-g2jk0q">
              {new Set(practiceSets.map((set) => set.subject)).size}
            </div>
            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400" data-oid="qp6shmr">
              Subjects
            </div>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="relative pl-4" data-oid="m9dxkh3">
          {/* Timeline vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" data-oid="0404.hf"></div>
          
          {/* Timeline entries */}
          <div className="space-y-12" data-oid="c8ma_f7">
            {sortedSets.map((set, index) =>
            <div
              key={set.id}
              className={`relative ${
              selectedSetId === set.id ?
              'bg-slate-50 dark:bg-slate-800/50 -mx-4 px-4 py-3 rounded-lg' :
              ''}`
              } data-oid="ph_872n">

                {/* Timeline dot */}
                <div
                className={`absolute left-0 w-3 h-3 rounded-full transform -translate-x-[7px] top-1.5
                           border-2 border-white dark:border-slate-900
                           ${selectedSetId === set.id ? 'scale-125' : ''}
                           ${set.subject === 'Reading' ?
                'bg-sky-400 dark:bg-sky-500' :
                set.subject === 'Math' ?
                'bg-indigo-400 dark:bg-indigo-500' :
                'bg-violet-400 dark:bg-violet-500'}`} data-oid="5eljf3v">
              </div>
                
                {/* Content */}
                <div
                onClick={() => onSelectSet(set.id)}
                className="cursor-pointer group" data-oid="85li5zj">

                  {/* Date */}
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1" data-oid="nek98x.">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </div>
                  
                  {/* Title */}
                  <div className="flex justify-between items-start" data-oid="nvouau1">
                    <h4 className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" data-oid="u9rvivv">
                      {set.type}
                    </h4>
                    <div className={`text-sm font-semibold ${
                  set.accuracy >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                  set.accuracy >= 80 ? 'text-amber-600 dark:text-amber-400' :
                  set.accuracy >= 70 ? 'text-orange-600 dark:text-orange-400' :
                  'text-rose-600 dark:text-rose-400'}`
                  } data-oid="y-afhyt">
                      {set.accuracy}%
                    </div>
                  </div>
                  
                  {/* Subject pill */}
                  <div className="mt-1" data-oid="6tfj4vv">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full
                                   ${set.subject === 'Reading' ?
                  'bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300' :
                  set.subject === 'Math' ?
                  'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300' :
                  'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300'}`} data-oid="ah1zypn">

                      {set.subject}
                    </span>
                  </div>
                  
                  {/* Expanded details when selected */}
                  {selectedSetId === set.id &&
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm" data-oid="_ik7:hp">
                      <div data-oid="zrt2koc">
                        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="d.mimf9">Duration</div>
                        <div data-oid="y1h.a5x">{Math.floor(set.timeUsed / 60)} min {set.timeUsed % 60} sec</div>
                      </div>
                      <div data-oid="4q:j97:">
                        <div className="text-xs text-slate-500 dark:text-slate-400" data-oid=":xhk58g">Pace</div>
                        <div data-oid="6d04n3l">{set.pace}</div>
                      </div>
                      
                      {/* Accuracy progress bar */}
                      <div className="col-span-2 mt-2" data-oid="3nw0dgr">
                        <div className="flex justify-between text-xs mb-1" data-oid="qbl7llh">
                          <span className="text-slate-500 dark:text-slate-400" data-oid="9h-dgm3">Accuracy</span>
                          <span className="font-medium" data-oid=".gssfk3">{set.accuracy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden" data-oid="l2626j:">
                          <div
                        className={`h-full rounded-full ${
                        set.accuracy >= 90 ? 'bg-emerald-500 dark:bg-emerald-400' :
                        set.accuracy >= 80 ? 'bg-amber-500 dark:bg-amber-400' :
                        set.accuracy >= 70 ? 'bg-orange-500 dark:bg-orange-400' :
                        'bg-rose-500 dark:bg-rose-400'}`
                        }
                        style={{ width: `${set.accuracy}%` }} data-oid="3o030hq">
                      </div>
                        </div>
                      </div>
                    </div>
                }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}