'use client'

import React from 'react'
// Removed Typography import
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text

interface RankCardProps {
  scoreRank: string
  rankProgress: number
}

// TODO: Consider moving this helper to a utility file if used elsewhere
const getRankGradient = (rank: string): string => {
  // Map ranks to semantic/palette gradients
  switch (rank) {
    case 'Bronze': return 'from-warning-700 to-warning-600' // Use warning palette
    case 'Silver': return 'from-slate-500 to-slate-400' // Use slate (neutral)
    case 'Gold': return 'from-warning-500 to-warning-400' // Use warning palette
    case 'Platinum': return 'from-primary-500 to-primary-400' // Use primary palette (mapping cyan/sky to primary)
    case 'Diamond': return 'from-accent-500 to-accent-400' // Use accent palette
    default: return 'from-slate-600 to-slate-500' // Default to slate
  }
}

export function RankCard({ scoreRank, rankProgress }: RankCardProps) {
  const rankGradientClass = getRankGradient(scoreRank)
  const rankLevel = Math.floor(rankProgress / 20) + 1

  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6">
      {/* Use Catalyst Heading */}
      <Heading level={2} className="text-lg font-semibold mb-4">Current Rank</Heading>
      <div className="relative">
        {/* Apply semantic gradient */}
        <div className={`bg-gradient-to-r ${rankGradientClass} text-primary-foreground rounded-lg p-4 shadow-sm`}> {/* Assuming gradients work well with primary-foreground */}
          <div className="flex items-center mb-2">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3"> {/* Keep bg-white/20 for contrast on gradient */}
              {scoreRank === 'Diamond' && '💎'}
              {scoreRank === 'Platinum' && '⚡'}
              {scoreRank === 'Gold' && '🏅'}
              {scoreRank === 'Silver' && '🥈'}
              {scoreRank === 'Bronze' && '🥉'}
            </div>
            <div>
              {/* Use Catalyst Heading */}
              <Heading level={3} className="text-xl font-bold text-inherit">{scoreRank}</Heading>
              {/* Use Catalyst Text */}
              <Text className="text-sm text-inherit opacity-90">Level {rankLevel}</Text>
            </div>
          </div>

          {/* Progress bar to next rank */}
          <div className="mt-2">
            <div className="text-sm mb-1 flex justify-between text-inherit opacity-90"> {/* Inherit color */}
              {/* Use Catalyst Text */}
              <Text className="text-sm">Progress to next rank</Text>
              <Text className="text-sm">{rankProgress}%</Text>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden"> {/* Keep bg-white/20 */}
              <div
                className="h-full bg-white/50 rounded-full" // Keep bg-white/50 for progress
                style={{ width: `${rankProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Rank tiers */}
        <div className="mt-4 flex justify-between text-muted-foreground">
          <div className="text-center">
            <div className="h-4 w-4 bg-warning-600 rounded-full mx-auto mb-1"></div> {/* Use warning palette */}
            <Text className="text-xs text-muted-foreground">Bronze</Text> {/* Use Text */}
          </div>
          <div className="text-center">
            <div className="h-4 w-4 bg-slate-400 rounded-full mx-auto mb-1"></div> {/* Use slate */}
            <Text className="text-xs text-muted-foreground">Silver</Text> {/* Use Text */}
          </div>
          <div className="text-center">
            <div className="h-4 w-4 bg-warning-400 rounded-full mx-auto mb-1"></div> {/* Use warning palette */}
            <Text className="text-xs text-muted-foreground">Gold</Text> {/* Use Text */}
          </div>
          <div className="text-center">
            <div className="h-4 w-4 bg-primary-400 rounded-full mx-auto mb-1"></div> {/* Use primary palette */}
            <Text className="text-xs text-muted-foreground">Platinum</Text> {/* Use Text */}
          </div>
          <div className="text-center">
            <div className="h-4 w-4 bg-accent-400 rounded-full mx-auto mb-1"></div> {/* Use accent palette */}
            <Text className="text-xs text-muted-foreground">Diamond</Text> {/* Use Text */}
          </div>
        </div>
      </div>
    </div>
  )
}
