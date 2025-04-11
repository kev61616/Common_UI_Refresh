'use client';

import React from 'react';

interface DifficultyFilterProps {
  difficulties: string[];
  filterDifficulties: Record<string, boolean>;
  setFilterDifficulties: (difficulties: Record<string, boolean>) => void;
}

/**
 * Difficulty level checkbox filters
 */
export const DifficultyFilter: React.FC<DifficultyFilterProps> = ({
  difficulties,
  filterDifficulties,
  setFilterDifficulties
}) => {
  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    setFilterDifficulties({
      ...filterDifficulties,
      [difficulty]: checked
    });
  };

  // Toggle all difficulties at once
  const handleToggleAll = (checked: boolean) => {
    const newDifficulties = {} as Record<string, boolean>;
    difficulties.forEach((difficulty) => {
      newDifficulties[difficulty] = checked;
    });
    setFilterDifficulties(newDifficulties);
  };

  // Check if all difficulties are currently selected
  const allSelected = difficulties.every((d) => filterDifficulties[d]);
  // Check if some difficulties are currently selected
  const someSelected = difficulties.some((d) => filterDifficulties[d]);

  return (
    <div className="flex flex-col" data-oid="205ug0g">
      <label className="text-sm text-slate-600 dark:text-slate-400 mb-1" data-oid="m1ak087">
        Difficulty:
      </label>
      
      <div className="flex flex-col space-y-1" data-oid=".e.9b1c">
        {/* All option */}
        <div className="flex items-center" data-oid="0bo9.27">
          <input
            type="checkbox"
            id="difficulty-all"
            checked={allSelected}
            onChange={(e) => handleToggleAll(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800" data-oid="sd18ow_" />

          <label
            htmlFor="difficulty-all"
            className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer" data-oid="mk88e.x">

            All
          </label>
        </div>
        
        {/* Individual difficulty checkboxes */}
        {difficulties.map((difficulty) =>
        <div key={difficulty} className="flex items-center" data-oid=".cbyxou">
            <input
            type="checkbox"
            id={`difficulty-${difficulty}`}
            checked={filterDifficulties[difficulty] || false}
            onChange={(e) => handleDifficultyChange(difficulty, e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800" data-oid="bbrimwh" />

            <label
            htmlFor={`difficulty-${difficulty}`}
            className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer" data-oid="n_sss:s">

              {difficulty}
            </label>
          </div>
        )}
      </div>
    </div>);

};