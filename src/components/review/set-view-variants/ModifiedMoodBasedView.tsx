'use client';

import { SetViewProps } from './types';

export function ModifiedMoodBasedView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="9yzr7xl">
      <div className="mb-6" data-oid="we4uifi">
        <div className="flex justify-center items-center gap-8 mb-4" data-oid="0daaxp7">
          <div className="text-center" data-oid="gz-jkfg">
            <div className="w-12 h-12 rounded-full bg-green-500 mx-auto mb-2" data-oid="7no8l5k"></div>
            <div className="text-sm font-medium" data-oid="sf:s5fu">Great</div>
          </div>
          <div className="text-center" data-oid="t:fc39m">
            <div className="w-12 h-12 rounded-full bg-blue-500 mx-auto mb-2" data-oid="_uylkr6"></div>
            <div className="text-sm font-medium" data-oid="ic30k-l">Good</div>
          </div>
          <div className="text-center" data-oid="wo171.a">
            <div className="w-12 h-12 rounded-full bg-yellow-500 mx-auto mb-2" data-oid="k3t03ur"></div>
            <div className="text-sm font-medium" data-oid="jd49eh3">Average</div>
          </div>
          <div className="text-center" data-oid="k27w58-">
            <div className="w-12 h-12 rounded-full bg-orange-500 mx-auto mb-2" data-oid="hjoqkbv"></div>
            <div className="text-sm font-medium" data-oid="wnupv0u">Challenging</div>
          </div>
          <div className="text-center" data-oid="h:s.89m">
            <div className="w-12 h-12 rounded-full bg-red-500 mx-auto mb-2" data-oid="liiogiy"></div>
            <div className="text-sm font-medium" data-oid="zw_qee_">Difficult</div>
          </div>
        </div>
        <div className="text-sm text-center text-slate-500 dark:text-slate-400" data-oid="qz5yi72">
          Results are grouped by your performance mood
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-oid="t9bbwfj">
        {/* Group sets by mood (using accuracy as proxy) */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-slate-800/50" data-oid="7w8ra1d">
          <div className="flex items-center gap-2 mb-4" data-oid="jyx9bth">
            <div className="w-4 h-4 rounded-full bg-green-500" data-oid="rdyuyuu"></div>
            <h4 className="font-bold text-green-700 dark:text-green-400" data-oid="z5vavh6">Great Progress</h4>
          </div>
          <div className="space-y-3" data-oid="pkqzzje">
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
              'hover:shadow-md hover:bg-white dark:hover:bg-slate-800'}`} data-oid="19iitqu">

                  <div className="flex justify-between items-center text-sm" data-oid="c:bw-ym">
                    <span className="font-medium" data-oid="tgyanhu">{set.subject}</span>
                    <span className="text-green-600 dark:text-green-400 font-bold" data-oid="8lh0oo_">{set.accuracy}%</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="jbtby_m">{set.type}</div>
                </div>
            )}
          </div>
        </div>
        
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800/50" data-oid="bmi-ap:">
          <div className="flex items-center gap-2 mb-4" data-oid="0rfui1l">
            <div className="w-4 h-4 rounded-full bg-blue-500" data-oid=":c9g19j"></div>
            <h4 className="font-bold text-blue-700 dark:text-blue-400" data-oid="idp7:ot">Good Work</h4>
          </div>
          <div className="space-y-3" data-oid="vdyl9gh">
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
              'hover:shadow-md hover:bg-white dark:hover:bg-slate-800'}`} data-oid="f7bqva:">

                  <div className="flex justify-between items-center text-sm" data-oid="lq1p-ci">
                    <span className="font-medium" data-oid="aygm-cb">{set.subject}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold" data-oid="o8_hsxr">{set.accuracy}%</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="afi-2s2">{set.type}</div>
                </div>
            )}
          </div>
        </div>
        
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800/50" data-oid="gf7ny3s">
          <div className="flex items-center gap-2 mb-4" data-oid="yzesx90">
            <div className="w-4 h-4 rounded-full bg-yellow-500" data-oid="pek:g:s"></div>
            <h4 className="font-bold text-yellow-700 dark:text-yellow-400" data-oid="oc4vrtp">Needs Focus</h4>
          </div>
          <div className="space-y-3" data-oid="nn1nwcj">
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
              'hover:shadow-md hover:bg-white dark:hover:bg-slate-800'}`} data-oid="...c9tj">

                  <div className="flex justify-between items-center text-sm" data-oid="fu:abjy">
                    <span className="font-medium" data-oid="5sz6225">{set.subject}</span>
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold" data-oid="pek84xo">{set.accuracy}%</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="55_84a5">{set.type}</div>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}