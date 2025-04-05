'use client'

import React from 'react'
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { formatTime } from '@/lib/utils' // Import helper
import { Target, Clock } from 'lucide-react' // Use Lucide icons

interface AnalyticsPerformanceSummaryProps {
  accuracy: number;
  correctCount: number;
  incorrectCount: number;
  timeUsed: number; // in seconds
  averageTimePerQuestion: number; // Add prop back
}

// Removed inline icon definitions

export function AnalyticsPerformanceSummary({
  accuracy,
  correctCount,
  incorrectCount,
  timeUsed,
  averageTimePerQuestion, // Add prop back
}: AnalyticsPerformanceSummaryProps) {
  return (
    // Use spacing scale gap-4, mb-8
    <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
      {/* Accuracy Card */}
      <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border"> {/* Use semantic bg-card, border-border */}
        <div className="bg-primary/10 p-4"> {/* Use semantic bg-primary/10, Use spacing scale p-4 */}
          <div className="flex items-center mb-1.5"> {/* Use spacing scale mb-1.5 */}
            <Target className="size-4 text-primary mr-1.5" /> {/* Use Lucide icon, Use spacing scale size-4, mr-1.5 */}
            <Text className="text-xs text-primary font-medium uppercase tracking-wide">Accuracy</Text>
          </div>
          <Heading level={3} className="text-2xl font-bold text-foreground">{accuracy}%</Heading> {/* Use Catalyst Heading */}
          <Text className="text-xs mt-1 text-muted-foreground flex items-center"> {/* Use Catalyst Text, Use spacing scale mt-1 */}
            <span className="text-success-600 dark:text-success-400 font-medium">{correctCount}</span> correct
            <span className="mx-1">•</span> {/* Use spacing scale mx-1 */}
            <span className="text-destructive font-medium">{incorrectCount}</span> incorrect
          </Text>
        </div>
      </div>

      {/* Time Card */}
      <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border"> {/* Use semantic bg-card, border-border */}
        <div className="bg-warning-500/10 p-4"> {/* Use semantic bg-warning/10, Use spacing scale p-4 */}
          <div className="flex items-center mb-1.5"> {/* Use spacing scale mb-1.5 */}
            <Clock className="size-4 text-warning-600 dark:text-warning-400 mr-1.5" /> {/* Use Lucide icon, Use spacing scale size-4, mr-1.5 */}
            <Text className="text-xs text-warning-800 dark:text-warning-300 font-medium uppercase tracking-wide">Time Used</Text>
          </div>
          <Heading level={3} className="text-2xl font-bold text-foreground">{formatTime(timeUsed)}</Heading> {/* Use Catalyst Heading */}
          <Text className="text-xs mt-1 text-muted-foreground"> {/* Use Catalyst Text, Use spacing scale mt-1 */}
            <span className="text-warning-600 dark:text-warning-400 font-medium">~{averageTimePerQuestion}</span> sec per question
          </Text>
        </div>
      </div>
    </div>
  );
}
