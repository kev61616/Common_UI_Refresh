'use client';

import React, { useState, useEffect, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Client-only component wrapper to prevent hydration issues with dnd-kit
 * This prevents the server from rendering components that rely on browser APIs
 * and avoids hydration mismatches with dynamically generated IDs
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return fallback on server, and during client-side hydration
  if (!isClient) {
    return <>{fallback}</>;
  }

  // After client-side hydration, render the actual components
  return <>{children}</>;
}
