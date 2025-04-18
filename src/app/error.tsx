'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/Button';

export default function Error({
  error,
  reset



}: {error: Error & {digest?: string;};reset: () => void;}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8" data-oid="oj:qxu5">
      <div className="text-center" data-oid=":smqli0">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl" data-oid=".:-.yb-">
          Something went wrong!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300" data-oid="0.ewij7">
          We've encountered an unexpected error.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6" data-oid="-igwuyf">
          <Button onClick={reset} data-oid="m24yvov">Try again</Button>
          <Button href="/" variant="secondary" data-oid="btbu_:b">
            Go back home
          </Button>
        </div>
      </div>
    </div>);

}