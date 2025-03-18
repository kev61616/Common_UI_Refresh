'use client'

import { SetViewProps } from './types'

export function GlassmorphismView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">23. Glassmorphism View</h3>
      
      <div className="relative overflow-hidden rounded-lg p-8">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-400/20 to-purple-500/20 blur-3xl"></div>
          <div className="absolute top-[100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-400/20 to-cyan-500/20 blur-3xl"></div>
          <div className="absolute bottom-[-100px] left-[30%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 blur-3xl"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceSets.map((set, index) => (
            <div 
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`group relative cursor-pointer transition-all duration-500 ${
                selectedSetId === set.id ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              {/* Glass card */}
              <div className={`bg-white/10 dark:bg-slate-900/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-5 overflow-hidden 
                              shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500
                              ${selectedSetId === set.id 
                                ? 'shadow-[0_8px_30px_rgb(0,0,0,0.12),inset_0_0_0_1px_rgb(255,255,255,0.1)]' 
                                : 'group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12),inset_0_0_0_1px_rgb(255,255,255,0.1)]'
                              }`}
              >
                {/* Subtle highlight effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                
                {/* Glow accents */}
                <div className={`absolute -z-10 top-[-20px] right-[-20px] w-[100px] h-[100px] rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40 ${
                  set.subject === 'Reading' ? 'bg-sky-400' : 
                  set.subject === 'Math' ? 'bg-violet-400' : 'bg-rose-400'
                }`}></div>
                
                <div className="flex flex-col h-full relative z-10">
                  {/* Top row with subject and accuracy */}
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        set.subject === 'Reading' 
                          ? 'bg-sky-500/10 text-sky-500 dark:bg-sky-400/10 dark:text-sky-400' 
                          : set.subject === 'Math' 
                            ? 'bg-violet-500/10 text-violet-500 dark:bg-violet-400/10 dark:text-violet-400' 
                            : 'bg-rose-500/10 text-rose-500 dark:bg-rose-400/10 dark:text-rose-400'
                      }`}>
                        {set.subject}
                      </div>
                      <h4 className="mt-2 text-lg font-medium text-slate-700 dark:text-white">{set.type}</h4>
                    </div>
                    
                    <div className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-500 group-hover:scale-110 ${
                      set.accuracy > 85 
                        ? 'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400'
                        : set.accuracy > 70
                          ? 'bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400'
                          : 'bg-rose-500/10 text-rose-500 dark:bg-rose-400/10 dark:text-rose-400'
                    }`}>
                      <div className="absolute inset-0 rounded-full border-2 border-dashed animate-[spin_12s_linear_infinite] opacity-60"></div>
                      <span className="text-sm font-bold">{set.accuracy}%</span>
                    </div>
                  </div>
                  
                  {/* Progress indicators */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                      <span>Progress</span>
                      <span>Excellent</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          set.accuracy > 85 
                            ? 'bg-gradient-to-r from-emerald-400 to-green-500' 
                            : set.accuracy > 70
                              ? 'bg-gradient-to-r from-amber-400 to-orange-500' 
                              : 'bg-gradient-to-r from-rose-400 to-red-500'
                        }`}
                        style={{ width: `${set.accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Completed</div>
                      <div className="text-sm font-medium text-slate-700 dark:text-white flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(set.dateCompleted).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Time Used</div>
                      <div className="text-sm font-medium text-slate-700 dark:text-white flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{set.timeUsed}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action button */}
                  <button 
                    className={`mt-5 w-full py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedSetId === set.id 
                        ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm' 
                        : 'bg-white/5 backdrop-blur border border-white/10 text-slate-400 dark:text-slate-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white'
                    }`}
                  >
                    View Details
                  </button>
                </div>
              </div>
              
              {/* Reflection effect at bottom */}
              <div className="absolute top-[99%] left-[5%] right-[5%] h-[10px] bg-gradient-to-b from-black/20 to-transparent blur-sm rounded-b-3xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
