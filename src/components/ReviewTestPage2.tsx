'use client'

import { useState, useEffect, Suspense } from 'react'
import { Button } from '@/components/Button'
import { mockPracticeSets, PracticeSet } from '@/lib/mockData'
import { CompactFilterBar } from '@/components/review/CompactFilterBar'
import { FilterBar } from '@/components/review/FilterBar'
import { AnalyticsPanel } from '@/components/review/AnalyticsPanel'

// Import our new modular architecture components
import ViewSelector from '@/components/review/ViewSelector'
import QuestionViewManager from '@/components/review/managers/QuestionViewManager'
import SetViewManager from '@/components/review/managers/SetViewManager'
import TimelineViewManager from '@/components/review/managers/TimelineViewManager'

// Import types
import { ViewType } from '@/components/review/ViewControls'

// Import and run view registrations
import { ensureSetViewsRegistered } from '@/components/review/set-view-variants/registerAllSetViews'
import { ensureQuestionViewsRegistered } from '@/components/review/question-view-variants/registerAllQuestionViews'
import { ensureTimelineViewsRegistered } from '@/components/review/timeline-view-variants/registerAllTimelineViews'

// Make sure all views are registered
ensureSetViewsRegistered()
ensureQuestionViewsRegistered()
ensureTimelineViewsRegistered()

/**
 * ReviewTestPage2 - Component for displaying and filtering practice sets
 * 
 * This updated version uses the new modular architecture with:
 * - Dynamic loading of view variants
 * - Code splitting for better performance
 * - Registry-based view management for extensibility
 * - Advanced UI for navigating the many view variants
 */
export function ReviewTestPage2() {
  // State for views, selected set, and panel visibility
  const [viewType, setViewType] = useState<ViewType>('list')
  const [setViewVariant, setSetViewVariant] = useState<number>(10)
  const [timelineViewVariant, setTimelineViewVariant] = useState<number>(1)
  const [questionViewVariant, setQuestionViewVariant] = useState<number>(1)
  const [filterBarVariant] = useState('compact') // Only use compact filter
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [filteredSets, setFilteredSets] = useState<PracticeSet[]>(mockPracticeSets)
  
  // Add ESC key listener for panel dismissal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPanelOpen) {
        handleClosePanel();
      }
    };
    
    // Add event listener when panel is open
    if (isPanelOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    // Clean up event listener when component unmounts or panel closes
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isPanelOpen]);
  
  // Filters state
  const [filters, setFilters] = useState<{
    subject: string[];
    type: string[];
    accuracyRange: [number, number];
    timeRange: [number, number];
    pace: string[];
    dateRange: [Date, Date];
  }>({
    subject: [],
    type: [],
    accuracyRange: [0, 100],
    timeRange: [0, 120], // In minutes
    pace: [],
    dateRange: [
      new Date(new Date().setMonth(new Date().getMonth() - 3)),
      new Date()
    ],
  })
  
  // Sort state
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({
    key: 'dateCompleted',
    direction: 'desc'
  })
  
  // Update filtered sets when filters or sort change
  useEffect(() => {
    let result = [...mockPracticeSets]
    
    // Apply filters
    if (filters.subject.length) {
      result = result.filter(set => filters.subject.includes(set.subject))
    }
    
    if (filters.type.length) {
      result = result.filter(set => filters.type.includes(set.type))
    }
    
    result = result.filter(set => 
      set.accuracy >= filters.accuracyRange[0] && 
      set.accuracy <= filters.accuracyRange[1]
    )
    
    const minTime = filters.timeRange[0] * 60 // Convert to seconds
    const maxTime = filters.timeRange[1] * 60
    result = result.filter(set => 
      set.timeUsed >= minTime && 
      set.timeUsed <= maxTime
    )
    
    if (filters.pace.length) {
      result = result.filter(set => filters.pace.includes(set.pace))
    }
    
    result = result.filter(set => 
      new Date(set.dateCompleted) >= filters.dateRange[0] && 
      new Date(set.dateCompleted) <= filters.dateRange[1]
    )
    
    // Apply sort
    result.sort((a: PracticeSet, b: PracticeSet) => {
      if (sortConfig.key === 'dateCompleted') {
        return sortConfig.direction === 'asc' 
          ? new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
          : new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()
      }
      
      if (sortConfig.key === 'accuracy') {
        return sortConfig.direction === 'asc' 
          ? a.accuracy - b.accuracy
          : b.accuracy - a.accuracy
      }
      
      if (sortConfig.key === 'timeUsed') {
        return sortConfig.direction === 'asc' 
          ? a.timeUsed - b.timeUsed
          : b.timeUsed - a.timeUsed
      }
      
      return 0
    })
    
    setFilteredSets(result)
  }, [filters, sortConfig])
  
  // Handle set selection and panel opening
  const handleSelectSet = (id: string) => {
    setSelectedSetId(id);
    setIsPanelOpen(true);
  }
  
  // Handle panel close
  const handleClosePanel = () => {
    setIsPanelOpen(false);
  }
  
  // Selected practice set
  const selectedSet = selectedSetId
    ? mockPracticeSets.find(set => set.id === selectedSetId)
    : null
  
  // Handle filter changes
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }
  
  // Handle sort changes
  const handleSortChange = (key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction })
  }
  
  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      subject: [],
      type: [],
      accuracyRange: [0, 100],
      timeRange: [0, 120],
      pace: [],
      dateRange: [
        new Date(new Date().setMonth(new Date().getMonth() - 3)),
        new Date()
      ],
    })
  }
  
  // Render the correct Set View based on selected variant
  const renderSetView = () => {
    return (
      <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center">Loading Set View...</div>}>
        <SetViewManager
          variant={setViewVariant}
          practiceSets={filteredSets}
          onSelectSet={handleSelectSet}
          selectedSetId={selectedSetId}
        />
      </Suspense>
    );
  }
  
  // Render the timeline view using the TimelineViewManager
  const renderTimelineView = () => {
    return (
      <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center">Loading Timeline View...</div>}>
        <TimelineViewManager
          variant={timelineViewVariant}
          practiceSets={filteredSets}
          onSelectSet={handleSelectSet}
          selectedSetId={selectedSetId}
        />
      </Suspense>
    );
  }
  
  // Render the question view using the QuestionViewManager
  const renderQuestionView = () => {
    return (
      <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center">Loading Question View...</div>}>
        <QuestionViewManager
          variant={questionViewVariant}
          practiceSets={filteredSets}
          onSelectSet={handleSelectSet}
          selectedSetId={selectedSetId}
        />
      </Suspense>
    );
  }
  
  // Render the main content based on view type
  const renderContent = () => {
    switch (viewType) {
      case 'list':
        return renderSetView();
      case 'timeline':
        return renderTimelineView();
      case 'question':
        return renderQuestionView();
      default:
        return <div>Select a view type</div>;
    }
  }
  
  // Render the filter bar
  const renderFilterBar = () => {
    if (filterBarVariant === 'compact') {
      return (
        <CompactFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          sortConfig={sortConfig}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />
      );
    } else { // 'full'
      return (
        <FilterBar 
          filters={filters}
          onFilterChange={handleFilterChange}
          sortConfig={sortConfig}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />
      );
    }
  }
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* View Type Controls */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setViewType('list')}
            className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${viewType === 'list' 
              ? 'bg-indigo-500 text-white border-indigo-600' 
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            By Set
          </button>
          <button
            type="button"
            onClick={() => setViewType('timeline')}
            className={`px-4 py-2 text-sm font-medium border-t border-b ${viewType === 'timeline' 
              ? 'bg-indigo-500 text-white border-indigo-600' 
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            Timeline
          </button>
          <button
            type="button"
            onClick={() => setViewType('question')}
            className={`px-4 py-2 text-sm font-medium border rounded-r-lg ${viewType === 'question' 
              ? 'bg-indigo-500 text-white border-indigo-600' 
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
          >
            By Question
          </button>
        </div>
      </div>
      
      {/* View Variant Selector */}
      {viewType === 'list' && (
        <ViewSelector 
          category="set"
          currentVariant={setViewVariant}
          onSelectVariant={setSetViewVariant}
        />
      )}
      
      {viewType === 'timeline' && (
        <ViewSelector 
          category="timeline"
          currentVariant={timelineViewVariant}
          onSelectVariant={setTimelineViewVariant}
        />
      )}
      
      {viewType === 'question' && (
        <ViewSelector 
          category="question"
          currentVariant={questionViewVariant}
          onSelectVariant={setQuestionViewVariant}
        />
      )}
      
      {/* Filter Bar */}
      {renderFilterBar()}
      
      {/* Main Content */}
      <div className="mt-6">
        {renderContent()}
      </div>
      
      {/* Analytics Panel */}
      {isPanelOpen && selectedSet && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-xl overflow-auto animate-slide-in-right">
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center z-10">
              <h3 className="text-lg font-bold">Set Details</h3>
              <Button variant="secondary" onClick={handleClosePanel}>Close</Button>
            </div>
            <div className="p-4">
              <AnalyticsPanel practiceSet={selectedSet} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
