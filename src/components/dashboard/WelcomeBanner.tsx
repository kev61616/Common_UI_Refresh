'use client'

import React, { useState, useEffect, useMemo } from 'react';
// Removed Typography import
import { Heading } from '@/components/catalyst/heading'; // Use Catalyst Heading
import { Text } from '@/components/catalyst/text'; // Use Catalyst Text
import { Badge } from '@/components/catalyst/badge'; // Use Catalyst Badge
import { Link } from '@/components/catalyst/link'; // Use Catalyst Link

// Mock stats passed as props or fetched within
interface WelcomeBannerStats {
  practiceSets: number;
  questions: number;
  studyHours: number;
  // Add overallProgress if needed for the circle
}

interface WelcomeBannerProps {
  stats: WelcomeBannerStats;
  daysLeft: number;
  // testDate: Date; // Pass if needed for other calculations
}

export function WelcomeBanner({ stats, daysLeft }: WelcomeBannerProps) {
  const [animatedCount, setAnimatedCount] = useState({ sets: 0, questions: 0, hours: 0 });

  // Animate count up effect for stats
  useEffect(() => {
    const duration = 1500; // Shorter duration
    const steps = 30;
    const increment = {
      sets: Math.ceil(stats.practiceSets / steps),
      questions: Math.ceil(stats.questions / steps),
      hours: Math.ceil(stats.studyHours / steps)
    };

    let step = 0;
    const interval = setInterval(() => {
      if (step >= steps) {
        setAnimatedCount({
          sets: stats.practiceSets,
          questions: stats.questions,
          hours: stats.studyHours
        });
        clearInterval(interval);
        return;
      }

      setAnimatedCount(prev => ({
        sets: Math.min(prev.sets + increment.sets, stats.practiceSets),
        questions: Math.min(prev.questions + increment.questions, stats.questions),
        hours: Math.min(prev.hours + increment.hours, stats.studyHours)
      }));

      step++;
    }, duration / steps);

    return () => clearInterval(interval);
  }, [stats]); // Rerun if stats change

  return (
    // Use semantic colors and spacing scale
    <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm mb-6 overflow-hidden"> {/* Use spacing scale: mb-6 */}
      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between"> {/* Use spacing scale: px-6, py-4 */}
        <Heading level={3} className="text-xl font-semibold dark:text-white">Welcome back, Student!</Heading> {/* Use Heading */}
        {/* Use Catalyst Badge */}
        <Badge color="blue">{daysLeft} days until exam</Badge> {/* Adjust color as needed */}
      </div>

      {/* Content */}
      <div className="p-6"> {/* Use spacing scale: p-6 */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6"> {/* Use spacing scale: gap-6 */}
          <div className="flex-1">
             {/* Removed placeholder text */}
          </div>

          {/* Progress Circle */}
          <div className="flex-shrink-0 flex flex-col items-center">
            {/* TODO: Make progress dynamic */}
            <div className="relative w-24 h-24 md:w-32 md:h-32"> {/* Keep specific w/h */}
              <svg className="w-full h-full" viewBox="0 0 120 120">
                {/* Background circle */}
                <circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  stroke="hsl(var(--border))" // Use border color
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  stroke="hsl(var(--primary))" // Use primary color
                  strokeWidth="8"
                  strokeDasharray="339.3"
                  strokeDashoffset={339.3 * (1 - 0.65)} // 65% complete - TODO: Make dynamic
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 {/* Use Catalyst Text */}
                <Text className="text-2xl font-bold text-primary">65%</Text> {/* Use text-primary */}
                <Text className="text-xs text-muted-foreground">Ready</Text> {/* Use text-muted-foreground */}
              </div>
            </div>
            {/* Use Catalyst Link */}
            <Link href="/test/prep" className="mt-2 text-xs font-medium">
              View Test Plan
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6"> {/* Use spacing scale mt-6, pt-6, gap-4 */}
          <div className="flex flex-col items-center">
             {/* Use Catalyst Text */}
            <Text className="text-3xl font-bold text-foreground">{animatedCount.sets}</Text>
            <Text className="text-sm text-muted-foreground">Practice Sets</Text>
          </div>

          <div className="flex flex-col items-center">
             {/* Use Catalyst Text */}
            <Text className="text-3xl font-bold text-foreground">{animatedCount.questions}</Text>
            <Text className="text-sm text-muted-foreground">Questions</Text>
          </div>

          <div className="flex flex-col items-center">
             {/* Use Catalyst Text */}
            <Text className="text-3xl font-bold text-foreground">{animatedCount.hours}</Text>
            <Text className="text-sm text-muted-foreground">Study Hours</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
