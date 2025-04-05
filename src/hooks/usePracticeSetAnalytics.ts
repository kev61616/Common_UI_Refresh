import { PracticeSet, Question } from '@/lib/mockData'; // Assuming types are here
import { useMemo } from 'react';

export interface PracticeSetAnalytics {
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  averageTimePerQuestion: number; // in seconds
  difficultyComfortMessage: string;
}

export function usePracticeSetAnalytics(practiceSet: PracticeSet | null | undefined): PracticeSetAnalytics | null {

  const analytics = useMemo(() => {
    if (!practiceSet || !practiceSet.questions || practiceSet.questions.length === 0) {
      return null;
    }

    const questions = practiceSet.questions;
    const totalQuestions = questions.length;

    const answeredQuestions = questions.filter(q => q.answered);
    const correctCount = answeredQuestions.filter(q => q.correct).length;
    const incorrectCount = answeredQuestions.length - correctCount;

    const totalTimeSpent = answeredQuestions.reduce((sum, q) => sum + q.timeSpent, 0);
    const averageTimePerQuestion = totalQuestions > 0 ? Math.round(totalTimeSpent / totalQuestions) : 0;

    // Calculate adaptive difficulty level message
    const easyCorrect = questions.filter(q => q.difficulty === 'Easy' && q.correct).length;
    const easyTotal = questions.filter(q => q.difficulty === 'Easy').length;
    const mediumCorrect = questions.filter(q => q.difficulty === 'Medium' && q.correct).length;
    const mediumTotal = questions.filter(q => q.difficulty === 'Medium').length;
    const hardCorrect = questions.filter(q => q.difficulty === 'Hard' && q.correct).length;
    const hardTotal = questions.filter(q => q.difficulty === 'Hard').length;

    const easyAccuracy = easyTotal > 0 ? (easyCorrect / easyTotal) * 100 : 0;
    const mediumAccuracy = mediumTotal > 0 ? (mediumCorrect / mediumTotal) * 100 : 0;
    const hardAccuracy = hardTotal > 0 ? (hardCorrect / hardTotal) * 100 : 0;

    let difficultyComfortMessage = "Focus on mastering basic concepts first";
    if (hardAccuracy >= 80) difficultyComfortMessage = "Hard questions are within your comfort zone";
    else if (mediumAccuracy >= 80) difficultyComfortMessage = "Medium questions are comfortable, focus on harder content";
    else if (easyAccuracy >= 80) difficultyComfortMessage = "Easy questions are comfortable, increase difficulty";

    return {
      correctCount,
      incorrectCount,
      totalQuestions,
      averageTimePerQuestion,
      difficultyComfortMessage,
    };
  }, [practiceSet]);

  return analytics;
}
