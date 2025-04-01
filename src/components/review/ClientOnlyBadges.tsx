'use client'

import { useState, useEffect } from 'react'

interface BadgeProps {
  type: 'Easy' | 'Medium' | 'Hard' | 'Fast' | 'Normal' | 'Slow'
  fallback?: React.ReactNode
  userData?: {
    timeUsed?: number;
    countryAvg?: number;
    globalAvg?: number;
  }
}

/**
 * Client-only badge component to prevent hydration errors
 * Provides consistent badges for difficulty and pace
 * For Slow badges, displays time comparison data on hover
 */
export function ClientBadge({ 
  type, 
  fallback = null,
  userData = {
    timeUsed: 320, // Default: 5:20
    countryAvg: 240, // Default: 4:00
    globalAvg: 210 // Default: 3:30
  }
}: BadgeProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Use a deterministic hash function to ensure consistent rendering between server and client
  const hashCode = (str: string) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }
    return Math.abs(hash)
  }
  
  // Server-side rendering or before hydration
  if (!isMounted) {
    return fallback
  }
  
  // Client-side rendering after hydration completes
  switch (type) {
    // Difficulty badges
    case 'Easy':
      return <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded dark:bg-green-900/40 dark:text-green-300">Easy</span>
    case 'Medium':
      return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded dark:bg-yellow-900/40 dark:text-yellow-300">Medium</span>
    case 'Hard':
      return <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded dark:bg-red-900/40 dark:text-red-300">Hard</span>
    
    // Pace badges
    case 'Fast':
      return <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded dark:bg-blue-900/40 dark:text-blue-300">Fast</span>
    case 'Normal':
      return <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded dark:bg-green-900/40 dark:text-green-300">Normal</span>
    case 'Slow': {
      // Format time as MM:SS
      const formatTime = (seconds: number = 0) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      };
      
      // Generate tooltip text
      const tooltip = `Your time: ${formatTime(userData.timeUsed)}\nCountry average: ${formatTime(userData.countryAvg)}\nGlobal average: ${formatTime(userData.globalAvg)}`;
      
      return (
        <span 
          className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded dark:bg-orange-900/40 dark:text-orange-300 cursor-help"
          title={tooltip}
        >
          Slow
        </span>
      );
    }
      
    // Fallback for any other type
    default:
      return fallback
  }
}
