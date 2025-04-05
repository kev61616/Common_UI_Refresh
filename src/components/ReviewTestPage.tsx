'use client'

import React, { useState, useEffect } from 'react';
import { useReviewPageState, SavedReviewState } from '@/hooks/useReviewPageState';
import { ViewToggle } from './review/ViewToggle'; // Corrected path
import { FilterSection } from './review/FilterSection'; // Corrected path
import { ReviewContent } from './review/ReviewContent'; // Corrected path
import { AnalyticsSlidePanel } from './review/AnalyticsSlidePanel'; // Corrected path

// Define view types again locally if needed, or import from hook if exported
type ViewType = 'set' | 'timeline' | 'question';

interface ReviewTestPageProps {
  initialViewType?: ViewType;
  initialState?: SavedReviewState | null;
  onStateChange?: (state: SavedReviewState) => void;
}

export function ReviewTestPage({
  initialViewType = 'set',
  initialState = null,
  onStateChange
}: ReviewTestPageProps) {

  const {
    viewType,
    setViewType,
    selectedSetId,
    selectedSet, // Get the derived selected set from the hook
    isPanelOpen,
    // setIsPanelOpen, // Panel open state is managed internally by select/close handlers
    filters,
    setFilters, // Use the handler from the hook
    sortConfig,
    setSortConfig, // Use the handler from the hook
    filteredSets,
    handleSelectSet,
    handleClosePanel,
    handleClearFilters,
  } = useReviewPageState({ initialViewType, initialState, onStateChange });

  // State for scroll status to add visual effects to sticky header
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events to trigger sticky header effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust threshold as needed
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '76');
      setIsScrolled(scrollPosition > navHeight / 2); // Trigger effect earlier
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    // TODO: Use spacing scale
    <div className="pb-8 rounded-xl mx-auto max-w-6xl">
      {/* Sticky container for view toggles and filters */}
      <div
        className={`sticky top-0 z-40 transition-all duration-300 bg-gradient-to-r from-background to-background/90 dark:from-background dark:to-background/95 backdrop-filter ${
          isScrolled ? 'shadow-md dark:shadow-slate-800/30 backdrop-blur-sm' : ''
        }`}
        style={{ top: 'var(--navbar-height, 4.75rem)' }} // Use CSS variable for top position
      >
         {/* Use min-h to prevent layout shift */}
        <div className="pb-2 space-y-2 min-h-[8rem]">
          <ViewToggle currentView={viewType} onViewChange={setViewType} />
          <FilterSection
            initialFilters={filters}
            onFilterChange={setFilters} // Pass down the handler from the hook
            onClearFilters={handleClearFilters}
            onFiltersApplied={setFilters} // Apply filters directly on change for now
          />
        </div>
      </div>

      {/* Main content area */}
      <ReviewContent
        viewType={viewType}
        filteredSets={filteredSets}
        selectedSetId={selectedSetId}
        sortConfig={sortConfig}
        onSelectSet={handleSelectSet}
        onSortChange={setSortConfig} // Pass down the handler from the hook
      />

      {/* Analytics Panel */}
      <AnalyticsSlidePanel
        isOpen={isPanelOpen}
        selectedSet={selectedSet} // Pass the derived selected set object
        onClose={handleClosePanel}
      />
    </div>
  )
}
