import React, { createContext, useContext, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext as DndKitSortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

type SortingStrategy = "vertical" | "horizontal";
type SortableContextProps = {
  items: string[];
  children: React.ReactNode;
  strategy?: SortingStrategy;
  onItemsChange?: (items: string[]) => void;
  renderOverlay?: (id: string | null) => React.ReactNode;
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: () => void;
};

export function SortableContextProvider({
  items,
  children,
  strategy = "vertical",
  onItemsChange,
  renderOverlay,
  onDragStart,
  onDragEnd
}: SortableContextProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
    // Call the onDragStart callback if provided
    onDragStart?.(event);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);
      
      const newItems = arrayMove(items, oldIndex, newIndex);
      onItemsChange?.(newItems);
    }
    
    setActiveId(null);
    // Call the onDragEnd callback if provided
    onDragEnd?.();
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <DndKitSortableContext
        items={items}
        strategy={
          strategy === "vertical"
            ? verticalListSortingStrategy
            : horizontalListSortingStrategy
        }
      >
        {children}
      </DndKitSortableContext>
      {renderOverlay && (
        <DragOverlay>{activeId ? renderOverlay(activeId) : null}</DragOverlay>
      )}
    </DndContext>
  );
}
