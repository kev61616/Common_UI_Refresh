'use client'

import React from 'react'
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { PracticeSet } from '@/lib/mockData' // Assuming type is defined
import { Zap, ShieldCheck, Target, AlertTriangle, Clock, Lightbulb } from 'lucide-react' // Use Lucide icons

interface AnalyticsInsightsProps {
  practiceSet: PracticeSet; // Needed for recommendations logic
  difficultyComfortMessage: string; // Add prop back
}

// Removed inline icon definitions

export function AnalyticsInsights({
  practiceSet,
  difficultyComfortMessage, // Add prop back
}: AnalyticsInsightsProps) {

  // Determine next micro-goal text (Keep original logic)
  let nextGoalText = "Great work! Try a completely new topic to expand your knowledge";
  if (practiceSet.accuracy < 70) {
    nextGoalText = `Aim for 75% accuracy on your next ${practiceSet.subject} ${practiceSet.type} practice set`;
  } else if (practiceSet.accuracy < 85) {
    nextGoalText = `Aim for 90% accuracy on your next ${practiceSet.subject} ${practiceSet.type} practice set`;
  } else if (practiceSet.pace === 'Slow') {
    nextGoalText = `Maintain your high accuracy while improving to a "Normal" pace`;
  } else if (practiceSet.pace === 'Normal') {
    const nextDifficulty = practiceSet.difficulty === 'Easy' ? 'Medium' : 'Hard';
    nextGoalText = `Try a more challenging ${nextDifficulty} difficulty set`;
  }

  return (
    <>
      {/* Adaptive Difficulty Insights Card */}
      <div className="relative z-10 mb-8"> {/* Use spacing scale mb-8 */}
        <div className="relative bg-gradient-to-br from-primary-50/80 to-accent-50/80 rounded-xl overflow-hidden p-5 shadow-sm dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-100/80 dark:border-primary-900/30"> {/* Use spacing scale p-5 */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-bl-full pointer-events-none"></div> {/* Decorative */}
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-sm"> {/* Use spacing scale w-8, h-8 */}
              <Zap className="size-5 text-white" /> {/* Use Lucide icon */}
            </div>
            <div className="ml-4"> {/* Use spacing scale ml-4 */}
              <Text className="text-sm font-semibold text-primary-900 dark:text-primary-200">Adaptive Difficulty Insight</Text>
              <Text className="mt-1.5 text-sm text-primary-700 dark:text-primary-300">{difficultyComfortMessage}</Text> {/* Use spacing scale mt-1.5 */}
            </div>
          </div>
        </div>
      </div>

      {/* Micro-goals and Recommendations */}
      <div className="border-t border-border pt-5 space-y-4"> {/* Use spacing scale pt-5, space-y-4 */}
        <Heading level={4} className="text-base font-semibold text-foreground flex items-center"> {/* Use Heading */}
          <ShieldCheck className="size-4 mr-1.5 text-success-500" /> {/* Use Lucide icon */}
          Personalized Recommendations
        </Heading>

        {practiceSet.accuracy < 70 && (
          <div className="flex items-start gap-2"> {/* Use spacing scale gap-2 */}
            <div className="mt-0.5 bg-warning-100 rounded-full p-1 dark:bg-warning-900/50"> {/* Use spacing scale mt-0.5, p-1 */}
              <AlertTriangle className="size-3 text-warning-600 dark:text-warning-400" /> {/* Use Lucide icon */}
            </div>
            <Text className="text-xs text-foreground">
              Your accuracy is below target. Try reviewing {practiceSet.subject} {practiceSet.type} fundamentals.
            </Text>
          </div>
        )}

        {practiceSet.pace === 'Slow' && (
          <div className="flex items-start gap-2"> {/* Use spacing scale gap-2 */}
            <div className="mt-0.5 bg-primary-100 rounded-full p-1 dark:bg-primary-900/50"> {/* Use spacing scale mt-0.5, p-1 */}
              <Clock className="size-3 text-primary-600 dark:text-primary-400" /> {/* Use Lucide icon */}
            </div>
            <Text className="text-xs text-foreground">
              Your pace is slower than optimal. Practice timed exercises to improve speed.
            </Text>
          </div>
        )}

        {practiceSet.sessionFatigue.earlyAccuracy - practiceSet.sessionFatigue.lateAccuracy > 15 && (
           <div className="flex items-start gap-2"> {/* Use spacing scale gap-2 */}
            <div className="mt-0.5 bg-accent-100 rounded-full p-1 dark:bg-accent-900/50"> {/* Use spacing scale mt-0.5, p-1 */}
              <Zap className="size-3 text-accent-600 dark:text-accent-400" /> {/* Use Lucide icon */}
            </div>
            <Text className="text-xs text-foreground">
              You showed significant fatigue. Consider shorter practice sessions with breaks.
            </Text>
          </div>
        )}

        {practiceSet.mistakeTypes.conceptual > (practiceSet.mistakeTypes.careless + practiceSet.mistakeTypes.timeManagement) && (
           <div className="flex items-start gap-2"> {/* Use spacing scale gap-2 */}
            <div className="mt-0.5 bg-success-100 rounded-full p-1 dark:bg-success-900/50"> {/* Use spacing scale mt-0.5, p-1 */}
              <Lightbulb className="size-3 text-success-600 dark:text-success-400" /> {/* Use Lucide icon */}
            </div>
            <Text className="text-xs text-foreground">
              Your conceptual understanding needs work. Focus on theory before more practice.
            </Text>
          </div>
        )}

        {/* Next Level Goal */}
        <div className="mt-6 pt-5 border-t border-border"> {/* Use spacing scale mt-6, pt-5 */}
          <Heading level={4} className="text-base font-semibold text-foreground mb-3 flex items-center"> {/* Use Heading */}
            <Target className="size-4 mr-1.5 text-warning-500" /> {/* Use Lucide icon */}
            Your Next Micro-Goal
          </Heading>
          <div className="bg-gradient-to-br from-warning-50 to-orange-50 p-4 rounded-xl shadow-sm border border-warning-100 dark:from-warning-900/30 dark:to-orange-900/20 dark:border-warning-900/50 dark:bg-opacity-20"> {/* Use spacing scale p-4 */}
            <Text className="text-xs text-foreground">
              {nextGoalText}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
