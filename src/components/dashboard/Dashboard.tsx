'use client'

import { useMemo } from 'react' // Removed useState, useEffect as animation is moved
// import { mockPracticeSets } from '@/lib/mockData' // Not needed directly here anymore
import { UpcomingTests } from './UpcomingTests' // Keep existing imports
import { SkillsRadarChart } from './SkillsRadarChart'
import { StudyStreak } from './StudyStreak'
import { RecommendedActions } from './RecommendedActions'
import { DashboardCard } from './DashboardCard'
import Link from 'next/link'
import { WelcomeBanner } from './WelcomeBanner' // Import new component
import { RecentProgressCard } from './RecentProgressCard' // Import new component
// Removed Typography import
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Button } from '@/components/catalyst/button' // Use Catalyst Button
import { RefreshCw, Flame, Radar, Zap, CalendarDays, ListChecks, BarChartBig } from 'lucide-react' // Import Lucide icons

// Mock stats - keep here for now, ideally fetch or pass as props
const mockStats = {
  overallProgress: 76,
  readingProgress: 82,
  writingProgress: 70,
  mathProgress: 78,
  practiceSets: 12,
  questions: 240,
  studyHours: 48
};

// Mock data for RecentProgressCard - keep here for now
// TODO: Fetch real data or pass as props
// TODO: Move icons to central Icon component
function ReadingIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
 return (
     <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
     </svg>
 )
}
function WritingIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
 return (
     <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
     </svg>
 )
}
function MathIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
 return (
     <svg className="w-5 h-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
     </svg>
 )
}

const recentProgressData = [
   { name: 'Reading', value: 82, change: 5, icon: ReadingIcon, bgColorClass: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20', iconBgClass: 'bg-blue-100 dark:bg-blue-800/30', iconColorClass: 'text-blue-600 dark:text-blue-400' },
   { name: 'Writing', value: 70, change: 8, icon: WritingIcon, bgColorClass: 'from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20', iconBgClass: 'bg-purple-100 dark:bg-purple-800/30', iconColorClass: 'text-purple-600 dark:text-purple-400' },
   { name: 'Math', value: 78, change: 3, icon: MathIcon, bgColorClass: 'from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20', iconBgClass: 'bg-teal-100 dark:bg-teal-800/30', iconColorClass: 'text-teal-600 dark:text-teal-400' },
];


export function Dashboard() {
  // Removed animatedCount state and useEffect (moved to WelcomeBanner)

  // Calculate test date - keep calculation here or move to a hook/util
  const testDate = useMemo(() => {
    const today = new Date();
    const testDay = new Date(today);
    testDay.setDate(today.getDate() + 45); // 45 days from now
    return testDay;
  }, []);

  // Calculate days left - keep calculation here or move to a hook/util
  const daysLeft = useMemo(() => {
    const today = new Date();
    const diffTime = Math.abs(testDate.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [testDate]);

  // Icons for dashboard cards - Use Lucide icons
  const cardIcons = {
    studyStreak: <Flame className="size-4 text-orange-500" />,
    skillsRadar: <Radar className="size-4 text-indigo-500" />,
    focusAreas: <Zap className="size-4 text-indigo-500" />, // Consider if Zap is appropriate
    upcomingTests: <CalendarDays className="size-4 text-indigo-500" />,
    recommendedActions: <ListChecks className="size-4 text-indigo-500" />,
    performanceInsights: <BarChartBig className="size-4 text-indigo-500" />, // Used skillsRadar icon before, changing to BarChartBig
  };
  return (
    // Use semantic bg-background, standard padding from spacing scale
    <div className="p-6 md:p-8 bg-background">
      {/* Max width container */}
      <div className="max-w-[1600px] w-full mx-auto">
        {/* Render Welcome Banner */}
        <WelcomeBanner stats={mockStats} daysLeft={daysLeft} />

        {/* Dashboard Controls */}
        <div className="flex justify-between items-center mb-4"> {/* Use spacing scale: mb-4 */}
           {/* Use Catalyst Heading */}
          <Heading level={2} className="text-2xl font-semibold dark:text-white">Your Dashboard</Heading> {/* Adjust level/styling */}
           {/* Use Catalyst Button */}
          <Button
            plain // Use plain style for subtle button
            className="text-xs" // Adjust size
            onClick={() => {
              if (typeof window !== 'undefined') {
                // Reset layout
                localStorage.removeItem('dashboardLayout')
                window.location.reload()
              }
            }}
          >
            <RefreshCw className="size-3.5 mr-1" /> {/* Use Lucide icon */}
            Reset Layout
          </Button>
        </div>

        {/* Responsive Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto_auto] gap-4 dashboard-cards"> {/* Use spacing scale: gap-4 */}
          {/* Pass Lucide icons directly */}
          <DashboardCard id="studyStreak" title="Study Streak" icon={cardIcons.studyStreak} className="h-full md:row-span-2">
            <StudyStreak currentStreak={5} longestStreak={14} />
          </DashboardCard>

          <DashboardCard id="skillsRadar" title="Skills Breakdown" icon={cardIcons.skillsRadar} className="h-full md:row-span-2">
            <SkillsRadarChart 
              skills={[
                { name: 'Reading', value: 78, color: '#3b82f6' },
                { name: 'Writing', value: 65, color: '#8b5cf6' },
                { name: 'Algebra', value: 82, color: '#06b6d4' },
                { name: 'Geometry', value: 70, color: '#10b981' },
                { name: 'Data Analysis', value: 55, color: '#f59e0b' },
                { name: 'Critical Thinking', value: 75, color: '#ef4444' },
              ]}
            />
          </DashboardCard>

          <DashboardCard id="upcomingTests" title="Upcoming Tests" icon={cardIcons.upcomingTests} className="h-full">
             <UpcomingTests />
          </DashboardCard>

          <DashboardCard id="recommendedActions" title="Recommended Actions" icon={cardIcons.recommendedActions} className="h-full">
             <RecommendedActions />
          </DashboardCard>

          {/* Render RecentProgressCard component - Note: This card used skillsRadar icon before, maybe intended? Using performanceInsights icon now. */}
          <DashboardCard id="recentProgress" title="Recent Progress" icon={cardIcons.performanceInsights} className="h-full md:col-span-2">
             <RecentProgressCard progressData={recentProgressData} />
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}
