'use client'

import { QuestionWithMetadata } from '../../question-view/types'
import { groupQuestionsByTopicAndDifficulty } from './dataUtils'

/**
 * Apply filters to the questions
 */
export const applyFilters = (
  allQuestions: QuestionWithMetadata[],
  filterSubject: string | null,
  filterDifficulties: Record<string, boolean>,
  filterTopics: string[],
  topicSearchInput: string,
  filterPerformance: 'low' | 'medium' | 'high' | null,
  difficulties: string[]
): QuestionWithMetadata[] => {
  // Start with subject filter
  let result = filterSubject
    ? allQuestions.filter(q => q.subject === filterSubject)
    : allQuestions
  
  // Apply difficulty filter
  const activeDifficulties = Object.entries(filterDifficulties)
    .filter(([_, isActive]) => isActive)
    .map(([difficulty]) => difficulty)
    
  if (activeDifficulties.length < difficulties.length) {
    result = result.filter(q => activeDifficulties.includes(q.difficulty))
  }
  
  // Apply topic filter
  if (filterTopics.length > 0) {
    result = result.filter(q => filterTopics.includes(q.topic))
  }
  
  // Apply search filter on topics
  if (topicSearchInput.trim() !== '') {
    const searchLowercase = topicSearchInput.toLowerCase()
    result = result.filter(q => 
      q.topic.toLowerCase().includes(searchLowercase) || 
      q.subtopic.toLowerCase().includes(searchLowercase)
    )
  }
  
  // Apply performance filter
  if (filterPerformance) {
    const groupedQuestions = groupQuestionsByTopicAndDifficulty(result)
    
    result = result.filter(q => {
      const key = `${q.topic}-${q.difficulty}`
      const cell = groupedQuestions[key]
      if (!cell || cell.count === 0) return false
      
      const accuracy = cell.correctCount / cell.count
      
      if (filterPerformance === 'low') {
        return accuracy < 0.6
      } else if (filterPerformance === 'medium') {
        return accuracy >= 0.6 && accuracy < 0.8
      } else if (filterPerformance === 'high') {
        return accuracy >= 0.8
      }
      
      return true
    })
  }
  
  return result
}

/**
 * Create a fresh filter state
 */
export const getInitialFilterState = () => ({
  filterSubject: null as string | null,
  filterDifficulties: {
    'Easy': true,
    'Medium': true,
    'Hard': true
  },
  filterTopics: [] as string[],
  filterPerformance: null as 'low' | 'medium' | 'high' | null,
  topicSearchInput: '',
  showTopicFilter: false
})

/**
 * Extract unique subjects from questions
 */
export const extractUniqueSubjects = (questions: QuestionWithMetadata[]): string[] => {
  return Array.from(new Set(questions.map(q => q.subject))).sort()
}

/**
 * Extract unique topics from questions
 */
export const extractUniqueTopics = (questions: QuestionWithMetadata[]): string[] => {
  return Array.from(new Set(questions.map(q => q.topic))).sort()
}

/**
 * Reset all filters to their default state
 */
export const resetFilters = (setFilterSubject: (val: string | null) => void,
                         setFilterDifficulties: (val: Record<string, boolean>) => void,
                         setFilterTopics: (val: string[]) => void,
                         setFilterPerformance: (val: 'low' | 'medium' | 'high' | null) => void,
                         setTopicSearchInput: (val: string) => void) => {
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
