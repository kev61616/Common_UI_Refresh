"use client";

import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
  RectangleProps,
  ReferenceLine
} from 'recharts';
import { format } from 'date-fns';

export interface ProblemDataPoint {
  problemId: string;
  domain: string; // 'algebra', 'geometry', etc.
  subdomain?: string;
  difficulty: number; // 1-5
  timeSpent: number; // seconds
  accuracy: number; // 0-100
  attemptDate: string; // ISO date
  correctAnswer: boolean;
  partialCredit?: number; // 0-100
}

export interface ProblemSolvingMatrixProps {
  data: ProblemDataPoint[];
  problemTypes: string[];
  difficultyCurve?: boolean;
  showTimeEfficiency?: boolean;
  quadrantView?: boolean;
  enableFiltering?: boolean;
  showTargetZones?: boolean;
  height?: number;
  className?: string;
  onPointClick?: (problem: ProblemDataPoint) => void;
}

// Custom shape for the scatter plot
const CustomShape = (props: any) => {
  const { cx, cy, fill, payload } = props;
  const size = 8 + (payload.difficulty * 4); // Size based on difficulty
  
  return (
    <Rectangle
      x={cx - size / 2}
      y={cy - size / 2}
      width={size}
      height={size}
      fill={fill}
      opacity={payload.correctAnswer ? 0.8 : 0.5}
      stroke={payload.correctAnswer ? fill : "#999"}
      strokeWidth={1}
      style={{ cursor: 'pointer' }}
    />
  );
};

const ProblemSolvingMatrix: React.FC<ProblemSolvingMatrixProps> = ({
  data,
  problemTypes,
  difficultyCurve = true,
  showTimeEfficiency = true,
  quadrantView = true,
  enableFiltering = true,
  showTargetZones = true,
  height = 400,
  className = '',
  onPointClick
}) => {
  // Domain-specific colors
  const domainColors: { [key: string]: string } = {
    algebra: '#06B6D4',
    geometry: '#0EA5E9',
    dataAnalysis: '#0284C7',
    numberSystems: '#2563EB',
    default: '#94A3B8'
  };
  
  // Process data to determine median time and accuracy
  const medianTime = calculateMedian(data.map(p => p.timeSpent));
  const medianAccuracy = calculateMedian(data.map(p => p.accuracy));
  
  // Custom tooltip
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const problem = payload[0].payload;
      const date = new Date(problem.attemptDate);
      const formattedDate = format(date, 'MMM d, yyyy');
      
      return (
        <div className="bg-card p-3 border border-border rounded-md shadow-sm">
          <p className="font-medium text-sm">{getProblemTypeName(problem.domain)}</p>
          {problem.subdomain && (
            <p className="text-xs text-muted-foreground mb-1">{problem.subdomain}</p>
          )}
          <div className="space-y-1 mt-2">
            <div className="flex justify-between">
              <span className="text-xs">Difficulty:</span>
              <span className="text-xs font-medium">{difficultyToText(problem.difficulty)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">Time spent:</span>
              <span className="text-xs font-medium">{formatTime(problem.timeSpent)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">Accuracy:</span>
              <span className="text-xs font-medium">{problem.accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">Result:</span>
              <span className={`text-xs font-medium ${problem.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                {problem.correctAnswer ? 'Correct' : 'Incorrect'}
              </span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2 pt-1 border-t border-border">
            {formattedDate}
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  // Generate quadrant labels
  const quadrantLabels = quadrantView ? [
    { x: medianTime * 0.5, y: medianAccuracy * 1.1, value: 'Fast & Accurate', fill: 'var(--color-success-500)' },
    { x: medianTime * 1.5, y: medianAccuracy * 1.1, value: 'Slow & Accurate', fill: 'var(--color-warning-500)' },
    { x: medianTime * 0.5, y: medianAccuracy * 0.3, value: 'Fast & Inaccurate', fill: 'var(--color-warning-500)' },
    { x: medianTime * 1.5, y: medianAccuracy * 0.3, value: 'Slow & Inaccurate', fill: 'var(--color-error-500)' }
  ] : [];
  
  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
          <XAxis 
            type="number" 
            dataKey="timeSpent" 
            name="Time" 
            unit="s" 
            domain={['dataMin', 'dataMax']} 
            label={{ 
              value: 'Time (seconds)', 
              position: 'bottom',
              style: { fill: 'var(--color-muted)', fontSize: 12 }
            }}
            tick={{ fill: 'var(--color-muted)', fontSize: 12 }}
          />
          <YAxis 
            type="number" 
            dataKey="accuracy" 
            name="Accuracy" 
            unit="%" 
            domain={[0, 100]} 
            label={{ 
              value: 'Accuracy (%)', 
              angle: -90, 
              position: 'left',
              style: { fill: 'var(--color-muted)', fontSize: 12 }
            }}
            tick={{ fill: 'var(--color-muted)', fontSize: 12 }}
          />
          <ZAxis 
            type="number" 
            dataKey="difficulty" 
            range={[60, 400]} 
            name="Difficulty" 
          />
          <Tooltip content={customTooltip} />
          <Legend />
          
          {/* Add reference lines for quadrants if enabled */}
          {quadrantView && (
            <>
              <ReferenceLine 
                x={medianTime} 
                stroke="var(--color-border)" 
                strokeDasharray="3 3"
                label={{ 
                  value: 'Median Time', 
                  position: 'top',
                  style: { fill: 'var(--color-muted)', fontSize: 10 }
                }}
              />
              <ReferenceLine 
                y={medianAccuracy} 
                stroke="var(--color-border)" 
                strokeDasharray="3 3"
                label={{ 
                  value: 'Median Accuracy', 
                  position: 'left',
                  style: { fill: 'var(--color-muted)', fontSize: 10 }
                }}
              />
              
              {/* Add quadrant labels */}
              {quadrantLabels.map((label, index) => (
                <text 
                  key={index}
                  x={label.x}
                  y={label.y}
                  textAnchor="middle"
                  fill={label.fill}
                  fontSize={10}
                  opacity={0.7}
                >
                  {label.value}
                </text>
              ))}
            </>
          )}
          
          {/* Plot points by problem type */}
          {problemTypes.map(type => (
            <Scatter
              key={type}
              name={getProblemTypeName(type)}
              data={data.filter(p => p.domain === type)}
              fill={domainColors[type] || domainColors.default}
              shape={<CustomShape />}
              onClick={(point: ProblemDataPoint) => onPointClick && onPointClick(point)}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

// Helper function to calculate median
function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const midIndex = Math.floor(sorted.length / 2);
  
  return sorted.length % 2 !== 0
    ? sorted[midIndex]
    : (sorted[midIndex - 1] + sorted[midIndex]) / 2;
}

// Helper function to format time in seconds
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  return `${minutes}m ${remainingSeconds}s`;
}

// Helper function to convert difficulty level to text
function difficultyToText(difficulty: number): string {
  const levels = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];
  return levels[Math.min(Math.floor(difficulty) - 1, 4)];
}

// Helper function to get readable problem type name
function getProblemTypeName(type: string): string {
  const names: { [key: string]: string } = {
    algebra: 'Algebra',
    geometry: 'Geometry',
    dataAnalysis: 'Data Analysis',
    numberSystems: 'Number Systems'
  };
  
  return names[type] || type;
}

export default ProblemSolvingMatrix;
