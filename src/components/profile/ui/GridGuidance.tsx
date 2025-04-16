import React from 'react';
import { cn } from '@/lib/utils';

interface GridGuidanceProps {
  isDragging: boolean;
  mousePosition?: { x: number; y: number } | null;
}

// Helper to determine cell span based on position (accounting for different card sizes)
const getCellSpan = (index: number): 'small' | 'medium-wide' | 'medium-long' | 'large' => {
  // Medium-wide cards (4-column × 1-row): skill breakdown position
  if (index === 2) return 'medium-wide';
  
  // Medium-long cards (2-column × 2-row): vertical data cards
  if (index === 8) return 'medium-long';
  
  // All other positions are small cards for now
  // In the future, we could have logic for large cards too
  return 'small';
};

export const GridGuidance: React.FC<GridGuidanceProps> = ({ isDragging, mousePosition }) => {
  return (
    <div className={cn(
      "absolute inset-0 grid grid-cols-6 gap-6 pointer-events-none transition-all duration-300",
      isDragging 
        ? "opacity-50" 
        : "opacity-0 group-hover:opacity-5"
    )}>
      {/* Generate grid cells with appropriate spans for different card sizes */}
      {Array.from({ length: 18 }).map((_, i) => {
        const cellType = getCellSpan(i);
        return (
          <div 
            key={i} 
            className={cn(
              "bg-gray-100 dark:bg-gray-800 rounded-lg min-h-[320px]",
              "border-2 border-dashed",
              isDragging ? "border-primary/40" : "border-primary/20",
              // Apply different grid spans based on card type
              cellType === 'small' ? 'col-span-2 row-span-1' : '',
              cellType === 'medium-wide' ? 'col-span-4 row-span-1' : '',
              cellType === 'medium-long' ? 'col-span-2 row-span-2' : '',
              cellType === 'large' ? 'col-span-4 row-span-2' : '',
              // Highlight the grid cell nearest to the mouse position
              isDragging && mousePosition && 
                Math.floor(i / 3) === Math.floor((mousePosition.y - 200) / 320) && 
                Math.floor(i % 3) === Math.floor((mousePosition.x - 100) / 400) && 
                "bg-primary/10 border-primary/60"
            )}
          >
            {/* Card size indicator with more descriptive labels */}
            {isDragging && (
              <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground opacity-50">
                {cellType === 'small' && 'Small (2×1)'}
                {cellType === 'medium-wide' && 'Medium-Wide (4×1)'}
                {cellType === 'medium-long' && 'Medium-Long (2×2)'}
                {cellType === 'large' && 'Large (4×2)'}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Component for showing the drag path 
export const DragPathIndicator: React.FC<{
  isDragging: boolean;
  startPosition?: { x: number; y: number } | null;
  mousePosition?: { x: number; y: number } | null;
}> = ({ isDragging, startPosition, mousePosition }) => {
  if (!isDragging || !startPosition || !mousePosition) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 20 }}>
        <line
          x1={startPosition.x}
          y1={startPosition.y}
          x2={mousePosition.x}
          y2={mousePosition.y}
          stroke="var(--primary)"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

// Component for the onboarding hint - positioned well outside the card grid
export const DragHint: React.FC<{ isDragging: boolean }> = ({ isDragging }) => (
  <div className={cn(
    "absolute -left-40 top-1/3 transform -translate-y-1/2 bg-white/95 dark:bg-slate-800/95 rounded-lg shadow-lg p-4 text-xs text-muted-foreground",
    "hidden lg:flex flex-col items-center max-w-[140px]",
    "border border-primary/30",
    "z-50", // Ensure it's above other elements with high z-index
    isDragging 
      ? "opacity-0" 
      : "opacity-0 transition-opacity duration-300 group-hover:opacity-100"
  )}>
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-full h-6 mb-2">
        <div className="absolute top-0 left-0 w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded opacity-40 animate-pulse"></div>
        <svg className="absolute top-0 left-0 w-5 h-5 text-primary animate-[float_3s_ease-in-out_infinite]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 15L19 19M15 19L19 15" />
          <path d="M5 9h14M5 15h14" />
        </svg>
        <div className="absolute top-0 left-8 w-8 h-5 bg-gray-200 dark:bg-gray-700 rounded opacity-60"></div>
      </div>
      <span className="text-center font-semibold">Drag cards to<br />customize your layout</span>
      <div className="text-[10px] text-primary animate-pulse">Try it now!</div>
    </div>
    
    {/* Long connector pointing to the draggable area */}
    <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-16 h-1 bg-primary/30"></div>
    <div className="absolute -right-9 top-1/2 transform -translate-y-1/2 rotate-45 text-primary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  </div>
);

// Tutorial Button removed as requested
