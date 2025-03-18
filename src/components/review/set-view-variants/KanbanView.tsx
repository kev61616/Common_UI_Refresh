'use client'

import { SetViewProps } from './types'

export function KanbanView({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">6. Kanban Board</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {/* Reading Column */}
        <div className="flex-shrink-0 w-72 border border-slate-200 dark:border-slate-700 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 p-3">
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 rounded-full bg-sky-500 mr-2"></div>
            <h4 className="font-semibold">Reading</h4>
            <span className="ml-auto text-xs bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-300 rounded-full px-2 py-0.5">
              {practiceSets.filter(s => s.subject === 'Reading').length}
            </span>
          </div>
          <div className="space-y-2">
            {practiceSets.filter(s => s.subject === 'Reading').slice(0, 3).map(set => (
              <div 
                key={set.id}
                onClick={() => onSelectSet && onSelectSet(set.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all bg-white dark:bg-slate-800
                          ${selectedSetId === set.id 
                            ? 'border-sky-400 shadow-sm dark:border-sky-600' 
                            : 'border-slate-200 hover:border-sky-300 dark:border-slate-700 dark:hover:border-sky-700'}`}
              >
                <div className="text-sm font-medium mb-2">{set.subject} - {set.type}</div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    <span className="px-1.5 py-0.5 text-xs rounded-md bg-sky-100 text-sky-600 dark:bg-sky-900/70 dark:text-sky-300">
                      {set.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{set.pace}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Math Column */}
        <div className="flex-shrink-0 w-72 border border-slate-200 dark:border-slate-700 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 p-3">
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
            <h4 className="font-semibold">Math</h4>
            <span className="ml-auto text-xs bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300 rounded-full px-2 py-0.5">
              {practiceSets.filter(s => s.subject === 'Math').length}
            </span>
          </div>
          <div className="space-y-2">
            {practiceSets.filter(s => s.subject === 'Math').slice(0, 2).map(set => (
              <div 
                key={set.id}
                onClick={() => onSelectSet && onSelectSet(set.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all bg-white dark:bg-slate-800
                          ${selectedSetId === set.id 
                            ? 'border-indigo-400 shadow-sm dark:border-indigo-600' 
                            : 'border-slate-200 hover:border-indigo-300 dark:border-slate-700 dark:hover:border-indigo-700'}`}
              >
                <div className="text-sm font-medium mb-2">{set.subject} - {set.type}</div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    <span className="px-1.5 py-0.5 text-xs rounded-md bg-indigo-100 text-indigo-600 dark:bg-indigo-900/70 dark:text-indigo-300">
                      {set.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{set.pace}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Writing Column */}
        <div className="flex-shrink-0 w-72 border border-slate-200 dark:border-slate-700 rounded-xl bg-violet-50/50 dark:bg-violet-950/30 p-3">
          <div className="flex items-center mb-3">
            <div className="w-3 h-3 rounded-full bg-violet-500 mr-2"></div>
            <h4 className="font-semibold">Writing</h4>
            <span className="ml-auto text-xs bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-300 rounded-full px-2 py-0.5">
              {practiceSets.filter(s => s.subject === 'Writing').length}
            </span>
          </div>
          <div className="space-y-2">
            {practiceSets.filter(s => s.subject === 'Writing').slice(0, 2).map(set => (
              <div 
                key={set.id}
                onClick={() => onSelectSet && onSelectSet(set.id)}
                className={`p-3 rounded-lg border cursor-pointer transition-all bg-white dark:bg-slate-800
                          ${selectedSetId === set.id 
                            ? 'border-violet-400 shadow-sm dark:border-violet-600' 
                            : 'border-slate-200 hover:border-violet-300 dark:border-slate-700 dark:hover:border-violet-700'}`}
              >
                <div className="text-sm font-medium mb-2">{set.subject} - {set.type}</div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    <span className="px-1.5 py-0.5 text-xs rounded-md bg-violet-100 text-violet-600 dark:bg-violet-900/70 dark:text-violet-300">
                      {set.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{set.pace}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
