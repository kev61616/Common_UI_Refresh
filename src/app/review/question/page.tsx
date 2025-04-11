import { Suspense } from 'react';
import ClientPage from './client-page';

// Loading component for Suspense
function LoadingQuestionView() {
  return (
    <div className="px-[2%] pb-8" data-oid="yfhba1z">
      <div className="w-full py-4 mb-4" data-oid="nqma6ox">
        <div className="h-8 w-full max-w-3xl mx-auto flex space-x-4" data-oid="5nueh4:">
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" data-oid="pewzm7e"></div>
          <div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" data-oid="5gf6t:5"></div>
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" data-oid="vk6g8y1"></div>
        </div>
      </div>
      
      <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 animate-pulse" data-oid="4t_hxvi"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-oid="dt3vyl4">
        {[1, 2, 3, 4, 5, 6].map((i) =>
        <div key={i} className="h-40 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" data-oid="o-s983o"></div>
        )}
      </div>
    </div>);

}

/**
 * Question View page with proper Suspense boundary for useSearchParams
 */
export default function QuestionViewPage() {
  return (
    <Suspense fallback={<LoadingQuestionView data-oid="ey3hh8:" />} data-oid="243j7af">
      <ClientPage data-oid="0d5c42x" />
    </Suspense>);

}