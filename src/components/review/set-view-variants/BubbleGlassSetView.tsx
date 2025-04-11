'use client';

import { PracticeSet } from '@/lib/mockData';

interface BubbleGlassSetViewProps {
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
}

/**
 * Bubble Glass Set View - A visually engaging set view with bubble glass effect
 */
export function BubbleGlassSetView({ practiceSets, onSelectSet, selectedSetId }: BubbleGlassSetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="ceqnydk">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="la5euvm">28. Bubble Glass Set View</h3>
      
      <div className="flex flex-col space-y-4" data-oid="stzj318">
        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-purple-900/20 rounded-xl" data-oid=".0zl_xt">
          <p className="text-lg font-medium text-indigo-700 dark:text-indigo-300" data-oid="65-yp44">
            This view is currently under implementation
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2" data-oid="tkaw.l9">
            Please check back soon for the complete bubble glass set view
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-oid="h2mp-s1">
          {practiceSets.slice(0, 6).map((set) =>
          <div
            key={set.id}
            onClick={() => onSelectSet && onSelectSet(set.id)}
            className={`relative overflow-hidden p-5 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-slate-800/40 cursor-pointer transition-all
                ${selectedSetId === set.id ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : 'hover:bg-white/60 dark:hover:bg-slate-800/60'}
                shadow-lg hover:shadow-xl dark:shadow-slate-900/30 group`} data-oid="3mo489i">

              {/* Decorative bubbles */}
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-blue-200/30 dark:bg-blue-500/10" data-oid="x:pw.27"></div>
              <div className="absolute -left-6 bottom-4 w-20 h-20 rounded-full bg-purple-200/40 dark:bg-purple-500/10" data-oid="8xh5hy."></div>
              
              <h4 className="font-bold text-slate-700 dark:text-white mb-2" data-oid="8rvjsi4">{set.subject}</h4>
              <div className="text-sm text-slate-600 dark:text-slate-300" data-oid="k-6vs:d">{set.type}</div>
              
              <div className="mt-4 flex justify-between items-center" data-oid=":k5bxa0">
                <div className="text-sm" data-oid="ue16l63">
                  <span className={`font-medium ${
                set.accuracy >= 80 ? 'text-green-600 dark:text-green-400' :
                set.accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' :
                'text-red-600 dark:text-red-400'}`
                } data-oid="l3cgtu2">
                    {set.accuracy}% accuracy
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="j546a5i">
                  {new Date(set.dateCompleted).toLocaleDateString()}
                </div>
              </div>
              
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" data-oid="khz.amf"></div>
            </div>
          )}
        </div>
      </div>
    </div>);

}