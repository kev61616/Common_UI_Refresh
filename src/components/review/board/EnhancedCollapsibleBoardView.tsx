'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { QuestionViewProps } from '@/components/review/question-view-variants/types'
import { Question } from '@/lib/mockData'
import { getDataWithFallback } from '@/lib/dataUtils'
import { BoardHeader } from './components/BoardHeader'
import { BoardColumn } from './components/BoardColumn'
import { BoardPopup } from './components/BoardPopup'
import { InteractiveBoardCard } from './InteractiveBoardCard'
import { useBoardData } from './hooks/useBoardData'
import { useBoardPopup } from './hooks/useBoardPopup'
import { masteryLevels } from './utils/boardConstants'

/**
 * EnhancedCollapsibleBoardView - Displays questions in a Board view style layout with 
 * collapsible columns and enhanced interactive cards that scale on hover and expand on click
 */
export function EnhancedCollapsibleBoardView({
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

  // Use the board data hook to process questions
  const { questionsByLevel } = useBoardData({ questions: allQuestions });
  
  // Use the board popup hook to manage popup state
  const {
    activePopupId,
    isPopupVisible,
    popupOrigin,
    popupFilters,
    popupSortField,
    popupSortDirection,
    openPopup,
    closePopup,
    handlePopupFilterChange,
    handlePopupSortChange
  } = useBoardPopup();
  
  // State to track expandable columns
  const [expandedColumns, setExpandedColumns] = useState<string[]>([]);
  
  // State to track focused card
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);
  
  // Track whether any card is focused
  const isAnyCardFocused = focusedCardId !== null;
  
  // Track whether any popup is active
  const isAnyPopupActive = activePopupId !== null;
  
  // Handler for expanding columns
  const handleExpandColumn = useCallback((levelId: string) => {
    setExpandedColumns(prev => 
      prev.includes(levelId) 
        ? prev.filter(id => id !== levelId) 
        : [...prev, levelId]
    );
  }, []);
  
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
      <BoardHeader 
        title="Skill Mastery Progression"
        description="Track your journey from novice to expert across all concepts, visualizing your growth and identifying areas for improvement"
      />
      
      {/* Board layout */}
      <div className="w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
          {masteryLevels.map(level => {
            const isExpanded = expandedColumns.includes(level.id);
            
            return (
              <BoardColumn
                key={level.id}
                level={level}
                questions={questionsByLevel[level.id]}
                isExpanded={isExpanded}
                isAnyCardFocused={isAnyCardFocused}
                isAnyPopupActive={isAnyPopupActive}
                focusedCardColumn={focusedCardColumn}
                onExpand={handleExpandColumn}
                onCardFocus={(questionId) => setFocusedCardId(questionId)}
                onOpenPopup={openPopup}
              />
            );
          })}
        </div>
      </div>
      
      {/* Popup component */}
      {activePopupId && (
        <BoardPopup
          activePopupId={activePopupId}
          masteryLevels={masteryLevels}
          isPopupVisible={isPopupVisible}
          popupOrigin={popupOrigin}
          popupFilters={popupFilters}
          popupSortField={popupSortField}
          popupSortDirection={popupSortDirection}
          questionsByLevel={questionsByLevel}
          closePopup={closePopup}
          handlePopupFilterChange={handlePopupFilterChange}
          handlePopupSortChange={handlePopupSortChange}
          onSelectSet={onSelectSet}
        />
      )}
    </div>
  )
}
