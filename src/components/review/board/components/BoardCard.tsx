'use client';

import React, { useMemo, useState } from 'react';
import { Question } from '@/lib/mockData';
import { getSubjectColor } from '../utils/boardUtils';

interface BoardCardProps {
  question: Question & {setId: string;setSubject: string;};
  index: number;
  maxVisibleItems: number;
  onClick: (questionId: string) => void;
}

/**
 * Card component for displaying a question in the board view
 */
export function BoardCard({ question, index, maxVisibleItems, onClick }: BoardCardProps) {
  // Pre-compute values to ensure hydration stability
  const subjectColor = useMemo(() => getSubjectColor(question.setSubject), [question.setSubject]);
  const subjectName = useMemo(() => question.setSubject, [question.setSubject]);
  const topicText = useMemo(() => question.topic, [question.topic]);
  const subtopicText = useMemo(() => question.subtopic, [question.subtopic]);

  // Much higher z-index to ensure it's above ALL other elements
  const zIndex = 1000 - index; 
  
  // Use state to track hover for better visual feedback
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle the click with maximum priority - focus this specific card
  const handleCardClick = (e: React.MouseEvent) => {
    // Stop event from propagating to parent elements
    e.stopPropagation();
    e.preventDefault();
    // Log click for debugging
    console.log('Individual card clicked:', question.id);
    // Call the onClick handler to focus this specific card
    onClick(question.id);
  };

  return (
    <button
      key={question.id}
      type="button"
      className={`absolute left-2 right-2 w-[calc(100%-16px)] text-left bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border transition-all ${
        isHovered 
          ? 'border-sky-500 dark:border-sky-400 shadow-md ring-2 ring-sky-300 dark:ring-sky-700' 
          : 'border-slate-200 dark:border-slate-700'
      }`}
      aria-label={`View details for ${topicText} question`}
      style={{
        top: `${index * 8}px`,
        zIndex: zIndex,
        opacity: isHovered ? 1 : (1 - index * 0.1),
        transform: isHovered 
          ? `scale(${1.02 - index * 0.02})` 
          : `scale(${1 - index * 0.05})`,
        transformOrigin: 'top center',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      data-oid="81jiio5">

      {/* Card content */}
      <div className="flex items-center gap-2 select-none" data-oid="3f.8sg3">
        <div className={`w-2 h-2 rounded-full ${subjectColor}`} data-oid="6bftaa8"></div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate" data-oid="r:96vpv">{subjectName}</span>
      </div>
      
      <div className="font-medium text-sm mt-1 text-slate-800 dark:text-slate-200 truncate select-none" data-oid="h6o5jsy">
        {topicText}
      </div>
      
      {/* Show subtopic and View Card text on hover */}
      {(index === 0 || isHovered) && (
        <>
          <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 truncate select-none" data-oid="olcl6j-">
            {subtopicText}
          </div>
          {isHovered && (
            <div className="mt-2 text-xs font-medium text-sky-600 dark:text-sky-400 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Card
            </div>
          )}
        </>
      )}
    </button>);

}
