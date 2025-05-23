'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import '@/styles/components/set-view.css';

// Loading component for the Suspense boundary
function ReviewPageContent() {
  const searchParams = useSearchParams();
  const viewParam = searchParams?.get('view');

  // Add console logging for search params
  console.log('View parameter from URL:', viewParam);

  // Redirect to appropriate view page on component mount
  useEffect(() => {
    // Determine redirect path based on view parameter
    let redirectPath = '/review/set'; // Default to set view

    if (viewParam === 'question') {
      console.log('Redirecting to question view');
      redirectPath = '/review/question';
    } else if (viewParam === 'matrix') {
      console.log('Redirecting to set view');
      redirectPath = '/review/set';
    } else if (viewParam === 'board') {
      console.log('Redirecting to board view');
      redirectPath = '/review/board';
    }

    // Perform browser redirect
    console.log('Redirecting to:', redirectPath);
    window.location.href = redirectPath;
  }, [viewParam]);

  // Show a simple loading indicator while redirect happens
  return (
    <div className="px-[2%] flex flex-col items-center justify-center py-12" data-oid="-gn6dmc">
      <div className="h-8 w-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4" data-oid="z.mueav"></div>
      <p className="text-slate-600 dark:text-slate-400" data-oid="xth9sgm">Redirecting to the appropriate view...</p>
    </div>);

}

// Simple loading fallback for Suspense
function LoadingFallback() {
  return (
    <div className="px-[2%] flex flex-col items-center justify-center py-12" data-oid="l-u2om:">
      <div className="h-8 w-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4" data-oid="d1a18vd"></div>
      <p className="text-slate-600 dark:text-slate-400" data-oid="xnmbs1.">Loading review page...</p>
    </div>);

}

/**
 * Main review page that redirects to the appropriate view page
 * Wrapped in Suspense to properly handle useSearchParams hook
 */
export default function ReviewIndexPage() {
  // Add console logging to help debug
  console.log('Review page loaded - redirecting based on view parameter');

  return (
    <Suspense fallback={<LoadingFallback data-oid="2w2qrxx" />} data-oid="l-:u_x:">
      <ReviewPageContent data-oid="g1_hs0e" />
    </Suspense>);

}