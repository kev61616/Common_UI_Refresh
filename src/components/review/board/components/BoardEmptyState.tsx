'use client';

import React from 'react';

interface BoardEmptyStateProps {
  message?: string;
}

/**
 * Empty state component displayed when a board column has no items
 */
export function BoardEmptyState({ message = "No questions in this category" }: BoardEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center" data-oid="kk06ppd">
      <div className="text-slate-400 dark:text-slate-500 mb-2" data-oid="zojs2gn">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="94v45eh">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-oid="0xuokp-" />
        </svg>
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="z2xg6e9">{message}</div>
    </div>);

}