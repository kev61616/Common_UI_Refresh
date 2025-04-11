'use client';

import { SetViewProps } from './types';

export function GlassmorphismView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="zdy.7q3">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="pe82bw:">23. Glassmorphism View</h3>
      
      <div className="relative overflow-hidden rounded-lg p-8" data-oid="x7sujo7">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 overflow-hidden -z-10" data-oid="z-9qgxj">
          <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-400/20 to-purple-500/20 blur-3xl" data-oid=":ia.fqt"></div>
          <div className="absolute top-[100px] right-[-100px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-400/20 to-cyan-500/20 blur-3xl" data-oid="86m108j"></div>
          <div className="absolute bottom-[-100px] left-[30%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-amber-400/20 to-orange-500/20 blur-3xl" data-oid="r-s:vv-"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-oid="i5g3340">
          {practiceSets.map((set, index) =>
          <div
            key={set.id}
            onClick={() => onSelectSet && onSelectSet(set.id)}
            className={`group relative cursor-pointer transition-all duration-500 ${
            selectedSetId === set.id ? 'scale-105' : 'hover:scale-105'}`
            } data-oid="uik63ke">

              {/* Glass card */}
              <div className={`bg-white/10 dark:bg-slate-900/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-5 overflow-hidden 
                              shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-500
                              ${selectedSetId === set.id ?
            'shadow-[0_8px_30px_rgb(0,0,0,0.12),inset_0_0_0_1px_rgb(255,255,255,0.1)]' :
            'group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12),inset_0_0_0_1px_rgb(255,255,255,0.1)]'}`
            } data-oid="hkqd52q">

                {/* Subtle highlight effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" data-oid="wze6k2_"></div>
                
                {/* Glow accents */}
                <div className={`absolute -z-10 top-[-20px] right-[-20px] w-[100px] h-[100px] rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40 ${
              set.subject === 'Reading' ? 'bg-sky-400' :
              set.subject === 'Math' ? 'bg-violet-400' : 'bg-rose-400'}`
              } data-oid="rse:1ap"></div>
                
                <div className="flex flex-col h-full relative z-10" data-oid="gxrr54u">
                  {/* Top row with subject and accuracy */}
                  <div className="flex justify-between items-start mb-5" data-oid="v5jxxmd">
                    <div data-oid="bi_-zph">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    set.subject === 'Reading' ?
                    'bg-sky-500/10 text-sky-500 dark:bg-sky-400/10 dark:text-sky-400' :
                    set.subject === 'Math' ?
                    'bg-violet-500/10 text-violet-500 dark:bg-violet-400/10 dark:text-violet-400' :
                    'bg-rose-500/10 text-rose-500 dark:bg-rose-400/10 dark:text-rose-400'}`
                    } data-oid="xao42yf">
                        {set.subject}
                      </div>
                      <h4 className="mt-2 text-lg font-medium text-slate-700 dark:text-white" data-oid="vr4e6zc">{set.type}</h4>
                    </div>
                    
                    <div className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-500 group-hover:scale-110 ${
                  set.accuracy > 85 ?
                  'bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400' :
                  set.accuracy > 70 ?
                  'bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400' :
                  'bg-rose-500/10 text-rose-500 dark:bg-rose-400/10 dark:text-rose-400'}`
                  } data-oid="67nejzd">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed animate-[spin_12s_linear_infinite] opacity-60" data-oid="v.0w:_f"></div>
                      <span className="text-sm font-bold" data-oid="zl7g:rm">{set.accuracy}%</span>
                    </div>
                  </div>
                  
                  {/* Progress indicators */}
                  <div className="mb-6" data-oid=":-y4myh">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5" data-oid="lqxu4ru">
                      <span data-oid="jq-yc0l">Progress</span>
                      <span data-oid="xm5a0on">Excellent</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden" data-oid="1nhkumj">
                      <div
                      className={`h-full rounded-full ${
                      set.accuracy > 85 ?
                      'bg-gradient-to-r from-emerald-400 to-green-500' :
                      set.accuracy > 70 ?
                      'bg-gradient-to-r from-amber-400 to-orange-500' :
                      'bg-gradient-to-r from-rose-400 to-red-500'}`
                      }
                      style={{ width: `${set.accuracy}%` }} data-oid="8-50i-4">
                    </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mt-auto" data-oid="1xhdnjd">
                    <div className="space-y-1" data-oid="_9:uocs">
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="08dma39">Completed</div>
                      <div className="text-sm font-medium text-slate-700 dark:text-white flex items-center gap-1.5" data-oid=".rwdnze">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="ezd2r8k">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-oid="scyg355" />
                        </svg>
                        <span data-oid="dgm:4b9">{new Date(set.dateCompleted).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <div className="space-y-1" data-oid="lbq4krd">
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="w6svtz0">Time Used</div>
                      <div className="text-sm font-medium text-slate-700 dark:text-white flex items-center gap-1.5" data-oid="ibwxykb">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="2:_ahy1">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="4amw9kw" />
                        </svg>
                        <span data-oid="ovh3wk3">{set.timeUsed}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action button */}
                  <button
                  className={`mt-5 w-full py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedSetId === set.id ?
                  'bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm' :
                  'bg-white/5 backdrop-blur border border-white/10 text-slate-400 dark:text-slate-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white'}`
                  } data-oid="cy24e_0">

                    View Details
                  </button>
                </div>
              </div>
              
              {/* Reflection effect at bottom */}
              <div className="absolute top-[99%] left-[5%] right-[5%] h-[10px] bg-gradient-to-b from-black/20 to-transparent blur-sm rounded-b-3xl" data-oid=".1w1a.e"></div>
            </div>
          )}
        </div>
      </div>
    </div>);

}