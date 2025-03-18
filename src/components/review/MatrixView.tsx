'use client'

import React from 'react'
import { QuestionViewProps } from './question-view-variants/types'
import { useMatrixData } from './enhanced-matrix/hooks/useMatrixData'
import { MatrixRowComponent } from './enhanced-matrix/components/MatrixRow'
import { TableHeader } from './enhanced-matrix/components/TableHeader'
import { getTextColor } from './enhanced-matrix/utils/dataUtils'

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
  } = useMatrixData(props)
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      {/* Description Only */}
      <div className="text-center mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Track your progress from novice to mastery for each concept
        </p>
      </div>
      
      {/* Mastery Level Legend */}
      <div className="flex justify-center mb-6 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-xs">Very Weak (3x incorrect)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-orange-500"></span>
          <span className="text-xs">Weak (2x incorrect)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-gray-400"></span>
          <span className="text-xs">Not Attempted</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="text-xs">Emerging (1x correct)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
          <span className="text-xs">Proficient (2x correct)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-xs">Mastered (3x+ correct)</span>
        </div>
      </div>
      
      {/* Matrix Grid */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
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
              setShowTopicFilter={setShowTopicFilter}
            />
          </thead>
          
          <tbody>
            {grid.map(row => (
              <MatrixRowComponent 
                key={row.topic}
                row={row}
                topicTotal={topicTotals.find(t => t.topic === row.topic) || {
                  topic: row.topic,
                  count: 0,
                  correctCount: 0,
                  accuracy: 0
                }}
                selectedCell={selectedCell}
                highlightedSetId={highlightedSetId}
                handleCellClick={handleCellClick}
              />
            ))}
            
            {/* Grand Total Row */}
            <tr>
              <td className="p-3 text-sm font-medium border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                All Topics
              </td>
              
              {difficultyTotals.map(total => (
                <td 
                  key={`total-${total.difficulty}`}
                  className="p-3 text-center border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
                >
                  <div className={`text-lg font-bold ${getTextColor(total.accuracy, total.count)}`}>
                    {total.accuracy}%
                  </div>
                  
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        total.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                        total.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                        'bg-rose-500 dark:bg-rose-400'
                      }`}
                      style={{ width: `${total.accuracy}%` }}
                    ></div>
                  </div>
                </td>
              ))}
              
              <td className="p-3 text-center border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                <div className={`text-lg font-bold ${getTextColor(grandTotal.accuracy, grandTotal.count)}`}>
                  {grandTotal.accuracy}%
                </div>
                
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      grandTotal.accuracy >= 80 ? 'bg-emerald-500 dark:bg-emerald-400' :
                      grandTotal.accuracy >= 60 ? 'bg-amber-500 dark:bg-amber-400' :
                      'bg-rose-500 dark:bg-rose-400'
                    }`}
                    style={{ width: `${grandTotal.accuracy}%` }}
                  ></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
