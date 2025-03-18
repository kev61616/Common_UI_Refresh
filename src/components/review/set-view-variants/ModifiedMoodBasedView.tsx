'use client'

import { SetViewProps } from './types'

export function ModifiedMoodBasedView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <div className="mb-6">
        <div className="flex justify-center items-center gap-8 mb-4">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-500 mx-auto mb-2"></div>
            <div className="text-sm font-medium">Great</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500 mx-auto mb-2"></div>
            <div className="text-sm font-medium">Good</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-500 mx-auto mb-2"></div>
            <div className="text-sm font-medium">Average</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-orange-500 mx-auto mb-2"></div>
            <div className="text-sm font-medium">Challenging</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-red-500 mx-auto mb-2"></div>
            <div className="text-sm font-medium">Difficult</div>
          </div>
        </div>
        <div className="text-sm text-center text-slate-500 dark:text-slate-400">
          Results are grouped by your performance mood
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Group sets by mood (using accuracy as proxy) */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-slate-800/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <h4 className="font-bold text-green-700 dark:text-green-400">Great Progress</h4>
          </div>
          <div className="space-y-3">
            {practiceSets
              .filter(set => set.accuracy >= 85)
              .slice(0, 3)
              .map(set => (
                <div 
                  key={set.id}
                  onClick={() => onSelectSet && onSelectSet(set.id)}
                  className={`p-3 rounded-lg border border-green-100 dark:border-green-900/30 cursor-pointer transition-all bg-white/80 dark:bg-slate-800/60
                            ${selectedSetId === set.id 
                              ? 'ring-2 ring-green-500 shadow-md' 
                              : 'hover:shadow-md hover:bg-white dark:hover:bg-slate-800'}`}
                >
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{set.subject}</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">{set.accuracy}%</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{set.type}</div>
                </div>
            ))}
          </div>
        </div>
        
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-slate-800/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <h4 className="font-bold text-blue-700 dark:text-blue-400">Good Work</h4>
          </div>
          <div className="space-y-3">
            {practiceSets
              .filter(set => set.accuracy >= 70 && set.accuracy < 85)
              .slice(0, 3)
              .map(set => (
                <div 
                  key={set.id}
                  onClick={() => onSelectSet && onSelectSet(set.id)}
                  className={`p-3 rounded-lg border border-blue-100 dark:border-blue-900/30 cursor-pointer transition-all bg-white/80 dark:bg-slate-800/60
                            ${selectedSetId === set.id 
                              ? 'ring-2 ring-blue-500 shadow-md' 
                              : 'hover:shadow-md hover:bg-white dark:hover:bg-slate-800'}`}
                >
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{set.subject}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{set.accuracy}%</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{set.type}</div>
                </div>
            ))}
          </div>
        </div>
        
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-900/20 dark:to-slate-800/50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <h4 className="font-bold text-yellow-700 dark:text-yellow-400">Needs Focus</h4>
          </div>
          <div className="space-y-3">
            {practiceSets
              .filter(set => set.accuracy < 70)
              .slice(0, 3)
              .map(set => (
                <div 
                  key={set.id}
                  onClick={() => onSelectSet && onSelectSet(set.id)}
                  className={`p-3 rounded-lg border border-yellow-100 dark:border-yellow-900/30 cursor-pointer transition-all bg-white/80 dark:bg-slate-800/60
                            ${selectedSetId === set.id 
                              ? 'ring-2 ring-yellow-500 shadow-md' 
                              : 'hover:shadow-md hover:bg-white dark:hover:bg-slate-800'}`}
                >
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{set.subject}</span>
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold">{set.accuracy}%</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{set.type}</div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
