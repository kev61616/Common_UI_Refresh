'use client';

import { QuestionViewProps } from './types';

export function AncientScrollView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="iljh9ph">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="csxdr_.">32. Ancient Scroll View</h3>
      
      <div className="min-h-[500px] bg-amber-50 dark:bg-amber-950/40 rounded-lg p-6 overflow-hidden relative" data-oid="ehwudg1">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMC41IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz48L3N2Zz4=')] opacity-50" data-oid="ucpzb56"></div>
        
        {/* Scroll container */}
        <div className="relative z-10 flex flex-col items-center" data-oid="r0_tj_7">
          {/* Scroll header */}
          <div className="text-center mb-6" data-oid="z7mhm_c">
            <h4 className="text-2xl font-serif italic font-bold text-amber-900 dark:text-amber-200" data-oid="iz6vz2r">The Ancient Chronicles</h4>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1 font-serif" data-oid="54_-939">Herein lies the knowledge of thy studies</p>
            <div className="w-40 h-1 mx-auto mt-3 bg-amber-700 dark:bg-amber-500" data-oid="gspi1kx"></div>
          </div>
          
          {/* Scroll content */}
          <div className="w-full max-w-4xl bg-amber-100 dark:bg-amber-900/40 p-8 rounded-lg border-2 border-amber-200 dark:border-amber-800/50 shadow-lg" data-oid="a974:v3">
            {/* Decorative header */}
            <div className="flex justify-center mb-8" data-oid="jx5794-">
              <div className="w-24 h-24 relative" data-oid="t.lylg7">
                <div className="absolute inset-0 border-2 border-amber-700 dark:border-amber-500 rounded-full" data-oid="7t14wy_"></div>
                <div className="absolute inset-3 border-2 border-amber-700 dark:border-amber-500 rounded-full" data-oid="91._m7i"></div>
                <div className="absolute inset-6 border-2 border-amber-700 dark:border-amber-500 rounded-full" data-oid="k9mbv.t"></div>
                <div className="absolute inset-9 border-2 border-amber-700 dark:border-amber-500 rounded-full" data-oid="fsl_ngg"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-oid="s0264cv">
              {practiceSets.map((set) =>
              <div
                key={set.id}
                onClick={() => onSelectSet && onSelectSet(set.id)}
                className={`
                    bg-amber-50 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700
                    p-6 rounded-sm shadow-md relative cursor-pointer
                    hover:shadow-lg transition-shadow
                    ${selectedSetId === set.id ? 'ring-2 ring-amber-600 dark:ring-amber-400' : ''}
                  `} data-oid="k_sbctj">

                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-amber-800 dark:border-amber-600" data-oid="i.oww8i"></div>
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-amber-800 dark:border-amber-600" data-oid="w3z7uh."></div>
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-amber-800 dark:border-amber-600" data-oid="7g_tatr"></div>
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-amber-800 dark:border-amber-600" data-oid="reb-.:b"></div>
                  
                  {/* Ancient manuscript content */}
                  <div className="text-center mb-4" data-oid="o-h31u3">
                    <h5 className="font-serif text-xl text-amber-900 dark:text-amber-200 leading-tight" data-oid="9uo_evz">
                      {set.subject}: {set.type}
                    </h5>
                    <div className="w-20 h-1 mt-2 mb-2 mx-auto bg-amber-700 dark:bg-amber-600" data-oid="ym_s_ku"></div>
                    <p className="text-sm font-serif text-amber-800 dark:text-amber-300" data-oid="uok3c:v">
                      Completed on {new Date(set.dateCompleted).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                    </p>
                  </div>
                  
                  <div className="space-y-3 font-serif" data-oid="75wt9c_">
                    <div className="flex items-center" data-oid="9que4aa">
                      <span className="w-8 text-amber-800 dark:text-amber-300" data-oid="7ilaeyd">🖋️</span>
                      <div className="flex-1" data-oid="3f3l1v_">
                        <div className="text-sm text-amber-700 dark:text-amber-400" data-oid="-9ygo2x">Difficulty</div>
                        <div className="text-amber-900 dark:text-amber-200" data-oid="y2sh4bn">{set.difficulty}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center" data-oid="viet2n7">
                      <span className="w-8 text-amber-800 dark:text-amber-300" data-oid="bih5c_y">⏳</span>
                      <div className="flex-1" data-oid="n0j:juo">
                        <div className="text-sm text-amber-700 dark:text-amber-400" data-oid="75w73ze">Pace</div>
                        <div className="text-amber-900 dark:text-amber-200" data-oid="dxo-lfa">{set.pace}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center" data-oid="2n4y89y">
                      <span className="w-8 text-amber-800 dark:text-amber-300" data-oid="ttjeog:">📜</span>
                      <div className="flex-1" data-oid="b7-w1n7">
                        <div className="text-sm text-amber-700 dark:text-amber-400" data-oid="1tn7m.1">Questions</div>
                        <div className="text-amber-900 dark:text-amber-200" data-oid="xvfgwa6">{set.questions.length}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Wax seal showing accuracy */}
                  <div className="absolute -top-3 -right-3" data-oid="z:n1fqm">
                    <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center transform rotate-12
                      ${set.accuracy > 80 ? 'bg-red-700 dark:bg-red-800' :
                  set.accuracy > 60 ? 'bg-red-600 dark:bg-red-700' :
                  'bg-red-500 dark:bg-red-600'}
                    `} data-oid="_n0qk:4">
                      <div className="text-white font-serif text-lg font-bold" data-oid="xbzasaz">
                        {set.accuracy}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer flourish */}
            <div className="mt-10 text-center" data-oid="8f:k00e">
              <div className="w-28 h-1 mx-auto bg-amber-700 dark:bg-amber-600" data-oid="77a:2:y"></div>
              <p className="mt-4 text-sm font-serif italic text-amber-800 dark:text-amber-400" data-oid="9c3tlgb">
                "Knowledge is the treasure of a wise man" ~ Ancient Proverb
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>);

}