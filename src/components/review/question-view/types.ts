import { PracticeSet, Question } from '@/lib/mockData'

// Use Omit to create a new interface that doesn't extend Question directly, to avoid type conflicts
export interface QuestionWithMetadata {
  // Fields from Question
  id: string;
  topic: string;
  subtopic?: string; // Made optional since it's not needed in Question View
  difficulty: 'Easy' | 'Medium' | 'Hard'; // Matching Question difficulty type
  answered: boolean;
  correct: boolean;
  timeSpent: number;
  
  // Additional metadata fields
  setId: string;
  setTitle: string;
  subject: string;
  setType?: string;
  dateCompleted: string;
  partiallyCorrect?: boolean;

  // Fields for individual question view
  userAnswer?: string;
  correctAnswer?: string;
  masteryLevel?: 'very-weak' | 'weak' | 'not-attempted' | 'emerging' | 'proficient' | 'mastered';
  attempts?: number;
  tags?: string[]; // Optional array of tags for categorization
  
  // Flags to track subject-topic relationship status
  hasValidTopicSubjectRelation?: boolean; // Whether the topic matches its original subject
  hasSubjectCorrected?: boolean; // Whether the subject has been corrected based on topic
  originalSubject?: string; // The original subject from the practice set
}

export interface QuestionViewProps {
  practiceSets: PracticeSet[];
  onSelectSet?: (id: string) => void;
  selectedSetId?: string | null;
}

export interface GroupedQuestions {
  groupName: string;
  questions: QuestionWithMetadata[];
}

export interface FilterState {
  subjects: string[];
  difficulties: string[];
  status: ('correct' | 'incorrect')[];
  topics: string[];
}

export interface ErrorPattern {
  name: string;
  count: number;
  description: string;
}

export type GroupByOption = 'topic' | 'subject' | 'difficulty' | 'date';
