'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { mockPracticeSets, PracticeSet } from '@/lib/mockData'

// Define view types
type ViewType = 'set' | 'timeline' | 'question'

// State interface that will be saved/loaded
export interface SavedReviewState {
  viewType: ViewType;
  selectedSetId: string | null;
  filters: ReviewFilters;
  sortConfig: SortConfig;
}

// Define filter and sort types
export interface ReviewFilters {
  subject: string[];
  type: string[];
  accuracyRange: [number, number];
  timeRange: [number, number]; // In minutes
  pace: string[];
  dateRange: [Date, Date]; // Fallback if dates array is empty
  dates: string[]; // Text-based date filters like "Last 7 days"
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

// Helper to get date range from text
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
      default: // Default to last 3 months if needed
        const threeMonthsAgo = new Date(now);
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        return [threeMonthsAgo, todayEnd];
    }
};

const defaultFilters: ReviewFilters = {
    subject: [],
    type: [],
    accuracyRange: [0, 100],
    timeRange: [0, 120], // In minutes
    pace: [],
    dateRange: [
      new Date(new Date().setMonth(new Date().getMonth() - 3)), // Default: last 3 months
      new Date()
    ],
    dates: [],
};

const defaultSortConfig: SortConfig = {
    key: 'dateCompleted',
    direction: 'desc'
};

interface UseReviewPageStateProps {
  initialViewType?: ViewType;
  initialState?: SavedReviewState | null;
  onStateChange?: (state: SavedReviewState) => void;
}

export function useReviewPageState({
  initialViewType = 'set',
  initialState = null,
  onStateChange
}: UseReviewPageStateProps) {

  const [viewType, setViewType] = useState<ViewType>(
    initialState?.viewType || initialViewType
  );
  const [selectedSetId, setSelectedSetId] = useState<string | null>(
    initialState?.selectedSetId || null
  );
  const [isPanelOpen, setIsPanelOpen] = useState(!!initialState?.selectedSetId); // Open if initial state has selection
  const [filters, setFilters] = useState<ReviewFilters>(
    initialState?.filters || defaultFilters
  );
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    initialState?.sortConfig || defaultSortConfig
  );

  // Memoize filtered and sorted sets
  const filteredAndSortedSets = useMemo(() => {
    let result = [...mockPracticeSets];

    // Apply filters
    if (filters.subject.length) {
      result = result.filter(set => filters.subject.includes(set.subject));
    }
    if (filters.type.length) {
      result = result.filter(set => filters.type.includes(set.type));
    }
    result = result.filter(set =>
      set.accuracy >= filters.accuracyRange[0] &&
      set.accuracy <= filters.accuracyRange[1]
    );
    const minTime = filters.timeRange[0] * 60; // Convert to seconds
    const maxTime = filters.timeRange[1] * 60;
    result = result.filter(set =>
      set.timeUsed >= minTime &&
      set.timeUsed <= maxTime
    );
    if (filters.pace.length) {
      result = result.filter(set => filters.pace.includes(set.pace));
    }
    if (filters.dates && filters.dates.length > 0) {
      result = result.filter(set => {
        const setDate = new Date(set.dateCompleted);
        return filters.dates.some(dateText => {
          const [startDate, endDate] = getDateRangeFromText(dateText);
          return setDate >= startDate && setDate <= endDate;
        });
      });
    } else {
      // Fallback to dateRange if dates array is empty
      result = result.filter(set =>
        new Date(set.dateCompleted) >= filters.dateRange[0] &&
        new Date(set.dateCompleted) <= filters.dateRange[1]
      );
    }

    // Apply sort
    result.sort((a: PracticeSet, b: PracticeSet) => {
      let compareA: any = a[sortConfig.key as keyof PracticeSet];
      let compareB: any = b[sortConfig.key as keyof PracticeSet];

      if (sortConfig.key === 'dateCompleted') {
        compareA = new Date(compareA).getTime();
        compareB = new Date(compareB).getTime();
      }

      if (compareA < compareB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (compareA > compareB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return result;
  }, [filters, sortConfig]);

  // Handlers
  const handleSelectSet = useCallback((id: string) => {
    setSelectedSetId(id);
    setIsPanelOpen(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    // Optionally reset selectedSetId when panel closes
    // setSelectedSetId(null);
  }, []);

  const handleFilterChange = useCallback((newFilters: ReviewFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((key: string, direction: 'asc' | 'desc') => {
    setSortConfig({ key, direction });
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(defaultFilters);
    setSortConfig(defaultSortConfig);
  }, []);

  // Effect to call onStateChange when relevant state updates
  useEffect(() => {
    if (onStateChange) {
      const stateToSave: SavedReviewState = {
        viewType,
        selectedSetId,
        filters,
        sortConfig
      };
      onStateChange(stateToSave);
    }
  }, [viewType, selectedSetId, filters, sortConfig, onStateChange]);

   // Effect to handle panel closing via ESC key
   useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isPanelOpen) {
        handleClosePanel();
      }
    };
    if (isPanelOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isPanelOpen, handleClosePanel]);


  // Find the selected set based on ID
  const selectedSet = useMemo(() => {
    return selectedSetId
      ? mockPracticeSets.find(set => set.id === selectedSetId) || null
      : null;
  }, [selectedSetId]);

  return {
    viewType,
    setViewType,
    selectedSetId,
    selectedSet, // Return the derived selected set object
    isPanelOpen,
    setIsPanelOpen, // Expose setter if needed externally
    filters,
    setFilters: handleFilterChange, // Expose filter setter
    sortConfig,
    setSortConfig: handleSortChange, // Expose sort setter
    filteredSets: filteredAndSortedSets, // Use the memoized value
    handleSelectSet,
    handleClosePanel,
    handleClearFilters,
  };
}
