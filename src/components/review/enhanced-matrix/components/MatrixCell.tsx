'use client';

import React from 'react';
import { MatrixCell } from '../types';
import { getCellColor, getTextColor } from '../utils/dataUtils';
import { SwordIcon } from '@/components/icons/SwordIcon';

interface MatrixCellProps {
  cell: MatrixCell;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  onChallengeClick?: (e: React.MouseEvent) => void;
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
      isSelected ?
      'ring-2 ring-indigo-500 dark:ring-indigo-400 z-10 relative' :
      ''} ${

      isHighlighted ?
      'ring-2 ring-sky-500 dark:ring-sky-400 z-10 relative' :
      ''}`
      } data-oid="c416i34">

      {cell.count > 0 ?
      // Cell with data
      <div className={`h-24 p-3 cursor-pointer transition-all hover:shadow-md ${getCellColor(cell.accuracy, cell.count)}`} data-oid="of0lpl8">
          <div className="flex flex-col h-full justify-between" data-oid="ht4r-q8">
            <div className="flex justify-between items-start" data-oid="kue3iq1">
              <div className={`text-lg font-bold ${getTextColor(cell.accuracy, cell.count)}`} data-oid="k0cvvnz">
                {`${cell.accuracy}%`}
              </div>
              
              <button
              className="p-1 rounded-full bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:hover:bg-indigo-900/80 text-indigo-600 dark:text-indigo-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                if (onChallengeClick) onChallengeClick(e);
              }}
              title="Challenge yourself to improve mastery" data-oid="wkcullg">

                <SwordIcon size={16} className="transition-transform duration-300 hover:rotate-12" data-oid="r6_hrqe" />
              </button>
            </div>
            
            <div data-oid="03dnkzp">
              <div className="text-xs text-slate-500 dark:text-slate-400" data-oid="vrn0kvh">
                {cell.count} question{cell.count !== 1 ? 's' : ''}
              </div>
              
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="oby7g8w">
                <div
                className={`h-full rounded-full ${
                cell.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                cell.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                'bg-rose-500 dark:bg-rose-400'}`
                }
                style={{ width: `${cell.accuracy}%` }} data-oid="d6ho2ya">
              </div>
              </div>
            </div>
          </div>
        </div> :

      // Empty cell - greyed out with no text
      <div className="h-24 bg-slate-100 dark:bg-slate-800/30 cursor-pointer transition-all opacity-50" data-oid="sf8fn.v">
          {/* No content for empty cells */}
        </div>
      }
    </td>);

}