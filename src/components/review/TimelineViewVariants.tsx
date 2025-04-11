'use client';

import { PracticeSet } from '@/lib/mockData';
import { TimelineView, TimelineViewTabs, EnhancedTimelineView, CalendarTimelineView } from './timeline-view';
import { TimelineView2 } from './TimelineView2';
import { TimelineView3 } from './TimelineView3';
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
  StreamGraph } from
'./timeline-view-variants';

// Type for the variant prop
export type TimelineViewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22;

interface TimelineViewVariantsProps {
  variant: TimelineViewVariant;
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
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
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="6x46sq7">
          <h3 className="text-xl font-bold mb-6 text-center" data-oid="ly3ebmc">1. Standard Timeline View</h3>
          <TimelineView {...commonProps} data-oid="9.1:0b0" />
        </div>);

    case 2:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="fzpy00m">
          <h3 className="text-xl font-bold mb-6 text-center" data-oid="wxzw0sm">2. Compact Timeline View</h3>
          <TimelineView2 {...commonProps} data-oid="7ao3pu4" />
        </div>);

    case 3:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="03omeoy">
          <h3 className="text-xl font-bold mb-6 text-center" data-oid="npz:ifa">3. Calendar Timeline View</h3>
          <CalendarTimelineView {...commonProps} data-oid="lt6sudh" />
        </div>);

    case 4:
      return <VerticalScrollingTimeline {...commonProps} data-oid="2252k4-" />;
    case 5:
      return <BranchingTimeline {...commonProps} data-oid="bk9.a:o" />;
    case 6:
      return <CircularTimeline {...commonProps} data-oid="tkgbxi:" />;
    case 7:
      return <ThreeDTimeline {...commonProps} data-oid="s:hq8fz" />;
    case 8:
      return <StorytellingTimeline {...commonProps} data-oid="v2iwrh4" />;
    case 9:
      return <InteractiveTimelineSlider {...commonProps} data-oid="7i1_so7" />;
    case 10:
      return <MetroTimeline {...commonProps} data-oid="y.qroi:" />;
    case 11:
      return <TimelineCalendar {...commonProps} data-oid=".fg9gfl" />;
    case 12:
      return <AchievementTimeline {...commonProps} data-oid="nv5ckn1" />;
    case 13:
      return <SubjectColorCodedTimeline {...commonProps} data-oid="9ugvt7c" />;
    case 14:
      return <MinimalistTimeline {...commonProps} data-oid="q.jk-4o" />;
    case 15:
      return <PhotoTimeline {...commonProps} data-oid="pud25g2" />;
    case 16:
      return <ProgressPath {...commonProps} data-oid="pi.taqv" />;
    case 17:
      return <FlowDiagram {...commonProps} data-oid="uv.uk.i" />;
    case 18:
      return <ComparisonTimeline {...commonProps} data-oid="pon2pj1" />;
    case 19:
      return <MilestoneTimeline {...commonProps} data-oid="wetjjvd" />;
    case 20:
      return <StreamGraph {...commonProps} data-oid="tak7sl8" />;
    case 21:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid=":giffe9">
          <h3 className="text-xl font-bold mb-6 text-center" data-oid="60s4y6o">21. Enhanced Timeline View</h3>
          <EnhancedTimelineView {...commonProps} data-oid="qz5pi-h" />
        </div>);

    case 22:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="t.jyroa">
          <h3 className="text-xl font-bold mb-6 text-center" data-oid="oc_y1jm">22. Timeline View with Tabs</h3>
          <TimelineViewTabs {...commonProps} data-oid="s4xpk7f" />
        </div>);

    default:
      return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="tjirvzp">
          <h3 className="text-xl font-bold mb-6 text-center" data-oid="w9yd7m1">Timeline View {variant}</h3>
          <div className="min-h-[500px] flex justify-center items-center" data-oid="h7n-1p8">
            <div className="text-center p-8" data-oid="3.:c7ye">
              <p className="text-lg font-medium mb-4" data-oid="s4dovai">Timeline View {variant} Implementation</p>
            </div>
          </div>
        </div>);

  }
}