'use client'

import { TimelineViewProps } from './types';

/**
 * Branching Timeline (Timeline View Variant 5)
 * Displays practice sets in a branching timeline structure organized by subject
 */
export function BranchingTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">5. Branching Timeline</h3>
      
      <div className="relative py-10 overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Main line */}
          <div className="absolute left-20 right-20 top-1/2 h-1 bg-slate-200 dark:bg-slate-700"></div>
          
          {/* Branching timeline structure */}
          <div className="flex justify-center items-center min-h-[400px] relative">
            {/* Root node */}
            <div className="absolute left-20 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
              Start
            </div>
            
            {/* Subject branches */}
            <div className="ml-40 flex flex-col gap-20 relative">
              {['Reading', 'Math', 'Writing'].map((subject, i) => {
                // Filter sets by subject
                const subjectSets = practiceSets.filter(set => set.subject === subject);
                
                return (
                  <div key={subject} className="relative">
                    {/* Subject branch connection to main line */}
                    <div className="absolute left-[-80px] top-1/2 w-80 h-1 bg-slate-200 dark:bg-slate-700"></div>
                    
                    {/* Subject circle */}
                    <div className={`absolute left-[-8px] top-1/2 -translate-y-1/2 -translate-x-full
                                    w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                                    shadow-md z-10 ${
                                      subject === 'Reading' ? 'bg-sky-500' : 
                                      subject === 'Math' ? 'bg-indigo-500' : 'bg-violet-500'
                                    }`}>
                      {subjectSets.length}
                    </div>
                    
                    {/* Subject title */}
                    <div className="absolute left-[-8px] bottom-full -translate-x-full mb-2 font-semibold">
                      {subject}
                    </div>
                    
                    {/* Subject branch with practice sets */}
                    <div className="flex items-center gap-4">
                      {subjectSets.slice(0, 4).map((set, setIndex) => (
                        <div 
                          key={set.id}
                          onClick={() => onSelectSet(set.id)}
                          className={`relative w-52 p-3 rounded-lg cursor-pointer shadow transition-all
                                    ${selectedSetId === set.id 
                                      ? `ring-2 ring-offset-2 ${subject === 'Reading' ? 'ring-sky-500' : subject === 'Math' ? 'ring-indigo-500' : 'ring-violet-500'}
                                        bg-white dark:bg-slate-800 shadow-md` 
                                      : 'bg-white dark:bg-slate-800 hover:shadow-md border border-slate-200 dark:border-slate-700'}`}
                        >
                          {/* Connection to branch line */}
                          <div className="absolute left-1/2 bottom-full w-0.5 h-8 -translate-x-1/2 bg-slate-200 dark:bg-slate-700"></div>
                          
                          {/* Date circle */}
                          <div className="absolute left-1/2 bottom-full -translate-x-1/2 -translate-y-4 w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-500"></div>
                          
                          <div className="flex justify-between items-center mb-2">
                            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              {new Date(set.dateCompleted).toLocaleDateString()}
                            </div>
                            <div className="text-xs">{set.pace}</div>
                          </div>
                          
                          <div className="font-bold">{set.type}</div>
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-sm">
                              <span className="font-semibold">{set.accuracy}%</span>
                            </div>
                            <div className="text-sm">
                              {Math.floor(set.timeUsed / 60)} min
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
