import React from 'react'

export default function MockTestPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
        SAT Mock Tests
      </h1>
      <div className="bg-white rounded-xl shadow-md p-6 dark:bg-slate-800">
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Take full-length SAT practice tests under realistic testing conditions. These mock tests are designed to simulate the actual SAT experience.
        </p>
        
        <div className="mt-8 space-y-6">
          <div className="border border-slate-200 rounded-lg p-6 dark:border-slate-700 transition-all hover:shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-xl text-slate-900 dark:text-white">Practice Test #1</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Duration: 3 hours | 154 questions</p>
              </div>
              <button className="px-5 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors">
                Start Test
              </button>
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6 dark:border-slate-700 transition-all hover:shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-xl text-slate-900 dark:text-white">Practice Test #2</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Duration: 3 hours | 154 questions</p>
              </div>
              <button className="px-5 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors">
                Start Test
              </button>
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-lg p-6 dark:border-slate-700 transition-all hover:shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-xl text-slate-900 dark:text-white">Practice Test #3</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Duration: 3 hours | 154 questions</p>
              </div>
              <button className="px-5 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors">
                Start Test
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-10 bg-indigo-50 rounded-lg p-6 dark:bg-indigo-900/20">
          <h3 className="font-semibold text-lg text-indigo-800 dark:text-indigo-300">Test Taking Tips</h3>
          <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Take the test in a quiet place without distractions
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Time yourself strictly according to the test guidelines
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Review your answers and understand your mistakes after completion
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
