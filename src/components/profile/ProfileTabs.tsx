'use client';

import React, { ReactNode } from 'react';
import { CrystalTabs } from '@/components/review/tabs/CrystalTabs';

interface ProfileTabsProps {
  activeTab: number;
  onTabChange: (index: number) => void;
  children: ReactNode;
}

export function ProfileTabs({ activeTab, onTabChange, children }: ProfileTabsProps) {
  const tabLabels = ['Overview', 'Reading', 'Writing', 'Math'];

  return (
    <div className="w-full space-y-6">
      <CrystalTabs
        tabLabels={tabLabels}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
