'use client';

import React, { useEffect, useState } from 'react';

/**
 * Utility hook to safely handle hydration by only rendering on the client
 * This prevents hydration mismatches between server and client rendering
 */
export function useClientOnly<T>(initialValue: T): [T, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return [value, isClient];
}

/**
 * Utility hook for theme-related functionality
 * Ensures theme is consistent between server and client
 */
export function useTheme() {
  // Start with a safe default on server
  const [theme, setTheme] = useState('blue');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only run theme detection on client
    setIsClient(true);

    // Get theme from localStorage (example)
    const savedTheme = localStorage.getItem('theme') || 'blue';
    setTheme(savedTheme);

    // Listen for theme changes
    const handleStorage = () => {
      const updatedTheme = localStorage.getItem('theme') || 'blue';
      setTheme(updatedTheme);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Function to change theme
  const setAppTheme = (newTheme: string) => {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    // Dispatch storage event so other components can react
    window.dispatchEvent(new StorageEvent('storage'));
  };

  return { theme, setTheme: setAppTheme, isClient };
}

/**
 * Component to safely render different content on server vs client
 * Prevents hydration mismatches
 */
export function ClientOnly({
  children,
  fallback = null



}: {children: React.ReactNode;fallback?: React.ReactNode;}): React.ReactElement {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Component that adds suppressHydrationWarning to children
 * Use this for content that may differ between server and client
 * but doesn't affect functionality
 */
export function SuppressHydrationWarning({
  children


}: {children: React.ReactNode;}): React.ReactElement {
  return (
    <div suppressHydrationWarning>
      {children}
    </div>);

}

/**
 * Theme provider component to ensure consistent theme across
 * the application and prevent hydration mismatches
 */
export function ThemeProvider({
  children,
  defaultTheme = 'blue'



}: {children: React.ReactNode;defaultTheme?: string;}): React.ReactElement {
  const [theme, setTheme] = useState(defaultTheme);
  const [isClient, setIsClient] = useState(false);

  // Get theme only on client side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem('theme') || defaultTheme;
    setTheme(savedTheme);

    // Apply theme to document
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, [defaultTheme]);

  // Change theme function
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Create context value
  const themeContextValue = {
    theme,
    setTheme: changeTheme,
    isClient
  };

  return (
    <div className={`theme-${isClient ? theme : defaultTheme}`}>
      {children}
    </div>);

}

/**
 * Function to safely get a theme class name with hydration safety
 * Use this when you need to render different styles based on theme
 * but need to ensure consistent rendering between server and client
 */
export function getThemeClass(
baseClass: string,
serverTheme: string = 'blue')
: string {
  // When running on server or during initial client render, use default
  if (typeof window === 'undefined') {
    return `${baseClass} theme-${serverTheme}`;
  }

  // On client after hydration, use actual theme
  const clientTheme = localStorage.getItem('theme') || serverTheme;
  return `${baseClass} theme-${clientTheme}`;
}