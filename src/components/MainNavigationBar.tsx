'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ThemeSelector } from '@/components/ThemeSelector'
import { ChevronRightIcon, HomeIcon } from '@/components/icons/BreadcrumbIcons'
import { navigation } from '@/lib/navigation'

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
        style={{ height: 'var(--navbar-height, 4.75rem)' }} // Set fixed height for consistency
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-full items-center justify-between">
            {/* Left side - Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" aria-label="Dashboard" className="flex items-center">
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
                            ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/10' 
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
                    
                    {/* Animated underline indicator */}
                    <span 
                      className={`absolute -bottom-1 left-0 w-full h-1 rounded-full transform transition-all duration-300 ${
                        activeSection === section.title 
                          ? 'bg-gradient-to-r from-sky-500 to-indigo-500 scale-x-100 opacity-100 underline-animation shadow-lg shadow-sky-200/40 dark:shadow-sky-900/20' 
                          : 'bg-sky-500 scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'
                      }`}
                    />
                    
                    {/* Improved dropdown menu with better cohesion and positioning */}
                    <div 
                      className={`absolute top-full left-0 pt-3 w-56 z-50 transition-all duration-200 ${
                        activeSection === section.title 
                          ? 'opacity-100 translate-y-0 pointer-events-auto dropdown-enter' 
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                      onMouseLeave={() => setActiveSection(null)}
                    >
                      {/* Decorative arrow pointing up */}
                      <div className="absolute top-0 left-7 w-4 h-4 bg-white dark:bg-slate-700 transform rotate-45 border-t border-l border-slate-200 dark:border-slate-600 -mt-2 z-0"></div>
                      
                      <div className="rounded-lg shadow-xl border border-slate-200 dark:border-slate-600 overflow-hidden">
                        <div className="relative bg-white dark:bg-slate-700 py-2">
                          {section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={`flex items-center px-4 py-2.5 text-sm transition-colors duration-200 ${
                                pathname === link.href
                                  ? 'bg-sky-50 text-sky-600 font-medium dark:bg-sky-900/30 dark:text-sky-300'
                                  : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-600'
                              }`}
                              onClick={() => setActiveSection(null)}
                            >
                              {/* Add checkmark for selected item */}
                              <div className="w-5 flex-shrink-0 mr-2">
                                {pathname === link.href && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              {link.title}
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
                
                <Link href="/user" className="group relative scale-on-hover" aria-label="User Account">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-0.5 shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-transform duration-200 ease-in-out transform group-hover:scale-110">
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
