/**
 * Course Data Types
 * Type definitions for the course section of the Syntax education platform.
 */

/**
 * Course - The top-level container for educational content
 */
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image: string;
  coverImage?: string;
  instructor: Instructor;
  modules: Module[];
  prerequisites?: Course[];
  estimatedDuration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  level?: number; // 1-10 scale for more granular difficulty
  tags?: string[];
  categories?: string[];
  enrollmentStatus: 'open' | 'closed' | 'comingSoon';
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  featured?: boolean;
  averageRating?: number;
  ratingCount?: number;
  enrollmentCount?: number;
  completionCount?: number;
  learningObjectives?: string[];
  contentType?: ('video' | 'text' | 'interactive' | 'mixed')[];
  metadataSchema?: Record<string, any>; // Extensible metadata
}

/**
 * Module - A thematic section of a course containing lessons
 */
export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
  estimatedDuration: number; // in minutes
  isRequired?: boolean;
  prerequisites?: {
    moduleIds?: string[];
    completionPercentage?: number; // Required completion % of prereq modules
  };
  unlockCriteria?: {
    type: 'automatic' | 'performance' | 'date' | 'manual';
    value: any; // Depends on type (e.g., performance threshold, date)
  };
  learningObjectives?: string[];
  deepDiveContent?: boolean; // Indicates optional advanced content
  adaptiveContent?: boolean; // Has variants for different skill levels
}

/**
 * Lesson - An individual learning unit within a module
 */
export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  description?: string;
  order: number;
  type: LessonType;
  content: LessonContent;
  estimatedDuration: number; // in minutes
  resources: Resource[];
  completionCriteria?: {
    type: 'viewed' | 'duration' | 'quiz' | 'exercise' | 'interactive';
    threshold: any; // Depends on type (e.g., time in seconds, score)
  };
  isRequired?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  keywords?: string[]; // For search optimization
  nextLessonId?: string; // For custom navigation paths
  adaptiveVariants?: {
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    lessonId: string; // Points to alternate version of lesson
  }[];
  microLearningSegments?: { // For mobile optimization
    id: string;
    title: string;
    duration: number;
    segmentType: 'core' | 'practice' | 'summary';
  }[];
}

/**
 * Lesson types
 */
export type LessonType = 'video' | 'text' | 'quiz' | 'exercise' | 'simulation' | 'discussion' | 'assessment';

/**
 * Union type for all possible lesson content types
 */
export type LessonContent = 
  | VideoContent 
  | TextContent 
  | QuizContent 
  | ExerciseContent 
  | SimulationContent 
  | DiscussionContent 
  | AssessmentContent;

/**
 * Video Lesson Content
 */
export interface VideoContent {
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number; // in seconds
  transcript?: string;
  captions?: {
    language: string;
    url: string;
  }[];
  markers?: {
    time: number; // in seconds
    label: string;
    description?: string;
  }[];
  interactiveElements?: {
    time: number; // in seconds
    type: 'question' | 'note' | 'link';
    content: any; // Depends on type
  }[];
  qualityOptions?: {
    resolution: string;
    url: string;
  }[];
}

/**
 * Text Lesson Content
 */
export interface TextContent {
  markdown: string;
  estimatedReadingTime?: number; // in minutes
  sections?: {
    id: string;
    title: string;
    anchor: string;
  }[];
  interactiveElements?: {
    id: string;
    type: 'codeblock' | 'table' | 'quiz' | 'diagram';
    content: any; // Depends on type
  }[];
  audioVersion?: {
    url: string;
    duration: number; // in seconds
  };
  alternativeFormats?: {
    type: 'simplified' | 'extended' | 'visual';
    content: string;
  }[];
}

/**
 * Quiz Lesson Content
 */
export interface QuizContent {
  questions: {
    id: string;
    text: string;
    type: 'multipleChoice' | 'trueFalse' | 'shortAnswer' | 'matching' | 'fillInBlank';
    options?: {
      id: string;
      text: string;
      isCorrect?: boolean;
    }[];
    correctAnswer?: string | string[];
    explanation?: string;
    points?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
    tags?: string[]; // for categorizing questions
  }[];
  passingScore: number;
  timeLimit?: number; // in seconds
  randomizeQuestions?: boolean;
  randomizeOptions?: boolean;
  maxAttempts?: number;
  showAnswersAfter?: 'attempt' | 'completion' | 'never';
  adaptiveDifficulty?: boolean;
}

/**
 * Exercise Lesson Content
 */
export interface ExerciseContent {
  instructions: string;
  steps: {
    id: string;
    description: string;
    hint?: string;
    isRequired: boolean;
  }[];
  codeTemplate?: string;
  solution?: string;
  validationCriteria?: string;
  submissionType: 'code' | 'file' | 'text' | 'link';
  resources?: Resource[];
  sandboxEnvironment?: {
    type: 'code' | 'design' | 'document';
    config: any; // Configuration for the sandbox
  };
  peerReview?: {
    enabled: boolean;
    criteria: {
      id: string;
      description: string;
      weight: number;
    }[];
  };
}

/**
 * Simulation Lesson Content
 */
export interface SimulationContent {
  type: 'diagram' | 'model' | 'game' | 'scenario';
  initialState: any; // The initial configuration
  interactionPoints: {
    id: string;
    type: 'clickable' | 'draggable' | 'input' | 'adjustable';
    position?: { x: number; y: number };
    target?: string; // Element ID or selector
    validStates?: any[]; // Valid states for this interaction
    feedback?: {
      valid?: string;
      invalid?: string;
    };
  }[];
  stages?: {
    id: string;
    name: string;
    description?: string;
    successCriteria: any;
    nextStageId?: string;
  }[];
  hintSystem?: {
    hints: {
      id: string;
      text: string;
      triggerCondition?: any;
    }[];
    maxHints?: number;
  };
  completionCriteria: any;
  analytics?: {
    trackInteractions: boolean;
    trackTime: boolean;
    customMetrics?: string[];
  };
}

/**
 * Discussion Lesson Content
 */
export interface DiscussionContent {
  topic: string;
  description: string;
  promptQuestions?: string[];
  guidelines?: string;
  format: 'openDiscussion' | 'debate' | 'questionAnswer' | 'reflection';
  groupSize?: 'individual' | 'small' | 'class';
  duration?: number; // in minutes
  resources?: Resource[];
  moderationSettings?: {
    requireApproval: boolean;
    profanityFilter: boolean;
    aiModeration: boolean;
  };
  evaluationCriteria?: {
    id: string;
    description: string;
    weight: number;
  }[];
}

/**
 * Assessment Lesson Content
 */
export interface AssessmentContent {
  type: 'preAssessment' | 'formative' | 'summative' | 'certification';
  sections: {
    id: string;
    title: string;
    description?: string;
    questions: {
      id: string;
      type: string;
      difficulty: 'easy' | 'medium' | 'hard';
      conceptId: string; // Links to knowledge graph
      points: number;
      content: any; // Question-specific content
    }[];
    randomize?: boolean;
    requiredQuestionCount?: number;
  }[];
  timeLimit?: number; // in minutes
  passingScore: number;
  adaptiveDifficulty?: {
    enabled: boolean;
    initialLevel: 'easy' | 'medium' | 'hard';
    adjustmentFactor: number;
  };
  certification?: {
    name: string;
    validityPeriod?: number; // in days
    issuer: string;
    template?: string;
  };
  resultMapping?: {
    skillLevel: {
      beginner: { min: number; max: number };
      intermediate: { min: number; max: number };
      advanced: { min: number; max: number };
    };
    recommendations?: Record<string, string[]>; // Maps score ranges to course recommendations
  };
}

/**
 * Resource - Supplementary materials for lessons
 */
export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'image' | 'code' | 'file' | 'video' | 'audio';
  url: string;
  description?: string;
  iconType?: string;
  isRequired?: boolean;
  estimatedTime?: number; // in minutes
  category?: 'reference' | 'additional' | 'example' | 'tool';
  tags?: string[];
}

/**
 * Instructor - Information about the course creator/teacher
 */
export interface Instructor {
  id: string;
  name: string;
  avatar?: string;
  title?: string;
  bio?: string;
  expertise?: string[];
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  courses?: string[]; // Course IDs
  averageRating?: number;
  studentCount?: number;
}

/**
 * UserCourseProgress - Tracks a user's overall progress in a course
 */
export interface UserCourseProgress {
  userId: string;
  courseId: string;
  enrollmentDate: Date;
  lastAccessDate: Date;
  completedLessons: {
    lessonId: string;
    completedAt: Date;
    attemptCount?: number;
    timeSpent?: number; // in seconds
  }[];
  completedModules: {
    moduleId: string;
    completedAt: Date;
    timeSpent?: number; // in seconds
  }[];
  currentLesson?: {
    lessonId: string;
    moduleId: string;
    position?: number; // for video/audio content
  };
  quizScores: {
    lessonId: string;
    attempts: {
      score: number;
      maxScore: number;
      completedAt: Date;
      timeSpent: number; // in seconds
    }[];
  }[];
  exerciseSubmissions: {
    lessonId: string;
    submissions: {
      submittedAt: Date;
      status: 'pending' | 'approved' | 'rejected';
      feedback?: string;
      timeSpent?: number; // in seconds
    }[];
  }[];
  overallProgress: number; // 0-100 percentage
  certificateIssued?: {
    issuedAt: Date;
    certificateId: string;
    expiresAt?: Date;
  };
  achievements?: {
    id: string;
    awardedAt: Date;
  }[];
  notes?: {
    lessonId: string;
    position?: number; // for video content
    text: string;
    createdAt: Date;
  }[];
  bookmarks?: {
    lessonId: string;
    position?: number; // for video content
    name?: string;
    createdAt: Date;
  }[];
  learningPath?: {
    recommendedModules: string[];
    recommendedDifficulty: 'beginner' | 'intermediate' | 'advanced';
    generatedAt: Date;
  };
}

/**
 * CourseEnrollment - Represents a user's enrollment in a course
 */
export interface CourseEnrollment {
  userId: string;
  courseId: string;
  enrollmentDate: Date;
  status: 'active' | 'completed' | 'paused' | 'dropped';
  completionDate?: Date;
  certificateId?: string;
  paymentInfo?: {
    transactionId: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    paymentDate: Date;
  };
}

/**
 * Achievement - Gamification elements for motivating learners
 */
export interface Achievement {
  id: string;
  courseId: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'performance' | 'engagement' | 'special';
  level?: 'bronze' | 'silver' | 'gold' | 'platinum';
  points?: number;
  isHidden?: boolean; // Secret achievements
  criteria: {
    type: string;
    threshold: any; // Depends on type
    additionalParams?: Record<string, any>;
  };
  unlockedBy?: number; // Count of users who have unlocked this
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  createdAt: Date;
}
