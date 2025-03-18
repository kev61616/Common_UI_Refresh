'use client'

import { SetViewProps } from './types'

export function FrostedCrystalView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">26. Frosted Crystal View</h3>
      
      <div className="relative p-8 rounded-xl bg-gradient-to-b from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
        {/* Background geometric shapes - prism/crystal effects */}
        <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full"></div>
          <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-indigo-100 dark:bg-indigo-900/30 rounded-full"></div>
          <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-violet-100 dark:bg-violet-900/30 rounded-full blur-xl"></div>
          
          {/* Crystal shard effects */}
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white dark:bg-white/10 rotate-45 skew-x-12 opacity-30"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-48 bg-white dark:bg-white/10 -rotate-12 skew-y-12 opacity-20"></div>
        </div>
        
        {/* Grid with crystal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceSets.map(set => (
            <div 
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`group relative transition-all duration-500 ${
                selectedSetId === set.id ? 'z-10 scale-105' : 'hover:scale-105 hover:z-10'
              }`}
            >
              {/* Crystal card with sharp edges */}
              <div className={`relative flex flex-col h-full p-5 overflow-hidden 
                  ${selectedSetId === set.id 
                    ? 'ring-2 ring-white/80 dark:ring-white/30'
                    : ''
                  }
                  backdrop-blur-sm shadow-lg transition-all duration-300
                  bg-white/30 dark:bg-slate-900/40
                  border border-white/40 dark:border-white/10`}
                style={{
                  clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
                  boxShadow: selectedSetId === set.id 
                    ? '0 15px 30px -10px rgba(156, 163, 175, 0.4), 0 5px 15px -5px rgba(156, 163, 175, 0.2)' 
                    : '0 10px 20px -8px rgba(156, 163, 175, 0.3), 0 5px 10px -3px rgba(156, 163, 175, 0.1)'
                }}
              >
                {/* Surface shine effect */}
                <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute -right-12 -bottom-12 w-24 h-24 bg-white/20 dark:bg-white/5 rounded-full blur-xl pointer-events-none"></div>
                
                {/* Abstract crystal lines */}
                <div className="absolute top-0 right-0 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
                <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
                
                {/* Header with style dependent on subject */}
                <div className={`rounded-md px-3 py-1.5 text-sm font-medium mb-3 self-start
                          ${set.subject === 'Reading' 
                            ? 'bg-sky-100/80 text-sky-900 dark:bg-sky-500/30 dark:text-sky-300' 
                            : set.subject === 'Math' 
                              ? 'bg-indigo-100/80 text-indigo-900 dark:bg-indigo-500/30 dark:text-indigo-300' 
                              : 'bg-violet-100/80 text-violet-900 dark:bg-violet-500/30 dark:text-violet-300'}`}
                >
                  {set.subject}
                </div>
                
                {/* Main content */}
                <div className="flex-grow">
                  <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{set.type}</h4>
                  
                  <div className="mt-3 mb-3 text-sm text-slate-500 dark:text-slate-400">
                    Completed on {new Date(set.dateCompleted).toLocaleDateString()}
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                      <div className={`text-2xl font-bold
                        ${set.accuracy > 85 
                          ? 'text-emerald-600 dark:text-emerald-400' 
                          : set.accuracy > 70 
                            ? 'text-amber-600 dark:text-amber-400' 
                            : 'text-rose-600 dark:text-rose-400'}`}
                      >
                        {set.accuracy}%
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Time</div>
                      <div className="text-xl font-bold text-slate-700 dark:text-slate-300">
                        {Math.floor(set.timeUsed / 60)} min
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Pace</div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
                        {set.pace}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sharp crystal corner effect */}
                <div className="absolute top-0 right-0 border-t-[20px] border-r-[20px] border-t-white/30 border-r-transparent dark:border-t-white/10"></div>
                <div className="absolute bottom-0 left-0 border-b-[20px] border-l-[20px] border-b-white/30 border-l-transparent dark:border-b-white/10"></div>
                
                {/* Selection indicator */}
                {selectedSetId === set.id && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/30 dark:bg-white/10 rotate-45 transform-gpu"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
