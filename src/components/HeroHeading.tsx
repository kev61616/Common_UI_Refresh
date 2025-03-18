'use client'

import React from 'react'
import { ClientOnly, useTheme } from '@/lib/clientUtils'

interface HeroHeadingProps {
  title: string
  subtitle?: string
  highlightWords?: string[]
}

/**
 * HeroHeading component with hydration mismatch prevention
 * Uses client-only rendering for theme-dependent elements
 */
export default function HeroHeading({ 
  title, 
  subtitle, 
  highlightWords = [] 
}: HeroHeadingProps) {
  // Use the theme hook to get client-side theme
  const { theme, isClient } = useTheme()
  
  // Default color class to use on the server
  const serverThemeClass = 'theme-blue'
  
  return (
    <div className={"text-center max-w-3xl mx-auto"}>
      <h1
        className="font-[family-name:var(--font-baloo)] text-6xl md:text-7xl font-bold mb-4 theme-text"
        style={{color:"var(--theme-color-primary)"}}
      >
        {title}
      </h1>
      
      {subtitle && (
        <div className="relative">
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6">
            {subtitle}
          </p>
          
          {/* Decorative underline that could change based on theme */}
          <ClientOnly
            fallback={
              <div
                className={`w-36 h-1.5 rounded-full mx-auto ${serverThemeClass}`}
                style={{background:"linear-gradient(to right, var(--theme-color-primary), var(--theme-color-secondary))"}}
              ></div>
            }
          >
            <div
              className={`w-36 h-1.5 rounded-full mx-auto theme-${theme}`}
              style={{background:"linear-gradient(to right, var(--theme-color-primary), var(--theme-color-secondary))"}}
            ></div>
          </ClientOnly>
        </div>
      )}
    </div>
  )
}

/**
 * Alternative implementation using the ClientOnly pattern
 * This approach completely avoids rendering certain elements on the server
 */
export function HeroHeadingAlt({ 
  title, 
  subtitle, 
  highlightWords = [] 
}: HeroHeadingProps) {
  return (
    <div className={"text-center max-w-3xl mx-auto"}>
      <h1
        className="font-[family-name:var(--font-baloo)] text-6xl md:text-7xl font-bold mb-4 theme-text"
        style={{color:"var(--theme-color-primary)"}}
      >
        {title}
      </h1>
      
      {subtitle && (
        <div className="relative">
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-6">
            {subtitle}
          </p>
          
          {/* Only render the decoration on the client side */}
          <ClientOnly
            fallback={<div className="w-36 h-1.5 mx-auto"></div>}
          >
            <div
              className="w-36 h-1.5 rounded-full mx-auto theme-green"
              style={{background:"linear-gradient(to right, var(--theme-color-primary), var(--theme-color-secondary))"}}
            ></div>
          </ClientOnly>
        </div>
      )}
    </div>
  )
}
