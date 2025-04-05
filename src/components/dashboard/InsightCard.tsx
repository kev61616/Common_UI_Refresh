'use client'

import React from 'react';
import { Heading } from '@/components/catalyst/heading'; // Use Catalyst Heading
import { Text } from '@/components/catalyst/text'; // Use Catalyst Text
import { Button } from '@/components/catalyst/button'; // Use Catalyst Button
import { Badge } from '@/components/catalyst/badge'; // Use Catalyst Badge
import { MicroChart } from './MicroChart'; // Corrected import path if needed, assuming it's in the same dir
import { Zap, AlertTriangle, TrendingUp, PieChart, ClipboardList, ArrowRight } from 'lucide-react'; // Use Lucide icons

// TODO: Define a proper Insight type, potentially in src/types
interface Insight {
    id: string;
    type: 'strength' | 'weakness' | 'trend' | 'opportunity' | 'pattern';
    title: string;
    description: string;
    metric: string;
    subject: string;
    trend: number[] | Array<{ label: string; value: number }>;
    actionLabel: string;
    actionLink: string;
}

interface InsightCardProps {
    insight: Insight;
    animatedValue: number; // The animated metric value
}

// Removed getInsightIcon helper
// Removed ActionIcon helper

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

export function InsightCard({ insight, animatedValue }: InsightCardProps) {
  const metricColorClass = getMetricColorClass(insight.type, insight.metric);
  // Map type to Lucide icon and color
  const iconMap: Record<string, { icon: React.ElementType, color: string }> = {
    strength: { icon: Zap, color: 'text-success-500' },
    weakness: { icon: AlertTriangle, color: 'text-warning-500' },
    trend: { icon: TrendingUp, color: 'text-primary' },
    opportunity: { icon: PieChart, color: 'text-sky-500' },
    pattern: { icon: ClipboardList, color: 'text-accent-500' },
  };
  const { icon: IconComponent, color: iconColorClass } = iconMap[insight.type] || iconMap.pattern; // Fallback

  return (
    // Use standard card styles
    <div className="md:col-span-2 bg-card rounded-xl p-4 relative overflow-hidden border border-border text-card-foreground">
      {/* Decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary-400/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-2"> {/* Use spacing scale mb-2 */}
          <div className="flex items-center">
            {/* Icon Wrapper */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
              <IconComponent className={`size-4 ${iconColorClass}`} />
            </div>
            {/* Use Catalyst Badge */}
            <Badge color="zinc" className="ml-1 text-xs"> {/* Adjust color as needed */}
              {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
            </Badge>
          </div>
          {/* Use Catalyst Text */}
          <Text className="text-xs text-muted-foreground">
            {insight.subject}
          </Text>
        </div>

        {/* Title and metric */}
        <div className="flex items-center justify-between mb-2"> {/* Use spacing scale mb-2 */}
          {/* Use Catalyst Heading */}
          <Heading level={3} className="text-lg font-semibold text-foreground">
            {insight.title}
          </Heading>
          {/* Use Catalyst Heading */}
          <Heading level={4} className={`text-2xl font-bold ${metricColorClass}`}>
            {insight.metric.startsWith('+') ? '+' : ''}
            {Math.round(animatedValue)}%
          </Heading>
        </div>

        {/* Description */}
        {/* Use Catalyst Text */}
        <Text className="text-sm text-muted-foreground mb-4"> {/* Use spacing scale mb-4 */}
          {insight.description}
        </Text>

        {/* Data visualization */}
        <div className="h-28 sm:h-36 md:h-48 mb-4"> {/* Use spacing scale h-28/36/48, mb-4 */}
          <MicroChart trendData={insight.trend} type={insight.type} />
        </div>

        {/* Action button - Use Catalyst Button, remove size prop, add text-sm class */}
        <Button href={insight.actionLink} color="dark/zinc" className="text-sm">
          {insight.actionLabel}
          <ArrowRight className="size-4 ml-2" /> {/* Use Lucide icon */}
        </Button>
      </div>
    </div>
  );
}
