'use client';

import { SetViewProps } from './types';

export function PrismaticGlassView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="6:ior4b">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="kptxc_a">29. Prismatic Glass View</h3>
      
      <div className="relative p-8 rounded-xl bg-gradient-to-r from-slate-50 via-fuchsia-50 to-indigo-50 dark:from-slate-900 dark:via-fuchsia-950/10 dark:to-indigo-950/10 overflow-hidden" data-oid="7.6y082">
        {/* Background prism effect */}
        <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none"
        style={{ mixBlendMode: 'soft-light' }} data-oid="6j2:q46">
          {/* Prismatic background gradients */}
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-b from-pink-200 via-fuchsia-200 to-purple-200 dark:from-pink-900/30 dark:via-fuchsia-900/30 dark:to-purple-900/30 rotate-12 rounded-3xl blur-xl" data-oid="shkvjeo"></div>
          <div className="absolute -bottom-40 -left-20 w-[30rem] h-[30rem] bg-gradient-to-t from-indigo-200 via-blue-200 to-sky-200 dark:from-indigo-900/30 dark:via-blue-900/30 dark:to-sky-900/30 -rotate-12 rounded-3xl blur-xl" data-oid="3:l3ljf"></div>
          
          {/* Prismatic geometric shapes */}
          <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-orange-300/30 to-amber-200/20 dark:from-orange-800/20 dark:to-amber-900/10 transform rotate-45" data-oid="by.-iz3"></div>
          <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-gradient-to-tl from-emerald-300/20 to-teal-200/10 dark:from-emerald-800/10 dark:to-teal-900/5 transform -rotate-12" data-oid="eeh0edf"></div>
          
          {/* Thin diagonal light beams simulating prism refraction */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-70" data-oid="45b0cus">
            {Array.from({ length: 8 }).map((_, i) =>
            <div
              key={i}
              className="absolute h-[200%] w-[5px] bg-gradient-to-b from-transparent via-white to-transparent"
              style={{
                left: `${10 + i * 15}%`,
                top: '-50%',
                transform: `rotate(${30 + i * 5}deg)`,
                opacity: 0.1 + i * 0.01
              }} data-oid="rwpf0hy">
            </div>
            )}
          </div>
        </div>
        
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="tno8_wl">
          {practiceSets.map((set, index) =>
          <div
            key={set.id}
            onClick={() => onSelectSet && onSelectSet(set.id)}
            className={`group relative ${
            selectedSetId === set.id ? 'z-10' : ''}`
            } data-oid="20tm._w">

              {/* Prismatic card with angular design */}
              <div className={`relative transition-all duration-500 transform perspective-[1000px] ${
            selectedSetId === set.id ? 'scale-[1.03]' : 'hover:scale-[1.02]'}`
            } data-oid="25xp95l">
                {/* Angular shape with sharp cut corners */}
                <div
                className={`relative h-full p-5 backdrop-blur-md transition-all duration-300
                    ${selectedSetId === set.id ?
                'shadow-[0_10px_30px_rgba(167,139,250,0.35)]' :
                'shadow-[0_5px_15px_rgba(167,139,250,0.15)]'}
                    bg-white/30 dark:bg-slate-900/30
                    border border-white/50 dark:border-white/10`
                }
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 85% 100%, 0% 100%)',
                  transform: selectedSetId === set.id ?
                  'rotateX(5deg) rotateY(-5deg)' :
                  'rotateX(0) rotateY(0)',
                  transformStyle: 'preserve-3d'
                }} data-oid="ambjtuz">

                  {/* Prismatic light refraction effects */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 85% 100%, 0% 100%)' }} data-oid="7syb79y">
                    {/* Top refraction */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/50 to-transparent dark:from-white/20" data-oid="ihds5cb"></div>
                    
                    {/* Rainbow color edge */}
                    <div className={`absolute bottom-0 right-[15%] w-[15%] h-full transform-gpu origin-bottom-left rotate-[18deg] ${
                  set.subject === 'Reading' ?
                  'bg-gradient-to-t from-blue-400/20 via-sky-400/20 to-cyan-400/20 dark:from-blue-800/30 dark:via-sky-800/30 dark:to-cyan-800/30' :
                  set.subject === 'Math' ?
                  'bg-gradient-to-t from-violet-400/20 via-indigo-400/20 to-blue-400/20 dark:from-violet-800/30 dark:via-indigo-800/30 dark:to-blue-800/30' :
                  'bg-gradient-to-t from-fuchsia-400/20 via-purple-400/20 to-violet-400/20 dark:from-fuchsia-800/30 dark:via-purple-800/30 dark:to-violet-800/30'}`
                  } data-oid="c7o6dyf"></div>
                    
                    {/* Diagonal prismatic beam */}
                    <div className={`absolute top-0 -left-20 w-40 h-[200%] transform-gpu rotate-45 opacity-20 ${
                  set.subject === 'Reading' ?
                  'bg-gradient-to-t from-transparent via-sky-300 to-transparent dark:via-sky-700' :
                  set.subject === 'Math' ?
                  'bg-gradient-to-t from-transparent via-indigo-300 to-transparent dark:via-indigo-700' :
                  'bg-gradient-to-t from-transparent via-purple-300 to-transparent dark:via-purple-700'}`
                  } data-oid="14sby4b"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col" data-oid=":6y7w2b">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4" data-oid="tn6yck.">
                      <div className={`px-3 py-1 rounded-sm text-sm font-medium backdrop-blur-sm 
                        ${set.subject === 'Reading' ?
                    'bg-sky-500/20 text-sky-700 dark:bg-sky-500/30 dark:text-sky-300' :
                    set.subject === 'Math' ?
                    'bg-indigo-500/20 text-indigo-700 dark:bg-indigo-500/30 dark:text-indigo-300' :
                    'bg-violet-500/20 text-violet-700 dark:bg-violet-500/30 dark:text-violet-300'}`} data-oid="ko4e3ft">

                        {set.subject}
                      </div>
                      
                      <div className={`text-xs font-bold px-2 py-0.5 rounded-sm
                        ${set.accuracy >= 90 ?
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' :
                    set.accuracy >= 70 ?
                    'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                    'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'}`} data-oid="7a8d-qn">

                        {set.accuracy}%
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3" data-oid="36.14_.">{set.type}</h4>
                    
                    <div className="text-sm text-slate-600 dark:text-slate-300 mb-6 line-clamp-2" data-oid="9ywfi.o">
                      Completed on {new Date(set.dateCompleted).toLocaleDateString()} with {set.pace.toLowerCase()} pace
                    </div>
                    
                    {/* Stats */}
                    <div className="mt-auto" data-oid="pzk0gtm">
                      {/* Progress bars */}
                      <div className="space-y-3" data-oid="lsu-kfp">
                        <div data-oid="8_vxxwj">
                          <div className="flex justify-between items-center text-xs mb-1" data-oid="sy3avpl">
                            <span className="text-slate-500 dark:text-slate-400" data-oid="6f6w.7:">Time</span>
                            <span className="font-medium text-slate-700 dark:text-slate-300" data-oid="mly7ks0">{Math.floor(set.timeUsed / 60)} min</span>
                          </div>
                          <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden" data-oid="-_cvb_b">
                            <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400"
                            style={{ width: `${set.timeUsed / 3600 * 100}%` }} // assuming max time is 60 min
                            data-oid="0_nraiy"></div>
                          </div>
                        </div>
                        
                        <div data-oid="0.se8:u">
                          <div className="flex justify-between items-center text-xs mb-1" data-oid=".n8rhb4">
                            <span className="text-slate-500 dark:text-slate-400" data-oid="jbzxk0_">Pace</span>
                            <span className="font-medium text-slate-700 dark:text-slate-300" data-oid="n7h7jeb">{set.pace}</span>
                          </div>
                          <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden" data-oid="-chf8ez">
                            {/* Simulate pace indicator */}
                            <div
                            className={`h-full ${
                            set.pace === 'Fast' ? 'w-[90%] bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400' :
                            set.pace === 'Normal' ? 'w-[60%] bg-gradient-to-r from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-400' :
                            'w-[30%] bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400' // Slow
                            }`} data-oid="9luiql4">
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 3D edge depth effect */}
                <div
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
                selectedSetId === set.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`
                }
                style={{
                  clipPath: 'polygon(85% 100%, 100% 70%, 100% 100%)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0))',
                  backdropFilter: 'blur(4px)',
                  transform: 'translateZ(-1px)',
                  transformStyle: 'preserve-3d'
                }} data-oid="exrp21z">
              </div>
              </div>
              
              {/* Selection indicator */}
              {selectedSetId === set.id &&
            <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400" data-oid=".4smz4n"></div>
            }
            </div>
          )}
        </div>
      </div>
    </div>);

}