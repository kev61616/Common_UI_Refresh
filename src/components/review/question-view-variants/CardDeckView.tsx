'use client'

import React, { useState, useEffect } from 'react'
import { QuestionViewProps } from './types'
import { QuestionWithMetadata } from '../question-view/types'
import { extractQuestionsWithMetadata } from '../question-view/utils'

/**
 * Card Deck View (Question View Variant 2)
 * Visualize questions as a deck of cards you can flip through
 */
export function CardDeckView({ practiceSets, onSelectSet, selectedSetId }: QuestionViewProps) {
  // Extract all questions from practice sets with metadata
  const [allQuestions, setAllQuestions] = useState<QuestionWithMetadata[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [subjectFilter, setSubjectFilter] = useState<'Reading' | 'Writing' | 'Math' | null>(null)
  
  // Process questions when practiceSets change
  useEffect(() => {
    const questions = extractQuestionsWithMetadata(practiceSets)
    setAllQuestions(questions)
    setCurrentIndex(0)
    setFlipped(false)
  }, [practiceSets])
  
  // Filter questions by subject if a filter is selected
  const filteredQuestions = subjectFilter 
    ? allQuestions.filter(q => q.setSubject === subjectFilter)
    : allQuestions
  
  // Handle navigation
  const nextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setFlipped(false)
    }
  }
  
  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setFlipped(false)
    }
  }
  
  // If no questions, show a message
  if (filteredQuestions.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-center">2. Card Deck View</h3>
        <div className="flex justify-center items-center h-[500px] text-slate-500 dark:text-slate-400">
          <p>No questions available to display.</p>
        </div>
      </div>
    )
  }
  
  const currentQuestion = filteredQuestions[currentIndex]
  
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-6 text-center">2. Card Deck View</h3>
      
      {/* Filters */}
      <div className="flex justify-center mb-8 gap-2">
        <button 
          onClick={() => setSubjectFilter(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            subjectFilter === null 
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          All Subjects
        </button>
        <button 
          onClick={() => setSubjectFilter('Math')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            subjectFilter === 'Math' 
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          Math
        </button>
        <button 
          onClick={() => setSubjectFilter('Reading')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            subjectFilter === 'Reading' 
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          Reading
        </button>
        <button 
          onClick={() => setSubjectFilter('Writing')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            subjectFilter === 'Writing' 
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
          }`}
        >
          Writing
        </button>
      </div>
      
      {/* Card container with perspective */}
      <div className="perspective-1000 w-full max-w-2xl mx-auto my-8 h-[350px]">
        {/* Flip card */}
        <div 
          className={`relative w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${
            flipped ? 'rotate-y-180' : ''
          }`}
          onClick={() => setFlipped(!flipped)}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                ${currentQuestion.setSubject === 'Math' 
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300' 
                  : currentQuestion.setSubject === 'Reading'
                    ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300'
                    : 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300'
                }`}
              >
                {currentQuestion.setSubject}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold
                ${currentQuestion.difficulty === 'Easy'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : currentQuestion.difficulty === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}
              >
                {currentQuestion.difficulty}
              </span>
            </div>
            
            <div className="flex-grow flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {currentQuestion.topic} Question
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                This is a {currentQuestion.subtopic} question from {currentQuestion.setSubject}.
              </p>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Click card to see answer
              </div>
            </div>
            
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-4 flex justify-between">
              <div>Question {currentIndex + 1} of {filteredQuestions.length}</div>
              <div>Time spent: {currentQuestion.timeSpent}s</div>
            </div>
          </div>
          
          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700 flex flex-col rotate-y-180">
            <div className="flex justify-between items-center mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                currentQuestion.correct 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {currentQuestion.correct ? 'Correct' : 'Incorrect'}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                From set: {currentQuestion.setType}
              </span>
            </div>
            
            <div className="flex-grow flex flex-col justify-center items-center text-center">
              <div className={`text-5xl mb-6 ${
                currentQuestion.correct 
                  ? 'text-green-500 dark:text-green-400' 
                  : 'text-red-500 dark:text-red-400'
              }`}>
                {currentQuestion.correct ? '✓' : '✗'}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Answer Feedback
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {currentQuestion.correct 
                  ? 'You answered this question correctly!' 
                  : 'This question was answered incorrectly.'}
              </p>
              
              <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg text-sm">
                <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">Improvement Tips:</p>
                <p className="text-slate-600 dark:text-slate-400">
                  {currentQuestion.correct 
                    ? 'Great job! Keep practicing similar questions to maintain your skills.' 
                    : `Focus on improving your understanding of ${currentQuestion.topic}, particularly ${currentQuestion.subtopic} concepts.`}
                </p>
              </div>
            </div>
            
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-4 text-center">
              Click card to return to question
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation controls */}
      <div className="flex justify-center gap-6 mt-8">
        <button 
          onClick={prevQuestion}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-lg bg-slate-100 text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
          Previous
        </button>
        
        <button
          onClick={() => onSelectSet && onSelectSet(currentQuestion.setId)}
          className="px-6 py-3 rounded-lg bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/50"
        >
          View Set
        </button>
        
        <button 
          onClick={nextQuestion}
          disabled={currentIndex === filteredQuestions.length - 1}
          className="px-6 py-3 rounded-lg bg-slate-100 text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
          Next
        </button>
      </div>
      
      {/* Add the necessary CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}
