import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "../../lib/utils";

type SortableItemProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  activationDelay?: number;
};

export function SortableItem({ 
  id, 
  children, 
  className, 
  disabled = false,
  activationDelay = 150 // Slight delay to distinguish from clicks
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ 
    id, 
    disabled
  });

  // Use spring physics for more natural movement
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring-like effect
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative transition-all duration-200 ease-in-out",
        "hover:shadow-md hover:scale-[1.005] active:scale-[1.005] touch-manipulation",
        "group cursor-grab",
        isDragging && [
          "z-20 shadow-xl cursor-grabbing",
          // Wireframe effect when dragging without scaling the content
          "border-2 border-dashed border-gray-400 dark:border-gray-600",
          "!bg-white/95 dark:!bg-gray-900/95",
        ],
        isOver && "ring-2 ring-primary/60 outline-dashed outline-2 outline-primary/40 outline-offset-4",
        className
      )}
      // Suppress hydration warnings for dynamically generated attributes
      suppressHydrationWarning
      {...attributes}
      {...listeners}
    >
      {/* Dragging indicator appears in the top right corner when dragging */}
      {isDragging && (
        <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs px-2 py-1 rounded-full z-20 shadow-sm animate-pulse">
          Dragging...
        </div>
      )}
      
      {/* Dragging indicator outline - doesn't affect content size */}
      {isDragging && (
        <div className="absolute inset-0 z-10 pointer-events-none border-2 border-dashed border-primary/40 rounded-lg"></div>
      )}
      
      {/* Content wrapper with fixed dimensions during drag */}
      <div className={cn(
        "relative transition-opacity h-full w-full",
        isDragging && "opacity-80"
      )}>
        {children}
      </div>
      
      {/* Drop target indicator that appears when hovering over a potential drop zone */}
      {isOver && (
        <div className="absolute inset-0 border-2 border-primary/40 rounded-xl z-0 pointer-events-none"></div>
      )}
    </div>
  );
}
