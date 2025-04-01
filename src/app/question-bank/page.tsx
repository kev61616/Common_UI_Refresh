import { Suspense } from "react";
import Link from "next/link";
import ClientPage from "./client-page";

// Loading component for Suspense
function RedirectLoading() {
  return (
    <div className="min-h-screen bg-white py-12 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Loading Question Bank...</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Please wait while we prepare the question bank for you.
          </p>
        </div>
        <div className="text-center py-8">
          <div className="inline-block w-12 h-12 border-t-4 border-sky-500 border-solid rounded-full animate-spin"></div>
        </div>
        <div className="mt-6">
          <p className="text-gray-500 dark:text-gray-400">
            You can also access the 
            <Link href="/sat/question-bank" className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium mx-1">
              SAT Question Bank
            </Link>
            directly.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Question Bank Redirect Page with proper Suspense boundary
 */
export default function QuestionBankRedirectPage() {
  return (
    <Suspense fallback={<RedirectLoading />}>
      <ClientPage />
    </Suspense>
  );
}
