'use client'

import { useState } from 'react'
import { ReviewTestPage } from '@/components/ReviewTestPage'

export default function BySetPage() {
  return (
    <div className="space-y-8 py-[3%] px-[2%]">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Practice Set Review</h1>
        <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300">
          Review and analyze your completed practice sets to track your progress and identify areas for improvement.
        </p>
      </div>
      
      <ReviewTestPage />
    </div>
  )
}
