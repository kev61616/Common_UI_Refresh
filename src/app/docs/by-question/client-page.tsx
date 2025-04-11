'use client';

import { useSearchParams } from 'next/navigation';
import { QuestionView } from '@/components/review/QuestionView';

// Client component that uses useSearchParams
export default function ClientPage({ practiceSets }) {
  // Safe to use useSearchParams here since this component is
  // imported and wrapped in a Suspense boundary in the parent
  const searchParams = useSearchParams();

  // You can use the searchParams as needed
  const view = searchParams?.get('view') || 'default';

  return (
    <div className="space-y-8 py-[3%] px-[2%]" data-oid="chbplj5">
      <div className="max-w-3xl" data-oid="fyc5ovb">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent" data-oid="418j3c3">Question Review</h1>
        <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300" data-oid="nmxmx30">
          Review and analyze your practice questions to identify patterns, track your progress, and focus on areas that need improvement.
          {view !== 'default' && <span data-oid="46sqc2g"> (View: {view})</span>}
        </p>
      </div>
      
      <QuestionView practiceSets={practiceSets} data-oid="fkdiiko" />
    </div>);

}