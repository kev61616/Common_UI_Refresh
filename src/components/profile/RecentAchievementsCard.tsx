'use client'

import React from 'react'
// Removed Typography import
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { Link } from '@/components/catalyst/link' // Use Catalyst Link

interface Achievement {
  name: string
  description: string
  icon: string
  color: string // Keep for now, but ideally refactor to semantic names
  date: string
}

interface RecentAchievementsCardProps {
  achievements: Achievement[]
}

// Removed getAchievementGradient helper for simplification

export function RecentAchievementsCard({ achievements }: RecentAchievementsCardProps) {
  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          {/* Use Catalyst Heading */}
          <Heading level={2} className="text-lg font-semibold">Recent Achievements</Heading>
          {/* Use Catalyst Link */}
          <Link href="/profile/achievements">View All</Link>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start">
              {/* Simplified icon background - using a consistent primary gradient */}
              <div className={`w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-primary-foreground text-lg shadow-sm`}>
                {achievement.icon}
              </div>
              <div className="ml-3">
                {/* Use Catalyst Text */}
                <Text className="text-sm font-medium text-foreground block">{achievement.name}</Text>
                <Text className="text-xs text-muted-foreground block">{achievement.description}</Text>
                <Text className="text-xs text-muted-foreground/80 block mt-1">{achievement.date}</Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
