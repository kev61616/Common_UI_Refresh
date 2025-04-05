'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { InsightCard } from './InsightCard';
import { InsightNavigation } from './InsightNavigation';
import { Typography } from '@/components/ui/typography'; // Import if needed

// TODO: Define proper Insight type and fetch real data
const insightsMock = [
  {
    id: 'insight1',
    type: 'strength' as const, // Add 'as const'
    title: 'Strong in Algebra',
    description: 'You consistently score above 90% in algebra topics.',
    metric: '+15%',
    subject: 'Math',
    trend: [80, 82, 85, 88, 92, 95],
    actionLabel: 'Challenge',
    actionLink: '/overview/math'
  },
  {
    id: 'insight2',
    type: 'weakness' as const, // Add 'as const'
    title: 'Inference Questions',
    description: 'Reading inference questions are 23% below your average.',
    metric: '-23%',
    subject: 'Reading',
    trend: [75, 70, 65, 62, 60, 52],
    actionLabel: 'Practice',
    actionLink: '/overview/reading'
  },
  {
    id: 'insight3',
    type: 'trend' as const, // Add 'as const'
    title: 'Writing Improvement',
    description: 'Writing scores have improved by 12% over the last month.',
    metric: '+12%',
    subject: 'Writing',
    trend: [60, 65, 68, 70, 70, 72],
    actionLabel: 'Continue',
    actionLink: '/overview/writing'
  },
  {
    id: 'insight4',
    type: 'opportunity' as const, // Add 'as const'
    title: 'Time Management',
    description: 'Spending 43% more time on reading passages than recommended.',
    metric: '+43%',
    subject: 'Reading',
    trend: [30, 35, 40, 38, 42, 43], // Assuming this represents time, not percentage
    actionLabel: 'Strategies',
    actionLink: '/course/materials'
  },
  {
    id: 'insight5',
    type: 'pattern' as const, // Add 'as const'
    title: 'Morning vs. Evening',
    description: 'You score 18% higher when practicing in the morning vs. evening.',
    metric: '+18%', // Difference, not absolute value
    subject: 'All',
    trend: [
      { label: 'Morning', value: 82 },
      { label: 'Afternoon', value: 75 },
      { label: 'Evening', value: 64 }
    ],
    actionLabel: 'Schedule',
    actionLink: '/course/schedule'
  }
];

interface PerformanceInsightsProps {
  // Props if needed, e.g., fetched insights data
}

export function PerformanceInsights({}: PerformanceInsightsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateIn, setAnimateIn] = useState(true); // State for transition effect
  const [animatedValue, setAnimatedValue] = useState(0); // State for metric animation

  // Memoize current insight based on the current slide index
  const currentInsight = useMemo(() => insightsMock[currentSlide], [currentSlide]);

  // Animate the metric value when the slide (and thus currentInsight) changes
  const animateMetric = useCallback(() => {
    // Extract numeric value, handling positive/negative signs and percentage
    const targetValue = parseInt(currentInsight.metric.replace(/[^0-9-]/g, '')) || 0;
    let currentValue = 0; // Start animation from 0 or previous value? Starting from 0.
    setAnimatedValue(currentValue); // Reset displayed value

    const duration = 800; // Animation duration in ms
    const frames = 30; // Number of animation frames
    const step = targetValue / frames; // Calculate increment per frame

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      currentValue += step;

      if (frame >= frames) {
        setAnimatedValue(targetValue); // Ensure final value is exact
        clearInterval(interval);
        return;
      }
      // Update state, ensuring we don't overshoot if step isn't exact
       setAnimatedValue(prev => {
           if (targetValue > 0) return Math.min(prev + step, targetValue);
           if (targetValue < 0) return Math.max(prev + step, targetValue);
           return 0;
       });

    }, duration / frames);

    return () => clearInterval(interval); // Cleanup interval on unmount or before next animation
  }, [currentInsight.metric]); // Rerun only when the metric of the current insight changes

  // Handle slide change with animation for the card fade/scale
  const changeSlide = useCallback((index: number) => {
    if (index === currentSlide) return; // Don't re-animate if clicking the current slide

    setAnimateIn(false); // Trigger fade-out/scale-out animation

    // Wait for fade-out transition before changing slide and fading in
    setTimeout(() => {
      setCurrentSlide(index);
      setAnimateIn(true); // Trigger fade-in/scale-in animation
      // Metric animation is handled by the useEffect below reacting to currentSlide change
    }, 150); // Match CSS transition duration (e.g., duration-150)
  }, [currentSlide]); // Dependency: currentSlide

  // Trigger metric animation whenever the currentSlide changes
  useEffect(() => {
    const cleanup = animateMetric();
    return cleanup;
  }, [currentSlide, animateMetric]); // Depend on currentSlide and the memoized animateMetric

  // TODO: Add auto-advance timer? (Optional)

  return (
    <div className="h-full flex flex-col">
      {/* Insights grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-grow"> {/* Use spacing scale gap-3 */}

        {/* Main insight card - Apply transition based on animateIn state */}
        {/* Wrap InsightCard in a div to apply transition */}
        <div className={`md:col-span-2 transition-all duration-150 ease-in-out ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {/* Render InsightCard only if currentInsight exists */}
          {currentInsight && (
            <InsightCard
              insight={currentInsight}
              animatedValue={animatedValue}
            />
          )}
        </div>

        {/* Insights navigation */}
        <InsightNavigation
          insights={insightsMock} // Pass the full list
          currentSlide={currentSlide}
          onSlideChange={changeSlide} // Pass the handler
        />
      </div>
    </div>
  );
}
