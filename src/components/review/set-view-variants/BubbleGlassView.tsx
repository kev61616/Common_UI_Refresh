'use client'

import { SetViewProps } from './types'

export function BubbleGlassView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">28. Bubble Glass View</h3>
      
      <div className="relative p-8 rounded-xl bg-gradient-to-r from-teal-50 via-cyan-50 to-sky-50 dark:from-slate-900 dark:via-cyan-950/10 dark:to-sky-950/10 overflow-hidden">
        {/* Background watery effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large soft color areas */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-100/30 via-cyan-100/20 to-transparent dark:from-sky-700/20 dark:via-cyan-700/10"></div>
          
          {/* Bubble background decorations */}
          <div className="absolute -top-20 right-20 w-56 h-56 rounded-full bg-gradient-to-b from-cyan-200/30 to-teal-200/20 dark:from-cyan-800/20 dark:to-teal-800/10 blur-md"></div>
          <div className="absolute bottom-40 -left-20 w-72 h-72 rounded-full bg-gradient-to-t from-sky-200/30 to-indigo-200/20 dark:from-sky-800/20 dark:to-indigo-800/10 blur-md"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-teal-200/20 to-blue-200/10 dark:from-teal-800/10 dark:to-blue-800/5 blur-lg"></div>
          
          {/* Small bubble decorations */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute w-6 h-6 rounded-full bg-white/40 dark:bg-white/10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.3,
                transform: `scale(${0.5 + Math.random()})`,
              }}
            ></div>
          ))}
        </div>
        
        {/* Circular cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {practiceSets.map((set, index) => (
            <div 
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`relative transition-all duration-500 ${
                selectedSetId === set.id ? 'z-10 transform-gpu scale-110' : 'hover:scale-105 hover:z-10'
              }`}
            >
              {/* Card circular glass container */}
              <div 
                className={`relative aspect-square rounded-full flex flex-col items-center justify-center text-center p-4 transition-all duration-300
                  backdrop-blur-md
                  ${selectedSetId === set.id 
                    ? 'shadow-[0_0_30px_rgba(56,189,248,0.3),inset_0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'shadow-[0_0_20px_rgba(56,189,248,0.1),inset_0_0_10px_rgba(255,255,255,0.2)]'
                  }
                  bg-gradient-to-br from-white/30 to-white/10 dark:from-white/20 dark:to-white/5
                  border border-white/50 dark:border-white/20
                  before:content-[''] before:absolute before:inset-0 before:rounded-full before:p-0.5
                  before:bg-gradient-to-b before:from-white/60 before:via-white/20 before:to-transparent
                  before:dark:from-white/30 before:dark:via-white/10 before:dark:to-transparent
                  ${set.subject === 'Reading' 
                    ? 'before:shadow-[inset_0_0_20px_rgba(56,189,248,0.3)]' 
                    : set.subject === 'Math' 
                      ? 'before:shadow-[inset_0_0_20px_rgba(99,102,241,0.3)]' 
                      : 'before:shadow-[inset_0_0_20px_rgba(139,92,246,0.3)]'
                  }`}
              >
                {/* Simulate glass refraction with multiple radial gradients */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  {/* Top left highlight */}
                  <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-white/70 to-white/0 rounded-full dark:from-white/30"></div>
                  
                  {/* Bottom right light reflection */}
                  <div className="absolute top-3/4 left-3/4 w-1/4 h-1/4 bg-white/30 dark:bg-white/10 rounded-full blur-sm"></div>
                  
                  {/* Subject-specific colored glow inside the bubble */}
                  <div className={`absolute inset-0 rounded-full opacity-30 mix-blend-soft-light
                    ${set.subject === 'Reading' 
                      ? 'bg-gradient-to-br from-sky-200 to-cyan-300 dark:from-sky-700 dark:to-cyan-800' 
                      : set.subject === 'Math' 
                        ? 'bg-gradient-to-br from-indigo-200 to-blue-300 dark:from-indigo-700 dark:to-blue-800' 
                        : 'bg-gradient-to-br from-violet-200 to-purple-300 dark:from-violet-700 dark:to-purple-800'}`}
                  ></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center max-w-[90%]">
                  {/* Subject indicator */}
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-3
                      ${set.subject === 'Reading' 
                        ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' 
                        : set.subject === 'Math' 
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                          : 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'}`}
                  >
                    {/* Subject icon */}
                    {set.subject === 'Reading' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    ) : set.subject === 'Math' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Title and stats */}
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-1">{set.type}</h4>
                  
                  <div className="w-full mt-2">
                    {/* Circular progress bar */}
                    <div className="relative mx-auto w-20 h-20 mb-1">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle 
                          cx="50" cy="50" r="40" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="8" 
                          className="text-slate-200 dark:text-slate-700"
                        />
                        
                        {/* Progress circle with rounded ends and animation */}
                        <circle 
                          cx="50" cy="50" r="40" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="8" 
                          strokeLinecap="round"
                          strokeDasharray={`${set.accuracy * 2.51} 251`}
                          strokeDashoffset="0" 
                          className={`transform -rotate-90 origin-center transition-all duration-1000 ${
                            set.accuracy > 85 
                              ? 'text-emerald-500 dark:text-emerald-400' 
                              : set.accuracy > 70 
                                ? 'text-amber-500 dark:text-amber-400' 
                                : 'text-rose-500 dark:text-rose-400'
                          }`}
                        />
                        
                        {/* Accuracy text in middle */}
                        <text 
                          x="50" y="50" 
                          textAnchor="middle" 
                          dominantBaseline="middle" 
                          className="text-slate-700 dark:text-white font-bold text-lg"
                        >
                          {set.accuracy}%
                        </text>
                      </svg>
                    </div>
                    
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(set.dateCompleted).toLocaleDateString()} • {set.pace}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Selection indicator */}
              {selectedSetId === set.id && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/4 h-1 rounded-full bg-white/70 dark:bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.7)]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
