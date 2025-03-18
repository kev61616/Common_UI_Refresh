'use client'

import { PracticeSet } from '@/lib/mockData'

interface BubbleGlassSetViewProps {
  practiceSets: PracticeSet[]
  onSelectSet: (id: string) => void
  selectedSetId: string | null
}

/**
 * Bubble Glass Set View - A visually engaging set view with bubble glass effect
 */
export function BubbleGlassSetView({ practiceSets, onSelectSet, selectedSetId }: BubbleGlassSetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">28. Bubble Glass Set View</h3>
      
      <div className="flex flex-col space-y-4">
        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-purple-900/20 rounded-xl">
          <p className="text-lg font-medium text-indigo-700 dark:text-indigo-300">
            This view is currently under implementation
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Please check back soon for the complete bubble glass set view
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceSets.slice(0, 6).map(set => (
            <div 
              key={set.id}
              onClick={() => onSelectSet && onSelectSet(set.id)}
              className={`relative overflow-hidden p-5 rounded-xl backdrop-blur-sm bg-white/40 dark:bg-slate-800/40 cursor-pointer transition-all
                ${selectedSetId === set.id ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : 'hover:bg-white/60 dark:hover:bg-slate-800/60'}
                shadow-lg hover:shadow-xl dark:shadow-slate-900/30 group`}
            >
              {/* Decorative bubbles */}
              <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-blue-200/30 dark:bg-blue-500/10"></div>
              <div className="absolute -left-6 bottom-4 w-20 h-20 rounded-full bg-purple-200/40 dark:bg-purple-500/10"></div>
              
              <h4 className="font-bold text-slate-700 dark:text-white mb-2">{set.subject}</h4>
              <div className="text-sm text-slate-600 dark:text-slate-300">{set.type}</div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm">
                  <span className={`font-medium ${
                    set.accuracy >= 80 ? 'text-green-600 dark:text-green-400' : 
                    set.accuracy >= 60 ? 'text-amber-600 dark:text-amber-400' : 
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {set.accuracy}% accuracy
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(set.dateCompleted).toLocaleDateString()}
                </div>
              </div>
              
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
