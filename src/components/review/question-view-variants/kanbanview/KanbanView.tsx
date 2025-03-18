'use client'

import React, { useMemo } from 'react'
import { QuestionViewProps } from '../types'
import { Question } from '@/lib/mockData'
import { getDataWithFallback } from '@/lib/dataUtils'

/**
 * KanbanView - Displays questions in a Kanban board style layout
 * Organizes questions by mastery level into columns
 */
export function KanbanView({
  practiceSets,
  onSelectSet,
  selectedSetId,
}: QuestionViewProps) {
  // Extract all questions from all practice sets
  const allQuestions = useMemo(() => {
    const questions: (Question & { setId: string; setSubject: string })[] = []
    
    practiceSets.forEach(set => {
      set.questions.forEach(q => {
        questions.push({
          ...q,
          setId: set.id,
          setSubject: set.subject
        })
      })
    })
    
    return questions
  }, [practiceSets])

  // Define mastery levels and their criteria
  const masteryLevels = [
    { 
      id: 'very-weak', 
      name: 'Very Weak', 
      description: '2x+ incorrect',
      color: 'bg-red-100 dark:bg-red-900/20 border-red-300 dark:border-red-700',
      titleColor: 'text-red-800 dark:text-red-400',
      match: (q: Question) => q.answered && !q.correct && Math.random() < 0.3 // Simulating 3x incorrect
    },
    { 
      id: 'weak', 
      name: 'Weak', 
      description: '2x incorrect',
      color: 'bg-orange-100 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700',
      titleColor: 'text-orange-800 dark:text-orange-400',
      match: (q: Question) => q.answered && !q.correct && Math.random() < 0.5 && Math.random() >= 0.3 // Simulating 2x incorrect
    },
    { 
      id: 'not-attempted', 
      name: 'Not Attempted', 
      description: '0x attempted',
      color: 'bg-gray-100 dark:bg-gray-800/40 border-gray-300 dark:border-gray-700',
      titleColor: 'text-gray-800 dark:text-gray-400',
      match: (q: Question) => !q.answered 
    },
    { 
      id: 'emerging', 
      name: 'Emerging', 
      description: '1x correct',
      color: 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700',
      titleColor: 'text-yellow-800 dark:text-yellow-400',
      match: (q: Question) => q.answered && q.correct && Math.random() < 0.3 // Simulating 1x correct
    },
    { 
      id: 'proficient', 
      name: 'Proficient', 
      description: '2x correct',
      color: 'bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700',
      titleColor: 'text-blue-800 dark:text-blue-400',
      match: (q: Question) => q.answered && q.correct && Math.random() < 0.5 && Math.random() >= 0.3 // Simulating 2x correct
    },
    { 
      id: 'mastered', 
      name: 'Mastered', 
      description: '3x+ correct',
      color: 'bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700',
      titleColor: 'text-green-800 dark:text-green-400',
      match: (q: Question) => q.answered && q.correct && Math.random() >= 0.5 // Simulating 3x+ correct
    }
  ]

  // Group questions by mastery level
  const questionsByLevel = useMemo(() => {
    const grouped: Record<string, (Question & { setId: string; setSubject: string })[]> = {}
    
    // Initialize empty arrays for each mastery level
    masteryLevels.forEach(level => {
      grouped[level.id] = []
    })
    
    // Generate a deterministic "mastery score" for each question based on its ID
    // This ensures consistent categorization without relying on Math.random()
    const getMasteryScore = (questionId: string): number => {
      // Use hash-like approach to convert ID to a numeric value
      const hashValue = questionId.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
      }, 0);
      
      // Return a value between 0 and 1 based on hash
      return (hashValue % 100) / 100;
    };
    
    // Distribute questions to appropriate levels with a more balanced distribution
    // to ensure data appears in all columns
    allQuestions.forEach(question => {
      const masteryScore = getMasteryScore(question.id);
      
      // For testing and demo purposes, create a more balanced distribution
      // that ensures all categories have items, especially "proficient" and "mastered"
      if (!question.answered) {
        // Not attempted
        grouped['not-attempted'].push(question);
      } else if (question.correct) {
        // Use a different distribution that ensures more questions in proficient and mastered
        if (masteryScore < 0.2) {
          // Emerging (1x correct) - 20%
          grouped['emerging'].push(question);
        } else if (masteryScore < 0.5) {
          // Proficient (2x correct) - 30%
          grouped['proficient'].push(question);
        } else {
          // Mastered (3x+ correct) - 50%
          grouped['mastered'].push(question);
        }
      } else {
        // Incorrect
        if (masteryScore < 0.5) {
          // Very weak (3x+ incorrect)
          grouped['very-weak'].push(question);
        } else {
          // Weak (2x incorrect)
          grouped['weak'].push(question);
        }
      }
      
      // Create some duplicate entries to ensure we have data in all categories
      // This is just for demo purposes
      const dupMasteryScore = (masteryScore + 0.3) % 1;
      if (dupMasteryScore < 0.3) {
        // Create a clone of the question to avoid reference issues
        const questionClone = {...question, id: question.id + '-dup'};
        grouped['proficient'].push(questionClone);
      } else if (dupMasteryScore < 0.6) {
        const questionClone = {...question, id: question.id + '-dup'};
        grouped['mastered'].push(questionClone);
      }
    });
    
    return grouped;
  }, [allQuestions, masteryLevels])

  // Function to get subject-specific icon or color
  const getSubjectColor = (subject: string) => {
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

  return (
    <div className="pb-8">
      {/* Kanban board layout */}
      <div className="w-full h-full overflow-x-auto">
        <div className="flex gap-6 pb-4 px-2 min-w-max">
          {masteryLevels.map(level => (
            <div 
              key={level.id}
              className="w-[250px] flex flex-col h-full"
            >
              {/* Column header */}
              <div className={`p-3 rounded-t-lg ${level.color} border-t border-l border-r`}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-semibold ${level.titleColor}`}>{level.name}</h3>
                  <span className="inline-flex items-center justify-center w-7 h-7 text-xs bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-full">
                    {questionsByLevel[level.id].length}
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{level.description}</div>
              </div>
              
              {/* Column content */}
              <div className={`flex-grow p-3 overflow-y-auto rounded-b-lg border-b border-l border-r ${level.color} min-h-[400px]`}>
                <div className="flex flex-col gap-3">
                  {questionsByLevel[level.id].map(question => (
                    <div 
                      key={question.id}
                      onClick={() => onSelectSet && onSelectSet(question.setId)}
                      className={`bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-slate-200 dark:border-slate-700 ${
                        selectedSetId === question.setId ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : ''
                      }`}
                    >
                      {/* Question card content */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${getSubjectColor(question.setSubject)}`}></div>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{question.setSubject}</span>
                      </div>
                      
                      <div className="font-medium text-sm mb-2 text-slate-800 dark:text-slate-200">
                        {question.topic}
                      </div>
                      
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {question.subtopic}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          question.difficulty === 'Easy' 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                            : question.difficulty === 'Medium'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                        }`}>
                          {question.difficulty}
                        </span>
                        
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {Math.floor(question.timeSpent / 60)}:{String(question.timeSpent % 60).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Empty state */}
                  {questionsByLevel[level.id].length === 0 && (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                      <div className="text-slate-400 dark:text-slate-500 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">No questions in this category</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
