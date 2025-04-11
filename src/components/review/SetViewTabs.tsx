'use client';

import React, { useState } from 'react';

// Import all modular tab components
import {
  CrystalTabs,
  MuseumTabs,
  CrystalTabsDemo,
  MuseumTabsDemo,
  TabProps } from
'./tabs';

interface SetViewTabsProps extends TabProps {
  variant?: 'crystal' | 'museum';
  showAllVariants?: boolean;
}

/**
 * SetViewTabs - Tab UI designs for switching between Set Views
 * 
 * Features:
 * - Different visual themes based on variant prop
 * - Smooth animations and transitions
 * - Accessible keyboard controls
 * - Responsive design for all screen sizes
 * - Light and dark mode support
 * - Option to display all variants for demo purposes
 */
export function SetViewTabs({
  activeTab = 0,
  onTabChange,
  tabLabels = ['Table View', 'Visual View', 'Analytics View'],
  className = '',
  variant = 'crystal',
  showAllVariants = false
}: SetViewTabsProps) {
  // Local state for variant tabs when showing all variants
  const [crystalTab, setCrystalTab] = useState(0);
  const [museumTab, setMuseumTab] = useState(0);

  // When showing a single variant, render the appropriate tab component
  if (!showAllVariants) {
    switch (variant) {
      case 'crystal':
        return (
          <CrystalTabs
            tabLabels={tabLabels}
            activeTab={activeTab}
            onTabChange={onTabChange}
            className={className} data-oid="k2re0uz" />);


      case 'museum':
        return (
          <MuseumTabs
            tabLabels={tabLabels}
            activeTab={activeTab}
            onTabChange={onTabChange}
            className={className} data-oid="ns:amv9" />);


      default:
        // Default to crystal if variant is not recognized
        return (
          <CrystalTabs
            tabLabels={tabLabels}
            activeTab={activeTab}
            onTabChange={onTabChange}
            className={className} data-oid="x:icdad" />);


    }
  }

  // When showing all variants, render the demo showcase
  return (
    <div className={className} data-oid="daybyyr">
      {/* Main tab with selected variant - always Crystal in demo mode */}
      <CrystalTabsDemo
        tabLabels={tabLabels}
        selectedTab={activeTab}
        onSelectTab={onTabChange} data-oid="skzrcj8" />


      {/* Museum Gallery Variant */}
      <div className="space-y-2 pt-4" data-oid="e6jvblv">
        <MuseumTabsDemo
          tabLabels={tabLabels}
          selectedTab={museumTab}
          onSelectTab={setMuseumTab} data-oid="jh6ze4l" />

      </div>
    </div>);

}