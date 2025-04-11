import React from 'react';
import Link from 'next/link';

export default function QuestionBankPage() {
  return (
    <div className="container mx-auto py-12 px-4" data-oid="jxy9zv-">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white" data-oid="whhp8wn">
        SAT Question Bank
      </h1>
      <div className="bg-white rounded-xl shadow-md p-6 dark:bg-slate-800" data-oid="x86cusk">
        <p className="text-slate-600 dark:text-slate-300 mb-4" data-oid="bobr:i_">
          This is the SAT Question Bank page where students can access a comprehensive collection of SAT practice questions.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2" data-oid=":9rqrlu">
          <div className="bg-sky-50 rounded-lg p-6 dark:bg-sky-900/20" data-oid="gn8g-m1">
            <h3 className="font-semibold text-xl mb-3 text-sky-800 dark:text-sky-300" data-oid="_ev6vo6">Reading & Writing</h3>
            <p className="text-slate-600 dark:text-slate-400" data-oid="auzh-xl">Practice your reading comprehension and writing skills with our curated question sets.</p>
            <Link href="/sat/question-bank/reading-and-writing" className="mt-4 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors inline-block" data-oid="u0rc92o">
              Start Practice
            </Link>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 dark:bg-purple-900/20" data-oid="a1sk8t3">
            <h3 className="font-semibold text-xl mb-3 text-purple-800 dark:text-purple-300" data-oid="fzjp:_v">Math</h3>
            <p className="text-slate-600 dark:text-slate-400" data-oid="a2jm-_x">Test your mathematical knowledge with various problem types and difficulty levels.</p>
            <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors" data-oid="sgbp2u2">
              Start Practice
            </button>
          </div>
        </div>
      </div>
    </div>);

}