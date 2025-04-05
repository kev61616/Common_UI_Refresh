'use client'

import React from 'react'
// Removed Typography import
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text

interface ProfileInfoCardProps {
  username: string
  joinDate: string
}

export function ProfileInfoCard({ username, joinDate }: ProfileInfoCardProps) {
  return (
    // Use semantic colors for background and border
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border">
      {/* Use primary/accent palette for gradient? Using primary for now */}
      <div className="bg-gradient-to-r from-primary-500/10 to-primary-500/10 dark:from-primary-800/30 dark:to-primary-800/30 p-6 flex items-center justify-between">
        <div className="flex items-center">
          {/* Use primary palette for gradient */}
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-primary-foreground text-2xl font-bold border-4 border-card"> {/* Use card background for border */}
            {username.charAt(0)}
          </div>
          <div className="ml-4">
            {/* Use Catalyst Heading */}
            <Heading level={3} className="text-xl font-bold text-foreground">{username}</Heading>
            {/* Use Catalyst Text */}
            <Text className="text-sm text-muted-foreground">Member since {joinDate}</Text>
          </div>
        </div>
      </div>
      {/* Potential place for other basic info if needed */}
    </div>
  )
}
