import React from 'react';
import { SortableItem } from '@/components/dnd';
import { CardHeader } from '../ui/CardHeader';
import { CardContent } from './CardContent';
import { CARD_CONFIG, CardConfigKey } from '../config/cardConfig';
import { cn } from '@/lib/utils';

interface DraggableCardProps {
  cardId: CardConfigKey;
  profileData: any;
  skills?: any[];
  isActive: boolean;
  onCardClick: (cardId: string) => void;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  cardId,
  profileData,
  skills = [],
  isActive,
  onCardClick
}) => {
  const config = CARD_CONFIG[cardId];
  
  // Component that wraps the card content and handles clicks
  const CardWrapper = () => {
    return (
      <div 
        className="relative w-full h-full"
        style={{ 
          // Apply standardized height from configuration based on card size
          height: config.size === 'big-tall' ? '960px' : config.size === 'medium-long' || config.size === 'large' ? '640px' : '320px',
          minHeight: config.size === 'big-tall' ? '900px' : config.size === 'medium-long' || config.size === 'large' ? '600px' : '300px'
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering drag when clicking
          onCardClick(cardId);
        }}
      >
        <CardHeader 
          title={config.title} 
          bgColor={config.bgColor} 
          textColor={config.textColor} 
        />
        
        {/* Fixed height content area with overflow handling */}
        <div 
          className={cn(
            "overflow-auto",
            cardId === 'streak' ? 'p-0' : 'p-4',
            // Calculate content area height (total height minus header height)
            // Header is now smaller at 40px (previously 56px)
            "h-[calc(100%-40px)]"
          )}
        >
          <CardContent cardId={cardId} profileData={profileData} skills={skills} />
        </div>
        
        {/* Visual feedback during hover - only shown when hovering */}
        <div className="absolute inset-0 pointer-events-none bg-primary/5 opacity-0 group-hover:opacity-30 flex items-center justify-center transition-opacity">
          <div className="bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 9h14M5 15h14"></path>
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <SortableItem
      key={cardId}
      id={cardId}
      className={cn(
        "bg-card rounded-xl shadow-sm overflow-hidden border transition-all duration-200",
        isActive ? 'ring-2 ring-primary' : 'border-border',
        // Apply proper grid span and row span based on card size
        config.size === 'small' ? 'lg:col-span-2 lg:row-span-1' : '',
        config.size === 'medium-wide' ? 'lg:col-span-4 lg:row-span-1' : '',
        config.size === 'medium-long' ? 'lg:col-span-2 lg:row-span-2' : '',
        config.size === 'large' ? 'lg:col-span-4 lg:row-span-2' : '',
        config.size === 'big-tall' ? 'lg:col-span-2 lg:row-span-3' : ''
      )}
    >
      <CardWrapper />
    </SortableItem>
  );
};
