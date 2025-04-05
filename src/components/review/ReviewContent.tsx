'use client'

import React from 'react';
import { PracticeSet } from '@/lib/mockData';
import { SetView } from '@/components/review/SetView'; // Assuming this exists
import { TimelineInspiredListView } from '@/components/review/timeline-view-variants/TimelineInspiredListView'; // Example timeline view
import { ModifiedStorytellingTimeline } from '@/components/review/timeline-view-variants/ModifiedStorytellingTimeline'; // Example timeline view
import { QuestionViewTabs } from '@/components/review/question-view-variants/QuestionViewTabs'; // Assuming this exists
import { SortConfig } from '@/hooks/useReviewPageState'; // Import type from hook

type ViewType = 'set' | 'timeline' | 'question';

interface ReviewContentProps {
  viewType: ViewType;
  filteredSets: PracticeSet[];
  selectedSetId: string | null;
  sortConfig: SortConfig;
  onSelectSet: (id: string) => void;
  onSortChange: (key: string, direction: 'asc' | 'desc') => void;
}

export function ReviewContent({
  viewType,
  filteredSets,
  selectedSetId,
  sortConfig,
  onSelectSet,
  onSortChange,
}: ReviewContentProps) {

  // TODO: Implement logic to select *which* timeline or question view variant to show,
  // potentially based on user preference or other state.
  // For now, defaulting to specific examples.
  const TimelineComponent = ModifiedStorytellingTimeline; // Or TimelineInspiredListView, etc.
  const QuestionComponent = QuestionViewTabs;

  return (
    // Use spacing scale mt-4
    <div className="mt-4 w-full">
      {viewType === 'set' ? (
        <SetView
          practiceSets={filteredSets}
          onSelectSet={onSelectSet}
          selectedSetId={selectedSetId}
          // Assuming SetView doesn't need sort props, add if necessary
        />
      ) : viewType === 'timeline' ? (
        <TimelineComponent
          practiceSets={filteredSets}
          onSelectSet={onSelectSet}
          selectedSetId={selectedSetId}
          sortConfig={sortConfig}
          onSortChange={onSortChange}
        />
      ) : ( // viewType === 'question'
        <QuestionComponent
          practiceSets={filteredSets} // Assuming QuestionViewTabs needs sets
          onSelectSet={onSelectSet} // Pass selection handler if needed
          selectedSetId={selectedSetId} // Pass selected ID if needed
          sortConfig={sortConfig} // Pass sort config if needed
          onSortChange={onSortChange} // Pass sort handler if needed
        />
      )}
    </div>
  );
}
