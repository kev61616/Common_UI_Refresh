'use client';

import { TimelineViewProps } from './types';

/**
 * Branching Timeline (Timeline View Variant 5)
 * Displays practice sets in a branching timeline structure organized by subject
 */
export function BranchingTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="jg5ov5n">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="v58c.n-">5. Branching Timeline</h3>
      
      <div className="relative py-10 overflow-x-auto" data-oid="2e.lkf7">
        <div className="min-w-[1000px]" data-oid="25l8t90">
          {/* Main line */}
          <div className="absolute left-20 right-20 top-1/2 h-1 bg-slate-200 dark:bg-slate-700" data-oid="dd37xg9"></div>
          
          {/* Branching timeline structure */}
          <div className="flex justify-center items-center min-h-[400px] relative" data-oid="4_swsxu">
            {/* Root node */}
            <div className="absolute left-20 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg z-10" data-oid="v9c295h">
              Start
            </div>
            
            {/* Subject branches */}
            <div className="ml-40 flex flex-col gap-20 relative" data-oid="bq7-eki">
              {['Reading', 'Math', 'Writing'].map((subject, i) => {
                // Filter sets by subject
                const subjectSets = practiceSets.filter((set) => set.subject === subject);

                return (
                  <div key={subject} className="relative" data-oid="cen5vw2">
                    {/* Subject branch connection to main line */}
                    <div className="absolute left-[-80px] top-1/2 w-80 h-1 bg-slate-200 dark:bg-slate-700" data-oid="4q505y0"></div>
                    
                    {/* Subject circle */}
                    <div className={`absolute left-[-8px] top-1/2 -translate-y-1/2 -translate-x-full
                                    w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                                    shadow-md z-10 ${
                    subject === 'Reading' ? 'bg-sky-500' :
                    subject === 'Math' ? 'bg-indigo-500' : 'bg-violet-500'}`
                    } data-oid="31on4.s">
                      {subjectSets.length}
                    </div>
                    
                    {/* Subject title */}
                    <div className="absolute left-[-8px] bottom-full -translate-x-full mb-2 font-semibold" data-oid=".n0sa7:">
                      {subject}
                    </div>
                    
                    {/* Subject branch with practice sets */}
                    <div className="flex items-center gap-4" data-oid="33vrz9u">
                      {subjectSets.slice(0, 4).map((set, setIndex) =>
                      <div
                        key={set.id}
                        onClick={() => onSelectSet(set.id)}
                        className={`relative w-52 p-3 rounded-lg cursor-pointer shadow transition-all
                                    ${selectedSetId === set.id ?
                        `ring-2 ring-offset-2 ${subject === 'Reading' ? 'ring-sky-500' : subject === 'Math' ? 'ring-indigo-500' : 'ring-violet-500'}
                                        bg-white dark:bg-slate-800 shadow-md` :
                        'bg-white dark:bg-slate-800 hover:shadow-md border border-slate-200 dark:border-slate-700'}`} data-oid="ivg1r9u">

                          {/* Connection to branch line */}
                          <div className="absolute left-1/2 bottom-full w-0.5 h-8 -translate-x-1/2 bg-slate-200 dark:bg-slate-700" data-oid="z2bp3oc"></div>
                          
                          {/* Date circle */}
                          <div className="absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-4 w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-500" data-oid="npnfwsr"></div>
                          
                          <div className="flex justify-between items-center mb-2" data-oid="32aotd8">
                            <div className="text-xs font-medium text-slate-500 dark:text-slate-400" data-oid="48h5-ng">
                              {new Date(set.dateCompleted).toLocaleDateString()}
                            </div>
                            <div className="text-xs" data-oid=":17-xgy">{set.pace}</div>
                          </div>
                          
                          <div className="font-bold" data-oid="b4do_0u">{set.type}</div>
                          
                          <div className="flex justify-between items-center mt-2" data-oid="nquy4w0">
                            <div className="text-sm" data-oid="dx-g8bv">
                              <span className="font-semibold" data-oid="om51odu">{set.accuracy}%</span>
                            </div>
                            <div className="text-sm" data-oid="jju3irs">
                              {Math.floor(set.timeUsed / 60)} min
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>
      </div>
    </div>);

}