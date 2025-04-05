'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
// Removed local icon import
import { Home, ChevronRight } from 'lucide-react' // Use Lucide icons
import { navigation } from '@/lib/navigation'

/**
 * Breadcrumb navigation component
 * Displays the current page location in a hierarchical structure
 */
export function Breadcrumbs() { // Rename function
  const pathname = usePathname()

  // Build breadcrumb segments
  const segments = pathname?.split('/').filter(Boolean) || []
  
  // Get current page details
  let currentPageTitle = ''
  let parentTitle = ''
  
  // Find the current page in navigation
  navigation.forEach((section) => {
    section.links.forEach((link) => {
      if (link.href === pathname) {
        currentPageTitle = link.title
        parentTitle = section.title
      }
    })
  })
  
  if (pathname === '/') {
    return null; // No breadcrumb on homepage
  }
  
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-8 items-center overflow-x-auto hide-scrollbar">
          {/* Only show breadcrumb if not on homepage */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm">
            <ol className="flex items-center space-x-1">
              {/* Home link */}
              <li>
                <Link
                  href="/"
                  // Use semantic colors and standard focus rings if desired
                  className="flex items-center justify-center w-6 h-6 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <Home className="h-3.5 w-3.5" /> {/* Use Lucide Home */}
                  <span className="sr-only">Home</span>
                </Link>
              </li>

              {/* Parent section link */}
              {parentTitle && (
                <>
                  <li className="flex items-center">
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" /> {/* Use Lucide ChevronRight */}
                  </li>
                  <li className="fade-in">
                    {(() => {
                      // Find the first page in this section to link to
                      let sectionLink = "/"
                      navigation.forEach((section) => {
                        if (section.title === parentTitle && section.links.length > 0) {
                          sectionLink = section.links[0].href
                        }
                      })
                      
                      return (
                        <Link
                          href={sectionLink}
                          // Use semantic colors and standard focus rings
                          className="px-1.5 py-0.5 rounded-md text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                        >
                          {parentTitle}
                        </Link>
                      )
                    })()}
                  </li>
                </>
              )}
              
              {/* Current page - not clickable */}
              {currentPageTitle && (
                <>
                  <li className="flex items-center">
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" /> {/* Use Lucide ChevronRight */}
                  </li>
                  <li className="fade-in">
                    {/* Use semantic colors for current page indicator */}
                    <span className="px-1.5 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-medium border border-primary/20">
                      {currentPageTitle}
                    </span>
                  </li>
                </>
              )}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  )
}
