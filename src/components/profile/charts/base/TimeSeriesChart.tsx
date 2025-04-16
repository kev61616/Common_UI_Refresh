"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { format } from 'date-fns';

export interface TimeSeriesMetric {
  id: string;
  label: string;
  color: string;
  visible?: boolean;
}

export interface Annotation {
  date: string;
  label: string;
  type: 'milestone' | 'event' | 'assessment';
  color?: string;
}

export interface TimeSeriesChartProps {
  data: any[];
  metrics: TimeSeriesMetric[];
  timeRange?: string;
  dateKey?: string;
  showDataPoints?: boolean;
  enableZoom?: boolean;
  height?: number;
  annotations?: Annotation[];
  onPointClick?: (point: any, metric: string) => void;
  colorScheme?: Record<string, string>;
  className?: string;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  metrics,
  dateKey = 'date',
  showDataPoints = true,
  height = 300,
  annotations = [],
  onPointClick,
  colorScheme = {},
  className = '',
}) => {
  // Filter to only visible metrics or all if none specified as visible
  const visibleMetrics = metrics.some(m => m.visible !== undefined)
    ? metrics.filter(m => m.visible)
    : metrics;

  const formatXAxis = (tickItem: string) => {
    try {
      const date = new Date(tickItem);
      return format(date, 'MMM d');
    } catch (e) {
      return tickItem;
    }
  };

  const handleClickPoint = (data: any, index: number, metric: string) => {
    if (onPointClick) {
      onPointClick(data, metric);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
          <XAxis 
            dataKey={dateKey} 
            tickFormatter={formatXAxis} 
            stroke="var(--color-muted)" 
            fontSize={12}
          />
          <YAxis stroke="var(--color-muted)" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              borderColor: "var(--color-border)",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            labelStyle={{
              color: "var(--color-foreground)",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
            formatter={(value, name) => {
              const metric = metrics.find(m => m.id === name);
              return [value, metric ? metric.label : name];
            }}
            labelFormatter={(label) => {
              try {
                const date = new Date(label);
                return format(date, 'MMMM d, yyyy');
              } catch (e) {
                return label;
              }
            }}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            formatter={(value) => {
              const metric = metrics.find(m => m.id === value);
              return metric ? metric.label : value;
            }}
          />
          
          {/* Render lines for each metric */}
          {visibleMetrics.map((metric) => (
            <Line
              key={metric.id}
              type="monotone"
              dataKey={metric.id}
              name={metric.id}
              stroke={metric.color || colorScheme[metric.id] || '#8884d8'}
              strokeWidth={2}
              dot={showDataPoints}
              activeDot={{ 
                r: 6, 
                onClick: (props: any) => handleClickPoint(props.payload, props.index, metric.id) 
              }}
              animationDuration={1000}
            />
          ))}

          {/* Render annotation lines */}
          {annotations.map((annotation, index) => (
            <ReferenceLine
              key={`annotation-${index}`}
              x={annotation.date}
              stroke={annotation.color || "#F59E0B"}
              strokeDasharray="3 3"
              label={{
                value: annotation.label,
                position: 'top',
                fill: annotation.color || "#F59E0B",
                fontSize: 12,
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
