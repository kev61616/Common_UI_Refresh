'use client'

import { SetViewProps } from './types'

export function CardFlipView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">11. 3D Card Flip View</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {practiceSets.map(set => (
          <div 
            key={set.id}
            className={`group perspective-1000 cursor-pointer h-64 w-full ${
              selectedSetId === set.id ? 'selected-card' : ''
            }`}
            onClick={() => onSelectSet && onSelectSet(set.id)}
          >
            {/* Card container with 3D flip effect */}
            <div className="relative preserve-3d w-full h-full duration-700 group-hover:rotate-y-180">
              {/* Front of card */}
              <div className="absolute backface-hidden w-full h-full rounded-xl border p-4 shadow-lg
                             bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900
                             dark:border-slate-700">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-xl">{set.subject}</h4>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' :
                      set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
                      'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
                    }`}>
                      {set.type}
                    </div>
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                        {set.accuracy}%
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Accuracy</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      {new Date(set.dateCompleted).toLocaleDateString()}
                    </span>
                    <span className="font-medium">
                      {set.pace}
                    </span>
                  </div>
                </div>
                
                {/* Flip indicator */}
                <div className="absolute bottom-2 right-2 text-slate-400 dark:text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Back of card */}
              <div className="absolute backface-hidden w-full h-full rounded-xl border p-4 rotate-y-180
                             bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-slate-900 dark:to-indigo-950
                             dark:border-slate-700 shadow-lg">
                <div className="flex flex-col h-full">
                  <h4 className="font-bold text-lg mb-3">{set.subject} - {set.type}</h4>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Time</div>
                      <div className="font-bold">{Math.floor(set.timeUsed / 60)} min</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Questions</div>
                      <div className="font-bold">{Math.floor(Math.random() * 20) + 10}</div>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="text-sm mb-2 font-medium">Strengths</div>
                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300 mb-3">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                        {set.subject === 'Reading' ? 'Comprehension' : set.subject === 'Math' ? 'Equations' : 'Grammar'}
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>
                        {set.subject === 'Reading' ? 'Vocabulary' : set.subject === 'Math' ? 'Geometry' : 'Structure'}
                      </li>
                    </ul>
                    
                    <div className="text-sm mb-2 font-medium">Areas for Improvement</div>
                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5"></span>
                        {set.subject === 'Reading' ? 'Critical Analysis' : set.subject === 'Math' ? 'Word Problems' : 'Transitions'}
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-center text-xs text-slate-500 dark:text-slate-400">
                    Click to view detailed analysis
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
