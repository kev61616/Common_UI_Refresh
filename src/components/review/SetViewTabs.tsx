'use client'

import React, { useState } from 'react'

interface SetViewTabsProps {
  activeTab: number
  onTabChange: (tabIndex: number) => void
  tabLabels?: string[]
  className?: string
  variant?: 'crystal' | 'museum' | 'bookshelf' | 'constellation'
}

/**
 * SetViewTabs - Four distinctive tab UI designs for switching between Set Views
 * 
 * Features:
 * - Four different visual themes based on variant prop
 * - Smooth animations and transitions
 * - Accessible keyboard controls
 * - Responsive design for all screen sizes
 * - Light and dark mode support
 */
export function SetViewTabs({
  activeTab = 0,
  onTabChange,
  tabLabels = ['Table View', 'Visual View', 'Analytics View'],
  className = '',
  variant = 'crystal',
  showAllVariants = true
}: SetViewTabsProps & { showAllVariants?: boolean }) {
  // Local state for variant tabs when showing all variants
  const [crystalTab, setCrystalTab] = useState(0)
  const [museumTab, setMuseumTab] = useState(0)
  const [bookshelfTab, setBookshelfTab] = useState(0)
  const [constellationTab, setConstellationTab] = useState(0)
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onTabChange(index)
    }
  }
  
  // Crystal Variant - Inspired by the Crystal Collection View
  if (variant === 'crystal') {
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
  
  // Museum Variant - Inspired by the Museum Gallery View
  if (variant === 'museum') {
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
  
  // Constellation Variant - Inspired by the Constellation Map View
  if (variant === 'constellation') {
    return (
      <div className={`bg-slate-900 dark:bg-slate-950 rounded-lg shadow-md overflow-hidden ${className}`}>
        <div className="flex w-full rounded-t-lg overflow-hidden relative">
          {/* Star background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute h-1 w-1 rounded-full bg-white/70 top-2 left-[10%] animate-pulse"></div>
            <div className="absolute h-0.5 w-0.5 rounded-full bg-white/50 top-6 left-[25%]"></div>
            <div className="absolute h-1 w-1 rounded-full bg-white/60 top-4 left-[40%] animate-pulse"></div>
            <div className="absolute h-0.5 w-0.5 rounded-full bg-white/40 top-8 left-[55%]"></div>
            <div className="absolute h-1 w-1 rounded-full bg-white/70 top-3 left-[70%] animate-pulse"></div>
            <div className="absolute h-0.5 w-0.5 rounded-full bg-white/50 top-7 left-[85%]"></div>
            <div className="absolute h-0.5 w-0.5 rounded-full bg-white/40 top-5 left-[95%]"></div>
          </div>
          
          {tabLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => onTabChange(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`relative flex-1 py-3 px-4 text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-inset z-10 ${index > 0 ? 'ml-px' : ''} ${
                activeTab === index
                  ? 'bg-gradient-to-b from-blue-900/80 to-purple-900/80 text-blue-200'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
              aria-pressed={activeTab === index}
              role="tab"
            >
              <div className="flex flex-col items-center justify-center space-y-1">
                <span className={`font-medium ${activeTab === index ? 'text-blue-200' : ''}`}>{label}</span>
                
                {/* Constellation line connector */}
                {activeTab === index && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"></div>
                )}
              </div>
              
              {/* Star decorations for active tab */}
              {activeTab === index && (
                <>
                  <div className="absolute top-1 left-[20%] h-1 w-1 rounded-full bg-blue-300 animate-pulse"></div>
                  <div className="absolute top-2 right-[30%] h-0.5 w-0.5 rounded-full bg-purple-300"></div>
                  <div className="absolute bottom-2 left-[40%] h-0.5 w-0.5 rounded-full bg-blue-300"></div>
                  <div className="absolute bottom-3 right-[25%] h-1 w-1 rounded-full bg-purple-300 animate-pulse"></div>
                </>
              )}
              
              {/* Constellation connector lines */}
              {activeTab === index && index < tabLabels.length - 1 && (
                <div className="absolute top-1/2 -right-1 w-2 h-px bg-blue-400/30 z-20"></div>
              )}
            </button>
          ))}
        </div>
        {/* Cosmic dust decorative element */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-900/30 via-purple-900/50 to-blue-900/30"></div>
      </div>
    )
  }
  
  // Bookshelf Variant - Inspired by the 3D Bookshelf View
  if (showAllVariants) {
    return (
      <div className={className}>
        {/* Main tab with selected variant */}
        {variant === 'crystal' ? (
          // Crystal variant implementation as main tab
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
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
                    {activeTab === index && (
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 transform rotate-45 bg-blue-50 dark:bg-blue-900/20 border-r border-t border-blue-200 dark:border-blue-800/50 hidden md:block"></div>
                    )}
                  </button>
                ))}
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-100 dark:from-indigo-900/30 dark:via-blue-900/20 dark:to-indigo-900/30"></div>
            </div>
            <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 mt-1">
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
                {tabLabels[crystalTab]} content would display here
              </p>
            </div>
          </div>

          {/* Museum Gallery Variant */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 mr-2 text-xs font-medium">44</span>
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Museum Gallery Design</h4>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
              <div className="flex w-full">
                {tabLabels.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => setMuseumTab(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setMuseumTab(index)
                      }
                    }}
                    className={`relative flex-1 py-3 px-4 text-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset ${index !== 0 ? 'border-l border-slate-200 dark:border-slate-700' : ''} ${museumTab === index ? '' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                    aria-pressed={museumTab === index}
                    role="tab"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      {museumTab === index ? (
                        <>
                          <span className="font-serif font-medium text-amber-700 dark:text-amber-300">{label}</span>
                          <div className="h-0.5 w-12 bg-amber-400 dark:bg-amber-500 mt-1"></div>
                          <div className="h-0.5 w-6 bg-amber-300 dark:bg-amber-600 mt-0.5 mb-1"></div>
                        </>
                      ) : (
                        <span className="font-serif text-slate-600 dark:text-slate-400">{label}</span>
                      )}
                    </div>
                    {museumTab === index && (
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
            <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 mt-1">
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
                {tabLabels[museumTab]} content would display here
              </p>
            </div>
          </div>

          {/* 3D Bookshelf Variant */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 mr-2 text-xs font-medium">45</span>
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">3D Bookshelf Design</h4>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md p-1">
              <div className="flex w-full rounded-md overflow-hidden">
                {tabLabels.map((label, index) => (
                  <button
                    key={index}
                    onClick={() => setBookshelfTab(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setBookshelfTab(index)
                      }
                    }}
                    className={`relative flex-1 py-3 px-4 transition-all duration-300 ease-in-out focus:outline-none ${index > 0 ? 'ml-1' : ''} ${
                      bookshelfTab === index
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md transform -translate-y-1'
                        : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500'
                    } rounded-t-md`}
                    aria-pressed={bookshelfTab === index}
                    role="tab"
                    style={{
                      transformOrigin: 'bottom center',
                    }}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="font-medium">{label}</span>
                      
                      {bookshelfTab === index && (
                        <div className="w-full flex justify-center space-x-2 mt-1">
                          <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-300"></div>
                          <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-300"></div>
                          <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-300"></div>
                        </div>
                      )}
                    </div>
                    
                    {bookshelfTab === index && (
                      <>
                        <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-l from-transparent to-black/10 dark:to-black/20"></div>
                        <div className="absolute -right-1 top-0 bottom-0 w-1 bg-gradient-to-r from-transparent to-black/10 dark:to-black/20"></div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 mt-1">
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
                {tabLabels[bookshelfTab]} content would display here
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Crystal Variant - Inspired by the Crystal Collection View
  if (variant === 'crystal') {
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
              {activeTab === index && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 transform rotate-45 bg-blue-50 dark:bg-blue-900/20 border-r border-t border-blue-200 dark:border-blue-800/50 hidden md:block"></div>
              )}
            </button>
          ))}
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-100 dark:from-indigo-900/30 dark:via-blue-900/20 dark:to-indigo-900/30"></div>
      </div>
    )
  }
  
  {/* March 2025 New Tab Variants */}
  <div className="space-y-6 mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
    <h3 className="text-lg font-medium mb-2 text-slate-700 dark:text-slate-300">Additional Tab Variants (March 2025)</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
      The following tab designs were recently added to match our new view styles.
    </p>
  
    {/* Crystal Collection Variant */}
    <div className="space-y-2 pt-4">
      <div className="flex items-center">
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 mr-2 text-xs font-medium">43</span>
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Crystal Collection Design</h4>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex w-full rounded-t-lg overflow-hidden">
          {tabLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => setCrystalTab(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setCrystalTab(index)
                }
              }}
              className={`relative flex-1 py-3 px-4 text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
                crystalTab === index
                  ? 'bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/40 text-indigo-700 dark:text-indigo-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
              aria-pressed={crystalTab === index}
              role="tab"
            >
              <div className="flex flex-col items-center justify-center space-y-1">
                <span className="font-medium">{label}</span>
                {crystalTab === index && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                )}
                {crystalTab === index && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 transform rotate-45 bg-blue-50 dark:bg-blue-900/20 border-r border-t border-blue-200 dark:border-blue-800/50 hidden md:block"></div>
                )}
              </button>
            ))}
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-indigo-100 via-blue-50 to-indigo-100 dark:from-indigo-900/30 dark:via-blue-900/20 dark:to-indigo-900/30"></div>
        </div>
        <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 mt-1">
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
            {tabLabels[crystalTab]} content would display here
          </p>
        </div>
      </div>

      {/* Museum Gallery Variant */}
      <div className="space-y-2 pt-4">
        <div className="flex items-center">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 mr-2 text-xs font-medium">44</span>
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Museum Gallery Design</h4>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
          <div className="flex w-full">
            {tabLabels.map((label, index) => (
              <button
                key={index}
                onClick={() => setMuseumTab(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setMuseumTab(index)
                  }
                }}
                className={`relative flex-1 py-3 px-4 text-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset ${index !== 0 ? 'border-l border-slate-200 dark:border-slate-700' : ''} ${museumTab === index ? '' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                aria-pressed={museumTab === index}
                role="tab"
              >
                <div className="flex flex-col items-center space-y-1">
                  {museumTab === index ? (
                    <>
                      <span className="font-serif font-medium text-amber-700 dark:text-amber-300">{label}</span>
                      <div className="h-0.5 w-12 bg-amber-400 dark:bg-amber-500 mt-1"></div>
                      <div className="h-0.5 w-6 bg-amber-300 dark:bg-amber-600 mt-0.5 mb-1"></div>
                    </>
                  ) : (
                    <span className="font-serif text-slate-600 dark:text-slate-400">{label}</span>
                  )}
                </div>
                {museumTab === index && (
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
        <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 mt-1">
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
            {tabLabels[museumTab]} content would display here
          </p>
        </div>
      </div>

      {/* 3D Bookshelf Variant */}
      <div className="space-y-2 pt-4">
        <div className="flex items-center">
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 mr-2 text-xs font-medium">45</span>
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">3D Bookshelf Design</h4>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg shadow-md p-1">
          <div className="flex w-full rounded-md overflow-hidden">
            {tabLabels.map((label, index) => (
              <button
                key={index}
                onClick={() => setBookshelfTab(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setBookshelfTab(index)
                  }
                }}
                className={`relative flex-1 py-3 px-4 transition-all duration-300 ease-in-out focus:outline-none ${index > 0 ? 'ml-1' : ''} ${
                  bookshelfTab === index
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md transform -translate-y-1'
                    : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-500'
                } rounded-t-md`}
                aria-pressed={bookshelfTab === index}
                role="tab"
                style={{
                  transformOrigin: 'bottom center',
                }}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="font-medium">{label}</span>
                  
                  {bookshelfTab === index && (
                    <div className="w-full flex justify-center space-x-2 mt-1">
                      <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-300"></div>
                      <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-300"></div>
                      <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-300"></div>
                    </div>
                  )}
                </div>
                
                {bookshelfTab === index && (
                  <>
                    <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-l from-transparent to-black/10 dark:to-black/20"></div>
                    <div className="absolute -right-1 top-0 bottom-0 w-1 bg-gradient-to-r from-transparent to-black/10 dark:to-black/20"></div>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 mt-1">
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
            {tabLabels[bookshelfTab]} content would display here
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
}