'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { navigation } from '@/lib/navigation'
import { NavigationIcons, Logomark, Logo } from './NavigationIcons'

// This is the client component that can safely use useSearchParams
export default function NavigationClient() {
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
