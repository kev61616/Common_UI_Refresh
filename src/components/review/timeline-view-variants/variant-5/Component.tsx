'use client';

import React, { useState } from 'react';
import { TimelineViewProps } from '../types';

/**
 * Branching Timeline View
 * 
 * A hierarchical timeline visualization that:
 * - Shows study sets in a branching pathway
 * - Visualizes relationships between different sets
 * - Groups by subject with topic branches
 * - Provides interactive selection and details viewing
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null);

  // Organize sets by subject and topic
  const setsBySubjectAndTopic: Record<string, Record<string, typeof practiceSets>> = {};

  // Extract all topics from all sets
  const allTopics = new Set<string>();
  practiceSets.forEach((set) => {
    set.questions.forEach((q) => allTopics.add(q.topic));
  });

  // Group sets by subject and topic
  practiceSets.forEach((set) => {
    if (!setsBySubjectAndTopic[set.subject]) {
      setsBySubjectAndTopic[set.subject] = {};
    }

    // Find dominant topic in this set
    const topicCounts: Record<string, number> = {};
    set.questions.forEach((q) => {
      topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
    });

    // Find topic with most questions
    let dominantTopic = Object.keys(topicCounts)[0];
    let maxCount = 0;

    Object.entries(topicCounts).forEach(([topic, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantTopic = topic;
      }
    });

    if (!setsBySubjectAndTopic[set.subject][dominantTopic]) {
      setsBySubjectAndTopic[set.subject][dominantTopic] = [];
    }

    setsBySubjectAndTopic[set.subject][dominantTopic].push(set);
  });

  // Get color for subject
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          bg: 'bg-blue-500',
          dark: 'dark:bg-blue-600',
          text: 'text-blue-500',
          darkText: 'dark:text-blue-400',
          border: 'border-blue-400',
          darkBorder: 'dark:border-blue-500',
          light: 'bg-blue-100',
          darkLight: 'dark:bg-blue-900'
        };
      case 'Reading':
        return {
          bg: 'bg-green-500',
          dark: 'dark:bg-green-600',
          text: 'text-green-500',
          darkText: 'dark:text-green-400',
          border: 'border-green-400',
          darkBorder: 'dark:border-green-500',
          light: 'bg-green-100',
          darkLight: 'dark:bg-green-900'
        };
      case 'Writing':
        return {
          bg: 'bg-purple-500',
          dark: 'dark:bg-purple-600',
          text: 'text-purple-500',
          darkText: 'dark:text-purple-400',
          border: 'border-purple-400',
          darkBorder: 'dark:border-purple-500',
          light: 'bg-purple-100',
          darkLight: 'dark:bg-purple-900'
        };
      default:
        return {
          bg: 'bg-gray-500',
          dark: 'dark:bg-gray-600',
          text: 'text-gray-500',
          darkText: 'dark:text-gray-400',
          border: 'border-gray-400',
          darkBorder: 'dark:border-gray-500',
          light: 'bg-gray-100',
          darkLight: 'dark:bg-gray-900'
        };
    }
  };

  // Format date nicely
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Sort sets by date completed
  const sortByDate = (sets: typeof practiceSets) => {
    return [...sets].sort((a, b) => {
      const dateA = new Date(a.dateCompleted);
      const dateB = new Date(b.dateCompleted);
      return dateA.getTime() - dateB.getTime();
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg h-full overflow-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Branching Timeline
      </h2>
      
      <div className="flex flex-col gap-16">
        {/* One section per subject */}
        {Object.entries(setsBySubjectAndTopic).map(([subject, topicSets]) => {
          const colors = getSubjectColor(subject);

          return (
            <div key={subject} className="mb-8">
              {/* Subject heading */}
              <div className={`mb-6 ${colors.text} ${colors.darkText} text-xl font-bold`}>
                {subject}
              </div>
              
              {/* Root timeline (main spine) */}
              <div className="relative">
                <div className={`absolute left-8 top-0 bottom-0 w-1 ${colors.bg} ${colors.dark}`}></div>
                
                {/* Topics branching out */}
                <div className="ml-8">
                  {Object.entries(topicSets).map(([topic, sets], topicIndex) => {
                    const sortedSets = sortByDate(sets);

                    return (
                      <div key={topic} className="mb-12 relative">
                        {/* Topic branch line */}
                        <div
                          className={`absolute left-0 top-6 w-8 h-0.5 ${colors.bg} ${colors.dark}`}>
                        </div>
                        
                        {/* Topic heading */}
                        <div className="mb-4 flex items-center">
                          <div
                            className={`
                              w-5 h-5 rounded-full ${colors.bg} ${colors.dark} 
                              flex items-center justify-center text-white shadow-md
                            `}>

                            <span className="text-xs font-bold">{topicIndex + 1}</span>
                          </div>
                          <h3 className="ml-3 font-semibold text-gray-800 dark:text-white">
                            {topic}
                          </h3>
                        </div>
                        
                        {/* Sets for this topic */}
                        <div className="ml-2.5 pl-10 relative">
                          {/* Topic secondary line */}
                          <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${colors.bg} ${colors.dark} opacity-60`}></div>
                          
                          <div className="space-y-4">
                            {sortedSets.map((set, setIndex) => {
                              const isSelected = set.id === selectedSetId;
                              const isHovered = set.id === hoveredSetId;

                              return (
                                <div key={set.id} className="relative">
                                  {/* Connector line to topic branch */}
                                  <div
                                    className={`absolute left-0 top-6 w-10 h-0.5 ${colors.bg} ${colors.dark} opacity-60`}
                                    style={{ left: '-40px' }}>
                                  </div>
                                  
                                  {/* Set card */}
                                  <div
                                    className={`
                                      relative bg-white dark:bg-gray-800 rounded-lg p-4 shadow
                                      border-l-4 ${colors.border} ${colors.darkBorder}
                                      hover:shadow-md transition-all duration-200 cursor-pointer
                                      ${isSelected || isHovered ? 'transform scale-[1.02] shadow-md z-10' : ''}
                                      ${isSelected ? `ring-2 ring-offset-2 ring-${colors.border.split('-')[1]}` : ''}
                                    `}
                                    onClick={() => onSelectSet(set.id)}
                                    onMouseEnter={() => setHoveredSetId(set.id)}
                                    onMouseLeave={() => setHoveredSetId(null)}>

                                    {/* Date marker - small circle on connector line */}
                                    <div
                                      className={`absolute w-3 h-3 rounded-full ${colors.bg} ${colors.dark}`}
                                      style={{ left: '-36px', top: '24px' }}>
                                    </div>
                                    
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-medium text-gray-900 dark:text-white text-lg">
                                          {set.type}
                                        </h4>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                          {set.questions.length} questions • {set.difficulty}
                                        </div>
                                      </div>
                                      
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(set.dateCompleted)}
                                      </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mt-3">
                                      <div className="flex items-center space-x-1">
                                        <div
                                          className={`w-2 h-2 rounded-full ${
                                          set.accuracy >= 80 ? 'bg-green-500' :
                                          set.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`
                                          }>
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                          {set.accuracy}% Accuracy
                                        </span>
                                      </div>
                                      
                                      <div className="text-sm text-gray-600 dark:text-gray-300">
                                        {(set.timeUsed / 60).toFixed(0)} min
                                      </div>
                                    </div>
                                    
                                    {/* Progress bar */}
                                    <div className="mt-3 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full ${
                                        set.accuracy >= 80 ? 'bg-green-500' :
                                        set.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`
                                        }
                                        style={{ width: `${set.accuracy}%` }}>
                                      </div>
                                    </div>
                                    
                                    {/* Extended details when selected or hovered */}
                                    {(isSelected || isHovered) &&
                                    <div className={`
                                        mt-3 pt-3 border-t border-gray-200 dark:border-gray-700
                                        ${isSelected ? 'block' : 'hidden md:block'}
                                      `}>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                          <div className="mb-1">
                                            <span className="font-medium">Pace:</span> {set.pace}
                                          </div>
                                          <div className="mb-1">
                                            <span className="font-medium">Time of Day:</span> {set.timeOfDay}
                                          </div>
                                          
                                          {/* Mistake types */}
                                          <div className="mt-2">
                                            <span className="font-medium">Mistake Breakdown:</span>
                                            <div className="flex gap-2 mt-1">
                                              {set.mistakeTypes.conceptual > 0 &&
                                            <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                                                  {set.mistakeTypes.conceptual} conceptual
                                                </span>
                                            }
                                              {set.mistakeTypes.careless > 0 &&
                                            <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                                                  {set.mistakeTypes.careless} careless
                                                </span>
                                            }
                                              {set.mistakeTypes.timeManagement > 0 &&
                                            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                                  {set.mistakeTypes.timeManagement} time management
                                                </span>
                                            }
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    }
                                  </div>
                                </div>);

                            })}
                          </div>
                        </div>
                      </div>);

                  })}
                </div>
              </div>
            </div>);

        })}
      </div>
    </div>);

}