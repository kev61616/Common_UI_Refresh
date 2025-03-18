'use client'

// Import interface
import { TimelineViewProps } from './types';

/*
 * Timeline View Variants
 *
 * Note on view organization:
 * - Views 1-10 are fully implemented, unique visualizations
 * - We've consolidated some redundant concepts to avoid duplication:
 *   - MetroTimeline (10) replaces SubwayMapTimeline concept
 *   - CircularTimeline (6) includes bubble visualization concepts
 *   - VerticalScrollingTimeline (4) fulfills similar purpose to historical timeline
 */

// Import and re-export individual timeline view components
export { VerticalScrollingTimeline } from './VerticalScrollingTimeline';
export { BranchingTimeline } from './BranchingTimeline';
export { CircularTimeline } from './CircularTimeline';
export { ThreeDTimeline } from './ThreeDTimeline';
export { StorytellingTimeline } from './StorytellingTimeline';
export { InteractiveTimelineSlider } from './InteractiveTimelineSlider';
export { MetroTimeline } from './MetroTimeline';
export { TimelineCalendar } from './TimelineCalendar';
export { AchievementTimeline } from './AchievementTimeline';

// Create placeholder components for the remaining, distinctive timeline concepts
// These can be implemented later with more detailed functionality

export { SubjectColorCodedTimeline } from './SubjectColorCodedTimeline';

// Note: Removed SubwayMapTimeline (14) as it's redundant with MetroTimeline (10)
export { MinimalistTimeline } from './MinimalistTimeline';

// Note: Removed HistoricalTimeline (15) as it's redundant with VerticalScrollingTimeline (4)
export { PhotoTimeline } from './PhotoTimeline';

// Note: Removed BubbleTimeline (17) as it's redundant with CircularTimeline (6)
export { ProgressPath } from './ProgressPath';

export { FlowDiagram } from './FlowDiagram';

// These placeholders complete the set of 20 timeline views
export { ComparisonTimeline } from './ComparisonTimeline';

export { MilestoneTimeline } from './MilestoneTimeline';

export { StreamGraph } from './StreamGraph';

// Helper function for rendering placeholder timeline views
function renderPlaceholder(props: TimelineViewProps, title: string, description: string) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">{title}</h3>
      <div className="min-h-[500px] flex justify-center items-center">
        <div className="text-center p-8 max-w-xl">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg mb-8">
            <div className="text-lg font-bold text-indigo-700 dark:text-indigo-300 mb-2">
              {title}
            </div>
            <p className="text-indigo-600 dark:text-indigo-400 text-sm">
              {description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {props.practiceSets.slice(0, 4).map(set => (
              <div 
                key={set.id}
                onClick={() => props.onSelectSet(set.id)} 
                className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="font-medium">{set.subject}: {set.type}</div>
                <div className="flex justify-between mt-2">
                  <div className="text-sm">{set.accuracy}% accuracy</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
