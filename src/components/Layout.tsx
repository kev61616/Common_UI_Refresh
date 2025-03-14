'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { Hero } from '@/components/Hero'
import { Logo, Logomark } from '@/components/Logo'
import { MobileNavigation } from '@/components/MobileNavigation'
import { TopNavigation } from '@/components/TopNavigation'
import { ThemeSelector } from '@/components/ThemeSelector'

function Header() {
  let [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur-sm dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent',
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation />
      </div>
      <div className="relative flex grow basis-0 items-center">
        <Link href="/" aria-label="Home page">
          <Logomark className="h-9 w-9 lg:hidden" />
          <Logo className="hidden h-9 w-auto lg:block" />
        </Link>
      </div>
      
      {/* Navigation menu in top bar */}
      <TopNavigation className="flex-1 justify-center mx-4" />
      
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 items-center">
        <ThemeSelector className="relative z-10" />
        
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Image
              src="/topbar/orb_icon.png"
              alt="Orb"
              width={24}
              height={24}
              className="mr-1"
            />
            <span className="text-slate-700 dark:text-slate-200 font-medium">50</span>
          </div>
          
          <Link href="/user" className="group" aria-label="User Account">
            <Image
              src="/topbar/user_icon.png"
              alt="User"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let isHomePage = pathname === '/'

  return (
    <div className="flex w-full flex-col">
      <Header />

      {isHomePage && <Hero />}

      <div className="mx-auto w-full max-w-8xl flex-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}
