"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook to handle interactive glow effect based on mouse position
 * @param initialState Whether the effect should be active initially
 * @returns An object with refs and event handlers for the interactive glow effect
 */
export function useInteractiveGlow(initialState = true) {
  const [isActive, setIsActive] = useState(initialState);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!elementRef.current || !isActive) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const y = event.clientY - rect.top;  // y position within the element
    
    const xPercent = Math.round((x / rect.width) * 100);
    const yPercent = Math.round((y / rect.height) * 100);
    
    elementRef.current.style.setProperty('--x', `${xPercent}%`);
    elementRef.current.style.setProperty('--y', `${yPercent}%`);
  }, [isActive]);
  
  const handleMouseEnter = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.style.setProperty('--x', '50%');
      elementRef.current.style.setProperty('--y', '50%');
    }
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseEnter]);

  return {
    elementRef,
    isActive,
    setIsActive,
  };
}

/**
 * Hook to handle page load animations
 * @returns An object with state and helper methods to control page load animations
 */
export function usePageLoadAnimation() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simulate a slight delay to ensure DOM elements are ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Add the page-loaded class to enable CSS animations
      if (containerRef.current) {
        containerRef.current.classList.add('page-loaded');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    isLoaded,
    containerRef,
  };
}

/**
 * Hook to add staggered animation delay classes to children
 * @param totalItems Number of items to animate
 * @param baseDelay Base delay in milliseconds between items
 * @returns A function to get the delay class based on index
 */
export function useStaggeredAnimation(totalItems: number, baseDelay = 100) {
  const getDelayClass = useCallback((index: number) => {
    // Limit to 10 delay classes to avoid too many CSS classes
    const delayNumber = Math.min(Math.floor((index * baseDelay) / 100) + 1, 10);
    return `stagger-delay-${delayNumber}`;
  }, [baseDelay]);
  
  return {
    getDelayClass,
  };
}

/**
 * Hook to handle animated number counting
 * @param targetValue The final value to count to
 * @param duration Duration of the counting animation in milliseconds
 * @returns Current count value
 */
export function useCountAnimation(targetValue: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const previousTargetRef = useRef(targetValue);
  
  useEffect(() => {
    if (previousTargetRef.current !== targetValue) {
      const startValue = previousTargetRef.current;
      const diff = targetValue - startValue;
      const startTime = performance.now();
      
      const updateCount = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Use easeOutExpo for smoother animation
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentCount = Math.round(startValue + diff * easeProgress);
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      requestAnimationFrame(updateCount);
      previousTargetRef.current = targetValue;
    }
  }, [targetValue, duration]);
  
  return count;
}
