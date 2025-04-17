import React from 'react';
import { Metadata } from 'next';
import UserProfileContainer from '@/components/user/containers/UserProfileContainer';

export const metadata: Metadata = {
  title: 'User Profile | BrainBox Learning',
  description: 'View and manage your account, subscription, and billing information',
  openGraph: {
    title: 'User Profile | BrainBox Learning',
    description: 'Manage your BrainBox Learning account, subscription, and settings',
    images: ['/images/profile-og.jpg'],
  }
};

export default function UserProfilePage() {
  // In a real application, this would come from an authentication context
  const userId = "current-user";
  
  return (
    <div className="container max-w-7xl mx-auto pt-8 pb-0 px-4 sm:px-6 lg:px-8">
      <div className="bg-card text-card-foreground shadow-sm rounded-xl border border-border">
        <div className="p-6">
          <UserProfileContainer userId={userId} />
        </div>
      </div>
    </div>
  );
}
