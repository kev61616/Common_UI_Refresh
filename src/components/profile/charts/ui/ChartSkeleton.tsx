"use client";

import React from 'react';

export interface ChartSkeletonProps {
  type?: 'bar' | 'line' | 'radar' | 'timeline';
  height?: number;
  className?: string;
}

const ChartSkeleton: React.FC<ChartSkeletonProps> = ({
  type = 'line',
  height = 300,
  className = '',
}) => {
  return (
    <div 
      className={`animate-pulse bg-slate-100 dark:bg-slate-800 rounded-lg ${className}`} 
      style={{ height }}
    >
      {type === 'timeline' && (
        <div className="h-full flex flex-col justify-end p-4">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-1/3 mb-8" />
          <div className="flex items-end space-x-2">
            {/* Use fixed percentages for heights instead of random values */}
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '35%', width: '20px' }} />
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '60%', width: '20px' }} />
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '45%', width: '20px' }} />
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '70%', width: '20px' }} />
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '50%', width: '20px' }} />
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '80%', width: '20px' }} />
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '40%', width: '20px' }} />
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '65%', width: '20px' }} />
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '55%', width: '20px' }} />
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '75%', width: '20px' }} />
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '30%', width: '20px' }} />
            <div className="bg-slate-200 dark:bg-slate-700 rounded-t" style={{ height: '50%', width: '20px' }} />
          </div>
        </div>
      )}
      
      {type === 'bar' && (
        <div className="h-full flex flex-col justify-center p-4 space-y-4">
          {/* Use fixed percentages instead of random values to avoid hydration mismatches */}
          <div className="flex items-center space-x-4">
            <div className="bg-slate-200 dark:bg-slate-700 h-4 w-24 rounded-md" />
            <div className="bg-slate-200 dark:bg-slate-700 h-6 rounded-md" style={{ width: '45%' }} />
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-slate-200 dark:bg-slate-700 h-4 w-24 rounded-md" />
            <div className="bg-slate-200 dark:bg-slate-700 h-6 rounded-md" style={{ width: '70%' }} />
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-slate-200 dark:bg-slate-700 h-4 w-24 rounded-md" />
            <div className="bg-slate-200 dark:bg-slate-700 h-6 rounded-md" style={{ width: '35%' }} />
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-slate-200 dark:bg-slate-700 h-4 w-24 rounded-md" />
            <div className="bg-slate-200 dark:bg-slate-700 h-6 rounded-md" style={{ width: '60%' }} />
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-slate-200 dark:bg-slate-700 h-4 w-24 rounded-md" />
            <div className="bg-slate-200 dark:bg-slate-700 h-6 rounded-md" style={{ width: '50%' }} />
          </div>
        </div>
      )}
      
      {type === 'radar' && (
        <div className="h-full flex items-center justify-center p-4">
          <div className="bg-slate-200 dark:bg-slate-700 h-32 w-32 rounded-full opacity-40" />
          <div className="absolute">
            <div className="bg-slate-200 dark:bg-slate-700 h-40 w-40 rounded-full opacity-20" />
          </div>
          <div className="absolute">
            <div className="bg-slate-200 dark:bg-slate-700 h-48 w-48 rounded-full opacity-10" />
          </div>
        </div>
      )}
      
      {type === 'line' && (
        <div className="h-full flex flex-col justify-center p-4">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-1/4 mb-8" />
          <div 
            className="h-px bg-slate-200 dark:bg-slate-700" 
            style={{ 
              width: '100%',
              maskImage: 'linear-gradient(90deg, transparent, #000 20px, #000 calc(100% - 20px), transparent)',
              WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 20px, #000 calc(100% - 20px), transparent)',
            }}
          />
          <div 
            className="h-40 relative"
            style={{
              backgroundImage: `radial-gradient(circle at 10% 55%, var(--color-slate-200) 0.5px, transparent 0), 
                              radial-gradient(circle at 30% 65%, var(--color-slate-200) 0.5px, transparent 0),
                              radial-gradient(circle at 50% 45%, var(--color-slate-200) 0.5px, transparent 0),
                              radial-gradient(circle at 70% 60%, var(--color-slate-200) 0.5px, transparent 0),
                              radial-gradient(circle at 90% 40%, var(--color-slate-200) 0.5px, transparent 0)`,
              backgroundSize: '100% 100%',
            }}
          >
            <div 
              className="absolute top-0 bottom-0 left-0 right-0"
              style={{
                background: `linear-gradient(to right, 
                  var(--color-primary-200) 10%, 
                  var(--color-primary-300) 30%, 
                  var(--color-primary-400) 50%, 
                  var(--color-primary-300) 70%, 
                  var(--color-primary-200) 90%)`,
                opacity: 0.2,
                clipPath: 'polygon(0% 80%, 20% 60%, 40% 40%, 60% 60%, 80% 30%, 100% 50%, 100% 100%, 0% 100%)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartSkeleton;
