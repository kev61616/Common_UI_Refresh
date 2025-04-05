'use client'

import React from 'react'
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text

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
    Reading: 'bg-primary-500', // Blue -> Primary
    Writing: 'bg-accent-500', // Purple -> Accent
    Math: 'bg-cyan-500', // Keep cyan for now, or map to another palette like teal/success if available
  }

  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border">
      <div className="p-6">
        {/* Use Catalyst Heading */}
        <Heading level={2} className="text-lg font-semibold mb-4">Predicted Scores</Heading>

        <div className="mb-6">
          <div className="text-center mb-2">
            {/* Use Catalyst Heading */}
            <Heading level={1} className="text-4xl font-bold text-primary">
              {scores.overall}
            </Heading>
            {/* Use Catalyst Text */}
            <Text className="text-sm text-muted-foreground">Overall Score</Text>
          </div>

          {/* Use muted background and primary foreground for progress */}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(scores.overall / 1600) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            {/* Use Catalyst Text */}
            <Text className="text-xs">0</Text>
            <Text className="text-xs">400</Text>
            <Text className="text-xs">800</Text>
            <Text className="text-xs">1200</Text>
            <Text className="text-xs">1600</Text>
          </div>
        </div>

        <div className="space-y-4">
          {/* Reading */}
          <div>
            <div className="flex justify-between mb-1">
              {/* Use Catalyst Text */}
              <Text className="text-sm font-medium text-foreground">Reading</Text>
              <Text className="text-sm font-semibold text-foreground">{scores.reading}/800</Text>
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
              {/* Use Catalyst Text */}
              <Text className="text-sm font-medium text-foreground">Writing</Text>
              <Text className="text-sm font-semibold text-foreground">{scores.writing}/400</Text>
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
              {/* Use Catalyst Text */}
              <Text className="text-sm font-medium text-foreground">Math</Text>
              <Text className="text-sm font-semibold text-foreground">{scores.math}/800</Text>
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
