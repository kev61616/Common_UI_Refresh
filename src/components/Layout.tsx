'use client'

import { usePathname } from 'next/navigation'
import { Hero } from '@/components/Hero'
import { MainNavigationBar } from '@/components/MainNavigationBar'

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <div className="flex w-full flex-col">
      {/* Main Navigation with integrated breadcrumbs */}
      <MainNavigationBar />

      {isHomePage && <Hero />}

      {/* Main Content - Match filter's width */}
      <div className="mx-auto w-full max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)] lg:max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-6">
        {children}
      </div>
    </div>
  )
}
