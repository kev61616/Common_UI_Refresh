'use client'

import { QuestionWithMetadata } from '../../question-view/types'

/**
 * Filter utility functions for the performance matrix
 */

/**
 * Extract unique topic names from all questions
 */
export const extractUniqueTopics = (questions: QuestionWithMetadata[]): string[] => {
  const topics = Array.from(
    new Set(questions.map(q => q.topic))
  )
  return topics.sort()
}

/**
 * Extract unique subject names from all questions
 */
export const extractUniqueSubjects = (questions: QuestionWithMetadata[]): string[] => {
  const subjects = Array.from(
    new Set(questions.map(q => q.subject))
  )
  return subjects.sort()
}

/**
 * Apply all active filters to the questions
 */
export const applyFilters = (
  questions: QuestionWithMetadata[],
  filterSubject: string | null,
  filterDifficulties: Record<string, boolean>,
  filterTopics: string[],
  topicSearchInput: string,
  filterPerformance: 'low' | 'medium' | 'high' | null,
  difficulties: string[]
): QuestionWithMetadata[] => {
  return questions.filter(question => {
    // Filter by subject
    if (filterSubject && question.subject !== filterSubject) {
      return false
    }
    
    // Filter by difficulty
    if (!filterDifficulties[question.difficulty]) {
      return false
    }
    
    // Filter by topics
    if (filterTopics.length > 0 && !filterTopics.includes(question.topic)) {
      return false
    }
    
    // Filter by topic search input
    if (topicSearchInput && !question.topic.toLowerCase().includes(topicSearchInput.toLowerCase())) {
      return false
    }
    
    // Filter by performance level
    if (filterPerformance) {
      const accuracy = question.correct ? 100 : 0
      
      if (filterPerformance === 'low' && accuracy >= 60) {
        return false
      } else if (filterPerformance === 'medium' && (accuracy < 60 || accuracy > 80)) {
        return false
      } else if (filterPerformance === 'high' && accuracy <= 80) {
        return false
      }
    }
    
    return true
  })
}
