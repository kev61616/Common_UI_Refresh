'use client'

import { useState, useEffect, useMemo } from 'react'
import { mockPracticeSets } from '@/lib/mockData'
import { UpcomingTests } from './UpcomingTests'
import { SkillsRadarChart } from './SkillsRadarChart'
import { WeakAreasFocus } from './WeakAreasFocus'
import { StudyStreak } from './StudyStreak'
import { RecommendedActions } from './RecommendedActions'
import { PerformanceInsights } from './PerformanceInsights'
import { DashboardCard } from './DashboardCard'
import Link from 'next/link'

// Mock stats to avoid hydration mismatches
const mockStats = {
  overallProgress: 76,
  readingProgress: 82,
  writingProgress: 70,
  mathProgress: 78,
  practiceSets: 12,
  questions: 240,
  studyHours: 48
};

export function Dashboard() {
  const [animatedCount, setAnimatedCount] = useState({ sets: 0, questions: 0, hours: 0 })
  
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
  
  // Animate count up effect for stats
  useEffect(() => {
    const duration = 2000; // ms
    const steps = 30;
    const increment = {
      sets: Math.ceil(mockStats.practiceSets / steps),
      questions: Math.ceil(mockStats.questions / steps),
      hours: Math.ceil(mockStats.studyHours / steps)
    };
    
    let step = 0;
    const interval = setInterval(() => {
      if (step >= steps) {
        setAnimatedCount({
          sets: mockStats.practiceSets,
          questions: mockStats.questions,
          hours: mockStats.studyHours
        });
        clearInterval(interval);
        return;
      }
      
      setAnimatedCount(prev => ({
        sets: Math.min(prev.sets + increment.sets, mockStats.practiceSets),
        questions: Math.min(prev.questions + increment.questions, mockStats.questions),
        hours: Math.min(prev.hours + increment.hours, mockStats.studyHours)
      }));
      
      step++;
    }, duration / steps);
    
    return () => clearInterval(interval);
  }, []);
  
  // Icons for dashboard cards
  const cardIcons = {
    studyStreak: (
      <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    skillsRadar: (
      <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    focusAreas: (
      <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    upcomingTests: (
      <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    recommendedActions: (
      <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    performanceInsights: (
      <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  };
  
  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 dark:bg-slate-900">
      {/* Max width container */}
      <div className="max-w-[1600px] w-full mx-auto">
        {/* Welcome banner with card style */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm mb-6 overflow-hidden">
          {/* Header */}
          <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Welcome back, Student!</h2>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
              {daysLeft} days until exam
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1">
                <div className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  You're making great progress on your SAT preparation! Continue with your study plan to maintain your improvement trajectory.
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Link 
                    href="/question-bank/practice"
                    className="inline-flex items-center px-4 py-2 text-sm bg-indigo-600 text-white font-medium rounded-lg shadow-sm transition-all hover:bg-indigo-700"
                  >
                    <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Practice Questions
                  </Link>
                  <Link 
                    href="/test/mock"
                    className="inline-flex items-center px-4 py-2 text-sm bg-white text-indigo-700 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-indigo-300 font-medium rounded-lg shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-600"
                  >
                    <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Take Full Test
                  </Link>
                </div>
              </div>
              
              {/* Progress Circle */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                  <svg className="w-full h-full" viewBox="0 0 120 120">
                    {/* Background circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="8"
                      className="dark:stroke-slate-700"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="8"
                      strokeDasharray="339.3"
                      strokeDashoffset={339.3 * (1 - 0.65)} // 65% complete
                      transform="rotate(-90 60 60)"
                      className="dark:stroke-indigo-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">65%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Ready</div>
                  </div>
                </div>
                <Link
                  href="/test/prep"
                  className="mt-2 py-1.5 px-3 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
                >
                  View Test Plan
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-700 pt-6">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-white">{animatedCount.sets}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Practice Sets</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-white">{animatedCount.questions}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Questions</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-slate-800 dark:text-white">{animatedCount.hours}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Study Hours</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dashboard Controls */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-slate-900 dark:text-white">Your Dashboard</h2>
          <button 
            className="flex items-center text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            onClick={() => {
              if (typeof window !== 'undefined') {
                // Reset layout
                localStorage.removeItem('dashboardLayout')
                window.location.reload()
              }
            }}
          >
            <svg className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Layout
          </button>
        </div>
        
        {/* Responsive Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4 dashboard-cards">
          <DashboardCard id="studyStreak" title="Study Streak" icon={cardIcons.studyStreak} className="h-full">
            <StudyStreak currentStreak={5} longestStreak={14} />
          </DashboardCard>
          
          <DashboardCard id="skillsRadar" title="Skills Breakdown" icon={cardIcons.skillsRadar} className="h-full">
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
          
          <DashboardCard id="focusAreas" title="Focus Areas" icon={cardIcons.focusAreas} className="h-full md:col-span-2">
            <WeakAreasFocus practiceSets={mockPracticeSets} />
          </DashboardCard>
          
          <DashboardCard id="performanceInsights" title="Performance Insights" icon={cardIcons.performanceInsights} className="h-full md:col-span-2">
            <PerformanceInsights practiceSets={mockPracticeSets} />
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}
