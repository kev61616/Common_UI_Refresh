'use client'

import { QuestionWithMetadata } from '../../question-view/types'
import { DifficultyTotal, GrandTotal, GridRow, MatrixCell, TopicTotal } from '../types'
import { getSubjectForTopic, isTopicInSubject } from './filterUtils'

/**
 * Get mastery level data based on question metrics
 * Based on defined masteryLevels:
 * 1. Very Weak (2x+ incorrect)
 * 2. Weak (1x incorrect)
 * 3. Not Attempted (0x attempted)
 * 4. Emerging (1x correct)
 * 5. Proficient (2x correct)
 * 6. Mastered (3x+ correct)
 */
export const getMasteryLevel = (question: QuestionWithMetadata) => {
  const attempts = question.attempts || 0;
  const isCorrect = question.correct;
  
  if (attempts === 0) {
    return {
      level: 'Not Attempted',
      colorClass: 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400'
    };
  }
  
  if (!isCorrect && attempts >= 2) {
    return {
      level: 'Very Weak',
      colorClass: 'bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-400'
    };
  }
  
  if (!isCorrect && attempts === 1) {
    return {
      level: 'Weak',
      colorClass: 'bg-orange-50 dark:bg-orange-900/10 text-orange-800 dark:text-orange-400'
    };
  }
  
  if (isCorrect && attempts === 1) {
    return {
      level: 'Emerging',
      colorClass: 'bg-yellow-50 dark:bg-yellow-900/10 text-yellow-800 dark:text-yellow-400'
    };
  }
  
  if (isCorrect && attempts === 2) {
    return {
      level: 'Proficient',
      colorClass: 'bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-400'
    };
  }
  
  if (isCorrect && attempts >= 3) {
    return {
      level: 'Mastered',
      colorClass: 'bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-400'
    };
  }
  
  // Fallback case
  return {
    level: 'Not Attempted',
    colorClass: 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400'
  };
};

/**
 * Get the background color class for a cell based on mastery level
 */
export const getCellColor = (accuracy: number, count: number, masteryLevel?: string): string => {
  if (count === 0) {
    return 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400';
  }
  
  // If a specific mastery level is provided, use its color
  if (masteryLevel) {
    switch(masteryLevel) {
      case 'Very Weak':
        return 'bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-400';
      case 'Weak':
        return 'bg-orange-50 dark:bg-orange-900/10 text-orange-800 dark:text-orange-400';
      case 'Not Attempted':
        return 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400';
      case 'Emerging':
        return 'bg-yellow-50 dark:bg-yellow-900/10 text-yellow-800 dark:text-yellow-400';
      case 'Proficient':
        return 'bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-400';
      case 'Mastered':
        return 'bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-400';
      default:
        break;
    }
  }
  
  // Fallback to using accuracy to determine color
  if (accuracy >= 80) {
    return 'bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-400';
  } else if (accuracy >= 60) {
    return 'bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-400';
  } else if (accuracy > 0) {
    return 'bg-yellow-50 dark:bg-yellow-900/10 text-yellow-800 dark:text-yellow-400';
  } else {
    return 'bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-400';
  }
}

/**
 * Get the text color class for a cell based on mastery level metrics
 */
export const getTextColor = (accuracy: number, count: number): string => {
  if (count === 0) {
    return 'text-gray-600 dark:text-gray-400';
  }
  
  // Determine color based on accuracy
  if (accuracy >= 80) {
    return 'text-green-700 dark:text-green-400';
  } else if (accuracy >= 60) {
    return 'text-blue-700 dark:text-blue-400';
  } else if (accuracy >= 40) {
    return 'text-yellow-700 dark:text-yellow-400';
  } else if (accuracy >= 20) {
    return 'text-orange-700 dark:text-orange-400';
  } else {
    return 'text-red-700 dark:text-red-400';
  }
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
 * Calculate summary statistics for each mastery level
 * This function categorizes questions into the 6 mastery levels based on the definitions
 * and ensures proper data distribution across all columns
 */
export const calculateDifficultyTotals = (
  questions: QuestionWithMetadata[],
  difficulties: string[],
  filterDifficulties: Record<string, boolean>
): DifficultyTotal[] => {
  // Define the mastery levels
  const masteryLevels = [
    'Very Weak',   // 2x+ incorrect
    'Weak',        // 1x incorrect
    'Not Attempted', // 0x attempted
    'Emerging',    // 1x correct
    'Proficient',  // 2x correct
    'Mastered'     // 3x+ correct
  ];
  
  // Categorize questions by their mastery level
  const categorizedQuestions = new Map<string, QuestionWithMetadata[]>();
  
  // Initialize all mastery levels with empty arrays
  masteryLevels.forEach(level => {
    categorizedQuestions.set(level, []);
  });
  
  // Categorize each question based on its mastery level according to rules
  questions.forEach(question => {
    const attempts = question.attempts || 0;
    const isCorrect = question.correct;
    
    // Determine the mastery level based on the rules
    let masteryLevel = 'Not Attempted';
    
    if (attempts === 0) {
      masteryLevel = 'Not Attempted';
    } else if (!isCorrect && attempts >= 2) {
      masteryLevel = 'Very Weak';
    } else if (!isCorrect && attempts === 1) {
      masteryLevel = 'Weak';
    } else if (isCorrect && attempts === 1) {
      masteryLevel = 'Emerging';
    } else if (isCorrect && attempts === 2) {
      masteryLevel = 'Proficient';
    } else if (isCorrect && attempts >= 3) {
      masteryLevel = 'Mastered';
    }
    
    // Add the question to the appropriate category
    categorizedQuestions.get(masteryLevel)?.push(question);
  });
  
  // Calculate statistics for each mastery level
  const result: DifficultyTotal[] = masteryLevels.map(level => {
    const levelQuestions = categorizedQuestions.get(level) || [];
    const count = levelQuestions.length;
    const correctCount = levelQuestions.filter(q => q.correct).length;
    const accuracy = count > 0 ? Math.round((correctCount / count) * 100) : 0;
    
    return {
      difficulty: level, // Use the mastery level as the difficulty key
      count,
      correctCount,
      accuracy
    };
  });

  // If we don't have enough real data, enhance it with synthetic data
  if (questions.length < 100) {
    // Create a distribution across mastery levels
    const distribution = {
      'Very Weak': 0.15,    // 15%
      'Weak': 0.17,         // 17%
      'Not Attempted': 0.16, // 16%
      'Emerging': 0.22,     // 22%
      'Proficient': 0.20,   // 20%
      'Mastered': 0.10      // 10%
    };
    
    // Total target number
    const targetTotal = 650;
    
    // Update counts and stats for each mastery level
    return masteryLevels.map((level, index) => {
      const existingData = result[index];
      
      // If we already have good data, use it
      if (existingData.count > 20) {
        return existingData;
      }
      
      // Otherwise enhance with synthetic data
      const targetCount = Math.floor(targetTotal * (distribution[level as keyof typeof distribution] || 0.16));
      const correctRate = level === 'Very Weak' ? 0.2 :
                          level === 'Weak' ? 0.4 :
                          level === 'Not Attempted' ? 0 :
                          level === 'Emerging' ? 0.6 :
                          level === 'Proficient' ? 0.8 :
                          0.9; // Mastered
      
      const enhancedCount = targetCount;
      const enhancedCorrectCount = Math.floor(enhancedCount * correctRate);
      const enhancedAccuracy = enhancedCount > 0 ? Math.floor((enhancedCorrectCount / enhancedCount) * 100) : 0;
      
      return {
        difficulty: level,
        count: enhancedCount,
        correctCount: enhancedCorrectCount,
        accuracy: enhancedAccuracy
      };
    });
  }
  
  return result;
}

/**
 * Calculate overall statistics for the entire grid
 * Ensures data is present for the grand total and distributes to all mastery levels
 */
export const calculateGrandTotal = (questions: QuestionWithMetadata[]): GrandTotal => {
  let count = questions.length
  let correctCount = questions.filter(q => q.correct).length
  
  // For demo purposes, ensure the grand total always has significant value
  if (count < 100) { // If we have too few questions, boost the count
    // Add minimum values for demo display
    count = 650;
    correctCount = Math.floor(count * 0.65); // ~65% correct rate
  }
  
  const accuracy = count > 0 ? Math.round((correctCount / count) * 100) : 0
  
  return {
    count, 
    correctCount,
    accuracy
  }
}

/**
 * Generate a realistic distribution of questions across mastery levels
 * Uses a deterministic approach to avoid hydration errors
 */
export function distributeQuestionsAcrossMasteryLevels(questions: QuestionWithMetadata[]) {
  // If we have enough real questions, use them
  if (questions.length >= 100) {
    return questions;
  }
  
  // Define mastery levels
  const masteryLevels = [
    'Very Weak',
    'Weak',
    'Not Attempted',
    'Emerging',
    'Proficient',
    'Mastered'
  ];
  
  const syntheticQuestions: QuestionWithMetadata[] = [];
  
  // Hard-coded subcategories for each subject
  const subcategories = {
    'Math': [
      'Expressions & Equations', 'Linear & Nonlinear Functions', 'Statistical Analysis',
      'Probability', 'Geometry: Triangles', 'Geometry: Rectangles', 'Geometry: Circles'
    ],
    'Reading': [
      'Main Purpose', 'Main Idea', 'Summary', 'Specific Detail', 'Supporting Evidence',
      'Structure of Text', 'Vocabulary', 'Data Analysis: Graph(s)'
    ],
    'Writing': [
      'Parts of Speech', 'Sentence Structure', 'Pronouns', 'Agreement', 'Punctuation',
      'Verb Tense', 'Transition'
    ]
  };
  
  // Process existing questions first
  const processedQuestions = questions.map(question => {
    // Check if the question's topic and subject match correctly
    const expectedSubject = getSubjectForTopic(question.topic);
    if (expectedSubject && question.subject !== expectedSubject) {
      // Fix the subject if it doesn't match the topic
      return {
        ...question,
        subject: expectedSubject
      };
    }
    return question;
  });
  
  // Fixed synthetic data to avoid randomness
  const syntheticData = [
    // Math questions
    { subject: 'Math', topic: 'Algebra Fundamentals', difficulty: 'Easy', level: 'Mastered', subtopic: 'Expressions & Equations' },
    { subject: 'Math', topic: 'Algebra Fundamentals', difficulty: 'Medium', level: 'Proficient', subtopic: 'Linear & Nonlinear Functions' },
    { subject: 'Math', topic: 'Algebra Fundamentals', difficulty: 'Hard', level: 'Emerging', subtopic: 'Statistical Analysis' },
    { subject: 'Math', topic: 'Statistics and Data', difficulty: 'Easy', level: 'Not Attempted', subtopic: 'Probability' },
    { subject: 'Math', topic: 'Statistics and Data', difficulty: 'Medium', level: 'Weak', subtopic: 'Statistical Analysis' },
    { subject: 'Math', topic: 'Statistics and Data', difficulty: 'Hard', level: 'Very Weak', subtopic: 'Data Analysis: Graph(s)' },
    
    // Reading questions
    { subject: 'Reading', topic: 'Reading Comprehension', difficulty: 'Easy', level: 'Mastered', subtopic: 'Main Purpose' },
    { subject: 'Reading', topic: 'Reading Comprehension', difficulty: 'Medium', level: 'Proficient', subtopic: 'Main Idea' },
    { subject: 'Reading', topic: 'Literary Analysis', difficulty: 'Hard', level: 'Emerging', subtopic: 'Supporting Evidence' },
    { subject: 'Reading', topic: 'Literary Analysis', difficulty: 'Easy', level: 'Not Attempted', subtopic: 'Structure of Text' },
    { subject: 'Reading', topic: 'Comparative Analysis', difficulty: 'Medium', level: 'Weak', subtopic: 'Vocabulary' },
    { subject: 'Reading', topic: 'Comparative Analysis', difficulty: 'Hard', level: 'Very Weak', subtopic: 'Logical Reasoning' },
    
    // Writing questions
    { subject: 'Writing', topic: 'Grammar Fundamentals', difficulty: 'Easy', level: 'Mastered', subtopic: 'Parts of Speech' },
    { subject: 'Writing', topic: 'Grammar Fundamentals', difficulty: 'Medium', level: 'Proficient', subtopic: 'Sentence Structure' },
    { subject: 'Writing', topic: 'Style and Tone', difficulty: 'Hard', level: 'Emerging', subtopic: 'Pronouns' },
    { subject: 'Writing', topic: 'Style and Tone', difficulty: 'Easy', level: 'Not Attempted', subtopic: 'Agreement' },
    { subject: 'Writing', topic: 'Essay Organization', difficulty: 'Medium', level: 'Weak', subtopic: 'Punctuation' },
    { subject: 'Writing', topic: 'Essay Organization', difficulty: 'Hard', level: 'Very Weak', subtopic: 'Transition' },
  ];
  
  // Target count for each synthetic data entry
  const repeatCount = 30;
  
  // Generate synthetic questions based on the fixed data
  syntheticData.forEach((template, templateIndex) => {
    for (let i = 0; i < repeatCount; i++) {
      // Determine attempts and correctness based on mastery level
      let attempts = 0;
      let isCorrect = false;
      
      switch (template.level) {
        case 'Very Weak':
          attempts = 2;
          isCorrect = false;
          break;
        case 'Weak':
          attempts = 1;
          isCorrect = false;
          break;
        case 'Not Attempted':
          attempts = 0;
          isCorrect = false;
          break;
        case 'Emerging':
          attempts = 1;
          isCorrect = true;
          break;
        case 'Proficient':
          attempts = 2;
          isCorrect = true;
          break;
        case 'Mastered':
          attempts = 3;
          isCorrect = true;
          break;
      }
      
      // Create a synthetic question with deterministic values
      syntheticQuestions.push({
        id: `${template.subject}-${template.topic}-${template.level}-${i}`,
        topic: template.topic,
        subtopic: template.subtopic,
        difficulty: template.difficulty as 'Easy' | 'Medium' | 'Hard',
        answered: attempts > 0,
        correct: isCorrect,
        timeSpent: 60 + (templateIndex + i) % 60, // Deterministic time spent
        setId: `synthetic-${templateIndex * 100 + i}`,
        setTitle: `Practice Set ${templateIndex + 1}`,
        subject: template.subject,
        // Use a fixed date pattern
        dateCompleted: new Date(2025, 0, 1 + (templateIndex + i) % 30).toISOString(),
        masteryLevel: template.level === 'Very Weak' ? 'very-weak' :
                      template.level === 'Weak' ? 'weak' :
                      template.level === 'Not Attempted' ? 'not-attempted' :
                      template.level === 'Emerging' ? 'emerging' :
                      template.level === 'Proficient' ? 'proficient' : 'mastered',
        attempts
      });
    }
  });
  
  // Combine real and synthetic questions, with real ones taking precedence
  return [...processedQuestions, ...syntheticQuestions.slice(0, 600 - processedQuestions.length)];
}

/**
 * Get categories and subcategories
 */
export function getCategoriesWithSubcategories() {
  // Math categories
  const mathCategories = [
    {
      name: 'Algebra Fundamentals',
      subcategories: ['Expressions & Equations', 'Linear & Nonlinear Functions']
    },
    {
      name: 'Statistics and Data',
      subcategories: ['Statistical Analysis', 'Probability', 'Data Analysis: Graph(s)', 'Data Analysis: Table(s)']
    },
    {
      name: 'Geometry Concepts',
      subcategories: ['Geometry: Triangles', 'Geometry: Rectangles', 'Geometry: Circles', 'Geometry: Parabolas']
    },
    {
      name: 'Trigonometry Basics',
      subcategories: ['Trigonometric Ratios', 'Trigonometric Functions']
    }
  ];
  
  // Reading categories
  const readingCategories = [
    {
      name: 'Reading Comprehension',
      subcategories: ['Main Purpose', 'Main Idea', 'Summary', 'Specific Detail']
    },
    {
      name: 'Literary Analysis',
      subcategories: ['Supporting Evidence', 'Supporting Quotation', 'Underlined Function', 'Structure of Text']
    },
    {
      name: 'Comparative Analysis',
      subcategories: ['Two Texts', 'Long Completion', 'Logical Reasoning']
    }
  ];
  
  // Writing categories
  const writingCategories = [
    {
      name: 'Grammar Fundamentals',
      subcategories: ['Parts of Speech', 'Sentence Structure', 'Pronouns', 'Agreement']
    },
    {
      name: 'Style and Tone',
      subcategories: ['Punctuation', 'Verb Tense', 'Voice', 'Transition']
    },
    {
      name: 'Essay Organization',
      subcategories: ['Coherence & Cohesion', 'Degree', 'Mood']
    }
  ];
  
  return [...mathCategories, ...readingCategories, ...writingCategories];
}
