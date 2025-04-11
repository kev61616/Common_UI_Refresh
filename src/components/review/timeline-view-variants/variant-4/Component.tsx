'use client';

import React from 'react';
import { TimelineViewProps } from '../types';

/**
 * Vertical Scrolling Timeline View
 * 
 * A responsive vertical timeline that allows:
 * - Scrolling through entire study history
 * - Visual representation of practice sets by date
 * - Interactive elements showing set details on hover/click
 * - Color coding for different subjects and performance levels
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  // Adapt practice sets to timeline view
  // For this view, we'll treat each practice set as a session with a date

  // Group sets by month
  const groupedSessions = practiceSets.reduce((acc: Record<string, typeof practiceSets>, set) => {
    // Extract date from practice set
    const date = new Date(set.dateCompleted);
    const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }

    acc[monthYear].push(set);
    return acc;
  }, {});

  // Sort months chronologically
  const sortedMonths = Object.keys(groupedSessions).sort((a, b) => {
    const dateA = new Date(groupedSessions[a][0].dateCompleted);
    const dateB = new Date(groupedSessions[b][0].dateCompleted);
    return dateB.getTime() - dateA.getTime(); // Most recent first
  });

  // Get color for subject
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':
        return 'bg-blue-500 dark:bg-blue-600';
      case 'Reading':
        return 'bg-green-500 dark:bg-green-600';
      case 'Writing':
        return 'bg-purple-500 dark:bg-purple-600';
      case 'Science':
        return 'bg-teal-500 dark:bg-teal-600';
      default:
        return 'bg-gray-500 dark:bg-gray-600';
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg h-full overflow-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Vertical Study Timeline
      </h2>
      
      {/* Main timeline container */}
      <div className="relative ml-4">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Timeline content */}
        <div className="space-y-12">
          {sortedMonths.map((month) =>
          <div key={month}>
              {/* Month heading */}
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 sticky top-0 bg-white dark:bg-gray-900 py-2 z-10">
                {month}
              </h3>
              
              {/* Month's sessions */}
              <div className="space-y-6">
                {groupedSessions[month].map((set) => {
                const isSelected = set.id === selectedSetId;
                return (
                  <div
                    key={set.id}
                    className={`
                        relative pl-10 transition-all duration-300
                        ${isSelected ? 'scale-105' : ''}
                      `}>

                      {/* Timeline node */}
                      <div className="absolute left-4 w-4 h-4 -translate-x-2 mt-2">
                        <div className={`
                          w-4 h-4 rounded-full ${getSubjectColor(set.subject)}
                          ${isSelected ? 'ring-4 ring-blue-200 dark:ring-blue-900' : ''}
                        `}></div>
                      </div>
                      
                      {/* Session card */}
                      <div
                      className={`
                          bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow
                          border-l-4 ${getSubjectColor(set.subject).replace('bg-', 'border-')}
                          cursor-pointer hover:shadow-md transition-shadow
                          ${isSelected ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''}
                        `}
                      onClick={() => onSelectSet(set.id)}>

                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white text-lg">
                              {set.type}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {set.subject} • {set.questions.length} questions
                            </p>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {formatTime(new Date(set.dateCompleted))}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {formatDate(new Date(set.dateCompleted))}
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                              Accuracy:
                            </div>
                            <div className="font-medium text-sm">
                              {set.accuracy}%
                            </div>
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
                        
                        {/* Additional info shown when selected */}
                        {isSelected &&
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {`Practice set with ${set.questions.length} questions.`}
                            </p>
                            
                            {/* Display topics based on questions */}
                            <div className="mt-2">
                              <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">Question Topics:</div>
                              <div className="flex flex-wrap gap-1">
                                {Array.from(new Set(set.questions.map((q) => q.topic))).map((topic, i) =>
                            <span
                              key={i}
                              className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">

                                    {topic}
                                  </span>
                            )}
                              </div>
                            </div>
                          </div>
                      }
                      </div>
                    </div>);

              })}
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom of timeline */}
        <div className="mt-8 pt-4 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>— End of Timeline —</p>
        </div>
      </div>
    </div>);

}