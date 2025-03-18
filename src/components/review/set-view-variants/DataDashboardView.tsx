'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from './types'

export const DataDashboardView: React.FC<SetViewProps> = ({ 
  sets, 
  selectedSetId, 
  onSelectSet, 
  isLoading = false 
}) => {
  const [mounted, setMounted] = useState(false)
  const [activeView, setActiveView] = useState<'grid' | 'stats'>('grid')
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted || isLoading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin"></div>
      </div>
    )
  }
  
  if (!sets || sets.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
        <p className="text-slate-500 dark:text-slate-400">No practice sets available</p>
      </div>
    )
  }
  
  // Calculate overall performance metrics
  const calculateMetrics = () => {
    // Group by subject
    const subjectGroups: Record<string, any[]> = {}
    sets.forEach(set => {
      const subject = set.subject || 'Other'
      if (!subjectGroups[subject]) subjectGroups[subject] = []
      subjectGroups[subject].push(set)
    })
    
    // Calculate average accuracy by subject
    const subjectAccuracy: Record<string, number> = {}
    Object.entries(subjectGroups).forEach(([subject, subjectSets]) => {
      const totalAccuracy = subjectSets.reduce((sum, set) => sum + (set.accuracy || 0), 0)
      subjectAccuracy[subject] = Math.round(totalAccuracy / subjectSets.length)
    })
    
    // Find top performer and area for improvement
    const topSubject = Object.entries(subjectAccuracy).sort(([,a], [,b]) => b - a)[0]?.[0] || ''
    const improvementSubject = Object.entries(subjectAccuracy).sort(([,a], [,b]) => a - b)[0]?.[0] || ''
    
    // Calculate trends
    const timeBasedSets = [...sets].sort((a, b) => 
      new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime()
    )
    
    const trendData = []
    if (timeBasedSets.length >= 2) {
      const firstAccuracy = timeBasedSets[0].accuracy || 0
      const lastAccuracy = timeBasedSets[timeBasedSets.length - 1].accuracy || 0
      const trend = lastAccuracy - firstAccuracy
      trendData.push({
        name: 'Overall Trend',
        change: trend,
        direction: trend >= 0 ? 'positive' : 'negative',
        value: `${trend >= 0 ? '+' : ''}${trend}%`
      })
    }
    
    return {
      overallAccuracy: Math.round(sets.reduce((sum, set) => sum + (set.accuracy || 0), 0) / sets.length),
      subjectAccuracy,
      topSubject,
      improvementSubject,
      totalSets: sets.length,
      totalQuestions: sets.reduce((sum, set) => sum + (set.questions?.length || 0), 0),
      trendData,
      subjectGroups
    }
  }
  
  const metrics = calculateMetrics()
  
  // Get colors for a subject
  const getSubjectColors = (subject: string) => {
    switch (subject) {
      case 'Math':
        return {
          primary: 'bg-blue-500',
          secondary: 'bg-blue-200 dark:bg-blue-800',
          text: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-500',
          graph: 'text-blue-500'
        }
      case 'Reading':
        return {
          primary: 'bg-emerald-500',
          secondary: 'bg-emerald-200 dark:bg-emerald-800',
          text: 'text-emerald-600 dark:text-emerald-400',
          border: 'border-emerald-500',
          graph: 'text-emerald-500'
        }
      case 'Writing':
        return {
          primary: 'bg-amber-500',
          secondary: 'bg-amber-200 dark:bg-amber-800',
          text: 'text-amber-600 dark:text-amber-400',
          border: 'border-amber-500',
          graph: 'text-amber-500'
        }
      default:
        return {
          primary: 'bg-purple-500',
          secondary: 'bg-purple-200 dark:bg-purple-800',
          text: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-500',
          graph: 'text-purple-500'
        }
    }
  }
  
  // Render a miniature bar chart for a set
  const renderMiniBarChart = (set: any) => {
    const colors = getSubjectColors(set.subject)
    
    return (
      <div className="flex items-end h-10 space-x-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const height = 20 + Math.random() * 80
          const isHighlighted = (i / 4) * 100 <= set.accuracy
          
          return (
            <div 
              key={i}
              className={`w-1 ${isHighlighted ? colors.primary : 'bg-gray-300 dark:bg-gray-700'}`}
              style={{ height: `${height}%` }}
            ></div>
          )
        })}
      </div>
    )
  }
  
  // Render a data card for a set
  const renderSetCard = (set: any) => {
    const isSelected = set.id === selectedSetId
    const colors = getSubjectColors(set.subject)
    const date = new Date(set.dateCompleted)
    
    return (
      <div 
        className={`
          relative border rounded-lg overflow-hidden transition-all duration-300
          ${isSelected ? 'shadow-lg ring-2 ring-blue-500 dark:ring-blue-400 scale-[1.02]' : 'hover:shadow-md hover:scale-[1.01]'}
          cursor-pointer bg-white dark:bg-gray-800
        `}
        onClick={() => onSelectSet(set.id)}
      >
        {/* Header with type/subject */}
        <div className={`${colors.secondary} px-3 py-2 flex justify-between items-center`}>
          <div className="font-medium text-sm">{set.subject}</div>
          <div className={`${colors.primary} text-white px-2 py-0.5 rounded-full text-xs`}>
            {set.accuracy}%
          </div>
        </div>
        
        {/* Content */}
        <div className="p-3">
          <div className="mb-2">
            <h3 className="font-bold text-sm line-clamp-1">{set.type}</h3>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {date.toLocaleDateString()}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded p-1.5">
              <div className="text-xs text-gray-500 dark:text-gray-400">Questions</div>
              <div className="font-medium">{set.questions?.length || 0}</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded p-1.5">
              <div className="text-xs text-gray-500 dark:text-gray-400">Difficulty</div>
              <div className="font-medium">{set.difficulty || 'Medium'}</div>
            </div>
          </div>
          
          {/* Mini visualization */}
          <div className="mt-2">
            {renderMiniBarChart(set)}
          </div>
        </div>
      </div>
    )
  }
  
  // Render the main stats dashboard view
  const renderStatsDashboard = () => {
    return (
      <div className="space-y-6">
        {/* Overall metrics row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Overall accuracy */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg p-4">
            <div className="text-sm font-medium">Overall Accuracy</div>
            <div className="text-3xl font-bold mt-1">{metrics.overallAccuracy}%</div>
            
            <div className="flex items-center mt-3 text-xs">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none">
                <path d="M12 8L18 14H6L12 8Z" fill="currentColor" />
              </svg>
              <span>Across {metrics.totalSets} sets</span>
            </div>
          </div>
          
          {/* Sets completed */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-sm font-medium">Sets Completed</div>
            <div className="text-3xl font-bold mt-1">{metrics.totalSets}</div>
            
            <div className="flex items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Total sets tracked</span>
            </div>
          </div>
          
          {/* Total questions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="text-sm font-medium">Total Questions</div>
            <div className="text-3xl font-bold mt-1">{metrics.totalQuestions}</div>
            
            <div className="flex items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Across all practice sets</span>
            </div>
          </div>
        </div>
        
        {/* Subject breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h3 className="font-bold text-lg mb-4">Subject Performance</h3>
          
          <div className="space-y-4">
            {Object.entries(metrics.subjectAccuracy).map(([subject, accuracy]) => {
              const colors = getSubjectColors(subject)
              const subjectSets = metrics.subjectGroups[subject] || []
              
              return (
                <div key={subject}>
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${colors.primary} mr-2`}></div>
                      <span className="font-medium">{subject}</span>
                    </div>
                    <div className="text-sm">{accuracy}%</div>
                  </div>
                  
                  <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full ${colors.primary}`}
                      style={{ width: `${accuracy}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {subjectSets.length} {subjectSets.length === 1 ? 'set' : 'sets'} • 
                    {subjectSets.reduce((sum, set) => sum + (set.questions?.length || 0), 0)} questions
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Insights */}
        <div className="grid grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <h3 className="font-bold mb-3">Top Performer</h3>
            {metrics.topSubject && (
              <div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${getSubjectColors(metrics.topSubject).primary} mr-2`}></div>
                  <span className="font-medium">{metrics.topSubject}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your strongest performance is in {metrics.topSubject} with an average accuracy of 
                  {metrics.subjectAccuracy[metrics.topSubject]}%.
                </div>
              </div>
            )}
          </div>
          
          {/* Areas for improvement */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
            <h3 className="font-bold mb-3">Room for Improvement</h3>
            {metrics.improvementSubject && (
              <div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${getSubjectColors(metrics.improvementSubject).primary} mr-2`}></div>
                  <span className="font-medium">{metrics.improvementSubject}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Focus more practice on {metrics.improvementSubject} to improve your current 
                  {metrics.subjectAccuracy[metrics.improvementSubject]}% accuracy.
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Recent sets */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Recent Sets</h3>
            <button 
              onClick={() => setActiveView('grid')}
              className="text-sm text-blue-500 dark:text-blue-400"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-2">
            {sets.slice(0, 3).map(set => {
              const colors = getSubjectColors(set.subject)
              
              return (
                <div 
                  key={set.id}
                  className={`flex items-center border-l-4 ${colors.border} p-2 bg-gray-50 dark:bg-gray-700/30 rounded-r cursor-pointer ${
                    set.id === selectedSetId ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => onSelectSet(set.id)}
                >
                  <div className="flex-1">
                    <div className="font-medium">{set.type}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {set.subject} • {new Date(set.dateCompleted).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`${colors.text} font-bold`}>
                    {set.accuracy}%
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
  
  // Render the grid view of all sets
  const renderGridView = () => {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sets.map(set => renderSetCard(set))}
        </div>
      </div>
    )
  }
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow">
      {/* Header with view toggles */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Data Dashboard</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-full p-0.5 shadow flex">
          <button 
            onClick={() => setActiveView('grid')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeView === 'grid' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Grid View
          </button>
          <button 
            onClick={() => setActiveView('stats')}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeView === 'stats' 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Stats View
          </button>
        </div>
      </div>
      
      {/* Main content area that changes based on selected view */}
      {activeView === 'grid' ? renderGridView() : renderStatsDashboard()}
    </div>
  )
}