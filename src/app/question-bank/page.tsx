import { Suspense } from "react";
import Link from "next/link";
import ClientPage from "./client-page";

// Loading component for Suspense
function RedirectLoading() {
  return (
    <div className="min-h-screen bg-white py-12 dark:bg-slate-900" data-oid="tmsd6jj">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-oid="4l0-d5q">
        <div className="mb-10" data-oid="7_awzfk">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" data-oid="u_mfbl4">Loading Question Bank...</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" data-oid="h2x1c6-">
            Please wait while we prepare the question bank for you.
          </p>
        </div>
        <div className="text-center py-8" data-oid="360j-ot">
          <div className="inline-block w-12 h-12 border-t-4 border-sky-500 border-solid rounded-full animate-spin" data-oid="ynx_:ly"></div>
        </div>
        <div className="mt-6" data-oid="5mh1q79">
          <p className="text-gray-500 dark:text-gray-400" data-oid=":qtdd-:">
            You can also access the 
            <Link href="/sat/question-bank" className="text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300 font-medium mx-1" data-oid="tvm5ns0">
              SAT Question Bank
            </Link>
            directly.
          </p>
        </div>
      </div>
    </div>);

}

/**
 * Question Bank Redirect Page with proper Suspense boundary
 */
export default function QuestionBankRedirectPage() {
  return (
    <Suspense fallback={<RedirectLoading data-oid="sb_d_9x" />} data-oid="bs6came">
      <ClientPage data-oid="cj4p-ln" />
    </Suspense>);

}