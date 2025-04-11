'use client';

import React from 'react';
import { GridRow, MatrixCell } from '../types';
import { PerformanceCell } from './PerformanceCell';
import { getTextColor } from '../utils/colorUtils';

interface TopicRowProps {
  data: GridRow;
  selectedCell: {topic: string;difficulty: string;} | null;
  onCellClick: (topic: string, difficulty: string) => void;
  highlightedSetId: string | null;
}

/**
 * Single row in the performance matrix representing a topic
 */
export const TopicRow: React.FC<TopicRowProps> = ({
  data,
  selectedCell,
  onCellClick,
  highlightedSetId
}) => {
  return (
    <tr className="border-b border-slate-200 dark:border-slate-700" data-oid="79jqjmv">
      {/* Topic name (first column) */}
      <td className="py-3 pr-4 font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap" data-oid="zvro80k">
        <div className="flex items-center gap-2" data-oid="vyv9tg2">
          <span className="truncate max-w-[180px]" title={data.topic} data-oid="2lsrupb">
            {data.topic}
          </span>
        </div>
      </td>
      
      {/* Performance cells for each difficulty */}
      {data.cells.map((cellData) =>
      <td key={`${data.topic}-${cellData.difficulty}`} className="p-1.5" data-oid="sjnn.cx">
          <PerformanceCell
          data={cellData}
          isSelected={
          !!selectedCell &&
          selectedCell.topic === data.topic &&
          selectedCell.difficulty === cellData.difficulty
          }
          onClick={() => onCellClick(data.topic, cellData.difficulty)}
          highlightedSetId={highlightedSetId} data-oid="zpnd.rl" />

        </td>
      )}
    </tr>);

};