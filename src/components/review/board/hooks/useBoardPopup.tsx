'use client'

import { useState, useCallback, useEffect } from 'react'

interface PopupPosition {
  x: number;
  y: number;
}

interface UseBoardPopupReturn {
  activePopupId: string | null;
  isPopupVisible: boolean;
  popupOrigin: PopupPosition;
  popupFilters: Record<string, string[] | string>;
  popupSortField: string;
  popupSortDirection: 'asc' | 'desc';
  openPopup: (categoryId: string, event: React.MouseEvent) => void;
  closePopup: () => void;
  handlePopupFilterChange: (category: string, values: string[] | string) => void;
  handlePopupSortChange: (field: string, direction: 'asc' | 'desc') => void;
}

/**
 * Custom hook to manage popup state and behavior in the board view.
 * Extracts popup logic from the main component for better separation of concerns.
 */
export function useBoardPopup(): UseBoardPopupReturn {
  // State to track active popup and its origin position
  const [activePopupId, setActivePopupId] = useState<string | null>(null);
  
  // State to track popup animation
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  // State to track the origin position of the clicked card for animation
  const [popupOrigin, setPopupOrigin] = useState<PopupPosition>({ x: 0, y: 0 });
  
  // Filter and sort state for popup content
  const [popupFilters, setPopupFilters] = useState<Record<string, string[] | string>>({
    subject: ['all'],
    difficulty: ['all'],
    period: ['all'],
    accuracy: ['all']
  });
  
  const [popupSortField, setPopupSortField] = useState<string>('topic');
  const [popupSortDirection, setPopupSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Track keyboard events for popup closing
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePopupId) {
        closePopup();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [activePopupId]);
  
  // Open a popup for a category
  const openPopup = useCallback((categoryId: string, event: React.MouseEvent) => {
    // Get the position of the clicked element to animate from
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setActivePopupId(categoryId);
    // Add a small delay to trigger the entrance animation
    setTimeout(() => setIsPopupVisible(true), 50);
  }, []);
  
  // Close the active popup
  const closePopup = useCallback(() => {
    // First trigger the exit animation
    setIsPopupVisible(false);
    // Then clear the active popup after animation completes
    setTimeout(() => setActivePopupId(null), 300);
  }, []);
  
  // Handle filter change in popup
  const handlePopupFilterChange = useCallback((category: string, values: string[] | string) => {
    setPopupFilters(prev => ({
      ...prev,
      [category]: values
    }));
  }, []);
  
  // Handle sort change in popup
  const handlePopupSortChange = useCallback((field: string, direction: 'asc' | 'desc') => {
    setPopupSortField(field);
    setPopupSortDirection(direction);
  }, []);
  
  return {
    activePopupId,
    isPopupVisible,
    popupOrigin,
    popupFilters,
    popupSortField,
    popupSortDirection,
    openPopup,
    closePopup,
    handlePopupFilterChange,
    handlePopupSortChange
  };
}
