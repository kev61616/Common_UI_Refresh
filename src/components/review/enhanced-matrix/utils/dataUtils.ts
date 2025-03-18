'use client'

import { QuestionWithMetadata } from '../../question-view/types'
import { DifficultyTotal, GrandTotal, GridRow, MatrixCell, TopicTotal } from '../types'

/**
 * Get mastery level data based on question metrics
 * Mastery levels:
 * 1. Very Weak (3x incorrect)
 * 2. Weak (2x incorrect)
 * 3. Not Attempted (0x attempted)
 * 4. Emerging (1x correct)
 * 5. Proficient (2x correct)
 * 6. Mastered (3+x correct)
 */
export const getMasteryLevel = (correctCount: number, incorrectCount: number) => {
  const totalAttempts = correctCount + incorrectCount;
  
  if (totalAttempts === 0) {
    return {
      level: 'Not Attempted',
      colorClass: 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400'
    };
  }
  
  if (incorrectCount >= 3) {
    return {
      level: 'Very Weak',
      colorClass: 'bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-400'
    };
  }
  
  if (incorrectCount === 2) {
    return {
      level: 'Weak',
      colorClass: 'bg-orange-50 dark:bg-orange-900/10 text-orange-800 dark:text-orange-400'
    };
  }
  
  if (correctCount === 1) {
    return {
      level: 'Emerging',
      colorClass: 'bg-yellow-50 dark:bg-yellow-900/10 text-yellow-800 dark:text-yellow-400'
    };
  }
  
  if (correctCount === 2) {
    return {
      level: 'Proficient',
      colorClass: 'bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-400'
    };
  }
  
  return {
    level: 'Mastered',
    colorClass: 'bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-400'
  };
};

/**
 * Get the background color class for a cell based on mastery level metrics
 */
export const getCellColor = (accuracy: number, count: number): string => {
  if (count === 0) {
    return 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400';
  }
  
  // For demo purposes, using accuracy to determine correct/incorrect count
  const correctCount = Math.round((accuracy / 100) * count);
  const incorrectCount = count - correctCount;
  
  return getMasteryLevel(correctCount, incorrectCount).colorClass;
}

/**
 * Get the text color class for a cell based on mastery level metrics
 */
export const getTextColor = (accuracy: number, count: number): string => {
  if (count === 0) {
    return 'text-gray-600 dark:text-gray-400';
  }
  
  // Calculate approximate correct/incorrect counts based on accuracy
  const correctCount = Math.round((accuracy / 100) * count);
  const incorrectCount = count - correctCount;
  
  // Extract just the text color from the color class
  const { colorClass } = getMasteryLevel(correctCount, incorrectCount);
  
  // Return just the text color portion
  if (colorClass.includes('text-red')) return 'text-red-700 dark:text-red-400';
  if (colorClass.includes('text-orange')) return 'text-orange-700 dark:text-orange-400';
  if (colorClass.includes('text-yellow')) return 'text-yellow-700 dark:text-yellow-400';
  if (colorClass.includes('text-blue')) return 'text-blue-700 dark:text-blue-400';
  if (colorClass.includes('text-green')) return 'text-green-700 dark:text-green-400';
  
  return 'text-gray-600 dark:text-gray-400';
}

/**
 * Group questions by topic and difficulty to create a map for lookups
 */
export const groupQuestionsByTopicAndDifficulty = (
  questions: QuestionWithMetadata[]
): Record<string, { count: number; correctCount: number }> => {
  const result: Record<string, { count: number; correctCount: number }> = {}
  
  questions.forEach(question => {
    const key = `${question.topic}-${question.difficulty}`
    
    if (!result[key]) {
      result[key] = { count: 0, correctCount: 0 }
    }
    
    result[key].count++
    if (question.correct) {
      result[key].correctCount++
    }
  })
  
  return result
}

/**
 * Calculate summary statistics for each topic
 */
export const calculateTopicTotals = (
  questions: QuestionWithMetadata[],
  topics: string[]
): TopicTotal[] => {
  const result: TopicTotal[] = []
  
  topics.forEach(topic => {
    const topicQuestions = questions.filter(q => q.topic === topic)
    const count = topicQuestions.length
    const correctCount = topicQuestions.filter(q => q.correct).length
    const accuracy = count > 0 ? Math.round((correctCount / count) * 100) : 0
    
    result.push({
      topic,
      count,
      correctCount,
      accuracy
    })
  })
  
  return result
}

/**
 * Calculate summary statistics for each difficulty level
 */
export const calculateDifficultyTotals = (
  questions: QuestionWithMetadata[],
  difficulties: string[],
  filterDifficulties: Record<string, boolean>
): DifficultyTotal[] => {
  return difficulties
    .filter(difficulty => filterDifficulties[difficulty]) // Only include active difficulties
    .map(difficulty => {
      const difficultyQuestions = questions.filter(q => q.difficulty === difficulty)
      const count = difficultyQuestions.length
      const correctCount = difficultyQuestions.filter(q => q.correct).length
      const accuracy = count > 0 ? Math.round((correctCount / count) * 100) : 0
      
      return {
        difficulty,
        count,
        correctCount,
        accuracy
      }
    })
}

/**
 * Calculate overall statistics for the entire grid
 */
export const calculateGrandTotal = (questions: QuestionWithMetadata[]): GrandTotal => {
  const count = questions.length
  const correctCount = questions.filter(q => q.correct).length
  const accuracy = count > 0 ? Math.round((correctCount / count) * 100) : 0
  
  return {
    count,
    correctCount,
    accuracy
  }
}
