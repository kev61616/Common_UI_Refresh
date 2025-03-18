import { QuestionWithMetadata, GroupedQuestions, GroupByOption } from './types'
import { readingTopics, writingTopics, mathTopics } from '@/lib/mockData'

// Get color class based on subject
export const getSubjectColor = (subject: string) => {
  switch (subject) {
    case 'Math':
      return {
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        border: 'border-indigo-200 dark:border-indigo-800',
        text: 'text-indigo-700 dark:text-indigo-300',
        gradient: 'from-indigo-500/10 to-indigo-500/5'
      }
    case 'Reading':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        border: 'border-emerald-200 dark:border-emerald-800',
        text: 'text-emerald-700 dark:text-emerald-300',
        gradient: 'from-emerald-500/10 to-emerald-500/5'
      }
    case 'Writing':
      return {
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        border: 'border-amber-200 dark:border-amber-800',
        text: 'text-amber-700 dark:text-amber-300',
        gradient: 'from-amber-500/10 to-amber-500/5'
      }
    default:
      return {
        bg: 'bg-slate-50 dark:bg-slate-800/50',
        border: 'border-slate-200 dark:border-slate-700/50',
        text: 'text-slate-700 dark:text-slate-300',
        gradient: 'from-slate-500/10 to-slate-500/5'
      }
  }
}

// Get color class based on difficulty
export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-800/50'
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-200 dark:border-yellow-800/50'
    case 'Hard':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800/50'
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
  }
}

// Format date
export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

// Group questions by selected attribute
export const groupQuestions = (
  filteredQuestions: QuestionWithMetadata[], 
  groupBy: GroupByOption
): GroupedQuestions[] => {
  const groupedMap = new Map<string, QuestionWithMetadata[]>()
  
  filteredQuestions.forEach(question => {
    let groupKey: string;
    
    switch (groupBy) {
      case 'subject':
        groupKey = question.subject
        break
      case 'difficulty':
        groupKey = question.difficulty
        break
      case 'date':
        // Group by month and year
        const date = new Date(question.dateCompleted)
        groupKey = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
        break
      case 'topic':
      default:
        groupKey = question.topic
    }
    
    if (!groupedMap.has(groupKey)) {
      groupedMap.set(groupKey, [])
    }
    
    groupedMap.get(groupKey)?.push(question)
  })
  
  // Convert map to array of groups
  return Array.from(groupedMap.entries()).map(([key, questions]) => ({
    groupName: key,
    questions
  }))
}

// Helper function to check if a topic belongs to a subject
export const isTopicValidForSubject = (topic: string, subject: string): boolean => {
  if (subject === 'Math') {
    return mathTopics.includes(topic);
  } else if (subject === 'Reading') {
    return readingTopics.includes(topic);
  } else if (subject === 'Writing') {
    return writingTopics.includes(topic);
  }
  return false;
}

// Get correct subject for a topic
export const getCorrectSubjectForTopic = (topic: string): string | null => {
  if (mathTopics.includes(topic)) return 'Math';
  if (readingTopics.includes(topic)) return 'Reading';
  if (writingTopics.includes(topic)) return 'Writing';
  return null;
}

// Extract all questions with metadata from practice sets
export const extractQuestionsWithMetadata = (practiceSets: any[]): QuestionWithMetadata[] => {
  const extractedQuestions: QuestionWithMetadata[] = []
  
  practiceSets.forEach(set => {
    set.questions.forEach((question: any) => {
      // Calculate mastery level based on attempts and correctness
      const attempts = question.attempts || 0;
      const masteryLevel = calculateMasteryLevel(attempts, question.correct);
      
      // Store the original subject from the set
      const originalSubject = set.subject;
      // Start with original subject
      let subject = originalSubject;
      const topic = question.topic;
      
      // Check if the topic belongs to the original subject
      const hasValidTopicSubjectRelation = isTopicValidForSubject(topic, originalSubject);
      
      // Store whether the subject has been corrected
      let hasSubjectCorrected = false;
      
      // If the topic doesn't belong to the original subject, try to find the correct one
      if (!hasValidTopicSubjectRelation) {
        const correctSubject = getCorrectSubjectForTopic(topic);
        if (correctSubject) {
          // For data correction, use the correct subject
          subject = correctSubject;
          hasSubjectCorrected = true;
        }
      }
      
      // Add the question with appropriate metadata flags
      // Note: Not including subtopic field as it's not needed in Question View for now
      extractedQuestions.push({
        id: question.id,
        topic: question.topic,
        difficulty: question.difficulty,
        answered: question.answered,
        correct: question.correct,
        timeSpent: question.timeSpent,
        setId: set.id,
        setTitle: `${subject} - ${set.type}`,
        subject: subject, // Use the validated subject
        setType: set.type,
        dateCompleted: set.dateCompleted,
        userAnswer: question.userAnswer || '',
        correctAnswer: question.correctAnswer || '',
        masteryLevel,
        attempts,
        partiallyCorrect: question.partiallyCorrect || false,
        hasValidTopicSubjectRelation, // Whether the topic matches its ORIGINAL subject
        hasSubjectCorrected, // Whether we've corrected the subject
        originalSubject // The original subject from the set
      })
    })
  })
  
  return extractedQuestions
}

// Helper function to calculate mastery level
const calculateMasteryLevel = (attempts: number, isCorrect: boolean): number => {
  if (attempts === 0) return 1; // Not Started
  if (attempts === 1 && isCorrect) return 2; // Familiar
  if (attempts >= 2 && isCorrect) return 3; // Proficient
  if (attempts >= 3 && isCorrect) return 4; // Mastered
  if (attempts >= 4 && isCorrect) return 5; // Expert
  return 1; // Default to Not Started
}

// Analyze error patterns from questions
export const analyzeErrorPatterns = (questions: QuestionWithMetadata[]) => {
  const conceptualErrors = questions.filter(q => !q.correct && q.topic.includes('Concepts')).length
  const calculationErrors = questions.filter(q => !q.correct && q.topic.includes('Algebra')).length
  const analysisErrors = questions.filter(q => !q.correct && q.topic.includes('Analysis')).length
  const grammarErrors = questions.filter(q => !q.correct && q.topic.includes('Grammar')).length
  
  return [
    { 
      name: 'conceptual-misunderstanding', 
      count: conceptualErrors,
      description: 'Fundamental concept misunderstandings'
    },
    { 
      name: 'calculation-errors', 
      count: calculationErrors,
      description: 'Errors in mathematical calculations'
    },
    { 
      name: 'analysis-gaps', 
      count: analysisErrors,
      description: 'Difficulties with text analysis or interpretation'
    },
    { 
      name: 'grammar-confusion', 
      count: grammarErrors,
      description: 'Common issues with grammar rules'
    },
  ].filter(pattern => pattern.count > 0)
}
