'use client';

import React, { useState } from 'react';
import { TimelineViewProps } from '../types';

/**
 * Circular Timeline View
 * 
 * A radial timeline visualization that:
 * - Represents study sessions in a circular pattern
 * - Groups by subject with color-coding
 * - Shows progress and accuracy with visual indicators
 * - Provides interactive selection and details viewing
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: TimelineViewProps) {
  const [hoveredSetId, setHoveredSetId] = useState<string | null>(null);

  // Calculate center point of the circle
  const centerX = 400;
  const centerY = 400;
  const radius = 250;

  // Group sets by subject
  const setsBySubject: Record<string, typeof practiceSets> = {};

  practiceSets.forEach((set) => {
    if (!setsBySubject[set.subject]) {
      setsBySubject[set.subject] = [];
    }
    setsBySubject[set.subject].push(set);
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
          fill: '#3b82f6',
          darkFill: '#2563eb',
          stroke: '#93c5fd',
          darkStroke: '#1d4ed8'
        };
      case 'Reading':
        return {
          bg: 'bg-green-500',
          dark: 'dark:bg-green-600',
          text: 'text-green-500',
          darkText: 'dark:text-green-400',
          fill: '#22c55e',
          darkFill: '#16a34a',
          stroke: '#86efac',
          darkStroke: '#15803d'
        };
      case 'Writing':
        return {
          bg: 'bg-purple-500',
          dark: 'dark:bg-purple-600',
          text: 'text-purple-500',
          darkText: 'dark:text-purple-400',
          fill: '#a855f7',
          darkFill: '#9333ea',
          stroke: '#d8b4fe',
          darkStroke: '#7e22ce'
        };
      default:
        return {
          bg: 'bg-gray-500',
          dark: 'dark:bg-gray-600',
          text: 'text-gray-500',
          darkText: 'dark:text-gray-400',
          fill: '#6b7280',
          darkFill: '#4b5563',
          stroke: '#d1d5db',
          darkStroke: '#374151'
        };
    }
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate the number of days ago
  const getDaysAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  // Calculate the position on the circle for each set
  const calculatePosition = (index: number, total: number, subjectIndex: number, totalSubjects: number) => {
    // Split the circle into segments based on subjects
    const segmentAngle = 2 * Math.PI / totalSubjects;
    const startAngle = segmentAngle * subjectIndex;
    const endAngle = startAngle + segmentAngle;

    // Distribute sets evenly within their subject segment
    const angle = startAngle + (endAngle - startAngle) * (index / (total || 1));

    // Calculate position on the circle
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    return { x, y, angle };
  };

  // Get all subjects and calculate radial positions
  const subjects = Object.keys(setsBySubject);
  const positionedSets = subjects.map((subject, subjectIndex) => {
    const sets = setsBySubject[subject];

    return sets.map((set, index) => {
      const position = calculatePosition(index, sets.length, subjectIndex, subjects.length);
      return { set, position };
    });
  }).flat();

  // Calculate the position for the detail card based on the angle
  const getDetailCardPosition = (angle: number) => {
    // Determine which quadrant the set is in
    const quadrant = Math.floor((angle / (Math.PI / 2) + 4) % 4);

    // Position the card based on the quadrant to avoid going off-screen
    switch (quadrant) {
      case 0: // Top right
        return { top: '-120px', left: '30px' };
      case 1: // Bottom right
        return { top: '30px', left: '30px' };
      case 2: // Bottom left
        return { top: '30px', right: '30px' };
      case 3: // Top left
        return { top: '-120px', right: '30px' };
      default:
        return { top: '30px', left: '30px' };
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg h-full overflow-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Circular Study Timeline
      </h2>
      
      <div className="relative w-full max-w-[800px] mx-auto" style={{ height: '800px' }}>
        {/* Subject regions */}
        <svg width="800" height="800" viewBox="0 0 800 800" className="absolute">
          {subjects.map((subject, i) => {
            const segmentAngle = 2 * Math.PI / subjects.length;
            const startAngle = segmentAngle * i;
            const endAngle = startAngle + segmentAngle;

            const colors = getSubjectColor(subject);

            // Calculate path for the segment
            const largeArcFlag = segmentAngle > Math.PI ? 1 : 0;

            const x1 = centerX + (radius + 50) * Math.cos(startAngle);
            const y1 = centerY + (radius + 50) * Math.sin(startAngle);
            const x2 = centerX + (radius + 50) * Math.cos(endAngle);
            const y2 = centerY + (radius + 50) * Math.sin(endAngle);

            const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius + 50} ${radius + 50} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'].
            join(' ');

            return (
              <g key={subject}>
                <path
                  d={pathData}
                  fill="none"
                  className="opacity-10 dark:opacity-15"
                  stroke={colors.stroke}
                  strokeWidth="40" />

                
                {/* Subject label */}
                <text
                  x={centerX + (radius + 100) * Math.cos(startAngle + segmentAngle / 2)}
                  y={centerY + (radius + 100) * Math.sin(startAngle + segmentAngle / 2)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="currentColor"
                  className={`${colors.text} ${colors.darkText} font-bold text-lg`}>

                  {subject}
                </text>
              </g>);

          })}
          
          {/* Circular grid lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio, i) =>
          <circle
            key={i}
            cx={centerX}
            cy={centerY}
            r={radius * ratio}
            fill="none"
            stroke="currentColor"
            strokeDasharray="2,4"
            className="text-gray-200 dark:text-gray-700"
            strokeWidth="1" />

          )}
        </svg>
        
        {/* Center decoration */}
        <div
          className="absolute rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          style={{
            left: centerX - 50,
            top: centerY - 50,
            width: 100,
            height: 100
          }}>

          <div className="text-sm text-center">
            <div className="font-bold text-gray-500 dark:text-gray-400">Study</div>
            <div className="font-bold text-gray-500 dark:text-gray-400">Timeline</div>
          </div>
        </div>
        
        {/* Study set nodes */}
        {positionedSets.map(({ set, position }) => {
          const isSelected = set.id === selectedSetId;
          const isHovered = set.id === hoveredSetId;
          const colors = getSubjectColor(set.subject);

          // Calculate dot size based on number of questions
          const dotSize = Math.max(10, Math.min(20, 10 + set.questions.length / 2));

          // Calculate position of details card
          const detailPosition = getDetailCardPosition(position.angle);

          return (
            <div key={set.id} className="absolute" style={{
              left: position.x - dotSize / 2,
              top: position.y - dotSize / 2,
              width: dotSize,
              height: dotSize
            }}>
              {/* Node */}
              <button
                className={`absolute rounded-full ${colors.bg} ${colors.dark} shadow-md transition-all duration-200
                  ${isSelected || isHovered ? 'transform scale-150 z-20' : 'z-10'}
                  ${isSelected ? 'ring-4 ring-blue-300 dark:ring-blue-700' : ''}
                `}
                style={{
                  width: dotSize,
                  height: dotSize,
                  opacity: set.accuracy / 100 * 0.5 + 0.5 // More opaque for higher accuracy
                }}
                onClick={() => onSelectSet(set.id)}
                onMouseEnter={() => setHoveredSetId(set.id)}
                onMouseLeave={() => setHoveredSetId(null)}
                aria-label={`Select ${set.type}`} />

              
              {/* Connection line */}
              {isSelected &&
              <div
                className={`absolute bg-gradient-to-r from-${colors.fill} to-transparent h-0.5`}
                style={{
                  width: radius,
                  transformOrigin: '0 0',
                  transform: `rotate(${position.angle + Math.PI}rad)`,
                  left: dotSize / 2,
                  top: dotSize / 2
                }} />

              }
              
              {/* Details card - only show when selected or hovered */}
              {(isSelected || isHovered) &&
              <div
                className="absolute bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 min-w-[200px] z-30 whitespace-nowrap"
                style={{
                  ...detailPosition,
                  transition: 'all 0.2s ease-in-out'
                }}>

                  <div className={`${colors.text} ${colors.darkText} font-bold`}>
                    {set.type}
                  </div>
                  
                  <div className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {set.subject} • {set.questions.length} questions
                  </div>
                  
                  <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    {formatDate(set.dateCompleted)} • {getDaysAgo(set.dateCompleted)}
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Accuracy:</span>
                    <span className="font-medium">{set.accuracy}%</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-1 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                    className={`h-full ${
                    set.accuracy >= 80 ? 'bg-green-500' :
                    set.accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`
                    }
                    style={{ width: `${set.accuracy}%` }} />

                  </div>
                  
                  {isSelected &&
                <div className="text-xs text-gray-500 dark:text-gray-400 italic mt-2">
                      Click on another set to compare
                    </div>
                }
                </div>
              }
            </div>);

        })}
        
        {/* Time indicators */}
        <div className="text-xs text-gray-400 dark:text-gray-500 absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[165px]">Recent</div>
        <div className="text-xs text-gray-400 dark:text-gray-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[175px]">Older</div>
        <div className="text-xs text-gray-400 dark:text-gray-500 absolute left-1/2 top-1/2 -translate-x-[165px] -translate-y-1/2">Earlier</div>
        <div className="text-xs text-gray-400 dark:text-gray-500 absolute left-1/2 top-1/2 translate-x-[165px] -translate-y-1/2">Later</div>
      </div>
    </div>);

}