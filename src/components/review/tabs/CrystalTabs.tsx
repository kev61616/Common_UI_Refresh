'use client'

import React from 'react'
import { TabProps } from './TabTypes'

/**
 * CrystalTabs - Crystal Collection inspired tab UI with glass-like gradient effects
 * 
 * Features:
 * - Gradient background with light glass effect
 * - Underline animation for active tab
 * - Crystal accent element on active tab
 * - Responsive design (crystal accent hidden on mobile)
 */
export function CrystalTabs({
  tabLabels,
  activeTab,
  onTabChange,
  className = ''
}: TabProps) {
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onTabChange(index)
    }
  }

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="flex w-full rounded-t-lg overflow-hidden">
        {tabLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => onTabChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`relative flex-1 py-3 px-4 text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
              activeTab === index
                ? 'bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/40 text-indigo-700 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
            aria-pressed={activeTab === index}
            role="tab"
          >
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="font-medium">{label}</span>
              {activeTab === index && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              )}
            </div>
            {/* Crystal accent decoration */}
            {activeTab === index && (
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 transform rotate-45 bg-blue-50 dark:bg-blue-900/20 border-r border-t border-blue-200 dark:border-blue-800/50 hidden md:block"></div>
            )}
          </button>
        ))}
      </div>
      {/* Crystal decorative elements */}
      <div className="h-1 w-full bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-100 dark:from-indigo-900/30 dark:via-blue-900/20 dark:to-indigo-900/30"></div>
    </div>
  )
}

/**
 * CrystalTabsDemo - Demo version of CrystalTabs with content display
 */
export function CrystalTabsDemo({
  tabLabels,
  selectedTab,
  onSelectTab,
  className = ''
}: {
  tabLabels: string[]
  selectedTab: number
  onSelectTab: (index: number) => void
  className?: string
}) {
  return (
    <div className={className}>
      <CrystalTabs
        tabLabels={tabLabels}
        activeTab={selectedTab}
        onTabChange={onSelectTab}
      />
      <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 mt-1">
        <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
          {tabLabels[selectedTab]} content would display here
        </p>
      </div>
    </div>
  )
}
