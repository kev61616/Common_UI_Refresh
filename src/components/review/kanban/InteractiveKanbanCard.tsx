'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Question } from '@/lib/mockData'

interface InteractiveKanbanCardProps {
  question: Question & { setId: string; setSubject: string };
  isSelected: boolean;
  isFocused: boolean;
  onSelect: (id: string) => void;
  onFocus: (id: string) => void;
  onUnfocus: () => void;
  getSubjectColor: (subject: string) => string;
  index: number;
}

export function InteractiveKanbanCard({
  question,
  isSelected,
  isFocused,
  onSelect,
  onFocus,
  onUnfocus,
  getSubjectColor,
  index
}: InteractiveKanbanCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to close focused card
  useEffect(() => {
    if (!isFocused) return;

    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onUnfocus();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocused, onUnfocus]);

  // Add escape key handler for focused card
  useEffect(() => {
    if (!isFocused) return;

    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onUnfocus();
      }
    }

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isFocused, onUnfocus]);
  
  // Build class names based on card state - simplified without animations
  const baseClasses = `
    bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 
    dark:border-slate-700 relative
  `;
  
  const hoverClasses = isHovered && !isFocused 
    ? 'shadow-md' 
    : 'shadow-sm';
    
  const selectedClasses = isSelected 
    ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' 
    : '';
    
  const focusedClasses = isFocused 
    ? 'shadow-xl z-50 ring-2 ring-indigo-600 dark:ring-indigo-400 absolute left-0 right-0 top-0' 
    : '';

  // Content for the card based on whether it's focused or not
  const renderCardContent = () => (
    <>
      {/* Card header with subject indicator */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-2 h-2 rounded-full ${getSubjectColor(question.setSubject)}`}></div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{question.setSubject}</span>
        
        {/* Close button only shown when focused */}
        {isFocused && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onUnfocus();
            }}
            className="ml-auto p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Card title */}
      <div className="font-medium text-sm mb-2 text-slate-800 dark:text-slate-200">
        {question.topic}
      </div>
      
      {/* Card subtitle */}
      <div className="text-xs text-slate-600 dark:text-slate-400">
        {question.subtopic}
      </div>
      
      {/* Card footer with metadata */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          question.difficulty === 'Easy' 
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
            : question.difficulty === 'Medium'
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
            : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
        }`}>
          {question.difficulty}
        </span>
        
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {Math.floor(question.timeSpent / 60)}:{String(question.timeSpent % 60).padStart(2, '0')}
        </span>
      </div>
      
      {/* Extended content only visible when focused */}
      {isFocused && (
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 animate-fadeIn">
          <h4 className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2">Question Details</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            {"This question tests your knowledge of " + question.topic + " through a series of challenging problems related to " + question.subtopic + "."}
          </p>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
              <div className="text-slate-500 dark:text-slate-400">Accuracy</div>
              <div className="font-medium text-slate-800 dark:text-slate-200">
                {question.correct ? '100%' : '0%'} (1 attempt)
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
              <div className="text-slate-500 dark:text-slate-400">Last Practiced</div>
              <div className="font-medium text-slate-800 dark:text-slate-200">
                5 days ago
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(question.setId);
                onUnfocus();
              }}
              className="px-3 py-1.5 text-xs font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/40 dark:text-indigo-400 rounded-md transition-colors"
            >
              Practice Now
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div 
      ref={cardRef}
      className={`${baseClasses} ${hoverClasses} ${selectedClasses} ${focusedClasses} cursor-pointer`}
      onClick={() => {
        if (isFocused) {
          onSelect(question.setId);
        } else {
          onFocus(question.id);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-expanded={isFocused}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (isFocused) {
            onSelect(question.setId);
          } else {
            onFocus(question.id);
          }
        }
      }}
    >
      {renderCardContent()}
    </div>
  );
}
