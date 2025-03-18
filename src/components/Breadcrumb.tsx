'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRightIcon, HomeIcon } from '@/components/icons/BreadcrumbIcons'
import { navigation } from '@/lib/navigation'

export function Breadcrumb() {
  const pathname = usePathname()
  
  // Skip breadcrumb on homepage
  if (pathname === '/') {
    return null
  }
  
  // Build breadcrumb segments
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return null
  
  // Get current page title from navigation
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
  
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm">
      <ol className="flex items-center space-x-1">
        {/* Home link */}
        <li>
          <Link 
            href="/" 
            className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-all duration-200 transform hover:scale-110"
          >
            <HomeIcon className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {/* Find the section link */}
        {parentTitle && (
          <>
            <li className="flex items-center">
              <ChevronRightIcon className="h-4 w-4 text-slate-400" />
            </li>
            <li>
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
                    className="px-2 py-1 rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/70 transition-all duration-200 hover:shadow-sm"
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
              <ChevronRightIcon className="h-4 w-4 text-slate-400" />
            </li>
            <li>
              <span className="px-2 py-1 rounded-md bg-gradient-to-r from-sky-500/10 to-indigo-500/10 text-sky-600 font-medium dark:text-sky-400 border border-sky-100 dark:border-sky-900/20">
                {currentPageTitle}
              </span>
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}
