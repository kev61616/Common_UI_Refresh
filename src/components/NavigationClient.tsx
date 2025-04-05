'use client'

import { useState, useEffect } from 'react' // Removed useRef
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { navigation } from '@/lib/navigation'
import { NavigationIcons, Logomark, Logo } from './NavigationIcons'
import { ThemeSelector } from './ThemeSelector'
// Correct the import: NavbarActions -> NavbarSection
import { Navbar, NavbarSection, NavbarItem, NavbarLabel } from '@/components/catalyst/navbar'
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem, DropdownLabel, DropdownDivider, DropdownHeader, DropdownDescription } from '@/components/catalyst/dropdown' // Import Dropdown components
import { ChevronDown, Check } from 'lucide-react' // Import Lucide icons

// This is the client component that can safely use useSearchParams
export default function NavigationClient() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [scrolled, setScrolled] = useState(false)
  // Removed activeSection state and navbarRef

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

  // Removed click outside effect

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
    // Use Catalyst Navbar
    <Navbar
      className={`sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md'
          : 'bg-white dark:bg-slate-900'
      }`}
      // Replace style with Tailwind padding
      // style={{ paddingTop: '2%', paddingBottom: '10px' }}
      // Use standard padding, adjust as needed
      // py-3 corresponds roughly to 12px top/bottom
      // px-4 sm:px-6 lg:px-8 handles horizontal padding and max-width implicitly via Navbar structure
    >
      {/* Left Section: Logo */}
      <NavbarSection>
        <NavbarItem href="/" aria-label="Home">
          <Logomark className="h-9 w-9 sm:hidden" />
          <Logo className="hidden sm:block h-9 w-auto min-w-[120px]" />
        </NavbarItem>
      </NavbarSection>

      {/* Middle Section: Navigation Dropdowns */}
      <NavbarSection className="flex-1 justify-center max-lg:hidden"> {/* Hide on smaller screens for simplicity, could add mobile menu later */}
        {navigation.map((section) => (
          <Dropdown key={section.title}>
            <DropdownButton outline className="text-sm"> {/* Use outline style for dropdown trigger */}
              {section.title}
              <ChevronDown />
            </DropdownButton>
            <DropdownMenu>
              {section.links.map((link) => {
                const isActive = (pathname === link.href ||
                                 (pathname === '/review' && link.href.includes('/review') &&
                                  (link.href.includes(`view=${searchParams?.get('view')}`) ||
                                   (!searchParams?.get('view') && link.title === 'Question View'))));
                return (
                  // Remove invalid 'current' prop. Active state might be handled by parent state or CSS selectors.
                  // Add conditional class for active state styling if needed, e.g., based on Headless UI's data-active attribute if applicable, or manually add classes.
                  // For now, just remove 'current' and rely on default focus/hover styles.
                  <DropdownItem key={link.href} href={link.href} className={isActive ? 'bg-blue-50 dark:bg-blue-900/30' : ''}>
                    {/* Icon */}
                    <span className="w-6 flex-shrink-0 mr-3 flex items-center justify-center">
                      {NavigationIcons[link.title] || (
                        // Fallback Icon (consider replacing with a standard Lucide icon)
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                    {/* Title */}
                    <span className="flex-grow">{link.title}</span>
                    {/* Checkmark */}
                    {isActive && <Check className="h-4 w-4 flex-shrink-0" />}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        ))}
      </NavbarSection>

      {/* Right Section: Actions - Use NavbarSection with ml-auto */}
      <NavbarSection className="ml-auto">
         {/* Theme Selector */}
         <ThemeSelector />

         {/* Orb Icon/Count */}
         <NavbarItem className="flex items-center mr-1 rounded-full bg-gradient-to-r from-purple-500/10 to-sky-500/10 p-1 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
           <Image
             src="/topbar/orb_icon.png"
             alt="Orb"
             width={24}
             height={24}
             className="mr-1 w-5 h-auto"
           />
           <span className="mr-1 text-slate-700 dark:text-slate-200 font-medium text-sm">50</span>
         </NavbarItem>

         {/* User Icon */}
         <NavbarItem href="/user" aria-label="User Account" className="relative group">
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
         </NavbarItem>
      </NavbarSection> {/* Close the corrected NavbarSection */}
    </Navbar>
  )
}
