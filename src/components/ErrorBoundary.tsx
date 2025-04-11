'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Custom ErrorBoundary component to catch and display errors in React components
 * This helps with debugging issues that aren't visible in production mode
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to the console
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-6 rounded-lg border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800" data-oid="i_re5-r">
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2" data-oid="0xq3bet">Something went wrong</h2>
          <details className="mt-4" data-oid="c0t:6nz">
            <summary className="text-sm font-medium cursor-pointer text-slate-700 dark:text-slate-300" data-oid="2-qslft">
              View error details
            </summary>
            <pre className="mt-2 p-4 bg-slate-800 text-white rounded overflow-x-auto text-xs" data-oid="yic3g0q">
              {this.state.error?.toString()}
              <br data-oid="vcwes4x" />
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
          {this.props.fallback ||
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => window.location.reload()} data-oid="sf94bmv">

              Try again
            </button>
          }
        </div>);

    }

    return this.props.children;
  }
}