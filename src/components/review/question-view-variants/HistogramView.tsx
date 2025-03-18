'use client'

import { useState } from 'react'
import { QuestionViewProps } from './types'
import { PracticeSet, Question } from '@/lib/mockData'

/**
 * HistogramView - Displays distribution of questions by various metrics
 * Shows frequency distributions across difficulty, topic, performance, etc.
 */
export function HistogramView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // State for controlling the view
  const [distributionType, setDistributionType] = useState<'accuracy' | 'difficulty' | 'timeSpent' | 'topic'>('accuracy')
  const [groupBy, setGroupBy] = useState<'subject' | 'none'>('none')
  
  // Extract all questions from practice sets with additional metadata
  const allQuestions = practiceSets.flatMap(set => 
    set.questions.map(q => ({ 
      ...q, 
      setId: set.id,
      subject: set.subject,
      setAccuracy: set.accuracy
    }))
  )
  
  // Get unique subjects for grouping
  const subjects = Array.from(new Set(practiceSets.map(set => set.subject)))
  
  // Function to generate bins for histogram based on distribution type
  const generateHistogramData = () => {
    // Define bins based on distribution type
    let binDefinitions: { label: string; range?: [number, number]; match?: string | string[] }[] = []
    
    switch (distributionType) {
      case 'accuracy':
        // Create accuracy bins (0-10%, 10-20%, etc.)
        binDefinitions = Array.from({ length: 10 }, (_, i) => ({
          label: `${i * 10}-${(i + 1) * 10}%`,
          range: [i * 10, (i + 1) * 10] as [number, number]
        }))
        break
        
      case 'difficulty':
        // Difficulty bins
        binDefinitions = [
          { label: 'Easy', match: 'Easy' },
          { label: 'Medium', match: 'Medium' },
          { label: 'Hard', match: 'Hard' }
        ]
        break
        
      case 'timeSpent':
        // Time spent bins (0-30s, 30-60s, etc.)
        binDefinitions = [
          { label: '0-30s', range: [0, 30] },
          { label: '30-60s', range: [30, 60] },
          { label: '60-90s', range: [60, 90] },
          { label: '90-120s', range: [90, 120] },
          { label: '120s+', range: [120, Infinity] }
        ]
        break
        
      case 'topic':
        // Create bins for each unique topic
        const topics = Array.from(new Set(allQuestions.map(q => q.topic)))
        binDefinitions = topics.map(topic => ({
          label: topic,
          match: topic
        }))
        break
    }
    
    // Function to determine if a question falls into a bin
    const questionMatchesBin = (question: typeof allQuestions[0], bin: typeof binDefinitions[0]) => {
      if (bin.range) {
        // For numeric ranges
        const value = 
          distributionType === 'accuracy' ? question.setAccuracy :
          distributionType === 'timeSpent' ? question.timeSpent : 0
        
        return value >= bin.range[0] && value < bin.range[1]
      } else if (bin.match) {
        // For categorical values
        const value = 
          distributionType === 'difficulty' ? question.difficulty :
          distributionType === 'topic' ? question.topic : ''
        
        return Array.isArray(bin.match) 
          ? bin.match.includes(value) 
          : bin.match === value
      }
      
      return false
    }
    
    // If grouping by subject, create a dataset for each subject, otherwise create a single dataset
    const datasets = groupBy === 'subject'
      ? subjects.map(subject => ({
          subject,
          data: binDefinitions.map(bin => ({
            ...bin,
            count: allQuestions.filter(q => q.subject === subject && questionMatchesBin(q, bin)).length
          }))
        }))
      : [{
          subject: 'All',
          data: binDefinitions.map(bin => ({
            ...bin,
            count: allQuestions.filter(q => questionMatchesBin(q, bin)).length
          }))
        }]
    
    return {
      datasets,
      maxCount: Math.max(...datasets.flatMap(set => set.data.map(d => d.count))),
      binCount: binDefinitions.length
    }
  }
  
  const histogramData = generateHistogramData()
  
  // Colors for different subjects
  const subjectColors: Record<string, string> = {
    'Math': '#f97316',    // orange
    'Reading': '#3b82f6', // blue
    'Writing': '#10b981', // green
    'All': '#6366f1'      // indigo
  }
  
  // Handle bin click to filter by criteria
  const handleBinClick = (binLabel: string, subject: string) => {
    // Find a question that matches this bin and subject
    let matchedQuestion: (typeof allQuestions[0]) | undefined
    
    if (distributionType === 'difficulty') {
      matchedQuestion = allQuestions.find(q => 
        q.difficulty === binLabel && 
        (subject === 'All' || q.subject === subject)
      )
    } else if (distributionType === 'topic') {
      matchedQuestion = allQuestions.find(q => 
        q.topic === binLabel && 
        (subject === 'All' || q.subject === subject)
      )
    } else if (distributionType === 'accuracy') {
      // For accuracy bins, parse the range from the label (e.g., "70-80%")
      const range = binLabel.replace('%', '').split('-').map(Number)
      matchedQuestion = allQuestions.find(q => 
        q.setAccuracy >= range[0] && q.setAccuracy < range[1] && 
        (subject === 'All' || q.subject === subject)
      )
    } else if (distributionType === 'timeSpent') {
      // For time bins, parse the range from the label (e.g., "30-60s")
      const range = binLabel.replace('s', '').replace('+', '-Infinity').split('-').map(Number)
      matchedQuestion = allQuestions.find(q => 
        q.timeSpent >= range[0] && q.timeSpent < range[1] && 
        (subject === 'All' || q.subject === subject)
      )
    }
    
    // If we found a matching question, select its set
    if (matchedQuestion) {
      onSelectSet(matchedQuestion.setId)
    }
  }
  
  // Get the label for the x-axis based on distribution type
  const getXAxisLabel = () => {
    switch (distributionType) {
      case 'accuracy': return 'Accuracy Range'
      case 'difficulty': return 'Difficulty Level'
      case 'timeSpent': return 'Time Spent'
      case 'topic': return 'Topics'
    }
  }
  
  // Calculate bar width based on number of bars and groups
  const getBarWidth = () => {
    const barCount = histogramData.datasets.length * histogramData.binCount
    return Math.min(30, Math.max(5, 100 / barCount))
  }
  
  // Default bar spacing
  const barSpacing = 2
  const barWidth = getBarWidth()
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">14. Histogram View</h3>
      
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {/* Distribution type selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Distribution</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={distributionType}
            onChange={(e) => setDistributionType(e.target.value as 'accuracy' | 'difficulty' | 'timeSpent' | 'topic')}
          >
            <option value="accuracy">Accuracy</option>
            <option value="difficulty">Difficulty</option>
            <option value="timeSpent">Time Spent</option>
            <option value="topic">Topic</option>
          </select>
        </div>
        
        {/* Group by selector */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-2 shadow-sm">
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-1">Group By</label>
          <select 
            className="bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 w-full"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as 'subject' | 'none')}
          >
            <option value="none">No Grouping</option>
            <option value="subject">Subject</option>
          </select>
        </div>
      </div>
      
      {/* Histogram */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm mb-6 overflow-x-auto">
        <div className="relative" style={{ minHeight: '300px', minWidth: `${histogramData.binCount * 50}px` }}>
          {/* Y-axis */}
          <div className="absolute left-0 top-0 bottom-20 w-10 flex flex-col justify-between items-end pr-2">
            {/* Y-axis labels */}
            {[0, 25, 50, 75, 100].map((percent, i) => {
              const value = Math.ceil(histogramData.maxCount * percent / 100)
              return (
                <div key={i} className="text-xs text-slate-500 dark:text-slate-400">
                  {value}
                </div>
              )
            })}
          </div>
          
          {/* Chart area */}
          <div className="absolute left-10 right-0 top-0 bottom-20 flex items-end">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 25, 50, 75, 100].map((percent, i) => (
                <div key={i} className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              ))}
            </div>
            
            {/* Bars */}
            <div className="relative w-full h-full flex justify-center items-end">
              {histogramData.datasets.map((dataset, datasetIndex) => (
                <div key={datasetIndex} className="absolute left-0 right-0 bottom-0 flex items-end">
                  {dataset.data.map((bin, binIndex) => {
                    const barHeight = histogramData.maxCount > 0 
                      ? (bin.count / histogramData.maxCount) * 100 
                      : 0
                    
                    // Calculate horizontal position based on number of datasets
                    const barsTotalWidth = histogramData.datasets.length * (barWidth + barSpacing)
                    const binWidth = 100 / histogramData.binCount
                    const binCenter = (binIndex + 0.5) * binWidth
                    const datasetOffset = (datasetIndex - (histogramData.datasets.length - 1) / 2) * (barWidth + barSpacing)
                    const barLeft = `calc(${binCenter}% + ${datasetOffset}px - ${barWidth/2}px)`
                    
                    return (
                      <div 
                        key={binIndex}
                        className="absolute bottom-0 transition-all duration-300 cursor-pointer hover:opacity-80"
                        style={{ 
                          height: `${barHeight}%`,
                          width: `${barWidth}px`,
                          left: barLeft,
                          backgroundColor: subjectColors[dataset.subject] || '#94a3b8',
                          transform: selectedSetId ? 'scale(0.98)' : 'scale(1)'
                        }}
                        onClick={() => handleBinClick(bin.label, dataset.subject)}
                        title={`${dataset.subject}: ${bin.label} (${bin.count} questions)`}
                      ></div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
          
          {/* X-axis */}
          <div className="absolute left-10 right-0 bottom-0 h-20">
            {/* X-axis line */}
            <div className="border-t border-slate-300 dark:border-slate-600 w-full"></div>
            
            {/* X-axis labels */}
            <div className="flex w-full">
              {histogramData.datasets[0].data.map((bin, binIndex) => {
                const labelWidth = 100 / histogramData.binCount
                
                return (
                  <div 
                    key={binIndex} 
                    className="flex flex-col items-center justify-start pt-1"
                    style={{ width: `${labelWidth}%` }}
                  >
                    <div className="text-xs text-slate-500 dark:text-slate-400 max-w-full px-1 truncate">
                      {bin.label}
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* X-axis title */}
            <div className="text-sm text-slate-500 dark:text-slate-400 text-center mt-4">
              {getXAxisLabel()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      {groupBy === 'subject' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm mb-6">
          <h4 className="text-sm font-semibold mb-2">Legend:</h4>
          <div className="flex flex-wrap gap-4">
            {subjects.map((subject, i) => (
              <div key={i} className="flex items-center">
                <div 
                  className="w-3 h-3 mr-2"
                  style={{ backgroundColor: subjectColors[subject] || '#94a3b8' }}
                ></div>
                <span className="text-sm">{subject}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm">
          <h4 className="font-medium text-sm mb-2">Distribution Statistics</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Total Questions:</span>
              <span>{allQuestions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Average Accuracy:</span>
              <span>
                {(practiceSets.reduce((sum, set) => sum + set.accuracy, 0) / practiceSets.length).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Most Common:</span>
              <span>
                {histogramData.datasets[0].data.sort((a, b) => b.count - a.count)[0]?.label || 'N/A'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm md:col-span-2">
          <h4 className="font-medium text-sm mb-2">Distribution Breakdown</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {histogramData.datasets[0].data
              .filter(bin => bin.count > 0)
              .sort((a, b) => b.count - a.count)
              .slice(0, 6)
              .map((bin, i) => (
                <div 
                  key={i} 
                  className="rounded border border-slate-200 dark:border-slate-700 p-2 text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  onClick={() => handleBinClick(bin.label, 'All')}
                >
                  <div className="font-medium truncate">{bin.label}</div>
                  <div className="flex justify-between mt-1">
                    <span className="text-slate-500 dark:text-slate-400">Count:</span>
                    <span>{bin.count}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 mt-1 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 dark:bg-indigo-400 rounded-full"
                      style={{ width: `${(bin.count / histogramData.maxCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center">
        <p>Click on any bar to see details for questions in that category.</p>
      </div>
    </div>
  )
}
