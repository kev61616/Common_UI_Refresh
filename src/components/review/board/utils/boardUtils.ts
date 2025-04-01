'use client'

import { Question } from '@/lib/mockData'

/**
 * Returns the appropriate color class for a given subject.
 * This function is critical for maintaining consistent rendering between server and client.
 * 
 * @param subject The subject string
 * @returns The corresponding Tailwind color class
 */
export const getSubjectColor = (subject: string): string => {
  switch (subject) {
    case 'Math':
      return 'bg-emerald-500 dark:bg-emerald-600';
    case 'Reading':
      return 'bg-sky-500 dark:bg-sky-600';
    case 'Writing':
      return 'bg-purple-500 dark:bg-purple-600';
    default:
      return 'bg-gray-500 dark:bg-gray-600';
  }
}

/**
 * Generates a deterministic mastery score based on question ID.
 * This ensures consistent categorization across server and client rendering.
 * 
 * @param questionId The question ID
 * @returns A consistent number between 0 and 1
 */
export const getMasteryScore = (questionId: string): number => {
  // Use hash-like approach to convert ID to a numeric value
  const hashValue = questionId.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // Return a value between 0 and 1 based on hash
  return (hashValue % 100) / 100;
};

/**
 * Creates a stable hash value from a string.
 * 
 * @param str The input string
 * @returns A number between 0 and 1
 */
export const getStableHashFromString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Normalize to 0-1 range
  return Math.abs(hash) / 2147483647;
};

/**
 * Creates a deterministic clone of a question for duplication purposes.
 * 
 * @param question The original question
 * @param setId The parent set ID
 * @param categoryId The target category ID
 * @returns A cloned question with a deterministic ID
 */
export const createDeterministicQuestionClone = (
  question: Question & { setId: string; setSubject: string },
  setId: string,
  categoryId: string
): Question & { setId: string; setSubject: string } => {
  return {
    ...question,
    // Create a deterministic ID based on original ID + category
    id: `${question.id}-dup-${categoryId}`
  };
};
