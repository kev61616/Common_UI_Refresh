'use client';

import React from 'react';

interface PerformanceFiltersProps {
  filterPerformance: 'low' | 'medium' | 'high' | null;
  setFilterPerformance: (val: 'low' | 'medium' | 'high' | null) => void;
}

/**
 * Quick filter buttons for performance levels
 */
export function PerformanceFilters({
  filterPerformance,
  setFilterPerformance
}: PerformanceFiltersProps) {
  return (
    <div className="mb-4 flex justify-center space-x-2" data-oid="ui01evs">
      <button
        onClick={() => setFilterPerformance(filterPerformance === 'low' ? null : 'low')}
        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
        filterPerformance === 'low' ?
        'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border border-rose-200 dark:border-rose-800' :
        'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`
        } data-oid="pbgr3em">

        <span className="inline-flex items-center" data-oid="peqqvj8">
          {filterPerformance === 'low' ?
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-oid=":h1rfzx">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" data-oid="vdfmv2w" />
            </svg> :
          null}
          Below 60%
        </span>
      </button>
      
      <button
        onClick={() => setFilterPerformance(filterPerformance === 'medium' ? null : 'medium')}
        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
        filterPerformance === 'medium' ?
        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800' :
        'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`
        } data-oid="j:v8t9n">

        <span className="inline-flex items-center" data-oid="yv1rgml">
          {filterPerformance === 'medium' ?
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-oid="m6g:14d">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" data-oid="gjuhjph" />
            </svg> :
          null}
          60-80%
        </span>
      </button>
      
      <button
        onClick={() => setFilterPerformance(filterPerformance === 'high' ? null : 'high')}
        className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
        filterPerformance === 'high' ?
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' :
        'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`
        } data-oid="wv1n3t-">

        <span className="inline-flex items-center" data-oid="5i2n:wy">
          {filterPerformance === 'high' ?
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-oid="8yh4soi">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" data-oid="y38afra" />
            </svg> :
          null}
          Above 80%
        </span>
      </button>
    </div>);

}