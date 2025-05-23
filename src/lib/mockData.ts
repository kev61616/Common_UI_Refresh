// Data models for practice sets and questions
export interface PracticeSet {
  id: string;
  subject: 'Reading' | 'Writing' | 'Math';
  type: string;
  accuracy: number;
  timeUsed: number; // in seconds
  pace: 'Fast' | 'Normal' | 'Slow';
  dateCompleted: string;
  questions: Question[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeOfDay: string; // Changed to string to support actual time values
  mistakeTypes: {
    conceptual: number;
    careless: number;
    timeManagement: number;
  };
  sessionFatigue: {
    earlyAccuracy: number;
    lateAccuracy: number;
    earlyPace: number;
    latePace: number;
  };
}

export interface Question {
  id: string;
  topic: string;
  subtopic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  answered: boolean;
  correct: boolean;
  timeSpent: number; // in seconds
  userAnswer?: string;
  correctAnswer?: string;
  attempts?: number;
  masteryLevel?: 'very-weak' | 'weak' | 'not-attempted' | 'emerging' | 'proficient' | 'mastered';
}

// Define subject subcategories
const readingSubcategories = [
  'Main Purpose',
  'Main Idea',
  'Summary',
  'Specific Detail',
  'Supporting Evidence',
  'Supporting Quotation',
  'Underlined Function',
  'Logical Reasoning',
  'Two Texts',
  'Long Completion',
  'Structure of Text',
  'Vocabulary',
  'Data Analysis: Graph(s)',
  'Data Analysis: Table(s)'
];

const writingSubcategories = [
  'Parts of Speech',
  'Sentence Structure',
  'Pronouns',
  'Agreement',
  'Punctuation',
  'Verb Tense',
  'Degree',
  'Mood',
  'Voice',
  'Transition'
];

const mathSubcategories = [
  'Expressions, Equations, and Inequalities',
  'Functions and Nonlinear Equations',
  'Statistical Analysis and Probability',
  'Triangle',
  'Rectangle',
  'Circle',
  'Parabola',
  'Cone',
  'Cube',
  'Cylinder',
  'Sphere',
  'Trigonometric Ratios and Functions'
];

// Standard topic tags as defined in tags.md
export const readingTopics = [
  'Specific Detail',
  'Summary',
  'Supporting Evidence',
  'Supporting Quotation',
  'Underlined Function',
  'Data Analysis: Graph(s)',
  'Data Analysis: Table(s)',
  'Logical Reasoning',
  'Main Purpose',
  'Vocabulary',
  'Two Texts',
  'Long Completion',
  'Main Idea',
  'Structure of Text'
];

export const writingTopics = [
  'Parts of Speech',
  'Sentence Structure',
  'Pronouns',
  'Agreement',
  'Degree',
  'Mood',
  'Punctuation',
  'Verb',
  'Voice',
  'Transition'
];

export const mathTopics = [
  'Expressions, Equations, and Inequalities',
  'Functions and Nonlinear Equations',
  'Statistical Analysis and Probability',
  'Triangle',
  'Rectangle',
  'Circle',
  'Parabola',
  'Cone',
  'Cube',
  'Cylinder',
  'Sphere',
  'Trigonometric Ratios and Functions'
];

// ===== Helper functions =====

// Generate dates distributed over 6 months with meaningful patterns
const getDateInPast = (daysAgo: number): string => {
  const date = new Date();
  
  // Use a fixed reference date to ensure consistency
  const referenceDate = new Date(2025, 2, 18); // March 18, 2025
  
  // Subtract days from reference date
  const targetDate = new Date(referenceDate);
  targetDate.setDate(referenceDate.getDate() - daysAgo);
  
  // Format weekends to have more study sessions
  const dayOfWeek = targetDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    // Higher probability of multiple sessions on weekends
    targetDate.setHours(dayOfWeek === 0 ? 14 : 16); // Sunday afternoon or Saturday evening
  } else {
    // Weekday sessions typically in evening
    targetDate.setHours(19 + Math.floor(Math.random() * 3)); // 7-9pm
  }
  
  // Add some minutes
  targetDate.setMinutes(Math.floor(Math.random() * 50));
  
  return targetDate.toISOString();
};

// Get subject-based subcategory - deterministic based on questionId
const getSubcategoryForSubject = (subject: 'Reading' | 'Writing' | 'Math', questionId: string): string => {
  let subcategories: string[] = [];
  
  switch (subject) {
    case 'Reading':
      subcategories = readingSubcategories;
      break;
    case 'Writing':
      subcategories = writingSubcategories;
      break;
    case 'Math':
      subcategories = mathSubcategories;
      break;
    default:
      subcategories = [];
  }
  
  // Create a deterministic index based on the questionId
  const hash = getStableHashFromString(`${questionId}-subtopic`);
  const subcategoryIndex = Math.floor(hash * subcategories.length);
  return subcategories[subcategoryIndex];
};

// Get topic based on subject - deterministic based on setId and index
const getTopicForSubject = (subject: 'Reading' | 'Writing' | 'Math', setId: string, index: number): string => {
  let topics: string[] = [];
  
  switch (subject) {
    case 'Reading':
      topics = readingTopics;
      break;
    case 'Writing':
      topics = writingTopics;
      break;
    case 'Math':
      topics = mathTopics;
      break;
    default:
      topics = [];
  }
  
  // Create a deterministic index based on the setId and question index
  const hash = getStableHashFromString(`${setId}-${index}`);
  const topicIndex = Math.floor(hash * topics.length);
  return topics[topicIndex];
};

// Generate a semi-stable hash from a string
const getStableHashFromString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Normalize to 0-1 range
  return Math.abs(hash) / 2147483647;
};

// Mastery level definitions for consistent categorization
type MasteryLevel = {
  id: string;
  name: string;
  targetPercentage: number;
  matchFunction: (questionId: string, setId: string) => boolean;
};

const masteryLevels: MasteryLevel[] = [
  {
    id: 'very-weak',
    name: 'Very Weak (2x)', // Updated per feedback
    targetPercentage: 0.17,
    matchFunction: (questionId, setId) => {
      // Use a stable hash to determine category consistently
      const hash = getStableHashFromString(questionId + setId);
      return hash < 0.17; // 17% of questions
    }
  },
  {
    id: 'weak',
    name: 'Weak (1x)', // Updated per feedback
    targetPercentage: 0.17,
    matchFunction: (questionId, setId) => {
      const hash = getStableHashFromString(questionId + setId);
      return hash >= 0.17 && hash < 0.34; // 17% of questions
    }
  },
  {
    id: 'not-attempted',
    name: 'Not Attempted',
    targetPercentage: 0.16,
    matchFunction: (questionId, setId) => {
      const hash = getStableHashFromString(questionId + setId);
      return hash >= 0.34 && hash < 0.5; // 16% of questions
    }
  },
  {
    id: 'emerging',
    name: 'Emerging (1x correct)',
    targetPercentage: 0.17,
    matchFunction: (questionId, setId) => {
      const hash = getStableHashFromString(questionId + setId);
      return hash >= 0.5 && hash < 0.67; // 17% of questions
    }
  },
  {
    id: 'proficient',
    name: 'Proficient (2x correct)',
    targetPercentage: 0.17,
    matchFunction: (questionId, setId) => {
      const hash = getStableHashFromString(questionId + setId);
      return hash >= 0.67 && hash < 0.84; // 17% of questions
    }
  },
  {
    id: 'mastered',
    name: 'Mastered (3x+ correct)',
    targetPercentage: 0.16,
    matchFunction: (questionId, setId) => {
      const hash = getStableHashFromString(questionId + setId);
      return hash >= 0.84; // 16% of questions
    }
  }
];

  // Generate questions with proper distribution of mastery levels
const generateQuestions = (
  count: number,
  setId: string,
  subject: 'Reading' | 'Writing' | 'Math',
  difficulty: 'Easy' | 'Medium' | 'Hard'
): Question[] => {
  const questions: Question[] = [];
  
  for (let i = 0; i < count; i++) {
    // Get topic deterministically based on setId and question index
    const topic = getTopicForSubject(subject, setId, i);
    // Create a unique question ID that is deterministic (no random elements)
    const questionId = `q-${setId}-${i}`;
    const subtopic = getSubcategoryForSubject(subject, questionId);
    
    // Determine mastery level using the consistent functions
    let isAnswered = true;
    let isCorrect = false;
    let masteryLevel: 'very-weak' | 'weak' | 'not-attempted' | 'emerging' | 'proficient' | 'mastered' | undefined;
    
    for (const level of masteryLevels) {
      if (level.matchFunction(questionId, setId)) {
        // Store the mastery level explicitly
        masteryLevel = level.id as 'very-weak' | 'weak' | 'not-attempted' | 'emerging' | 'proficient' | 'mastered';
        
        // Apply mastery level properties
        if (level.id === 'not-attempted') {
          isAnswered = false;
        } else if (['emerging', 'proficient', 'mastered'].includes(level.id)) {
          isCorrect = true;
        }
        break;
      }
    }
    
    // Calculate time spent based on difficulty and correctness
    let baseTime = 0;
    switch (difficulty) {
      case 'Easy':
        baseTime = 30 + Math.floor(Math.random() * 30); // 30-60 seconds
        break;
      case 'Medium':
        baseTime = 45 + Math.floor(Math.random() * 45); // 45-90 seconds
        break;
      case 'Hard':
        baseTime = 60 + Math.floor(Math.random() * 60); // 60-120 seconds
        break;
    }
    
    // Correct answers typically take less time
    const timeSpent = isCorrect 
      ? Math.floor(baseTime * 0.8)
      : Math.floor(baseTime * (1 + Math.random() * 0.5)); // 1-1.5x longer for incorrect
    
    questions.push({
      id: questionId,
      topic,
      subtopic,
      difficulty,
      answered: isAnswered,
      correct: isCorrect,
      timeSpent: isAnswered ? timeSpent : 0,
      masteryLevel
    });
  }
  
  return questions;
};

// ===== Practice Sets Generation =====

// Generate mock practice sets with improved distribution
const generatePracticeSets = (): PracticeSet[] => {
  const sets: PracticeSet[] = [];
  
  // Define distribution of subjects, difficulties, and paces
  const subjectDistribution: ('Reading' | 'Writing' | 'Math')[] = [
    'Reading', 'Reading', 'Reading', 'Reading', 'Reading', 'Reading', 'Reading', 'Reading', 'Reading', 'Reading',
    'Writing', 'Writing', 'Writing', 'Writing', 'Writing', 'Writing', 'Writing', 'Writing', 'Writing', 'Writing',
    'Math', 'Math', 'Math', 'Math', 'Math', 'Math', 'Math', 'Math', 'Math', 'Math'
  ];
  
  const difficultyDistribution: ('Easy' | 'Medium' | 'Hard')[] = [
    'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy', 'Easy',
    'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium',
    'Hard', 'Hard', 'Hard', 'Hard', 'Hard', 'Hard', 'Hard', 'Hard', 'Hard'
  ];
  
  const paceDistribution: ('Fast' | 'Normal' | 'Slow')[] = [
    'Fast', 'Fast', 'Fast', 'Fast', 'Fast', 'Fast', 'Fast', 'Fast', 'Fast', 'Fast',
    'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal',
    'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow', 'Slow'
  ];
  
  const timeOfDayDistribution: string[] = [
    '8:15 AM', '8:45 AM', '9:10 AM', '9:30 AM', '10:05 AM', '10:25 AM', '10:50 AM', '11:15 AM', '11:40 AM', '11:55 AM',
    '1:05 PM', '1:25 PM', '2:00 PM', '2:15 PM', '2:45 PM', '3:10 PM', '3:30 PM', '3:55 PM', '4:20 PM', '4:45 PM',
    '7:15 PM', '7:30 PM', '8:00 PM', '8:20 PM', '8:45 PM', '7:05 PM', '7:50 PM', '8:10 PM', '8:35 PM', '9:00 PM'
  ];

  // Define type mapping using the standard tags from tags.md
  const typeMapping: Record<'Reading' | 'Writing' | 'Math', string[]> = {
    'Reading': [
      'Specific Detail',
      'Summary',
      'Supporting Evidence',
      'Supporting Quotation',
      'Underlined Function',
      'Data Analysis: Graph(s)',
      'Data Analysis: Table(s)',
      'Logical Reasoning',
      'Main Purpose',
      'Vocabulary',
      'Two Texts',
      'Long Completion',
      'Main Idea',
      'Structure of Text'
    ],
    'Writing': [
      'Parts of Speech',
      'Sentence Structure',
      'Pronouns',
      'Agreement',
      'Degree',
      'Mood',
      'Punctuation',
      'Verb',
      'Voice',
      'Transition'
    ],
    'Math': [
      'Expressions, Equations, and Inequalities',
      'Functions and Nonlinear Equations',
      'Statistical Analysis and Probability',
      'Triangle',
      'Rectangle',
      'Circle',
      'Parabola',
      'Cone',
      'Cube',
      'Cylinder',
      'Sphere',
      'Trigonometric Ratios and Functions'
    ]
  };
  
  // Create 30 practice sets (10 per subject) distributed over a 6-month period
  for (let i = 0; i < 30; i++) {
    // Create set ID with sequential numbering for easier reference
    const setId = `set-${(i + 1).toString().padStart(3, '0')}`;
    
    // Use distribution arrays to get properties
    const subject = subjectDistribution[i];
    const difficulty = difficultyDistribution[i];
    const pace = paceDistribution[i];
    const timeOfDay = timeOfDayDistribution[i];
    
    // Generate type based on subject's valid types - deterministically
    const validTypes = typeMapping[subject];
    const typeHash = getStableHashFromString(`${setId}-type`);
    const typeIndex = Math.floor(typeHash * validTypes.length);
    const type = validTypes[typeIndex];
    
    // Calculate a date with higher density of recent dates (logarithmic distribution)
    // This creates more recent dates with some spread over several months
    const dayIndex = Math.floor(Math.pow(Math.random(), 0.5) * 180); // 0-180 days ago, weighted toward recent
    const dateCompleted = getDateInPast(dayIndex);
    
    // Generate questions - count varies by difficulty
    const questionCount = difficulty === 'Easy' ? 15 + Math.floor(Math.random() * 5) :
                          difficulty === 'Medium' ? 20 + Math.floor(Math.random() * 5) :
                          25 + Math.floor(Math.random() * 5);
    
    const questions = generateQuestions(questionCount, setId, subject, difficulty);
    
    // Calculate actual accuracy based on question correctness
    const answeredQuestions = questions.filter(q => q.answered);
    const correctQuestions = answeredQuestions.filter(q => q.correct);
    const accuracy = answeredQuestions.length > 0 
        ? Math.round((correctQuestions.length / answeredQuestions.length) * 100) 
        : 0;
    
    // Calculate time used as sum of all question times plus some overhead
    const questionTime = questions.reduce((sum, q) => sum + q.timeSpent, 0);
    const overheadTime = Math.floor(questionTime * 0.2); // 20% overhead for transitions
    const timeUsed = questionTime + overheadTime;
    
    // Generate mistake types based on difficulty
    const conceptualMistakes = difficulty === 'Easy' ? Math.floor(Math.random() * 2) :
                             difficulty === 'Medium' ? 1 + Math.floor(Math.random() * 2) :
                             2 + Math.floor(Math.random() * 3);
                             
    const carelessMistakes = Math.floor(Math.random() * 3);
    
    const timeManagementMistakes = pace === 'Slow' ? 1 + Math.floor(Math.random() * 2) :
                                pace === 'Normal' ? Math.floor(Math.random() * 2) :
                                0;
    
    // Calculate session fatigue effect on accuracy and pace
    // Higher difficulty tends to show more fatigue
    const fatigueFactor = difficulty === 'Easy' ? 0.05 :
                        difficulty === 'Medium' ? 0.1 :
                        0.15;
    
    const earlyAccuracy = Math.min(100, accuracy + Math.floor(Math.random() * 10));
    const lateAccuracy = Math.max(0, Math.round(earlyAccuracy * (1 - fatigueFactor)));
    
    const earlyPace = 90 + Math.floor(Math.random() * 10);
    const latePace = Math.max(0, Math.round(earlyPace * (1 - fatigueFactor)));
    
    // Create the complete practice set with all calculated properties
    sets.push({
      id: setId,
      subject,
      type,
      accuracy,
      timeUsed,
      pace,
      dateCompleted,
      questions,
      difficulty,
      timeOfDay,
      mistakeTypes: {
        conceptual: conceptualMistakes,
        careless: carelessMistakes,
        timeManagement: timeManagementMistakes,
      },
      sessionFatigue: {
        earlyAccuracy,
        lateAccuracy,
        earlyPace,
        latePace,
      },
    });
  }
  
  // Sort sets by date (newest first) for default display
  return sets.sort((a, b) => 
    new Date(b.dateCompleted).getTime() - new Date(a.dateCompleted).getTime()
  );
};

// Generate all mock data
export const mockPracticeSets: PracticeSet[] = generatePracticeSets();
