'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Typography } from '@/components/ui/typography';
import { ProfileInfoCard } from '@/components/profile/ProfileInfoCard';
import { RankCard } from '@/components/profile/RankCard';
import { RecentAchievementsCard } from '@/components/profile/RecentAchievementsCard';
import { PredictedScoresCard } from '@/components/profile/PredictedScoresCard';
import { TagMasteryCard } from '@/components/profile/TagMasteryCard';
import { SkillsRadarChart } from '@/components/dashboard/SkillsRadarChart';
import { StudyStreak } from '@/components/dashboard/StudyStreak';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { ReadingTab } from '@/components/profile/ReadingTab';
import { WritingTab } from '@/components/profile/WritingTab';
import { MathTab } from '@/components/profile/MathTab';

export default function ProfilePage() {
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);

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
    { subject: 'Math', level: 82, color: '#06b6d4' } // cyan
    ],
    recentAchievements: [
    { name: 'Streak Master', description: '10-day study streak', icon: '🔥', color: 'from-orange-400 to-orange-500', date: '2 days ago' },
    { name: 'Math Whiz', description: 'Solved 50 algebra problems', icon: '✨', color: 'from-blue-400 to-blue-500', date: '1 week ago' },
    { name: 'Quick Learner', description: 'Improved accuracy by 15%', icon: '📈', color: 'from-green-400 to-green-500', date: '2 weeks ago' }],

    tagMasteryHighlights: [
    { tag: 'Algebra', accuracy: 92, trend: 'up' as const }, // Use 'as const' for literal type
    { tag: 'Grammar', accuracy: 78, trend: 'up' as const },
    { tag: 'Vocabulary', accuracy: 65, trend: 'neutral' as const },
    { tag: 'Geometry', accuracy: 42, trend: 'down' as const }]
  };

  // Define skills for radar chart
  const skills = [
    { name: 'Reading', value: 78, color: '#4285F4' }, // blue
    { name: 'Writing', value: 65, color: '#A142F4' }, // purple
    { name: 'Algebra', value: 82, color: '#42BFF4' }, // cyan
    { name: 'Geometry', value: 70, color: '#34A853' }, // green
    { name: 'Data Analysis', value: 55, color: '#FBBC05' }, // amber
    { name: 'Critical Thinking', value: 75, color: '#EA4335' } // red
  ];

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Overview tab
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-oid="c75c7mq">
            {/* Left Column - User Profile & Rank */}
            <div className="flex flex-col gap-6" data-oid="4hsv8zs">
              <ProfileInfoCard
                username={profileData.username}
                joinDate={profileData.joinDate} data-oid="znjm:5x" />

              {/* The RankCard now includes the title and surrounding div */}
              <RankCard
                scoreRank={profileData.scoreRank}
                rankProgress={profileData.rankProgress} data-oid="ds3hgwo" />

              <RecentAchievementsCard achievements={profileData.recentAchievements} data-oid="gm04y9g" />
            </div>

            {/* Middle Column - Predicted Scores & Study Streak */}
            <div className="flex flex-col gap-6" data-oid="_r1th2u">
              <PredictedScoresCard scores={profileData.predictedScores} data-oid="jw.7l8m" />
              <StudyStreak
                currentStreak={5}
                longestStreak={14} />
            </div>

            {/* Right Column - Tag Mastery & Skills Radar */}
            <div className="flex flex-col gap-6" data-oid="v4ap:73">
              <TagMasteryCard tags={profileData.tagMasteryHighlights} data-oid=":lljz4x" />
              <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border">
                <div className="p-6">
                  <Typography variant="h3" className="text-foreground mb-4">Skills Breakdown</Typography>
                  <SkillsRadarChart skills={skills} />
                </div>
              </div>
            </div>
          </div>
        );
      case 1: // Reading tab
        return <ReadingTab />;
      case 2: // Writing tab
        return <WritingTab />;
      case 3: // Math tab
        return <MathTab />;
      default:
        return null;
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 dark:bg-slate-900" data-oid="9fb5x.c">
      <div className="max-w-7xl mx-auto" data-oid="vggd719">
        <div className="flex flex-col space-y-6" data-oid="d9wah87">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4" data-oid="ab48u9.">
            <Typography variant="h1" className="text-slate-900 dark:text-white" data-oid="lt52hxv">
              Your Brain at a Glance
            </Typography>
            <Link
              href="/profile/settings"
              className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center text-sm font-medium transition-colors hover:bg-indigo-100 dark:hover:bg-indigo-900/50" data-oid="x.zihws">

              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="rr4ggaf">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-oid="p:q:200" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-oid="dm2g9fm" />
              </svg>
              Profile Settings
            </Link>
          </header>

          {/* Tabs Component */}
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab}>
            {renderTabContent()}
          </ProfileTabs>
        </div>
      </div>
    </div>
  );
}
