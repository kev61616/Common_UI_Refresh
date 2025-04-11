'use client';

import React from 'react';
import { QuestionViewProps } from './question-view-variants/types';
import { useMatrixData } from './enhanced-matrix/hooks/useMatrixData';
import { MatrixRowComponent } from './enhanced-matrix/components/MatrixRow';
import { TableHeader } from './enhanced-matrix/components/TableHeader';
import { getTextColor } from './enhanced-matrix/utils/dataUtils';

/**
 * MatrixView - Enhanced Matrix Grid View
 * Organizes questions in a 2D grid by topic (rows) and difficulty (columns)
 * Includes in-grid filtering capabilities
 */
export function MatrixView(props: QuestionViewProps) {
  const {
    // Data
    subjects,
    allTopics,
    topics,
    difficulties,
    grid,
    topicTotals,
    difficultyTotals,
    grandTotal,

    // State
    filterSubject,
    setFilterSubject,
    filterDifficulties,
    filterTopics,
    filterPerformance,
    setFilterPerformance,
    topicSearchInput,
    setTopicSearchInput,
    showTopicFilter,
    setShowTopicFilter,
    selectedCell,
    highlightedSetId,

    // Actions
    handleCellClick,
    toggleDifficultyFilter,
    toggleTopicFilter,
    resetFilters,
    activeFilterCount
  } = useMatrixData(props);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid=":rq7r0c">
      {/* Description Only */}
      <div className="text-center mb-6" data-oid="co5r1.q">
        <p className="text-sm text-slate-500 dark:text-slate-400" data-oid="h_qs42b">
          Track your progress from novice to mastery for each concept
        </p>
      </div>
      
      {/* Mastery Level Legend */}
      <div className="flex justify-center mb-6 gap-3 flex-wrap" data-oid="-280wzm">
        <div className="flex items-center gap-2" data-oid="-wbh3bs">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" data-oid="m0b451k"></span>
          <span className="text-xs" data-oid="ap.zid8">Very Weak (3x incorrect)</span>
        </div>
        <div className="flex items-center gap-2" data-oid="0e:x_1u">
          <span className="inline-block w-3 h-3 rounded-full bg-orange-500" data-oid="d7f3ll3"></span>
          <span className="text-xs" data-oid="g7qwf02">Weak (2x incorrect)</span>
        </div>
        <div className="flex items-center gap-2" data-oid="2k3v-nm">
          <span className="inline-block w-3 h-3 rounded-full bg-gray-400" data-oid="3_j55d1"></span>
          <span className="text-xs" data-oid="9_9zgi:">Not Attempted</span>
        </div>
        <div className="flex items-center gap-2" data-oid="zwlg74q">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" data-oid="9t2jrno"></span>
          <span className="text-xs" data-oid="bofcd79">Emerging (1x correct)</span>
        </div>
        <div className="flex items-center gap-2" data-oid="g8pymid">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500" data-oid="icw7n04"></span>
          <span className="text-xs" data-oid="bmrw.dv">Proficient (2x correct)</span>
        </div>
        <div className="flex items-center gap-2" data-oid="9-.t_9f">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500" data-oid="242po.t"></span>
          <span className="text-xs" data-oid="fbj8ezs">Mastered (3x+ correct)</span>
        </div>
      </div>
      
      {/* Matrix Grid */}
      <div className="overflow-x-auto mb-6" data-oid="wua28jn">
        <table className="w-full border-collapse" data-oid="y4t_n25">
          <thead data-oid="pre2uw5">
            <TableHeader
              difficultyTotals={difficultyTotals}
              grandTotal={grandTotal}
              difficulties={difficulties}
              filterDifficulties={filterDifficulties}
              toggleDifficultyFilter={toggleDifficultyFilter}
              allTopics={allTopics}
              filterTopics={filterTopics}
              toggleTopicFilter={toggleTopicFilter}
              topicSearchInput={topicSearchInput}
              setTopicSearchInput={setTopicSearchInput}
              showTopicFilter={showTopicFilter}
              setShowTopicFilter={setShowTopicFilter} data-oid="7ph.uhy" />

          </thead>
          
          <tbody data-oid="uhs6p6b">
            {grid.map((row) =>
            <MatrixRowComponent
              key={row.topic}
              row={row}
              topicTotal={topicTotals.find((t) => t.topic === row.topic) || {
                topic: row.topic,
                count: 0,
                correctCount: 0,
                accuracy: 0
              }}
              selectedCell={selectedCell}
              highlightedSetId={highlightedSetId}
              handleCellClick={handleCellClick} data-oid="xlb_ruo" />

            )}
            
            {/* Grand Total Row */}
            <tr data-oid="9n28zn0">
              <td className="p-3 text-sm font-medium border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="dig88-4">
                All Topics
              </td>
              
              {difficultyTotals.map((total) =>
              <td
                key={`total-${total.difficulty}`}
                className="p-3 text-center border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="x4wzuiv">

                  <div className={`text-lg font-bold ${getTextColor(total.accuracy, total.count)}`} data-oid="35njukk">
                    {total.accuracy}%
                  </div>
                  
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="6j.u8hi">
                    <div
                    className={`h-full rounded-full ${
                    total.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                    total.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'}`
                    }
                    style={{ width: `${total.accuracy}%` }} data-oid="4yn1sis">
                  </div>
                  </div>
                </td>
              )}
              
              <td className="p-3 text-center border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="6qc9rzq">
                <div className={`text-lg font-bold ${getTextColor(grandTotal.accuracy, grandTotal.count)}`} data-oid="8fm6v1:">
                  {grandTotal.accuracy}%
                </div>
                
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="_mrvh2d">
                  <div
                    className={`h-full rounded-full ${
                    grandTotal.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                    grandTotal.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'}`
                    }
                    style={{ width: `${grandTotal.accuracy}%` }} data-oid="bs0:nf9">
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>);

}