'use client'

import React, { useState } from 'react'
import {
  CrystalTabs,
  MuseumTabs
} from './index'

/**
 * TabsDemo - Comprehensive demo of all tab variants
 * 
 * This component showcases the available tab variants in a single view,
 * allowing developers to easily compare styles and interactions.
 */
export function TabsDemo() {
  // Common tab labels for all variants
  const tabLabels = ['Table View', 'Visual View', 'Analytics View']
  
  // Track active tab for each variant
  const [crystalTab, setCrystalTab] = useState(0)
  const [museumTab, setMuseumTab] = useState(0)
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Tab Component Variants</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          A showcase of beautiful tab UI variants designed for different visual themes.
          Each variant is a fully functional component with interactive states.
        </p>
      </div>
      
      {/* Crystal Tabs */}
      <div className="space-y-3">
        <div className="flex items-center mb-2">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 mr-2 text-xs font-medium">43</span>
          <h2 className="text-lg font-medium text-slate-700 dark:text-slate-300">Crystal Collection Design</h2>
        </div>
        <CrystalTabs
          tabLabels={tabLabels}
          activeTab={crystalTab}
          onTabChange={setCrystalTab}
        />
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
          <p className="text-center text-slate-500 dark:text-slate-400">
            {tabLabels[crystalTab]} content would display here
          </p>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          <strong>Features:</strong> Gradient background, underline animation, crystal accent decoration
        </div>
      </div>
      
      {/* Museum Gallery Tabs */}
      <div className="space-y-3">
        <div className="flex items-center mb-2">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 mr-2 text-xs font-medium">44</span>
          <h2 className="text-lg font-medium text-slate-700 dark:text-slate-300">Museum Gallery Design</h2>
        </div>
        <MuseumTabs
          tabLabels={tabLabels}
          activeTab={museumTab}
          onTabChange={setMuseumTab}
        />
        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
          <p className="text-center text-slate-500 dark:text-slate-400">
            {tabLabels[museumTab]} content would display here
          </p>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          <strong>Features:</strong> Ornate frame corners, serif typeface, elegant underline decoration
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Implementation Notes</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <ul>
            <li>All tab components are modular and fully independent</li>
            <li>Each variant handles its own state, keyboard navigation, and styling</li>
            <li>Full dark mode support with custom theme for each variant</li>
            <li>Complies with accessibility best practices including proper ARIA roles</li>
            <li>Implements keyboard navigation for tab switching</li>
            <li>Smooth transition animations between tab states</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TabsDemo
