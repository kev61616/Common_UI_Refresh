'use client';

import React, { Suspense, useState, useEffect, ComponentType } from 'react';
import { PracticeSet } from '@/lib/mockData';
import { getSetViewComponent } from '../loaders/getSetViewComponent';
import { getViewMetadata } from '../registry/viewRegistry';

interface SetViewManagerProps {
  variant: number;
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
}

/**
 * SetViewManager - Dynamically loads and manages set view variants
 * 
 * This component replaces the monolithic switch statement approach with a more 
 * modular, code-split architecture that loads components on demand.
 */
export default function SetViewManager({
  variant,
  practiceSets,
  onSelectSet,
  selectedSetId
}: SetViewManagerProps) {
  // Track loading state
  const [isLoading, setIsLoading] = useState(true);

  // Get view metadata
  const metadata = getViewMetadata('set', variant);
  const viewName = metadata?.name || `Set View ${variant}`;

  // Get component via dynamic import - cast to ComponentType to allow use in JSX
  const ViewComponent = getSetViewComponent(variant) as ComponentType<any>;

  // Reset loading state when variant changes
  useEffect(() => {
    setIsLoading(true);
    // Add a small delay to ensure loading indicator shows, even for fast loads
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [variant]);

  // Common props to pass to all view variants
  const commonProps = {
    practiceSets,
    onSelectSet,
    selectedSetId
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm" data-oid="9:8mo31">
      <h3 className="text-xl font-bold mb-6 text-center" data-oid="mqq30xu">
        {variant}. {viewName}
      </h3>
      
      <Suspense fallback={<LoadingPlaceholder data-oid="44k9ym5" />} data-oid="6prde0w">
        {isLoading ?
        <LoadingPlaceholder data-oid="mmn9.xa" /> :

        <ErrorBoundary fallback={<ErrorPlaceholder variant={variant} category="set" data-oid="e8a-w73" />} data-oid="-42r.sr">
            <ViewComponent {...commonProps} data-oid="dlqzb_v" />
          </ErrorBoundary>
        }
      </Suspense>
    </div>);

}

/**
 * Loading placeholder shown while the view is being loaded
 */
function LoadingPlaceholder() {
  return (
    <div className="min-h-[500px] flex justify-center items-center bg-slate-50 dark:bg-slate-800/20 rounded-lg animate-pulse" data-oid="0ie8d0h">
      <div className="text-center" data-oid="lo5g:ka">
        <div className="inline-block w-12 h-12 border-4 border-slate-300 dark:border-slate-600 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin mb-4" data-oid="1i3xee8"></div>
        <p className="text-slate-500 dark:text-slate-400" data-oid="y497l7_">Loading view...</p>
      </div>
    </div>);

}

/**
 * Error placeholder shown if the view fails to load
 */
function ErrorPlaceholder({ variant, category }: {variant: number;category: string;}) {
  return (
    <div className="min-h-[500px] flex justify-center items-center bg-slate-50 dark:bg-slate-800/20 rounded-lg" data-oid="zeelt-t">
      <div className="text-center p-8 max-w-md" data-oid="2_9togr">
        <div className="mb-4 text-amber-600 dark:text-amber-400" data-oid="d.whdr4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="anwenl-">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-oid="6m0r7yh" />
          </svg>
        </div>
        <h4 className="text-lg font-medium mb-2" data-oid="w85s5k3">View Error</h4>
        <p className="text-slate-600 dark:text-slate-400 mb-4" data-oid="09oi.w.">
          There was an error loading this view. Please try a different one.
        </p>
        <div className="text-sm text-slate-500 dark:text-slate-500 p-2 bg-slate-100 dark:bg-slate-800 rounded-md" data-oid="7u9b:rt">
          Technical details: Failed to render {category} view variant #{variant}
        </div>
      </div>
    </div>);

}

/**
 * Simple error boundary component to catch rendering errors
 */
class ErrorBoundary extends React.Component<
  {children: React.ReactNode;fallback: React.ReactNode;},
  {hasError: boolean;}>
{
  constructor(props: {children: React.ReactNode;fallback: React.ReactNode;}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('View rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}