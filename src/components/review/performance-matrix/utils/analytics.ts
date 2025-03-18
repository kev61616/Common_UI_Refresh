'use client'

import { QuestionWithMetadata } from '../../question-view/types'
import { MatrixCell, TopicTotal, DifficultyTotal, GrandTotal, GroupedQuestions } from '../types'

/**
 * Group questions by topic and difficulty, calculating accuracy for each group
 */
export const groupQuestionsByTopicAndDifficulty = (
  questions: QuestionWithMetadata[]
): GroupedQuestions => {
  const grouped: GroupedQuestions = {}
  
  // Loop through all questions
  questions.forEach(question => {
    const key = `${question.topic}-${question.difficulty}`
    
    // Create the group if it doesn't exist
    if (!grouped[key]) {
      grouped[key] = {
        topic: question.topic,
        difficulty: question.difficulty,
        questions: [],
        count: 0,
        correctCount: 0,
        accuracy: 0,
        setIds: []
      }
    }
    
    // Add question to the group
    grouped[key].questions.push(question)
    grouped[key].count++
    
    if (question.correct) {
      grouped[key].correctCount++
    }
    
    // Add setId if not already in the list
    if (!grouped[key].setIds.includes(question.setId)) {
      grouped[key].setIds.push(question.setId)
    }
  })
  
  // Calculate accuracy for each group
  Object.keys(grouped).forEach(key => {
    const group = grouped[key]
    group.accuracy = group.count > 0 
      ? Math.round((group.correctCount / group.count) * 100) 
      : 0
  })
  
  return grouped
}

/**
 * Calculate totals for each topic row
 */
export const calculateTopicTotals = (
  questions: QuestionWithMetadata[],
  topics: string[]
): Record<string, TopicTotal> => {
  const totals: Record<string, TopicTotal> = {}
  
  // Create a record for each topic
  topics.forEach(topic => {
    totals[topic] = {
      count: 0,
      correctCount: 0,
      accuracy: 0,
      setIds: []
    }
  })
  
  // Process all questions
  questions.forEach(question => {
    if (totals[question.topic]) {
      totals[question.topic].count++
      
      if (question.correct) {
        totals[question.topic].correctCount++
      }
      
      // Add setId if not already in the list
      if (!totals[question.topic].setIds.includes(question.setId)) {
        totals[question.topic].setIds.push(question.setId)
      }
    }
  })
  
  // Calculate accuracy
  Object.keys(totals).forEach(topic => {
    const total = totals[topic]
    total.accuracy = total.count > 0 
      ? Math.round((total.correctCount / total.count) * 100) 
      : 0
  })
  
  return totals
}

/**
 * Calculate totals for each difficulty column
 */
export const calculateDifficultyTotals = (
  questions: QuestionWithMetadata[],
  difficulties: string[],
  activeDifficulties: Record<string, boolean>
): Record<string, DifficultyTotal> => {
  const totals: Record<string, DifficultyTotal> = {}
  
  // Create a record for each active difficulty
  difficulties.forEach(difficulty => {
    if (activeDifficulties[difficulty]) {
      totals[difficulty] = {
        count: 0,
        correctCount: 0,
        accuracy: 0,
        setIds: []
      }
    }
  })
  
  // Process all questions
  questions.forEach(question => {
    if (totals[question.difficulty]) {
      totals[question.difficulty].count++
      
      if (question.correct) {
        totals[question.difficulty].correctCount++
      }
      
      // Add setId if not already in the list
      if (!totals[question.difficulty].setIds.includes(question.setId)) {
        totals[question.difficulty].setIds.push(question.setId)
      }
    }
  })
  
  // Calculate accuracy
  Object.keys(totals).forEach(difficulty => {
    const total = totals[difficulty]
    total.accuracy = total.count > 0 
      ? Math.round((total.correctCount / total.count) * 100) 
      : 0
  })
  
  return totals
}

/**
 * Calculate grand total across all filtered questions
 */
export const calculateGrandTotal = (questions: QuestionWithMetadata[]): GrandTotal => {
  const total: GrandTotal = {
    count: questions.length,
    correctCount: 0,
    accuracy: 0,
    setIds: []
  }
  
  // Count correct answers and collect unique set IDs
  questions.forEach(question => {
    if (question.correct) {
      total.correctCount++
    }
    
    // Add setId if not already in the list
    if (!total.setIds.includes(question.setId)) {
      total.setIds.push(question.setId)
    }
  })
  
  // Calculate overall accuracy
  total.accuracy = total.count > 0 
    ? Math.round((total.correctCount / total.count) * 100) 
    : 0
    
  return total
}

/**
 * Count the number of active filters
 */
export const countActiveFilters = (
  filterSubject: string | null,
  filterDifficulties: Record<string, boolean>,
  filterTopics: string[],
  topicSearchInput: string,
  filterPerformance: 'low' | 'medium' | 'high' | null
): number => {
  let count = 0
  
  // Subject filter
  if (filterSubject) {
    count++
  }
  
  // Difficulty filters
  const difficultiesCount = Object.values(filterDifficulties).filter(v => !v).length
  if (difficultiesCount > 0) {
    count++
  }
  
  // Topic filters
  if (filterTopics.length > 0) {
    count++
  }
  
  // Topic search
  if (topicSearchInput.trim()) {
    count++
  }
  
  // Performance filter
  if (filterPerformance) {
    count++
  }
  
  return count
}
