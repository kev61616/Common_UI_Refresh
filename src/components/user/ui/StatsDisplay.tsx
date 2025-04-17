"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatsItem {
  value: string | number;
  label: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

interface StatsDisplayProps {
  title: string;
  stats: StatsItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({
  title,
  stats,
  columns = 4,
  className = ''
}) => {
  // Helper function to determine grid columns based on screen size and stats count
  const getGridClass = () => {
    // For mobile, always use 2 columns if there are more than 2 stats
    const mobileClass = stats.length > 2 ? 'grid-cols-2' : 'grid-cols-1';
    
    // For tablets, use either 3 or 2 columns
    const tabletClass = columns > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2';
    
    // For desktop, use the specified number of columns
    const desktopClass = `lg:grid-cols-${columns}`;
    
    return `grid ${mobileClass} ${tabletClass} ${desktopClass} gap-4`;
  };

  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className={getGridClass()}>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-primary/10 hover:bg-primary/15 transition-colors rounded-lg p-4 text-center shadow-sm"
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            {stat.change && (
              <div className={`flex items-center justify-center mt-2 text-xs font-medium 
                ${stat.change.isPositive ? 'text-green-600' : 'text-red-600'}`}
              >
                {stat.change.isPositive ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                <span>{Math.abs(stat.change.value)}%</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StatsDisplay;
