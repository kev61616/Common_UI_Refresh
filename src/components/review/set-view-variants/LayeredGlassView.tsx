'use client'

import { SetViewProps } from './types'

export function LayeredGlassView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">27. Layered Glass View</h3>
      
      <div className="relative p-8 rounded-xl bg-gradient-to-bl from-fuchsia-50 via-violet-50 to-indigo-50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-violet-950/20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Circular gradient blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-b from-violet-200/40 to-indigo-300/30 dark:from-violet-800/20 dark:to-indigo-900/20 rounded-full blur-2xl -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-gradient-to-b from-fuchsia-200/30 to-rose-300/20 dark:from-fuchsia-900/20 dark:to-rose-900/10 rounded-full blur-2xl translate-y-1/2"></div>
          
          {/* Layered glass panels in background */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 dark:bg-white/5 backdrop-blur-sm rounded-2xl rotate-12"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-64 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl -rotate-6"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-white/15 dark:bg-white/5 backdrop-blur-sm rounded-2xl rotate-45"></div>
        </div>
        
        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceSets.map((set, index) => (
            <div 
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`relative transition-all duration-500 ${
                selectedSetId === set.id ? 'z-10 transform-gpu scale-105' : 'hover:scale-102 hover:z-10'
              }`}
            >
              {/* Multiple layered cards to create depth effect */}
              <div className="relative">
                {/* Background layers */}
                <div className={`absolute inset-0 rounded-xl transition-transform duration-500 ${
                  selectedSetId === set.id ? 'translate-y-2 translate-x-2' : 'group-hover:translate-y-2 group-hover:translate-x-2'
                }`}>
                  <div className={`w-full h-full rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/30 dark:border-white/10
                      ${set.subject === 'Reading' ? 'bg-sky-50/20 dark:bg-sky-900/10' : 
                        set.subject === 'Math' ? 'bg-indigo-50/20 dark:bg-indigo-900/10' : 
                        'bg-violet-50/20 dark:bg-violet-900/10'}`}
                  ></div>
                </div>
                
                <div className={`absolute inset-0 rounded-xl transition-transform duration-500 ${
                  selectedSetId === set.id ? 'translate-y-1 translate-x-1' : 'group-hover:translate-y-1 group-hover:translate-x-1'
                }`}>
                  <div className={`w-full h-full rounded-xl bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10
                      ${set.subject === 'Reading' ? 'bg-sky-100/20 dark:bg-sky-800/10' : 
                        set.subject === 'Math' ? 'bg-indigo-100/20 dark:bg-indigo-800/10' : 
                        'bg-violet-100/20 dark:bg-violet-800/10'}`}
                  ></div>
                </div>
                
                {/* Main content card */}
                <div className={`relative h-full p-6 rounded-xl backdrop-blur-md transition-all duration-300
                    bg-white/40 dark:bg-slate-800/40
                    ${selectedSetId === set.id
                      ? 'shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_30px_-15px_rgba(90,60,250,0.3)]'
                      : 'shadow-[0_8px_30px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_20px_-15px_rgba(90,60,250,0.2)]'
                    }
                    border border-white/50 dark:border-white/10
                    ${set.subject === 'Reading' ? 'bg-sky-100/30 dark:bg-sky-900/20' : 
                      set.subject === 'Math' ? 'bg-indigo-100/30 dark:bg-indigo-900/20' : 
                      'bg-violet-100/30 dark:bg-violet-900/20'}`}
                >
                  {/* Glass highlight effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white/40 via-white/20 to-transparent rotate-12 dark:from-white/20 dark:via-white/10"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Subject badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm
                          ${set.subject === 'Reading' 
                            ? 'bg-sky-100/80 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' 
                            : set.subject === 'Math' 
                              ? 'bg-indigo-100/80 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                              : 'bg-violet-100/80 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'}`}
                      >
                        {set.subject}
                      </div>
                      
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(set.dateCompleted).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{set.type}</h4>
                    
                    {/* Stats display */}
                    <div className="mt-auto pt-4">
                      <div className="flex items-center gap-6">
                        <div className="flex-1">
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Accuracy</div>
                          <div className="h-2 bg-slate-200/60 dark:bg-slate-700/60 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                set.accuracy >= 90 ? 'bg-emerald-500 dark:bg-emerald-400' : 
                                set.accuracy >= 70 ? 'bg-amber-500 dark:bg-amber-400' : 
                                'bg-rose-500 dark:bg-rose-400'
                              }`}
                              style={{ width: `${set.accuracy}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-slate-500 dark:text-slate-400">0%</span>
                            <span className="text-xs font-medium">{set.accuracy}%</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">100%</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Time / Pace</div>
                          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {Math.floor(set.timeUsed / 60)}m
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {set.pace}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Selection indicator */}
              {selectedSetId === set.id && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-white to-transparent dark:via-indigo-400"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
