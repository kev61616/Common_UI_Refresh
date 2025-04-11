'use client';

import React, { useState, useMemo } from 'react';
import { QuestionViewProps } from './types';
import { getDataWithFallback } from '@/lib/dataUtils';
import { Question } from '@/lib/mockData';

/**
 * FlashcardView - A beautiful flashcard-style view for questions
 * 
 * Presents questions in an interactive, card-based layout with flip animations
 * and intuitive navigation controls
 */
export function FlashcardView({ practiceSets, onSelectSet }: QuestionViewProps) {
  // Use data with fallback
  const data = getDataWithFallback(practiceSets);

  // Extract and normalize questions
  const allQuestions = useMemo(() => {
    const questions: (Question & {setId: string;setTitle: string;subject: string;})[] = [];

    data.forEach((set) => {
      if (set.questions && Array.isArray(set.questions)) {
        const setTitle = `${set.subject} ${set.type} (${set.id})`;

        set.questions.forEach((q: Question) => {
          questions.push({
            ...q,
            setId: set.id,
            setTitle: setTitle,
            subject: set.subject // Add subject from parent set
          });
        });
      }
    });

    return questions;
  }, [data]);

  // State for current card index and flipped state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Current question
  const currentQuestion = useMemo(() => {
    return allQuestions.length > 0 ? allQuestions[currentIndex] : null;
  }, [allQuestions, currentIndex]);

  // Subject-based color scheme
  const getSubjectColor = (subject?: string) => {
    switch (subject) {
      case 'Math':
        return {
          bg: 'bg-emerald-100 dark:bg-emerald-900/20',
          text: 'text-emerald-800 dark:text-emerald-300',
          border: 'border-emerald-200 dark:border-emerald-800',
          accent: 'bg-emerald-500 dark:bg-emerald-600'
        };
      case 'Reading':
        return {
          bg: 'bg-sky-100 dark:bg-sky-900/20',
          text: 'text-sky-800 dark:text-sky-300',
          border: 'border-sky-200 dark:border-sky-800',
          accent: 'bg-sky-500 dark:bg-sky-600'
        };
      case 'Writing':
        return {
          bg: 'bg-purple-100 dark:bg-purple-900/20',
          text: 'text-purple-800 dark:text-purple-300',
          border: 'border-purple-200 dark:border-purple-800',
          accent: 'bg-purple-500 dark:bg-purple-600'
        };
      default:
        return {
          bg: 'bg-slate-100 dark:bg-slate-800/40',
          text: 'text-slate-800 dark:text-slate-300',
          border: 'border-slate-200 dark:border-slate-700',
          accent: 'bg-slate-500 dark:bg-slate-600'
        };
    }
  };

  // Difficulty-based badge
  const getDifficultyBadge = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Hard':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  // Handle next card
  const handleNext = () => {
    if (isAnimating || !currentQuestion) return;

    setIsAnimating(true);
    setIsFlipped(false);

    // Wait for flip animation to complete before changing index
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % allQuestions.length);
      setIsAnimating(false);
    }, 300);
  };

  // Handle previous card
  const handlePrevious = () => {
    if (isAnimating || !currentQuestion) return;

    setIsAnimating(true);
    setIsFlipped(false);

    // Wait for flip animation to complete before changing index
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + allQuestions.length) % allQuestions.length);
      setIsAnimating(false);
    }, 300);
  };

  // Handle card flip
  const handleFlip = () => {
    if (isAnimating || !currentQuestion) return;
    setIsFlipped((prev) => !prev);
  };

  // Handle practice set selection
  const handlePracticeSet = () => {
    if (!currentQuestion || !onSelectSet) return;
    onSelectSet(currentQuestion.setId);
  };

  // Calculate progress percentage
  const progressPercentage = allQuestions.length > 0 ?
  Math.round((currentIndex + 1) / allQuestions.length * 100) :
  0;

  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-6" data-oid="9r_:447">
        <div className="text-slate-400 dark:text-slate-500 mb-4" data-oid="tv6tzs:">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="zik7l2b">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-oid="0z1vihz" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-2" data-oid="znt0lh6">No flashcards available</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md text-center" data-oid="h-2ypn_">
          Complete some practice questions to see them here as flashcards.
        </p>
      </div>);

  }

  const colors = getSubjectColor(currentQuestion.subject);

  return (
    <div className="pb-8 px-4" data-oid="a:1m:z8">
      {/* Title Section */}
      <div className="text-center mb-8 px-0" data-oid="flmidzh">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2" data-oid="8g6k4k8">
          Study Flashcards
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto" data-oid="bifoy6y">
          Review your questions in an interactive flashcard format to reinforce your learning
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="w-full mb-6 px-4" data-oid="reoxgu9">
        <div className="flex justify-between mb-1" data-oid="plf2plf">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400" data-oid="itd:mje">
            Card {currentIndex + 1} of {allQuestions.length}
          </span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400" data-oid=":wic4kx">
            {progressPercentage}% Complete
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2" data-oid="-8yc-j1">
          <div
            className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }} data-oid="::n711v">
          </div>
        </div>
      </div>
      
      {/* Flashcard */}
      <div className="max-w-3xl mx-auto" data-oid="zbcf7ht">
        {/* Card container with perspective for 3D effect */}
        <div className="h-[400px] perspective-1000 w-full" data-oid="-bb8z.x">
          {/* Flashcard with 3D flip animation */}
          <div
            className={`relative h-full w-full transition-all duration-500 transform-style-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''}`
            }
            onClick={handleFlip} data-oid="qwg.3xq">

            {/* Front face */}
            <div
              className={`absolute inset-0 backface-hidden rounded-2xl shadow-lg border ${colors.border} ${colors.bg} p-6 flex flex-col`} data-oid="93-ed94">

              {/* Card header */}
              <div className="flex justify-between mb-4" data-oid="kl4j594">
                <div className="flex items-center" data-oid="0zu3qdj">
                  <div className={`w-3 h-3 rounded-full ${colors.accent} mr-2`} data-oid="yyrn231"></div>
                  <span className={`text-sm font-medium ${colors.text}`} data-oid="p.-2av4">
                    {currentQuestion.subject}
                  </span>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyBadge(currentQuestion.difficulty)}`} data-oid="x3_iwlu">
                  {currentQuestion.difficulty}
                </span>
              </div>
              
              {/* Topic and subtopic */}
              <div className="mb-4" data-oid="u75v6o5">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1" data-oid="u92kj-5">
                  {currentQuestion.topic}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400" data-oid="s0r.9gm">
                  {currentQuestion.subtopic}
                </p>
              </div>
              
              {/* Question content */}
              <div className="flex-grow flex items-center justify-center" data-oid="jc:npr_">
                <div className="text-center" data-oid="yyms_4j">
                  <p className="text-xl font-medium text-slate-800 dark:text-white mb-4" data-oid="i6681a0">
                    What can you recall about this topic?
                  </p>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-4" data-oid="-n56mda">
                    Click card to see details
                  </div>
                </div>
              </div>
              
              {/* Flip hint */}
              <div className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4" data-oid="z9d4rjx">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mx-auto mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor" data-oid="lbub_oz">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" data-oid="troku9h" />
                </svg>
                Tap to flip
              </div>
            </div>
            
            {/* Back face */}
            <div
              className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl shadow-lg border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 p-6 flex flex-col`} data-oid="pqpb5au">

              {/* Answer header */}
              <div className="text-center mb-4" data-oid="4.7-3ti">
                <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400" data-oid="fma:b5m">Answer</h3>
              </div>
              
              {/* Answer content */}
              <div className="flex-grow flex items-center justify-center" data-oid="p85unr1">
                <div className="text-center" data-oid="s4etto-">
                  <p className="text-xl font-medium text-slate-800 dark:text-white mb-4" data-oid="2_nv2b7">
                    {currentQuestion.topic}
                  </p>
                  
                  {/* Additional details */}
                  <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg" data-oid="0pn251h">
                    <p className="text-sm text-slate-600 dark:text-slate-400" data-oid="kxbyw.h">
                      {currentQuestion.subtopic}
                    </p>
                    
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700" data-oid=":ac7svi">
                      <p className="text-xs text-slate-500 dark:text-slate-400" data-oid="lsnl6c_">
                        Time spent: {currentQuestion.timeSpent} seconds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mastery state */}
              <div className="mt-4 flex justify-center" data-oid="qpvmgij">
                <div className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium rounded-full" data-oid="0d_bc9h">
                  {currentQuestion.correct ?
                  "Correct on last attempt" :
                  currentQuestion.answered ?
                  "Incorrect on last attempt" :
                  "Not yet attempted"
                  }
                </div>
              </div>
              
              {/* Flip hint */}
              <div className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4" data-oid="k4ky5wo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mx-auto mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor" data-oid="mrmg7af">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" data-oid="2jlufrg" />
                </svg>
                Tap to flip
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-between items-center mt-6" data-oid="95w6qeo">
          <button
            onClick={handlePrevious}
            className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            disabled={isAnimating} data-oid="6rrgm55">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="rus87d.">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" data-oid="ailgbe4" />
            </svg>
          </button>
          
          <button
            onClick={handlePracticeSet}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900" data-oid="870limy">

            Practice This Set
          </button>
          
          <button
            onClick={handleNext}
            className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            disabled={isAnimating} data-oid="lv:9to.">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="-lqdg32">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" data-oid="x:8wnnz" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Additional CSS for 3D transforms */}
      <style jsx global data-oid="bcc_ub0">{`
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
    </div>);

}