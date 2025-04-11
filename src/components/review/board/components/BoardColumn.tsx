'use client';

import React from 'react';
import { Question } from '@/lib/mockData';
import { BoardCard } from './BoardCard';
import { BoardEmptyState } from './BoardEmptyState';
import { ClientOnlyCount } from '@/components/review/ClientOnlyCount';
import {
  VeryWeakIcon,
  WeakIcon,
  NotAttemptedIcon,
  EmergingIcon,
  ProficientIcon,
  MasteredIcon } from
'@/components/icons/MasteryIcons';

interface MasteryLevel {
  id: string;
  name: string;
  description: string;
  color: string;
  borderColor: string;
  titleColor: string;
  headerBg: string;
  iconBg: string;
  scoreRange: {min: number;max: number;};
}

interface BoardColumnProps {
  level: MasteryLevel;
  questions: (Question & {setId: string;setSubject: string;})[];
  isExpanded: boolean;
  isAnyCardFocused: boolean;
  isAnyPopupActive: boolean;
  focusedCardColumn: string | null;
  onExpand: (levelId: string) => void;
  onCardFocus: (questionId: string) => void;
  onOpenPopup: (categoryId: string, event: React.MouseEvent) => void;
}

/**
 * Column component for displaying questions by mastery level
 */
export function BoardColumn({
  level,
  questions,
  isExpanded,
  isAnyCardFocused,
  isAnyPopupActive,
  focusedCardColumn,
  onExpand,
  onCardFocus,
  onOpenPopup
}: BoardColumnProps) {
  const questionCount = questions.length;
  const maxVisibleItems = 3; // Number of stacked items to show when collapsed
  const isFocusedColumn = focusedCardColumn === level.id;

  // Get the correct icon based on level id
  const renderIcon = () => {
    switch (level.id) {
      case 'very-weak':
        return <VeryWeakIcon size={16} color="white" data-oid="10h3hck" />;
      case 'weak':
        return <WeakIcon size={16} color="white" data-oid="gfz79qs" />;
      case 'not-attempted':
        return <NotAttemptedIcon size={16} color="white" data-oid="6wjigoy" />;
      case 'emerging':
        return <EmergingIcon size={16} color="white" data-oid="__.6dpu" />;
      case 'proficient':
        return <ProficientIcon size={16} color="white" data-oid="bzxmbjd" />;
      case 'mastered':
        return <MasteredIcon size={16} color="white" data-oid="yvsvckc" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`${level.color} border ${level.borderColor} rounded-lg shadow-sm overflow-hidden hover:shadow-md hover:scale-[1.02] hover:z-10 transition-all duration-300`} data-oid="kox:dc:">

      {/* Column header */}
      <div
        className={`${level.headerBg} cursor-pointer p-4 flex items-center justify-between`}
        onClick={(e) => {
          // Only if nothing else is active, allow column header click
          if (!isAnyCardFocused && !isAnyPopupActive) {
            // Open the popup for this category
            onOpenPopup(level.id, e);
          }
        }} data-oid="iw03d-k">

        <div className="flex items-center gap-3" data-oid="thrf_i6">
          <div className={`${level.iconBg} text-white p-1.5 rounded-lg`} data-oid="6qxmx9-">
            {renderIcon()}
          </div>
          <div data-oid="4zhgr48">
            <h3 className={`font-semibold ${level.titleColor}`} data-oid="-sqkyc9">{level.name}</h3>
            <div className="text-xs text-slate-600 dark:text-slate-400" data-oid="8vzm94u">{level.description}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2" data-oid="f.e-qj6">
          <ClientOnlyCount count={questionCount} data-oid="4j_q20f" />
          <button
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            disabled={isAnyCardFocused}
            onClick={(e) => {
              e.stopPropagation();
              onExpand(level.id);
            }} data-oid="ityhj:3">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'transform rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor" data-oid="pgq4if-">

              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" data-oid="lujoh1b" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Column content - simple preview of cards */}
      <div 
        className="p-3 max-h-[150px] relative overflow-hidden cursor-pointer" 
        data-oid="bphs8xr"
        onClick={(e) => {
          // When the container area is clicked (but not a card), open the popup
          if (!isAnyCardFocused && !isAnyPopupActive) {
            onOpenPopup(level.id, e);
          }
        }}>
        {/* Stacked card background - clickable to open popup */}
        <div 
          className="absolute inset-0 bg-transparent z-0" 
          onClick={(e) => {
            // Same behavior as the container
            e.stopPropagation();
            if (!isAnyCardFocused && !isAnyPopupActive) {
              onOpenPopup(level.id, e);
            }
          }}
        />
        
        {/* Stacked card preview */}
        <div 
          className="relative h-[120px]" 
          data-oid="s-:xkyb">
          {questions.slice(0, maxVisibleItems).map((question, index) =>
          <BoardCard
            key={question.id}
            question={question}
            index={index}
            maxVisibleItems={maxVisibleItems}
            onClick={() => {
              // First expand the column, then focus the card
              if (!isExpanded) {
                onExpand(level.id);
                setTimeout(() => onCardFocus(question.id), 300);
              } else {
                onCardFocus(question.id);
              }
            }} data-oid="6lb-_g5" />

          )}
          
          {/* More items indicator - ensure it doesn't block card clicks */}
          {questionCount > maxVisibleItems &&
          <div className="absolute bottom-0 left-0 right-0 text-center text-sm font-medium text-slate-600 dark:text-slate-400 py-1 pointer-events-none" data-oid="oh07yd_">
              + {questionCount - maxVisibleItems} more items
            </div>
          }
          
          {/* Empty state */}
          {questionCount === 0 &&
          <BoardEmptyState data-oid="ly7bo62" />
          }
        </div>
      </div>
    </div>);

}
