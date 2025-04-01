'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ReviewTestPage } from '@/components/ReviewTestPage'

export default function ClientPage() {
  // Safe to use useSearchParams here since this component is
  // imported and wrapped in a Suspense boundary in the parent
  const searchParams = useSearchParams()
  
  // You can use the searchParams as needed
  const view = searchParams?.get('view') || 'default'
  
  return (
    <div className="space-y-8 py-[3%] px-[2%]">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Practice Set Review</h1>
        <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300">
          Review and analyze your completed practice sets to track your progress and identify areas for improvement.
          {view !== 'default' && <span> (View: {view})</span>}
        </p>
      </div>
      
      <ReviewTestPage />
    </div>
  )
}
