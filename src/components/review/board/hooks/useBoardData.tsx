'use client';

import { useMemo } from 'react';
import { Question } from '@/lib/mockData';
import { masteryLevels } from '../utils/boardConstants';
import { getMasteryScore, createDeterministicQuestionClone } from '../utils/boardUtils';

type ExtendedQuestion = Question & {setId: string;setSubject: string;};

interface UseBoardDataProps {
  questions: ExtendedQuestion[];
}

/**
 * Custom hook to process and organize question data for the board view.
 * Using a custom hook makes the data processing logic reusable and separates
 * concerns from the rendering components.
 */
export function useBoardData({ questions }: UseBoardDataProps) {
  // Group questions by mastery level
  const questionsByLevel = useMemo(() => {
    const grouped: Record<string, ExtendedQuestion[]> = {};

    // Initialize empty arrays for each mastery level
    masteryLevels.forEach((level) => {
      grouped[level.id] = [];
    });

    // Distribute questions to appropriate levels using deterministic mastery scores
    questions.forEach((question) => {
      const masteryScore = getMasteryScore(question.id);

      // Find the appropriate mastery level based on score ranges
      const targetLevel = masteryLevels.find((level) =>
      masteryScore >= level.scoreRange.min && masteryScore < level.scoreRange.max
      );

      if (targetLevel) {
        // Override for not-attempted which has special logic
        if (!question.answered && targetLevel.id !== 'not-attempted') {
          grouped['not-attempted'].push(question);
        } else {
          grouped[targetLevel.id].push(question);
        }
      }

      // Create deterministic duplicate entries to ensure we have data in all categories
      // This is for demo purposes but done in a deterministic way
      const dupHash = getMasteryScore(question.id + '-dup');

      if (dupHash < 0.3) {
        // Create proficient clone with deterministic ID
        const questionClone = createDeterministicQuestionClone(question, question.setId, 'proficient');
        grouped['proficient'].push(questionClone);
      } else if (dupHash < 0.6) {
        // Create mastered clone with deterministic ID
        const questionClone = createDeterministicQuestionClone(question, question.setId, 'mastered');
        grouped['mastered'].push(questionClone);
      }
    });

    return grouped;
  }, [questions]);

  return {
    questionsByLevel
  };
}