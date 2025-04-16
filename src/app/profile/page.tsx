import React from 'react';
import { Metadata } from 'next';
import ProfileTabsContainer from '@/components/profile/containers/ProfileTabsContainer';

export const metadata: Metadata = {
  title: 'Profile | BrainBox Learning',
  description: 'View and manage your learning profile',
};

export default function ProfilePage() {
  // In a real application, this would likely come from an authentication context
  const studentId = "current-user";
  
  return (
    <div className="container max-w-7xl mx-auto pt-8 pb-0 px-4 sm:px-6 lg:px-8">
      <div className="bg-card text-card-foreground shadow-sm rounded-xl border border-border">
        <div className="p-6">
          <ProfileTabsContainer studentId={studentId} />
        </div>
      </div>
    </div>
  );
}
