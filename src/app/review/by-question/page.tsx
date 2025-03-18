'use client'

import { ReviewTestPage } from '@/components/ReviewTestPage'

export default function ByQuestionPage() {
  return (
    <div className="py-[3%] px-[2%]">
      <ReviewTestPage initialViewType="question" />
    </div>
  )
}
