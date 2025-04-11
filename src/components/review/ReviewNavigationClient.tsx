'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Client component version of ReviewNavigation that can safely use hooks like useSearchParams
 */
export default function ReviewNavigationClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Safe to use in this client component

  // Function to determine if a path is active
  const isActive = (path: string) => {
    return pathname?.includes(path);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 sticky top-[calc(var(--navbar-height,4.75rem))] z-40 py-3 px-1" data-oid="e4de6lz">
      <div className="max-w-7xl mx-auto" data-oid="06k9:um">
        {/* Pill-shaped tabs for consistent design with filter pills */}
        <div className="flex flex-wrap gap-2 mb-1" data-oid=".811az9">
          <Link
            href="/review/set"
            className={`flex items-center text-xs px-3 py-1.5 font-medium transition-all duration-150 rounded-full border ${
            isActive('/review/set') ?
            'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:border-sky-800' :
            'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-700/80'}`
            } data-oid="niv-028">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="tcs2.xu">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" data-oid="nm57e53" />
            </svg>
            <span className="hidden sm:inline" data-oid="jca6-1-">Set View</span>
            <span className="sm:hidden" data-oid=":xphlra">Sets</span>
          </Link>
          
          <Link
            href="/review/question"
            className={`flex items-center text-xs px-3 py-1.5 font-medium transition-all duration-150 rounded-full border ${
            isActive('/review/question') ?
            'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-900/20 dark:text-sky-300 dark:border-sky-800' :
            'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-700/80'}`
            } data-oid="wog0dwb">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="7qfqjxf">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-oid="6lrrza3" />
            </svg>
            <span className="hidden sm:inline" data-oid="g.rj9h0">Question View</span>
            <span className="sm:hidden" data-oid="yuf-od4">Questions</span>
          </Link>
          
        </div>
      </div>
    </div>);

}