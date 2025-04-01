'use client'

import React from 'react'
import { Question } from '@/lib/mockData'
import { CompactFilterBar } from '@/components/common/CompactFilterBar'
import { getSubjectColor } from '../utils/boardUtils'
import { 
  VeryWeakIcon, 
  WeakIcon, 
  NotAttemptedIcon, 
  EmergingIcon, 
  ProficientIcon, 
  MasteredIcon 
} from '@/components/icons/MasteryIcons'

interface MasteryLevel {
  id: string;
  name: string;
  description: string;
  color: string;
  borderColor: string;
  titleColor: string;
  headerBg: string;
  iconBg: string;
  scoreRange: { min: number; max: number };
}

interface BoardPopupProps {
  activePopupId: string | null;
  masteryLevels: MasteryLevel[];
  isPopupVisible: boolean;
  popupOrigin: { x: number; y: number };
  popupFilters: Record<string, string[] | string>;
  popupSortField: string;
  popupSortDirection: 'asc' | 'desc';
  questionsByLevel: Record<string, (Question & { setId: string; setSubject: string })[]>;
  closePopup: () => void;
  handlePopupFilterChange: (category: string, values: string[] | string) => void;
  handlePopupSortChange: (field: string, direction: 'asc' | 'desc') => void;
  onSelectSet: ((id: string) => void) | undefined;
}

/**
 * Popup component for displaying detailed information about a mastery level category
 */
export function BoardPopup({
  activePopupId,
  masteryLevels,
  isPopupVisible,
  popupOrigin,
  popupFilters,
  popupSortField,
  popupSortDirection,
  questionsByLevel,
  closePopup,
  handlePopupFilterChange,
  handlePopupSortChange,
  onSelectSet
}: BoardPopupProps) {
  if (!activePopupId) return null;

  // Get icon based on level id
  const getLevelIcon = (levelId: string, size: number = 24) => {
    switch(levelId) {
      case 'very-weak': 
        return <VeryWeakIcon size={size} color="white" />;
      case 'weak': 
        return <WeakIcon size={size} color="white" />;
      case 'not-attempted': 
        return <NotAttemptedIcon size={size} color="white" />;
      case 'emerging': 
        return <EmergingIcon size={size} color="white" />;
      case 'proficient': 
        return <ProficientIcon size={size} color="white" />;
      case 'mastered': 
        return <MasteredIcon size={size} color="white" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: isPopupVisible ? 1 : 0 }}
        onClick={closePopup}
      ></div>
      
      {/* Popup content */}
      <div 
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-[80%] max-h-[85vh] overflow-hidden relative transition-all duration-500 ${
          isPopupVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{
          transformOrigin: isPopupVisible ? 'center' : `${popupOrigin.x}px ${popupOrigin.y}px`,
          transform: isPopupVisible 
            ? 'scale(1) translate(0, 0)' 
            : `scale(0.5) translate(${(window.innerWidth/2 - popupOrigin.x) * -1}px, ${(window.innerHeight/2 - popupOrigin.y) * -1}px)`
        }}
      >
        {/* Find the active category */}
        {masteryLevels.map(level => level.id === activePopupId && (
          <div key={level.id} className="flex flex-col h-full">
            {/* Popup header */}
            <div className={`${level.headerBg} ${level.color} p-6 border-b ${level.borderColor}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className={`${level.iconBg} text-white p-3 rounded-xl`}>
                    {getLevelIcon(level.id)}
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${level.titleColor}`}>{level.name}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{level.description}</p>
                  </div>
                </div>
                
                <button 
                  onClick={closePopup}
                  className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Popup content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 100px)' }}>
              {/* Add filter bar for popup content */}
              <CompactFilterBar
                activeFilters={popupFilters}
                onFilterChange={handlePopupFilterChange}
                sortField={popupSortField}
                sortDirection={popupSortDirection}
                onSortChange={handlePopupSortChange}
              />
              
              <div className="mb-6 mt-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Questions in this category</h3>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {questionsByLevel[level.id].length > 0 
                    ? `${questionsByLevel[level.id].length} questions require your attention`
                    : "No questions in this category"}
                </div>
              </div>
              
              {/* Questions grid - with filtered and sorted results */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {questionsByLevel[level.id]
                  // Apply filtering based on popupFilters
                  .filter(question => {
                    // Subject filter
                    if (Array.isArray(popupFilters.subject) && 
                        !popupFilters.subject.includes('all') && 
                        !popupFilters.subject.includes(question.setSubject)) {
                      return false;
                    }
                    
                    // Difficulty filter
                    if (Array.isArray(popupFilters.difficulty) && 
                        !popupFilters.difficulty.includes('all') && 
                        !popupFilters.difficulty.includes(question.difficulty)) {
                      return false;
                    }
                    
                    // For other filters we'd implement similar logic
                    // but for now just return true to show all questions that pass subject/difficulty
                    return true;
                  })
                  // Apply sorting based on popupSortField and popupSortDirection
                  .sort((a, b) => {
                    let comparison = 0;
                    
                    switch (popupSortField) {
                      case 'topic':
                        comparison = a.topic.localeCompare(b.topic);
                        break;
                      case 'difficulty':
                        comparison = a.difficulty.localeCompare(b.difficulty);
                        break;
                      case 'subject':
                        comparison = a.setSubject.localeCompare(b.setSubject);
                        break;
                      default:
                        comparison = a.topic.localeCompare(b.topic);
                    }
                    
                    return popupSortDirection === 'asc' ? comparison : -comparison;
                  })
                  // Render the cards
                  .map((question) => (
                  <div 
                    key={question.id}
                    className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow transition-shadow"
                    onClick={() => onSelectSet && onSelectSet(question.setId)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${getSubjectColor(question.setSubject)}`}></div>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{question.setSubject}</span>
                    </div>
                    
                    <div className="font-medium text-sm mb-2 text-slate-800 dark:text-white">
                      {question.topic}
                    </div>
                    
                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                      {question.subtopic}
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        question.difficulty === 'Easy' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                          : question.difficulty === 'Medium'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                      }`}>
                        {question.difficulty}
                      </span>
                      
                      <button 
                        className="text-xs font-medium px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/40 dark:text-indigo-400 rounded-md transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectSet) onSelectSet(question.setId);
                          closePopup();
                        }}
                      >
                        Practice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Empty state */}
              {questionsByLevel[level.id].length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-slate-400 dark:text-slate-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2">No questions in this category</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                    As you continue your practice, questions will appear here based on your performance.
                  </p>
                </div>
              )}
            </div>
            
            {/* Popup footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex justify-end">
                <button
                  onClick={closePopup}
                  className="px-4 py-2 bg-white dark:bg-slate-700 rounded-md text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
