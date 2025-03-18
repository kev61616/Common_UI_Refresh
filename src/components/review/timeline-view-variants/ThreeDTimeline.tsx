'use client'

import { TimelineViewProps } from './types';

/**
 * 3D Timeline (Timeline View Variant 7)
 * Displays practice sets in a 3D perspective view with depth perception
 */
export function ThreeDTimeline({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Sort sets by date
  const sortedSets = [...practiceSets].sort(
    (a, b) => new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">7. 3D Timeline View</h3>
      
      <div className="min-h-[600px] perspective-[1000px] overflow-x-auto py-10">
        <div className="min-w-[800px] h-[500px] relative transform-style-preserve-3d transform rotate-x-[15deg]">
          {/* 3D Ground plane */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 transform rotate-x-[90deg] translate-z-[-100px] origin-bottom"></div>
          
          {/* Time axis */}
          <div className="absolute left-[10%] right-[10%] h-1 bg-indigo-500 top-3/4 transform translate-z-[-20px]"></div>
          
          {/* Timeline points with cards */}
          {sortedSets.map((set, index) => {
            // Calculate position along timeline
            const position = 10 + (index / (sortedSets.length - 1 || 1)) * 80;
            
            // Z position alternates for visual separation
            const zPos = index % 2 === 0 ? -30 : -60;
            
            // Height based on accuracy
            const height = 100 + set.accuracy;
            
            // Subject color
            const color = set.subject === 'Reading' 
              ? 'bg-sky-500 dark:bg-sky-600' 
              : set.subject === 'Math' 
                ? 'bg-indigo-500 dark:bg-indigo-600' 
                : 'bg-violet-500 dark:bg-violet-600';
                
            // Floating label color
            const labelColor = set.subject === 'Reading' 
              ? 'text-sky-500 dark:text-sky-400' 
              : set.subject === 'Math' 
                ? 'text-indigo-500 dark:text-indigo-400' 
                : 'text-violet-500 dark:text-violet-400';
            
            return (
              <div key={set.id} className="absolute" style={{ left: `${position}%`, bottom: '25%' }}>
                {/* Vertical line */}
                <div 
                  className={`w-1 ${color} absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom transform-style-preserve-3d`}
                  style={{ 
                    height: `${height}px`,
                    transform: `translateZ(${zPos}px)`,
                  }}
                ></div>
                
                {/* Point on timeline */}
                <div 
                  className={`w-4 h-4 rounded-full ${color} absolute bottom-0 left-1/2 -translate-x-1/2 transform-style-preserve-3d`}
                  style={{ transform: `translateZ(${zPos}px)` }}
                ></div>
                
                {/* Card */}
                <div 
                  onClick={() => onSelectSet(set.id)}
                  className={`absolute bottom-[100%] left-1/2 -translate-x-1/2 w-48 p-3 rounded-lg shadow-lg cursor-pointer
                            transform-style-preserve-3d bg-white dark:bg-slate-800 origin-bottom
                            transition-transform duration-300 
                            ${selectedSetId === set.id 
                              ? 'ring-2 ring-indigo-500 scale-110' 
                              : 'hover:scale-105'}`}
                  style={{ 
                    transform: `translateZ(${zPos}px) translateY(-10px)`,
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' :
                      set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
                      'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
                    }`}>
                      {set.subject}
                    </div>
                    
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(set.dateCompleted).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="font-bold truncate">{set.type}</div>
                  
                  <div className="mt-2 flex justify-between">
                    <div className="text-lg font-bold">
                      {set.accuracy}%
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {Math.floor(set.timeUsed / 60)}m
                    </div>
                  </div>
                </div>
                
                {/* Date label */}
                <div 
                  className={`absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-xs font-medium 
                             ${labelColor} transform-style-preserve-3d whitespace-nowrap`}
                  style={{ transform: `translateZ(${zPos}px)` }}
                >
                  {new Date(set.dateCompleted).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            );
          })}
          
          {/* 3D perspective guide lines */}
          <div className="absolute left-[10%] w-0.5 h-40 bg-slate-300 dark:bg-slate-700 bottom-1/4 transform-style-preserve-3d"
               style={{ transform: 'translateZ(-20px)' }}></div>
          <div className="absolute right-[10%] w-0.5 h-40 bg-slate-300 dark:bg-slate-700 bottom-1/4 transform-style-preserve-3d"
               style={{ transform: 'translateZ(-20px)' }}></div>
        </div>
      </div>
      
      <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
        Timeline showing {sortedSets.length} sets in 3D perspective
      </div>
    </div>
  );
}
