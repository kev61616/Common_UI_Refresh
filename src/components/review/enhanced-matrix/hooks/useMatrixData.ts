'use client'

import { useState, useEffect } from 'react'
import { QuestionWithMetadata } from '../../question-view/types'
import { QuestionViewProps } from '../../question-view-variants/types'
import { extractQuestionsWithMetadata } from '../../question-view/utils'
import { applyFilters, extractUniqueSubjects, extractUniqueTopics, getInitialFilterState, isTopicInSubject, extractUniqueTopicsForSubject } from '../utils/filterUtils'
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
  
  // Mastery levels for column organization
  const masteryLevels = [
    'Very Weak', 
    'Weak', 
    'Not Attempted', 
    'Emerging', 
    'Proficient', 
    'Mastered'
  ]
  
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
  // If subject filter is applied, only include topics that belong to that subject
  let topics = Array.from(new Set(filteredQuestions.map(q => q.topic))).sort();
  
  // Extra filtering to ensure topics match the selected subject
  if (filterSubject) {
    topics = topics.filter(topic => isTopicInSubject(topic, filterSubject));
  }
  
  // Create grid structure organized by mastery level (not difficulty)
  const createGrid = (): GridRow[] => {
    // Define mastery levels
    const masteryLevels = [
      'Very Weak', 
      'Weak', 
      'Not Attempted', 
      'Emerging', 
      'Proficient', 
      'Mastered'
    ];
    
    return topics.map(topic => {
      // Get all questions for this topic
      const topicQuestions = filteredQuestions.filter(q => q.topic === topic);
      
      // Create a cell for each mastery level
      const cells = masteryLevels.map(masteryLevel => {
        // Categorize questions by mastery level - same logic as in dataUtils.ts
        let cellQuestions: QuestionWithMetadata[] = [];
        
        topicQuestions.forEach(question => {
          let matches = false;
          
          try {
            const totalAttempts = question.attempts || 0;
            const isCorrect = question.correct;
            
            // Safely handle masteryLevel which could be a string or number
            let questionMasteryLevel: string | number = 'not-attempted';
            
            if (question.masteryLevel !== undefined) {
              // Handle both string and numeric mastery levels
              if (typeof question.masteryLevel === 'string') {
                questionMasteryLevel = question.masteryLevel;
              } else if (typeof question.masteryLevel === 'number') {
                // Map numbers to string values
                const masteryMap: Record<number, string> = {
                  0: 'weak',
                  1: 'emerging',
                  2: 'proficient',
                  3: 'mastered'
                };
                questionMasteryLevel = masteryMap[question.masteryLevel] || 'not-attempted';
              }
            }
            
            // Match based on standardized mastery levels
            if (masteryLevel === 'Not Attempted' && (totalAttempts === 0 || questionMasteryLevel === 'not-attempted')) {
              matches = true;
            } else if (masteryLevel === 'Very Weak' && (
              (questionMasteryLevel === 'very-weak') ||
              (questionMasteryLevel === 'weak' && !isCorrect)
            )) {
              matches = true;
            } else if (masteryLevel === 'Weak' && (
              (questionMasteryLevel === 'weak' && isCorrect)
            )) {
              matches = true;
            } else if (masteryLevel === 'Emerging' && questionMasteryLevel === 'emerging') {
              matches = true;
            } else if (masteryLevel === 'Proficient' && questionMasteryLevel === 'proficient') {
              matches = true;
            } else if (masteryLevel === 'Mastered' && questionMasteryLevel === 'mastered') {
              matches = true;
            }
            
            if (matches) {
              cellQuestions.push(question);
            }
          } catch (error) {
            console.error('Error processing question mastery level:', error);
            // Skip this question if there's an error
          }
        });
        
        return {
          topic,
          difficulty: masteryLevel, // Using masteryLevel in place of difficulty for cell mapping
          questions: cellQuestions,
          count: cellQuestions.length,
          correctCount: cellQuestions.filter(q => q.correct).length,
          accuracy: cellQuestions.length > 0 
            ? Math.round((cellQuestions.filter(q => q.correct).length / cellQuestions.length) * 100) 
            : 0,
          setIds: Array.from(new Set(cellQuestions.map(q => q.setId)))
        };
      });
      
      return {
        topic,
        cells
      };
    });
  };
  
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
