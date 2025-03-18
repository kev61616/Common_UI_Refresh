'use client'

import { QuestionWithMetadata } from '../../question-view/types'
import { DifficultyTotal, GrandTotal, GridRow, MatrixCell, TopicTotal } from '../types'
import { getSubjectForTopic, isTopicInSubject } from './filterUtils'

/**
 * Get mastery level data based on question metrics
 * Based on defined masteryLevels in mockData.ts:
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
 * This function categorizes questions into the 6 mastery levels based on the mockData.ts definitions
 * and ensures proper data distribution across all columns
 */
export const calculateDifficultyTotals = (
  questions: QuestionWithMetadata[],
  difficulties: string[],
  filterDifficulties: Record<string, boolean>
): DifficultyTotal[] => {
  // Define the mastery levels from mockData.ts
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
  
  // Categorize each question based on its mastery level according to mockData.ts rules
  questions.forEach(question => {
    const attempts = question.attempts || 0;
    const isCorrect = question.correct;
    
    // Determine the mastery level based on the rules in mockData.ts
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
    // Create a distribution across mastery levels similar to what we'd expect
    const distribution = {
      'Very Weak': 0.15,    // 15%
      'Weak': 0.17,         // 17%
      'Not Attempted': 0.16, // 16%
      'Emerging': 0.22,     // 22%
      'Proficient': 0.20,   // 20%
      'Mastered': 0.10      // 10%
    };
    
    // Total target number - similar to distributeQuestionsAcrossMasteryLevels
    const targetTotal = 650;
    
    // Update counts and stats for each mastery level
    return masteryLevels.map((level, index) => {
      const existingData = result[index];
      
      // If we already have good data, use it
      if (existingData.count > 20) {
        return existingData;
      }
      
      // Otherwise enhance with synthetic data
      const targetCount = Math.round(targetTotal * (distribution[level as keyof typeof distribution] || 0.16));
      const correctRate = level === 'Very Weak' ? 0.2 :
                          level === 'Weak' ? 0.4 :
                          level === 'Not Attempted' ? 0 :
                          level === 'Emerging' ? 0.6 :
                          level === 'Proficient' ? 0.8 :
                          0.9; // Mastered
      
      const enhancedCount = targetCount;
      const enhancedCorrectCount = Math.round(enhancedCount * correctRate);
      const enhancedAccuracy = enhancedCount > 0 ? Math.round((enhancedCorrectCount / enhancedCount) * 100) : 0;
      
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
    count = 650 + Math.floor(Math.random() * 100); // 650-750 questions total
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
 * This ensures all columns have reasonable data for the matrix view
 * Uses the actual topics and subcategories from mockData.ts
 */
export function distributeQuestionsAcrossMasteryLevels(questions: QuestionWithMetadata[]) {
  // If we have enough real questions, use them
  if (questions.length >= 100) {
    return questions;
  }
  
  // Define mastery levels according to mockData.ts
  const masteryLevels = [
    'Very Weak',   // 2x+ incorrect
    'Weak',        // 1x incorrect
    'Not Attempted', // 0x attempted
    'Emerging',    // 1x correct
    'Proficient',  // 2x correct
    'Mastered'     // 3x+ correct
  ];
  
  // Use the topic lists imported from filterUtils
  // These are correctly aligned with each subject
  
  // Generate at least 100 questions with a realistic distribution across all mastery levels
  const syntheticQuestions: QuestionWithMetadata[] = [];
  
  // Use the distribution from mockData.ts
  const distribution = {
    'Very Weak': 0.17,    // 17%
    'Weak': 0.17,         // 17%
    'Not Attempted': 0.16, // 16%
    'Emerging': 0.17,     // 17%
    'Proficient': 0.17,   // 17%
    'Mastered': 0.16      // 16%
  };
  
  // Total target number
  const targetTotal = 650;
  
  // Define subject subcategories from mockData.ts
  const mathSubcategories = [
    'Expressions & Equations', 'Linear & Nonlinear Functions', 'Statistical Analysis',
    'Probability', 'Geometry: Triangles', 'Geometry: Rectangles', 'Geometry: Circles',
    'Geometry: Parabolas', 'Solids: Cones', 'Solids: Cubes', 'Solids: Cylinders',
    'Solids: Spheres', 'Trigonometric Ratios', 'Trigonometric Functions'
  ];

  const readingSubcategories = [
    'Main Purpose', 'Main Idea', 'Summary', 'Specific Detail', 'Supporting Evidence',
    'Supporting Quotation', 'Underlined Function', 'Logical Reasoning', 'Two Texts',
    'Long Completion', 'Structure of Text', 'Vocabulary', 'Data Analysis: Graph(s)',
    'Data Analysis: Table(s)'
  ];

  const writingSubcategories = [
    'Parts of Speech', 'Sentence Structure', 'Pronouns', 'Agreement', 'Punctuation',
    'Verb Tense', 'Degree', 'Mood', 'Voice', 'Transition'
  ];
  
  // Get a random subcategory based on subject
  const getRandomSubcategory = (subject: string): string => {
    if (subject === 'Math') {
      return mathSubcategories[Math.floor(Math.random() * mathSubcategories.length)];
    } else if (subject === 'Reading') {
      return readingSubcategories[Math.floor(Math.random() * readingSubcategories.length)];
    } else {
      return writingSubcategories[Math.floor(Math.random() * writingSubcategories.length)];
    }
  };
  
  // Helper function to get a random difficulty
  function getRandomDifficulty(): 'Easy' | 'Medium' | 'Hard' {
    const difficulties: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];
    return difficulties[Math.floor(Math.random() * difficulties.length)];
  }

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
  
  // Generate synthetic questions with correct subject-topic relationships
  // We'll get topics from the filterUtils.ts (via the getSubjectForTopic function)
  // to ensure we're using the correct topic lists
  const subjectToProcess = ['Math', 'Reading', 'Writing'];
  
  subjectToProcess.forEach(subject => {
    // Get topics for this subject
    const topicsForSubject: string[] = [];
    
    // We need to check all possible topics to find ones that belong to this subject
    ['Algebra Fundamentals', 'Functions and Graphs', 'Statistics and Data', 
     'Geometry Concepts', 'Trigonometry Basics', 'Problem Solving', 'Mathematical Reasoning',
     'Reading Comprehension', 'Literary Analysis', 'Textual Evidence', 'Author\'s Purpose',
     'Comparative Analysis', 'Information Synthesis', 'Data Interpretation',
     'Grammar Fundamentals', 'Sentence Structure', 'Word Choice', 'Punctuation Rules',
     'Style and Tone', 'Essay Organization', 'Coherence & Cohesion'].forEach(topic => {
        if (isTopicInSubject(topic, subject)) {
          topicsForSubject.push(topic);
        }
     });
    
    // Generate questions for each topic in this subject
    topicsForSubject.forEach(topic => {
      // Random number of questions for this topic (30-100)
      const topicQuestionCount = 30 + Math.floor(Math.random() * 70);
    
      // Generate questions with different mastery levels
      masteryLevels.forEach(level => {
        // Calculate how many questions should be at this mastery level
        const levelCount = Math.round(topicQuestionCount * distribution[level as keyof typeof distribution]);
      
      // Generate the questions
      for (let i = 0; i < levelCount; i++) {
        // Determine attempts and correctness based on mastery level
        let attempts = 0;
        let isCorrect = false;
        
        switch (level) {
          case 'Very Weak':
            attempts = 2 + Math.floor(Math.random() * 2); // 2-3 attempts
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
            attempts = 3 + Math.floor(Math.random() * 2); // 3-4 attempts
            isCorrect = true;
            break;
        }
        // Get a random subcategory for this topic
        const subtopic = getRandomSubcategory(subject);
        
        // Create a synthetic question with required fields and CORRECT subject-topic relationship
        syntheticQuestions.push({
          id: `${topic}-${level}-${i}`,
          topic,
          subtopic,
          difficulty: getRandomDifficulty(),
          answered: attempts > 0,
          correct: isCorrect,
          timeSpent: attempts > 0 ? Math.floor(Math.random() * 120) : 0,
          setId: `synthetic-${Math.floor(Math.random() * 1000)}`,
          setTitle: `Practice Set ${Math.floor(Math.random() * 100)}`,
          subject, // This will always match the topic's correct subject
          dateCompleted: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
          masteryLevel: level === 'Mastered' ? 3 : 
                        level === 'Proficient' ? 2 : 
                        level === 'Emerging' ? 1 : 0,
          attempts
        });
      }
      });
    });
  });
  
  // Combine real and synthetic questions, with real ones taking precedence
  return [...processedQuestions, ...syntheticQuestions.slice(0, targetTotal - processedQuestions.length)];
}


/**
 * Get categories and subcategories based on mockData.ts structure
 * This can be used for the expandable view
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
