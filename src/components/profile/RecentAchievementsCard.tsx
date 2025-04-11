'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '@/components/ui/typography'; // Assuming Typography component exists

interface Achievement {
  name: string;
  description: string;
  icon: string;
  color: string; // TODO: Refactor color to use semantic/palette names
  date: string;
}

interface RecentAchievementsCardProps {
  achievements: Achievement[];
}

// Helper to map achievement color strings to Tailwind gradient classes
// TODO: Define these mappings more robustly, potentially based on semantic names
const getAchievementGradient = (colorString: string): string => {
  // Simple example mapping, assuming colorString matches the mock data format
  if (colorString.includes('orange')) return 'from-warning-500 to-warning-600';
  if (colorString.includes('blue')) return 'from-primary-500 to-primary-600';
  if (colorString.includes('green')) return 'from-success-500 to-success-600';
  return 'from-slate-500 to-slate-600'; // Default fallback
};

export function RecentAchievementsCard({ achievements }: RecentAchievementsCardProps) {
  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border" data-oid="c5.x-j-">
      <div className="p-6" data-oid="w5l1iiv">
        <div className="flex justify-between items-center mb-4" data-oid="1czyjbh">
          <Typography variant="h3" className="text-foreground" data-oid="d8:o1b-">Recent Achievements</Typography>
          {/* Use primary text color for link */}
          <Link href="/profile/achievements" className="text-sm text-primary hover:underline" data-oid="0:1tn_v">
            View All
          </Link>
        </div>

        <div className="space-y-4" data-oid="nt_ttn3">
          {achievements.map((achievement, index) =>
          <div key={index} className="flex items-start" data-oid="mg61b3o">
              {/* Apply mapped gradient */}
              <div className={`w-10 h-10 bg-gradient-to-br ${getAchievementGradient(achievement.color)} rounded-full flex items-center justify-center text-primary-foreground text-lg shadow-sm`} data-oid="jpcu5hz">
                {achievement.icon}
              </div>
              <div className="ml-3" data-oid="17u4b1_">
                {/* Use span with direct classes for finer control */}
                <span className="text-sm font-medium text-foreground block" data-oid="va:_rha">{achievement.name}</span> {/* Use block for layout */}
                <span className="text-xs text-muted-foreground block" data-oid="q7:yy95">{achievement.description}</span>
                <span className="text-xs text-muted-foreground/80 block mt-1" data-oid="zgbutnj">{achievement.date}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}