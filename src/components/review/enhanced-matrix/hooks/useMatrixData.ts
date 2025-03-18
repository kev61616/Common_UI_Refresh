'use client'

import { useState, useEffect } from 'react'
import { QuestionWithMetadata } from '../../question-view/types'
import { QuestionViewProps } from '../../question-view-variants/types'
import { extractQuestionsWithMetadata } from '../../question-view/utils'
import { applyFilters, extractUniqueSubjects, extractUniqueTopics, getInitialFilterState } from '../utils/filterUtils'
import { calculateDifficultyTotals, calculateGrandTotal, calculateTopicTotals } from '../utils/dataUtils'
import { GridRow, GrandTotal, TopicTotal, DifficultyTotal } from '../types'

/**
 * Custom hook for managing matrix data and filtering
 */
export const useMatrixData = (props: QuestionViewProps) => {
  // Extract questions from practice sets
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([])
  
  // Selected cell state
  const [selectedCell, setSelectedCell] = useState<{topic: string, difficulty: string} | null>(null)
  const [highlightedSetId, setHighlightedSetId] = useState<string | null>(null)
  
  // Filter states
  const [filterSubject, setFilterSubject] = useState<string | null>(null)
  const [filterDifficulties, setFilterDifficulties] = useState<Record<string, boolean>>({
    'Easy': true,
    'Medium': true,
    'Hard': true
  })
  const [filterTopics, setFilterTopics] = useState<string[]>([])
  const [filterPerformance, setFilterPerformance] = useState<'low' | 'medium' | 'high' | null>(null)
  const [topicSearchInput, setTopicSearchInput] = useState('')
  const [showTopicFilter, setShowTopicFilter] = useState(false)
  
  // Standard order for difficulties
  const difficulties = ['Easy', 'Medium', 'Hard']
  
  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(props.practiceSets)
    setAllQuestions(questions)
  }, [props.practiceSets])
  
  // Get all subjects for filter
  const subjects = extractUniqueSubjects(allQuestions)
  
  // Get all topics
  const allTopics = extractUniqueTopics(allQuestions)
  
  // Apply filters to get filtered questions
  const filteredQuestions = applyFilters(
    allQuestions, 
    filterSubject, 
    filterDifficulties, 
    filterTopics, 
    topicSearchInput, 
    filterPerformance,
    difficulties
  )
  
  // Extract unique topics from filtered questions
  const topics = Array.from(new Set(filteredQuestions.map(q => q.topic))).sort()
  
  // Create grid structure
  const createGrid = (): GridRow[] => {
    return topics.map(topic => {
      return {
        topic,
        cells: difficulties.filter(difficulty => 
          filterDifficulties[difficulty] // Only include active difficulties
        ).map(difficulty => {
          const cellQuestions = filteredQuestions.filter(
            q => q.topic === topic && q.difficulty === difficulty
          )
          
          return {
            topic,
            difficulty,
            questions: cellQuestions,
            count: cellQuestions.length,
            correctCount: cellQuestions.filter(q => q.correct).length,
            accuracy: cellQuestions.length > 0 
              ? Math.round((cellQuestions.filter(q => q.correct).length / cellQuestions.length) * 100) 
              : 0,
            setIds: Array.from(new Set(cellQuestions.map(q => q.setId)))
          }
        })
      }
    })
  }
  
  const grid = createGrid()
  
  // Cell click handler
  const handleCellClick = (topic: string, difficulty: string) => {
    if (selectedCell?.topic === topic && selectedCell?.difficulty === difficulty) {
      setSelectedCell(null)
    } else {
      setSelectedCell({ topic, difficulty })
      setHighlightedSetId(null)
    }
  }
  
  // Get questions for selected cell
  const selectedQuestions = selectedCell 
    ? filteredQuestions.filter(
        q => q.topic === selectedCell.topic && q.difficulty === selectedCell.difficulty
      )
    : []
  
  // Calculate totals
  const topicTotals: TopicTotal[] = calculateTopicTotals(filteredQuestions, topics)
  
  const difficultyTotals: DifficultyTotal[] = calculateDifficultyTotals(
    filteredQuestions, 
    difficulties, 
    filterDifficulties
  )
  
  const grandTotal: GrandTotal = calculateGrandTotal(filteredQuestions)
  
  // Toggle difficulty filter
  const toggleDifficultyFilter = (difficulty: string) => {
    setFilterDifficulties(prev => ({
      ...prev,
      [difficulty]: !prev[difficulty]
    }))
  }
  
  // Toggle topic filter
  const toggleTopicFilter = (topic: string) => {
    setFilterTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic) 
        : [...prev, topic]
    )
  }
  
  // Reset all filters
  const resetFilters = () => {
    setFilterSubject(null)
    setFilterDifficulties({
      'Easy': true,
      'Medium': true,
      'Hard': true
    })
    setFilterTopics([])
    setFilterPerformance(null)
    setTopicSearchInput('')
  }
  
  // Count active filters
  const activeFilterCount = (
    (filterSubject ? 1 : 0) +
    (Object.values(filterDifficulties).filter(v => !v).length > 0 ? 1 : 0) +
    (filterTopics.length > 0 ? 1 : 0) +
    (topicSearchInput.trim() !== '' ? 1 : 0) +
    (filterPerformance ? 1 : 0)
  )
  
  return {
    // Data
    allQuestions,
    filteredQuestions,
    subjects,
    allTopics,
    topics,
    difficulties,
    grid,
    selectedQuestions,
    topicTotals,
    difficultyTotals,
    grandTotal,
    
    // State
    filterSubject,
    setFilterSubject,
    filterDifficulties,
    setFilterDifficulties,
    filterTopics,
    setFilterTopics,
    filterPerformance,
    setFilterPerformance,
    topicSearchInput,
    setTopicSearchInput,
    showTopicFilter,
    setShowTopicFilter,
    selectedCell,
    setSelectedCell,
    highlightedSetId,
    setHighlightedSetId,
    
    // Actions
    handleCellClick,
    toggleDifficultyFilter,
    toggleTopicFilter,
    resetFilters,
    activeFilterCount,
    onSelectSet: props.onSelectSet
  }
}
