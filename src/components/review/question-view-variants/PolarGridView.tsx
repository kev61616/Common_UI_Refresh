'use client'

import React, { useState, useEffect } from 'react'
import { QuestionViewProps } from './types'
import { QuestionWithMetadata } from '../question-view/types'
import { extractQuestionsWithMetadata } from '../question-view/utils'

/**
 * Polar Grid View - Inspired by Heatmap
 * Visualizes questions in a circular/polar layout with sectors for different categories
 */
export function PolarGridView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([])
  const [polarMode, setPolarMode] = useState<'subjects' | 'difficulty'>('subjects')
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  
  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets)
    setAllQuestions(questions)
  }, [practiceSets])
  
  // Define sector data interface
  interface SectorData {
    id: string;
    label: string;
    count: number;
    accuracy: number;
    questions: QuestionWithMetadata[];
    color: string;
    radius: number;
    startAngle: number;
    endAngle: number;
  }
  
  // Generate polar grid data
  const generatePolarData = (): SectorData[] => {
    if (polarMode === 'subjects') {
      // Group by subject
      const subjects = ['Math', 'Reading', 'Writing'] as const
      const subjectGroups: Record<string, QuestionWithMetadata[]> = {}
      
      // Initialize groups
      subjects.forEach(subject => {
        subjectGroups[subject] = []
      })
      
      // Group questions by subject
      allQuestions.forEach(question => {
        if (subjectGroups[question.setSubject]) {
          subjectGroups[question.setSubject].push(question)
        }
      })
      
      // Calculate metrics for each sector
      const subjectData = Object.entries(subjectGroups)
        .filter(([_, questions]) => questions.length > 0)
        .map(([subject, questions], index, array) => {
          const totalSectors = array.length
          const sectorSize = 360 / totalSectors
          const startAngle = index * sectorSize
          const endAngle = startAngle + sectorSize
          
          const correctCount = questions.filter(q => q.correct).length
          const accuracy = questions.length > 0 ? (correctCount / questions.length) * 100 : 0
          
          return {
            id: subject,
            label: subject,
            count: questions.length,
            accuracy,
            questions,
            color: getAccuracyColor(accuracy),
            radius: 140, // Fixed radius for subjects
            startAngle,
            endAngle
          }
        })
      
      return subjectData
    } else {
      // Group by difficulty
      const difficulties = ['Easy', 'Medium', 'Hard'] as const
      const difficultyGroups: Record<string, QuestionWithMetadata[]> = {}
      
      // Initialize groups
      difficulties.forEach(difficulty => {
        difficultyGroups[difficulty] = []
      })
      
      // Group questions by difficulty
      allQuestions.forEach(question => {
        if (difficultyGroups[question.difficulty]) {
          difficultyGroups[question.difficulty].push(question)
        }
      })
      
      // Calculate metrics for each sector
      const difficultyData = Object.entries(difficultyGroups)
        .filter(([_, questions]) => questions.length > 0)
        .map(([difficulty, questions], index, array) => {
          const totalSectors = array.length
          const sectorSize = 360 / totalSectors
          const startAngle = index * sectorSize
          const endAngle = startAngle + sectorSize
          
          const correctCount = questions.filter(q => q.correct).length
          const accuracy = questions.length > 0 ? (correctCount / questions.length) * 100 : 0
          
          return {
            id: difficulty,
            label: difficulty,
            count: questions.length,
            accuracy,
            questions,
            color: getDifficultyColor(difficulty),
            radius: 140, // Fixed radius for difficulties
            startAngle,
            endAngle
          }
        })
      
      return difficultyData
    }
  }
  
  // Get accuracy color
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return 'bg-green-500/90 dark:bg-green-600/90'
    if (accuracy >= 80) return 'bg-green-400/90 dark:bg-green-500/90'
    if (accuracy >= 70) return 'bg-emerald-400/90 dark:bg-emerald-500/90'
    if (accuracy >= 60) return 'bg-yellow-400/90 dark:bg-yellow-500/90'
    if (accuracy >= 50) return 'bg-amber-400/90 dark:bg-amber-500/90'
    if (accuracy >= 40) return 'bg-orange-400/90 dark:bg-orange-500/90'
    if (accuracy >= 30) return 'bg-red-400/90 dark:bg-red-500/90'
    return 'bg-red-500/90 dark:bg-red-600/90'
  }
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/90 dark:bg-green-600/90'
      case 'Medium': return 'bg-amber-500/90 dark:bg-amber-600/90'
      case 'Hard': return 'bg-red-500/90 dark:bg-red-600/90'
      default: return 'bg-slate-500/90 dark:bg-slate-600/90'
    }
  }
  
  // Format percentage for display
  const formatPercentage = (value: number) => {
    return `${Math.round(value)}%`
  }
  
  // Generate CSS for sector
  const getSectorStyle = (sector: SectorData, isSelected: boolean) => {
    const centerX = 150 // Center X coordinate
    const centerY = 150 // Center Y coordinate
    
    // Convert angles to radians
    const startAngleRad = (sector.startAngle - 90) * (Math.PI / 180)
    const endAngleRad = (sector.endAngle - 90) * (Math.PI / 180)
    
    // Calculate points
    const startX = centerX + sector.radius * Math.cos(startAngleRad)
    const startY = centerY + sector.radius * Math.sin(startAngleRad)
    const endX = centerX + sector.radius * Math.cos(endAngleRad)
    const endY = centerY + sector.radius * Math.sin(endAngleRad)
    
    // Determine if the arc is larger than 180 degrees
    const largeArcFlag = sector.endAngle - sector.startAngle <= 180 ? '0' : '1'
    
    // SVG path for the sector
    const path = `M ${centerX},${centerY} L ${startX},${startY} A ${sector.radius},${sector.radius} 0 ${largeArcFlag} 1 ${endX},${endY} Z`
    
    // Calculate label position (midpoint of the arc)
    const midAngleRad = ((sector.startAngle + sector.endAngle) / 2 - 90) * (Math.PI / 180)
    const labelRadius = sector.radius * 0.65 // Position label at 65% of the radius
    const labelX = centerX + labelRadius * Math.cos(midAngleRad)
    const labelY = centerY + labelRadius * Math.sin(midAngleRad)
    
    return {
      path,
      labelX,
      labelY,
      className: `fill-current ${sector.color} cursor-pointer transition-all duration-200 ${
        isSelected ? 'stroke-indigo-500 dark:stroke-indigo-400 stroke-[5px]' : 'stroke-transparent hover:opacity-90'
      }`
    }
  }
  
  // Get selected questions
  const getSelectedQuestions = () => {
    if (!selectedSector) return []
    
    const sectors = generatePolarData()
    const selectedSectorData = sectors.find(sector => sector.id === selectedSector)
    return selectedSectorData?.questions || []
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
  
  // Get selected questions and stats
  const selectedQuestions = getSelectedQuestions()
  const selectedStats = getSelectedStats(selectedQuestions)
  const polarData = generatePolarData()
  const selectedSectorData = selectedSector ? polarData.find(sector => sector.id === selectedSector) : null
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">38. Polar Grid View</h3>
      
      {/* Mode selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 dark:bg-slate-800 inline-flex p-1 rounded-lg">
          <button
            onClick={() => setPolarMode('subjects')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              polarMode === 'subjects' 
                ? 'bg-white dark:bg-slate-700 shadow-sm' 
                : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            By Subject
          </button>
          <button
            onClick={() => setPolarMode('difficulty')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              polarMode === 'difficulty' 
                ? 'bg-white dark:bg-slate-700 shadow-sm' 
                : 'hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            By Difficulty
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Polar grid visualization */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 flex items-center justify-center">
          <div className="relative w-[300px] h-[300px]">
            <svg width="300" height="300" viewBox="0 0 300 300">
              {/* Center circle */}
              <circle 
                cx="150" 
                cy="150" 
                r="40" 
                className="fill-slate-100 dark:fill-slate-700 stroke-slate-300 dark:stroke-slate-600"
              />
              
              {/* Sectors */}
              {polarData.map(sector => {
                const isSelected = sector.id === selectedSector
                const sectorStyle = getSectorStyle(sector, isSelected)
                
                return (
                  <g key={sector.id} onClick={() => setSelectedSector(sector.id === selectedSector ? null : sector.id)}>
                    <path d={sectorStyle.path} className={sectorStyle.className} />
                    
                    {/* Sector label */}
                    <text 
                      x={sectorStyle.labelX} 
                      y={sectorStyle.labelY} 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      className="fill-white dark:fill-white text-sm font-medium pointer-events-none"
                    >
                      {sector.label}
                    </text>
                    
                    {/* Accuracy label */}
                    <text 
                      x={sectorStyle.labelX} 
                      y={sectorStyle.labelY + 15} 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      className="fill-white dark:fill-white text-xs pointer-events-none"
                    >
                      {formatPercentage(sector.accuracy)}
                    </text>
                  </g>
                )
              })}
              
              {/* Center label */}
              <text 
                x="150" 
                y="150" 
                textAnchor="middle" 
                dominantBaseline="middle"
                className="fill-slate-700 dark:fill-slate-300 text-sm font-medium"
              >
                {allQuestions.length} Questions
              </text>
            </svg>
          </div>
        </div>
        
        {/* Selected sector details */}
        <div>
          {selectedSector && selectedQuestions.length > 0 ? (
            <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 h-full">
              <h4 className="font-semibold mb-3 text-lg">
                {selectedSectorData?.label} ({selectedQuestions.length} questions)
              </h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-md">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Accuracy</div>
                  <div className="text-xl font-semibold">{formatPercentage(selectedStats.accuracy)}</div>
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
                Select a sector to view detailed information
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center items-center mt-8 gap-4 text-xs">
        {polarMode === 'subjects' ? (
          <>
            <div className="font-medium text-slate-600 dark:text-slate-300">Subject Sectors</div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              <span className="ml-1">Math</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
              <span className="ml-1">Reading</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
              <span className="ml-1">Writing</span>
            </div>
          </>
        ) : (
          <>
            <div className="font-medium text-slate-600 dark:text-slate-300">Difficulty Sectors</div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
              <span className="ml-1">Easy</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-amber-500 rounded-sm"></div>
              <span className="ml-1">Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
              <span className="ml-1">Hard</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
