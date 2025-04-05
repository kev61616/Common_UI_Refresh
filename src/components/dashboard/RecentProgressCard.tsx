'use client'

import React from 'react';
// Removed Typography import
import { Heading } from '@/components/catalyst/heading'; // Use Catalyst Heading
import { Text } from '@/components/catalyst/text'; // Use Catalyst Text
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '@/components/catalyst/description-list'; // Use Catalyst DescriptionList
import { BookOpen, PenTool, Sigma, TrendingUp, TrendingDown } from 'lucide-react'; // Use Lucide icons

// TODO: Define proper types for progress data
interface SubjectProgress {
    name: string;
    value: number; // e.g., Mastery Level %
    change: number; // e.g., % change
    icon: React.ElementType; // Lucide icon component
    bgColorClass: string; // Tailwind class for background gradient
    iconBgClass: string; // Tailwind class for icon background
    iconColorClass: string; // Tailwind class for icon color
}

interface RecentProgressCardProps {
    progressData: SubjectProgress[];
}

// Removed inline icon definitions

// Update data to use Lucide icons directly
const updatedProgressData: SubjectProgress[] = [
   { name: 'Reading', value: 82, change: 5, icon: BookOpen, bgColorClass: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20', iconBgClass: 'bg-blue-100 dark:bg-blue-800/30', iconColorClass: 'text-blue-600 dark:text-blue-400' },
   { name: 'Writing', value: 70, change: -8, icon: PenTool, bgColorClass: 'from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20', iconBgClass: 'bg-purple-100 dark:bg-purple-800/30', iconColorClass: 'text-purple-600 dark:text-purple-400' }, // Example negative change
   { name: 'Math', value: 78, change: 3, icon: Sigma, bgColorClass: 'from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20', iconBgClass: 'bg-teal-100 dark:bg-teal-800/30', iconColorClass: 'text-teal-600 dark:text-teal-400' },
];


export function RecentProgressCard({ progressData = updatedProgressData }: RecentProgressCardProps) { // Default to updated data for example
  // Removed iconMap

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Use spacing scale gap-4 */}
      {progressData.map((item) => {
        const IconComponent = item.icon;
        const isPositiveChange = item.change >= 0;
        // Use semantic color classes directly
        const changeColorClass = isPositiveChange ? 'text-success-600 dark:text-success-400' : 'text-destructive dark:text-destructive-400';

        return (
          // Use semantic bg-card, border-border
          <div key={item.name} className={`bg-gradient-to-br ${item.bgColorClass} rounded-xl p-4 border border-border shadow-sm`}> {/* Use spacing scale p-4 */}
            {/* Use DescriptionList for semantic structure */}
            <DescriptionList>
              {/* Icon and Name */}
              <div className="flex items-center mb-3"> {/* Use spacing scale mb-3 */}
                <DescriptionTerm className="sr-only">{item.name} Icon</DescriptionTerm>
                <DescriptionDetails className={`w-10 h-10 rounded-full ${item.iconBgClass} flex items-center justify-center mr-3`}> {/* Use spacing scale w-10, h-10, mr-3 */}
                  <IconComponent className={`size-5 ${item.iconColorClass}`} /> {/* Use size-5 */}
                </DescriptionDetails>
                <Heading level={4} className="text-lg font-semibold text-foreground">{item.name}</Heading> {/* Use Heading */}
              </div>

              {/* Mastery Level */}
              <div className="flex items-baseline justify-between">
                <DescriptionTerm className="text-sm text-muted-foreground">Mastery Level</DescriptionTerm>
                <DescriptionDetails className="text-3xl font-bold text-foreground">{item.value}%</DescriptionDetails>
              </div>

              {/* Change Indicator */}
              <div className="flex items-baseline justify-end mt-1"> {/* Use spacing scale mt-1 */}
                 <DescriptionTerm className="sr-only">Change</DescriptionTerm>
                 <DescriptionDetails className={`${changeColorClass} text-sm font-medium flex items-center`}>
                   {isPositiveChange
                     ? <TrendingUp className="size-4 mr-1" /> // Use Lucide icon
                     : <TrendingDown className="size-4 mr-1" /> // Use Lucide icon
                   }
                   {isPositiveChange ? '+' : ''}{item.change}%
                 </DescriptionDetails>
              </div>
            </DescriptionList> {/* Add missing closing tag */}
          </div>
        );
      })}
    </div>
  );
}
