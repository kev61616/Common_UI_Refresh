"use client";

import React, { useState, useEffect } from 'react';
import ReadingTimelineChart from '../charts/reading/ReadingTimelineChart';
import ReadingSkillsChart from '../charts/reading/ReadingSkillsChart';
import ProgressMetricCard from '../charts/base/ProgressMetricCard';
import ChartSkeleton from '../charts/ui/ChartSkeleton';
import ChartErrorState from '../charts/ui/ChartErrorState';

interface ReadingData {
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
  timeline: {
    date: string;
    overall: number;
    vocabulary: number;
    comprehension: number;
    analysis: number;
    assessmentType?: string;
    milestone?: string;
  }[];
}

export interface ReadingChartsContainerProps {
  studentId: string;
  className?: string;
}

// This data would typically come from an API
const MOCK_READING_DATA: ReadingData = {
  score: {
    current: 720,
    previous: 700,
    change: 20
  },
  skills: [
    { id: 'vocabulary', name: 'Vocabulary', value: 75, previousValue: 70 },
    { id: 'comprehension', name: 'Comprehension', value: 68, previousValue: 65 },
    { id: 'analysis', name: 'Analysis', value: 82, previousValue: 75 }
  ],
  timeline: Array.from({ length: 12 }).map((_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 11 + i);
    
    // Create some realistic-looking data with an upward trend and some variation
    const baseScore = 640 + i * 8;
    const randomVariation = () => Math.floor(Math.random() * 15) - 7;
    
    return {
      date: date.toISOString().split('T')[0],
      overall: baseScore + randomVariation(),
      vocabulary: Math.min(100, Math.floor(65 + (i * 1.2) + randomVariation())),
      comprehension: Math.min(100, Math.floor(60 + (i * 0.8) + randomVariation())),
      analysis: Math.min(100, Math.floor(55 + (i * 2) + randomVariation())),
      milestone: i === 3 ? 'Reading Assessment' : 
                i === 7 ? 'Mid-Year Review' : 
                i === 11 ? 'Year-End Evaluation' : undefined,
      assessmentType: i === 3 || i === 7 || i === 11 ? 'test' : undefined
    };
  })
};

const ReadingChartsContainer: React.FC<ReadingChartsContainerProps> = ({
  studentId,
  className = ''
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ReadingData | null>(null);
  const [timeRange, setTimeRange] = useState<string>('6m');
  const [visibleMetrics, setVisibleMetrics] = useState<string[]>(['overall', 'vocabulary']);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    // This would be an API call in a real implementation
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data for now
        setData(MOCK_READING_DATA);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch reading data'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [studentId]);

  // Handle time range change
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  // Handle metric visibility toggle
  const handleMetricToggle = (metric: string) => {
    setVisibleMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric) 
        : [...prev, metric]
    );
  };

  // Handle skill selection
  const handleSkillSelect = (skillId: string) => {
    setSelectedSkill(prev => prev === skillId ? null : skillId);
    
    // If selecting a skill, make sure its metric is visible in the timeline
    if (!visibleMetrics.includes(skillId)) {
      setVisibleMetrics(prev => [...prev, skillId]);
    }
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton type="line" height={240} />
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
        {/* Reading Score Card */}
        <ProgressMetricCard 
          current={data.score.current}
          previous={data.score.previous}
          change={data.score.change}
          trend={data.score.change >= 0 ? 'up' : 'down'}
          color="var(--color-primary-500)"
          enableAnimation={true}
          comparisonPeriod="last month"
          title="Current Reading Score"
          maxValue={800}
        />
        
        {/* Reading Progress Chart */}
        <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Reading Progress</h3>
          <ReadingTimelineChart 
            data={data.timeline}
            visibleMetrics={visibleMetrics}
            timeRange={timeRange}
            showMovingAverage={true}
            height={200}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {['1m', '3m', '6m', '1y', 'all'].map(range => (
              <button
                key={range}
                onClick={() => handleTimeRangeChange(range)}
                className={`px-2 py-1 text-xs rounded-md ${
                  timeRange === range
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {range === '1m' ? '1 Month' : 
                 range === '3m' ? '3 Months' : 
                 range === '6m' ? '6 Months' : 
                 range === '1y' ? '1 Year' : 'All Time'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Reading Skills Chart */}
        <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-foreground mb-4">Skills Breakdown</h3>
          <ReadingSkillsChart 
            skills={data.skills}
            type="bar"
            showPercentages={true}
            enableComparison={true}
            height={240}
            onSkillSelect={(skill) => handleSkillSelect(skill.id)}
          />
          <div className="mt-4 flex justify-between">
            <div className="flex flex-wrap gap-2">
              {['vocabulary', 'comprehension', 'analysis'].map((metricId) => (
                <button
                  key={metricId}
                  onClick={() => handleMetricToggle(metricId)}
                  className={`px-3 py-1 text-sm rounded-md flex items-center ${
                    visibleMetrics.includes(metricId)
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full mr-2 ${metricId === 'vocabulary' ? 'bg-blue-500' : metricId === 'comprehension' ? 'bg-purple-500' : 'bg-green-500'}`}></span>
                  {metricId.charAt(0).toUpperCase() + metricId.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={() => setVisibleMetrics(['overall', 'vocabulary', 'comprehension', 'analysis'])}
              className="px-3 py-1 text-sm rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              Show All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingChartsContainer;
