'use client'

import { useState, useEffect } from 'react'
// Removed incorrect Button import
import { Button as CatalystButton } from '@/components/catalyst/button' // Use Catalyst Button
import { mockPracticeSets, PracticeSet } from '@/lib/mockData'
import { SetViewTable } from '@/components/review/SetViewTable'
import { TimelineView } from '@/components/review/TimelineView'
import { ModularFilterBar } from '@/components/review/filters/ModularFilterBar'
import { AnalyticsPanel } from '@/components/review/AnalyticsPanel'
import { QuestionViewTabs } from '@/components/review/question-view-variants/QuestionViewTabs'
import { SimpleQuestionView } from '@/components/review/question-view-variants/SimpleQuestionView'
import { CollapsibleKanbanView } from '@/components/review/question-view-variants/CollapsibleKanbanView'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { LayoutList, HelpCircle, KanbanSquare, Filter, X } from 'lucide-react' // Use Lucide icons

// Add debug logging to ReviewPage
console.log('ReviewPage component loaded');

// Flag to directly use simple question view to bypass issues with the more complex view
const USE_SIMPLE_QUESTION_VIEW = false;

// Define view types
type ViewType = 'set' | 'question' | 'kanban'

// State interface that will be saved
export interface SavedReviewState {
  viewType: ViewType;
  selectedSetId: string | null;
  filters: {
    subject: string[];
    type: string[];
    accuracyRange: [number, number];
    timeRange: [number, number];
    pace: string[];
    dateRange: [Date, Date];
    dates: string[];
  };
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
}

interface ReviewPageProps {
  initialViewType?: ViewType;
  initialState?: SavedReviewState | null;
  onStateChange?: (state: SavedReviewState) => void;
}

/**
 * ReviewPage - Production-ready review page component
 * 
 * Features:
 * - Completely standalone implementation (no variant system dependencies)
 * - Uses SetViewTable component for the list view
 * - Enhanced UX with responsive design
 * - Full filtering and sorting capabilities
 */
export function ReviewPage({ 
  initialViewType = 'set',
  initialState = null,
  onStateChange
}: ReviewPageProps) {
  
  // State for views, selected set, and panel visibility
  const [viewType, setViewType] = useState<ViewType>(
    initialState?.viewType || initialViewType
  )
  const [selectedSetId, setSelectedSetId] = useState<string | null>(
    initialState?.selectedSetId || null
  )
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
    dates: string[];
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
    dates: [], // New date filter property
  })
  
  // Sort state
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({
    key: 'dateCompleted',
    direction: 'desc'
  })
  
  // Convert text date filter to actual date range
  const getDateRangeFromText = (dateText: string): [Date, Date] => {
    const now = new Date();
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    
    switch (dateText) {
      case 'Last 7 days':
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        return [sevenDaysAgo, todayEnd];
        
      case 'Last 30 days':
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);
        return [thirtyDaysAgo, todayEnd];
        
      case 'This month':
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return [firstDayOfMonth, todayEnd];
        
      case 'Last month':
        const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
        return [firstDayOfLastMonth, lastDayOfLastMonth];
        
      case 'This year':
        const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
        return [firstDayOfYear, todayEnd];
        
      default:
        return [
          new Date(new Date().setMonth(new Date().getMonth() - 3)),
          todayEnd
        ];
    }
  };

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

    // Handle text-based date filters first
    if (filters.dates && filters.dates.length > 0) {
      // For each date filter (e.g. "Last 7 days"), calculate a date range
      // and check if the item falls within ANY of the selected ranges
      result = result.filter(set => {
        const setDate = new Date(set.dateCompleted);
        
        // Item passes if it matches ANY of the selected date filters
        return filters.dates.some(dateText => {
          const [startDate, endDate] = getDateRangeFromText(dateText);
          return setDate >= startDate && setDate <= endDate;
        });
      });
    } else {
      // If no text-based dates selected, fall back to the dateRange filter
      result = result.filter(set => 
        new Date(set.dateCompleted) >= filters.dateRange[0] && 
        new Date(set.dateCompleted) <= filters.dateRange[1]
      );
    }
    
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
    setFilters(newFilters);
  }
  
  // Handle sort changes
  const handleSortChange = (key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction });
  }
  
  // Handle applying filters to the view
  const handleApplyFilters = (newFilters: typeof filters) => {
    // Update state and ensure re-render with filtered results
    setFilters(prev => {
      // Force a new object reference to ensure the useEffect triggers
      return { ...newFilters };
    });
  }
  
  // Clear all filters and reset to default state
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
      dates: [],
    });
    // Reset to default sort
    setSortConfig({
      key: 'dateCompleted',
      direction: 'desc'
    });
    // Force a re-render of filtered sets with all mock data
    setFilteredSets([...mockPracticeSets]);
  }
  
  // State for scroll status to add visual effects to sticky header
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State for mobile filter visibility
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Handle scroll events to trigger sticky header effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Save state when key components change
  useEffect(() => {
    if (onStateChange) {
      // Create state object to save
      const stateToSave: SavedReviewState = {
        viewType,
        selectedSetId,
        filters,
        sortConfig
      };
      
      // Save to parent component
      onStateChange(stateToSave);
    }
  }, [viewType, selectedSetId, filters, sortConfig, onStateChange]);
  
  // Load initial filters from saved state, if provided
  useEffect(() => {
    if (initialState?.filters) {
      setFilters(initialState.filters);
    }
    
    if (initialState?.sortConfig) {
      setSortConfig(initialState.sortConfig);
    }
  }, [initialState]);

  return (
    <div className="pb-8 rounded-xl mx-auto max-w-6xl">
      {/* Sticky container for view toggles and filters */}
      <div 
        className={`sticky top-0 z-40 transition-all duration-300 bg-gradient-to-r from-white to-white/90 dark:from-slate-900 dark:to-slate-900/95 backdrop-filter ${
          isScrolled ? 'shadow-md dark:shadow-slate-800/30 backdrop-blur-sm' : ''
        }`}
        style={{ top: 'var(--navbar-height, 4.75rem)' }}
      >
        <div className="pb-0 space-y-2 min-h-[8rem]">
          {/* View toggle - Keep button implementation, update icons and styles */}
          <div className="flex flex-wrap gap-2 md:gap-3 pb-0 px-1">
            <button
              onClick={() => setViewType('set')}
              className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 font-medium text-sm md:text-base transition-all duration-200 rounded-md ${
                viewType === 'set'
                  ? 'bg-primary/10 text-primary shadow-sm' // Use semantic colors
                  : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <LayoutList className="size-4 md:size-5 mr-1.5" /> {/* Use Lucide icon */}
              <span className="hidden sm:inline">Set View</span>
              <span className="sm:hidden">Sets</span>
            </button>
            <button
              onClick={() => setViewType('question')}
              className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 font-medium text-sm md:text-base transition-all duration-200 rounded-md ${
                viewType === 'question'
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <HelpCircle className="size-4 md:size-5 mr-1.5" /> {/* Use Lucide icon */}
              <span className="hidden sm:inline">Question View</span>
              <span className="sm:hidden">Questions</span>
            </button>
            <button
              onClick={() => setViewType('kanban')}
              className={`flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 font-medium text-sm md:text-base transition-all duration-200 rounded-md ${
                viewType === 'kanban'
                  ? 'bg-primary/10 text-primary shadow-sm'
                  : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <KanbanSquare className="size-4 md:size-5 mr-1.5" /> {/* Use Lucide icon */}
              <span className="hidden sm:inline">Kanban View</span>
              <span className="sm:hidden">Kanban</span>
            </button>

            {/* Mobile filter toggle - Use Catalyst Button */}
            <div className="flex-grow flex justify-end md:hidden">
              <CatalystButton
                outline
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="text-sm" // Adjust size via class
              >
                <Filter className="size-4" /> {/* Use Lucide icon */}
                <span className="ml-2">Filters</span>
                {Object.values(filters).some(val =>
                  Array.isArray(val) && val.length > 0 ||
                  (val as any)[0] !== 0 ||
                  (val as any)[1] !== 100 && (val as any)[1] !== 120
                ) && (
                  <span className="ml-1 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full"> {/* Use semantic colors */}
                    {/* Count active filters */}
                    {(filters.subject.length > 0 ? 1 : 0) +
                     (filters.type.length > 0 ? 1 : 0) +
                     (filters.dates.length > 0 ? 1 : 0) +
                     (filters.accuracyRange[0] > 0 || filters.accuracyRange[1] < 100 ? 1 : 0) +
                     (filters.timeRange[0] > 0 || filters.timeRange[1] < 120 ? 1 : 0)}
                  </span>
                )}
              </CatalystButton>
            </div>
          </div>
          
          {/* Filter bar - desktop visible, mobile conditionally visible */}
          <div className={`${showMobileFilters ? 'block' : 'hidden md:block'} px-1`}>
            <div className="mb-0">
              <ModularFilterBar
                initialFilters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onFiltersApplied={handleApplyFilters}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content area with spacing for sticky header */}
      <div className="mt-4 w-full">
        {/* Use ErrorBoundary to catch and display errors */}
        {viewType === 'set' ? (
          <SetViewTable 
            practiceSets={filteredSets}
            onSelectSet={handleSelectSet}
            selectedSetId={selectedSetId}
          />
        ) : viewType === 'kanban' ? (
          <ErrorBoundary>
            <CollapsibleKanbanView
              practiceSets={filteredSets}
              onSelectSet={handleSelectSet}
              selectedSetId={selectedSetId}
              sortConfig={sortConfig}
              onSortChange={handleSortChange}
            />
          </ErrorBoundary>
        ) : (
          <ErrorBoundary>
            <QuestionViewTabs
              practiceSets={filteredSets}
              onSelectSet={handleSelectSet}
              selectedSetId={selectedSetId}
              sortConfig={sortConfig}
              onSortChange={handleSortChange}
            />
          </ErrorBoundary>
        )}
      </div>
      
      {/* Analytics Panel - Slide-in panel from right */}
      <div 
        className={`fixed top-0 right-0 h-screen w-[800px] max-w-[90vw] bg-white transform transition-all duration-300 ease-in-out z-50 overflow-hidden
                   dark:bg-slate-800/95 ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ 
          top: 'var(--navbar-height, 4.75rem)', 
          height: 'calc(100vh - var(--navbar-height, 4.75rem))',
          borderLeft: '1px solid rgba(148, 163, 184, 0.1)',
          borderTopLeftRadius: '16px',
          borderBottomLeftRadius: '16px',
          boxShadow: isPanelOpen ? '-8px 0 30px rgba(15, 23, 42, 0.08), -1px 0 10px rgba(15, 23, 42, 0.03), inset 1px 0 0 rgba(255, 255, 255, 0.3)' : 'none'
        }}
      >
        {/* Panel edge decoration - vertical gradient line */}
        <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-sky-500 via-indigo-500 to-purple-500 opacity-80"></div>
        
        {/* Edge-aligned close button */}
        <button 
          onClick={handleClosePanel}
          className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-24 flex items-center justify-center rounded-l-xl bg-white text-slate-600 hover:text-sky-600 transition-colors z-10 shadow-md border border-slate-200
                   dark:bg-slate-700 dark:text-slate-300 dark:hover:text-sky-400 dark:border-slate-600"
          aria-label="Close panel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Actual panel content */}
        <div className="h-full overflow-y-auto">
          {selectedSet && <AnalyticsPanel practiceSet={selectedSet} />}
        </div>
      </div>
      
      {/* Invisible overlay to capture clicks outside panel without darkening the background */}
      {isPanelOpen && (
        <div 
          className="fixed inset-0 z-40 cursor-pointer"
          onClick={handleClosePanel}
        ></div>
      )}
    </div>
  )
}
