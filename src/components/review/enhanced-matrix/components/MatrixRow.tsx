'use client';

import React, { useState } from 'react';
import { GridRow, TopicTotal } from '../types';
import { MatrixCellComponent } from './MatrixCell';
import { getTextColor } from '../utils/dataUtils';

interface MatrixRowProps {
  row: GridRow;
  topicTotal: TopicTotal;
  selectedCell: {topic: string;difficulty: string;} | null;
  highlightedSetId: string | null;
  handleCellClick: (topic: string, difficulty: string) => void;
  handleChallengeClick?: (topic: string, difficulty: string) => void;
  hasSubCategories?: boolean;
  subCategories?: GridRow[];
  depth?: number;
  subCategoryTotals?: TopicTotal[];
}

/**
 * Renders a single row in the performance matrix
 * Supports expandable subcategories
 */
export function MatrixRowComponent({
  row,
  topicTotal,
  selectedCell,
  highlightedSetId,
  handleCellClick,
  handleChallengeClick,
  hasSubCategories = false,
  subCategories = [],
  depth = 0,
  subCategoryTotals = []
}: MatrixRowProps) {
  // State to track if subcategories are expanded
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle subcategories visibility
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <tr key={row.topic} data-oid="z4.z_1k">
        <td className={`p-3 text-sm font-medium border-b dark:border-slate-700 ${
        depth > 0 ? 'pl-8 bg-slate-100 dark:bg-slate-800/70' : 'bg-slate-50 dark:bg-slate-800/50'}`
        } data-oid="kd:2sin">
          <div className="flex items-center space-x-2" data-oid="mqbmc0b">
            {hasSubCategories &&
            <button
              onClick={toggleExpand}
              className="p-1 rounded text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 focus:outline-none" data-oid="8t25i5.">

                <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'transform rotate-90' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor" data-oid="9a:st7h">

                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" data-oid=":_5v39h" />
                </svg>
              </button>
            }
            <span data-oid="ez9:pq6">{row.topic}</span>
          </div>
          <div className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-1" data-oid="5_v3xn8">
            {topicTotal.count} questions
          </div>
        </td>
        
        <td className={`p-3 text-sm font-medium border-b dark:border-slate-700 ${
        depth > 0 ? 'bg-slate-100 dark:bg-slate-800/70' : 'bg-slate-50 dark:bg-slate-800/50'}`
        } data-oid=":qi_zpq">
          {row.cells.length > 0 && row.cells[0].questions.length > 0 &&
          <div className="flex flex-wrap gap-1" data-oid="_tsswo9">
              {/* Extract unique subtopics as tags */}
              {Array.from(new Set(row.cells.flatMap((cell) =>
            cell.questions.map((q) => q.subtopic)
            ))).filter(Boolean).map((subtopic, index) =>
            <span
              key={`${subtopic}-${index}`}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300" data-oid="g30frqv">

                  {subtopic}
                </span>
            )}
              
              {/* Add any additional tags from questions if they exist */}
              {Array.from(new Set(row.cells.flatMap((cell) =>
            cell.questions.flatMap((q) => q.tags || [])
            ))).filter(Boolean).map((tag, index) =>
            <span
              key={`tag-${tag}-${index}`}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" data-oid="aoek1fk">

                  {tag}
                </span>
            )}
            </div>
          }
        </td>
      
        {row.cells.map((cell) =>
        <MatrixCellComponent
          key={`${cell.topic}-${cell.difficulty}`}
          cell={cell}
          isSelected={selectedCell?.topic === cell.topic && selectedCell?.difficulty === cell.difficulty}
          isHighlighted={!!highlightedSetId && cell.setIds.includes(highlightedSetId)}
          onClick={() => handleCellClick(cell.topic, cell.difficulty)}
          onChallengeClick={handleChallengeClick ? (e) => {
            e.stopPropagation();
            handleChallengeClick(cell.topic, cell.difficulty);
          } : undefined} data-oid="izg918t" />

        )}
      
        <td className={`p-3 text-center border-b dark:border-slate-700 ${
        depth > 0 ? 'bg-slate-100 dark:bg-slate-800/70' : 'bg-slate-50 dark:bg-slate-800/50'}`
        } data-oid="iet8vnh">
          <div className={`text-lg font-bold ${getTextColor(topicTotal.accuracy, topicTotal.count)}`} data-oid="s-if5pd">
            {topicTotal.accuracy}%
          </div>
          
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden" data-oid="xb6_weo">
            <div
              className={`h-full rounded-full ${
              topicTotal.accuracy >= 80 ?
              'bg-emerald-500 dark:bg-emerald-400' :
              topicTotal.accuracy >= 60 ?
              'bg-amber-500 dark:bg-amber-400' :
              'bg-rose-500 dark:bg-rose-400'}`
              }
              style={{ width: `${topicTotal.accuracy}%` }} data-oid="9kqi1px">
            </div>
          </div>
        </td>
      </tr>
      
      {/* Render subcategories if expanded */}
      {isExpanded && hasSubCategories && subCategories.map((subCategory, index) => {
        const subTotal = subCategoryTotals.find((t) => t.topic === subCategory.topic) || {
          topic: subCategory.topic,
          count: 0,
          correctCount: 0,
          accuracy: 0
        };

        return (
          <MatrixRowComponent
            key={`${row.topic}-${subCategory.topic}`}
            row={subCategory}
            topicTotal={subTotal}
            selectedCell={selectedCell}
            highlightedSetId={highlightedSetId}
            handleCellClick={handleCellClick}
            handleChallengeClick={handleChallengeClick}
            depth={depth + 1} data-oid="d0bo93w" />);


      })}
    </>);

}