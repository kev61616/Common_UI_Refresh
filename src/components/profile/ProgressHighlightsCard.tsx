'use client';

import React from 'react';
import { Typography } from '@/components/ui/typography'; // Assuming Typography component exists

interface SubjectMastery {
  subject: string;
  level: number;
  color: string; // TODO: Refactor color to use semantic/palette names
}

interface ProgressHighlightsCardProps {
  questionsAnswered: number;
  subjectMasteryLevels: SubjectMastery[];
}

export function ProgressHighlightsCard({
  questionsAnswered,
  subjectMasteryLevels
}: ProgressHighlightsCardProps) {
  const overallMastery = Math.round(
    subjectMasteryLevels.reduce((sum, subject) => sum + subject.level, 0) /
    subjectMasteryLevels.length
  );

  // Calculate strokeDashoffset for SVG rings
  const circumference = 2 * Math.PI * 54; // 2 * pi * radius
  const getStrokeDashoffset = (level: number) => circumference * (1 - level / 100);

  // TODO: Define these rotations more systematically if possible
  const rotations = [-90, 30, 150]; // Assuming 3 subjects: Reading, Writing, Math

  // Map subject names/colors to Tailwind color classes
  // TODO: Define this mapping more centrally if needed
  const subjectColorMapping: Record<string, string> = {
    '#3b82f6': 'bg-primary-500', // Blue -> Primary
    '#8b5cf6': 'bg-accent-500', // Purple -> Accent
    '#06b6d4': 'bg-cyan-500' // Cyan -> Keep cyan for now
  };
  const subjectStrokeMapping: Record<string, string> = {
    '#3b82f6': 'stroke-primary-500', // Blue -> Primary
    '#8b5cf6': 'stroke-accent-500', // Purple -> Accent
    '#06b6d4': 'stroke-cyan-500' // Cyan -> Keep cyan for now
  };


  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border" data-oid="75lp84u">
      <div className="p-6" data-oid=":8hfa:y">
        <div className="flex justify-between items-center mb-4" data-oid="xbr36un">
          <Typography variant="h3" className="text-foreground" data-oid="hc86_e3">Questions Answered</Typography>
          {/* Use primary color */}
          <Typography variant="large" weight="semibold" className="text-primary" data-oid="br0bbsq">
            {questionsAnswered}
          </Typography>
        </div>

        <div className="flex items-center justify-center my-4" data-oid="kub5jmy">
          <div className="relative h-36 w-36" data-oid="g8889ub">
            {/* Animated progress ring - each segment represents a subject */}
            <svg className="absolute inset-0" viewBox="0 0 120 120" data-oid="blea4:g">
              {/* Use semantic border color for the background ring */}
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke="hsl(var(--border))" // Use CSS variable directly for stroke
                strokeWidth="12" data-oid="sq8x58e" />


              {subjectMasteryLevels.map((subject, index) =>
              <circle
                key={subject.subject}
                cx="60" cy="60" r="54"
                fill="none"
                // Apply mapped stroke color class
                className={`${subjectStrokeMapping[subject.color] || 'stroke-muted-foreground'} transition-all duration-1000 ease-out`}
                strokeWidth="12"
                strokeDasharray={circumference / subjectMasteryLevels.length} // Adjust dasharray based on number of subjects
                strokeDashoffset={getStrokeDashoffset(subject.level)}
                transform={`rotate(${rotations[index] || 0} 60 60)`} // Apply rotation
                strokeLinecap="round" data-oid="g5g1q.8" />

              )}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-center" data-oid="cwrbmhy">
              <div data-oid="5hj8bk.">
                {/* Use Typography */}
                <Typography variant="h4" weight="bold" className="text-foreground" data-oid="-ohnbw0"> {/* Use h4 (2xl) */}
                  {overallMastery}%
                </Typography>
                {/* Use span with direct classes */}
                <span className="text-xs text-muted-foreground" data-oid="pojnq9f">Overall Mastery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4" data-oid="hm_ck.7">
          {subjectMasteryLevels.map((subject) =>
          <div key={subject.subject} className="text-center" data-oid="r0_x921">
              {/* Apply mapped background color class */}
              <div
              className={`w-3 h-3 rounded-full mx-auto mb-1 ${subjectColorMapping[subject.color] || 'bg-muted-foreground'}`} data-oid="wpcsyi0">
            </div>
              {/* Use span with direct classes */}
              <span className="text-xs font-medium text-muted-foreground block" data-oid="nriuare">{subject.subject}</span>
              <span className="text-sm font-semibold text-foreground block" data-oid="2fipel9">{subject.level}%</span>
            </div>
          )}
        </div>
      </div>
    </div>);

}