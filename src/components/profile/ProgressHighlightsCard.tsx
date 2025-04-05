'use client'

import React from 'react'
// Removed Typography import
import { Heading } from '@/components/catalyst/heading' // Use Catalyst Heading
import { Text } from '@/components/catalyst/text' // Use Catalyst Text

interface SubjectMastery {
  subject: string
  level: number
  color: string // TODO: Refactor color to use semantic/palette names
}

interface ProgressHighlightsCardProps {
  questionsAnswered: number
  subjectMasteryLevels: SubjectMastery[]
}

export function ProgressHighlightsCard({
  questionsAnswered,
  subjectMasteryLevels,
}: ProgressHighlightsCardProps) {
  const overallMastery = Math.round(
    subjectMasteryLevels.reduce((sum, subject) => sum + subject.level, 0) /
      subjectMasteryLevels.length
  )

  // Calculate strokeDashoffset for SVG rings
  const circumference = 2 * Math.PI * 54 // 2 * pi * radius
  const getStrokeDashoffset = (level: number) => circumference * (1 - level / 100)

  // TODO: Define these rotations more systematically if possible
  const rotations = [-90, 30, 150] // Assuming 3 subjects: Reading, Writing, Math

  // Map subject names/colors to Tailwind color classes
  // TODO: Define this mapping more centrally if needed
  const subjectColorMapping: Record<string, string> = {
    '#3b82f6': 'bg-primary-500', // Blue -> Primary
    '#8b5cf6': 'bg-accent-500', // Purple -> Accent
    '#06b6d4': 'bg-cyan-500', // Cyan -> Keep cyan for now
  }
  const subjectStrokeMapping: Record<string, string> = {
    '#3b82f6': 'stroke-primary-500', // Blue -> Primary
    '#8b5cf6': 'stroke-accent-500', // Purple -> Accent
    '#06b6d4': 'stroke-cyan-500', // Cyan -> Keep cyan for now
  }


  return (
    // Use semantic colors
    <div className="bg-card text-card-foreground rounded-xl shadow-sm overflow-hidden border border-border">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          {/* Use Catalyst Heading */}
          <Heading level={2} className="text-lg font-semibold">Questions Answered</Heading>
          {/* Use Catalyst Text */}
          <Text className="text-lg font-semibold text-primary">
            {questionsAnswered}
          </Text>
        </div>

        <div className="flex items-center justify-center my-4">
          <div className="relative h-36 w-36">
            {/* Animated progress ring - each segment represents a subject */}
            <svg className="absolute inset-0" viewBox="0 0 120 120">
              {/* Use semantic border color for the background ring */}
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke="hsl(var(--border))" // Use CSS variable directly for stroke
                strokeWidth="12"
              />

              {subjectMasteryLevels.map((subject, index) => (
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
                  strokeLinecap="round"
                />
              ))}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div>
                {/* Use Catalyst Heading */}
                <Heading level={3} className="text-2xl font-bold text-foreground">
                  {overallMastery}%
                </Heading>
                {/* Use Catalyst Text */}
                <Text className="text-xs text-muted-foreground">Overall Mastery</Text>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {subjectMasteryLevels.map((subject) => (
            <div key={subject.subject} className="text-center">
              {/* Apply mapped background color class */}
              <div
                className={`w-3 h-3 rounded-full mx-auto mb-1 ${subjectColorMapping[subject.color] || 'bg-muted-foreground'}`}
              ></div>
              {/* Use Catalyst Text */}
              <Text className="text-xs font-medium text-muted-foreground block">{subject.subject}</Text>
              <Text className="text-sm font-semibold text-foreground block">{subject.level}%</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
