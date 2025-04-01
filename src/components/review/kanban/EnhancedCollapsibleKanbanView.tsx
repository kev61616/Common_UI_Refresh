'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { QuestionViewProps } from '@/components/review/question-view-variants/types'
import { Question } from '@/lib/mockData'
import { getDataWithFallback } from '@/lib/dataUtils'
import { SwordIcon } from '@/components/icons/SwordIcon'
import { InteractiveKanbanCard } from './InteractiveKanbanCard'
import { CompactFilterBar } from '@/components/common/CompactFilterBar'
import { ClientOnlyCount } from '@/components/review/ClientOnlyCount'

/**
 * EnhancedCollapsibleKanbanView - Displays questions in a Kanban board style layout with 
 * collapsible columns and enhanced interactive cards that scale on hover and expand on click
 */
export function EnhancedCollapsibleKanbanView({
  practiceSets,
  onSelectSet,
  selectedSetId,
}: QuestionViewProps) {
  // Use data with fallback
  const data = getDataWithFallback(practiceSets);
  
  // Extract all questions from all practice sets
  const allQuestions = useMemo(() => {
    const questions: (Question & { setId: string; setSubject: string })[] = []
    
    data.forEach(set => {
      set.questions.forEach((q: Question) => {
        questions.push({
          ...q,
          setId: set.id,
          setSubject: set.subject
        })
      })
    })
    
    return questions
  }, [data])

  // Define mastery levels and their criteria
  const masteryLevels = [
    { 
      id: 'very-weak', 
      name: 'Very Weak', 
      description: '2x+ incorrect',
      color: 'bg-red-100 dark:bg-red-900/20',
      borderColor: 'border-red-300 dark:border-red-700',
      titleColor: 'text-red-800 dark:text-red-400',
      headerBg: 'bg-red-50 dark:bg-red-900/10',
      iconBg: 'bg-red-500',
      match: (q: Question) => q.answered && !q.correct && Math.random() < 0.3 // Simulating 3x incorrect
    },
    { 
      id: 'weak', 
      name: 'Weak', 
      description: '1x incorrect',
      color: 'bg-orange-100 dark:bg-orange-900/20',
      borderColor: 'border-orange-300 dark:border-orange-700',
      titleColor: 'text-orange-800 dark:text-orange-400',
      headerBg: 'bg-orange-50 dark:bg-orange-900/10',
      iconBg: 'bg-orange-500',
      match: (q: Question) => q.answered && !q.correct && Math.random() < 0.5 && Math.random() >= 0.3 // Simulating 2x incorrect
    },
    { 
      id: 'not-attempted', 
      name: 'Not Attempted', 
      description: '0x attempted',
      color: 'bg-gray-100 dark:bg-gray-800/40',
      borderColor: 'border-gray-300 dark:border-gray-700',
      titleColor: 'text-gray-800 dark:text-gray-400',
      headerBg: 'bg-gray-50 dark:bg-gray-800/20',
      iconBg: 'bg-gray-500',
      match: (q: Question) => !q.answered 
    },
    { 
      id: 'emerging', 
      name: 'Emerging', 
      description: '1x correct',
      color: 'bg-yellow-100 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-300 dark:border-yellow-700',
      titleColor: 'text-yellow-800 dark:text-yellow-400',
      headerBg: 'bg-yellow-50 dark:bg-yellow-900/10',
      iconBg: 'bg-yellow-500',
      match: (q: Question) => q.answered && q.correct && Math.random() < 0.3 // Simulating 1x correct
    },
    { 
      id: 'proficient', 
      name: 'Proficient', 
      description: '2x correct',
      color: 'bg-blue-100 dark:bg-blue-900/20',
      borderColor: 'border-blue-300 dark:border-blue-700',
      titleColor: 'text-blue-800 dark:text-blue-400',
      headerBg: 'bg-blue-50 dark:bg-blue-900/10',
      iconBg: 'bg-blue-500',
      match: (q: Question) => q.answered && q.correct && Math.random() < 0.5 && Math.random() >= 0.3 // Simulating 2x correct
    },
    { 
      id: 'mastered', 
      name: 'Mastered', 
      description: '3x+ correct',
      color: 'bg-green-100 dark:bg-green-900/20',
      borderColor: 'border-green-300 dark:border-green-700',
      titleColor: 'text-green-800 dark:text-green-400',
      headerBg: 'bg-green-50 dark:bg-green-900/10',
      iconBg: 'bg-green-500',
      match: (q: Question) => q.answered && q.correct && Math.random() >= 0.5 // Simulating 3x+ correct
    }
  ]

  // Group questions by mastery level
  const questionsByLevel = useMemo(() => {
    const grouped: Record<string, (Question & { setId: string; setSubject: string })[]> = {}
    
    // Initialize empty arrays for each mastery level
    masteryLevels.forEach(level => {
      grouped[level.id] = []
    })
    
    // Generate a deterministic "mastery score" for each question based on its ID
    // This ensures consistent categorization without relying on Math.random()
    const getMasteryScore = (questionId: string): number => {
      // Use hash-like approach to convert ID to a numeric value
      const hashValue = questionId.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
      }, 0);
      
      // Return a value between 0 and 1 based on hash
      return (hashValue % 100) / 100;
    };
    
    // Distribute questions to appropriate levels with a more balanced distribution
    allQuestions.forEach(question => {
      const masteryScore = getMasteryScore(question.id);
      
      if (!question.answered) {
        // Not attempted
        grouped['not-attempted'].push(question);
      } else if (question.correct) {
        // Use a different distribution that ensures more questions in proficient and mastered
        if (masteryScore < 0.2) {
          // Emerging (1x correct) - 20%
          grouped['emerging'].push(question);
        } else if (masteryScore < 0.5) {
          // Proficient (2x correct) - 30%
          grouped['proficient'].push(question);
        } else {
          // Mastered (3x+ correct) - 50%
          grouped['mastered'].push(question);
        }
      } else {
        // Incorrect
        if (masteryScore < 0.5) {
          // Very weak (3x+ incorrect)
          grouped['very-weak'].push(question);
        } else {
          // Weak (2x incorrect)
          grouped['weak'].push(question);
        }
      }
      
      // Create some duplicate entries to ensure we have data in all categories
      // This is just for demo purposes
      const dupMasteryScore = (masteryScore + 0.3) % 1;
      if (dupMasteryScore < 0.3) {
        // Create a clone of the question to avoid reference issues
        const questionClone = {...question, id: question.id + '-dup'};
        grouped['proficient'].push(questionClone);
      } else if (dupMasteryScore < 0.6) {
        const questionClone = {...question, id: question.id + '-dup'};
        grouped['mastered'].push(questionClone);
      }
    });
    
    return grouped;
  }, [allQuestions, masteryLevels])

  // State to track expandable columns
  const [expandedColumns, setExpandedColumns] = useState<string[]>([]);
  
  // State to track focused card
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);
  
  // State to track active popup and its origin position
  const [activePopupId, setActivePopupId] = useState<string | null>(null);
  
  // State to track popup animation
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  // State to track the origin position of the clicked card for animation
  const [popupOrigin, setPopupOrigin] = useState({ x: 0, y: 0 });
  
  // Filter and sort state for popup content
  const [popupFilters, setPopupFilters] = useState<Record<string, string[] | string>>({
    subject: ['all'],
    difficulty: ['all'],
    period: ['all'],
    performance: ['all']
  });
  
  const [popupSortField, setPopupSortField] = useState<string>('topic');
  const [popupSortDirection, setPopupSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Handle filter change in popup
  const handlePopupFilterChange = useCallback((category: string, values: string[] | string) => {
    setPopupFilters(prev => ({
      ...prev,
      [category]: values
    }));
  }, []);
  
  // Handle sort change in popup
  const handlePopupSortChange = useCallback((field: string, direction: 'asc' | 'desc') => {
    setPopupSortField(field);
    setPopupSortDirection(direction);
  }, []);
  
  // Track whether any card is focused
  const isAnyCardFocused = focusedCardId !== null;
  
  // Track whether any popup is active
  const isAnyPopupActive = activePopupId !== null;
  
  // Track keyboard events for popup closing
  React.useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePopupId) {
        closePopup();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [activePopupId]);
  
  // Open a popup for a category
  const openPopup = (categoryId: string, event: React.MouseEvent) => {
    // Get the position of the clicked element to animate from
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setActivePopupId(categoryId);
    // Add a small delay to trigger the entrance animation
    setTimeout(() => setIsPopupVisible(true), 50);
  };
  
  // Close the active popup
  const closePopup = () => {
    // First trigger the exit animation
    setIsPopupVisible(false);
    // Then clear the active popup after animation completes
    setTimeout(() => setActivePopupId(null), 300);
  };

  // Function to get subject-specific icon or color
  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Math':
        return 'bg-emerald-500 dark:bg-emerald-600';
      case 'Reading':
        return 'bg-sky-500 dark:bg-sky-600';
      case 'Writing':
        return 'bg-purple-500 dark:bg-purple-600';
      default:
        return 'bg-gray-500 dark:bg-gray-600';
    }
  }

  // Find the column id for the focused card
  const getFocusedCardColumn = (): string | null => {
    if (!focusedCardId) return null;
    
    for (const levelId in questionsByLevel) {
      const foundQuestion = questionsByLevel[levelId].find(q => q.id === focusedCardId);
      if (foundQuestion) return levelId;
    }
    
    return null;
  }

  const focusedCardColumn = getFocusedCardColumn();

  return (
    <div className="pb-8 px-4">
      {/* Title Section */}
      <div className="text-center mb-8 px-0">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Skill Mastery Progression
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Track your journey from novice to expert across all concepts, visualizing your growth and identifying areas for improvement
        </p>
      </div>
      
      {/* Kanban board layout */}
      <div className="w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
          {masteryLevels.map(level => {
            const isExpanded = expandedColumns.includes(level.id);
            const questionCount = questionsByLevel[level.id].length;
            const maxVisibleItems = 3; // Number of stacked items to show when collapsed
            const isFocusedColumn = focusedCardColumn === level.id;
            
            return (
              <div 
                key={level.id}
                className={`${level.color} border ${level.borderColor} rounded-lg shadow-sm overflow-hidden hover:shadow-md hover:scale-[1.02] hover:z-10 transition-all duration-300`}
              >
                {/* Column header */}
                <div 
                  className={`${level.headerBg} cursor-pointer p-4 flex items-center justify-between`}
                  onClick={(e) => {
                    if (!isAnyCardFocused && !isAnyPopupActive) {
                      // Open the popup for this category
                      openPopup(level.id, e);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${level.iconBg} text-white p-1.5 rounded-lg`}>
                      <SwordIcon size={16} color="white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${level.titleColor}`}>{level.name}</h3>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{level.description}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ClientOnlyCount count={questionCount} />
                    <button 
                      className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                      disabled={isAnyCardFocused}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Column content - simple preview of cards */}
                <div className="p-3 max-h-[150px] relative overflow-hidden"
                >
                  {/* Stacked card preview */}
                  <div className="relative h-[120px]">
                      {questionsByLevel[level.id].slice(0, maxVisibleItems).map((question, index) => (
                        <div 
                          key={question.id}
                          className={`absolute left-2 right-2 bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer`}
                          style={{ 
                            top: `${index * 8}px`,
                            zIndex: 10 - index,
                            opacity: 1 - (index * 0.1),
                            transform: `scale(${1 - index * 0.05})`,
                            transformOrigin: 'top center'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // First expand the column, then focus the card
                            if (!expandedColumns.includes(level.id)) {
                              setExpandedColumns([...expandedColumns, level.id]);
                              setTimeout(() => setFocusedCardId(question.id), 300);
                            } else {
                              setFocusedCardId(question.id);
                            }
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getSubjectColor(question.setSubject)}`}></div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{question.setSubject}</span>
                          </div>
                          
                          <div className="font-medium text-sm mt-1 text-slate-800 dark:text-slate-200 truncate">
                            {question.topic}
                          </div>
                          
                          {index === 0 && (
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 truncate">
                              {question.subtopic}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* More items indicator */}
                      {questionCount > maxVisibleItems && (
                        <div className="absolute bottom-0 left-0 right-0 text-center text-sm font-medium text-slate-600 dark:text-slate-400 py-1">
                          + {questionCount - maxVisibleItems} more items
                        </div>
                      )}
                      
                      {/* Empty state */}
                      {questionCount === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <div className="text-slate-400 dark:text-slate-500 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">No questions in this category</div>
                        </div>
                      )}
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Beautiful popup for category details */}
      {activePopupId && (
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
                        <SwordIcon size={24} color="white" />
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
                      .map((question, index) => (
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
      )}
    
    </div>
  )
}
