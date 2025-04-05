'use client'

import React from 'react'
import { PracticeSet } from '@/lib/mockData'
// Removed Typography import
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text
import { usePracticeSetAnalytics } from '@/hooks/usePracticeSetAnalytics'
import { AnalyticsInfoCard } from './analytics/AnalyticsInfoCard'
import { AnalyticsPerformanceSummary } from './analytics/AnalyticsPerformanceSummary'
import { AnalyticsInsights } from './analytics/AnalyticsInsights'
import { SessionEnduranceChart } from './charts/SessionEnduranceChart'
import { DifficultyDistributionChart } from './charts/DifficultyDistributionChart'
import { MistakeAnalysisChart } from './charts/MistakeAnalysisChart'

interface AnalyticsPanelProps {
  practiceSet: PracticeSet;
}

export function AnalyticsPanel({ practiceSet }: AnalyticsPanelProps) {
  // Use the custom hook to get calculated analytics data
  const analytics = usePracticeSetAnalytics(practiceSet);

  // Render loading or error state if analytics data isn't available
  if (!analytics || !practiceSet) {
    // TODO: Implement a proper loading skeleton or error message
    return <div className="p-6">Loading analytics...</div>;
  }

  const { correctCount, incorrectCount, averageTimePerQuestion, difficultyComfortMessage } = analytics;

  return (
    // Use semantic background, standard padding (e.g., p-6 or p-8)
    <div className="p-6 md:p-8 bg-background relative"> {/* Use p-6 or p-8 */}
      {/* Decorative background elements (Keep for now, consider moving to layout or removing) */}
      {/* Ensure these are within the main div */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"> {/* Use inset-0 and z-index */}
        <div className="absolute top-0 left-0 w-full h-full opacity-60">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-bl from-primary-500/[0.03] to-transparent"></div> {/* Use primary */}
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gradient-to-tr from-primary-500/[0.03] to-transparent"></div> {/* Use primary */}
            <div className="absolute top-[35%] left-[25%] w-24 h-24 rounded-full bg-gradient-to-tr from-accent-500/[0.05] to-transparent"></div> {/* Use accent */}
        </div>
         {/* Removing decorative grid patterns for simplification */}
      </div>

      {/* Panel header */}
      {/* TODO: Refactor header styles and potentially make it a component */}
      {/* Use spacing scale mb-10, ml-7, mt-6, mr-2, w-2, h-2, h-16 */}
      <div className="relative mb-10 z-10">
        {/* Decorative elements using primary/accent */}
        <div className="absolute -top-3 -left-6 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute top-0 left-0 w-0.5 h-16 bg-gradient-to-b from-primary-500 via-accent-500 to-accent-600 rounded-full"></div> {/* Use w-0.5 */}
        {/* Use Catalyst Heading */}
        <Heading level={1} className="ml-7 relative bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground/80 text-4xl font-semibold tracking-tight"> {/* Use ml-7, apply size/style */}
          Detailed Analytics
           {/* Decorative underline */}
          <div className="absolute -bottom-1.5 left-0 w-44 h-0.5 bg-gradient-to-r from-primary-500 to-transparent"></div> {/* Use spacing scale -bottom-1.5 */}
        </Heading>
         {/* Use Catalyst Text */}
        <Text className="text-sm text-muted-foreground ml-7 mt-6 flex items-center"> {/* Use ml-7, mt-6 */}
          <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 mr-2 shadow-sm"></span> {/* Use w-2, h-2, mr-2 */}
          In-depth analysis for {practiceSet.subject} practice set
        </Text>
      </div>

      {/* Render extracted components */}
      {/* Add relative z-10 to ensure content is above background elements */}
      <div className="relative z-10">
        <AnalyticsInfoCard
          subject={practiceSet.subject}
          type={practiceSet.type}
        dateCompleted={practiceSet.dateCompleted}
        difficulty={practiceSet.difficulty}
      />

      <AnalyticsPerformanceSummary
        accuracy={practiceSet.accuracy}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        timeUsed={practiceSet.timeUsed}
        averageTimePerQuestion={averageTimePerQuestion}
      />

      {/* Charts section */}
      <div className="relative z-10 mb-8"> {/* Use spacing scale mb-8 */}
        <div className="relative mb-5"> {/* Use spacing scale mb-5 */}
          {/* Use Catalyst Heading */}
          <Heading level={2} className="inline-block px-3 py-1 bg-gradient-to-r from-background to-transparent rounded-lg border-l-2 border-primary text-3xl font-semibold tracking-tight"> {/* Use px-3, py-1, apply size/style */}
            Performance Visualization
          </Heading>
        </div>

        {/* Wrap charts in divs with standard card styling */}
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 mb-5"> {/* Use spacing scale p-6, mb-5 */}
           <DifficultyDistributionChart questions={practiceSet.questions} />
        </div>

        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6 mb-5"> {/* Use spacing scale p-6, mb-5 */}
           <SessionEnduranceChart
             earlyAccuracy={practiceSet.sessionFatigue.earlyAccuracy}
             lateAccuracy={practiceSet.sessionFatigue.lateAccuracy}
           />
        </div>

        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm p-6"> {/* Use spacing scale p-6 */}
           <MistakeAnalysisChart mistakeTypes={practiceSet.mistakeTypes} />
        </div>
      </div>

      <AnalyticsInsights
        practiceSet={practiceSet}
          difficultyComfortMessage={difficultyComfortMessage}
        />
      </div> {/* Close relative z-10 wrapper */}
    </div>
  )
}
