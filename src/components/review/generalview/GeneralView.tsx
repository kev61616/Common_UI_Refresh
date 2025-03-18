'use client'

import React from 'react'
import { QuestionViewProps } from '../question-view-variants/types'
import { QuestionWithMetadata } from '../question-view/types'
import { EnhancedMatrixGrid } from '../enhanced-matrix/components/EnhancedMatrixGrid'
import { getDataWithFallback } from '@/lib/dataUtils'
import { distributeQuestionsAcrossMasteryLevels } from '../enhanced-matrix/utils/dataUtils'
import { PracticeSet } from '@/lib/mockData'

/**
 * General View that shows a matrix grid of all data
 * 
 * A fully-featured matrix view that organizes questions by topic and difficulty
 * with comprehensive filtering capabilities and ensured data distribution
 * across all mastery levels (Very Weak, Weak, Not Attempted, Emerging, Proficient, Mastered)
 */
export function GeneralView(props: QuestionViewProps) {
  // Debug data loading
  console.log('GeneralView received practiceSets:', props.practiceSets?.length);
  
  // Get the base data with fallback
  const fallbackData = getDataWithFallback(props.practiceSets);
  
  // Extract questions from practice sets
  let allQuestions: QuestionWithMetadata[] = [];
  fallbackData.forEach(set => {
    // For each set, extract its questions and add the set ID and title
    if (set.questions) {
      const questionsWithSetInfo = set.questions.map((q: any) => ({
        ...q,
        setId: set.id,
        setTitle: set.type || 'Practice Set'
      }));
      allQuestions = [...allQuestions, ...questionsWithSetInfo];
    }
  });
  
  // Ensure questions are distributed across all mastery levels
  const distributedQuestions = distributeQuestionsAcrossMasteryLevels(allQuestions);
  
  // This data is for display only - we'll rebuild the practice sets structure
  // but with our enhanced distribution that ensures all mastery levels have data
  const enhancedPracticeSet: PracticeSet = {
    id: 'matrix-data',
    questions: distributedQuestions,
    subject: 'Math',
    type: 'Matrix View',
    accuracy: 65,
    timeUsed: 0,
    difficulty: 'Medium',
    pace: 'Normal',
    dateCompleted: new Date().toISOString(),
    timeOfDay: 'Afternoon',
    mistakeTypes: {
      conceptual: 2,
      careless: 1,
      timeManagement: 1
    },
    sessionFatigue: {
      earlyAccuracy: 75,
      lateAccuracy: 65,
      earlyPace: 90,
      latePace: 80
    }
  };
  
  const enhancedData = {
    ...props,
    practiceSets: [enhancedPracticeSet]
  };
  
  return <EnhancedMatrixGrid {...enhancedData} />
}
