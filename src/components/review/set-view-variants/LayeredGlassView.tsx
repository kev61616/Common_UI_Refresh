'use client';

import { SetViewProps } from './types';

export function LayeredGlassView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="k69h3eo">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="6pid-d5">27. Layered Glass View</h3>
      
      <div className="relative p-8 rounded-xl bg-gradient-to-bl from-fuchsia-50 via-violet-50 to-indigo-50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-violet-950/20 overflow-hidden" data-oid="a-sez9u">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none" data-oid="x8epfct">
          {/* Circular gradient blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-b from-violet-200/40 to-indigo-300/30 dark:from-violet-800/20 dark:to-indigo-900/20 rounded-full blur-2xl -translate-y-1/2" data-oid=".rlkhg1"></div>
          <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-gradient-to-b from-fuchsia-200/30 to-rose-300/20 dark:from-fuchsia-900/20 dark:to-rose-900/10 rounded-full blur-2xl translate-y-1/2" data-oid="468_ucq"></div>
          
          {/* Layered glass panels in background */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 dark:bg-white/5 backdrop-blur-sm rounded-2xl rotate-12" data-oid="nzibodd"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-64 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-2xl -rotate-6" data-oid="kbj0nw2"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-white/15 dark:bg-white/5 backdrop-blur-sm rounded-2xl rotate-45" data-oid=":u1.r67"></div>
        </div>
        
        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="3hkbr9b">
          {practiceSets.map((set, index) =>
          <div
            key={set.id}
            onClick={() => onSelectSet && onSelectSet(set.id)}
            className={`relative transition-all duration-500 ${
            selectedSetId === set.id ? 'z-10 transform-gpu scale-105' : 'hover:scale-102 hover:z-10'}`
            } data-oid="iioxxxx">

              {/* Multiple layered cards to create depth effect */}
              <div className="relative" data-oid="99t_s1z">
                {/* Background layers */}
                <div className={`absolute inset-0 rounded-xl transition-transform duration-500 ${
              selectedSetId === set.id ? 'translate-y-2 translate-x-2' : 'group-hover:translate-y-2 group-hover:translate-x-2'}`
              } data-oid="ewgd-6y">
                  <div className={`w-full h-full rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/30 dark:border-white/10
                      ${set.subject === 'Reading' ? 'bg-sky-50/20 dark:bg-sky-900/10' :
                set.subject === 'Math' ? 'bg-indigo-50/20 dark:bg-indigo-900/10' :
                'bg-violet-50/20 dark:bg-violet-900/10'}`} data-oid="8wxzjzu">
                </div>
                </div>
                
                <div className={`absolute inset-0 rounded-xl transition-transform duration-500 ${
              selectedSetId === set.id ? 'translate-y-1 translate-x-1' : 'group-hover:translate-y-1 group-hover:translate-x-1'}`
              } data-oid="j4t.hqa">
                  <div className={`w-full h-full rounded-xl bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-white/40 dark:border-white/10
                      ${set.subject === 'Reading' ? 'bg-sky-100/20 dark:bg-sky-800/10' :
                set.subject === 'Math' ? 'bg-indigo-100/20 dark:bg-indigo-800/10' :
                'bg-violet-100/20 dark:bg-violet-800/10'}`} data-oid="at7a4p.">
                </div>
                </div>
                
                {/* Main content card */}
                <div className={`relative h-full p-6 rounded-xl backdrop-blur-md transition-all duration-300
                    bg-white/40 dark:bg-slate-800/40
                    ${selectedSetId === set.id ?
              'shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_30px_-15px_rgba(90,60,250,0.3)]' :
              'shadow-[0_8px_30px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_20px_-15px_rgba(90,60,250,0.2)]'}
                    border border-white/50 dark:border-white/10
                    ${
              set.subject === 'Reading' ? 'bg-sky-100/30 dark:bg-sky-900/20' :
              set.subject === 'Math' ? 'bg-indigo-100/30 dark:bg-indigo-900/20' :
              'bg-violet-100/30 dark:bg-violet-900/20'}`} data-oid="tifu5cx">

                  {/* Glass highlight effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none" data-oid="nbs0uhv">
                    <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white/40 via-white/20 to-transparent rotate-12 dark:from-white/20 dark:via-white/10" data-oid="ezbw9wa"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col" data-oid="o7t1bn:">
                    {/* Subject badge */}
                    <div className="flex justify-between items-start mb-4" data-oid="xd42d_e">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm
                          ${set.subject === 'Reading' ?
                    'bg-sky-100/80 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' :
                    set.subject === 'Math' ?
                    'bg-indigo-100/80 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
                    'bg-violet-100/80 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'}`} data-oid="3koj8o8">

                        {set.subject}
                      </div>
                      
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="-l0tfnu">
                        {new Date(set.dateCompleted).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3" data-oid="cj5x9nu">{set.type}</h4>
                    
                    {/* Stats display */}
                    <div className="mt-auto pt-4" data-oid="fm99.20">
                      <div className="flex items-center gap-6" data-oid="xq3l.uk">
                        <div className="flex-1" data-oid="kjg8_jw">
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1" data-oid="8qz9sem">Accuracy</div>
                          <div className="h-2 bg-slate-200/60 dark:bg-slate-700/60 rounded-full overflow-hidden" data-oid="slgec6_">
                            <div
                            className={`h-full rounded-full ${
                            set.accuracy >= 90 ? 'bg-emerald-500 dark:bg-emerald-400' :
                            set.accuracy >= 70 ? 'bg-amber-500 dark:bg-amber-400' :
                            'bg-rose-500 dark:bg-rose-400'}`
                            }
                            style={{ width: `${set.accuracy}%` }} data-oid="93chtqp">
                          </div>
                          </div>
                          <div className="flex justify-between mt-1" data-oid="5v.gual">
                            <span className="text-xs text-slate-500 dark:text-slate-400" data-oid=".ap4ywl">0%</span>
                            <span className="text-xs font-medium" data-oid="e064b-0">{set.accuracy}%</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="k6._t03">100%</span>
                          </div>
                        </div>
                        
                        <div className="text-right" data-oid="8d07x:6">
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1" data-oid="fgqsz1b">Time / Pace</div>
                          <div className="text-sm font-medium text-slate-700 dark:text-slate-300" data-oid="w.vhp54">
                            {Math.floor(set.timeUsed / 60)}m
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="0e4meg5">
                            {set.pace}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Selection indicator */}
              {selectedSetId === set.id &&
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-white to-transparent dark:via-indigo-400" data-oid="iwe4e68"></div>
            }
            </div>
          )}
        </div>
      </div>
    </div>);

}