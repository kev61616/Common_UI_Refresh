'use client';

import { QuestionViewProps } from './types';

export function VintageBotanicalView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="aeuuh4v">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="g:0zf7q">29. Vintage Botanical View</h3>
      
      <div className="min-h-[500px] bg-cream-50 dark:bg-slate-800/50 rounded-lg p-6 overflow-hidden relative" data-oid="fx2ns9l">
        {/* Decorative botanical elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" data-oid="q6fykcc">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-green-700 dark:border-green-500 rounded-full" data-oid="vsqj95y"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-green-700 dark:border-green-500 rounded-full" data-oid="qnuaxtd"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-amber-700 dark:border-amber-500 rounded-full" data-oid="8lpqka-"></div>
        </div>
        
        <div className="flex flex-col space-y-8" data-oid="t5h9inc">
          {/* Main collection display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-oid="f96r-zs">
            {practiceSets.map((set) =>
            <div
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`
                  botanical-specimen relative bg-cream-100 dark:bg-slate-700 
                  rounded-lg p-6 border-2 border-amber-800/30 dark:border-amber-600/30
                  transition-all cursor-pointer hover:shadow-lg
                  ${selectedSetId === set.id ? 'ring-2 ring-amber-600 dark:ring-amber-400 shadow-lg' : ''}
                `} data-oid=".16_zkq">

                {/* Specimen label */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-amber-100 dark:bg-amber-900 border border-amber-800/30 dark:border-amber-600/30 rounded text-sm font-serif" data-oid="bp42463">
                  Specimen {set.id.slice(0, 3)}
                </div>
                
                {/* Botanical illustration */}
                <div className="flex items-center justify-center h-32 mb-4" data-oid="osdnu-a">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center 
                    ${set.accuracy > 80 ? 'bg-green-100 dark:bg-green-900/40' :
                set.accuracy > 60 ? 'bg-amber-100 dark:bg-amber-900/40' :
                'bg-red-100 dark:bg-red-900/40'}`
                } data-oid="sfcqy5.">

                    <span className="text-3xl font-serif" data-oid="sds_s_5">{set.accuracy}%</span>
                  </div>
                </div>
                
                {/* Scientific classification */}
                <div className="space-y-2 font-serif" data-oid="39k1cff">
                  <p className="text-center italic font-bold" data-oid="n_uecco">{set.subject}</p>
                  <p className="text-center" data-oid="-zkke0z">{set.type}</p>
                  <div className="flex justify-between text-sm mt-4 pt-2 border-t border-amber-800/20 dark:border-amber-600/20" data-oid="261w9e0">
                    <span className="italic" data-oid="ib16thh">Completed: {new Date(set.dateCompleted).toLocaleDateString()}</span>
                    <span data-oid="f486gf5">Questions: {set.questions.length}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Classification legend */}
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-lg" data-oid="kqz1z61">
            <h4 className="text-center font-serif font-bold mb-2" data-oid="4hm-nla">Taxonomic Classification</h4>
            <div className="grid grid-cols-3 gap-2 text-sm" data-oid="g81g1nc">
              <div className="flex items-center gap-2" data-oid="ujg06:v">
                <div className="w-3 h-3 rounded-full bg-green-500" data-oid="px9m1g-"></div>
                <span data-oid="cpdv56m">High Mastery (80%+)</span>
              </div>
              <div className="flex items-center gap-2" data-oid=".0vu8ps">
                <div className="w-3 h-3 rounded-full bg-amber-500" data-oid="rr_ga0o"></div>
                <span data-oid="zw35k6-">Moderate Mastery (60-80%)</span>
              </div>
              <div className="flex items-center gap-2" data-oid="9g8nt37">
                <div className="w-3 h-3 rounded-full bg-red-500" data-oid="i:2.vj:"></div>
                <span data-oid="hj2us7n">Low Mastery (&lt;60%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}