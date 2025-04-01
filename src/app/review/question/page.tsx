import { Suspense } from 'react'
import ClientPage from './client-page'

// Loading component for Suspense
function LoadingQuestionView() {
  return (
    <div className="px-[2%] pb-8">
      <div className="w-full py-4 mb-4">
        <div className="h-8 w-full max-w-3xl mx-auto flex space-x-4">
          <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          <div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="h-10 w-full bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 animate-pulse"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-40 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}

/**
 * Question View page with proper Suspense boundary for useSearchParams
 */
export default function QuestionViewPage() {
  return (
    <Suspense fallback={<LoadingQuestionView />}>
      <ClientPage />
    </Suspense>
  )
}
