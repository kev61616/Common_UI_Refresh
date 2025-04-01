'use client'

import React, { useMemo } from 'react'
import { Question } from '@/lib/mockData'
import { getSubjectColor } from '../utils/boardUtils'

interface BoardCardProps {
  question: Question & { setId: string; setSubject: string };
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
  
  return (
    <div 
      key={question.id}
      className="absolute left-2 right-2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer"
      style={{ 
        top: `${index * 8}px`,
        zIndex: 10 - index,
        opacity: 1 - (index * 0.1),
        transform: `scale(${1 - index * 0.05})`,
        transformOrigin: 'top center'
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(question.id);
      }}
    >
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${subjectColor}`}></div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{subjectName}</span>
      </div>
      
      <div className="font-medium text-sm mt-1 text-slate-800 dark:text-slate-200 truncate">
        {topicText}
      </div>
      
      {index === 0 && (
        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 truncate">
          {subtopicText}
        </div>
      )}
    </div>
  )
}
