'use client'

import React from 'react'
import { QuestionViewProps } from './types'
import { QuestionWithMetadata } from '../question-view/types'
import { Question } from '@/lib/mockData'
import { EnhancedMatrixGrid } from '../enhanced-matrix/components/EnhancedMatrixGrid'
import { getDataWithFallback } from '@/lib/dataUtils'
import { distributeQuestionsAcrossMasteryLevels } from '../enhanced-matrix/utils/dataUtils'
import { PracticeSet } from '@/lib/mockData'

/**
 * Enhanced Matrix Grid View for the By Question tab
 * 
 * A fully-featured matrix view that organizes questions by topic and difficulty
 * with comprehensive filtering capabilities and ensured data distribution
 * across all mastery levels (Very Weak, Weak, Not Attempted, Emerging, Proficient, Mastered)
 */
export function EnhancedMatrixGridView(props: QuestionViewProps) {
  try {
    // Debug data loading
    console.log('EnhancedMatrixGridView received practiceSets:', props.practiceSets?.length);
    
    // Get the base data with fallback
    const fallbackData = getDataWithFallback(props.practiceSets);
    
    // Extract questions from practice sets and normalize to avoid common issues
    const allQuestions: QuestionWithMetadata[] = [];
    
    fallbackData.forEach(set => {
      // For each set, extract its questions and add the set ID and title
      if (set.questions && Array.isArray(set.questions)) {
        const setTitle = `${set.subject} ${set.type} (${set.id})`;
        
        // Process questions with careful type handling
        const processedQuestions = set.questions.map((q: Question) => {
          return {
            ...q,
            setId: set.id,
            setTitle: setTitle,
            subject: set.subject,
            subtopic: q.subtopic || 'General', // Ensure subtopic is never undefined
            topic: q.topic || 'General Topic', // Ensure topic is never undefined
            dateCompleted: set.dateCompleted
          };
        });
        
        allQuestions.push(...processedQuestions);
      }
    });
    
    // Ensure questions are distributed across all mastery levels
    const distributedQuestions = distributeQuestionsAcrossMasteryLevels(allQuestions);
    console.log('Distributed questions processed:', distributedQuestions.length);
    
    // Create an enhanced practice set with our processed data
    const enhancedPracticeSet: PracticeSet = {
      id: 'matrix-data',
      questions: distributedQuestions as any, // Type assertion needed due to complex structure
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
    
    // Update the props with our processed data
    const enhancedData = {
      ...props,
      practiceSets: [enhancedPracticeSet]
    };
    
    return <EnhancedMatrixGrid {...enhancedData} />;
  } catch (error) {
    // Fallback UI in case of error
    console.error('Error in EnhancedMatrixGridView:', error);
    return (
      <div className="p-6 border border-red-300 bg-red-50 dark:bg-red-900/10 rounded-lg dark:border-red-800">
        <h2 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Matrix View Unavailable</h2>
        <p className="text-red-700 dark:text-red-400">
          We're currently unable to display the matrix view due to a technical issue. 
          Please try another view or refresh the page.
        </p>
      </div>
    );
  }
}
