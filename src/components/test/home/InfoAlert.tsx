'use client';

export function InfoAlert() {
  return (
    <div className="mb-8 bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm animated-border stagger-fade-in stagger-delay-1">
      <div className="flex items-start">
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full p-2 mr-4 flex-shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Get the most out of your practice</h3>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Our test platform is designed using learning science principles to optimize your study time. Consistent practice with spaced repetition helps you retain information longer and perform better on actual exams.
          </div>
        </div>
      </div>
    </div>);

}