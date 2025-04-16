"use client";

import React from 'react';
import SkillBreakdownChart, { Skill } from '../base/SkillBreakdownChart';

export interface ReadingSkill {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  color?: string;
}

export interface ReadingSkillsChartProps {
  skills: ReadingSkill[];
  type?: 'bar' | 'radar';
  showPercentages?: boolean;
  enableComparison?: boolean;
  height?: number;
  onSkillSelect?: (skill: ReadingSkill) => void;
  className?: string;
}

const DEFAULT_READING_SKILLS: ReadingSkill[] = [
  { id: 'vocabulary', name: 'Vocabulary', value: 75, color: '#3B82F6' },
  { id: 'comprehension', name: 'Comprehension', value: 68, color: '#8B5CF6' },
  { id: 'analysis', name: 'Analysis', value: 82, color: '#10B981' }
];

const ReadingSkillsChart: React.FC<ReadingSkillsChartProps> = ({
  skills = DEFAULT_READING_SKILLS,
  type = 'bar',
  showPercentages = true,
  enableComparison = false,
  height = 300,
  onSkillSelect,
  className = '',
}) => {
  // Map ReadingSkill to Skill for the base component
  const mappedSkills: Skill[] = skills.map(skill => ({
    id: skill.id,
    name: skill.name,
    value: skill.value,
    previousValue: skill.previousValue,
    color: skill.color
  }));

  // Handler for skill selection
  const handleSkillSelect = (skill: Skill) => {
    if (onSkillSelect) {
      const readingSkill = skills.find(s => s.id === skill.id);
      if (readingSkill) {
        onSkillSelect(readingSkill);
      }
    }
  };

  // Color scheme for consistent coloring
  const colorScheme = {
    vocabulary: '#3B82F6',  // Blue
    comprehension: '#8B5CF6', // Purple
    analysis: '#10B981'  // Green
  };

  return (
    <SkillBreakdownChart
      skills={mappedSkills}
      type={type}
      colorScheme={colorScheme}
      showPercentages={showPercentages}
      enableComparison={enableComparison}
      height={height}
      interactive={!!onSkillSelect}
      onSkillSelect={handleSkillSelect}
      className={className}
      maxValue={100}
    />
  );
};

export default ReadingSkillsChart;
