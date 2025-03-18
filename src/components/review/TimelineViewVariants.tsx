'use client'

import { PracticeSet } from '@/lib/mockData'
import { TimelineView } from './TimelineView'
import { TimelineView2 } from './TimelineView2'
import { TimelineView3 } from './TimelineView3'
import { 
  VerticalScrollingTimeline,
  BranchingTimeline,
  CircularTimeline,
  ThreeDTimeline,
  StorytellingTimeline,
  InteractiveTimelineSlider,
  MetroTimeline,
  TimelineCalendar,
  AchievementTimeline,
  SubjectColorCodedTimeline,
  MinimalistTimeline,
  PhotoTimeline,
  ProgressPath,
  FlowDiagram,
  ComparisonTimeline,
  MilestoneTimeline,
  StreamGraph
} from './timeline-view-variants'

// Type for the variant prop
export type TimelineViewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20

interface TimelineViewVariantsProps {
  variant: TimelineViewVariant
  practiceSets: PracticeSet[]
  onSelectSet: (id: string) => void
  selectedSetId: string | null
}

/**
 * TimelineViewVariants - Component that renders the appropriate timeline view based on the variant prop
 */
export function TimelineViewVariants({ variant, practiceSets, onSelectSet, selectedSetId }: TimelineViewVariantsProps) {
  const commonProps = {
    practiceSets,
    onSelectSet,
    selectedSetId
  };

  // Render the correct component based on the variant number
  switch (variant) {
    case 1:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-center">1. Standard Timeline View</h3>
          <TimelineView {...commonProps} />
        </div>
      );
    case 2:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-center">2. Compact Timeline View</h3>
          <TimelineView2 {...commonProps} />
        </div>
      );
    case 3:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-center">3. Detailed Timeline View</h3>
          <TimelineView3 {...commonProps} />
        </div>
      );
    case 4:
      return <VerticalScrollingTimeline {...commonProps} />;
    case 5:
      return <BranchingTimeline {...commonProps} />;
    case 6:
      return <CircularTimeline {...commonProps} />;
    case 7:
      return <ThreeDTimeline {...commonProps} />;
    case 8:
      return <StorytellingTimeline {...commonProps} />;
    case 9:
      return <InteractiveTimelineSlider {...commonProps} />;
    case 10:
      return <MetroTimeline {...commonProps} />;
    case 11:
      return <TimelineCalendar {...commonProps} />;
    case 12:
      return <AchievementTimeline {...commonProps} />;
    case 13:
      return <SubjectColorCodedTimeline {...commonProps} />;
    case 14:
      return <MinimalistTimeline {...commonProps} />;
    case 15:
      return <PhotoTimeline {...commonProps} />;
    case 16:
      return <ProgressPath {...commonProps} />;
    case 17:
      return <FlowDiagram {...commonProps} />;
    case 18:
      return <ComparisonTimeline {...commonProps} />;
    case 19:
      return <MilestoneTimeline {...commonProps} />;
    case 20:
      return <StreamGraph {...commonProps} />;
    default:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-center">Timeline View {variant}</h3>
          <div className="min-h-[500px] flex justify-center items-center">
            <div className="text-center p-8">
              <p className="text-lg font-medium mb-4">Timeline View {variant} Implementation</p>
            </div>
          </div>
        </div>
      );
  }
}
