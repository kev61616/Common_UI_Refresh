'use client';

import { SetViewProps } from './types';

export function CardFlipView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="lfz6bv8">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="y_c8yh9">11. 3D Card Flip View</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-oid="bl6dwfy">
        {practiceSets.map((set) =>
        <div
          key={set.id}
          className={`group perspective-1000 cursor-pointer h-64 w-full ${
          selectedSetId === set.id ? 'selected-card' : ''}`
          }
          onClick={() => onSelectSet && onSelectSet(set.id)} data-oid="b6x7n5y">

            {/* Card container with 3D flip effect */}
            <div className="relative preserve-3d w-full h-full duration-700 group-hover:rotate-y-180" data-oid="l_dbo9m">
              {/* Front of card */}
              <div className="absolute backface-hidden w-full h-full rounded-xl border p-4 shadow-lg
                             bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900
                             dark:border-slate-700" data-oid="7q_1::_">








                <div className="flex flex-col h-full" data-oid="8wbk_o:">
                  <div className="flex items-center justify-between mb-4" data-oid="3p1696-">
                    <h4 className="font-bold text-xl" data-oid="t84lc:n">{set.subject}</h4>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                  set.subject === 'Reading' ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' :
                  set.subject === 'Math' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' :
                  'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'}`
                  } data-oid="juqpjb4">
                      {set.type}
                    </div>
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center" data-oid="w4_pbe9">
                    <div className="text-center" data-oid="v0o.k.j">
                      <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600" data-oid="opr0uw1">
                        {set.accuracy}%
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400" data-oid="jhc7hc8">Accuracy</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between items-center text-sm" data-oid="dokrzrh">
                    <span className="text-slate-500 dark:text-slate-400" data-oid="q803-rx">
                      {new Date(set.dateCompleted).toLocaleDateString()}
                    </span>
                    <span className="font-medium" data-oid="xw1bv0d">
                      {set.pace}
                    </span>
                  </div>
                </div>
                
                {/* Flip indicator */}
                <div className="absolute bottom-2 right-2 text-slate-400 dark:text-slate-600" data-oid="_kks64r">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" data-oid="n_q37dh">
                    <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" data-oid="_buuasa" />
                  </svg>
                </div>
              </div>
              
              {/* Back of card */}
              <div className="absolute backface-hidden w-full h-full rounded-xl border p-4 rotate-y-180
                             bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-slate-900 dark:to-indigo-950
                             dark:border-slate-700 shadow-lg" data-oid="esv15p2">








                <div className="flex flex-col h-full" data-oid="k9ykotc">
                  <h4 className="font-bold text-lg mb-3" data-oid="xap.szt">{set.subject} - {set.type}</h4>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4" data-oid="9qlv1c3">
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm" data-oid="cj8-ebu">
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="tnp3kmi">Time</div>
                      <div className="font-bold" data-oid="dyqvr0j">{Math.floor(set.timeUsed / 60)} min</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm" data-oid=":sjyjwq">
                      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="b57u5m9">Questions</div>
                      <div className="font-bold" data-oid=".dgh_k3">{Math.floor(Math.random() * 20) + 10}</div>
                    </div>
                  </div>
                  
                  <div className="flex-grow" data-oid="dstu0y3">
                    <div className="text-sm mb-2 font-medium" data-oid="3n:89g3">Strengths</div>
                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300 mb-3" data-oid="q5:r0e6">
                      <li className="flex items-center" data-oid="yhnxiqk">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5" data-oid="vaqphhi"></span>
                        {set.subject === 'Reading' ? 'Comprehension' : set.subject === 'Math' ? 'Equations' : 'Grammar'}
                      </li>
                      <li className="flex items-center" data-oid="ujs72ei">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5" data-oid="f-tqo.e"></span>
                        {set.subject === 'Reading' ? 'Vocabulary' : set.subject === 'Math' ? 'Geometry' : 'Structure'}
                      </li>
                    </ul>
                    
                    <div className="text-sm mb-2 font-medium" data-oid="rtgmxyy">Areas for Improvement</div>
                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300" data-oid="thq6nn3">
                      <li className="flex items-center" data-oid="t:1q.85">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-1.5" data-oid="pgl::t5"></span>
                        {set.subject === 'Reading' ? 'Critical Analysis' : set.subject === 'Math' ? 'Word Problems' : 'Transitions'}
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-center text-xs text-slate-500 dark:text-slate-400" data-oid="adbwlt9">
                    Click to view detailed analysis
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

}