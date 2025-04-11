"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface ToolWindowProps {
  id: string;
  title: string;
  url: string;
  position: {x: number;y: number;};
  onClose: () => void;
  onPositionChange: (position: {x: number;y: number;}) => void;
}

export function ToolWindow({
  id,
  title,
  url,
  position,
  onClose,
  onPositionChange,
  ...props
}: ToolWindowProps & React.HTMLAttributes<HTMLDivElement>) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Handle dragging
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        setIsDragging(true);
      }
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        };
        onPositionChange(newPosition);
      }
    },
    [isDragging, dragOffset, onPositionChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

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
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={windowRef}
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        zIndex: 50,
        width: "480px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "0.5rem",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
        resize: "both"
      }}
      {...props}>

      <div
        onMouseDown={handleMouseDown}
        style={{
          padding: "0.75rem",
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "move"
        }}>

        <div
          style={{
            fontWeight: 500,
            fontSize: "0.875rem"
          }}>

          {title}
        </div>
        <button
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.25rem",
            borderRadius: "0.25rem",
            backgroundColor: "transparent",
            transition: "background-color 0.2s"
          }}>

          <X size={16} />
          <span className="sr-only">Close</span>
        </button>
      </div>
      <div style={{ flexGrow: 1, backgroundColor: "white" }}>
        <iframe
          src={url}
          title={title}
          style={{
            width: "100%",
            height: "100%",
            border: "none"
          }} />

      </div>
    </div>);

}