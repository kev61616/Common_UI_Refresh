import React from 'react';
import { EmptyResultsIcon } from './icons';
import { FilterState } from './types';

interface EmptyStateProps {
  resetFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ resetFilters }) => {
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-slate-200 text-center dark:bg-slate-800/50 dark:border-slate-700" data-oid="_ep3-hb">
      <div className="text-2xl text-slate-400 mb-4 dark:text-slate-500" data-oid="x4dg:r9">
        <EmptyResultsIcon data-oid="_vr025o" />
        No questions match your filters
      </div>
      <button
        onClick={resetFilters}
        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-sm font-medium transition-colors dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200" data-oid="-przor6">

        Reset Filters
      </button>
    </div>);

};