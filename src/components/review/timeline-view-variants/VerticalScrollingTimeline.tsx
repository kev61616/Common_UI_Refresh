'use client'

import { TimelineViewProps } from './types';

/**
 * Vertical Scrolling Timeline (Timeline View Variant 4)
 * Displays practice sets in a vertical timeline with alternating sides
 */
export function VerticalScrollingTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">4. Vertical Scrolling Timeline</h3>
      
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-violet-600 z-0"></div>
        
        <div className="space-y-12 relative max-h-[600px] overflow-y-auto pr-4 py-6 timeline-scrollbar">
          {practiceSets.map((set, index) => (
            <div 
              key={set.id} 
              className={`relative ${index % 2 === 0 ? 'ml-[50%] pl-8' : 'mr-[50%] pr-8 text-right'}`}
            >
              {/* Date bubble */}
              <div 
                className={`absolute top-0 ${index % 2 === 0 ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} 
                           w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 z-10 
                           ${selectedSetId === set.id 
                             ? 'bg-indigo-600 dark:bg-indigo-500' 
                             : 'bg-slate-300 dark:bg-slate-700'}`}
              ></div>
              
              {/* Timeline card */}
              <div 
                onClick={() => onSelectSet(set.id)}
                className={`p-4 rounded-lg shadow transition-all cursor-pointer 
                          ${selectedSetId === set.id 
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 ring-2 ring-indigo-500/50' 
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`px-2 py-1 text-xs rounded-full ${
                    set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' :
                    set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
                    'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
                  }`}>
                    {set.subject}
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </div>
                </div>
                
                <h4 className="font-bold text-lg mb-3">{set.type}</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                    <div className="font-bold text-2xl">{set.accuracy}%</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Time</div>
                    <div className="font-bold text-2xl">{Math.floor(set.timeUsed / 60)} min</div>
                  </div>
                </div>
                
                <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  {set.accuracy > 80 
                    ? "Excellent work! Your performance was outstanding."
                    : set.accuracy > 60
                      ? "Good progress. Keep practicing to improve further."
                      : "This area needs more focus. Let's work on improvement."}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
