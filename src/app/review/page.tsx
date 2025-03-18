'use client'

import { useEffect, useState } from 'react'
import { ReviewPage } from '@/components/review/ReviewPage'
import '@/styles/components/set-view.css'

// Define the saved state interface
interface SavedReviewState {
  viewType: 'set' | 'timeline' | 'question';
  selectedSetId: string | null;
  filters: any;
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
}

/**
 * Production review page that uses the standalone implementation
 * with the SetViewTable component (timeline-inspired table view)
 */
export default function ReviewIndexPage() {
  const [savedState, setSavedState] = useState<SavedReviewState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved state from localStorage on component mount
  useEffect(() => {
    // Using a try-catch to handle any parsing errors or localStorage issues
    try {
      const savedStateJson = localStorage.getItem('reviewPageState');
      if (savedStateJson) {
        const parsedState = JSON.parse(savedStateJson);
        setSavedState(parsedState);
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
      // If there's an error, we'll just use default state
    }
    
    // Mark loading as complete
    setIsLoading(false);
  }, []);

  // Save state handler to pass to ReviewPage component
  const handleSaveState = (state: SavedReviewState) => {
    try {
      localStorage.setItem('reviewPageState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  };

  // Show a simple loading indicator if state is still loading
  if (isLoading) {
    return (
      <div className="px-[2%] flex justify-center py-12">
        <div className="h-8 w-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-[2%]">
      <ReviewPage 
        initialState={savedState}
        onStateChange={handleSaveState}
      />
    </div>
  )
}
