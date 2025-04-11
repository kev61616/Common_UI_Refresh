'use client';

import { SetViewProps } from './types';

export function MoodBasedView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="gzohf:h">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="6tla.-b">13. Mood-Based View</h3>
      
      <div className="mb-6" data-oid="vc:ue45">
        <div className="flex justify-center items-center gap-8 mb-4" data-oid="_g0:.w:">
          <div className="text-center" data-oid="n0sd0mt">
            <div className="w-12 h-12 rounded-full bg-green-500 mx-auto mb-2" data-oid="8yzzpym"></div>
            <div className="text-sm font-medium" data-oid="1-d_jrg">Great</div>
          </div>
          <div className="text-center" data-oid="kyuylvy">
            <div className="w-12 h-12 rounded-full bg-blue-500 mx-auto mb-2" data-oid="osti_l8"></div>
            <div className="text-sm font-medium" data-oid="wvrk8rw">Good</div>
          </div>
          <div className="text-center" data-oid="a3z4gec">
            <div className="w-12 h-12 rounded-full bg-yellow-500 mx-auto mb-2" data-oid="k3x4.8s"></div>
            <div className="text-sm font-medium" data-oid="f:hddf_">Average</div>
          </div>
          <div className="text-center" data-oid="w:-7-co">
            <div className="w-12 h-12 rounded-full bg-orange-500 mx-auto mb-2" data-oid="h36gjb:"></div>
            <div className="text-sm font-medium" data-oid="v23ot8k">Challenging</div>
          </div>
          <div className="text-center" data-oid="x4u6jxj">
            <div className="w-12 h-12 rounded-full bg-red-500 mx-auto mb-2" data-oid="q6om9fj"></div>
            <div className="text-sm font-medium" data-oid="wxvo6ht">Difficult</div>
          </div>
        </div>
        <div className="text-sm text-center text-slate-500 dark:text-slate-400" data-oid="9n-z52.">
          Results are grouped by your performance mood
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-oid="_pjmrs2">
        {/* Group sets by mood (using accuracy as proxy) */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-slate-800/50" data-oid="gfptqye">
          <div className="flex items-center gap-2 mb-4" data-oid="22avgli">
            <div className="w-4 h-4 rounded-full bg-green-500" data-oid="laukobf"></div>
            <h4 className="font-bold text-green-700 dark:text-green-400" data-oid="er3y4qd">Great Progress</h4>
          </div>
          <div className="space-y-3" data-oid="z7b1.9b">
            {practiceSets.
            filter((set) => set.accuracy >= 85).
            slice(0, 3).
            map((set) =>
            <div
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`p-3 rounded-lg border border-green-100 dark:border-green-900/30 cursor-pointer transition-all bg-white/80 dark:bg-slate-800/60
                            ${selectedSetId === set.id ?
              'ring-2 ring-green-500 shadow-md' :
              'hover:shadow-md hover:bg-white dark:hover:bg-slate-800'}`} data-oid="-_vmswo">

                  <div className="flex justify-between items-center text-sm" data-oid="b-ryakf">
                    <span className="font-medium" data-oid="cnapj5y">{set.subject}</span>
                    <span className="text-green-600 dark:text-green-400 font-bold" data-oid="v5e0w.v">{set.accuracy}%</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="3yof0bh">{set.type}</div>
                </div>
            )}
          </div>
        </div>
        
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800/50" data-oid="i44.h-z">
          <div className="flex items-center gap-2 mb-4" data-oid="fp3rdl8">
            <div className="w-4 h-4 rounded-full bg-blue-500" data-oid="a1-u2:-"></div>
            <h4 className="font-bold text-blue-700 dark:text-blue-400" data-oid="d73uho_">Good Work</h4>
          </div>
          <div className="space-y-3" data-oid="j3spk7p">
            {practiceSets.
            filter((set) => set.accuracy >= 70 && set.accuracy < 85).
            slice(0, 3).
            map((set) =>
            <div
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`p-3 rounded-lg border border-blue-100 dark:border-blue-900/30 cursor-pointer transition-all bg-white/80 dark:bg-slate-800/60
                            ${selectedSetId === set.id ?
              'ring-2 ring-blue-500 shadow-md' :
              'hover:shadow-md hover:bg-white dark:hover:bg-slate-800'}`} data-oid="yl4u_fr">

                  <div className="flex justify-between items-center text-sm" data-oid="b_loy3g">
                    <span className="font-medium" data-oid="c7ucvrj">{set.subject}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold" data-oid="lgs_-56">{set.accuracy}%</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="jhp:p:w">{set.type}</div>
                </div>
            )}
          </div>
        </div>
        
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800/50" data-oid="6cxwk5.">
          <div className="flex items-center gap-2 mb-4" data-oid="8n14:-r">
            <div className="w-4 h-4 rounded-full bg-yellow-500" data-oid="-.1_8se"></div>
            <h4 className="font-bold text-yellow-700 dark:text-yellow-400" data-oid="045p9mh">Needs Focus</h4>
          </div>
          <div className="space-y-3" data-oid="u:u2900">
            {practiceSets.
            filter((set) => set.accuracy < 70).
            slice(0, 3).
            map((set) =>
            <div
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/30 cursor-pointer transition-all bg-white/80 dark:bg-slate-800/60
                            ${selectedSetId === set.id ?
              'ring-2 ring-yellow-500 shadow-md' :
              'hover:shadow-md hover:bg-white dark:hover:bg-slate-800'}`} data-oid="_nuv2_u">

                  <div className="flex justify-between items-center text-sm" data-oid="si3vgf4">
                    <span className="font-medium" data-oid="62zkb2g">{set.subject}</span>
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold" data-oid="pq9h3uq">{set.accuracy}%</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="a7m3f0g">{set.type}</div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}