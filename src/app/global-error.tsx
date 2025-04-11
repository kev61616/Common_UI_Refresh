'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset



}: {error: Error & {digest?: string;};reset: () => void;}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html data-oid="h:ql6n.">
      <body data-oid=".bm17d2">
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-6 py-24 sm:py-32 lg:px-8" data-oid="z2x_9qh">
          <div className="text-center" data-oid="nz55ygy">
            <p className="text-base font-semibold text-sky-500" data-oid=":xjgbb4">500</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl" data-oid="8pik:.m">
              Critical Error
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300" data-oid="u8lavr0">
              Sorry, we encountered a critical error loading the application.
            </p>
            <div className="mt-10 flex items-center justify-center" data-oid="tzxjlq8">
              <button
                onClick={reset}
                className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500" data-oid="x1ediy_">

                Try again
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>);

}