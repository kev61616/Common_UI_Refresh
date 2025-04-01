import { Suspense } from "react";
import ContinuousPracticeClient from "./client-page";

// Loading component for the Continuous Practice page
function ContinuousPracticeLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="bg-slate-200 dark:bg-slate-700 h-10 w-72 rounded-md animate-pulse"></div>
          <div className="mt-3 bg-slate-200 dark:bg-slate-700 h-5 w-full max-w-2xl rounded-md animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* First card skeleton */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse">
            <div className="bg-indigo-200 dark:bg-indigo-800 h-2"></div>
            <div className="p-8">
              <div className="flex flex-col items-center">
                <div className="bg-slate-200 dark:bg-slate-700 h-16 w-16 rounded-full mb-4"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-6 w-48 rounded-md mb-3"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-full rounded-md mb-2"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-5/6 rounded-md mb-2"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-2/3 rounded-md mb-6"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-24 rounded-md"></div>
              </div>
            </div>
          </div>
          
          {/* Second card skeleton */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse">
            <div className="bg-emerald-200 dark:bg-emerald-800 h-2"></div>
            <div className="p-8">
              <div className="flex flex-col items-center">
                <div className="bg-slate-200 dark:bg-slate-700 h-16 w-16 rounded-full mb-4"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-6 w-48 rounded-md mb-3"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-full rounded-md mb-2"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-5/6 rounded-md mb-2"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-2/3 rounded-md mb-6"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-24 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContinuousPracticePage() {
  return (
    <Suspense fallback={<ContinuousPracticeLoading />}>
      <ContinuousPracticeClient />
    </Suspense>
  );
}
