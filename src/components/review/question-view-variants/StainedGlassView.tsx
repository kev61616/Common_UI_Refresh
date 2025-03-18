'use client'

import { QuestionViewProps } from './types';

export function StainedGlassView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Find most frequent subjects
  const subjectCounts = practiceSets.reduce((counts: Record<string, number>, set) => {
    counts[set.subject] = (counts[set.subject] || 0) + 1;
    return counts;
  }, {});
  
  // Assign colors to subjects
  const subjectColors: Record<string, {light: string, dark: string, border: string}> = {};
  Object.keys(subjectCounts).forEach((subject, index) => {
    switch (index % 5) {
      case 0: // Blue
        subjectColors[subject] = {
          light: 'bg-blue-500/80 dark:bg-blue-600/80',
          dark: 'bg-blue-800/80 dark:bg-blue-900/80',
          border: 'border-blue-700 dark:border-blue-800'
        };
        break;
      case 1: // Red
        subjectColors[subject] = {
          light: 'bg-red-500/80 dark:bg-red-600/80',
          dark: 'bg-red-800/80 dark:bg-red-900/80',
          border: 'border-red-700 dark:border-red-800'
        };
        break;
      case 2: // Green
        subjectColors[subject] = {
          light: 'bg-green-500/80 dark:bg-green-600/80',
          dark: 'bg-green-800/80 dark:bg-green-900/80',
          border: 'border-green-700 dark:border-green-800'
        };
        break;
      case 3: // Purple
        subjectColors[subject] = {
          light: 'bg-purple-500/80 dark:bg-purple-600/80',
          dark: 'bg-purple-800/80 dark:bg-purple-900/80',
          border: 'border-purple-700 dark:border-purple-800'
        };
        break;
      case 4: // Amber
        subjectColors[subject] = {
          light: 'bg-amber-500/80 dark:bg-amber-600/80',
          dark: 'bg-amber-800/80 dark:bg-amber-900/80',
          border: 'border-amber-700 dark:border-amber-800'
        };
        break;
    }
  });
  
  // Group practice sets by subject
  const practiceSetsBySubject = practiceSets.reduce((groups: Record<string, typeof practiceSets>, set) => {
    if (!groups[set.subject]) {
      groups[set.subject] = [];
    }
    groups[set.subject].push(set);
    return groups;
  }, {});
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">33. Stained Glass View</h3>
      
      <div className="min-h-[500px] bg-gray-900 rounded-lg p-4 overflow-hidden relative">
        {/* Background dark pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMTExODI3IiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')] opacity-80"></div>
        
        {/* Lead borders outline */}
        <div className="absolute inset-0 pointer-events-none border-8 border-gray-800 rounded-lg"></div>
        
        {/* Main content area */}
        <div className="relative z-10">
          {/* Header rosette */}
          <div className="flex justify-center mb-6">
            <div className="w-40 h-40 relative flex items-center justify-center">
              {/* Petal shapes of the rosette */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-16 h-16 border-2 border-gray-700 bg-indigo-500/30 dark:bg-indigo-800/40"
                  style={{ 
                    transform: `rotate(${i * 45}deg) translateY(-20px)`,
                    clipPath: 'ellipse(50% 100% at 50% 0%)' 
                  }}
                ></div>
              ))}
              
              {/* Center circle */}
              <div className="w-16 h-16 rounded-full border-2 border-gray-700 bg-blue-500/40 dark:bg-blue-800/50 flex items-center justify-center">
                <span className="text-white font-serif text-lg">
                  Practice Sets
                </span>
              </div>
            </div>
          </div>
          
          {/* Main window panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
            {Object.entries(practiceSetsBySubject).map(([subject, sets], groupIndex) => (
              <div key={subject} className="relative">
                {/* Subject panel */}
                <div className={`border-2 border-gray-700 p-4 min-h-[100px] ${subjectColors[subject].dark} rounded-lg shadow-lg flex items-center justify-center mb-2`}>
                  <h4 className="text-white font-serif text-xl text-center">{subject}</h4>
                </div>
                
                {/* Practice set panels */}
                <div className="grid grid-cols-2 gap-2">
                  {sets.map((set, index) => (
                    <div 
                      key={set.id}
                      onClick={() => onSelectSet && onSelectSet(set.id)}
                      className={`
                        border-2 border-gray-700 ${subjectColors[subject].light}
                        rounded-lg p-3 min-h-[120px] cursor-pointer transition-all
                        ${selectedSetId === set.id ? 'ring-2 ring-white shadow-lg' : 'hover:ring-1 hover:ring-white/50'}
                      `}
                    >
                      {/* Lead glass effect */}
                      <div className="absolute inset-0 bg-white opacity-10 rounded-lg pointer-events-none"></div>
                      
                      {/* Set details */}
                      <div className="text-white font-serif relative">
                        <div className="font-bold mb-1">{set.type}</div>
                        <div className="text-sm mb-2">
                          {new Date(set.dateCompleted).toLocaleDateString()}
                        </div>
                        
                        {/* Horizontal lead divider */}
                        <div className="border-t border-gray-700 my-2"></div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm">Q: {set.questions.length}</div>
                          <div className={`
                            px-2 py-0.5 rounded-full text-sm text-white
                            ${set.accuracy > 80 ? 'bg-green-600/90' : 
                              set.accuracy > 60 ? 'bg-amber-600/90' : 
                              'bg-red-600/90'}
                          `}>
                            {set.accuracy}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Cathedral base */}
        <div className="w-full h-8 bg-gray-800 mt-4 border-t-2 border-gray-700 relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-red-500/20"></div>
        </div>
      </div>
    </div>
  );
}
