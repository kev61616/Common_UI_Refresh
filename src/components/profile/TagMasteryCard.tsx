'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '@/components/ui/typography'; // Assuming Typography component exists

interface TagMastery {
  tag: string;
  accuracy: number;
  trend: 'up' | 'down' | 'neutral';
}

interface TagMasteryCardProps {
  tags: TagMastery[];
}

// TODO: Consider moving these helpers to a utility file if used elsewhere
const getAccuracyColorClass = (accuracy: number): string => {
  if (accuracy >= 80) return 'text-success-600 dark:text-success-400';
  if (accuracy >= 60) return 'text-warning-600 dark:text-warning-400';
  return 'text-destructive'; // Use semantic destructive color
};

const getProgressBgClass = (accuracy: number): string => {
  if (accuracy >= 80) return 'bg-success-500';
  if (accuracy >= 60) return 'bg-warning-500';
  return 'bg-destructive'; // Use semantic destructive color
};

const TrendIcon = ({ trend }: {trend: 'up' | 'down' | 'neutral';}) => {
  switch (trend) {
    case 'up':
      return (
        // Use currentColor and semantic text color
        <svg className="w-4 h-4 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="8:-eiy3">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" data-oid="b_v1dg_" />
        </svg>);

    case 'down':
      return (
        // Use currentColor and semantic text color
        <svg className="w-4 h-4 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="74duzue">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" data-oid="5fdhtis" />
        </svg>);

    default:
      return (
        // Use currentColor and semantic text color
        <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-oid="0k8a_yq">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" data-oid="tkzwj8b" />
        </svg>);

  }
};


export function TagMasteryCard({ tags }: TagMasteryCardProps) {
  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border" data-oid="glcjbvq">
      <div className="p-6" data-oid="q8b2qtx">
        <div className="flex justify-between items-center mb-4" data-oid="8t6tf:g">
          <Typography variant="h3" className="text-foreground" data-oid="ulmmz7_">Tag Mastery Map</Typography>
          {/* Use primary text color for link */}
          <Link href="/profile/mastery" className="text-sm text-primary hover:underline" data-oid="dkpb2fx">
            View Full Map
          </Link>
        </div>

        {/* Tag mastery visual map */}
        <div className="space-y-4 mt-4" data-oid="m7yubdx">
          {tags.map((tag, index) =>
          <div key={index} data-oid="dugffbs">
              <div className="flex justify-between items-center mb-1" data-oid="7h.1wpd">
                <Typography variant="small" weight="medium" className="text-foreground" data-oid="dmqqo0j">{tag.tag}</Typography>
                <div className="flex items-center" data-oid="y02y13o">
                  <Typography variant="small" weight="semibold" className={`${getAccuracyColorClass(tag.accuracy)} mr-1`} data-oid="j13z2gt">
                    {tag.accuracy}%
                  </Typography>
                  <TrendIcon trend={tag.trend} data-oid="eu81fid" />
                </div>
              </div>
              {/* Use muted background */}
              <div className="h-2 bg-muted rounded-full overflow-hidden" data-oid="vhctb33">
                <div
                className={`h-full ${getProgressBgClass(tag.accuracy)} rounded-full`}
                style={{ width: `${tag.accuracy}%` }} data-oid="rmy8bbk">
              </div>
              </div>
            </div>
          )}
        </div>

        {/* Color legend */}
        <div className="flex justify-between mt-6 text-xs text-muted-foreground" data-oid="kpoy6n-">
          <div className="flex items-center" data-oid="6vk6pnt">
            <div className="w-3 h-3 bg-destructive rounded-full mr-1.5" data-oid="dglfx9j"></div> {/* Use semantic color */}
            <span className="text-xs text-muted-foreground" data-oid="y5_ofmv">Needs Work</span> {/* Use span */}
          </div>
          <div className="flex items-center" data-oid="ijab536">
            <div className="w-3 h-3 bg-warning-500 rounded-full mr-1.5" data-oid="mfq9eeb"></div> {/* Use palette color */}
            <span className="text-xs text-muted-foreground" data-oid="se8eekj">Improving</span> {/* Use span */}
          </div>
          <div className="flex items-center" data-oid=":h3v33j">
            <div className="w-3 h-3 bg-success-500 rounded-full mr-1.5" data-oid="t4c.xys"></div> {/* Use palette color */}
            <span className="text-xs text-muted-foreground" data-oid="gv48iml">Mastered</span> {/* Use span */}
          </div>
        </div>
      </div>
    </div>);

}