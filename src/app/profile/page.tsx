'use client'

import React from 'react'
// Removed Typography import
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Button } from '@/components/catalyst/button' // Use Catalyst Button
import { Settings } from 'lucide-react' // Use Lucide icon
import { ProfileInfoCard } from '@/components/profile/ProfileInfoCard'
import { RankCard } from '@/components/profile/RankCard'
import { RecentAchievementsCard } from '@/components/profile/RecentAchievementsCard'
import { PredictedScoresCard } from '@/components/profile/PredictedScoresCard'
import { ProgressHighlightsCard } from '@/components/profile/ProgressHighlightsCard'
import { TagMasteryCard } from '@/components/profile/TagMasteryCard'
import { BrainEvolutionCard } from '@/components/profile/BrainEvolutionCard'

export default function ProfilePage() {
  // Mock data for the profile (Keep data definition here for now)
  // TODO: Consider fetching this data or moving to a separate file/hook
  const profileData = {
    username: 'BrainWave992',
    joinDate: 'March 2025',
    predictedScores: {
      overall: 1490,
      reading: 720,
      writing: 350,
      math: 770
    },
    questionsAnswered: 1456,
    scoreRank: 'Platinum', // Bronze, Silver, Gold, Platinum, Diamond
    rankProgress: 78, // percentage towards next rank
    subjectMasteryLevels: [
      { subject: 'Reading', level: 78, color: '#3b82f6' }, // blue
      { subject: 'Writing', level: 65, color: '#8b5cf6' }, // purple
      { subject: 'Math', level: 82, color: '#06b6d4' }, // cyan
    ],
    recentAchievements: [
      { name: 'Streak Master', description: '10-day study streak', icon: '🔥', color: 'from-orange-400 to-orange-500', date: '2 days ago' },
      { name: 'Math Whiz', description: 'Solved 50 algebra problems', icon: '✨', color: 'from-blue-400 to-blue-500', date: '1 week ago' },
      { name: 'Quick Learner', description: 'Improved accuracy by 15%', icon: '📈', color: 'from-green-400 to-green-500', date: '2 weeks ago' },
    ],
    tagMasteryHighlights: [
      { tag: 'Algebra', accuracy: 92, trend: 'up' as const }, // Use 'as const' for literal type
      { tag: 'Grammar', accuracy: 78, trend: 'up' as const },
      { tag: 'Vocabulary', accuracy: 65, trend: 'neutral' as const },
      { tag: 'Geometry', accuracy: 42, trend: 'down' as const },
    ]
  }

  // Helper functions are removed as they were moved to child components

  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            {/* Use Catalyst Heading */}
            <Heading level={1} className="text-3xl font-bold dark:text-white">
              Your Brain at a Glance
            </Heading>
            {/* Use Catalyst Button */}
            <Button href="/profile/settings" outline>
              <Settings className="size-4 mr-2" /> {/* Use Lucide icon */}
              Profile Settings
            </Button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - User Profile & Rank */}
            <div className="flex flex-col gap-6">
              <ProfileInfoCard
                username={profileData.username}
                joinDate={profileData.joinDate}
              />
              {/* The RankCard now includes the title and surrounding div */}
              <RankCard
                scoreRank={profileData.scoreRank}
                rankProgress={profileData.rankProgress}
              />
              <RecentAchievementsCard achievements={profileData.recentAchievements} />
            </div>

            {/* Middle Column - Predicted Scores & Subject Mastery */}
            <div className="flex flex-col gap-6">
              <PredictedScoresCard scores={profileData.predictedScores} />
              <ProgressHighlightsCard
                questionsAnswered={profileData.questionsAnswered}
                subjectMasteryLevels={profileData.subjectMasteryLevels}
              />
            </div>

            {/* Right Column - Tag Mastery & Brain Evolution */}
            <div className="flex flex-col gap-6">
              <TagMasteryCard tags={profileData.tagMasteryHighlights} />
              <BrainEvolutionCard rankProgress={profileData.rankProgress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
