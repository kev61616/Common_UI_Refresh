"use client";

import React from 'react';
import { motion } from 'framer-motion';

export interface ProgressMetricCardProps {
  current: number;
  previous?: number;
  change?: number; 
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
  enableAnimation?: boolean;
  comparisonPeriod?: string;
  showHistoricalTooltip?: boolean;
  title?: string;
  maxValue?: number;
  format?: (value: number) => string;
  onCardClick?: () => void;
  className?: string;
}

const ProgressMetricCard: React.FC<ProgressMetricCardProps> = ({
  current,
  previous,
  change,
  trend = change ? (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral') : 'neutral',
  color = 'var(--color-primary-500)',
  enableAnimation = true,
  comparisonPeriod = '1 month',
  showHistoricalTooltip = false,
  title,
  maxValue = 800,
  format = (value) => `${value}`,
  onCardClick,
  className = '',
}) => {
  // Calculate the change if not provided
  const calculatedChange = change ?? (previous !== undefined ? current - previous : undefined);
  
  // Change percentage (relative to previous value)
  const changePercentage = previous && calculatedChange 
    ? Math.round((calculatedChange / previous) * 100) 
    : undefined;
  
  // Determine color based on trend
  const trendColor = trend === 'up' 
    ? 'var(--color-success-500)' 
    : trend === 'down' 
      ? 'var(--color-error-500)' 
      : 'var(--color-muted)';
  
  // Determine arrow based on trend
  const trendArrow = trend === 'up' 
    ? '↑' 
    : trend === 'down' 
      ? '↓' 
      : '→';
  
  // Animation variants for the score counter
  const counterVariants = enableAnimation ? {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  } : {};

  // Progress percentage for the background indicator
  const progressPercentage = Math.min(100, Math.max(0, (current / maxValue) * 100));
  
  return (
    <div 
      className={`relative p-6 rounded-xl border border-border shadow-sm ${className}`}
      onClick={onCardClick}
      style={{
        cursor: onCardClick ? 'pointer' : 'default',
        overflow: 'hidden',
      }}
    >
      {/* Background progress indicator */}
      <div 
        className="absolute bottom-0 left-0 h-1.5"
        style={{
          width: `${progressPercentage}%`,
          backgroundColor: color,
          transition: 'width 1s ease-out',
        }}
      />
      
      {/* Title */}
      {title && (
        <h3 className="text-lg font-medium text-foreground mb-4">{title}</h3>
      )}
      
      <div className="flex items-center justify-center">
        {/* Main score */}
        <motion.div 
          className="text-6xl font-bold"
          style={{ color }}
          {...counterVariants}
        >
          {format(current)}
        </motion.div>
        
        {/* Change indicator */}
        {calculatedChange !== undefined && (
          <div className="ml-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <span style={{ color: trendColor }}>
                {trendArrow} {Math.abs(calculatedChange)} points
              </span>
              {changePercentage !== undefined && (
                <span className="ml-1" style={{ color: trendColor }}>
                  ({changePercentage > 0 ? '+' : ''}{changePercentage}%)
                </span>
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              since {comparisonPeriod}
            </div>
          </div>
        )}
      </div>
      
      {/* Historical tooltip */}
      {showHistoricalTooltip && previous !== undefined && (
        <div className="mt-4 pt-3 border-t border-border text-sm text-center text-muted-foreground">
          Previous: {format(previous)}
        </div>
      )}
    </div>
  );
};

export default ProgressMetricCard;
