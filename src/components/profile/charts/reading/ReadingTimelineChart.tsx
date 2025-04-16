"use client";

import React, { useState } from 'react';
import TimeSeriesChart, { TimeSeriesMetric, Annotation } from '../base/TimeSeriesChart';

export interface ReadingTimelineChartProps {
  data: Array<{
    date: string;
    overall: number;
    vocabulary: number;
    comprehension: number;
    analysis: number;
    assessmentType?: string;
    milestone?: string;
  }>;
  visibleMetrics?: string[];
  timeRange?: string;
  showMovingAverage?: boolean;
  annotations?: Annotation[];
  colorScheme?: Record<string, string>;
  height?: number;
  onPointClick?: (point: any, metric: string) => void;
  className?: string;
}

const READING_METRICS: TimeSeriesMetric[] = [
  { id: 'overall', label: 'Overall Reading', color: '#4299E1' },
  { id: 'vocabulary', label: 'Vocabulary', color: '#9F7AEA' },
  { id: 'comprehension', label: 'Comprehension', color: '#38B2AC' },
  { id: 'analysis', label: 'Analysis', color: '#ED8936' }
];

const DEFAULT_COLOR_SCHEME = {
  overall: '#4299E1',
  vocabulary: '#9F7AEA',
  comprehension: '#38B2AC',
  analysis: '#ED8936'
};

const ReadingTimelineChart: React.FC<ReadingTimelineChartProps> = ({
  data,
  visibleMetrics = ['overall', 'vocabulary', 'comprehension', 'analysis'],
  timeRange,
  showMovingAverage = false,
  annotations = [],
  colorScheme = DEFAULT_COLOR_SCHEME,
  height = 300,
  onPointClick,
  className = '',
}) => {
  // Process data for moving average if needed
  const processedData = showMovingAverage 
    ? calculateMovingAverage(data, ['overall', 'vocabulary', 'comprehension', 'analysis'], 3)
    : data;
  
  // Generate annotations from milestones in data if not provided
  const combinedAnnotations = annotations.length > 0 
    ? annotations 
    : generateMilestoneAnnotations(data);
  
  // Determine which metrics are visible
  const metrics = READING_METRICS.map(metric => ({
    ...metric,
    visible: visibleMetrics.includes(metric.id),
    color: metric.id in colorScheme ? colorScheme[metric.id as keyof typeof colorScheme] : metric.color
  }));

  return (
    <TimeSeriesChart
      data={processedData}
      metrics={metrics}
      timeRange={timeRange}
      showDataPoints={true}
      enableZoom={true}
      height={height}
      annotations={combinedAnnotations}
      onPointClick={onPointClick}
      colorScheme={colorScheme}
      className={className}
    />
  );
};

// Helper function to calculate moving average
function calculateMovingAverage(
  data: any[], 
  fields: string[], 
  windowSize: number
) {
  if (data.length <= windowSize) return data;
  
  return data.map((item, index) => {
    const result = { ...item };
    
    fields.forEach(field => {
      if (index < windowSize - 1) {
        // Not enough previous data points for a complete window
        result[field] = item[field];
      } else {
        // Calculate average of current and previous n-1 points
        let sum = 0;
        for (let i = 0; i < windowSize; i++) {
          sum += data[index - i][field];
        }
        result[field] = Math.round(sum / windowSize);
      }
    });
    
    return result;
  });
}

// Helper function to generate annotations from milestones in data
function generateMilestoneAnnotations(data: any[]): Annotation[] {
  return data
    .filter(item => item.milestone)
    .map(item => ({
      date: item.date,
      label: item.milestone!,
      type: item.assessmentType === 'test' ? 'assessment' : 'milestone',
      color: item.assessmentType === 'test' ? '#F59E0B' : '#3B82F6'
    }));
}

export default ReadingTimelineChart;
