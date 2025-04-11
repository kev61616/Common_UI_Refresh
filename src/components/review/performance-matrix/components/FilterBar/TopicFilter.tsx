'use client';

import React, { useState, useEffect } from 'react';

interface TopicFilterProps {
  topics: string[];
  filterTopics: string[];
  setFilterTopics: (topics: string[]) => void;
  topicSearchInput: string;
  setTopicSearchInput: (input: string) => void;
}

/**
 * Topic selection and search filter component
 */
export const TopicFilter: React.FC<TopicFilterProps> = ({
  topics,
  filterTopics,
  setFilterTopics,
  topicSearchInput,
  setTopicSearchInput
}) => {
  // Local state for filtered topics (to show in dropdown)
  const [filteredTopics, setFilteredTopics] = useState<string[]>(topics);

  // Update filtered topics when search input changes
  useEffect(() => {
    const searchLower = topicSearchInput.toLowerCase();
    if (searchLower === '') {
      setFilteredTopics(topics);
    } else {
      setFilteredTopics(
        topics.filter((topic) =>
        topic.toLowerCase().includes(searchLower)
        )
      );
    }
  }, [topics, topicSearchInput]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTopicSearchInput(e.target.value);
  };

  // Toggle a topic selection
  const handleTopicToggle = (topic: string) => {
    if (filterTopics.includes(topic)) {
      setFilterTopics(filterTopics.filter((t) => t !== topic));
    } else {
      setFilterTopics([...filterTopics, topic]);
    }
  };

  // Clear all selected topics
  const handleClearAll = () => {
    setFilterTopics([]);
    setTopicSearchInput('');
  };

  // Select all visible (filtered) topics
  const handleSelectAll = () => {
    setFilterTopics([...new Set([...filterTopics, ...filteredTopics])]);
  };

  return (
    <div className="flex flex-col" data-oid="jm9k6r5">
      <label
        htmlFor="topic-search"
        className="text-sm text-slate-600 dark:text-slate-400 mb-1" data-oid="1012f5x">

        Topics:
      </label>
      
      {/* Search input */}
      <div className="relative mb-2" data-oid="ghgqtmg">
        <input
          id="topic-search"
          type="text"
          placeholder="Search topics..."
          value={topicSearchInput}
          onChange={handleSearchChange}
          className="w-full text-sm border border-slate-200 rounded-md py-1.5 px-3 
                   focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
                   bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300" data-oid="wh:n:lm" />









        {topicSearchInput &&
        <button
          onClick={() => setTopicSearchInput('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-500" data-oid="9vq1gw5">

            &times;
          </button>
        }
      </div>
      
      {/* Selected topics */}
      {filterTopics.length > 0 &&
      <div className="mb-2 flex flex-wrap gap-1" data-oid="tl4_sey">
          {filterTopics.map((topic) =>
        <span
          key={topic}
          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs 
                       bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300" data-oid="k257b7x">





              {topic}
              <button
            onClick={() => handleTopicToggle(topic)}
            className="ml-1 text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-200" data-oid="hyawalc">

                &times;
              </button>
            </span>
        )}
          <button
          onClick={handleClearAll}
          className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300" data-oid="9vx97w:">

            Clear all
          </button>
        </div>
      }
      
      {/* Topic list */}
      <div className="max-h-48 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-md" data-oid="3p.amk:">
        {filteredTopics.length === 0 ?
        <div className="p-2 text-sm text-slate-500 dark:text-slate-400" data-oid="2t5gena">
            No topics found
          </div> :

        <div className="p-1" data-oid="t9_okxk">
            <div className="flex justify-between mb-1 px-1" data-oid="o_ym6dh">
              <span className="text-xs text-slate-500 dark:text-slate-400" data-oid="1g_naq8">
                {filteredTopics.length} topics
              </span>
              <button
              onClick={handleSelectAll}
              className="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300" data-oid="884it90">

                Select all
              </button>
            </div>
            
            <div className="space-y-1" data-oid="vp.bzlo">
              {filteredTopics.map((topic) =>
            <div
              key={topic}
              className="flex items-center" data-oid="fswix5j">

                  <input
                type="checkbox"
                id={`topic-${topic}`}
                checked={filterTopics.includes(topic)}
                onChange={() => handleTopicToggle(topic)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800" data-oid="so48_44" />

                  <label
                htmlFor={`topic-${topic}`}
                className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer overflow-hidden text-ellipsis" data-oid="yo_dnn-">

                    {topic}
                  </label>
                </div>
            )}
            </div>
          </div>
        }
      </div>
    </div>);

};