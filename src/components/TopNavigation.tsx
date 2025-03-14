'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { navigation } from '@/lib/navigation'

interface DropdownProps {
  isOpen: boolean
  items: { title: string; href: string }[]
  pathname: string
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}

function Dropdown({ isOpen, items, pathname, onLinkClick }: DropdownProps) {
  if (!isOpen) return null

  return (
    <div className="absolute top-full left-0 z-50 mt-1 min-w-[200px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-800 dark:ring-slate-700">
      <ul 
        role="menu" 
        className="py-2"
        aria-orientation="vertical"
      >
        {items.map((item) => (
          <li key={item.href} role="none">
            <Link
              href={item.href}
              onClick={onLinkClick}
              role="menuitem"
              className={clsx(
                'block px-4 py-2 text-sm transition duration-150 ease-in-out',
                item.href === pathname
                  ? 'bg-slate-100 font-medium text-sky-500 dark:bg-slate-700'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white'
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface NavigationItemProps {
  section: {
    title: string
    links: { title: string; href: string }[]
  }
  pathname: string
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}

function NavigationItem({ section, pathname, onLinkClick }: NavigationItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Check if any links in this section are active
  const isActive = section.links.some(link => link.href === pathname)

  // Find the landing page link (first link in the section)
  const landingPage = section.links[0]?.href || '/'

  return (
    <div 
      ref={ref}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href={landingPage}
        className={clsx(
          'flex items-center px-4 py-2 text-sm font-medium',
          isActive
            ? 'text-sky-500'
            : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
        )}
        onClick={(e) => {
          // Don't navigate when clicking the button if dropdown is open
          if (isOpen) {
            e.preventDefault()
            setIsOpen(false)
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {section.title}
        <svg 
          className={clsx(
            'ml-1 h-4 w-4 transition-transform duration-150',
            isOpen ? 'rotate-180 transform' : ''
          )} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
      
      <Dropdown 
        isOpen={isOpen} 
        items={section.links} 
        pathname={pathname}
        onLinkClick={() => setIsOpen(false)}
      />
    </div>
  )
}

export function TopNavigation({
  className,
  onLinkClick,
}: {
  className?: string
  onLinkClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  const pathname = usePathname()

  return (
    <nav className={clsx('hidden md:flex', className)}>
      <div className="flex items-center space-x-1">
        {navigation.map((section) => (
          <NavigationItem 
            key={section.title}
            section={section}
            pathname={pathname}
            onLinkClick={onLinkClick}
          />
        ))}
      </div>
    </nav>
  )
}
