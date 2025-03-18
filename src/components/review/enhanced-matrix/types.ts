import { QuestionWithMetadata } from '../question-view/types'

/**
 * Represents a cell in the matrix
 */
export interface MatrixCell {
  topic: string
  difficulty: string
  questions: QuestionWithMetadata[]
  count: number
  correctCount: number
  accuracy: number
  setIds: string[]
}

/**
 * Represents a row in the matrix (topic)
 */
export interface GridRow {
  topic: string
  cells: MatrixCell[]
}

/**
 * Statistics for a topic
 */
export interface TopicTotal {
  topic: string
  count: number
  correctCount: number
  accuracy: number
}

/**
 * Statistics for a difficulty level
 */
export interface DifficultyTotal {
  difficulty: string
  count: number
  correctCount: number
  accuracy: number
}

/**
 * Overall statistics
 */
export interface GrandTotal {
  count: number
  correctCount: number
  accuracy: number
}
