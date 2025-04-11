'use client';

import { SetViewProps } from './types';

export function FloatingIslandView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="gy4vld4">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="9z4jaa1">21. Floating Islands View</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="hlfvn-_">
        {practiceSets.map((set, index) =>
        <div
          key={set.id}
          onClick={() => onSelectSet && onSelectSet(set.id)}
          className={`group relative cursor-pointer h-80 transition-all duration-500 hover:translate-y-[-15px] hover:shadow-2xl ${
          selectedSetId === set.id ? 'translate-y-[-15px] shadow-2xl' : 'shadow-lg'}`
          }
          style={{ transformStyle: 'preserve-3d' }} data-oid="ac3ja0e">

            {/* Floating shadow - detaches as card rises */}
            <div className="absolute bottom-[-10px] left-[10%] w-[80%] h-[10px] bg-black/20 dark:bg-black/40 rounded-full blur-md transition-all duration-500 group-hover:bottom-[-20px] group-hover:opacity-60" data-oid="gwg_psi"></div>
            
            {/* Main card body */}
            <div className={`relative w-full h-full rounded-xl overflow-hidden ${
          selectedSetId === set.id ? 'ring-2 ring-indigo-400 dark:ring-indigo-500' : ''}`
          } data-oid="xj6tv67">
              {/* Parallax background elements */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-50 to-indigo-100 dark:from-slate-900 dark:to-indigo-950" data-oid="yljiq3:">
                {/* Cloud elements that move slower than the foreground */}
                <div
                className="absolute top-[10%] left-[15%] w-20 h-6 bg-white dark:bg-white/10 rounded-full blur-md opacity-60 transition-transform duration-500 group-hover:translate-x-[-5px]"
                style={{ transform: 'translateZ(-50px)' }} data-oid="0-rc1s6">
              </div>
                <div
                className="absolute top-[20%] right-[20%] w-16 h-5 bg-white dark:bg-white/10 rounded-full blur-md opacity-70 transition-transform duration-500 group-hover:translate-x-[5px]"
                style={{ transform: 'translateZ(-40px)' }} data-oid="8k72br9">
              </div>
                
                {/* "Distant" floating islands */}
                <div
                className="absolute bottom-[20%] left-[5%] w-12 h-3 rounded-t-lg bg-indigo-200 dark:bg-indigo-900/50 transition-transform duration-500 group-hover:translate-x-[-3px] group-hover:translate-y-[2px]"
                style={{ transform: 'translateZ(-30px)' }} data-oid="g1laps2">
              </div>
                <div
                className="absolute bottom-[15%] right-[10%] w-16 h-4 rounded-t-lg bg-violet-200 dark:bg-violet-900/50 transition-transform duration-500 group-hover:translate-x-[3px] group-hover:translate-y-[2px]"
                style={{ transform: 'translateZ(-20px)' }} data-oid="v3scicz">
              </div>
              </div>
              
              {/* Main "island" containing content */}
              <div className="absolute inset-x-4 bottom-4 top-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200/80 dark:border-slate-700/50 p-4 z-10 transition-transform duration-500 group-hover:translate-y-[-2px]" style={{ transform: 'translateZ(20px)' }} data-oid="br0awmu">
                <div className="flex flex-col h-full" data-oid="_1k18v8">
                  {/* Header with floating accent */}
                  <div className="mb-3 relative" data-oid="q135g_v">
                    <div
                    className={`absolute top-0 left-0 w-16 h-1.5 rounded transition-transform duration-500 group-hover:translate-y-[-1px] ${
                    set.subject === 'Reading' ? 'bg-sky-400' :
                    set.subject === 'Math' ? 'bg-indigo-400' : 'bg-violet-400'}`
                    }
                    style={{ transform: 'translateZ(30px)' }} data-oid=".0zhk1k">
                  </div>
                    <h4 className="text-xl font-bold pt-3" data-oid="benmvsx">{set.subject}</h4>
                    <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="aunrcfp">{set.type}</div>
                  </div>
                  
                  {/* Main content */}
                  <div className="flex-grow flex items-center justify-center" data-oid="xrhah2b">
                    <div className="text-center transition-transform duration-500 group-hover:translate-y-[-3px]" style={{ transform: 'translateZ(40px)' }} data-oid="nbw7f2p">
                      <div className="relative mb-1" data-oid="ag.eexk">
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600" data-oid="5z9v54s">
                          {set.accuracy}%
                        </div>
                        {/* Floating indicator */}
                        <div className={`absolute top-[-8px] right-[-15px] px-1.5 py-0.5 text-[10px] font-semibold text-white rounded-md transform rotate-12 transition-transform duration-500 group-hover:rotate-[15deg] group-hover:translate-y-[-2px] ${
                      set.accuracy > 85 ? 'bg-emerald-500' :
                      set.accuracy > 70 ? 'bg-amber-500' : 'bg-rose-500'}`
                      } style={{ transform: 'translateZ(50px)' }} data-oid="-bai5fc">
                          {set.accuracy > 85 ? 'Excellent!' :
                        set.accuracy > 70 ? 'Good' : 'Needs Work'}
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 font-medium" data-oid="clozsvt">Accuracy</div>
                    </div>
                  </div>
                  
                  {/* Footer info */}
                  <div className="border-t border-slate-100 dark:border-slate-700/50 pt-3 flex justify-between items-center text-sm" data-oid="-yh5s2u">
                    <div className="text-slate-500 dark:text-slate-400" data-oid="7i1wg_o">
                      <div className="text-xs" data-oid="lw4:8fz">{new Date(set.dateCompleted).toLocaleDateString()}</div>
                      <div className="flex items-center mt-1" data-oid="ggsgqr8">
                        <span className="w-1.5 h-1.5 rounded-full mr-1 bg-sky-400" data-oid="uf-c04v"></span>
                        <span data-oid="gfw7-9.">{set.pace}</span>
                      </div>
                    </div>
                    <div
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-slate-700 transition-transform duration-500 group-hover:translate-y-[-2px]"
                    style={{ transform: 'translateZ(25px)' }} data-oid="kqfzag.">

                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 dark:text-indigo-300" viewBox="0 0 20 20" fill="currentColor" data-oid="yd.s1-p">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" data-oid="jrfgdjt" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400" data-oid="2q22-j.">Hover over islands to explore</div>
    </div>);

}