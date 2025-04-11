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
    <div className="container mx-auto py-12 px-4" data-oid="9txysuo">
      <div className="mb-6 flex items-center" data-oid="th-c54d">
        <Link href="/sat/question-bank" className="text-sky-600 hover:text-sky-800 flex items-center mr-3" data-oid="0cu0bj-">
          <ChevronLeft className="h-5 w-5 mr-1" data-oid="gdfg0y9" />
          Back to Question Bank
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white" data-oid="9auqcoq">
          Reading & Writing Practice
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 dark:bg-slate-800" data-oid="_ome5pe">
        <p className="text-slate-600 dark:text-slate-300 mb-8" data-oid="6.e1hpu">
          Improve your reading comprehension and writing skills with our curated practice sets that mimic the SAT format.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-oid="5w6so.p">
          {/* Reading Comprehension Section */}
          <div className="bg-sky-50 rounded-lg p-6 border border-sky-100 transition-all hover:shadow-md dark:bg-sky-900/20 dark:border-sky-800/40" data-oid="592gwrh">
            <div className="flex items-center mb-4" data-oid="bj68mo9">
              <div className="bg-sky-100 p-3 rounded-full dark:bg-sky-800" data-oid="rd9i3.y">
                <Book className="h-6 w-6 text-sky-600 dark:text-sky-300" data-oid="l86w6bw" />
              </div>
              <h3 className="font-semibold text-xl ml-4 text-sky-800 dark:text-sky-300" data-oid="-74g510">Reading Comprehension</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4" data-oid="7h5rxit">
              Test your ability to understand and analyze complex passages with multiple-choice questions.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4" data-oid="6w96_:i">
              <Clock className="inline h-4 w-4 mr-1" data-oid="xddgx2k" />
              Estimated time: 35 minutes
            </p>
            <Link
              href="/geptv2/reading/reading_comprehension"
              className="block w-full text-center px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors" data-oid="zuztavw">
              Start Practice
            </Link>
          </div>

          {/* Sentence Completion Section */}
          <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100 transition-all hover:shadow-md dark:bg-indigo-900/20 dark:border-indigo-800/40" data-oid="uq4h3m_">
            <div className="flex items-center mb-4" data-oid="ek:b59o">
              <div className="bg-indigo-100 p-3 rounded-full dark:bg-indigo-800" data-oid="b6mpvls">
                <PenTool className="h-6 w-6 text-indigo-600 dark:text-indigo-300" data-oid="0kh51_n" />
              </div>
              <h3 className="font-semibold text-xl ml-4 text-indigo-800 dark:text-indigo-300" data-oid="d6j9f5f">Sentence Completion</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4" data-oid=".uwx4j2">
              Practice completing sentences with appropriate vocabulary and grammatical forms.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4" data-oid="smvbz-_">
              <Clock className="inline h-4 w-4 mr-1" data-oid="fztzzc6" />
              Estimated time: 20 minutes
            </p>
            <Link
              href="/geptv2/reading/vocabulary_and_structure"
              className="block w-full text-center px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors" data-oid="en4k519">
              Start Practice
            </Link>
          </div>

          {/* Grammar & Usage Section */}
          <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-100 transition-all hover:shadow-md dark:bg-emerald-900/20 dark:border-emerald-800/40" data-oid="d5ku9f:">
            <div className="flex items-center mb-4" data-oid="fz.5z5a">
              <div className="bg-emerald-100 p-3 rounded-full dark:bg-emerald-800" data-oid="yc5nl2-">
                <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-300" data-oid="t9h1-wd" />
              </div>
              <h3 className="font-semibold text-xl ml-4 text-emerald-800 dark:text-emerald-300" data-oid="26mm:do">Grammar & Usage</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-4" data-oid="jdnvds-">
              Test your knowledge of English grammar rules, punctuation, and sentence structure.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-4" data-oid="10ew95o">
              <Clock className="inline h-4 w-4 mr-1" data-oid="k6dnh1q" />
              Estimated time: 25 minutes
            </p>
            <Link
              href="/geptv2/reading/paragraph_completion"
              className="block w-full text-center px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors" data-oid="ubozeon">
              Start Practice
            </Link>
          </div>
        </div>

        <div className="mt-10 bg-amber-50 rounded-lg p-6 dark:bg-amber-900/20" data-oid="1ewdp4u">
          <h3 className="font-semibold text-lg text-amber-800 dark:text-amber-300" data-oid="f4j9t99">Practice Tips</h3>
          <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300" data-oid=".-jhq0.">
            <li className="flex items-start" data-oid="wjxu6he">
              <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="4.jdu1q">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="wbdjeb-" />
              </svg>
              Read passages actively by underlining key information and making mental notes
            </li>
            <li className="flex items-start" data-oid="gshsja5">
              <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="2rahrvb">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="8lpprrz" />
              </svg>
              Look for context clues when answering vocabulary questions
            </li>
            <li className="flex items-start" data-oid="3adlhod">
              <svg className="h-5 w-5 text-amber-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="rym-y8_">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="a-l191d" />
              </svg>
              Practice time management by allocating specific time for each passage
            </li>
          </ul>
        </div>
      </div>
    </div>);

}