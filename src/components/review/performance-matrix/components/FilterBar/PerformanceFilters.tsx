'use client';

import React from 'react';
import { getPerformanceBadgeColor, getPerformanceLabel } from '../../utils/colorUtils';

interface PerformanceFiltersProps {
  filterPerformance: 'low' | 'medium' | 'high' | null;
  setFilterPerformance: (performance: 'low' | 'medium' | 'high' | null) => void;
}

/**
 * Performance level filter component
 */
export const PerformanceFilters: React.FC<PerformanceFiltersProps> = ({
  filterPerformance,
  setFilterPerformance
}) => {
  const handlePerformanceChange = (value: 'low' | 'medium' | 'high' | null) => {
    // Toggle filter off if already selected
    if (value === filterPerformance) {
      setFilterPerformance(null);
    } else {
      setFilterPerformance(value);
    }
  };

  // Performance filter options
  const performanceLevels: ('low' | 'medium' | 'high' | null)[] = ['low', 'medium', 'high', null];

  return (
    <div className="flex flex-col" data-oid="q4ab5nk">
      <label className="text-sm text-slate-600 dark:text-slate-400 mb-1" data-oid="uh:9zjw">
        Performance:
      </label>
      
      <div className="space-y-1" data-oid="n.drntn">
        {performanceLevels.map((level) =>
        <button
          key={level || 'all'}
          onClick={() => handlePerformanceChange(level)}
          className={`
              w-full py-1.5 px-2 rounded-md text-left text-sm transition-colors
              ${level === filterPerformance ? 'ring-1 ring-indigo-400 dark:ring-indigo-600' : ''}
              ${getPerformanceBadgeColor(level)}
            `} data-oid="i_0wd:t">

            {getPerformanceLabel(level)}
          </button>
        )}
      </div>
    </div>);

};