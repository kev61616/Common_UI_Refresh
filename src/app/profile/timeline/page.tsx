'use client'

import React from 'react'
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { Button } from '@/components/catalyst/button' // Use Catalyst Button
import { ChevronLeft } from 'lucide-react' // Use Lucide icon

export default function TimelinePage() {
  return (
    // Use standard padding
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            {/* Use Catalyst Heading */}
            <Heading level={1} className="text-2xl font-semibold dark:text-white">
              Your Progress Timeline
            </Heading>
            {/* Use Catalyst Button as Link */}
            <Button href="/profile" outline>
              <ChevronLeft className="size-4 mr-2" />
              Back to Profile
            </Button>
          </header>

          {/* Content - Placeholder */}
          {/* Apply standard card styles */}
          <div className="bg-card text-card-foreground rounded-xl shadow-sm border border-border p-6">
            {/* Use Catalyst Text */}
            <Text className="text-muted-foreground">
              This page will display your learning progress timeline, showing how your skills have evolved over time.
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
