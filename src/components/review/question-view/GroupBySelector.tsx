import React from 'react'
import { GroupByOption } from './types'
import { GroupIcon } from './icons'

interface GroupBySelectorProps {
  groupBy: GroupByOption;
  setGroupBy: (option: GroupByOption) => void;
}

export const GroupBySelector: React.FC<GroupBySelectorProps> = ({
  groupBy,
  setGroupBy
}) => {
  return (
    <div className="md:w-2/5">
      <h3 className="text-sm font-medium text-slate-700 mb-3 dark:text-slate-300 flex items-center gap-1.5">
        <GroupIcon />
        Group Questions By
      </h3>
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => setGroupBy('topic')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            groupBy === 'topic'
              ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200'
              : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          Topic
        </button>
        <button 
          onClick={() => setGroupBy('subject')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            groupBy === 'subject'
              ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200'
              : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          Subject
        </button>
        <button 
          onClick={() => setGroupBy('difficulty')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            groupBy === 'difficulty'
              ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200'
              : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          Difficulty
        </button>
        <button 
          onClick={() => setGroupBy('date')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            groupBy === 'date'
              ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200'
              : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          Date
        </button>
      </div>
    </div>
  )
}
