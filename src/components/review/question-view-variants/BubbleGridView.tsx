'use client'

import React, { useState, useEffect } from 'react'
import { QuestionViewProps } from './types'
import { QuestionWithMetadata } from '../question-view/types'
import { extractQuestionsWithMetadata } from '../question-view/utils'

/**
 * Bubble Grid View - Inspired by Heatmap
 * Visualizes questions as bubbles in a grid where size represents count and color represents accuracy
 */
export function BubbleGridView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([])
  const [gridMode, setGridMode] = useState<'topics' | 'subjects'>('topics')
  const [selectedCell, setSelectedCell] = useState<string | null>(null)
  
  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets)
    setAllQuestions(questions)
  }, [practiceSets])
  
  // Define type for grid cell data
  interface GridCellData {
    id: string;
    label: string;
    count: number;
    accuracy: number;
    questions: QuestionWithMetadata[];
    color: string;
    size: string;
  }

  // Build grid data
  const buildGridData = (): GridCellData[] => {
    if (gridMode === 'topics') {
      // Group data by topics
      const topicGroups = new Map<string, QuestionWithMetadata[]>()
      
      allQuestions.forEach(question => {
        if (!topicGroups.has(question.topic)) {
          topicGroups.set(question.topic, [])
        }
        topicGroups.get(question.topic)?.push(question)
      })
      
      // Calculate metrics and prepare grid data
      const gridData = Array.from(topicGroups.entries())
        .map(([topic, questions]) => {
          const correctCount = questions.filter(q => q.correct).length
          const accuracy = questions.length > 0 ? (correctCount / questions.length) * 100 : 0
          
          return {
            id: topic,
            label: topic,
            count: questions.length,
            accuracy,
            questions,
            color: getAccuracyColor(accuracy),
            size: getSizeClass(questions.length, getMaxCount(topicGroups))
          }
        })
        .sort((a, b) => b.count - a.count) // Sort by count descending
      
      return gridData
    } else {
      // Group by subject and difficulty as a 2D grid
      const subjects = ['Math', 'Reading', 'Writing'] as const
      const difficulties = ['Easy', 'Medium', 'Hard'] as const
      
      // Create a grid of subject × difficulty
      const gridData: GridCellData[] = []
      
      // First pass to collect all items
      for (const subject of subjects) {
        for (const difficulty of difficulties) {
          const questions = allQuestions.filter(
            q => q.setSubject === subject && q.difficulty === difficulty
          )
          
          if (questions.length > 0) {
            const correctCount = questions.filter(q => q.correct).length
            const accuracy = (correctCount / questions.length) * 100
            
            gridData.push({
              id: `${subject}-${difficulty}`,
              label: `${subject} - ${difficulty}`,
              count: questions.length,
              accuracy,
              questions,
              color: getAccuracyColor(accuracy),
              size: 'w-10 h-10' // Temporary size, will update in second pass
            })
          }
        }
      }
      
      // Second pass to determine sizes based on max count
      const maxCount = Math.max(...gridData.map(d => d.count), 1)
      
      return gridData.map(cell => ({
        ...cell,
        size: getSizeClass(cell.count, maxCount)
      }))
    }
  }
  
  // Get the maximum count from any group
  const getMaxCount = (groups: Map<string, any[]>) => {
    let maxCount = 1 // Default to 1 to avoid division by zero
    for (const [_, items] of groups.entries()) {
      if (items.length > maxCount) {
        maxCount = items.length
      }
    }
    return maxCount
  }
  
  // Get size class based on count relative to max
  const getSizeClass = (count: number, maxCount: number) => {
    const ratio = count / maxCount
    
    if (ratio > 0.8) return 'w-20 h-20'
    if (ratio > 0.6) return 'w-16 h-16'
    if (ratio > 0.4) return 'w-14 h-14'
    if (ratio > 0.2) return 'w-12 h-12'
    return 'w-10 h-10'
  }
  
  // Get color based on accuracy percentage
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-500 dark:bg-green-600 text-white'
    if (accuracy >= 80) return 'bg-green-400 dark:bg-green-500 text-white'
    if (accuracy >= 70) return 'bg-emerald-400 dark:bg-emerald-500 text-white'
    if (accuracy >= 60) return 'bg-yellow-400 dark:bg-yellow-500 text-black dark:text-white'
    if (accuracy >= 50) return 'bg-amber-400 dark:bg-amber-500 text-black dark:text-white'
    if (accuracy >= 40) return 'bg-orange-400 dark:bg-orange-500 text-white'
    if (accuracy >= 30) return 'bg-red-400 dark:bg-red-500 text-white'
    return 'bg-red-500 dark:bg-red-600 text-white'
  }
  
  // Format percentage for display
  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`
  }
  
  // Get selected questions
  const getSelectedQuestions = () => {
    if (!selectedCell) return []
    
    const gridData = buildGridData()
    const selectedCellData = gridData.find(cell => cell.id === selectedCell)
    return selectedCellData?.questions || []
  }
  
  // Calculate statistics for the selected questions
  const getSelectedStats = (questions: QuestionWithMetadata[]) => {
    const totalCount = questions.length
    if (totalCount === 0) return { correct: 0, incorrect: 0, accuracy: 0, avgTime: 0 }
    
    const correctCount = questions.filter(q => q.correct).length
    const accuracy = (correctCount / totalCount) * 100
    const avgTime = questions.reduce((sum, q) => sum + q.timeSpent, 0) / totalCount
    
    return {
      correct: correctCount,
      incorrect: totalCount - correctCount,
      accuracy,
      avgTime
    }
  }
  
  // Generate grid cells
  const generateGrid = () => {
    const gridData = buildGridData()
    
    return (
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {gridData.map(cell => (
          <div key={cell.id} className="flex flex-col items-center">
            <div 
              className={`
                ${cell.size} ${cell.color} rounded-full 
                flex flex-col items-center justify-center cursor-pointer
                transition-all duration-200 shadow-md
                ${selectedCell === cell.id ? 'ring-4 ring-indigo-400 dark:ring-indigo-300 scale-110' : 'hover:scale-105'}
              `}
              onClick={() => setSelectedCell(cell.id === selectedCell ? null : cell.id)}
            >
              <div className="text-lg font-bold">{formatPercentage(cell.accuracy)}</div>
              <div className="text-xs opacity-90">{cell.count}</div>
            </div>
            <div className="mt-2 text-center text-sm font-medium w-24 truncate">
              {cell.label}
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  // Get selected questions and stats
  const selectedQuestions = getSelectedQuestions()
  const selectedStats = getSelectedStats(selectedQuestions)
  const selectedCellData = selectedCell ? buildGridData().find(cell => cell.id === selectedCell) : null
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">37. Bubble Grid View</h3>
      
      {/* Mode selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 dark:bg-slate-800 inline-flex p-1 rounded-lg">
          <button
            onClick={() => setGridMode('topics')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              gridMode === 'topics' 
                ? 'bg-white dark:bg-slate-700 shadow-sm' 
                : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            By Topic
          </button>
          <button
            onClick={() => setGridMode('subjects')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              gridMode === 'subjects' 
                ? 'bg-white dark:bg-slate-700 shadow-sm' 
                : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            By Subject & Difficulty
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Bubble grid visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-2 flex items-center justify-center min-h-[400px]">
          {generateGrid()}
        </div>
        
        {/* Selected cell details */}
        <div>
          {selectedCell && selectedQuestions.length > 0 ? (
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 h-full">
              <h4 className="font-semibold mb-3 text-lg">
                {selectedCellData?.label}
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-md">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Questions</div>
                  <div className="text-xl font-semibold">{selectedQuestions.length}</div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Correct</div>
                  <div className="text-xl font-semibold text-green-600 dark:text-green-400">{selectedStats.correct}</div>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Incorrect</div>
                  <div className="text-xl font-semibold text-red-600 dark:text-red-400">{selectedStats.incorrect}</div>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Avg. Time</div>
                  <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{Math.round(selectedStats.avgTime)}s</div>
                </div>
              </div>
              
              <h5 className="font-medium mb-2 text-sm">Questions</h5>
              <div className="max-h-[250px] overflow-y-auto space-y-2 pr-1">
                {selectedQuestions.map(question => (
                  <div 
                    key={question.id}
                    onClick={() => onSelectSet && onSelectSet(question.setId)}
                    className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer ${
                      selectedSetId === question.setId 
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' 
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-sm">
                        {question.setSubject} • {question.topic}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {question.subtopic} • {question.difficulty} difficulty
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        question.correct 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {question.correct ? 'Correct' : 'Incorrect'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {question.timeSpent}s
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center h-full">
              <p className="text-slate-500 dark:text-slate-400 text-center">
                Select a bubble to view detailed information
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center items-center mt-8 gap-x-6 gap-y-2 text-xs">
        <div className="font-medium text-slate-600 dark:text-slate-300">Bubble Color = Accuracy:</div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="ml-1">0-40%</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-400 rounded-full"></div>
          <span className="ml-1">40-70%</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="ml-1">70-100%</span>
        </div>
        <div className="font-medium text-slate-600 dark:text-slate-300 ml-2">Bubble Size = Question Count</div>
      </div>
    </div>
  )
}
