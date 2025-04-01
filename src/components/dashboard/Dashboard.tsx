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
// Mock stats to avoid hydration mismatches with calculations
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
  // Use static values to avoid hydration mismatches
  const { overallProgress, readingProgress, writingProgress, mathProgress } = mockStats;
  
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
    <div className="py-8 px-4 sm:px-6 md:px-8 dark:bg-slate-900">
      {/* Beautiful Dashboard Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Your Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Track your progress and upcoming exams
            </p>
          </div>
          
          {/* Countdown card */}
          <div className="flex items-center px-4 py-2 bg-white dark:bg-slate-800 shadow-md rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="mr-3">
              <svg className="h-7 w-7 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-slate-500 dark:text-slate-400">SAT Exam</div>
              <div className="flex items-center">
                <span className="text-xl font-bold text-slate-900 dark:text-white">{daysLeft}</span>
                <span className="ml-1 text-slate-600 dark:text-slate-300">days left</span>
              </div>
            </div>
            <div className="ml-4">
              <a
                href="/test-prep"
                className="text-xs inline-flex items-center justify-center px-3 py-1.5 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Prep Plan
              </a>
            </div>
          </div>
        </div>
        
        {/* Stats cards - sleek design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Practice Sets</div>
                <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{mockStats.practiceSets}</div>
              </div>
              <div className="p-2 bg-sky-50 dark:bg-sky-900/30 rounded-lg">
                <svg className="h-5 w-5 text-sky-500 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Questions</div>
                <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{mockStats.questions}</div>
              </div>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <svg className="h-5 w-5 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Avg. Score</div>
                <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{overallProgress}%</div>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <svg className="h-5 w-5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">Study Hours</div>
                <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{mockStats.studyHours}</div>
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <svg className="h-5 w-5 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
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
      
      {/* Main dashboard content */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      {/* Today's Greeting - Improved Design */}
      <div className="xl:col-span-4">
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-800 text-white rounded-2xl p-8 mb-6 shadow-lg relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-3">Welcome back, Student!</h2>
            <p className="opacity-90 mb-6 text-lg">You have completed <span className="font-bold text-cyan-300">{mockStats.practiceSets}</span> practice sets so far. Your consistent study habits are setting you up for success!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
                <span className="text-cyan-300 text-xl font-bold">{mockStats.questions}</span>
                <span className="text-white/80 text-sm">Questions Answered</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
                <span className="text-cyan-300 text-xl font-bold">{overallProgress}%</span>
                <span className="text-white/80 text-sm">Average Score</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center">
                <span className="text-cyan-300 text-xl font-bold">{mockStats.studyHours}h</span>
                <span className="text-white/80 text-sm">Study Time</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="/question-bank/examtypes" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-blue-900 bg-white hover:bg-blue-50 transition-colors shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Practice Questions
              </a>
              <a href="/question-bank/practice/binomials" className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-sm font-medium rounded-lg text-white hover:bg-white/10 transition-colors shadow-inner shadow-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Take Full Test
              </a>
              <a href="/review/matrix" className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-sm font-medium rounded-lg text-white hover:bg-white/10 transition-colors shadow-inner shadow-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Progress Matrix
              </a>
            </div>
          </div>
        </div>
      </div>
      
        {/* First column */}
        <div className="xl:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Performance insights */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-medium text-slate-900 dark:text-white">Performance Insights</h3>
                </div>
                <div className="p-6">
                  <div className="h-64 flex items-center justify-center">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="text-lg font-medium text-slate-900 dark:text-white mb-2">Performance Trend</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">Last 30 days</div>
                      <div className="w-full h-40 flex items-end justify-between px-4">
                        {[65, 72, 68, 74, 78, 76].map((height, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div 
                              className="w-8 bg-indigo-500 dark:bg-indigo-400 rounded-t" 
                              style={{ height: `${height}%` }}
                            ></div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                              {i + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Score projection */}
            <div>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-full">
                <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-medium text-slate-900 dark:text-white">Score Projection</h3>
                </div>
                <div className="p-5">
                  <div className="relative h-64">
                    <div className="absolute inset-0 flex flex-col">
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">76%</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">Current Score</div>
                      </div>
                      <div className="flex-1 relative">
                        <div className="absolute left-0 right-0 border-t-2 border-dashed border-indigo-500 dark:border-indigo-400" style={{bottom: "85%"}}>
                          <div className="absolute -top-7 right-0 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded text-xs">
                            Goal: 85%
                          </div>
                        </div>
                        <div className="h-full w-full flex items-end">
                          <div className="w-full flex justify-around items-end">
                            <div className="flex flex-col items-center">
                              <div className="bg-indigo-500 dark:bg-indigo-400 w-4 h-40 rounded-t"></div>
                              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Current</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="bg-green-500 dark:bg-green-400 w-4 h-48 rounded-t"></div>
                              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Predicted</div>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="bg-blue-500 dark:bg-blue-400 w-4 h-52 rounded-t"></div>
                              <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Goal</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Activity Timeline */}
            <div>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-full">
                <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-medium text-slate-900 dark:text-white">Recent Activity</h3>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                          {item}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">Completed Practice Set #{item}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">3 days ago • 85% score</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Weak Areas */}
            <div>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-full">
                <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-medium text-slate-900 dark:text-white">Focus Areas</h3>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    {['Algebraic Expressions', 'Data Analysis', 'Reading Comprehension'].map((area, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                          <div 
                            className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full" 
                            style={{width: `${60 - (index * 12)}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white w-24">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Second column - sidebar */}
        <div className="space-y-6">
          {/* Upcoming test */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-medium text-slate-900 dark:text-white">Upcoming Tests</h3>
            </div>
            <div className="p-5">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-indigo-700 dark:text-indigo-300">SAT Exam</div>
                  <div className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 rounded">{daysLeft} days</div>
                </div>
                <div className="text-sm text-indigo-600/80 dark:text-indigo-400/80 mb-3">May 3, 2025</div>
                <div className="w-full bg-white dark:bg-slate-700 rounded-full h-1.5 mb-1">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{width: '65%'}}></div>
                </div>
                <div className="text-xs text-indigo-600/80 dark:text-indigo-400/80">65% ready</div>
              </div>
            </div>
          </div>
          
          {/* Study schedule */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-medium text-slate-900 dark:text-white">Today's Schedule</h3>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Reading Practice</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">9:00 AM - 10:30 AM</div>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1.5"></div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">Math Review</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">1:00 PM - 2:30 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional dashboard components */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Study Streak component */}
        <StudyStreak currentStreak={5} longestStreak={14} />
        
        {/* Skills Radar Chart */}
        <SkillsRadarChart 
          skills={[
            { name: 'Reading', value: 78, color: '#3b82f6' },
            { name: 'Writing', value: 65, color: '#8b5cf6' },
            { name: 'Algebra', value: 82, color: '#06b6d4' },
            { name: 'Geometry', value: 70, color: '#10b981' },
            { name: 'Data Analysis', value: 55, color: '#f59e0b' },
            { name: 'Critical Thinking', value: 75, color: '#ef4444' },
          ]}
          title="Skills Breakdown"
        />
      </div>
    </div>
  )
}
