"use client";

import React, { useState, useEffect } from 'react';
import WritingSkillsRadar from '../charts/writing/WritingSkillsRadar';
import ErrorReductionChart from '../charts/writing/ErrorReductionChart';
import ProgressMetricCard from '../charts/base/ProgressMetricCard';
import ChartSkeleton from '../charts/ui/ChartSkeleton';
import ChartErrorState from '../charts/ui/ChartErrorState';
import { ErrorCategory, ErrorDataPoint } from '../charts/writing/ErrorReductionChart';

interface WritingData {
  score: {
    current: number;
    previous: number;
    change: number;
  };
  skills: {
    id: string;
    name: string;
    value: number;
    previousValue?: number;
  }[];
  errorData: ErrorDataPoint[];
}

export interface WritingChartsContainerProps {
  studentId: string;
  className?: string;
}

// This data would typically come from an API
const MOCK_WRITING_DATA: WritingData = {
  score: {
    current: 350,
    previous: 335,
    change: 15
  },
  skills: [
    { id: 'grammar', name: 'Grammar', value: 65, previousValue: 60 },
    { id: 'clarity', name: 'Clarity', value: 70, previousValue: 65 },
    { id: 'structure', name: 'Structure', value: 62, previousValue: 58 }
  ],
  errorData: Array.from({ length: 8 }).map((_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 7 + i);
    
    // Create some realistic-looking data with a downward trend in errors
    const wordCount = 450 + Math.floor(Math.random() * 150);
    const baseErrorRate = Math.max(0.05, 0.15 - (i * 0.015)); // Decreasing error rate
    
    // Example errors
    const examples = i === 7 ? [
      {
        category: 'punctuation',
        errorText: 'The student said, he would finish the assignment',
        correctedText: 'The student said, "he would finish the assignment."'
      }
    ] : i === 3 ? [
      {
        category: 'grammar',
        errorText: 'They was going to the store',
        correctedText: 'They were going to the store'
      }
    ] : undefined;
    
    return {
      date: date.toISOString().split('T')[0],
      totalWordCount: wordCount,
      errorCounts: {
        punctuation: Math.floor(wordCount * baseErrorRate * 0.3),
        grammar: Math.floor(wordCount * baseErrorRate * 0.4),
        spelling: Math.floor(wordCount * baseErrorRate * 0.2),
        structure: Math.floor(wordCount * baseErrorRate * 0.1)
      },
      examples
    };
  })
};

const ERROR_CATEGORIES: ErrorCategory[] = [
  { id: 'punctuation', label: 'Punctuation', color: '#F56565' },
  { id: 'grammar', label: 'Grammar', color: '#ED8936' },
  { id: 'spelling', label: 'Spelling', color: '#ECC94B' },
  { id: 'structure', label: 'Structure', color: '#48BB78' }
];

const WritingChartsContainer: React.FC<WritingChartsContainerProps> = ({
  studentId,
  className = ''
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<WritingData | null>(null);
  const [normalizeErrors, setNormalizeErrors] = useState(true);
  const [showTrendlines, setShowTrendlines] = useState(true);

  useEffect(() => {
    // This would be an API call in a real implementation
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data for now
        setData(MOCK_WRITING_DATA);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch writing data'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [studentId]);

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton type="radar" height={240} />
          <ChartSkeleton type="line" height={240} />
          <ChartSkeleton type="bar" height={300} className="lg:col-span-2" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <ChartErrorState 
        error={error || 'No data available'} 
        onRetry={() => window.location.reload()}
        className={className}
      />
    );
  }

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Writing Score Card */}
        <ProgressMetricCard 
          current={data.score.current}
          previous={data.score.previous}
          change={data.score.change}
          trend={data.score.change >= 0 ? 'up' : 'down'}
          color="var(--color-accent-500)" // Use accent (purple) for writing
          enableAnimation={true}
          comparisonPeriod="last month"
          title="Current Writing Score"
          maxValue={400}
        />
        
        {/* Writing Skills Radar */}
        <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Writing Skills</h3>
          <WritingSkillsRadar 
            skills={data.skills}
            showPercentages={true}
            enableComparison={true}
            height={240}
          />
        </div>
        
        {/* Error Reduction Chart */}
        <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-foreground mb-4">Error Reduction</h3>
          <ErrorReductionChart 
            data={data.errorData}
            categories={ERROR_CATEGORIES}
            normalizeByWordCount={normalizeErrors}
            showTrendlines={showTrendlines}
            height={280}
          />
          <div className="mt-4 flex justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setNormalizeErrors(!normalizeErrors)}
                className={`px-3 py-1 text-sm rounded-md ${
                  normalizeErrors
                    ? 'bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-100'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                Errors per 100 words
              </button>
              <button
                onClick={() => setShowTrendlines(!showTrendlines)}
                className={`px-3 py-1 text-sm rounded-md ${
                  showTrendlines
                    ? 'bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-100'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                Show Trendline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingChartsContainer;
