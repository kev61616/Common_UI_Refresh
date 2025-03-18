'use client'

import { useState } from 'react'
import { QuestionViewProps } from './types'

/**
 * DiagnosticDashboardView - A comprehensive dashboard showing performance metrics across question types
 * Displays statistics, charts, and trending data to give a complete picture of performance
 */
export function DiagnosticDashboardView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  const [selectedMetric, setSelectedMetric] = useState<'accuracy' | 'time' | 'mistakes'>('accuracy')
  
  // Calculate aggregate statistics
  const totalQuestions = practiceSets.reduce((sum, set) => sum + set.questions.length, 0)
  const avgAccuracy = practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length
  const avgTimePerQuestion = practiceSets.reduce((sum, set) => sum + (set.timeUsed / set.questions.length), 0) / practiceSets.length
  
  // Calculate per-subject metrics
  const subjectData = practiceSets.reduce((acc, set) => {
    if (!acc[set.subject]) {
      acc[set.subject] = {
        count: 0,
        totalAccuracy: 0,
        totalTime: 0,
        totalQuestions: 0,
        conceptualMistakes: 0,
        carelessMistakes: 0,
        timeManagementMistakes: 0,
      }
    }
    
    acc[set.subject].count++
    acc[set.subject].totalAccuracy += set.accuracy
    acc[set.subject].totalTime += set.timeUsed
    acc[set.subject].totalQuestions += set.questions.length
    acc[set.subject].conceptualMistakes += set.mistakeTypes.conceptual
    acc[set.subject].carelessMistakes += set.mistakeTypes.careless
    acc[set.subject].timeManagementMistakes += set.mistakeTypes.timeManagement
    
    return acc
  }, {} as Record<string, any>)
  
  // Create subject metrics
  const subjectMetrics = Object.entries(subjectData).map(([subject, data]: [string, any]) => ({
    subject,
    avgAccuracy: data.totalAccuracy / data.count,
    avgTimePerQuestion: data.totalTime / data.totalQuestions,
    conceptualMistakes: data.conceptualMistakes,
    carelessMistakes: data.carelessMistakes,
    timeManagementMistakes: data.timeManagementMistakes,
    totalQuestions: data.totalQuestions,
  }))
  
  // Calculate difficulty breakdown
  const difficultyData = practiceSets.reduce((acc, set) => {
    if (!acc[set.difficulty]) {
      acc[set.difficulty] = {
        count: 0,
        totalAccuracy: 0,
      }
    }
    
    acc[set.difficulty].count++
    acc[set.difficulty].totalAccuracy += set.accuracy
    
    return acc
  }, {} as Record<string, any>)
  
  // Create difficulty metrics
  const difficultyMetrics = Object.entries(difficultyData).map(([difficulty, data]: [string, any]) => ({
    difficulty,
    avgAccuracy: data.totalAccuracy / data.count,
    count: data.count,
  }))
  
  // Get trending data by sorting practice sets by date
  const trendingSets = [...practiceSets]
    .sort((a, b) => new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime())
    .slice(0, 5)
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">4. Diagnostic Dashboard View</h3>
      
      {/* Overall metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
          <h4 className="text-lg font-semibold text-center text-sky-600 dark:text-sky-400 mb-2">Overall Accuracy</h4>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <circle
                  className="text-slate-200 dark:text-slate-700 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                />
                <circle
                  className="text-sky-500 dark:text-sky-400 stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${avgAccuracy * 2.51}, 251`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{avgAccuracy.toFixed(1)}%</span>
              </div>
            </div>
          </div>
          <p className="text-center mt-2 text-sm text-slate-500 dark:text-slate-400">
            Across {totalQuestions} questions
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
          <h4 className="text-lg font-semibold text-center text-emerald-600 dark:text-emerald-400 mb-2">Time Per Question</h4>
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <span className="text-3xl font-bold">{avgTimePerQuestion.toFixed(1)}</span>
              <span className="text-lg ml-1">sec</span>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Average time spent per question
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
          <h4 className="text-lg font-semibold text-center text-amber-600 dark:text-amber-400 mb-2">Mistake Analysis</h4>
          <div className="flex items-center justify-center h-32">
            <div className="w-full">
              {['Conceptual', 'Careless', 'Time Management'].map((type, index) => {
                const mistakeType = type.toLowerCase().replace(' ', '') as 'conceptual' | 'careless' | 'timeManagement'
                const total = practiceSets.reduce((sum, set) => sum + set.mistakeTypes[mistakeType], 0)
                const percentage = (total / totalQuestions) * 100
                
                return (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{type}</span>
                      <span>{total} mistakes</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          index === 0 ? 'bg-red-500' : 
                          index === 1 ? 'bg-yellow-500' : 
                          'bg-orange-500'
                        }`}
                        style={{ width: `${Math.min(percentage * 5, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Metric selector */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex p-1 space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          {(
            [
              { id: 'accuracy', label: 'Accuracy' },
              { id: 'time', label: 'Time' },
              { id: 'mistakes', label: 'Mistakes' }
            ] as const
          ).map((metric) => (
            <button
              key={metric.id}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedMetric === metric.id
                  ? 'bg-white dark:bg-slate-700 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              {metric.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Subject breakdown */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4">Subject Performance</h4>
        <div className="space-y-4">
          {subjectMetrics.map((metric, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                const setOfSubject = practiceSets.find(set => set.subject === metric.subject)
                if (setOfSubject) onSelectSet(setOfSubject.id)
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">{metric.subject}</h5>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {metric.totalQuestions} questions
                </span>
              </div>
              
              {selectedMetric === 'accuracy' && (
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mb-1">
                  <div 
                    className="h-4 rounded-full bg-sky-500 dark:bg-sky-400 text-xs text-white flex items-center justify-end pr-2"
                    style={{ width: `${metric.avgAccuracy}%` }}
                  >
                    {metric.avgAccuracy.toFixed(1)}%
                  </div>
                </div>
              )}
              
              {selectedMetric === 'time' && (
                <div className="flex items-center">
                  <div className="w-12 text-right pr-2">
                    <span className="text-sm">{metric.avgTimePerQuestion.toFixed(1)}s</span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4">
                      <div 
                        className="h-4 rounded-full bg-emerald-500 dark:bg-emerald-400"
                        style={{ width: `${Math.min((metric.avgTimePerQuestion / 120) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedMetric === 'mistakes' && (
                <div className="flex justify-between text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      <span>Conceptual: {metric.conceptualMistakes}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                      <span>Careless: {metric.carelessMistakes}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                      <span>Time Management: {metric.timeManagementMistakes}</span>
                    </div>
                  </div>
                  <div className="h-16 flex items-end space-x-1">
                    {[
                      { count: metric.conceptualMistakes, color: 'bg-red-500' },
                      { count: metric.carelessMistakes, color: 'bg-yellow-500' },
                      { count: metric.timeManagementMistakes, color: 'bg-orange-500' }
                    ].map((mistake, i) => (
                      <div 
                        key={i}
                        className={`w-6 ${mistake.color} rounded-t`}
                        style={{ 
                          height: `${Math.max((mistake.count / 5) * 100, 5)}%`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Difficulty breakdown */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4">Difficulty Analysis</h4>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-end h-40 space-x-2">
            {difficultyMetrics.map((metric, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className={`w-full rounded-t transition-all cursor-pointer hover:opacity-80 ${
                    metric.difficulty === 'Easy' ? 'bg-green-500' :
                    metric.difficulty === 'Medium' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}
                  style={{ height: `${metric.avgAccuracy}%` }}
                  onClick={() => {
                    const setOfDifficulty = practiceSets.find(set => set.difficulty === metric.difficulty)
                    if (setOfDifficulty) onSelectSet(setOfDifficulty.id)
                  }}
                ></div>
                <div className="mt-2 text-center">
                  <div className="font-medium">{metric.difficulty}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{metric.avgAccuracy.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent trends */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Recent Trends</h4>
        <div className="space-y-3">
          {trendingSets.map((set, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm border-l-4 cursor-pointer hover:shadow-md transition-shadow ${
                selectedSetId === set.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' :
                set.accuracy >= 90 ? 'border-green-500' :
                set.accuracy >= 70 ? 'border-blue-500' :
                'border-orange-500'
              }`}
              onClick={() => onSelectSet && onSelectSet(set.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="font-medium">{set.subject}: {set.type}</h5>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(set.dateCompleted).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{set.accuracy}%</div>
                  <div className="text-sm">
                    {(set.timeUsed / 60).toFixed(1)} min
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
