'use client'

import { useState, useMemo, useCallback } from 'react'
import { PracticeSet, Question } from '@/lib/mockData'
import { 
  MatrixCell, 
  GroupedQuestions, 
  FilterState, 
  SelectedCellState, 
  GridRow, 
  TopicTotal, 
  DifficultyTotal, 
  GrandTotal 
} from '../types'
import { QuestionWithMetadata } from '../../question-view/types'
import { 
  groupQuestionsByTopicAndDifficulty, 
  calculateTopicTotals, 
  calculateDifficultyTotals, 
  calculateGrandTotal, 
  countActiveFilters 
} from '../utils/analytics'

/**
 * Custom hook for managing the performance matrix data and state
 */
export const useMatrixData = (practiceSets: PracticeSet[]) => {
  // Filter state
  const [filterState, setFilterState] = useState<FilterState>({
    filterSubject: null,
    filterDifficulties: {
      'Easy': true,
      'Medium': true,
      'Hard': true,
      'Very Hard': true,
    },
    filterTopics: [],
    filterPerformance: null,
    topicSearchInput: '',
  })
  
  // Cell selection state
  const [selectedCell, setSelectedCell] = useState<SelectedCellState | null>(null)
  
  // Highlighted set ID for cross-referencing
  const [highlightedSetId, setHighlightedSetId] = useState<string | null>(null)
  
  // Actions for filter state manipulation
  const setFilterSubject = useCallback((subject: string | null) => {
    setFilterState(prev => ({ ...prev, filterSubject: subject }))
  }, [])
  
  const setFilterDifficulties = useCallback((difficulties: Record<string, boolean>) => {
    setFilterState(prev => ({ ...prev, filterDifficulties: difficulties }))
  }, [])
  
  const setFilterTopics = useCallback((topics: string[]) => {
    setFilterState(prev => ({ ...prev, filterTopics: topics }))
  }, [])
  
  const setFilterPerformance = useCallback((performance: 'low' | 'medium' | 'high' | null) => {
    setFilterState(prev => ({ ...prev, filterPerformance: performance }))
  }, [])
  
  const setTopicSearchInput = useCallback((search: string) => {
    setFilterState(prev => ({ ...prev, topicSearchInput: search }))
  }, [])
  
  const resetFilters = useCallback(() => {
    setFilterState({
      filterSubject: null,
      filterDifficulties: {
        'Easy': true,
        'Medium': true,
        'Hard': true,
        'Very Hard': true,
      },
      filterTopics: [],
      filterPerformance: null,
      topicSearchInput: '',
    })
  }, [])
  
  // Cell interaction actions
  const handleCellClick = useCallback((topic: string, difficulty: string) => {
    setSelectedCell({ topic, difficulty })
  }, [])
  
  const closeCellDetail = useCallback(() => {
    setSelectedCell(null)
    setHighlightedSetId(null)
  }, [])
  
  // Extract and process data
  const {
    allQuestions,
    filteredQuestions,
    subjects,
    topics,
    difficulties,
    questionsGrouped,
    gridRows,
    topicTotals,
    difficultyTotals,
    grandTotal,
    selectedCellData
  } = useMemo(() => {
    // Extract all questions with metadata from practice sets
    const extractedQuestions: QuestionWithMetadata[] = []
    
    practiceSets.forEach(set => {
      set.questions.forEach(question => {
        extractedQuestions.push({
          ...question,
          setId: set.id,
          setTitle: `${set.subject} - ${set.type}`, // Generate a title from subject and type
          subject: set.subject,
          dateCompleted: set.dateCompleted,
        })
      })
    })
    
    // Extract unique values
    const uniqueSubjects = Array.from(new Set(extractedQuestions.map(q => q.subject)))
    const uniqueTopics = Array.from(new Set(extractedQuestions.map(q => q.topic)))
    const uniqueDifficulties = Array.from(new Set(extractedQuestions.map(q => q.difficulty)))
    
    // Apply filters
    let filtered = [...extractedQuestions]
    
    // Subject filter
    if (filterState.filterSubject) {
      filtered = filtered.filter(q => q.subject === filterState.filterSubject)
    }
    
    // Difficulty filter
    filtered = filtered.filter(q => filterState.filterDifficulties[q.difficulty])
    
    // Topic filters (from dropdown)
    if (filterState.filterTopics.length > 0) {
      filtered = filtered.filter(q => filterState.filterTopics.includes(q.topic))
    }
    
    // Topic search (from text input)
    if (filterState.topicSearchInput.trim()) {
      const search = filterState.topicSearchInput.toLowerCase()
      filtered = filtered.filter(q => q.topic.toLowerCase().includes(search))
    }
    
    // Performance filter
    if (filterState.filterPerformance) {
      filtered = filtered.filter(q => {
        if (filterState.filterPerformance === 'low') {
          return !q.correct // 0% accuracy
        } else if (filterState.filterPerformance === 'medium') {
          return q.partiallyCorrect // Partial credit (in a real app, would check for % accuracy)
        } else {
          return q.correct // 100% accuracy
        }
      })
    }
    
    // Group questions by topic and difficulty
    const grouped = groupQuestionsByTopicAndDifficulty(filtered)
    
    // Create grid rows from grouped data
    const rows: GridRow[] = []
    const uniqueFilteredTopics = Array.from(new Set(filtered.map(q => q.topic)))
    
    uniqueFilteredTopics.sort().forEach(topic => {
      const cells: MatrixCell[] = []
      
      // Create cells for each active difficulty
      Object.entries(filterState.filterDifficulties)
        .filter(([_, isActive]) => isActive)
        .map(([difficulty]) => difficulty)
        .forEach(difficulty => {
          const key = `${topic}-${difficulty}`
          if (grouped[key]) {
            cells.push(grouped[key])
          } else {
            // Create empty cell
            cells.push({
              topic,
              difficulty,
              questions: [],
              count: 0,
              correctCount: 0,
              accuracy: 0,
              setIds: []
            })
          }
        })
      
      rows.push({ topic, cells })
    })
    
    // Calculate topic totals
    const topicTotalsData = calculateTopicTotals(filtered, uniqueFilteredTopics)
    
    // Calculate difficulty totals
    const difficultyTotalsData = calculateDifficultyTotals(
      filtered, 
      uniqueDifficulties,
      filterState.filterDifficulties
    )
    
    // Calculate grand total
    const grandTotalData = calculateGrandTotal(filtered)
    
    // Get selected cell data
    let selectedData: MatrixCell | null = null
    if (selectedCell) {
      const key = `${selectedCell.topic}-${selectedCell.difficulty}`
      selectedData = grouped[key] || null
    }
    
    return {
      allQuestions: extractedQuestions,
      filteredQuestions: filtered,
      subjects: uniqueSubjects,
      topics: uniqueTopics,
      difficulties: uniqueDifficulties,
      questionsGrouped: grouped,
      gridRows: rows,
      topicTotals: topicTotalsData,
      difficultyTotals: difficultyTotalsData,
      grandTotal: grandTotalData,
      selectedCellData: selectedData
    }
  }, [
    practiceSets, 
    filterState, 
    selectedCell
  ])
  
  return {
    // Data
    allQuestions,
    filteredQuestions,
    subjects,
    topics,
    difficulties,
    questionsGrouped,
    gridRows,
    topicTotals,
    difficultyTotals,
    grandTotal,
    
    // State
    filterState,
    selectedCell,
    selectedCellData,
    highlightedSetId,
    
    // Stats
    activeFilterCount: countActiveFilters(
      filterState.filterSubject,
      filterState.filterDifficulties,
      filterState.filterTopics,
      filterState.topicSearchInput,
      filterState.filterPerformance
    ),
    
    // Actions
    setFilterSubject,
    setFilterDifficulties,
    setFilterTopics,
    setFilterPerformance,
    setTopicSearchInput,
    resetFilters,
    handleCellClick,
    closeCellDetail,
    setHighlightedSetId
  }
}
