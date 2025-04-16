import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "../../lib/utils";

type DroppableProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export function Droppable({ id, children, className, disabled = false }: DroppableProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "transition-colors",
        isOver && "bg-accent/30",
        className
      )}
    >
      {children}
    </div>
  );
}
