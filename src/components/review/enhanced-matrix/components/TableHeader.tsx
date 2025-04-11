'use client';

import React from 'react';
import { DifficultyTotal, GrandTotal } from '../types';

interface TableHeaderProps {
  difficultyTotals: DifficultyTotal[];
  grandTotal: GrandTotal;
  difficulties: string[];
  filterDifficulties: Record<string, boolean>;
  toggleDifficultyFilter: (difficulty: string) => void;
  allTopics: string[];
  filterTopics: string[];
  toggleTopicFilter: (topic: string) => void;
  topicSearchInput: string;
  setTopicSearchInput: (value: string) => void;
  showTopicFilter: boolean;
  setShowTopicFilter: (show: boolean) => void;
}

/**
 * Table header for the mastery matrix view with the new mastery levels
 */
export function TableHeader({
  difficultyTotals,
  grandTotal,
  difficulties,
  filterDifficulties,
  toggleDifficultyFilter,
  allTopics,
  filterTopics,
  toggleTopicFilter,
  topicSearchInput,
  setTopicSearchInput,
  showTopicFilter,
  setShowTopicFilter
}: TableHeaderProps) {
  // Mastery levels and their colors
  const masteryLevels = [
  { name: 'Very Weak', color: 'text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/10' },
  { name: 'Weak', color: 'text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-900/10' },
  { name: 'Not Attempted', color: 'text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-900/10' },
  { name: 'Emerging', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50/50 dark:bg-yellow-900/10' },
  { name: 'Proficient', color: 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10' },
  { name: 'Mastered', color: 'text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-900/10' }];


  return (
    <tr data-oid="0.o.14p">
      <th className="p-3 text-left font-medium text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-700" data-oid="jnxr:eb">
        <div className="flex items-center" data-oid="xpayrm3">
          <div data-oid="793efdj">Topic / Mastery Level</div>
        </div>
      </th>
      
      <th className="p-3 text-left font-medium text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-700" data-oid="vqr8af8">
        <div className="flex items-center" data-oid="hpyd4_5">
          <div data-oid="mg:3dwa">Tags & Subtopics</div>
          <div className="ml-1 text-xs text-slate-400 dark:text-slate-500" data-oid="8phu2uc">(categorization)</div>
        </div>
      </th>
      
      {masteryLevels.map((level) => {
        // Use the matching difficulty total for this mastery level
        const total = difficultyTotals.find((d) => d.difficulty === level.name);

        return (
          <th
            key={level.name}
            className={`p-3 text-center font-medium text-sm border-b dark:border-slate-700 ${level.color}`} data-oid="gam1nxh">

            <div className="flex justify-center items-center" data-oid=".cgo7r3">
              <span data-oid="8n5lhva">{level.name}</span>
            </div>
            <div className="text-xs font-normal mt-1 text-slate-500 dark:text-slate-400" data-oid="j4adftz">
              {total ? total.count : 0} questions
            </div>
          </th>);

      })}
      
      <th className="p-3 text-center font-medium text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-700" data-oid="bc02t9f">
        Total
        <div className="text-xs font-normal mt-1" data-oid="x6f7-ap">
          {grandTotal.count} questions
        </div>
      </th>
    </tr>);

}