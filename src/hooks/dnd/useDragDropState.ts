import { useState, useEffect } from 'react';

interface DragPosition {
  x: number;
  y: number;
}

interface ToastState {
  visible: boolean;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface DragDropState {
  isDragging: boolean;
  draggedItemId: string | null;
  dragStartPosition: DragPosition | null;
  mousePosition: DragPosition | null;
  toast: ToastState;
}

export interface DragDropActions {
  handleDragStart: (event: any) => void;
  handleDragEnd: () => void;
  handlePositionChange: (newOrder: string[]) => void;
  updatePositions: (positions: string[]) => void;
  showToast: (message: string, type: ToastState['type']) => void;
  hideToast: () => void;
}

export function useDragDropState(
  initialPositions: string[],
  onOrderChange?: (newOrder: string[]) => void
): [DragDropState, DragDropActions] {
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragStartPosition, setDragStartPosition] = useState<DragPosition | null>(null);
  const [mousePosition, setMousePosition] = useState<DragPosition | null>(null);
  
  // Toast notification state
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info'
  });
  
  // Track mouse position for visual effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);
  
  // Handler for drag start
  const handleDragStart = (event: any) => {
    setIsDragging(true);
    
    // Safely access properties with proper null checks
    if (event && event.active) {
      setDraggedItemId(event.active.id);
      
      // Get position information if available
      if (event.active.rect && event.active.rect.current) {
        setDragStartPosition({
          x: event.active.rect.current.left,
          y: event.active.rect.current.top
        });
      } else {
        // Fallback position if rect info is not available
        setDragStartPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        });
      }
    }
    
    // Show drag start toast
    showToast("Dragging card...", "info");
    
    // Play sound effect (commented out for now)
    if (typeof window !== 'undefined') {
      try {
        // This is a placeholder - you would need to implement actual sound
        // new Audio('/sounds/drag-start.mp3').play();
      } catch (e) {
        console.log('Sound not supported');
      }
    }
  };
  
  // Handler for drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItemId(null);
    setDragStartPosition(null);
    setMousePosition(null);
    
    // Hide the toast after a short delay
    setTimeout(hideToast, 1000);
  };
  
  // Handler for position changes
  const handlePositionChange = (newOrder: string[]) => {
    // Call the parent handler if provided
    if (onOrderChange) {
      // Show saving state
      showToast("Saving layout changes...", "info");
      
      // Call the parent handler
      onOrderChange(newOrder);
      
      // Simulate API call with progress feedback
      setTimeout(() => {
        showToast("Layout saved successfully!", "success");
        
        // Vibration feedback if supported
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try {
            navigator.vibrate(100); // 100ms vibration for feedback
          } catch (e) {
            console.log('Vibration not supported');
          }
        }
        
        // Auto-hide toast after 3 seconds
        setTimeout(hideToast, 3000);
      }, 800);
    }
  };
  
  const showToast = (message: string, type: ToastState['type']) => {
    setToast({
      visible: true,
      message,
      type
    });
  };
  
  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };
  
  // Method to directly update positions (without triggering save)
  const updatePositions = (positions: string[]) => {
    if (onOrderChange) {
      onOrderChange(positions);
    }
  };
  
  return [
    {
      isDragging,
      draggedItemId, 
      dragStartPosition,
      mousePosition,
      toast: {
        visible: toast.visible,
        message: toast.message,
        type: toast.type
      }
    },
    {
      handleDragStart,
      handleDragEnd,
      handlePositionChange,
      updatePositions,
      showToast,
      hideToast
    }
  ];
}
