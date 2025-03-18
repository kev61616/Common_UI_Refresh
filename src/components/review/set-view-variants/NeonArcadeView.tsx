'use client'

import { SetViewProps } from './types'

export function NeonArcadeView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">22. Neon Arcade View</h3>
      
      <div className="relative py-6">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,70,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,70,.3)_1px,transparent_1px)] bg-[size:24px_24px] [perspective:500px] [transform:rotateX(60deg)] scale-y-[0.6] -z-10 opacity-40"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceSets.map((set, index) => (
            <div 
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(101,93,255,0.6),0_0_30px_rgba(101,93,255,0.4),0_0_45px_rgba(101,93,255,0.2)] ${
                selectedSetId === set.id 
                  ? 'scale-105 shadow-[0_0_15px_rgba(101,93,255,0.6),0_0_30px_rgba(101,93,255,0.4),0_0_45px_rgba(101,93,255,0.2)]' 
                  : 'shadow-lg'
              }`}
            >
              {/* Background with glow */}
              <div className="absolute inset-0 bg-slate-900 z-0">
                {/* Cyberpunk-style grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(55,48,163,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(55,48,163,0.3)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                
                {/* Glowing accent corner */}
                <div className={`absolute top-0 left-0 w-[150px] h-[150px] rounded-br-[100px] opacity-40 filter blur-[40px] ${
                  set.subject === 'Reading' ? 'bg-cyan-500' : 
                  set.subject === 'Math' ? 'bg-violet-600' : 'bg-rose-500'
                }`}></div>
                
                {/* Secondary glow */}
                <div className={`absolute bottom-0 right-0 w-[100px] h-[100px] rounded-tl-[70px] opacity-40 filter blur-[30px] ${
                  set.subject === 'Reading' ? 'bg-blue-500' : 
                  set.subject === 'Math' ? 'bg-indigo-500' : 'bg-pink-500'
                }`}></div>
              </div>
              
              {/* Content Container */}
              <div className="relative p-6 min-h-[280px] backdrop-blur-sm z-10">
                <div className="flex flex-col h-full">
                  {/* Neon sign title */}
                  <div className="mb-5">
                    <h3 className={`font-bold text-xl tracking-wider ${
                      set.subject === 'Reading' ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.6)]' : 
                      set.subject === 'Math' ? 'text-violet-400 drop-shadow-[0_0_5px_rgba(167,139,250,0.6)]' : 
                      'text-rose-400 drop-shadow-[0_0_5px_rgba(244,63,94,0.6)]'
                    }`} style={{ textShadow: '0 0 5px currentColor, 0 0 10px currentColor' }}>
                      {set.subject.toUpperCase()}
                    </h3>
                    <div className="flex items-center mt-1">
                      <div 
                        className={`h-0.5 w-8 mr-2 ${
                          set.subject === 'Reading' ? 'bg-cyan-400' : 
                          set.subject === 'Math' ? 'bg-violet-400' : 'bg-rose-400'
                        }`}
                      ></div>
                      <span className="text-xs uppercase tracking-widest text-slate-400">{set.type}</span>
                    </div>
                  </div>
                  
                  {/* Arcade-style score display */}
                  <div className="flex-grow flex items-center justify-center mb-5">
                    <div className="text-center">
                      {/* Arcade score counter */}
                      <div className="relative mb-3">
                        <div className="border-2 border-slate-700 bg-black px-4 py-2 rounded-md font-mono">
                          <div 
                            className={`text-4xl font-bold tracking-widest ${
                              set.accuracy > 85 ? 'text-green-400' : 
                              set.accuracy > 70 ? 'text-amber-400' : 'text-rose-400'
                            }`} 
                            style={{ textShadow: '0 0 5px currentColor' }}
                          >
                            {set.accuracy.toString().padStart(3, '0')}
                          </div>
                        </div>
                        {/* Arcade score label */}
                        <div 
                          className="absolute top-[-12px] left-[50%] translate-x-[-50%] px-3 bg-slate-900 uppercase tracking-wider text-[10px] font-bold"
                          style={{ textShadow: '0 0 2px currentColor' }}
                        >
                          <span className="text-cyan-400">S</span>
                          <span className="text-violet-400">C</span>
                          <span className="text-rose-400">O</span>
                          <span className="text-amber-400">R</span>
                          <span className="text-green-400">E</span>
                        </div>
                      </div>
                      
                      {/* High score */}
                      <div className="text-[10px] tracking-widest uppercase text-slate-500 font-mono">
                        High Score: 100
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom info bar with 80s tech feel */}
                  <div className="flex justify-between items-center">
                    <div className="border border-slate-700 rounded-md overflow-hidden px-2 py-1">
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest">Last Play</div>
                      <div className="text-xs font-mono text-cyan-400">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                    </div>
                    
                    <div 
                      className={`rounded-full px-3 py-1 text-xs uppercase font-medium tracking-wider ${
                        set.pace === 'Slow' 
                          ? 'bg-rose-400/20 text-rose-400 border border-rose-500/30' 
                          : set.pace === 'Normal' 
                            ? 'bg-amber-400/20 text-amber-400 border border-amber-500/30' 
                            : 'bg-green-400/20 text-green-400 border border-green-500/30'
                      }`}
                    >
                      {set.pace}
                    </div>
                  </div>
                  
                  {/* Play button */}
                  <div className="mt-5 group">
                    <button 
                      className={`w-full py-1.5 rounded-md uppercase text-sm tracking-widest font-bold flex items-center justify-center gap-2 transition-all ${
                        selectedSetId === set.id 
                          ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_10px_rgba(124,58,237,0.6)]' 
                          : 'bg-gradient-to-r from-violet-600/20 to-indigo-600/20 text-slate-200 hover:from-violet-600 hover:to-indigo-600 hover:text-white hover:shadow-[0_0_10px_rgba(124,58,237,0.6)]'
                      }`}
                    >
                      <span className="tracking-widest">Play</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Button glow */}
                    <div 
                      className={`h-1 mx-auto rounded-b-md transition-all ${
                        selectedSetId === set.id 
                          ? 'w-full bg-violet-500 shadow-[0_0_10px_rgba(124,58,237,0.8)]' 
                          : 'w-1/2 bg-transparent group-hover:w-full group-hover:bg-violet-500 group-hover:shadow-[0_0_10px_rgba(124,58,237,0.8)]'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400 rounded-tl-md"></div>
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-rose-400 rounded-tr-md"></div>
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-indigo-400 rounded-bl-md"></div>
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-violet-400 rounded-br-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
