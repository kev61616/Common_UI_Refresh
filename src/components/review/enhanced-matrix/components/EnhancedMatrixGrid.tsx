'use client'

import React, { useState } from 'react'
import { QuestionViewProps } from '../../question-view-variants/types'
import { useMatrixData } from '../hooks/useMatrixData'
import { PerformanceFilters } from './PerformanceFilters'
import { SubjectFilter } from './SubjectFilter'
import { MatrixRowComponent } from './MatrixRow'
import { TableHeader } from './TableHeader'
import { getTextColor } from '../utils/dataUtils'
import { GridRow, TopicTotal } from '../types'
import { isTopicInSubject } from '../utils/filterUtils'

/**
 * Enhanced Matrix Grid View - Modularized version
 * Organizes questions in a 2D grid by topic (rows) and difficulty (columns)
 * Features:
 * - In-grid filtering capabilities
 * - Challenge icon to improve mastery level
 * - Expandable subcategories 
 * - Even distribution of data across mastery levels
 */
export function EnhancedMatrixGrid(props: QuestionViewProps) {
  // State for challenge modal
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<{topic: string, difficulty: string} | null>(null);
  // Define mastery levels for column organization
  const masteryLevels = [
    'Very Weak', 
    'Weak', 
    'Not Attempted', 
    'Emerging', 
    'Proficient', 
    'Mastered'
  ];
  
  // Handle challenge clicks
  const handleChallengeClick = (topic: string, difficulty: string) => {
    setSelectedChallenge({ topic, difficulty });
    setShowChallengeModal(true);
  };
  
  // Close challenge modal
  const closeModal = () => {
    setShowChallengeModal(false);
    setSelectedChallenge(null);
  };
  
  // Start challenge
  const startChallenge = () => {
    // Implementation would connect to actual challenge functionality
    alert(`Starting challenge for ${selectedChallenge?.topic} at ${selectedChallenge?.difficulty} level`);
    closeModal();
  };
  
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
  
  // Structure the data to include subcategories
  // This is a simplified example - in a real implementation, you'd get this structure from your API or data source
  const topicsWithSubcategories: {
    parent: GridRow,
    children: GridRow[],
    totalForParent: TopicTotal,
    totalsForChildren: TopicTotal[]
  }[] = React.useMemo(() => {
    // Extra filter to remove any grid rows that don't match their expected subject
    const filteredGrid = filterSubject 
      ? grid.filter(row => isTopicInSubject(row.topic, filterSubject))
      : grid;
    
    // Group topics that could be subcategories
    const topicGroups: Record<string, GridRow[]> = {};
    const parentTopics: string[] = [];
    
    // Simple algorithm to identify potential parent-child relationships
    // In a real app, this would come from your data structure
    filteredGrid.forEach(row => {
      // Check if this topic could be a parent (e.g., "Algebra Fundamentals")
      const parts = row.topic.split(' ');
      if (parts.length > 1 && !row.topic.includes('-')) {
        // This could be a parent topic
        parentTopics.push(row.topic);
      }
    });
    
    // Group topics with similar prefixes as potential subcategories
    filteredGrid.forEach(row => {
      let assigned = false;
      parentTopics.forEach(parentTopic => {
        if (row.topic !== parentTopic && 
            (row.topic.startsWith(parentTopic.split(' ')[0]) || 
             row.topic.includes(parentTopic.split(' ')[0]))) {
          if (!topicGroups[parentTopic]) {
            topicGroups[parentTopic] = [];
          }
          topicGroups[parentTopic].push(row);
          assigned = true;
        }
      });
    });
    
    // Create the final structure
    return parentTopics
      .filter(parent => topicGroups[parent] && topicGroups[parent].length > 0)
      .map(parent => {
        const parentRow = filteredGrid.find(row => row.topic === parent)!;
        const childRows = topicGroups[parent] || [];
        const parentTotal = topicTotals.find(t => t.topic === parent)!;
        const childTotals = childRows.map(child => 
          topicTotals.find(t => t.topic === child.topic) || {
            topic: child.topic,
            count: 0, 
            correctCount: 0,
            accuracy: 0
          }
        );
        
        return {
          parent: parentRow,
          children: childRows,
          totalForParent: parentTotal,
          totalsForChildren: childTotals
        };
      });
  }, [grid, topicTotals]);
  
  // Get standalone topics (those without subcategories)
  const standaloneTopics = React.useMemo(() => {
    const topicsWithSubcategoriesSet = new Set([
      ...topicsWithSubcategories.map(item => item.parent.topic),
      ...topicsWithSubcategories.flatMap(item => item.children.map(child => child.topic))
    ]);
    
    // Apply subject filter to standalone topics as well
    const filtered = filterSubject 
      ? grid.filter(row => isTopicInSubject(row.topic, filterSubject))
      : grid;
    
    return filtered.filter(row => !topicsWithSubcategoriesSet.has(row.topic));
  }, [grid, topicsWithSubcategories, filterSubject]);
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      {/* Description Only */}
      <div className="text-center mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Track your progress from novice to mastery for each concept
        </p>
      </div>
      
      {/* Challenge Modal */}
      {showChallengeModal && selectedChallenge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Challenge: {selectedChallenge.topic}</h3>
            <p className="mb-4">
              Ready to improve your mastery of {selectedChallenge.topic} at the {selectedChallenge.difficulty} level?
              This challenge will test your knowledge and help you progress to the next level.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={closeModal}
                className="px-4 py-2 rounded bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
              >
                Cancel
              </button>
              <button 
                onClick={startChallenge}
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Start Challenge
              </button>
            </div>
          </div>
        </div>
      )}
      
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
            {/* Render topics with subcategories */}
            {topicsWithSubcategories.map(({ parent, children, totalForParent, totalsForChildren }) => (
              <MatrixRowComponent 
                key={parent.topic}
                row={parent}
                topicTotal={totalForParent}
                selectedCell={selectedCell}
                highlightedSetId={highlightedSetId}
                handleCellClick={handleCellClick}
                handleChallengeClick={handleChallengeClick}
                hasSubCategories={true}
                subCategories={children}
                subCategoryTotals={totalsForChildren}
              />
            ))}
            
            {/* Render standalone topics */}
            {standaloneTopics.map(row => (
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
                handleChallengeClick={handleChallengeClick}
              />
            ))}
            
            {/* Grand Total Row */}
            <tr>
              <td className="p-3 text-sm font-medium border-b dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                All Topics
              </td>
              
              {/* Ensure we're using masteryLevels consistent with the rest of the app */}
              {masteryLevels.map(level => {
                // Find matching difficulty total or create default
                const total = difficultyTotals.find(t => t.difficulty === level) || {
                  difficulty: level,
                  count: 0,
                  correctCount: 0,
                  accuracy: 0
                };
                
                return (
                  <td 
                    key={`total-${level}`}
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
                );
              })}
              
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
