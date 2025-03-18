'use client'

import React from 'react'
import { MatrixCell } from '../types'
import { getCellColor, getTextColor } from '../utils/dataUtils'

interface MatrixCellProps {
  cell: MatrixCell
  isSelected: boolean
  isHighlighted: boolean
  onClick: () => void
}

/**
 * Renders a single cell in the performance matrix
 */
export function MatrixCellComponent({
  cell,
  isSelected,
  isHighlighted,
  onClick
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
          <div className={`text-lg font-bold ${getTextColor(cell.accuracy, cell.count)}`}>
            {cell.count > 0 ? `${cell.accuracy}%` : '-'}
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
