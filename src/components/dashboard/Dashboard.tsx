'use client'

import { useMemo } from 'react'
import { mockPracticeSets } from '@/lib/mockData'
import { ProgressCard } from './ProgressCard'
import { PerformanceChart } from './PerformanceChart'
import { RecentActivity } from './RecentActivity'
import { StudyAdvice } from './StudyAdvice'
import { UpcomingTests } from './UpcomingTests'
import { StudySchedule } from './StudySchedule'
import { PerformanceInsights } from './PerformanceInsights'
import { ActivityTimeline } from './ActivityTimeline'
import { SkillsRadarChart } from './SkillsRadarChart'
import { WeakAreasFocus } from './WeakAreasFocus'
import { StudyStreak } from './StudyStreak'
import { PracticeRecommendations } from './PracticeRecommendations'
import { ScoreProjection } from './ScoreProjection'

// Calculate overall stats for the dashboard
function calculateStats() {
  if (mockPracticeSets.length === 0) {
    return {
      overallProgress: 0,
      readingProgress: 0,
      writingProgress: 0, 
      mathProgress: 0
    }
  }
  
  // Overall average accuracy
  const overallProgress = Math.round(
    mockPracticeSets.reduce((sum, set) => sum + set.accuracy, 0) / mockPracticeSets.length
  )
  
  // Subject-specific progress
  const subjects = ['Reading', 'Writing', 'Math']
  const subjectProgress = subjects.map(subject => {
    const subjectSets = mockPracticeSets.filter(set => set.subject === subject)
    if (subjectSets.length === 0) return { subject, progress: 0 }
    
    return {
      subject,
      progress: Math.round(
        subjectSets.reduce((sum, set) => sum + set.accuracy, 0) / subjectSets.length
      )
    }
  })
  
  return {
    overallProgress,
    readingProgress: subjectProgress.find(item => item.subject === 'Reading')?.progress || 0,
    writingProgress: subjectProgress.find(item => item.subject === 'Writing')?.progress || 0,
    mathProgress: subjectProgress.find(item => item.subject === 'Math')?.progress || 0
  }
}

export function Dashboard() {
  // Get stats for progress cards
  const { overallProgress, readingProgress, writingProgress, mathProgress } = calculateStats()
  
  // Icon components for cards
  const icons = {
    overall: (
      <svg className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    reading: (
      <svg className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    writing: (
      <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    math: (
      <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  }
  
  // Calculate test date
  const testDate = useMemo(() => {
    const today = new Date();
    // Set test date to be 45 days from now
    const testDay = new Date(today);
    testDay.setDate(today.getDate() + 45);
    return testDay;
  }, []);
  
  // Calculate days left
  const daysLeft = useMemo(() => {
    const today = new Date();
    const diffTime = Math.abs(testDate.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [testDate]);
  
  return (
    <div className="py-8 px-4 sm:px-6 md:px-8">
      {/* Header and countdown section */}
      <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg overflow-hidden">
        <div className="px-6 py-6 sm:px-8 sm:py-8 lg:flex lg:items-center lg:justify-between">
          <div className="lg:max-w-2xl">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-xl shadow mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                BrainBox SAT Dashboard
              </h1>
            </div>
            <p className="mt-2 text-xl text-indigo-100">
              Your comprehensive hub for SAT preparation and performance tracking.
            </p>
            <p className="mt-1 text-indigo-200">
              Track your progress, analyze performance patterns, and receive personalized recommendations.
            </p>
          </div>
          
          {/* Countdown timer */}
          <div className="mt-6 lg:mt-0">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-4 sm:p-5">
              <div className="text-center">
                <h3 className="text-sm font-medium text-indigo-100">Official SAT Exam</h3>
                <div className="mt-2 text-3xl font-extrabold text-white">{daysLeft} days</div>
                <p className="mt-1 text-sm text-indigo-200">
                  {testDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                <div className="mt-3">
                  <a
                    href="/test-prep"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-indigo-600"
                  >
                    View Test Prep Plan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Stats Banner */}
        <div className="bg-indigo-800 bg-opacity-50 py-4 px-6 sm:px-8">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-5">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{mockPracticeSets.length}</div>
              <div className="text-xs text-indigo-200">Practice Sets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{Math.floor(mockPracticeSets.reduce((total, set) => total + set.questions.length, 0))}</div>
              <div className="text-xs text-indigo-200">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{overallProgress}%</div>
              <div className="text-xs text-indigo-200">Avg. Score</div>
            </div>
            <div className="hidden md:block text-center">
              <div className="text-2xl font-bold text-white">{Math.floor(mockPracticeSets.reduce((hours, set) => hours + (set.timeUsed / 3600), 0))}</div>
              <div className="text-xs text-indigo-200">Study Hours</div>
            </div>
            <div className="hidden md:block text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(mockPracticeSets.reduce((acc, set) => acc + set.accuracy, 0) / mockPracticeSets.length) >= 70 ? 'On Track' : 'Needs Focus'}
              </div>
              <div className="text-xs text-indigo-200">Status</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ProgressCard
          title="Overall Progress" 
          percentage={overallProgress}
          color="text-indigo-500"
          icon={icons.overall}
          subtitle="Average performance across all subjects"
        />
        <ProgressCard
          title="Reading" 
          percentage={readingProgress}
          color="text-sky-500"
          icon={icons.reading}
          subtitle="Reading comprehension and analysis"
        />
        <ProgressCard
          title="Writing" 
          percentage={writingProgress}
          color="text-purple-500"
          icon={icons.writing}
          subtitle="Grammar and composition skills"
        />
        <ProgressCard
          title="Math" 
          percentage={mathProgress}
          color="text-blue-500"
          icon={icons.math}
          subtitle="Problem-solving and quantitative reasoning"
        />
      </div>
      
      {/* Main dashboard content - layout with advanced components */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* First column */}
        <div className="xl:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Performance insights */}
            <div className="lg:col-span-2">
              <PerformanceInsights practiceSets={mockPracticeSets} />
            </div>
            {/* Score projection */}
            <div>
              <ScoreProjection practiceSets={mockPracticeSets} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Timeline */}
            <div className="lg:col-span-2">
              <ActivityTimeline practiceSets={mockPracticeSets} />
            </div>
            {/* Study Streak */}
            <div>
              <StudyStreak practiceSets={mockPracticeSets} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Radar chart */}
            <div>
              <SkillsRadarChart practiceSets={mockPracticeSets} />
            </div>
            {/* Weak areas focus */}
            <div>
              <WeakAreasFocus practiceSets={mockPracticeSets} />
            </div>
          </div>
        </div>
        
        {/* Second column - sidebar */}
        <div className="space-y-6">
          {/* Practice recommendations */}
          <PracticeRecommendations practiceSets={mockPracticeSets} />
          
          {/* Recent Activity */}
          <RecentActivity practiceSets={mockPracticeSets} />
          
          {/* Upcoming Tests */}
          <UpcomingTests />
          
          {/* Study Schedule */}
          <StudySchedule />
        </div>
      </div>
    </div>
  )
}
