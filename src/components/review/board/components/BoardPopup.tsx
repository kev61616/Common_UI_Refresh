'use client'

import React from 'react'
import { Question } from '@/lib/mockData'
import { CompactFilterBar } from '@/components/common/CompactFilterBar'
import { getSubjectColor } from '../utils/boardUtils'
// Removed MasteryIcons import
import {
  XCircle,
  AlertCircle,
  CircleDashed,
  SignalMedium,
  CheckCircle,
  CheckCheck,
  X, // Import X for close button
  ClipboardList // Import for empty state
} from 'lucide-react' // Use Lucide icons
import { Button } from '@/components/catalyst/button' // Use Catalyst Button
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { Badge } from '@/components/catalyst/badge' // Use Catalyst Badge

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
    const iconProps = { size: size, color: "white" }; // Define common props
    switch(levelId) {
      case 'very-weak': return <XCircle {...iconProps} />;
      case 'weak': return <AlertCircle {...iconProps} />;
      case 'not-attempted': return <CircleDashed {...iconProps} />;
      case 'emerging': return <SignalMedium {...iconProps} />;
      case 'proficient': return <CheckCircle {...iconProps} />;
      case 'mastered': return <CheckCheck {...iconProps} />;
      default: return null;
    }
  };

  // Find the active category level data
  const activeLevel = masteryLevels.find(level => level.id === activePopupId);
  if (!activeLevel) return null; // Should not happen if activePopupId is valid

  // Filter and sort questions for the active level
  const filteredAndSortedQuestions = (questionsByLevel[activeLevel.id] || [])
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
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (popupSortField) {
        case 'topic': comparison = a.topic.localeCompare(b.topic); break;
        case 'difficulty': comparison = a.difficulty.localeCompare(b.difficulty); break;
        case 'subject': comparison = a.setSubject.localeCompare(b.setSubject); break;
        default: comparison = a.topic.localeCompare(b.topic);
      }
      return popupSortDirection === 'asc' ? comparison : -comparison;
    });

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
        className={`bg-card text-card-foreground rounded-2xl shadow-2xl w-full max-w-[80%] max-h-[85vh] overflow-hidden relative transition-all duration-500 ${
          isPopupVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{
          transformOrigin: isPopupVisible ? 'center' : `${popupOrigin.x}px ${popupOrigin.y}px`,
          transform: isPopupVisible
            ? 'scale(1) translate(0, 0)'
            : `scale(0.5) translate(${(typeof window !== 'undefined' ? window.innerWidth/2 - popupOrigin.x : 0) * -1}px, ${(typeof window !== 'undefined' ? window.innerHeight/2 - popupOrigin.y : 0) * -1}px)` // Added window check
        }}
      >
        {/* Use a single div for the content structure */}
        <div className="flex flex-col h-full">
          {/* Popup header */}
          <div className={`${activeLevel.headerBg} ${activeLevel.color} p-6 border-b ${activeLevel.borderColor}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className={`${activeLevel.iconBg} text-white p-3 rounded-xl`}>
                  {getLevelIcon(activeLevel.id)}
                </div>
                <div>
                  {/* Use Catalyst Heading and Text */}
                  <Heading level={2} className={`text-2xl font-bold ${activeLevel.titleColor}`}>{activeLevel.name}</Heading>
                  <Text className="text-sm text-slate-600 dark:text-slate-400">{activeLevel.description}</Text>
                </div>
              </div>
              {/* Use Catalyst Button */}
              <Button plain onClick={closePopup} aria-label="Close popup">
                <X className="size-6 text-muted-foreground" />
              </Button>
            </div>
          </div>

          {/* Popup content */}
          <div className="p-6 overflow-y-auto flex-grow" style={{ maxHeight: 'calc(85vh - 100px - 68px)' }}> {/* Adjusted maxHeight for footer */}
            {/* Add filter bar for popup content */}
            <CompactFilterBar
              activeFilters={popupFilters}
              onFilterChange={handlePopupFilterChange}
              sortField={popupSortField}
              sortDirection={popupSortDirection}
              onSortChange={handlePopupSortChange}
            />

            <div className="mb-6 mt-4">
              {/* Use Catalyst Heading and Text */}
              <Heading level={3} className="text-lg font-semibold mb-2 dark:text-white">Questions in this category</Heading>
              <Text className="text-sm text-muted-foreground">
                {filteredAndSortedQuestions.length > 0
                  ? `${filteredAndSortedQuestions.length} questions require your attention`
                  : "No questions in this category"}
              </Text>
            </div>

            {/* Questions grid - with filtered and sorted results */}
            {filteredAndSortedQuestions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAndSortedQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="bg-white dark:bg-slate-900/50 p-4 rounded-lg border border-border shadow-sm hover:shadow transition-shadow cursor-pointer" // Added cursor-pointer
                    onClick={() => onSelectSet && onSelectSet(question.setId)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${getSubjectColor(question.setSubject)}`}></div>
                      <Text className="text-xs font-medium text-muted-foreground">{question.setSubject}</Text>
                    </div>

                    <Text className="font-medium text-sm mb-2 text-foreground">{question.topic}</Text>
                    <Text className="text-xs text-muted-foreground mb-3">{question.subtopic}</Text>

                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {/* Use Catalyst Badge */}
                      <Badge
                        color={question.difficulty === 'Easy' ? 'green' : question.difficulty === 'Medium' ? 'amber' : 'red'}
                        className="text-xs"
                      >
                        {question.difficulty}
                      </Badge>

                      {/* Use Catalyst Button */}
                      <Button
                        outline
                        // Remove size prop, rely on className
                        className="!text-xs !py-1 !px-3" // Force small size
                        onClick={(e: React.MouseEvent) => { // Add type to event
                          e.stopPropagation();
                          if (onSelectSet) onSelectSet(question.setId);
                          closePopup();
                        }}
                      >
                        Practice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty state
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-slate-400 dark:text-slate-500 mb-4">
                  {/* Use Lucide icon */}
                  <ClipboardList className="size-16" strokeWidth={1} />
                </div>
                <Heading level={4} className="text-lg font-medium mb-2 dark:text-white">No questions match filters</Heading>
                <Text className="text-sm text-muted-foreground max-w-md">
                  Try adjusting the filters above or practice more to populate this category.
                </Text>
              </div>
            )}
          </div>

          {/* Popup footer */}
          <div className="p-4 border-t border-border bg-background/50 dark:bg-slate-800/50">
            <div className="flex justify-end">
              {/* Use Catalyst Button */}
              <Button outline onClick={closePopup}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
