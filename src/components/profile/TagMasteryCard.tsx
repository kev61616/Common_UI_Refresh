'use client'

import React from 'react'
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { Link } from '@/components/catalyst/link' // Use Catalyst Link
import { TrendingUp, TrendingDown, Minus } from 'lucide-react' // Use Lucide icons

interface TagMastery {
  tag: string
  accuracy: number
  trend: 'up' | 'down' | 'neutral' // Add trend back
}

interface TagMasteryCardProps {
  tags: TagMastery[]
}

// Keep color helpers for now
const getAccuracyColorClass = (accuracy: number): string => {
  if (accuracy >= 80) return 'text-success-600 dark:text-success-400'
  if (accuracy >= 60) return 'text-warning-600 dark:text-warning-400'
  return 'text-destructive' // Use semantic destructive color
}

const getProgressBgClass = (accuracy: number): string => {
  if (accuracy >= 80) return 'bg-success-500'
  if (accuracy >= 60) return 'bg-warning-500'
  return 'bg-destructive' // Use semantic destructive color
}

// Removed TrendIcon component

export function TagMasteryCard({ tags }: TagMasteryCardProps) {
  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          {/* Use Catalyst Heading */}
          <Heading level={2} className="text-lg font-semibold">Tag Mastery Map</Heading>
          {/* Use Catalyst Link */}
          <Link href="/profile/mastery">View Full Map</Link>
        </div>

        {/* Tag mastery visual map */}
        <div className="space-y-4 mt-4">
          {tags.map((tag, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                {/* Use Catalyst Text */}
                <Text className="text-sm font-medium text-foreground">{tag.tag}</Text>
                <div className="flex items-center">
                  {/* Use Catalyst Text */}
                  <Text className={`text-sm font-semibold ${getAccuracyColorClass(tag.accuracy)} mr-1`}>
                    {tag.accuracy}%
                  </Text>
                  {/* Use Lucide icons directly */}
                  {tag.trend === 'up' && <TrendingUp className="size-4 text-success-500" />}
                  {tag.trend === 'down' && <TrendingDown className="size-4 text-destructive" />}
                  {tag.trend === 'neutral' && <Minus className="size-4 text-muted-foreground" />}
                </div>
              </div>
              {/* Use muted background */}
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressBgClass(tag.accuracy)} rounded-full`}
                  style={{ width: `${tag.accuracy}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Color legend */}
        <div className="flex justify-between mt-6 text-xs text-muted-foreground">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-destructive rounded-full mr-1.5"></div> {/* Use semantic color */}
            <Text className="text-xs text-muted-foreground">Needs Work</Text> {/* Use Text */}
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-warning-500 rounded-full mr-1.5"></div> {/* Use palette color */}
            <Text className="text-xs text-muted-foreground">Improving</Text> {/* Use Text */}
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-success-500 rounded-full mr-1.5"></div> {/* Use palette color */}
            <Text className="text-xs text-muted-foreground">Mastered</Text> {/* Use Text */}
          </div>
        </div>
      </div>
    </div>
  )
}
