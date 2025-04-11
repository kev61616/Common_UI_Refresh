'use client';

import React, { useState } from 'react';
import { useMatrixData } from './performance-matrix/hooks/useMatrixData';
import { PracticeSet } from '@/lib/mockData';
import { FilterBar } from './performance-matrix/components/FilterBar';
import { TopicRow } from './performance-matrix/components/TopicRow';
import { CellDetail } from './performance-matrix/components/CellDetail';
import { getTextColor } from './performance-matrix/utils/colorUtils';

interface PerformanceMatrixViewProps {
  practiceSets: PracticeSet[];
}

/**
 * Matrix Grid view showing performance by topic and difficulty
 */
export const PerformanceMatrixView: React.FC<PerformanceMatrixViewProps> = ({
  practiceSets
}) => {
  const {
    // Data
    gridRows,
    topics,
    difficulties,
    subjects,
    topicTotals,
    difficultyTotals,
    grandTotal,

    // State
    filterState,
    selectedCell,
    selectedCellData,
    highlightedSetId,

    // Actions
    setFilterSubject,
    setFilterDifficulties,
    setFilterTopics,
    setTopicSearchInput,
    setFilterPerformance,
    resetFilters,
    handleCellClick,
    closeCellDetail,
    setHighlightedSetId
  } = useMatrixData(practiceSets);

  // Get active difficulties (for header rendering)
  const activeDifficulties = Object.entries(filterState.filterDifficulties).
  filter(([_, isActive]) => isActive).
  map(([difficulty]) => difficulty);

  return (
    <div className="flex flex-col h-full" data-oid="_q7slen">
      <div className="flex flex-1 min-h-0" data-oid="88eoj1y">
        {/* Main grid */}
        <div className="flex-1 overflow-auto" data-oid="mn7hcc9">
          <div className="p-4" data-oid="dwf60.9">
            {/* Title */}
            <h1 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200" data-oid="h.lx9v8">
              Performance by Topic & Difficulty
            </h1>
            
            {/* Filter bar */}
            <div className="mb-6" data-oid="ku:mzj5">
              <FilterBar
                subjects={subjects}
                topics={topics}
                difficulties={difficulties}
                filterSubject={filterState.filterSubject}
                filterDifficulties={filterState.filterDifficulties}
                filterTopics={filterState.filterTopics}
                filterPerformance={filterState.filterPerformance}
                topicSearchInput={filterState.topicSearchInput}
                setFilterSubject={setFilterSubject}
                setFilterDifficulties={setFilterDifficulties}
                setFilterTopics={setFilterTopics}
                setFilterPerformance={setFilterPerformance}
                setTopicSearchInput={setTopicSearchInput}
                resetFilters={resetFilters} data-oid="vziq38y" />

            </div>
            
            {/* Empty state */}
            {gridRows.length === 0 ?
            <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400" data-oid="_:czo-v">
                <p className="text-lg" data-oid="b0q.27u">No data matches your filter criteria.</p>
                <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors" data-oid=".uius-h">

                  Reset Filters
                </button>
              </div> :

            <div className="overflow-x-auto" data-oid="hlmru0d">
                <table className="w-full border-collapse" data-oid="v:_ratu">
                  <thead className="bg-slate-50 dark:bg-slate-800 sticky top-0 z-10" data-oid="fn8rrmo">
                    <tr data-oid="k65m7kk">
                      {/* Empty corner cell */}
                      <th className="text-left p-3 font-medium text-slate-600 dark:text-slate-400 min-w-[200px]" data-oid="aec3khs">
                        Topic / Difficulty
                      </th>
                      
                      {/* Difficulty headers */}
                      {activeDifficulties.map((difficulty) =>
                    <th key={difficulty} className="p-2 font-medium text-slate-600 dark:text-slate-400 min-w-[150px]" data-oid="lubfebo">
                          <div className="text-center" data-oid="4ljyr90">{difficulty}</div>
                          
                          {/* Difficulty totals */}
                          {difficultyTotals[difficulty] &&
                      <div className="text-xs mt-1" data-oid="eppdef_">
                              <span className={getTextColor(difficultyTotals[difficulty].accuracy, difficultyTotals[difficulty].count)} data-oid=":6gls3_">
                                {difficultyTotals[difficulty].accuracy}%
                              </span>
                              <span className="text-slate-500 dark:text-slate-400 ml-1" data-oid="jbwup6i">
                                ({difficultyTotals[difficulty].correctCount}/{difficultyTotals[difficulty].count})
                              </span>
                            </div>
                      }
                        </th>
                    )}
                      
                      {/* Overall column */}
                      <th className="p-2 font-medium text-slate-600 dark:text-slate-400 min-w-[150px]" data-oid="ke1foi7">
                        <div className="text-center" data-oid="0duddup">Overall</div>
                        
                        {/* Grand total */}
                        {grandTotal &&
                      <div className="text-xs mt-1" data-oid="ale6y30">
                            <span className={getTextColor(grandTotal.accuracy, grandTotal.count)} data-oid="0.85zpv">
                              {grandTotal.accuracy}%
                            </span>
                            <span className="text-slate-500 dark:text-slate-400 ml-1" data-oid="s6-japo">
                              ({grandTotal.correctCount}/{grandTotal.count})
                            </span>
                          </div>
                      }
                      </th>
                    </tr>
                  </thead>
                  
                  <tbody data-oid="9l4a6p:">
                    {gridRows.map((row) =>
                  <TopicRow
                    key={row.topic}
                    data={row}
                    selectedCell={selectedCell}
                    onCellClick={handleCellClick}
                    highlightedSetId={highlightedSetId} data-oid="4g.vwl." />

                  )}
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
        
        {/* Detail panel */}
        {selectedCellData &&
        <div className="w-[380px] h-full overflow-y-auto border-l border-slate-200 dark:border-slate-700 p-4" data-oid="a62-lxd">
            <CellDetail
            data={selectedCellData}
            highlightedSetId={highlightedSetId}
            setHighlightedSetId={setHighlightedSetId}
            onClose={closeCellDetail} data-oid="k0vv943" />

          </div>
        }
      </div>
    </div>);

};