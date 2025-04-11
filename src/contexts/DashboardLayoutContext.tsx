'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Card IDs for dashboard components
export type DashboardCardId =
'studyStreak' |
'skillsRadar' |
'focusAreas' |
'upcomingTests' |
'recommendedActions' |
'performanceInsights' |
'recentProgress';

// Priority levels
export type CardPriority = 'high' | 'normal' | 'low' | 'hidden';

// Card position information
interface CardPosition {
  id: DashboardCardId;
  priority: CardPriority;
  order: number;
}

interface DashboardLayoutContextType {
  cardPositions: CardPosition[];
  moveCard: (id: DashboardCardId, direction: 'up' | 'down') => void;
  setPriority: (id: DashboardCardId, priority: CardPriority) => void;
  resetLayout: () => void;
  getCardStyle: (id: DashboardCardId) => {
    order: number;
    display: string;
    opacity: number;
    scale: string;
  };
}

const initialCardPositions: CardPosition[] = [
{ id: 'studyStreak', priority: 'high', order: 0 },
{ id: 'skillsRadar', priority: 'high', order: 1 },
{ id: 'upcomingTests', priority: 'high', order: 2 },
{ id: 'recommendedActions', priority: 'high', order: 3 },
{ id: 'recentProgress', priority: 'high', order: 4 },
{ id: 'focusAreas', priority: 'hidden', order: 5 },
{ id: 'performanceInsights', priority: 'hidden', order: 6 }];


const DashboardLayoutContext = createContext<DashboardLayoutContextType | undefined>(undefined);

export function DashboardLayoutProvider({ children }: {children: ReactNode;}) {
  const [cardPositions, setCardPositions] = useState<CardPosition[]>(() => {
    // Try to load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashboardLayout');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved dashboard layout', e);
        }
      }
    }
    return initialCardPositions;
  });

  // Save to localStorage when positions change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboardLayout', JSON.stringify(cardPositions));
    }
  }, [cardPositions]);

  // Move a card up or down in the order
  const moveCard = (id: DashboardCardId, direction: 'up' | 'down') => {
    const currentIndex = cardPositions.findIndex((card) => card.id === id);
    if (currentIndex === -1) return;

    const newPositions = [...cardPositions];
    const card = newPositions[currentIndex];

    if (direction === 'up' && currentIndex > 0) {
      // Swap with the card above
      newPositions[currentIndex] = newPositions[currentIndex - 1];
      newPositions[currentIndex - 1] = card;
    } else if (direction === 'down' && currentIndex < newPositions.length - 1) {
      // Swap with the card below
      newPositions[currentIndex] = newPositions[currentIndex + 1];
      newPositions[currentIndex + 1] = card;
    }

    // Update order property
    newPositions.forEach((card, index) => {
      card.order = index;
    });

    setCardPositions(newPositions);
  };

  // Set priority level for a card
  const setPriority = (id: DashboardCardId, priority: CardPriority) => {
    setCardPositions((prevPositions) =>
    prevPositions.map((card) =>
    card.id === id ? { ...card, priority } : card
    )
    );
  };

  // Reset to default layout
  const resetLayout = () => {
    setCardPositions(initialCardPositions);
  };

  // Get style properties for a card based on its position and priority
  // Ensuring consistent types between server and client to avoid hydration errors
  const getCardStyle = (id: DashboardCardId) => {
    // Use default values for server-side rendering to avoid hydration mismatches
    if (typeof window === 'undefined') {
      // These default values will be overridden by client-side values after hydration
      return {
        order: 0,
        display: 'block',
        opacity: 1,
        scale: 'scale(1)'
      };
    }

    const card = cardPositions.find((card) => card.id === id);

    if (!card) {
      return { order: 999, display: 'none', opacity: 0, scale: 'scale(0.95)' };
    }

    let display = 'block';
    let opacity = 1;
    let scale = 'scale(1)';

    if (card.priority === 'hidden') {
      display = 'none';
      opacity = 0;
    } else if (card.priority === 'low') {
      opacity = 0.7;
      scale = 'scale(0.98)';
    }

    return {
      order: card.order,
      display,
      opacity,
      scale
    };
  };

  return (
    <DashboardLayoutContext.Provider
      value={{
        cardPositions,
        moveCard,
        setPriority,
        resetLayout,
        getCardStyle
      }}>

      {children}
    </DashboardLayoutContext.Provider>);

}

export function useDashboardLayout() {
  const context = useContext(DashboardLayoutContext);
  if (context === undefined) {
    throw new Error('useDashboardLayout must be used within a DashboardLayoutProvider');
  }
  return context;
}