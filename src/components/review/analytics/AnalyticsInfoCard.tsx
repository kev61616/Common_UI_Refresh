'use client'

import React from 'react'
// Removed Typography import
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { Badge } from '@/components/catalyst/badge' // Use Catalyst Badge
import { formatDate } from '@/lib/utils' // Import helper

interface AnalyticsInfoCardProps {
  subject: string;
  type: string;
  dateCompleted: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export function AnalyticsInfoCard({
  subject,
  type,
  dateCompleted,
  difficulty,
}: AnalyticsInfoCardProps) {

  // TODO: Verify contrast ratios for all badge combinations (light & dark)
  const difficultyClasses =
    difficulty === 'Easy' ? 'bg-success-100 text-success-700 dark:bg-success-900/70 dark:text-success-200' // Darker text for light mode
    : difficulty === 'Medium' ? 'bg-warning-100 text-warning-700 dark:bg-warning-900/70 dark:text-warning-200' // Darker text for light mode
    : 'bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-red-300'; // Ensure dark mode destructive text has contrast

  return (
    // Use spacing scale mb-8
    <div className="mb-8 relative z-10">
      {/* Use semantic bg-card and border-border */}
      <div className="bg-card backdrop-blur-sm rounded-xl overflow-hidden border border-border">
        {/* Use border-border for dividers */}
        <div className="grid grid-cols-2 divide-x divide-border">
          {/* Use spacing scale p-4 */}
          <div className="p-4 relative overflow-hidden">
            {/* Decorative element - keep as is for now */}
            <div className="absolute -right-0.5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
            {/* Use span for xs text */}
            <span className="block text-xs font-medium text-muted-foreground mb-1">Completed</span> {/* Use spacing scale mb-1 */}
            {/* Use Catalyst Text */}
            <Text className="text-sm font-medium text-foreground">{formatDate(dateCompleted)}</Text>
          </div>
          {/* Use spacing scale p-4 */}
          <div className="p-4">
            {/* Use span for xs text */}
            <span className="block text-xs font-medium text-muted-foreground mb-1">Difficulty</span> {/* Use spacing scale mb-1 */}
            {/* Use Catalyst Badge */}
            <Badge color={difficulty === 'Easy' ? 'green' : difficulty === 'Medium' ? 'amber' : 'red'} className="text-sm">
              {difficulty}
            </Badge>
          </div>
        </div>
         {/* Use border-border for dividers */}
        <div className="grid grid-cols-2 divide-x divide-border border-t border-border">
           {/* Use spacing scale p-4 */}
          <div className="p-4 relative overflow-hidden">
             {/* Decorative element - keep as is for now */}
            <div className="absolute -right-0.5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
            {/* Use span for xs text */}
            <span className="block text-xs font-medium text-muted-foreground mb-1">Subject</span> {/* Use spacing scale mb-1 */}
            {/* Use Catalyst Text */}
            <Text className="text-sm font-medium text-foreground">{subject}</Text>
          </div>
          {/* Use spacing scale p-4 */}
          <div className="p-4">
            {/* Use span for xs text */}
            <span className="block text-xs font-medium text-muted-foreground mb-1">Type</span> {/* Use spacing scale mb-1 */}
            {/* Use Catalyst Text */}
            <Text className="text-sm font-medium text-foreground">{type}</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
