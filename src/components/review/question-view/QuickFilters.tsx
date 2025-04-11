import React from 'react';
import { FilterState } from './types';
import { SubjectIcon } from './icons';

interface QuickFiltersProps {
  activeFilters: FilterState;
  toggleSubjectFilter: (subject: string) => void;
  toggleDifficultyFilter: (difficulty: string) => void;
  toggleStatusFilter: (status: 'correct' | 'incorrect') => void;
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  activeFilters,
  toggleSubjectFilter,
  toggleDifficultyFilter,
  toggleStatusFilter
}) => {
  return (
    <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700/50" data-oid="09rwlu-">
      <div className="flex flex-wrap gap-x-6 gap-y-4" data-oid="tt-dsjo">
        {/* Subject Filters */}
        <div className="flex items-center gap-2" data-oid="._31:z3">
          <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="zv-i0xq">Subject:</span>
          <div className="flex gap-1" data-oid="zhiu2n1">
            <button
              onClick={() => toggleSubjectFilter('Reading')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all flex items-center gap-1 ${
              activeFilters.subjects.includes('Reading') ?
              'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' :
              'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid=".2f2w-d">

              <SubjectIcon subject="Reading" data-oid="02vb625" />
              Reading
            </button>
            <button
              onClick={() => toggleSubjectFilter('Writing')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all flex items-center gap-1 ${
              activeFilters.subjects.includes('Writing') ?
              'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200' :
              'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid="uw3h4uq">

              <SubjectIcon subject="Writing" data-oid="gntdtn1" />
              Writing
            </button>
            <button
              onClick={() => toggleSubjectFilter('Math')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all flex items-center gap-1 ${
              activeFilters.subjects.includes('Math') ?
              'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200' :
              'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid="s1pu59c">

              <SubjectIcon subject="Math" data-oid="g_88hjy" />
              Math
            </button>
          </div>
        </div>
        
        {/* Difficulty Filters */}
        <div className="flex items-center gap-2" data-oid=".5:_c.2">
          <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="nxm1xxh">Difficulty:</span>
          <div className="flex gap-1" data-oid="4k03i3u">
            <button
              onClick={() => toggleDifficultyFilter('Easy')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
              activeFilters.difficulties.includes('Easy') ?
              'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
              'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid="q9pvxlx">

              Easy
            </button>
            <button
              onClick={() => toggleDifficultyFilter('Medium')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
              activeFilters.difficulties.includes('Medium') ?
              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200' :
              'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid="203wiq1">

              Medium
            </button>
            <button
              onClick={() => toggleDifficultyFilter('Hard')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
              activeFilters.difficulties.includes('Hard') ?
              'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' :
              'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid="m4f8t1g">

              Hard
            </button>
          </div>
        </div>
        
        {/* Status Filters */}
        <div className="flex items-center gap-2" data-oid="hssw6g5">
          <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="6ria.4s">Status:</span>
          <div className="flex gap-1" data-oid="yzpc10z">
            <button
              onClick={() => toggleStatusFilter('correct')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
              activeFilters.status.includes('correct') ?
              'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' :
              'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid="4-9bte3">

              Correct
            </button>
            <button
              onClick={() => toggleStatusFilter('incorrect')}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
              activeFilters.status.includes('incorrect') ?
              'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200' :
              'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`
              } data-oid="fyefsd4">

              Incorrect
            </button>
          </div>
        </div>
      </div>
    </div>);

};