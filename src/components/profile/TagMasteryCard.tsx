'use client'

import React from 'react'
import Link from 'next/link'
import { Typography } from '@/components/ui/typography' // Assuming Typography component exists

interface TagMastery {
  tag: string
  accuracy: number
  trend: 'up' | 'down' | 'neutral'
}

interface TagMasteryCardProps {
  tags: TagMastery[]
}

// TODO: Consider moving these helpers to a utility file if used elsewhere
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

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'neutral' }) => {
  switch (trend) {
    case 'up':
      return (
        // Use currentColor and semantic text color
        <svg className="w-4 h-4 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      )
    case 'down':
      return (
        // Use currentColor and semantic text color
        <svg className="w-4 h-4 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      )
    default:
      return (
        // Use currentColor and semantic text color
        <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
        </svg>
      )
  }
}


export function TagMasteryCard({ tags }: TagMasteryCardProps) {
  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h3" className="text-foreground">Tag Mastery Map</Typography>
          {/* Use primary text color for link */}
          <Link href="/profile/mastery" className="text-sm text-primary hover:underline">
            View Full Map
          </Link>
        </div>

        {/* Tag mastery visual map */}
        <div className="space-y-4 mt-4">
          {tags.map((tag, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <Typography variant="small" weight="medium" className="text-foreground">{tag.tag}</Typography>
                <div className="flex items-center">
                  <Typography variant="small" weight="semibold" className={`${getAccuracyColorClass(tag.accuracy)} mr-1`}>
                    {tag.accuracy}%
                  </Typography>
                  <TrendIcon trend={tag.trend} />
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
            <span className="text-xs text-muted-foreground">Needs Work</span> {/* Use span */}
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-warning-500 rounded-full mr-1.5"></div> {/* Use palette color */}
            <span className="text-xs text-muted-foreground">Improving</span> {/* Use span */}
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-success-500 rounded-full mr-1.5"></div> {/* Use palette color */}
            <span className="text-xs text-muted-foreground">Mastered</span> {/* Use span */}
          </div>
        </div>
      </div>
    </div>
  )
}
