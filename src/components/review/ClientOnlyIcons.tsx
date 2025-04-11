'use client';

import { useState, useEffect } from 'react';

// Simple client-only wrapper component
export function ClientOnly({ children, fallback = null }: {children: React.ReactNode;fallback?: React.ReactNode;}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return fallback;
  }

  return <>{children}</>;
}

// Subject icon components without letter labels (per UX improvement request)
export function MathIcon() {
  return (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center" data-oid="i-.92h7">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} data-oid="2alggyh">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-oid="80j_9ij" />
      </svg>
    </div>);

}

export function ReadingIcon() {
  return (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center" data-oid="65d5t05">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-700 dark:text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} data-oid="yjn.60k">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" data-oid="7bhwaec" />
      </svg>
    </div>);

}

export function WritingIcon() {
  return (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center" data-oid="ggclsn5">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700 dark:text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} data-oid="wm5tnsy">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-oid=":7t:mjd" />
      </svg>
    </div>);

}

// Placeholder server icon (for initial render)
export function ServerPlaceholderIcon() {
  return (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center" data-oid="a2cz5ec">
      {/* Empty for hydration safety */}
    </div>);

}

// Type-specific client-only icons
export function SubjectIcon({ subject, id }: {subject: string;id: string;}) {
  // Simple hash function for deterministic icon selection
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Use a stable hash of the ID, not the actual subject
  const hash = hashCode(id);
  const hashMod3 = hash % 3; // 0, 1, or 2

  return (
    <ClientOnly fallback={<ServerPlaceholderIcon data-oid="7j63ufk" />} data-oid="50dau9v">
      {hashMod3 === 0 ? <MathIcon data-oid="5fg025f" /> : hashMod3 === 1 ? <ReadingIcon data-oid="s84wly7" /> : <WritingIcon data-oid=".:8liij" />}
    </ClientOnly>);

}