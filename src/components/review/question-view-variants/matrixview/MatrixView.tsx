'use client';

import React from 'react';
import { QuestionViewProps } from '../types';
import { useMatrixData } from '../../enhanced-matrix/hooks/useMatrixData';
import { MatrixRowComponent } from '../../enhanced-matrix/components/MatrixRow';
import { TableHeader } from '../../enhanced-matrix/components/TableHeader';
import { getTextColor } from '../../enhanced-matrix/utils/dataUtils';

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
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid=".urhy2k">
      {/* Description Only */}
      <div className="text-center mb-6" data-oid="odgm381">
        <p className="text-sm text-slate-500 dark:text-slate-400" data-oid="afg9zq-">
          Track your progress from novice to mastery for each concept
        </p>
      </div>
      
      {/* Mastery Level Legend */}
      <div className="flex justify-center mb-6 gap-3 flex-wrap" data-oid="8t-zwxl">
        <div className="flex items-center gap-2" data-oid="1otahzo">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" data-oid="5cjknpo"></span>
          <span className="text-xs" data-oid="csp38k7">Very Weak (3x incorrect)</span>
        </div>
        <div className="flex items-center gap-2" data-oid="jfs5jxc">
          <span className="inline-block w-3 h-3 rounded-full bg-orange-500" data-oid="sfz13g7"></span>
          <span className="text-xs" data-oid="lpjvbu2">Weak (2x incorrect)</span>
        </div>
        <div className="flex items-center gap-2" data-oid="1wrrog-">
          <span className="inline-block w-3 h-3 rounded-full bg-gray-400" data-oid="9f65xr1"></span>
          <span className="text-xs" data-oid="uamqls:">Not Attempted</span>
        </div>
        <div className="flex items-center gap-2" data-oid="kj_gvp8">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" data-oid="hw6_ur2"></span>
          <span className="text-xs" data-oid="w0p_e8f">Emerging (1x correct)</span>
        </div>
        <div className="flex items-center gap-2" data-oid="asd3dh1">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500" data-oid="xc0hegr"></span>
          <span className="text-xs" data-oid="9gk3qy7">Proficient (2x correct)</span>
        </div>
        <div className="flex items-center gap-2" data-oid="d1-wqn6">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500" data-oid="s4fofrp"></span>
          <span className="text-xs" data-oid="02u:kpf">Mastered (3x+ correct)</span>
        </div>
      </div>
      
      {/* Matrix Grid */}
      <div className="overflow-x-auto mb-6" data-oid="4h5t:n_">
        <table className="w-full border-collapse" data-oid="yt:42ba">
          <thead data-oid="bwqou-n">
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
              setShowTopicFilter={setShowTopicFilter} data-oid="pw6nkqr" />

          </thead>
          
          <tbody data-oid="ezr_gps">
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
              handleCellClick={handleCellClick} data-oid="28ruo_v" />

            )}
            
            {/* Grand Total Row */}
            <tr data-oid="adrg_7n">
              <td className="p-3 text-sm font-medium border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="n-md-ds">
                All Topics
              </td>
              
              {difficultyTotals.map((total) =>
              <td
                key={`total-${total.difficulty}`}
                className="p-3 text-center border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="5tkr1uv">

                  <div className={`text-lg font-bold ${getTextColor(total.accuracy, total.count)}`} data-oid="3hlrcz4">
                    {total.accuracy}%
                  </div>
                  
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="axaak4l">
                    <div
                    className={`h-full rounded-full ${
                    total.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                    total.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'}`
                    }
                    style={{ width: `${total.accuracy}%` }} data-oid="n-aqwu:">
                  </div>
                  </div>
                </td>
              )}
              
              <td className="p-3 text-center border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800" data-oid="otxywqz">
                <div className={`text-lg font-bold ${getTextColor(grandTotal.accuracy, grandTotal.count)}`} data-oid="awm_2x_">
                  {grandTotal.accuracy}%
                </div>
                
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="nli_4lg">
                  <div
                    className={`h-full rounded-full ${
                    grandTotal.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                    grandTotal.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                    'bg-rose-500 dark:bg-rose-400'}`
                    }
                    style={{ width: `${grandTotal.accuracy}%` }} data-oid="j0-nlfo">
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>);

}