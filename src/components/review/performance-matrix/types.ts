'use client'

import { QuestionWithMetadata } from '../question-view/types'

/**
 * Types for the performance matrix component
 */

// Represents a single cell in the matrix
export interface MatrixCell {
  topic: string
  difficulty: string
  questions: QuestionWithMetadata[]
  count: number
  correctCount: number
  accuracy: number
  setIds: string[]
}

// Record of matrix cells indexed by "topic-difficulty" keys
export type GroupedQuestions = Record<string, MatrixCell>

// A row in the grid representing all cells for a topic
export interface GridRow {
  topic: string
  cells: MatrixCell[]
}

// Metrics for a topic row total
export interface TopicTotal {
  count: number
  correctCount: number
  accuracy: number
  setIds: string[] // List of set IDs that contain questions for this topic
}

// Metrics for a difficulty column total
export interface DifficultyTotal {
  count: number
  correctCount: number
  accuracy: number
  setIds: string[] // List of set IDs that contain questions for this difficulty
}

// Metrics for the overall total
export interface GrandTotal {
  count: number
  correctCount: number
  accuracy: number
  setIds: string[] // List of all unique set IDs in the filtered questions
}

// State for filters
export interface FilterState {
  filterSubject: string | null
  filterDifficulties: Record<string, boolean>
  filterTopics: string[]
  filterPerformance: 'low' | 'medium' | 'high' | null
  topicSearchInput: string
}

// State for the selected cell
export interface SelectedCellState {
  topic: string
  difficulty: string
}
