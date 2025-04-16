import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "../../lib/utils";

type DraggableProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export function Draggable({ id, children, className, disabled = false }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative touch-none cursor-grab",
        isDragging && "z-10 cursor-grabbing opacity-80 shadow-lg",
        className
      )}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
