import { Lesson, Resource, LessonType } from '@/types/course';

/**
 * Creates a mock lesson with appropriate content based on the lesson type
 */
export function createMockLesson(
  id: string,
  moduleId: string,
  title: string,
  type: LessonType,
  duration: number,
  order: number,
  resources: Resource[] = []
): Lesson {
  // Mock content based on lesson type
  let content: any;
  switch (type) {
    case 'video':
      content = {
        videoUrl: `#`,
        thumbnailUrl: `#`,
        duration: duration * 60, // convert minutes to seconds
        transcript: `Transcript for ${title}: This is a sample transcript for the Digital SAT video lesson...`,
      };
      break;
    case 'text':
      content = {
        markdown: `# ${title}\n\nThis is sample content for this Digital SAT lesson. It includes explanations, examples, and practice questions.\n\n## Key Concepts\n\nDetailed explanations of the key concepts for this topic...\n\n## Example Problems\n\nStep-by-step solutions to example problems...\n\n## Practice\n\nTry these practice questions to reinforce your understanding...\n\n`,
        estimatedReadingTime: Math.round(duration * 0.8),
        sections: [
          { id: 'key-concepts', title: 'Key Concepts', anchor: 'key-concepts' },
          { id: 'example-problems', title: 'Example Problems', anchor: 'example-problems' },
          { id: 'practice', title: 'Practice', anchor: 'practice' },
        ],
      };
      break;
    case 'quiz':
      content = {
        questions: [
          {
            id: `${id}-q1`,
            text: 'Sample Digital SAT question 1',
            type: 'multipleChoice',
            options: [
              { id: 'a', text: 'Answer option A' },
              { id: 'b', text: 'Answer option B' },
              { id: 'c', text: 'Answer option C' },
              { id: 'd', text: 'Answer option D' },
            ],
            correctAnswer: 'b',
            explanation: 'Explanation for why B is the correct answer...',
          },
          {
            id: `${id}-q2`,
            text: 'Sample Digital SAT question 2',
            type: 'multipleChoice',
            options: [
              { id: 'a', text: 'Answer option A' },
              { id: 'b', text: 'Answer option B' },
              { id: 'c', text: 'Answer option C' },
              { id: 'd', text: 'Answer option D' },
            ],
            correctAnswer: 'a',
            explanation: 'Explanation for why A is the correct answer...',
          },
          {
            id: `${id}-q3`,
            text: 'Sample Digital SAT question 3',
            type: 'multipleChoice',
            options: [
              { id: 'a', text: 'Answer option A' },
              { id: 'b', text: 'Answer option B' },
              { id: 'c', text: 'Answer option C' },
              { id: 'd', text: 'Answer option D' },
            ],
            correctAnswer: 'd',
            explanation: 'Explanation for why D is the correct answer...',
          },
        ],
        passingScore: 70,
        timeLimit: duration * 60, // convert minutes to seconds
      };
      break;
    case 'exercise':
      content = {
        instructions: `# ${title} Practice\n\nIn this exercise, you will practice applying the concepts you've learned to Digital SAT-style questions.\n\nCarefully work through each problem and check your answers.`,
        steps: [
          {
            id: `${id}-step1`,
            description: 'Review the key concepts covered in the lesson',
            isRequired: true,
          },
          {
            id: `${id}-step2`,
            description: 'Work through the practice problems without a calculator first',
            hint: 'Try to identify the most efficient solution approach before calculating',
            isRequired: true,
          },
          {
            id: `${id}-step3`,
            description: 'Check your answers and review explanations for any mistakes',
            isRequired: true,
          },
        ],
        submissionType: 'text',
      };
      break;
    case 'simulation':
      content = {
        type: 'scenario',
        initialState: { timeRemaining: 1800, questionIndex: 0, score: 0 },
        interactionPoints: [
          {
            id: `${id}-interaction1`,
            type: 'clickable',
            target: 'answer-option',
          }
        ],
        stages: [
          {
            id: 'intro',
            name: 'Introduction',
            description: 'Review the test format and rules',
            successCriteria: { viewed: true },
          },
          {
            id: 'questions',
            name: 'Test Questions',
            description: 'Complete the sample questions',
            successCriteria: { questionsCompleted: true },
          },
          {
            id: 'review',
            name: 'Performance Review',
            description: 'Review your performance and strategies',
            successCriteria: { reviewed: true },
          }
        ],
        completionCriteria: { allStagesCompleted: true },
      };
      break;
    default:
      content = {};
      break;
  }

  return {
    id,
    moduleId,
    title,
    slug: title.toLowerCase().replace(/\s+/g, '-'),
    type: type,
    content,
    order,
    estimatedDuration: duration,
    resources,
  };
}

/**
 * Converts time in minutes to a formatted duration string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  return `${hours} hr ${remainingMinutes} min`;
}

/**
 * Calculates the total duration of all lessons in a module
 */
export function calculateModuleDuration(lessons: Lesson[]): number {
  return lessons.reduce((total, lesson) => total + lesson.estimatedDuration, 0);
}
