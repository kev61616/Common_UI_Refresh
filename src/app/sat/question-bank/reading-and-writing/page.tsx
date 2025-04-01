"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Book, PenTool, Clock, FileText } from 'lucide-react';
import { useLayout } from '@/contexts/LayoutContext';

export default function ReadingAndWritingPracticePage() {
  const { setIsSATLayout } = useLayout();
  
  // Set the isSATLayout flag to true when the component mounts
  React.useEffect(() => {
    setIsSATLayout(true);
    return () => {
      setIsSATLayout(false);
    };
  }, [setIsSATLayout]);
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-6 flex items-center">
        <Link href="/sat/question-bank" className="text-sky-600 hover:text-sky-800 flex items-center mr-3">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Question Bank
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Reading & Writing Practice
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 dark:bg-slate-800">
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          Improve your reading comprehension and writing skills with our curated practice sets that mimic the SAT format.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Reading Comprehension Section */}
          <div className="bg-sky-50 rounded-lg p-6 border border-sky-100 transition-all hover:shadow-md dark:bg-sky-900/20 dark:border-sky-800/40">
            <div className="flex items-center mb-4">
              <div className="bg-sky-100 p-3 rounded-full dark:bg-sky-800">
                <Book className="h-6 w-6 text-sky-600 dark:text-sky-300" />
              </div>
              <h3 className="font-semibold text-xl ml-4 text-sky-800 dark:text-sky-300">Reading Comprehension</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Test your ability to understand and analyze complex passages with multiple-choice questions.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
              <Clock className="inline h-4 w-4 mr-1" />
              Estimated time: 35 minutes
            </p>
            <Link 
              href="/geptv2/reading/reading_comprehension" 
              className="block w-full text-center px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors">
              Start Practice
            </Link>
          </div>

          {/* Sentence Completion Section */}
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100 transition-all hover:shadow-md dark:bg-indigo-900/20 dark:border-indigo-800/40">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full dark:bg-indigo-800">
                <PenTool className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h3 className="font-semibold text-xl ml-4 text-indigo-800 dark:text-indigo-300">Sentence Completion</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Practice completing sentences with appropriate vocabulary and grammatical forms.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
              <Clock className="inline h-4 w-4 mr-1" />
              Estimated time: 20 minutes
            </p>
            <Link 
              href="/geptv2/reading/vocabulary_and_structure" 
              className="block w-full text-center px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors">
              Start Practice
            </Link>
          </div>

          {/* Grammar & Usage Section */}
          <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100 transition-all hover:shadow-md dark:bg-emerald-900/20 dark:border-emerald-800/40">
            <div className="flex items-center mb-4">
              <div className="bg-emerald-100 p-3 rounded-full dark:bg-emerald-800">
                <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
              </div>
              <h3 className="font-semibold text-xl ml-4 text-emerald-800 dark:text-emerald-300">Grammar & Usage</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Test your knowledge of English grammar rules, punctuation, and sentence structure.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
              <Clock className="inline h-4 w-4 mr-1" />
              Estimated time: 25 minutes
            </p>
            <Link 
              href="/geptv2/reading/paragraph_completion" 
              className="block w-full text-center px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors">
              Start Practice
            </Link>
          </div>
        </div>

        <div className="mt-10 bg-amber-50 rounded-lg p-6 dark:bg-amber-900/20">
          <h3 className="font-semibold text-lg text-amber-800 dark:text-amber-300">Practice Tips</h3>
          <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Read passages actively by underlining key information and making mental notes
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Look for context clues when answering vocabulary questions
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Practice time management by allocating specific time for each passage
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}