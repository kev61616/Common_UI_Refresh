'use client'

import { SetViewProps } from './types'

export function FramedGlassView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">30. Framed Glass View</h3>
      
      <div className="relative p-8 rounded-xl bg-gradient-to-br from-slate-50 to-gray-50 dark:from-gray-900 dark:to-slate-900 overflow-hidden">
        {/* Background subtle effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          {/* Minimal subtle background gradients */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gray-100/20 to-transparent dark:from-gray-800/10"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-slate-100/20 to-transparent dark:from-slate-800/10"></div>
          
          {/* Geometric glass frames */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-white/20 dark:border-white/10 rounded-lg transform rotate-12 backdrop-blur-sm"></div>
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-white/30 dark:border-white/10 rounded-lg transform -rotate-6 backdrop-blur-sm"></div>
          
          {/* Very subtle horizontal lines */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/30 to-transparent dark:via-slate-600/20"
              style={{ top: `${20 + (i * 15)}%` }}
            ></div>
          ))}
        </div>
        
        {/* Main grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceSets.map((set, index) => (
            <div 
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`group relative transition-all duration-300 ${
                selectedSetId === set.id ? 'z-10' : ''
              }`}
            >
              {/* Frame container - thin elegant glass frame */}
              <div className={`relative h-full transition-transform duration-500 transform ${
                selectedSetId === set.id 
                  ? 'scale-[1.03] -translate-y-1'
                  : 'group-hover:scale-[1.02] group-hover:-translate-y-0.5'
              }`}>
                {/* Framed glass card */}
                <div className={`p-px rounded-xl overflow-hidden backdrop-blur-md
                    ${selectedSetId === set.id
                      ? 'shadow-lg'
                      : 'shadow-md group-hover:shadow-lg'
                    }
                    ${set.subject === 'Reading' 
                      ? 'bg-gradient-to-br from-sky-200/20 to-cyan-200/10 dark:from-sky-900/30 dark:to-cyan-900/20' 
                      : set.subject === 'Math' 
                        ? 'bg-gradient-to-br from-indigo-200/20 to-blue-200/10 dark:from-indigo-900/30 dark:to-blue-900/20' 
                        : 'bg-gradient-to-br from-violet-200/20 to-purple-200/10 dark:from-violet-900/30 dark:to-purple-900/20'
                    }
                  `}
                >
                  {/* Inner glass content */}
                  <div className="relative flex flex-col h-full rounded-xl backdrop-blur-sm 
                                bg-white/80 dark:bg-slate-900/80 p-6
                                border border-white/50 dark:border-white/10">
                    {/* Light refraction effects - extremely subtle */}
                    <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
                      {/* Subtle edge highlight */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent"></div>
                      
                      {/* Top-edge highlight */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-white/40 dark:bg-white/20"></div>
                      
                      {/* Left-edge highlight */}
                      <div className="absolute top-0 left-0 bottom-0 w-px bg-white/40 dark:bg-white/20"></div>
                    </div>
                    
                    {/* Header section with minimal design */}
                    <div className="flex justify-between items-center mb-5">
                      <h4 className="text-lg font-medium text-slate-800 dark:text-white">{set.type}</h4>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-medium
                        border 
                        ${set.subject === 'Reading' 
                          ? 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-900/10 dark:text-sky-300' 
                          : set.subject === 'Math' 
                            ? 'border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-800 dark:bg-indigo-900/10 dark:text-indigo-300' 
                            : 'border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-900/10 dark:text-violet-300'}`}
                      >
                        {set.subject}
                      </div>
                    </div>
                    
                    {/* Clean minimalist divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600 mb-5"></div>
                    
                    {/* Content with elegant spacing */}
                    <div className="flex-grow">
                      <div className="grid grid-cols-1 gap-y-4">
                        {/* Info panels */}
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-slate-500 dark:text-slate-400">Date</div>
                          <div className="font-medium">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-slate-500 dark:text-slate-400">Time</div>
                          <div className="font-medium">{Math.floor(set.timeUsed / 60)} min</div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <div className="text-slate-500 dark:text-slate-400">Pace</div>
                          <div className="font-medium">{set.pace}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Accuracy display */}
                    <div className="mt-5 flex items-center gap-3">
                      <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                      
                      <div className="flex-grow h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            set.accuracy >= 90 ? 'bg-emerald-500 dark:bg-emerald-400' : 
                            set.accuracy >= 70 ? 'bg-amber-500 dark:bg-amber-400' : 
                            'bg-rose-500 dark:bg-rose-400'
                          }`}
                          style={{ width: `${set.accuracy}%` }}
                        ></div>
                      </div>
                      
                      <div className={`text-sm font-bold ${
                        set.accuracy >= 90 ? 'text-emerald-600 dark:text-emerald-400' : 
                        set.accuracy >= 70 ? 'text-amber-600 dark:text-amber-400' : 
                        'text-rose-600 dark:text-rose-400'
                      }`}>
                        {set.accuracy}%
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Thin decorative lines extending from card */}
                <div 
                  className={`absolute -bottom-3 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent dark:via-slate-600/30 transition-opacity duration-300 ${
                    selectedSetId === set.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
                  }`}
                ></div>
                
                <div 
                  className={`absolute -bottom-6 left-12 right-12 h-px bg-gradient-to-r from-transparent via-slate-300/30 to-transparent dark:via-slate-600/20 transition-opacity duration-300 ${
                    selectedSetId === set.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`}
                ></div>
              </div>
              
              {/* Selection indicator - minimal underline */}
              {selectedSetId === set.id && (
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full ${
                  set.subject === 'Reading' ? 'bg-sky-400 dark:bg-sky-500' : 
                  set.subject === 'Math' ? 'bg-indigo-400 dark:bg-indigo-500' : 
                  'bg-violet-400 dark:bg-violet-500'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
