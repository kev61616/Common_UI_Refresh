import { Suspense } from 'react'
import { mockPracticeSets } from '@/lib/mockData'
import ClientPage from './client-page'

// Loading fallback for Suspense
function LoadingFallback() {
  return (
    <div className="px-[2%] flex flex-col items-center justify-center py-12">
      <div className="h-8 w-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 dark:text-slate-400">Loading question view...</p>
    </div>
  )
}

// Main page component with proper Suspense boundary for useSearchParams
export default function ByQuestionPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ClientPage practiceSets={mockPracticeSets} />
    </Suspense>
  )
}
