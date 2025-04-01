'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import '@/styles/components/set-view.css'

// Add console logging to help debug
console.log('Review page loaded - redirecting based on view parameter');

/**
 * Main review page that redirects to the appropriate view page
 * Updated to handle the new combined insights page for question and timeline views
 */
export default function ReviewIndexPage() {
  const searchParams = useSearchParams();
  const viewParam = searchParams?.get('view');
  
  // Add console logging for search params
  console.log('View parameter from URL:', viewParam);
  
  // Redirect to appropriate view page on component mount
  useEffect(() => {
    // Determine redirect path based on view parameter
    let redirectPath = '/review/set'; // Default to set view
    
    if (viewParam === 'question' || viewParam === 'timeline') {
      console.log('Redirecting to insights view');
      redirectPath = '/review/insights';
    } else if (viewParam === 'matrix') {
      console.log('Redirecting to set view');
      redirectPath = '/review/set';
    }
    
    // Perform browser redirect
    console.log('Redirecting to:', redirectPath);
    window.location.href = redirectPath;
  }, [viewParam]);

  // Show a simple loading indicator while redirect happens
  return (
    <div className="px-[2%] flex flex-col items-center justify-center py-12">
      <div className="h-8 w-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-600 dark:text-slate-400">Redirecting to the appropriate view...</p>
    </div>
  );
}
