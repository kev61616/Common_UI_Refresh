import { Suspense } from 'react';
import ClientPage from './client-page';

// Loading fallback for Suspense
function LoadingFallback() {
  return (
    <div className="px-[2%] flex flex-col items-center justify-center py-12" data-oid="25idodw">
      <div className="h-8 w-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mb-4" data-oid="lz5k8.3"></div>
      <p className="text-slate-600 dark:text-slate-400" data-oid="j-yh2an">Loading set view...</p>
    </div>);

}

// Main page component with proper Suspense boundary for useSearchParams
export default function BySetPage() {
  return (
    <Suspense fallback={<LoadingFallback data-oid="up504cz" />} data-oid="n2kt94.">
      <ClientPage data-oid="yot8t1v" />
    </Suspense>);

}