'use client'

import { useEffect, useState } from 'react'
import { EnhancedCollapsibleBoardView } from './EnhancedCollapsibleBoardView'
import { QuestionViewProps } from '@/components/review/question-view/types'

/**
 * Extended props for the QuestionViewWrapper that include the additional props
 * needed by the EnhancedCollapsibleBoardView
 */
interface ExtendedQuestionViewProps extends QuestionViewProps {
  sortConfig?: { key: string; direction: 'asc' | 'desc' };
  onSortChange?: (field: string, direction: 'asc' | 'desc') => void;
  filters?: Record<string, string[] | string>;
}

/**
 * QuestionViewWrapper - A wrapper component that provides the EnhancedCollapsibleBoardView
 * implementation but with a name that reflects its use as the Question View.
 * 
 * This version uses client-side only rendering to avoid hydration errors from 
 * non-deterministic data generation that may differ between server and client.
 */
export function QuestionViewWrapper(props: ExtendedQuestionViewProps) {
  // Only render on the client side to avoid hydration mismatches
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Show nothing during SSR to avoid hydration errors
  if (!isClient) {
    return <div className="min-h-[600px] bg-slate-50 dark:bg-slate-900 rounded-lg p-8">
      <div className="animate-pulse flex flex-col space-y-4">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-slate-200 dark:bg-slate-700 h-48 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>;
  }
  
  // Only render the actual content on the client
  return <EnhancedCollapsibleBoardView {...props} />;
}
