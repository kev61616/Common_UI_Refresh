'use client';

import React from 'react';
import { MatrixCell } from '../types';
import {
  getTextColor,
  getCellBackgroundColor,
  getCellBorderColor } from
'../utils/colorUtils';

interface PerformanceCellProps {
  data: MatrixCell;
  isSelected: boolean;
  onClick: () => void;
  highlightedSetId: string | null;
}

/**
 * Individual cell in the performance matrix
 */
export const PerformanceCell: React.FC<PerformanceCellProps> = ({
  data,
  isSelected,
  onClick,
  highlightedSetId
}) => {
  // Check if any questions in this cell are from the highlighted set
  const isHighlighted =
  highlightedSetId !== null &&
  data.setIds.includes(highlightedSetId);

  return (
    <div
      className={`
        relative p-3 rounded-md border transition-all cursor-pointer
        ${getCellBackgroundColor(data.accuracy, data.count)}
        ${getCellBorderColor(data.accuracy, data.count)}
        ${isSelected ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''}
        ${isHighlighted ? 'ring-2 ring-sky-500 dark:ring-sky-400' : ''}
        hover:shadow-md
      `}
      onClick={onClick} data-oid="ud6egbl">

      {/* Show set count badge */}
      {data.setIds.length > 0 &&
      <div className="absolute top-1 right-1 text-xs font-medium bg-white dark:bg-slate-800 rounded-full px-1.5 border border-slate-200 dark:border-slate-700" data-oid="m_sga:9">
          {data.setIds.length}
        </div>
      }
      
      {/* Empty state */}
      {data.count === 0 ?
      <div className="flex flex-col items-center justify-center h-20 text-slate-400 dark:text-slate-500" data-oid="izaee_-">
          <span className="text-xs" data-oid="sszgmls">No data</span>
        </div> :

      <>
          {/* Content */}
          <div className="flex flex-col min-h-20" data-oid="x5r_prr">
            {/* Accuracy */}
            <div className="text-center mt-2" data-oid="5syxtr1">
              <div className={`text-2xl font-bold ${getTextColor(data.accuracy, data.count)}`} data-oid="-8vr9ui">
                {data.accuracy}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1" data-oid=".rsl6ev">
                {data.correctCount}/{data.count}
              </div>
            </div>
            
            {/* Show sets count */}
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center" data-oid=".-e2xu1">
              {data.setIds.length} {data.setIds.length === 1 ? 'set' : 'sets'}
            </div>
          </div>
        </>
      }
    </div>);

};