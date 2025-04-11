'use client';

import React from 'react';
import { Typography } from '@/components/ui/typography'; // Assuming Typography component exists

interface ProfileInfoCardProps {
  username: string;
  joinDate: string;
}

export function ProfileInfoCard({ username, joinDate }: ProfileInfoCardProps) {
  return (
    // Use semantic colors for background and border
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border" data-oid="th9-_z-">
      {/* Use primary/accent palette for gradient? Using primary for now */}
      <div className="bg-gradient-to-r from-primary-500/10 to-primary-500/10 dark:from-primary-800/30 dark:to-primary-800/30 p-6 flex items-center justify-between" data-oid=":s-20k7">
        <div className="flex items-center" data-oid="5ndueek">
          {/* Use primary palette for gradient */}
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-primary-foreground text-2xl font-bold border-4 border-card" data-oid="7uu48wh"> {/* Use card background for border */}
            {username.charAt(0)}
          </div>
          <div className="ml-4" data-oid="ip9i63z">
            <Typography variant="h5" weight="bold" className="text-foreground" data-oid="8f03967">{username}</Typography> {/* Use Typography h5 (xl) */}
            <Typography variant="small" className="text-muted-foreground" data-oid="n-1qcvq">Member since {joinDate}</Typography> {/* Use Typography small */}
          </div>
        </div>
      </div>
      {/* Potential place for other basic info if needed */}
    </div>);

}