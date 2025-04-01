import { PracticeSet } from '@/lib/mockData';

// Interface for timeline view props
interface TimelineViewProps {
  practiceSets: PracticeSet[];
  onSelectSet?: (id: string) => void;
  selectedSetId?: string | null;
}

// Export all timeline view variant components
export { EnhancedTimelineView } from './EnhancedTimelineView';
export { TimelineViewTabs } from './TimelineViewTabs';

// Placeholder exports for variants mentioned in TimelineViewVariants.tsx
// These would be replaced with actual implementations as they are developed
export const VerticalScrollingTimeline = (props: TimelineViewProps) => null;
export const BranchingTimeline = (props: TimelineViewProps) => null;
export const CircularTimeline = (props: TimelineViewProps) => null;
export const ThreeDTimeline = (props: TimelineViewProps) => null;
export const StorytellingTimeline = (props: TimelineViewProps) => null;
export const InteractiveTimelineSlider = (props: TimelineViewProps) => null;
export const MetroTimeline = (props: TimelineViewProps) => null;
export const TimelineCalendar = (props: TimelineViewProps) => null;
export const AchievementTimeline = (props: TimelineViewProps) => null;
export const SubjectColorCodedTimeline = (props: TimelineViewProps) => null;
export const MinimalistTimeline = (props: TimelineViewProps) => null;
export const PhotoTimeline = (props: TimelineViewProps) => null;
export const ProgressPath = (props: TimelineViewProps) => null;
export const FlowDiagram = (props: TimelineViewProps) => null;
export const ComparisonTimeline = (props: TimelineViewProps) => null;
export const MilestoneTimeline = (props: TimelineViewProps) => null;
export const StreamGraph = (props: TimelineViewProps) => null;
