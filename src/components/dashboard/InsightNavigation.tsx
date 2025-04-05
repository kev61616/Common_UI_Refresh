'use client'

import React from 'react';
// Removed Typography import
import { Text } from '@/components/catalyst/text'; // Use Catalyst Text
import { cn } from '@/lib/utils';
import { Zap, AlertTriangle, TrendingUp, PieChart, ClipboardList } from 'lucide-react'; // Use Lucide icons

// TODO: Define a proper Insight type, potentially in src/types
interface InsightStub {
    id: string;
    type: 'strength' | 'weakness' | 'trend' | 'opportunity' | 'pattern';
    title: string;
    subject: string;
    metric: string; // For color coding
}

interface InsightNavigationProps {
    insights: InsightStub[];
    currentSlide: number;
    onSlideChange: (index: number) => void;
}

// Removed getInsightIcon helper

// Keep metric color helper for now
const getMetricColorClass = (type: string, value: string): string => {
    if (value.startsWith('+')) {
      return type === 'weakness' || type === 'opportunity'
        ? 'text-warning-500 dark:text-warning-400' // Use warning
        : 'text-success-500 dark:text-success-400'; // Use success
    } else {
      return 'text-destructive'; // Use destructive
    }
}


export function InsightNavigation({ insights, currentSlide, onSlideChange }: InsightNavigationProps) {
  // Map insight types to Lucide icons
  const iconMap: Record<string, React.ElementType> = {
    strength: Zap,
    weakness: AlertTriangle,
    trend: TrendingUp,
    opportunity: PieChart,
    pattern: ClipboardList,
  };

  return (
    // Use semantic colors
    <div className="bg-card rounded-xl p-4 border border-border"> {/* Use p-4 */}
      <div className="text-sm font-medium text-foreground mb-3 flex justify-between items-center"> {/* Use mb-3 */}
        <Text>Other Insights</Text> {/* Use Text */}
        <Text className="text-xs text-muted-foreground">{currentSlide + 1}/{insights.length}</Text>
      </div>

      <div className="space-y-2"> {/* Use space-y-2 */}
        {insights.map((insight, idx) => {
          const isCurrent = idx === currentSlide;
          const metricColorClass = getMetricColorClass(insight.type, insight.metric);
          const IconComponent = iconMap[insight.type] || ClipboardList; // Fallback icon

          return (
            <button
              key={insight.id}
              onClick={() => onSlideChange(idx)}
              className={cn(
                `w-full text-left p-2.5 rounded-lg transition-all`, // Use p-2.5
                isCurrent
                  ? 'bg-primary/10 shadow-sm' // Use primary/10
                  : 'hover:bg-accent hover:text-accent-foreground' // Use accent
              )}
              aria-current={isCurrent ? 'true' : 'false'}
            >
              <div className="flex items-center">
                 {/* TODO: Use semantic bg/spacing */}
                <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center mr-3", // Use w-7, h-7, mr-3
                    isCurrent ? 'bg-primary/20' : 'bg-muted'
                 )}>
                  {/* Use Lucide icon component */}
                  <IconComponent className={`size-4 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5"> {/* Use mb-0.5 */}
                    {/* Use Catalyst Text */}
                    <Text className={cn("truncate pr-2 text-sm font-medium", isCurrent ? 'text-primary' : 'text-foreground')}> {/* Use pr-2 */}
                      {insight.title}
                    </Text>
                    {/* Use Catalyst Text */}
                    <Text className={`text-xs font-medium ${metricColorClass}`}>
                      {insight.metric}
                    </Text>
                  </div>
                  {/* Use Catalyst Text */}
                  <Text className={cn("text-xs truncate", isCurrent ? 'text-primary/80' : 'text-muted-foreground')}>
                    {insight.subject} • {insight.type}
                  </Text>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
