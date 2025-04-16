'use client';

import React from 'react';
import { SortableContextProvider, ClientOnly } from '@/components/dnd';
import { cn } from '@/lib/utils';
import { DraggableCard } from './DraggableCard';
import { Toast } from '../ui/Toast';
import { GridGuidance, DragPathIndicator, DragHint } from '../ui/GridGuidance';
import { useDragDropState } from '@/hooks/dnd/useDragDropState';
import { CardConfigKey, CARD_CONFIG } from '../config/cardConfig';

// Types for external data
interface ProfileCardGridProps {
  cardPositions: string[];
  onOrderChange: (newOrder: string[]) => void;
  activeCardId: string | null;
  onCardClick: (cardId: string) => void;
  profileData: any;
  skills: any[];
}

/**
 * Static placeholder card for server-side rendering
 * This prevents hydration errors by avoiding dynamic content during SSR
 */
function StaticCardPlaceholder({ cardId }: { cardId: CardConfigKey }) {
  const config = CARD_CONFIG[cardId];
  return (
    <div className={cn(
      "bg-card rounded-xl shadow-sm overflow-hidden border border-border",
      // Use the colSpan from config to determine grid span
      `lg:col-span-${config.colSpan}`
    )}>
      <div className="w-full h-full">
        <div className={`px-4 py-2 border-b border-border ${config.bgColor}`}>
          <div className={`font-semibold ${config.textColor} truncate`}>
            {config.title}
          </div>
        </div>
        <div className="p-4 h-[calc(100%-40px)]">
          {/* Empty content placeholder */}
          <div className="w-full h-full bg-muted/20 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export function ProfileCardGrid({
  cardPositions,
  onOrderChange,
  activeCardId,
  onCardClick,
  profileData,
  skills
}: ProfileCardGridProps) {
  // Use our custom hook for drag and drop state management
  const [dragState, dragActions] = useDragDropState(cardPositions, onOrderChange);
  
  // Function to render drag overlay contents
  const renderDragOverlay = (id: string | null) => {
    if (!id) return null;
    
    // Create a simpler, lighter version of the card for the overlay
    return (
      <div className="bg-card rounded-xl shadow-lg border border-primary/30 overflow-hidden opacity-90 scale-95">
        <DraggableCard
          cardId={id as CardConfigKey}
          profileData={profileData}
          skills={skills}
          isActive={false}
          onCardClick={() => {}} // No-op since this is just a preview
        />
      </div>
    );
  };
  
  // Tutorial toast functionality removed

  // Create static placeholder for server-side rendering
  const staticCardGrid = (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 relative">
      {cardPositions.map(cardId => (
        <StaticCardPlaceholder 
          key={cardId} 
          cardId={cardId as CardConfigKey} 
        />
      ))}
    </div>
  );

  return (
    <>
      {/* Wrap the dnd-kit components with ClientOnly to prevent hydration errors */}
      <ClientOnly fallback={staticCardGrid}>
        <SortableContextProvider
          items={cardPositions}
          onItemsChange={dragActions.handlePositionChange}
          strategy="horizontal" // Using horizontal for grid layout
          renderOverlay={renderDragOverlay}
          onDragStart={(event: import("@dnd-kit/core").DragStartEvent) => dragActions.handleDragStart(event)}
          onDragEnd={dragActions.handleDragEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 group relative">
            {/* Grid background guidance */}
            <GridGuidance 
              isDragging={dragState.isDragging} 
              mousePosition={dragState.mousePosition}
            />
            
            {/* Path indicator for drag movement */}
            <DragPathIndicator 
              isDragging={dragState.isDragging}
              startPosition={dragState.dragStartPosition}
              mousePosition={dragState.mousePosition}
            />
            
            {/* Onboarding hint */}
            <DragHint isDragging={dragState.isDragging} />
            
            {/* The actual cards */}
            {cardPositions.map(cardId => (
              <DraggableCard
                key={cardId}
                cardId={cardId as CardConfigKey}
                profileData={profileData}
                skills={skills}
                isActive={activeCardId === cardId}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        </SortableContextProvider>
      </ClientOnly>
      
      {/* Toast notification */}
      <Toast 
        visible={dragState.toast.visible} 
        message={dragState.toast.message} 
        type={dragState.toast.type} 
      />
    </>
  );
}
