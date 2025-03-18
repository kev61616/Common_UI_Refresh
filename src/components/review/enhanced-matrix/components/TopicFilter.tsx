'use client'

import React from 'react'

interface TopicFilterProps {
  allTopics: string[]
  filterTopics: string[]
  toggleTopicFilter: (topic: string) => void
  topicSearchInput: string
  setTopicSearchInput: (value: string) => void
  showTopicFilter: boolean
  setShowTopicFilter: (show: boolean) => void
}

/**
 * Topic filter dropdown with search
 */
export function TopicFilter({
  allTopics,
  filterTopics,
  toggleTopicFilter,
  topicSearchInput,
  setTopicSearchInput,
  showTopicFilter,
  setShowTopicFilter
}: TopicFilterProps) {
  return (
    <>
      <button 
        onClick={() => setShowTopicFilter(!showTopicFilter)} 
        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        title="Filter Topics"
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </button>
      
      {/* Topic Filter Dropdown */}
      {showTopicFilter && (
        <div className="absolute z-10 mt-2 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 p-3 w-64">
          <div className="mb-2">
            <input
              type="text"
              placeholder="Search topics..."
              value={topicSearchInput}
              onChange={(e) => setTopicSearchInput(e.target.value)}
              className="w-full px-3 py-2 text-sm border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div className="max-h-52 overflow-y-auto space-y-1">
            {allTopics.map(topic => (
              <label key={topic} className="flex items-center py-1 px-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded">
                <input
                  type="checkbox"
                  checked={filterTopics.includes(topic)}
                  onChange={() => toggleTopicFilter(topic)}
                  className="mr-2 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-200">{topic}</span>
              </label>
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            <button 
              onClick={() => filterTopics.length > 0 && toggleTopicFilter(filterTopics[0])}
              className="px-2 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              Clear
            </button>
            <button 
              onClick={() => setShowTopicFilter(false)}
              className="px-2 py-1 text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
