'use client'

import React from 'react'
import { MatrixCell } from '../types'
import { getCellColor, getTextColor } from '../utils/dataUtils'

interface MatrixCellProps {
  cell: MatrixCell
  isSelected: boolean
  isHighlighted: boolean
  onClick: () => void
  onChallengeClick?: (e: React.MouseEvent) => void
}

/**
 * Renders a single cell in the performance matrix
 */
export function MatrixCellComponent({
  cell,
  isSelected,
  isHighlighted,
  onClick,
  onChallengeClick
}: MatrixCellProps) {
  return (
    <td 
      onClick={onClick}
      className={`p-0 border dark:border-slate-700 ${
        isSelected
          ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 z-10 relative'
          : ''
      } ${
        isHighlighted
          ? 'ring-2 ring-sky-500 dark:ring-sky-400 z-10 relative'
          : ''
      }`}
    >
      <div className={`h-24 p-3 cursor-pointer transition-all hover:shadow-md ${getCellColor(cell.accuracy, cell.count)}`}>
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className={`text-lg font-bold ${getTextColor(cell.accuracy, cell.count)}`}>
              {cell.count > 0 ? `${cell.accuracy}%` : '-'}
            </div>
            
            {cell.count > 0 && (
              <button 
                className="p-1 rounded-full bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:hover:bg-indigo-900/80 text-indigo-600 dark:text-indigo-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onChallengeClick) onChallengeClick(e);
                }}
                title="Challenge yourself to improve mastery"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {cell.count} question{cell.count !== 1 ? 's' : ''}
            </div>
            
            {cell.count > 0 && (
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    cell.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                    cell.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'
                  }`}
                  style={{ width: `${cell.accuracy}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </td>
  )
}
