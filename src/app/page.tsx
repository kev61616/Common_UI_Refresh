'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Root page component that redirects to the profile page by default
 * This implements the requirement to make the profile the default entry point
 */
export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to profile page on initial load
    router.push('/profile');
  }, [router]);
  
  // Return empty div while redirecting
  return <div className="h-screen w-screen flex items-center justify-center">
    <div className="animate-pulse text-lg text-gray-500">Redirecting to profile...</div>
  </div>;
}
