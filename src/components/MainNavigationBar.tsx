'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { ThemeSelector } from '@/components/ThemeSelector'
import { ChevronRightIcon, HomeIcon } from '@/components/icons/BreadcrumbIcons'
import { navigation } from '@/lib/navigation'

// Navigation icons using outlines only (per feedback)
const NavigationIcons: Record<string, JSX.Element> = {
  // Overview section
  'Dashboard': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  'Reading': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  'Writing': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  'Math': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  
  // SAT section
  'Question Bank': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  'Mock Test': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  
  // Review section
  'Question View': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  ),
  'Set View': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  'Timeline View': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
  
  // Course section
  'Course overview': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
  'Schedule': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  'Materials': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  )
};

// Integrated Logo components directly into this file as requested
function Logomark(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="h-8 w-8 relative" {...props}>
      <Image 
        src="/topbar/brainbox_logo.png" 
        alt="BrainBox Logo" 
        width={32}
        height={32}
        className="object-contain"
      />
    </div>
  )
}

function Logo(props: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="h-8 relative flex items-center" {...props}>
      <div className="relative w-8 h-8 flex items-center justify-center">
        <Image 
          src="/topbar/brainbox_logo.png" 
          alt="BrainBox Logo" 
          width={32}
          height={32}
          priority
          className="object-contain"
        />
      </div>
    </div>
  )
}

export function MainNavigationBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const navbarRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position to add effects when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll)

    // Set initial state
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])
  
  // Close dropdown menu when clicking outside of navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setActiveSection(null)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Get current page details for breadcrumb, more reactive to the current selection
  let currentPageTitle = ''
  let parentTitle = ''
  let parentPath = ''
  
  // Find the current page in navigation - make it more reactive to active section
  navigation.forEach((section) => {
    if (pathname?.startsWith('/review')) {
      if (section.title === 'Review') {
        parentTitle = section.title
        parentPath = section.links[0].href // First link in review section
        
        section.links.forEach((link) => {
          if (pathname === link.href) {
            currentPageTitle = link.title
          }
        })
      }
    } else {
      section.links.forEach((link) => {
        if (pathname === link.href || pathname?.startsWith(link.href + '/')) {
          currentPageTitle = link.title
          parentTitle = section.title
          parentPath = section.links[0].href
        }
      })
    }
  })
  
  return (
    <div className="sticky top-0 z-50">
      {/* Main navigation bar with merged functionality */}
      <div 
        className={`border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md' 
            : 'bg-white dark:bg-slate-900'
        }`}
        style={{ paddingTop: '2%', paddingBottom: '10px' }} // As per feedback: top padding 2%, bottom 10px
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">
            {/* Left side - Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" aria-label="Home" className="flex items-center">
                <Logomark className="h-9 w-9 sm:hidden" />
                <Logo className="hidden sm:block h-9 w-auto min-w-[120px]" />
              </Link>
            </div>
            
            {/* Middle - Main Navigation Links */}
            <div className="flex-1 flex items-center justify-center">
              <nav ref={navbarRef} className="flex space-x-8 mx-8">
                {navigation.map((section) => (
                  <div key={section.title} className="relative group mx-1">
                    <div className="flex items-center">
                      <button 
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-sky-600 group-hover:text-sky-600 dark:hover:text-sky-400 dark:group-hover:text-sky-400 ${
                          activeSection === section.title 
                            ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-slate-800' 
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                        onMouseEnter={() => setActiveSection(section.title)}
                      >
                        {section.title}
                      </button>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ml-0.5 transition-transform duration-300 ${
                          activeSection === section.title 
                            ? 'text-sky-500 rotate-180' 
                            : 'text-slate-400 group-hover:text-sky-400'
                        }`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {/* Removed underline indicator per feedback */}
                    
                    {/* Improved dropdown menu with better cohesion and positioning */}
                    <div 
                      className={`absolute top-full left-0 pt-3 w-56 z-50 transition-all duration-200 ${
                        activeSection === section.title 
                          ? 'opacity-100 translate-y-0 pointer-events-auto dropdown-enter' 
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                      onMouseLeave={() => setActiveSection(null)}
                    >
                    {/* Subtle dropdown indicator - removed diamond effect */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-sky-500/70 dark:bg-sky-500/50 -mt-0.5 z-0 rounded-t-md"></div>
                      
                      {/* Dropdown uses same color as primary button background when active */}
                      <div className="rounded-lg shadow-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
                        <div className={`relative py-2 ${
                          activeSection === section.title 
                            ? 'bg-sky-50 dark:bg-slate-800' 
                            : 'bg-white dark:bg-slate-700'
                        }`}>
                          {section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={`flex items-center px-4 py-2.5 text-sm transition-all duration-200 ${
                                (pathname === link.href || 
                                  (pathname === '/review' && link.href.includes('/review') && 
                                    (link.href.includes(`view=${searchParams?.get('view')}`) || 
                                     (!searchParams?.get('view') && link.title === 'Question View'))))
                                  ? 'bg-sky-100 text-sky-600 font-medium dark:bg-sky-900/50 dark:text-sky-300'
                                  : 'text-slate-700 hover:bg-sky-50 hover:text-sky-600 dark:text-slate-200 dark:hover:bg-sky-900/30 dark:hover:text-sky-300'
                              }`}
                              onClick={() => setActiveSection(null)}
                            >
                              {/* Icon for menu item */}
                              <div className="w-6 flex-shrink-0 mr-3 flex items-center justify-center">
                                {NavigationIcons[link.title] || (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                              
                              {/* Title */}
                              <span>{link.title}</span>
                              
                              {/* Add checkmark for selected item */}
                              <div className="w-5 flex-shrink-0 ml-auto">
                                {(pathname === link.href || 
                                  (pathname === '/review' && link.href.includes('/review') && 
                                   (link.href.includes(`view=${searchParams?.get('view')}`) || 
                                    (!searchParams?.get('view') && link.title === 'Question View')))) && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
            
            {/* Right side - Theme & User Icons */}
            <div className="flex items-center space-x-4">
              <ThemeSelector className="relative z-10" />
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className="flex items-center mr-1 rounded-full bg-gradient-to-r from-purple-500/10 to-sky-500/10 p-1 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                    <Image
                      src="/topbar/orb_icon.png"
                      alt="Orb"
                      width={24}
                      height={24}
                      className="mr-1 w-5 h-auto"
                    />
                    <span className="mr-1 text-slate-700 dark:text-slate-200 font-medium text-sm">50</span>
                  </div>
                </div>
                
                <Link href="/user" className="group relative" aria-label="User Account">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-0.5 shadow-sm border border-slate-200/50 dark:border-slate-700/50 hover:border-sky-300 dark:hover:border-sky-600 transition-colors duration-200">
                    <Image
                      src="/topbar/user_icon.png"
                      alt="User"
                      width={24}
                      height={24}
                      className="h-full w-full rounded-full"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
