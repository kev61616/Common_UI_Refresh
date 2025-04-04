'use client'

import React from 'react'
import { Typography } from '@/components/ui/typography' // Assuming Typography component exists

interface Scores {
  overall: number
  reading: number
  writing: number
  math: number
}

interface PredictedScoresCardProps {
  scores: Scores
}

export function PredictedScoresCard({ scores }: PredictedScoresCardProps) {
  // Map subject names to colors (using palette names)
  // TODO: Define this mapping more centrally if needed
  const subjectColorMapping: Record<string, string> = {
    Reading: 'bg-primary-500', // Blue
    Writing: 'bg-accent-500', // Purple/Violet
    Math: 'bg-cyan-500', // Keep cyan for now, or map to another palette like teal/success if available
  }

  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border">
      <div className="p-6">
        <Typography variant="h3" className="text-foreground mb-4">Predicted Scores</Typography>

        <div className="mb-6">
          <div className="text-center mb-2">
            {/* Use Typography h2 (maps to text-4xl) and primary color */}
            <Typography variant="h2" weight="bold" className="text-primary">
              {scores.overall}
            </Typography>
            <Typography variant="small" className="text-muted-foreground">Overall Score</Typography>
          </div>

          {/* Use muted background and primary foreground for progress */}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(scores.overall / 1600) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            {/* Revert to span with direct classes as 'as' prop is not supported */}
            <span className="text-xs">0</span>
            <span className="text-xs">400</span>
            <span className="text-xs">800</span>
            <span className="text-xs">1200</span>
            <span className="text-xs">1600</span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Reading */}
          <div>
            <div className="flex justify-between mb-1">
              <Typography variant="small" weight="medium" className="text-foreground">Reading</Typography>
              <Typography variant="small" weight="semibold" className="text-foreground">{scores.reading}/800</Typography>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${subjectColorMapping['Reading']} rounded-full`}
                style={{ width: `${(scores.reading / 800) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Writing */}
          <div>
            <div className="flex justify-between mb-1">
              <Typography variant="small" weight="medium" className="text-foreground">Writing</Typography>
              <Typography variant="small" weight="semibold" className="text-foreground">{scores.writing}/400</Typography>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${subjectColorMapping['Writing']} rounded-full`}
                style={{ width: `${(scores.writing / 400) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Math */}
          <div>
            <div className="flex justify-between mb-1">
              <Typography variant="small" weight="medium" className="text-foreground">Math</Typography>
              <Typography variant="small" weight="semibold" className="text-foreground">{scores.math}/800</Typography>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${subjectColorMapping['Math']} rounded-full`}
                style={{ width: `${(scores.math / 800) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
