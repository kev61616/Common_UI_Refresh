'use client'

import { PracticeSet } from '@/lib/mockData'
import { useEffect, useRef } from 'react'

interface AnalyticsPanelProps {
  practiceSet: PracticeSet;
}

export function AnalyticsPanel({ practiceSet }: AnalyticsPanelProps) {
  const accuracyChartRef = useRef<HTMLCanvasElement>(null)
  const difficultiesChartRef = useRef<HTMLCanvasElement>(null)
  const mistakesChartRef = useRef<HTMLCanvasElement>(null)
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }
  
  // Simple canvas-based analytics charts
  useEffect(() => {
    if (!accuracyChartRef.current || !difficultiesChartRef.current || !mistakesChartRef.current) return
    
    // Draw accuracy comparison chart (early vs late accuracy)
    const accuracyCtx = accuracyChartRef.current.getContext('2d')
    if (accuracyCtx) {
      accuracyCtx.clearRect(0, 0, 250, 150)
      
      // Early accuracy bar
      accuracyCtx.fillStyle = '#10b981' // Emerald-500
      accuracyCtx.fillRect(30, 40, practiceSet.sessionFatigue.earlyAccuracy * 1.5, 20)
      
      // Late accuracy bar
      accuracyCtx.fillStyle = '#f59e0b' // Amber-500
      accuracyCtx.fillRect(30, 80, practiceSet.sessionFatigue.lateAccuracy * 1.5, 20)
      
      // Labels
      accuracyCtx.fillStyle = '#0f172a' // Slate-900
      accuracyCtx.font = '12px sans-serif'
      accuracyCtx.fillText('Early', 5, 55)
      accuracyCtx.fillText('Late', 5, 95)
      
      // Values
      accuracyCtx.fillStyle = '#475569' // Slate-600
      accuracyCtx.fillText(`${practiceSet.sessionFatigue.earlyAccuracy}%`, 
        30 + practiceSet.sessionFatigue.earlyAccuracy * 1.5 + 5, 55)
      accuracyCtx.fillText(`${practiceSet.sessionFatigue.lateAccuracy}%`, 
        30 + practiceSet.sessionFatigue.lateAccuracy * 1.5 + 5, 95)
      
      // Title
      accuracyCtx.fillStyle = '#0f172a' // Slate-900
      accuracyCtx.font = 'bold 14px sans-serif'
      accuracyCtx.fillText('Session Endurance', 30, 20)
    }
    
    // Draw difficulty distribution chart
    const difficultiesCtx = difficultiesChartRef.current.getContext('2d')
    if (difficultiesCtx) {
      difficultiesCtx.clearRect(0, 0, 250, 150)
      
      // Count questions by difficulty
      const easyCount = practiceSet.questions.filter(q => q.difficulty === 'Easy').length
      const mediumCount = practiceSet.questions.filter(q => q.difficulty === 'Medium').length
      const hardCount = practiceSet.questions.filter(q => q.difficulty === 'Hard').length
      const total = practiceSet.questions.length
      
      // Calculate percentages and convert to angles
      const easyAngle = (easyCount / total) * Math.PI * 2
      const mediumAngle = (mediumCount / total) * Math.PI * 2
      const hardAngle = (hardCount / total) * Math.PI * 2
      
      // Draw pie chart
      let startAngle = 0
      
      // Easy slice
      difficultiesCtx.beginPath()
      difficultiesCtx.moveTo(125, 70)
      difficultiesCtx.arc(125, 70, 50, startAngle, startAngle + easyAngle)
      difficultiesCtx.closePath()
      difficultiesCtx.fillStyle = '#4ade80' // Green-400
      difficultiesCtx.fill()
      startAngle += easyAngle
      
      // Medium slice
      difficultiesCtx.beginPath()
      difficultiesCtx.moveTo(125, 70)
      difficultiesCtx.arc(125, 70, 50, startAngle, startAngle + mediumAngle)
      difficultiesCtx.closePath()
      difficultiesCtx.fillStyle = '#facc15' // Yellow-400
      difficultiesCtx.fill()
      startAngle += mediumAngle
      
      // Hard slice
      difficultiesCtx.beginPath()
      difficultiesCtx.moveTo(125, 70)
      difficultiesCtx.arc(125, 70, 50, startAngle, startAngle + hardAngle)
      difficultiesCtx.closePath()
      difficultiesCtx.fillStyle = '#f87171' // Red-400
      difficultiesCtx.fill()
      
      // Title
      difficultiesCtx.fillStyle = '#0f172a' // Slate-900
      difficultiesCtx.font = 'bold 14px sans-serif'
      difficultiesCtx.fillText('Difficulty Distribution', 70, 20)
      
      // Legend
      difficultiesCtx.font = '12px sans-serif'
      difficultiesCtx.fillStyle = '#4ade80'
      difficultiesCtx.fillRect(30, 130, 15, 15)
      difficultiesCtx.fillStyle = '#0f172a'
      difficultiesCtx.fillText(`Easy ${easyCount}`, 50, 142)
      
      difficultiesCtx.fillStyle = '#facc15'
      difficultiesCtx.fillRect(100, 130, 15, 15)
      difficultiesCtx.fillStyle = '#0f172a'
      difficultiesCtx.fillText(`Medium ${mediumCount}`, 120, 142)
      
      difficultiesCtx.fillStyle = '#f87171'
      difficultiesCtx.fillRect(190, 130, 15, 15)
      difficultiesCtx.fillStyle = '#0f172a'
      difficultiesCtx.fillText(`Hard ${hardCount}`, 210, 142)
    }
    
    // Draw mistake types chart
    const mistakesCtx = mistakesChartRef.current.getContext('2d')
    if (mistakesCtx) {
      mistakesCtx.clearRect(0, 0, 250, 150)
      
      // Count mistake types
      const { conceptual, careless, timeManagement } = practiceSet.mistakeTypes
      const totalMistakes = conceptual + careless + timeManagement
      
      if (totalMistakes === 0) {
        // No mistakes - perfect score!
        mistakesCtx.fillStyle = '#0f172a' // Slate-900
        mistakesCtx.font = 'bold 14px sans-serif'
        mistakesCtx.fillText('No Mistakes - Perfect!', 60, 75)
      } else {
        // Draw horizontal bar chart
        const barHeight = 20
        const barMaxWidth = 150
        
        // Conceptual mistakes
        mistakesCtx.fillStyle = '#f43f5e' // Rose-500
        const conceptualWidth = (conceptual / totalMistakes) * barMaxWidth
        mistakesCtx.fillRect(30, 40, conceptualWidth, barHeight)
        
        // Careless mistakes
        mistakesCtx.fillStyle = '#f59e0b' // Amber-500
        const carelessWidth = (careless / totalMistakes) * barMaxWidth
        mistakesCtx.fillRect(30, 70, carelessWidth, barHeight)
        
        // Time management mistakes
        mistakesCtx.fillStyle = '#3b82f6' // Blue-500
        const timeWidth = (timeManagement / totalMistakes) * barMaxWidth
        mistakesCtx.fillRect(30, 100, timeWidth, barHeight)
        
        // Labels
        mistakesCtx.fillStyle = '#0f172a' // Slate-900
        mistakesCtx.font = '12px sans-serif'
        mistakesCtx.fillText('Conceptual', 190, 55)
        mistakesCtx.fillText('Careless', 190, 85)
        mistakesCtx.fillText('Time', 190, 115)
        
        // Values
        mistakesCtx.fillStyle = '#fff'
        if (conceptual > 0) mistakesCtx.fillText(`${conceptual}`, 30 + conceptualWidth / 2, 55)
        if (careless > 0) mistakesCtx.fillText(`${careless}`, 30 + carelessWidth / 2, 85)
        if (timeManagement > 0) mistakesCtx.fillText(`${timeManagement}`, 30 + timeWidth / 2, 115)
      }
      
      // Title
      mistakesCtx.fillStyle = '#0f172a' // Slate-900
      mistakesCtx.font = 'bold 14px sans-serif'
      mistakesCtx.fillText('Mistake Analysis', 85, 20)
    }
  }, [practiceSet])
  
  // Calculate performance indicators
  const correctCount = practiceSet.questions.filter(q => q.correct).length
  const incorrectCount = practiceSet.questions.length - correctCount
  const averageTimePerQuestion = practiceSet.questions.reduce((sum, q) => sum + q.timeSpent, 0) / practiceSet.questions.length
  
  // Calculate adaptive difficulty level
  const getDifficultyComfort = () => {
    const easyCorrect = practiceSet.questions.filter(q => q.difficulty === 'Easy' && q.correct).length
    const easyTotal = practiceSet.questions.filter(q => q.difficulty === 'Easy').length
    
    const mediumCorrect = practiceSet.questions.filter(q => q.difficulty === 'Medium' && q.correct).length
    const mediumTotal = practiceSet.questions.filter(q => q.difficulty === 'Medium').length
    
    const hardCorrect = practiceSet.questions.filter(q => q.difficulty === 'Hard' && q.correct).length
    const hardTotal = practiceSet.questions.filter(q => q.difficulty === 'Hard').length
    
    const easyAccuracy = easyTotal > 0 ? (easyCorrect / easyTotal) * 100 : 0
    const mediumAccuracy = mediumTotal > 0 ? (mediumCorrect / mediumTotal) * 100 : 0
    const hardAccuracy = hardTotal > 0 ? (hardCorrect / hardTotal) * 100 : 0
    
    if (hardAccuracy >= 80) return "Hard questions are within your comfort zone"
    if (mediumAccuracy >= 80) return "Medium questions are comfortable, focus on harder content"
    if (easyAccuracy >= 80) return "Easy questions are comfortable, increase difficulty"
    return "Focus on mastering basic concepts first"
  }
  
  return (
    <div className="p-[5%] pt-8 bg-gradient-to-br from-white via-slate-50/80 to-white dark:from-slate-800/95 dark:via-slate-800/80 dark:to-slate-800/90 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-60">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-bl from-indigo-500/[0.03] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gradient-to-tr from-sky-500/[0.03] to-transparent"></div>
        <div className="absolute top-[35%] left-[25%] w-24 h-24 rounded-full bg-gradient-to-tr from-fuchsia-500/[0.05] to-transparent"></div>
      </div>
      
      {/* Decorative grid pattern overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.015] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M 12 0 L 0 0 0 12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
            </pattern>
            <pattern id="grid" width="120" height="120" patternUnits="userSpaceOnUse">
              <rect width="120" height="120" fill="url(#smallGrid)" />
              <path d="M 120 0 L 0 0 0 120" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" stroke="none" />
        </svg>
      </div>
      
      {/* Panel header with enhanced decorative elements */}
      <div className="relative mb-10 z-10">
        <div className="absolute -top-3 -left-6 w-24 h-24 bg-gradient-to-br from-sky-500/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute top-0 left-0 w-2 h-16 bg-gradient-to-b from-sky-500 via-indigo-500 to-purple-500 rounded-full"></div>
        <h3 className="font-bold text-slate-800 dark:text-white text-2xl ml-7 relative bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200">
          Detailed Analytics
          <div className="absolute -bottom-3 left-0 w-44 h-0.5 bg-gradient-to-r from-sky-500 to-transparent"></div>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 ml-7 mt-6 flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 mr-2 shadow-sm"></span>
          In-depth analysis for {practiceSet.subject} practice set
        </p>
      </div>
      
      {/* Basic info */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Subject</span>
          <span className="text-sm text-slate-900 dark:text-white">{practiceSet.subject}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Type</span>
          <span className="text-sm text-slate-900 dark:text-white">{practiceSet.type}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Completed</span>
          <span className="text-sm text-slate-900 dark:text-white">{formatDate(practiceSet.dateCompleted)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Difficulty</span>
          <span className={`text-sm px-2 py-0.5 rounded-full ${
            practiceSet.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
            : practiceSet.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
          }`}>
            {practiceSet.difficulty}
          </span>
        </div>
      </div>
      
      {/* Decorative background pattern */}
      <div className="fixed top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
            </pattern>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" stroke="none" />
        </svg>
      </div>
      
      {/* Basic info */}
      <div className="mb-8 relative z-10">
        <div className="bg-slate-50/50 dark:bg-slate-700/30 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700/50">
          <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-700/50">
            <div className="p-4 relative overflow-hidden">
              <div className="absolute -right-1 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-300/50 to-transparent dark:via-slate-500/20"></div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Completed</div>
              <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{formatDate(practiceSet.dateCompleted)}</div>
            </div>
            <div className="p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Difficulty</div>
              <div className={`inline-flex text-sm px-2 py-0.5 rounded-full ${
                practiceSet.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-100'
                : practiceSet.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-100'
                : 'bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-100'
              }`}>
                {practiceSet.difficulty}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-700/50 border-t border-slate-100 dark:border-slate-700/50">
            <div className="p-4 relative overflow-hidden">
              <div className="absolute -right-1 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-300/50 to-transparent dark:via-slate-500/20"></div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Subject</div>
              <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{practiceSet.subject}</div>
            </div>
            <div className="p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Type</div>
              <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{practiceSet.type}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Performance summary */}
      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
        <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl overflow-hidden shadow-sm border border-blue-100 dark:from-sky-900/20 dark:to-blue-900/10 dark:border-blue-900/30">
          <div className="bg-gradient-to-r from-blue-600/10 to-transparent p-4">
            <div className="flex items-center mb-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="text-xs text-blue-800 dark:text-blue-300 font-medium uppercase tracking-wide">Accuracy</div>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{practiceSet.accuracy}%</div>
            <div className="text-xs mt-1 text-slate-600 dark:text-slate-300 flex items-center">
              <span className="text-green-600 dark:text-green-400 font-medium">{correctCount} correct</span>
              <span className="mx-1">•</span>
              <span className="text-red-500 dark:text-red-400 font-medium">{incorrectCount} incorrect</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl overflow-hidden shadow-sm border border-amber-100 dark:from-amber-900/20 dark:to-orange-900/10 dark:border-amber-900/30">
          <div className="bg-gradient-to-r from-amber-600/10 to-transparent p-4">
            <div className="flex items-center mb-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600 dark:text-amber-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <div className="text-xs text-amber-800 dark:text-amber-300 font-medium uppercase tracking-wide">Time Used</div>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{formatTime(practiceSet.timeUsed)}</div>
            <div className="text-xs mt-1 text-slate-600 dark:text-slate-300">
              <span className="text-amber-600 dark:text-amber-400 font-medium">~{Math.round(averageTimePerQuestion)}</span> sec per question
            </div>
          </div>
        </div>
      </div>
      
      {/* Adaptive Difficulty Insights Card */}
      <div className="relative z-10 mb-8">
        <div className="relative bg-gradient-to-br from-indigo-50/80 to-purple-50/80 rounded-xl overflow-hidden p-5 shadow-sm dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100/80 dark:border-indigo-900/30">
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-full"></div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <div className="ml-4">
              <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Adaptive Difficulty Insight</h4>
              <p className="mt-1.5 text-sm text-indigo-700 dark:text-indigo-300">{getDifficultyComfort()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts section with floating heading */}
      <div className="relative z-10 mb-8">
        <div className="relative mb-5">
          <h4 className="inline-block text-sm font-semibold text-slate-800 dark:text-white px-3 py-1 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-800 dark:to-transparent rounded-lg border-l-2 border-indigo-500">
            Performance Visualization
          </h4>
        </div>
        
        {/* Difficulty Distribution Chart - Replace canvas with modern div-based chart */}
        <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-xl shadow-md mb-5 border border-slate-100 dark:from-slate-800/80 dark:to-slate-800/40 dark:border-slate-700/50">
          <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 text-center">Difficulty Distribution</h5>
          
          {/* Pie chart visualization using divs and transforms */}
          <div className="flex justify-center mb-4">
            <div className="relative w-28 h-28">
              {/* Calculate percentages */}
              {(() => {
                const easyCount = practiceSet.questions.filter(q => q.difficulty === 'Easy').length;
                const mediumCount = practiceSet.questions.filter(q => q.difficulty === 'Medium').length;
                const hardCount = practiceSet.questions.filter(q => q.difficulty === 'Hard').length;
                const total = practiceSet.questions.length;
                
                const easyPercent = Math.round((easyCount / total) * 100);
                const mediumPercent = Math.round((mediumCount / total) * 100);
                const hardPercent = Math.round((hardCount / total) * 100);
                
                // Render segments
                return (
                  <>
                    {/* Easy segment - green */}
                    <div 
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-lg"
                      style={{ 
                        clipPath: `polygon(50% 50%, 50% 0%, ${easyPercent > 50 ? '100% 0%, 100% 100%, 0% 100%, 0% 0%,' : ''} ${50 + 50 * Math.cos(Math.PI * 2 * easyPercent / 100 - Math.PI/2)}% ${50 + 50 * Math.sin(Math.PI * 2 * easyPercent / 100 - Math.PI/2)}%)` 
                      }}>
                    </div>
                    
                    {/* Medium segment - yellow */}
                    <div 
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg"
                      style={{ 
                        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(Math.PI * 2 * easyPercent / 100 - Math.PI/2)}% ${50 + 50 * Math.sin(Math.PI * 2 * easyPercent / 100 - Math.PI/2)}%, ${50 + 50 * Math.cos(Math.PI * 2 * (easyPercent + mediumPercent) / 100 - Math.PI/2)}% ${50 + 50 * Math.sin(Math.PI * 2 * (easyPercent + mediumPercent) / 100 - Math.PI/2)}%)` 
                      }}>
                    </div>
                    
                    {/* Hard segment - red */}
                    <div 
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-lg"
                      style={{ 
                        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(Math.PI * 2 * (easyPercent + mediumPercent) / 100 - Math.PI/2)}% ${50 + 50 * Math.sin(Math.PI * 2 * (easyPercent + mediumPercent) / 100 - Math.PI/2)}%, ${50 + 50 * Math.cos(Math.PI * 2 * (easyPercent + mediumPercent + hardPercent) / 100 - Math.PI/2)}% ${50 + 50 * Math.sin(Math.PI * 2 * (easyPercent + mediumPercent + hardPercent) / 100 - Math.PI/2)}%)` 
                      }}>
                    </div>
                    
                    {/* Center white circle */}
                    <div className="absolute w-14 h-14 rounded-full bg-white dark:bg-slate-900 shadow-inner top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                      <span className="text-lg font-bold text-slate-700 dark:text-white">{total}</span>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-500 mr-1.5"></div>
              <span className="text-slate-700 dark:text-slate-300">Easy</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 mr-1.5"></div>
              <span className="text-slate-700 dark:text-slate-300">Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500 mr-1.5"></div>
              <span className="text-slate-700 dark:text-slate-300">Hard</span>
            </div>
          </div>
        </div>
        
        {/* Session Endurance Visualization */}
        <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-xl shadow-md mb-5 border border-slate-100 dark:from-slate-800/80 dark:to-slate-800/40 dark:border-slate-700/50">
          <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 text-center">Session Endurance</h5>
          
          <div className="space-y-4">
            {/* Early accuracy bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Early</span>
                <span className="text-slate-500 dark:text-slate-400">{practiceSet.sessionFatigue.earlyAccuracy}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full shadow-inner"
                  style={{ width: `${practiceSet.sessionFatigue.earlyAccuracy}%` }}
                ></div>
              </div>
            </div>
            
            {/* Late accuracy bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-amber-600 dark:text-amber-400">Late</span>
                <span className="text-slate-500 dark:text-slate-400">{practiceSet.sessionFatigue.lateAccuracy}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-700/50">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-inner"
                  style={{ width: `${practiceSet.sessionFatigue.lateAccuracy}%` }}
                ></div>
              </div>
            </div>
            
            {/* Fatigue indicator */}
            {practiceSet.sessionFatigue.earlyAccuracy - practiceSet.sessionFatigue.lateAccuracy > 10 && (
              <div className="mt-2 text-xs text-center">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {practiceSet.sessionFatigue.earlyAccuracy - practiceSet.sessionFatigue.lateAccuracy}% accuracy drop detected
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Mistake Analysis */}
        <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-xl shadow-md border border-slate-100 dark:from-slate-800/80 dark:to-slate-800/40 dark:border-slate-700/50">
          <h5 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 text-center">Mistake Analysis</h5>
          
          {/* Count mistake types */}
          {(() => {
            const { conceptual, careless, timeManagement } = practiceSet.mistakeTypes;
            const totalMistakes = conceptual + careless + timeManagement;
            
            if (totalMistakes === 0) {
              return (
                <div className="h-24 flex items-center justify-center">
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-2 rounded-lg dark:from-emerald-900/30 dark:to-emerald-900/10">
                    <span className="text-emerald-700 dark:text-emerald-300 font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Perfect Score! No mistakes.
                    </span>
                  </div>
                </div>
              );
            }
            
            return (
              <div className="space-y-3">
                {/* Conceptual mistakes */}
                {conceptual > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-rose-600 dark:text-rose-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Conceptual
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">{conceptual} mistakes</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-700/50">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full shadow-inner"
                        style={{ width: `${(conceptual / totalMistakes) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Careless mistakes */}
                {careless > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-amber-600 dark:text-amber-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Careless
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">{careless} mistakes</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-700/50">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-inner"
                        style={{ width: `${(careless / totalMistakes) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {/* Time management mistakes */}
                {timeManagement > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-blue-600 dark:text-blue-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Time Management
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">{timeManagement} mistakes</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-700/50">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-inner"
                        style={{ width: `${(timeManagement / totalMistakes) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>
      
      {/* Micro-goals and Recommendations */}
      <div className="border-t border-slate-200 pt-5 space-y-4 dark:border-slate-700/50">
        <h4 className="font-semibold text-sm text-slate-800 dark:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Personalized Recommendations
        </h4>
        
        {practiceSet.accuracy < 70 && (
          <div className="flex items-start gap-2">
            <div className="mt-0.5 bg-amber-100 rounded-full p-1 dark:bg-amber-900">
              <svg className="w-3 h-3 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Your accuracy is below target. Try reviewing {practiceSet.subject} {practiceSet.type} fundamentals.
            </p>
          </div>
        )}
        
        {practiceSet.pace === 'Slow' && (
          <div className="flex items-start gap-2">
            <div className="mt-0.5 bg-blue-100 rounded-full p-1 dark:bg-blue-900">
              <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Your pace is slower than optimal. Practice timed exercises to improve speed.
            </p>
          </div>
        )}
        
        {practiceSet.sessionFatigue.earlyAccuracy - practiceSet.sessionFatigue.lateAccuracy > 15 && (
          <div className="flex items-start gap-2">
            <div className="mt-0.5 bg-purple-100 rounded-full p-1 dark:bg-purple-900">
              <svg className="w-3 h-3 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              You showed significant fatigue. Consider shorter practice sessions with breaks.
            </p>
          </div>
        )}
        
        {practiceSet.mistakeTypes.conceptual > (practiceSet.mistakeTypes.careless + practiceSet.mistakeTypes.timeManagement) && (
          <div className="flex items-start gap-2">
            <div className="mt-0.5 bg-emerald-100 rounded-full p-1 dark:bg-emerald-900">
              <svg className="w-3 h-3 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Your conceptual understanding needs work. Focus on theory before more practice.
            </p>
          </div>
        )}
        
        {/* Next Level Goal */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700/50">
          <h4 className="font-semibold text-sm text-slate-800 dark:text-white mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Your Next Micro-Goal
          </h4>
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl shadow-sm border border-amber-100 dark:from-amber-900/30 dark:to-orange-900/20 dark:border-amber-900/50 dark:bg-opacity-20">
            {practiceSet.accuracy < 70 ? (
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Aim for 75% accuracy on your next {practiceSet.subject} {practiceSet.type} practice set
              </p>
            ) : practiceSet.accuracy < 85 ? (
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Aim for 90% accuracy on your next {practiceSet.subject} {practiceSet.type} practice set
              </p>
            ) : practiceSet.pace === 'Slow' ? (
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Maintain your high accuracy while improving to a "Normal" pace
              </p>
            ) : practiceSet.pace === 'Normal' ? (
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Try a more challenging {practiceSet.difficulty === 'Easy' ? 'Medium' : 'Hard'} difficulty set
              </p>
            ) : (
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Great work! Try a completely new topic to expand your knowledge
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
