'use client'

import React from 'react'
import { SubjectFilter } from './SubjectFilter'
import { DifficultyFilter } from './DifficultyFilter' 
import { TopicFilter } from './TopicFilter'
import { PerformanceFilters } from './PerformanceFilters'
import { countActiveFilters } from '../../utils/analytics'

interface FilterBarProps {
  // Data
  subjects: string[]
  topics: string[]
  difficulties: string[]
  
  // Filter state
  filterSubject: string | null
  filterDifficulties: Record<string, boolean>
  filterTopics: string[]
  filterPerformance: 'low' | 'medium' | 'high' | null
  topicSearchInput: string
  
  // Actions
  setFilterSubject: (subject: string | null) => void
  setFilterDifficulties: (difficulties: Record<string, boolean>) => void
  setFilterTopics: (topics: string[]) => void
  setFilterPerformance: (performance: 'low' | 'medium' | 'high' | null) => void
  setTopicSearchInput: (input: string) => void
  resetFilters: () => void
}

/**
 * Main filter bar component that combines all filter controls
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  // Data
  subjects,
  topics,
  difficulties,
  
  // Filter state
  filterSubject,
  filterDifficulties,
  filterTopics,
  filterPerformance,
  topicSearchInput,
  
  // Actions
  setFilterSubject,
  setFilterDifficulties,
  setFilterTopics,
  setFilterPerformance,
  setTopicSearchInput,
  resetFilters
}) => {
  // Count active filters to show badge
  const activeFilterCount = countActiveFilters(
    filterSubject,
    filterDifficulties,
    filterTopics,
    topicSearchInput,
    filterPerformance
  )
  
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </h2>
        
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Reset all
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject filter */}
        <div>
          <SubjectFilter
            subjects={subjects}
            filterSubject={filterSubject}
            setFilterSubject={setFilterSubject}
          />
        </div>
        
        {/* Difficulty filter */}
        <div>
          <DifficultyFilter
            difficulties={difficulties}
            filterDifficulties={filterDifficulties}
            setFilterDifficulties={setFilterDifficulties}
          />
        </div>
        
        {/* Performance filter */}
        <div>
          <PerformanceFilters
            filterPerformance={filterPerformance}
            setFilterPerformance={setFilterPerformance}
          />
        </div>
        
        {/* Topic filter */}
        <div>
          <TopicFilter
            topics={topics}
            filterTopics={filterTopics}
            setFilterTopics={setFilterTopics}
            topicSearchInput={topicSearchInput}
            setTopicSearchInput={setTopicSearchInput}
          />
        </div>
      </div>
    </div>
  )
}
