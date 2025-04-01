'use client'

import React from 'react'
import { TabProps } from './TabTypes'

/**
 * MuseumTabs - Museum Gallery inspired tab UI 
 * 
 * Features:
 * - Ornate underline design for active tab
 * - Decorative frame corners on active tab
 * - Serif font styling for gallery aesthetic
 * - Alternating borders between tabs
 */
export function MuseumTabs({
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
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 ${className}`}>
      <div className="flex w-full">
        {tabLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => onTabChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`relative flex-1 py-3 px-4 text-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset ${index !== 0 ? 'border-l border-slate-200 dark:border-slate-700' : ''} ${activeTab === index ? '' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
            aria-pressed={activeTab === index}
            role="tab"
          >
            <div className="flex flex-col items-center space-y-1">
              {activeTab === index ? (
                <>
                  <span className="font-serif font-medium text-amber-700 dark:text-amber-300">{label}</span>
                  {/* Museum ornate underline */}
                  <div className="h-0.5 w-12 bg-amber-400 dark:bg-amber-500 mt-1"></div>
                  <div className="h-0.5 w-6 bg-amber-300 dark:bg-amber-600 mt-0.5 mb-1"></div>
                </>
              ) : (
                <span className="font-serif text-slate-600 dark:text-slate-400">{label}</span>
              )}
            </div>
            {/* Museum frame corners for active tab */}
            {activeTab === index && (
              <>
                <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-amber-600 dark:border-amber-500"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-amber-600 dark:border-amber-500"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-amber-600 dark:border-amber-500"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-amber-600 dark:border-amber-500"></div>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * MuseumTabsDemo - Demo version of MuseumTabs with content display
 */
export function MuseumTabsDemo({
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
      <div className="flex items-center mb-2">
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 mr-2 text-xs font-medium">44</span>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Museum Gallery Design</h4>
      </div>
      <MuseumTabs
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
