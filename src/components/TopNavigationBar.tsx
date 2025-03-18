'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { ChevronRightIcon, HomeIcon } from '@/components/icons/BreadcrumbIcons'
import { navigation } from '@/lib/navigation'

/**
 * Breadcrumb navigation component
 * Displays the current page location in a hierarchical structure
 */
export function TopNavigationBar() {
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
                  className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                  <HomeIcon className="h-3.5 w-3.5" />
                  <span className="sr-only">Home</span>
                </Link>
              </li>
              
              {/* Parent section link */}
              {parentTitle && (
                <>
                  <li className="flex items-center">
                    <ChevronRightIcon className="h-3.5 w-3.5 text-slate-400" />
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
                          className="px-1.5 py-0.5 rounded-md hover:bg-slate-100 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/70 transition-colors"
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
                    <ChevronRightIcon className="h-3.5 w-3.5 text-slate-400" />
                  </li>
                  <li className="fade-in">
                    <span className="px-1.5 py-0.5 text-xs rounded-md bg-gradient-to-r from-sky-500/10 to-indigo-500/10 text-sky-600 font-medium dark:text-sky-400 border border-sky-100 dark:border-sky-900/20">
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
