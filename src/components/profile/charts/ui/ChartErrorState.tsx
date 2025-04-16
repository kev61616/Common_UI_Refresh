"use client";

import React from 'react';

export interface ChartErrorStateProps {
  error?: Error | string;
  onRetry?: () => void;
  height?: number;
  className?: string;
  title?: string;
}

const ChartErrorState: React.FC<ChartErrorStateProps> = ({
  error,
  onRetry,
  height = 300,
  className = '',
  title = 'Unable to load chart data',
}) => {
  const errorMessage = typeof error === 'string' 
    ? error 
    : error?.message || 'An unexpected error occurred';

  return (
    <div 
      className={`flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-lg p-6 text-center ${className}`}
      style={{ height }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-red-500 dark:text-red-400 mb-4"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      
      <div className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
        {title}
      </div>
      
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-xs">
        {errorMessage}
      </div>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ChartErrorState;
