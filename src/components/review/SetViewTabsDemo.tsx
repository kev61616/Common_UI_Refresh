'use client';

import React, { useState } from 'react';
import { SetViewTabs } from './SetViewTabs';

/**
 * SetViewTabsDemo - Demonstrates the four tab UI design variants
 *
 * This component showcases all four tab design variants for the Set View:
 * - Crystal Collection inspired design
 * - Museum Gallery inspired design
 * - 3D Bookshelf inspired design
 * - Constellation Map inspired design
 *
 * The demo allows switching between designs for comparison
 */
export function SetViewTabsDemo() {
  // State for active tab in each variant
  const [activeTabCrystal, setActiveTabCrystal] = useState(0);
  const [activeTabMuseum, setActiveTabMuseum] = useState(0);
  const [activeTabBookshelf, setActiveTabBookshelf] = useState(0);
  const [activeTabConstellation, setActiveTabConstellation] = useState(0);

  // State for main tab that shows all variants
  const [activeTabMain, setActiveTabMain] = useState(0);

  // Custom tab labels for demo
  const tabLabels = ['Table View', 'Visual View', 'Analytics View'];

  return (
    <div className="p-6 space-y-6" data-oid=".ri.yka">
      <div className="max-w-4xl mx-auto" data-oid="2qxq3bt">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200" data-oid="krmb-is">Set View Tab Design Comparison</h2>
        
        <div className="space-y-8" data-oid="badvgcw">
          {/* Original Tab Set with All Variants Stacked */}
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-800" data-oid="6oxbpj4">
            <h3 className="text-lg font-medium mb-2 text-slate-700 dark:text-slate-300" data-oid="enmm-p7">Tab Design Variants - Direct Comparison</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5" data-oid="z7ml41n">
              Compare the four different tab designs inspired by the new view styles.  
            </p>
            
            <div className="space-y-6" data-oid="h.v9c2k">
              {/* Crystal Variant */}
              <div className="space-y-2" data-oid="akia0z6">
                <div className="flex items-center" data-oid="11yxhkf">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 mr-2 text-xs font-medium" data-oid="annc2:0">1</span>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300" data-oid="dvolw2f">Crystal Collection Design</h4>
                </div>
                <SetViewTabs
                  activeTab={activeTabCrystal}
                  onTabChange={setActiveTabCrystal}
                  tabLabels={tabLabels}
                  variant="crystal" data-oid="oka26gh" />

                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900" data-oid="6r66:nb">
                  <p className="text-center text-slate-500 dark:text-slate-400 text-sm" data-oid="kmvd1m8">
                    {tabLabels[activeTabCrystal]} content would display here
                  </p>
                </div>
              </div>
              
              {/* Museum Variant */}
              <div className="space-y-2 pt-2" data-oid="y_u02a2">
                <div className="flex items-center" data-oid="zl0g:n2">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 mr-2 text-xs font-medium" data-oid="xvh6ufn">2</span>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300" data-oid="gipbqjg">Museum Gallery Design</h4>
                </div>
                <SetViewTabs
                  activeTab={activeTabMuseum}
                  onTabChange={setActiveTabMuseum}
                  tabLabels={tabLabels}
                  variant="museum" data-oid="app:q:c" />

                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900" data-oid="eti5lh2">
                  <p className="text-center text-slate-500 dark:text-slate-400 text-sm" data-oid="3tjpjcj">
                    {tabLabels[activeTabMuseum]} content would display here
                  </p>
                </div>
              </div>
              
              {/* Bookshelf Variant */}
              <div className="space-y-2 pt-2" data-oid="ge37qnh">
                <div className="flex items-center" data-oid="hjwd96r">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 mr-2 text-xs font-medium" data-oid="dlc0vcz">3</span>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300" data-oid="ae8g7qm">3D Bookshelf Design</h4>
                </div>
                <SetViewTabs
                  activeTab={activeTabBookshelf}
                  onTabChange={setActiveTabBookshelf}
                  tabLabels={tabLabels}
                  variant="bookshelf" data-oid="37hm8-6" />

                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900" data-oid="4zlazi_">
                  <p className="text-center text-slate-500 dark:text-slate-400 text-sm" data-oid="9p9tn:7">
                    {tabLabels[activeTabBookshelf]} content would display here
                  </p>
                </div>
              </div>
              
              {/* Constellation Variant */}
              <div className="space-y-2 pt-2" data-oid="oezg.f2">
                <div className="flex items-center" data-oid="0h79dr.">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mr-2 text-xs font-medium" data-oid="q39z.vm">4</span>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300" data-oid="jjm:ngl">Constellation Map Design</h4>
                </div>
                <SetViewTabs
                  activeTab={activeTabConstellation}
                  onTabChange={setActiveTabConstellation}
                  tabLabels={tabLabels}
                  variant="constellation" data-oid="-2iof6a" />

                <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900" data-oid="8_50h3k">
                  <p className="text-center text-slate-500 dark:text-slate-400 text-sm" data-oid="k264q0e">
                    {tabLabels[activeTabConstellation]} content would display here
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Design Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-oid="65nevsc">
            {/* Crystal Description */}
            <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30" data-oid="0z32t_v">
              <h4 className="font-medium text-indigo-800 dark:text-indigo-300 mb-2" data-oid=".j8g-ty">Crystal Collection</h4>
              <p className="text-sm text-indigo-700 dark:text-indigo-400" data-oid="gdxf9z.">
                Inspired by faceted gemstones with gradient effects, light reflections and subtle depth cues. Features an elegant underline accent.  
              </p>
            </div>
            
            {/* Museum Description */}
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30" data-oid="qe:8t3w">
              <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2" data-oid="u68wjg3">Museum Gallery</h4>
              <p className="text-sm text-amber-700 dark:text-amber-400" data-oid="hck.chy">
                Features ornate frame corners, classic serif typography, and an elegant double-line underline decoration for selected tabs.
              </p>
            </div>
            
            {/* Bookshelf Description */}
            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700" data-oid="d:7x-fg">
              <h4 className="font-medium text-slate-800 dark:text-slate-300 mb-2" data-oid="w2z2ocw">3D Bookshelf</h4>
              <p className="text-sm text-slate-700 dark:text-slate-400" data-oid="3j2.kr8">
                Realistic book tabs with physical depth cues, elevation effects, and subtle edge shadows for a three-dimensional appearance.
              </p>
            </div>
            
            {/* Constellation Description */}
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30" data-oid="y5qt:g5">
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2" data-oid="sd:an-7">Constellation Map</h4>
              <p className="text-sm text-blue-700 dark:text-blue-400" data-oid="100qr:5">
                Space-themed design with twinkling stars, cosmic gradients, and constellation-like connecting lines. Features subtle animations and a dark cosmic background.
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50" data-oid="4_t44ly">
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2" data-oid="orl2n:9">Integration Instructions</h4>
          <p className="text-sm text-blue-700 dark:text-blue-400" data-oid="fv0_2qu">
            To use these tabs in your Set View, import the <code className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded" data-oid="v-_mg0m">SetViewTabs</code> component and 
            pass it the active tab index, change handler, and your preferred variant ('crystal', 'museum', 'bookshelf', or 'constellation').
          </p>
        </div>
        
        {/* March 2025 New Tab Variants */}
        <div className="mt-8 border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-800" data-oid=".ha_acp">
          <h3 className="text-lg font-medium mb-2 text-slate-700 dark:text-slate-300" data-oid="meyay7y">March 2025 Set View Tab Designs</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5" data-oid="w8.z8xk">
            New tab designs that match the recently announced Crystal Collection, Museum Gallery, and 3D Bookshelf views.
          </p>
          
          <SetViewTabs
            activeTab={activeTabMain}
            onTabChange={setActiveTabMain}
            tabLabels={tabLabels}
            variant="crystal"
            showAllVariants={true}
            className="mb-2" data-oid="_73zyxm" />

        </div>
      </div>
    </div>);

}