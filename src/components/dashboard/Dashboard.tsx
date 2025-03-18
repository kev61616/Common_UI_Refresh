'use client'

import { mockPracticeSets } from '@/lib/mockData'
import { ProgressCard } from './ProgressCard'
import { PerformanceChart } from './PerformanceChart'
import { RecentActivity } from './RecentActivity'
import { StudyAdvice } from './StudyAdvice'
import { UpcomingTests } from './UpcomingTests'
import { StudySchedule } from './StudySchedule'
import { PerformanceInsights } from './PerformanceInsights'

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
  
  // Icon components for cards (using emojis for simplicity)
  const icons = {
    overall: <span className="text-xl">📊</span>,
    reading: <span className="text-xl">📚</span>,
    writing: <span className="text-xl">✏️</span>,
    math: <span className="text-xl">🔢</span>
  }
  
  return (
    <div className="py-8 px-4 sm:px-6 md:px-8">
      {/* Welcome message with BrainBox SAT branding */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center mb-4">
          <div className="mr-4 p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">BrainBox SAT</span> Dashboard
          </h1>
        </div>
        <p className="mt-3 text-xl text-slate-600 dark:text-slate-300">
          Your comprehensive hub for SAT preparation. Track progress, analyze performance, and get personalized recommendations.
        </p>
        
        {/* Quick Stats Banner */}
        <div className="mt-6 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 p-4 rounded-lg border border-slate-100 dark:border-slate-600 shadow-sm">
          <div className="grid grid-cols-3 gap-3 divide-x divide-slate-200 dark:divide-slate-600">
            <div className="px-2 text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{mockPracticeSets.length}</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">Practice Sets</div>
            </div>
            <div className="px-2 text-center">
              <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">{Math.floor(mockPracticeSets.reduce((total, set) => total + set.questions.length, 0) / mockPracticeSets.length)}</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">Avg. Questions</div>
            </div>
            <div className="px-2 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{overallProgress}%</div>
              <div className="text-xs text-slate-600 dark:text-slate-300">Average Score</div>
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
        />
        <ProgressCard
          title="Writing" 
          percentage={writingProgress}
          color="text-purple-500"
          icon={icons.writing}
        />
        <ProgressCard
          title="Math" 
          percentage={mathProgress}
          color="text-blue-500"
          icon={icons.math}
        />
      </div>
      
      {/* Main dashboard content - 3 column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Performance data */}
        <div className="space-y-6">
          <PerformanceInsights practiceSets={mockPracticeSets} />
          <RecentActivity practiceSets={mockPracticeSets} />
        </div>
        
        {/* Middle column - Charts and advice */}
        <div className="space-y-6">
          <PerformanceChart practiceSets={mockPracticeSets} />
          <StudyAdvice practiceSets={mockPracticeSets} />
        </div>
        
        {/* Right column - Schedule and upcoming tests */}
        <div className="space-y-6">
          <UpcomingTests />
          <StudySchedule />
        </div>
      </div>
    </div>
  )
}
