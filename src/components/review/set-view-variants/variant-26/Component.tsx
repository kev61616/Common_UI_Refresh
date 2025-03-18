'use client'

import React, { useState, useEffect } from 'react'
import { SetViewProps } from '../types'

/**
 * Cognitive Load Analyzer
 * 
 * Primary Insight Objective: Identify when cognitive overload is occurring during 
 * practice sessions and determine optimal learning conditions to avoid it.
 * 
 * Data-to-Visual Mapping:
 * - Session duration mapped to horizontal axis (reveals temporal patterns)
 * - Performance decline mapped to slope steepness (indicates fatigue onset)
 * - Question difficulty mapped to point weight (shows impact of challenge level)
 * - Session pace mapped to background density (visualizes intensity)
 * - Subject mapped to color (enables subject-specific pattern recognition)
 * 
 * Analytical Value:
 * - Identify optimal session duration before cognitive fatigue
 * - Determine appropriate difficulty progression for different subjects
 * - Recognize personal cognitive load thresholds
 * - Support decisions about pacing and session structuring
 */
export function Component({ practiceSets, onSelectSet, selectedSetId }: SetViewProps) {
  const [cognitiveLoadData, setCognitiveLoadData] = useState<any[]>([])
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(selectedSetId)
  const [recommendations, setRecommendations] = useState<string[]>([])
  
  // Calculate cognitive load metrics for each practice set
  useEffect(() => {
    // Process each practice set to extract cognitive load metrics
    const loadMetrics = practiceSets.map(set => {
      // Get early vs late performance to measure fatigue
      const earlyAccuracy = set.sessionFatigue?.earlyAccuracy || 0
      const lateAccuracy = set.sessionFatigue?.lateAccuracy || 0
      const performanceDecline = Math.max(0, earlyAccuracy - lateAccuracy)
      
      // Calculate cognitive load score (higher = more cognitive load)
      // Factors: session duration, question count, difficulty, performance decline
      const durationFactor = set.timeUsed / 60 // convert to minutes
      const questionFactor = set.questions.length * (set.difficulty === 'Hard' ? 1.5 : set.difficulty === 'Medium' ? 1.0 : 0.7)
      const paceFactor = set.pace === 'Fast' ? 1.3 : set.pace === 'Slow' ? 0.7 : 1.0
      const fatigueFactor = performanceDecline * 0.1
      
      const cognitiveLoadScore = (durationFactor * 0.3) + 
                                (questionFactor * 0.3) + 
                                (paceFactor * 0.2) + 
                                (fatigueFactor * 0.2)
      
      // Determine if cognitive overload likely occurred
      const isOverloaded = performanceDecline > 15 || 
                          (performanceDecline > 10 && durationFactor > 30) ||
                          cognitiveLoadScore > 20
      
      // Calculate efficiency (performance relative to cognitive load)
      const efficiency = set.accuracy / (cognitiveLoadScore || 1)
      
      return {
        id: set.id,
        subject: set.subject,
        type: set.type,
        duration: set.timeUsed,
        questionCount: set.questions.length,
        difficulty: set.difficulty,
        pace: set.pace,
        earlyAccuracy,
        lateAccuracy,
        performanceDecline,
        cognitiveLoadScore,
        accuracy: set.accuracy,
        isOverloaded,
        efficiency,
        timeOfDay: set.timeOfDay,
        dateCompleted: set.dateCompleted
      }
    })
    
    // Sort by date
    loadMetrics.sort((a, b) => new Date(a.dateCompleted).getTime() - new Date(b.dateCompleted).getTime())
    
    setCognitiveLoadData(loadMetrics)
    
    // Generate recommendations based on the data
    if (loadMetrics.length > 0) {
      const recommendations: string[] = []
      
      // Find most efficient sets
      const efficientSets = [...loadMetrics].sort((a, b) => b.efficiency - a.efficiency).slice(0, 3)
      if (efficientSets.length > 0) {
        const bestSubject = efficientSets[0].subject
        const bestTimeOfDay = efficientSets[0].timeOfDay
        const bestPace = efficientSets[0].pace
        
        recommendations.push(`Your most efficient sessions tend to be ${bestSubject} practice with a ${bestPace.toLowerCase()} pace in the ${bestTimeOfDay.toLowerCase()}.`)
      }
      
      // Find overload patterns
      const overloadedSets = loadMetrics.filter(set => set.isOverloaded)
      if (overloadedSets.length > 0) {
        const avgDuration = overloadedSets.reduce((sum, set) => sum + set.duration, 0) / overloadedSets.length / 60
        recommendations.push(`Signs of cognitive fatigue typically appear after ${avgDuration.toFixed(0)} minutes of practice.`)
        
        // Check if specific subjects are more prone to overload
        const subjectCounts: {[key: string]: number} = {}
        overloadedSets.forEach(set => {
          subjectCounts[set.subject] = (subjectCounts[set.subject] || 0) + 1
        })
        
        const mostOverloadedSubject = Object.entries(subjectCounts)
          .sort((a, b) => b[1] - a[1])[0]
        
        if (mostOverloadedSubject && mostOverloadedSubject[1] > 1) {
          recommendations.push(`${mostOverloadedSubject[0]} sessions tend to create more cognitive load than other subjects.`)
        }
      }
      
      // Recommend optimal session duration
      const nonOverloadedSets = loadMetrics.filter(set => !set.isOverloaded)
      if (nonOverloadedSets.length > 0) {
        const avgDuration = nonOverloadedSets.reduce((sum, set) => sum + set.duration, 0) / nonOverloadedSets.length / 60
        recommendations.push(`Optimal session duration appears to be around ${avgDuration.toFixed(0)} minutes to maintain high performance.`)
      }
      
      setRecommendations(recommendations)
    }
  }, [practiceSets])
  
  // Handle set selection
  useEffect(() => {
    setSelectedSessionId(selectedSetId)
  }, [selectedSetId])
  
  // Get the selected session details
  const selectedSession = cognitiveLoadData.find(set => set.id === selectedSessionId)
  
  // Get color based on subject
  const getSubjectColor = (subject: string) => {
    switch(subject) {
      case 'Math': return {
        primary: 'bg-blue-500',
        light: 'bg-blue-100',
        text: 'text-blue-700',
        border: 'border-blue-300',
        gradient: 'from-blue-500 to-blue-700'
      }
      case 'Reading': return {
        primary: 'bg-purple-500',
        light: 'bg-purple-100',
        text: 'text-purple-700',
        border: 'border-purple-300',
        gradient: 'from-purple-500 to-purple-700'
      }
      case 'Writing': return {
        primary: 'bg-emerald-500',
        light: 'bg-emerald-100',
        text: 'text-emerald-700',
        border: 'border-emerald-300',
        gradient: 'from-emerald-500 to-emerald-700'
      }
      default: return {
        primary: 'bg-gray-500',
        light: 'bg-gray-100',
        text: 'text-gray-700',
        border: 'border-gray-300',
        gradient: 'from-gray-500 to-gray-700'
      }
    }
  }
  
  // Format minutes from seconds
  const formatMinutes = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-lg">
      <h3 className="text-xl font-bold mb-2 text-center">Cognitive Load Analyzer</h3>
      
      <div className="text-sm text-center mb-6 text-gray-600 dark:text-gray-400">
        Identify optimal learning conditions and patterns of cognitive fatigue
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left panel - load graph */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Cognitive Load Timeline</h4>
          
          {/* Load visualization - performance over time by session */}
          <div className="relative h-80 border-b border-l border-gray-300 dark:border-gray-700">
            {/* Y-axis labels */}
            <div className="absolute -left-8 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
              <div>100%</div>
              <div>75%</div>
              <div>50%</div>
              <div>25%</div>
              <div>0%</div>
            </div>
            
            {/* Grid lines */}
            <div className="absolute inset-0">
              <div className="border-b border-dashed border-gray-200 dark:border-gray-800 h-1/4"></div>
              <div className="border-b border-dashed border-gray-200 dark:border-gray-800 h-1/4"></div>
              <div className="border-b border-dashed border-gray-200 dark:border-gray-800 h-1/4"></div>
              <div className="border-b border-dashed border-gray-200 dark:border-gray-800 h-1/4"></div>
            </div>
            
            {/* Data visualization */}
            <div className="absolute inset-0 pt-4 pb-2 px-2">
              {cognitiveLoadData.map((session, index) => {
                const x1 = `${(index / Math.max(1, cognitiveLoadData.length - 1)) * 100}%`
                const y1 = `${100 - session.earlyAccuracy}%`
                const y2 = `${100 - session.lateAccuracy}%`
                
                // Performance line - early to late
                const isSelected = selectedSessionId === session.id
                const subjectColor = getSubjectColor(session.subject)
                
                return (
                  <div key={session.id} className="absolute" style={{ left: x1, top: y1 }}>
                    {/* Session point */}
                    <button
                      className={`
                        w-4 h-4 rounded-full -ml-2 -mt-2 transition-all duration-300
                        ${subjectColor.primary}
                        ${isSelected ? 'ring-2 ring-offset-2 ring-indigo-500 scale-125 z-10' : 'hover:scale-110'}
                      `}
                      onClick={() => {
                        setSelectedSessionId(session.id)
                        onSelectSet(session.id)
                      }}
                    ></button>
                    
                    {/* Decline line */}
                    {session.earlyAccuracy > session.lateAccuracy && (
                      <div className="absolute top-0 left-0 h-6 w-px bg-gray-400 dark:bg-gray-600 origin-top"
                           style={{ 
                             height: `${session.earlyAccuracy - session.lateAccuracy}%`, 
                             transform: 'rotate(20deg)' 
                           }}>
                      </div>
                    )}
                    
                    {/* Cognitive load indicator */}
                    <div className={`
                      absolute -mt-10 -ml-3 opacity-70
                      w-6 h-6 rounded-full
                      ${session.isOverloaded ? 'bg-red-500/20' : 'bg-emerald-500/20'}
                      transition-all duration-300
                      ${isSelected ? 'scale-125' : ''}
                    `}
                    style={{ 
                      width: `${Math.max(6, session.cognitiveLoadScore / 2)}px`, 
                      height: `${Math.max(6, session.cognitiveLoadScore / 2)}px`,
                    }}></div>
                    
                    {/* Date label (only showing for a few points to avoid clutter) */}
                    {index % 3 === 0 && (
                      <div className="absolute -bottom-8 left-0 text-xs text-gray-500 dark:text-gray-400 transform -translate-x-1/2">
                        {formatDate(session.dateCompleted)}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Legends */}
          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Math</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Reading</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500 mr-1"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Writing</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500/20 mr-1"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Cognitive overload</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 mr-1"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Optimal load</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right panel - details and recommendations */}
        <div className="w-full md:w-80 space-y-4">
          {/* Session details */}
          {selectedSession ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Session Analysis
              </h4>
              
              <div className="flex items-center">
                <span className={`w-4 h-4 rounded-full ${getSubjectColor(selectedSession.subject).primary} mr-2`}></span>
                <span className="font-medium">{selectedSession.subject}: {selectedSession.type}</span>
              </div>
              
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Date:</span>
                  <span>{new Date(selectedSession.dateCompleted).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                  <span>{selectedSession.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                  <span>{formatMinutes(selectedSession.duration)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Questions:</span>
                  <span>{selectedSession.questionCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Pace:</span>
                  <span>{selectedSession.pace}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Time of Day:</span>
                  <span>{selectedSession.timeOfDay}</span>
                </div>
              </div>
              
              {/* Cognitive load metrics */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <h5 className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-2">
                  Cognitive Load Metrics
                </h5>
                
                <div className="space-y-3">
                  {/* Performance decline */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Performance Decline:</span>
                      <span className="text-xs font-medium">
                        {selectedSession.performanceDecline.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          selectedSession.performanceDecline > 15 ? 'bg-red-500' : 
                          selectedSession.performanceDecline > 10 ? 'bg-amber-500' : 
                          'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, selectedSession.performanceDecline * 2)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Cognitive load score */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Cognitive Load Score:</span>
                      <span className="text-xs font-medium">
                        {selectedSession.cognitiveLoadScore.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          selectedSession.cognitiveLoadScore > 20 ? 'bg-red-500' : 
                          selectedSession.cognitiveLoadScore > 15 ? 'bg-amber-500' : 
                          'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, selectedSession.cognitiveLoadScore * 2.5)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Efficiency */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Learning Efficiency:</span>
                      <span className="text-xs font-medium">
                        {selectedSession.efficiency.toFixed(1)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-indigo-500"
                        style={{ width: `${Math.min(100, selectedSession.efficiency * 20)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Status indicator */}
                <div className="mt-4">
                  <div className={`
                    px-3 py-2 rounded-md text-xs font-medium
                    ${selectedSession.isOverloaded 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' 
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                    }
                  `}>
                    {selectedSession.isOverloaded 
                      ? 'Signs of cognitive overload detected' 
                      : 'Cognitive load within optimal range'
                    }
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Select a session point to view detailed analysis
              </p>
            </div>
          )}
          
          {/* Recommendations */}
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md">
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
              Cognitive Load Recommendations
            </h4>
            
            {recommendations.length > 0 ? (
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <div className="text-indigo-500 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">{rec}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                More practice data needed for personalized recommendations
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Help text */}
      <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-xs text-gray-600 dark:text-gray-400">
        <p>
          This view analyzes your cognitive load during practice sessions. Points show session performance, with larger halos 
          indicating higher cognitive load. Lines show performance decline within sessions. Use this analysis to optimize your 
          study schedule and avoid cognitive fatigue.
        </p>
      </div>
    </div>
  )
}