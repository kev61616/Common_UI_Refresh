'use client'

import { QuestionViewProps } from './types';

export function FilmStripView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Sort sets by date to create a chronological film strip
  const sortedSets = [...practiceSets].sort((a, b) => 
    new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
  );
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">31. Film Strip View</h3>
      
      <div className="relative min-h-[500px] bg-black p-6 overflow-hidden rounded-lg">
        {/* Film frame perforations */}
        <div className="absolute top-0 left-0 bottom-0 w-12 flex flex-col justify-between pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-8 h-8 border-4 border-gray-800 rounded-lg bg-transparent my-1"></div>
          ))}
        </div>
        
        <div className="absolute top-0 right-0 bottom-0 w-12 flex flex-col justify-between pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-8 h-8 border-4 border-gray-800 rounded-lg bg-transparent my-1"></div>
          ))}
        </div>
        
        {/* Film strip content */}
        <div className="ml-16 mr-16">
          <div className="overflow-x-auto">
            <div className="w-full flex flex-col items-center">
              {/* Film reel heading */}
              <div className="w-full flex items-center justify-center my-4 text-white">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full border-4 border-gray-700 mr-3"></div>
                  <h4 className="text-xl font-bold italic tracking-wider">PRACTICE SETS</h4>
                  <div className="w-8 h-8 rounded-full border-4 border-gray-700 ml-3"></div>
                </div>
              </div>
              
              {/* Film frames */}
              <div className="w-full flex overflow-x-auto pb-6 pt-2 space-x-4 filmstrip-container">
                {sortedSets.map((set, index) => (
                  <div 
                    key={set.id}
                    onClick={() => onSelectSet && onSelectSet(set.id)}
                    className={`
                      min-w-[260px] max-w-[260px] bg-gray-100 dark:bg-gray-800 
                      border-8 border-gray-900 p-4 rounded-sm shadow-md
                      transition-transform cursor-pointer
                      ${selectedSetId === set.id ? 'ring-4 ring-yellow-400 transform scale-105 relative z-10' : 'hover:scale-105 hover:z-10'}
                    `}
                  >
                    {/* Frame number */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-mono">{index + 1}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col">
                      {/* Title card */}
                      <div className="text-center mb-2 pb-2 border-b border-gray-300 dark:border-gray-600">
                        <h5 className="font-serif font-bold text-lg">{set.subject}: {set.type}</h5>
                        <p className="text-xs mt-1 font-mono">
                          {new Date(set.dateCompleted).toLocaleDateString()}
                        </p>
                      </div>
                      
                      {/* Scene details */}
                      <div className="flex justify-between mb-3">
                        <div className="text-xs">
                          <div className="font-bold mb-1">Difficulty:</div>
                          <div className={`px-2 py-0.5 rounded-md text-white text-center ${
                            set.difficulty === 'Easy' ? 'bg-green-500 dark:bg-green-600' :
                            set.difficulty === 'Medium' ? 'bg-amber-500 dark:bg-amber-600' :
                            'bg-red-500 dark:bg-red-600'
                          }`}>
                            {set.difficulty}
                          </div>
                        </div>
                        
                        <div className="text-xs">
                          <div className="font-bold mb-1">Pace:</div>
                          <div className={`px-2 py-0.5 rounded-md text-white text-center ${
                            set.pace === 'Fast' ? 'bg-blue-500 dark:bg-blue-600' :
                            set.pace === 'Normal' ? 'bg-purple-500 dark:bg-purple-600' :
                            'bg-indigo-500 dark:bg-indigo-600'
                          }`}>
                            {set.pace}
                          </div>
                        </div>
                      </div>
                      
                      {/* Performance meter - styled like film exposure */}
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-mono">ACCURACY</span>
                          <span className="text-xs font-mono">{set.accuracy}%</span>
                        </div>
                        <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-sm overflow-hidden border border-gray-400">
                          <div 
                            className={`h-full ${
                              set.accuracy > 80 ? 'bg-green-500' :
                              set.accuracy > 60 ? 'bg-amber-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${set.accuracy}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs font-mono text-center">
                        QUESTIONS: {set.questions.length}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Film ending */}
        <div className="w-full mt-6 pt-4 border-t border-gray-800 text-center text-gray-600 dark:text-gray-400 text-xs tracking-widest">
          END OF REEL
        </div>
      </div>
    </div>
  );
}
