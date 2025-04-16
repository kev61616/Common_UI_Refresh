"use client";

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart
} from 'recharts';
import { format } from 'date-fns';

export interface ErrorCategory {
  id: string;
  label: string;
  color: string;
}

export interface ErrorDataPoint {
  date: string;
  totalWordCount: number;
  errorCounts: {
    [category: string]: number;
  };
  examples?: {
    category: string;
    errorText: string;
    correctedText: string;
  }[];
}

export interface ErrorReductionChartProps {
  data: ErrorDataPoint[];
  categories: ErrorCategory[];
  timeRange?: string;
  normalizeByWordCount?: boolean;
  showTrendlines?: boolean;
  enableTooltips?: boolean;
  height?: number;
  className?: string;
}

const DEFAULT_CATEGORIES: ErrorCategory[] = [
  { id: 'punctuation', label: 'Punctuation', color: '#F56565' },
  { id: 'grammar', label: 'Grammar', color: '#ED8936' },
  { id: 'spelling', label: 'Spelling', color: '#ECC94B' },
  { id: 'structure', label: 'Structure', color: '#48BB78' }
];

const ErrorReductionChart: React.FC<ErrorReductionChartProps> = ({
  data,
  categories = DEFAULT_CATEGORIES,
  timeRange,
  normalizeByWordCount = true,
  showTrendlines = true,
  enableTooltips = true,
  height = 300,
  className = '',
}) => {
  // Process data to calculate error rates if normalizing
  const processedData = normalizeByWordCount
    ? data.map(point => {
        const result: any = { date: point.date, totalWordCount: point.totalWordCount };
        
        // Calculate errors per 100 words for each category
        categories.forEach(category => {
          const errorCount = point.errorCounts[category.id] || 0;
          result[category.id] = +(errorCount / point.totalWordCount * 100).toFixed(2);
        });
        
        // Calculate total error rate
        const totalErrors = categories.reduce((sum, category) => 
          sum + (point.errorCounts[category.id] || 0), 0);
        result.total = +(totalErrors / point.totalWordCount * 100).toFixed(2);
        
        return result;
      })
    : data.map(point => {
        const result: any = { date: point.date, totalWordCount: point.totalWordCount };
        
        // Use raw error counts
        categories.forEach(category => {
          result[category.id] = point.errorCounts[category.id] || 0;
        });
        
        // Calculate total errors
        result.total = categories.reduce((sum, category) => 
          sum + (point.errorCounts[category.id] || 0), 0);
        
        return result;
      });

  // Helper function to format dates
  const formatXAxis = (tickItem: string) => {
    try {
      const date = new Date(tickItem);
      return format(date, 'MMM d');
    } catch (e) {
      return tickItem;
    }
  };

  // Custom tooltip formatter
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = format(date, 'MMMM d, yyyy');
      
      // Find original data point to get examples
      const originalPoint = data.find(p => p.date === label);
      const wordCount = originalPoint?.totalWordCount || 0;
      
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow-sm">
          <p className="font-medium text-sm">{formattedDate}</p>
          <p className="text-xs text-muted-foreground mb-2">Word Count: {wordCount}</p>
          <div className="space-y-1.5">
            {payload.map((entry: any, index: number) => {
              if (entry.dataKey === 'totalWordCount') return null;
              
              const category = categories.find(c => c.id === entry.dataKey) || 
                { label: entry.dataKey, color: entry.color };
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-xs">{category.label}</span>
                  </div>
                  <span className="text-xs font-medium">
                    {normalizeByWordCount 
                      ? `${entry.value.toFixed(2)} per 100 words`
                      : entry.value}
                  </span>
                </div>
              );
            })}
          </div>
          
          {originalPoint?.examples && originalPoint.examples.length > 0 && (
            <div className="mt-3 pt-2 border-t border-border">
              <p className="text-xs font-medium mb-1">Example:</p>
              <div className="text-xs">
                <p className="line-through text-red-500 dark:text-red-400">
                  {originalPoint.examples[0].errorText}
                </p>
                <p className="text-green-500 dark:text-green-400">
                  {originalPoint.examples[0].correctedText}
                </p>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={processedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis} 
            stroke="var(--color-muted)" 
            fontSize={12}
          />
          <YAxis 
            stroke="var(--color-muted)" 
            fontSize={12} 
            label={{ 
              value: normalizeByWordCount ? 'Errors per 100 words' : 'Error count',
              angle: -90,
              position: 'insideLeft', 
              style: { fill: 'var(--color-muted)', fontSize: 12 } 
            }}
          />
          {enableTooltips && <Tooltip content={customTooltip} />}
          <Legend />
          
          {/* Area charts for each error category */}
          {categories.map((category, index) => (
            <Area
              key={category.id}
              type="monotone"
              dataKey={category.id}
              stackId="1"
              name={category.label}
              stroke={category.color}
              fill={category.color}
              fillOpacity={0.5}
            />
          ))}
          
          {/* Trend line for total errors */}
          {showTrendlines && (
            <Line
              type="monotone"
              dataKey="total"
              name="Total Errors"
              stroke="var(--color-foreground)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ErrorReductionChart;
