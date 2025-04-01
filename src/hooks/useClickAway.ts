'use client'

import { useEffect, RefObject } from 'react'

/**
 * Hook that handles clicks outside of the specified element
 * Useful for closing dropdowns, modals, etc. when clicking outside
 *
 * @param ref - React ref object for the element to detect clicks outside of
 * @param handler - Callback function to be called when a click outside occurs
 */
export function useClickAway<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      
      handler(event)
    }
    
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
