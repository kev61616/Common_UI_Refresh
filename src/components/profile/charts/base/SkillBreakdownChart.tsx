"use client";

import React from 'react';
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export interface Skill {
  id: string;
  name: string;
  value: number;
  color?: string;
  previousValue?: number;
}

export interface SkillBreakdownChartProps {
  skills: Skill[];
  type?: 'bar' | 'radar' | 'radial';
  colorScheme?: Record<string, string>;
  showPercentages?: boolean;
  enableComparison?: boolean;
  height?: number;
  interactive?: boolean;
  onSkillSelect?: (skill: Skill) => void;
  className?: string;
  maxValue?: number;
}

const SkillBreakdownChart: React.FC<SkillBreakdownChartProps> = ({
  skills,
  type = 'bar',
  colorScheme = {},
  showPercentages = true,
  enableComparison = false,
  height = 300,
  interactive = true,
  onSkillSelect,
  className = '',
  maxValue = 100
}) => {
  // Handle skill selection
  const handleSkillClick = (entry: any) => {
    if (interactive && onSkillSelect) {
      const skill = skills.find(s => s.id === entry.id || s.name === entry.name);
      if (skill) {
        onSkillSelect(skill);
      }
    }
  };

  // Tooltip formatter
  const tooltipFormatter = (value: number, name: string) => {
    if (name === 'value') return [`${value}${showPercentages ? '%' : ''}`, 'Current'];
    if (name === 'previousValue') return [`${value}${showPercentages ? '%' : ''}`, 'Previous'];
    return [value, name];
  };

  // Custom label formatter if showing percentages
  const labelFormatter = showPercentages 
    ? (value: number) => `${value}%` 
    : undefined;

  // Render appropriate chart based on type
  const renderChart = () => {
    switch (type) {
      case 'radar':
        return (
          <RadarChart outerRadius={90} data={skills}>
            <PolarGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <PolarAngleAxis 
              dataKey="name" 
              tick={{ fill: 'var(--color-foreground)', fontSize: 12 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, maxValue]} 
              tick={{ fill: 'var(--color-muted)', fontSize: 10 }}
            />
            <Radar
              name="Current"
              dataKey="value"
              stroke="var(--color-primary-500)"
              fill="var(--color-primary-500)"
              fillOpacity={0.6}
            />
            {enableComparison && (
              <Radar
                name="Previous"
                dataKey="previousValue"
                stroke="var(--color-muted)"
                fill="var(--color-muted)"
                fillOpacity={0.3}
                strokeDasharray="3 3"
              />
            )}
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
          </RadarChart>
        );
      
      case 'bar':
      default:
        return (
          <BarChart data={skills} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
            <XAxis 
              type="number" 
              domain={[0, maxValue]} 
              tick={{ fill: 'var(--color-muted)', fontSize: 12 }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fill: 'var(--color-foreground)', fontSize: 12 }}
              width={100}
            />
            <Tooltip 
              formatter={tooltipFormatter}
              contentStyle={{
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Bar
              dataKey="value"
              name="Current"
              fill="var(--color-primary-500)"
              barSize={20}
              onClick={handleSkillClick}
              label={showPercentages ? {
                position: 'right',
                formatter: labelFormatter,
                fill: 'var(--color-muted)',
                fontSize: 12
              } : undefined}
              animationDuration={1000}
            />
            {enableComparison && (
              <Bar
                dataKey="previousValue"
                name="Previous"
                fill="var(--color-muted)"
                barSize={20}
                opacity={0.6}
                animationDuration={1000}
              />
            )}
          </BarChart>
        );
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default SkillBreakdownChart;
