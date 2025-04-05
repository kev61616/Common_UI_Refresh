'use client'

import { MainNavigationBar } from '@/components/MainNavigationBar'
import { Breadcrumbs } from '@/components/Breadcrumbs' // Import Breadcrumbs
import '@/styles/animations.css' // Import animations

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col">
      {/* Main Navigation */}
      <MainNavigationBar />
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Main Content - Match filter's width */}
      <div className="mx-auto w-full max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)] lg:max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-6">
        {children}
      </div>
    </div>
  )
}
