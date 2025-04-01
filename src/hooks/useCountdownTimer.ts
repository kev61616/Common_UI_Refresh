'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TimerState } from '@/types/question';

export function useCountdownTimer(initialTimeInSeconds = 2400) { // Default 40 minutes (2400 seconds)
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTimeInSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => Math.max(0, prev - 1)); // Prevent going below zero
      }, 1000);
    } else if (timeRemaining === 0) {
      // Automatically pause when time reaches zero
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining]);

  const formatTime = useCallback((totalSeconds: number): TimerState => {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      minutes,
      seconds,
      formatted: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      isTimeUp: totalSeconds === 0
    };
  }, []);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => setTimeRemaining(initialTimeInSeconds), [initialTimeInSeconds]);
  
  // Add ability to set a new time 
  const setTime = useCallback((newTimeInSeconds: number) => {
    setTimeRemaining(newTimeInSeconds);
  }, []);

  return {
    time: formatTime(timeRemaining),
    isRunning,
    start,
    pause,
    reset,
    setTime,
    timeRemaining
  };
}
