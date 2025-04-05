"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/catalyst/button"; // Use Catalyst Button
import { Text } from "@/components/catalyst/text"; // Use Catalyst Text
import { cn } from "@/lib/utils"; // Import cn for combining classes

interface ToolWindowProps {
  id: string;
  title: string;
  url: string;
  position: { x: number; y: number };
  onClose: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
}

export function ToolWindow({
  id,
  title,
  url,
  position,
  onClose,
  onPositionChange,
  className, // Allow passing additional classes
  ...props
}: ToolWindowProps & React.HTMLAttributes<HTMLDivElement>) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Handle dragging (Keep original logic)
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (windowRef.current && (e.target as HTMLElement).closest('.tool-window-drag-handle')) { // Only drag by handle
        const rect = windowRef.current.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setIsDragging(true);
        document.body.classList.add('user-select-none');
      }
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        };
        onPositionChange(newPosition);
      }
    },
    [isDragging, dragOffset, onPositionChange]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      document.body.classList.remove('user-select-none');
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove('user-select-none');
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={windowRef}
      // Apply Tailwind classes instead of inline styles
      className={cn(
        "fixed z-50 flex flex-col w-[480px] h-[400px] rounded-lg shadow-lg overflow-hidden resize border border-border bg-card text-card-foreground",
        // Add a class for resize handle visibility if needed, e.g., 'resize-handle'
        // Note: `resize: both` might need a custom utility or plugin if not default
        className
      )}
      style={{
        top: position.y,
        left: position.x,
      }}
      {...props}
    >
      {/* Header - Add drag handle class */}
      <div
        onMouseDown={handleMouseDown}
        className="p-3 bg-card border-b border-border flex items-center justify-between cursor-move tool-window-drag-handle" // Added handle class
      >
        <Text className="font-medium text-sm text-foreground">{title}</Text>
        <Button plain onClick={onClose} aria-label="Close" className="p-1">
          <X size={16} />
        </Button>
      </div>
      {/* Content */}
      <div className="flex-grow bg-white dark:bg-slate-800"> {/* Use white/dark bg for iframe contrast */}
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
}

// Add global style for user-select-none if needed, or handle via JS as above
// <style jsx global>{`
//   .user-select-none {
//     user-select: none;
//     -webkit-user-select: none; /* Safari */
//     -moz-user-select: none; /* Firefox */
//     -ms-user-select: none; /* IE10+/Edge */
//   }
// `}</style>
