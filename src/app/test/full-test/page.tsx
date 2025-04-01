import { Suspense } from "react";
import FullTestClient from "./client-page";

// Loading component for the Full Test page
function FullTestLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="bg-slate-200 dark:bg-slate-700 h-10 w-56 rounded-md animate-pulse"></div>
          <div className="mt-3 bg-slate-200 dark:bg-slate-700 h-5 w-full max-w-2xl rounded-md animate-pulse"></div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse mb-8">
          <div className="p-6">
            <div className="flex flex-col">
              <div className="bg-slate-200 dark:bg-slate-700 h-7 w-48 rounded-md mb-4"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-4 w-full rounded-md mb-2"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-4 w-5/6 rounded-md mb-6"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-10 w-36 rounded-md mx-auto"></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse">
              <div className="p-5">
                <div className="bg-slate-200 dark:bg-slate-700 h-6 w-2/3 rounded-md mb-3"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-full rounded-md mb-2"></div>
                <div className="bg-slate-200 dark:bg-slate-700 h-4 w-full rounded-md mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="bg-slate-200 dark:bg-slate-700 h-4 w-20 rounded-md"></div>
                  <div className="bg-slate-200 dark:bg-slate-700 h-8 w-20 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FullTestPage() {
  return (
    <Suspense fallback={<FullTestLoading />}>
      <FullTestClient />
    </Suspense>
  );
}
