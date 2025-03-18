'use client'

import React from 'react'
import { GridRow, TopicTotal } from '../types'
import { MatrixCellComponent } from './MatrixCell'
import { getTextColor } from '../utils/dataUtils'

interface MatrixRowProps {
  row: GridRow
  topicTotal: TopicTotal
  selectedCell: {topic: string, difficulty: string} | null
  highlightedSetId: string | null
  handleCellClick: (topic: string, difficulty: string) => void
}

/**
 * Renders a single row in the performance matrix
 */
export function MatrixRowComponent({
  row,
  topicTotal,
  selectedCell,
  highlightedSetId,
  handleCellClick
}: MatrixRowProps) {
  return (
    <tr key={row.topic}>
      <td className="p-3 text-sm font-medium border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        {row.topic}
        <div className="text-xs font-normal text-slate-500 dark:text-slate-400">
          {topicTotal.count} questions
        </div>
      </td>
      
      {row.cells.map(cell => (
        <MatrixCellComponent 
          key={`${cell.topic}-${cell.difficulty}`}
          cell={cell}
          isSelected={selectedCell?.topic === cell.topic && selectedCell?.difficulty === cell.difficulty}
          isHighlighted={!!highlightedSetId && cell.setIds.includes(highlightedSetId)}
          onClick={() => handleCellClick(cell.topic, cell.difficulty)}
        />
      ))}
      
      <td className="p-3 text-center border-b dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <div className={`text-lg font-bold ${getTextColor(topicTotal.accuracy, topicTotal.count)}`}>
          {topicTotal.accuracy}%
        </div>
        
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${
              topicTotal.accuracy >= 80 
                ? 'bg-emerald-500 dark:bg-emerald-400' :
              topicTotal.accuracy >= 60 
                ? 'bg-amber-500 dark:bg-amber-400' :
              'bg-rose-500 dark:bg-rose-400'
            }`}
            style={{ width: `${topicTotal.accuracy}%` }}
          ></div>
        </div>
      </td>
    </tr>
  )
}
