"use client";

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { User, CreditCard, Clock, Settings } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProfileInfoContainer from './ProfileInfoContainer';
import SubscriptionContainer from './SubscriptionContainer';
import BillingHistoryContainer from './BillingHistoryContainer';
import SettingsContainer from './SettingsContainer';

// Loading component for Suspense
const TabLoading = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
  </div>
);

type TabKey = 'profile' | 'subscription' | 'billing' | 'settings';

interface UserProfileContainerProps {
  userId: string;
  initialTab?: TabKey;
  className?: string;
}

const UserProfileContainer: React.FC<UserProfileContainerProps> = ({
  userId,
  initialTab = 'profile',
  className = '',
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get tab from URL params if available, otherwise use default
  const tabParam = searchParams.get('tab') as TabKey | null;
  const [activeTab, setActiveTab] = useState<TabKey>(tabParam || initialTab);
  
  // Update URL when tab changes without causing a page reload
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('tab', activeTab);
    router.replace(`/user?${newSearchParams.toString()}`, { scroll: false });
  }, [activeTab, router, searchParams]);
  
  // Handle tab changing
  const handleTabChange = (value: string) => {
    setActiveTab(value as TabKey);
    
    // Announce tab change to screen readers
    const announcement = document.getElementById('tab-change-announcement');
    if (announcement) {
      announcement.textContent = `${value} tab activated`;
    }
  };

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={handleTabChange}
      className={`w-full ${className}`}
    >
      {/* Hidden live region for screen reader announcements */}
      <div 
        id="tab-change-announcement" 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>
      
      <div className="border-b border-border mb-6 overflow-x-auto scrollbar-thin">
        <TabsList 
          className="w-full justify-start bg-transparent p-0 min-w-max"
          aria-label="User profile sections"
        >
          <TabsTrigger 
            value="profile" 
            variant="underline" 
            className="py-3 px-5 font-medium"
          >
            <User className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger 
            value="subscription" 
            variant="underline" 
            className="py-3 px-5 font-medium"
          >
            <CreditCard className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Subscription</span>
          </TabsTrigger>
          <TabsTrigger 
            value="billing" 
            variant="underline" 
            className="py-3 px-5 font-medium"
          >
            <Clock className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Billing History</span>
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            variant="underline" 
            className="py-3 px-5 font-medium"
          >
            <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="profile" className="mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <ProfileInfoContainer userId={userId} />
      </TabsContent>

      <TabsContent value="subscription" className="mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <SubscriptionContainer userId={userId} />
      </TabsContent>

      <TabsContent value="billing" className="mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <BillingHistoryContainer userId={userId} />
      </TabsContent>

      <TabsContent value="settings" className="mt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <SettingsContainer userId={userId} />
      </TabsContent>
    </Tabs>
  );
};

export default UserProfileContainer;
