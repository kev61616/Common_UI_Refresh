'use client'

import React from 'react'
import Image from 'next/image'
// Removed Typography import
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { Badge } from '@/components/catalyst/badge' // Use Catalyst Badge

interface BrainEvolutionCardProps {
  rankProgress: number
}

export function BrainEvolutionCard({ rankProgress }: BrainEvolutionCardProps) {
  const brainLevel = Math.floor(rankProgress / 10) + 5

  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border">
      <div className="p-6">
        {/* Use Catalyst Heading */}
        <Heading level={2} className="text-lg font-semibold mb-4">Brain Evolution</Heading>

        <div className="h-48 flex items-center justify-center relative">
          {/* Brain visualization */}
          <div className="w-32 h-32 relative">
            <Image
              src="/profile/brain-evolution.svg"
              alt="Brain Evolution"
              width={128}
              height={128}
              className="w-full h-full object-contain"
            />

            {/* Use accent/primary gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-accent-500/30 rounded-full animate-pulse"></div>

            {/* Use palette colors */}
            <div className="absolute top-1/4 left-0 w-4 h-4 rounded-full bg-primary-500/70 blur-sm animate-ping"></div>
            <div className="absolute bottom-1/4 right-0 w-3 h-3 rounded-full bg-success-500/70 blur-sm animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-accent-500/70 blur-sm animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Level indicator */}
          <div className="absolute bottom-0 left-0 right-0 text-center">
            {/* Use Catalyst Badge */}
            <Badge color="blue" className="border border-primary/20 bg-gradient-to-r from-primary-500/10 to-accent-500/10">
              Brain Level: {brainLevel}
            </Badge>
          </div>
        </div>

        {/* Use Catalyst Text */}
        <Text className="text-sm text-muted-foreground text-center mt-4">
          Your brain evolves as you master more subjects and improve your overall performance.
        </Text>
      </div>
    </div>
  )
}
