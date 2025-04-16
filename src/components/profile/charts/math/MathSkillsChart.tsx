"use client";

import React from 'react';
import SkillBreakdownChart, { Skill } from '../base/SkillBreakdownChart';

export interface MathSkill {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  color?: string;
}

export interface MathSkillsChartProps {
  skills: MathSkill[];
  type?: 'bar' | 'radar';
  showPercentages?: boolean;
  enableComparison?: boolean;
  height?: number;
  onSkillSelect?: (skill: MathSkill) => void;
  className?: string;
}

const DEFAULT_MATH_SKILLS: MathSkill[] = [
  { id: 'algebra', name: 'Algebra', value: 82, color: '#06B6D4' },
  { id: 'geometry', name: 'Geometry', value: 70, color: '#0EA5E9' },
  { id: 'dataAnalysis', name: 'Data Analysis', value: 85, color: '#0284C7' }
];

const MathSkillsChart: React.FC<MathSkillsChartProps> = ({
  skills = DEFAULT_MATH_SKILLS,
  type = 'bar',
  showPercentages = true,
  enableComparison = false,
  height = 300,
  onSkillSelect,
  className = '',
}) => {
  // Map MathSkill to Skill for the base component
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
      const mathSkill = skills.find(s => s.id === skill.id);
      if (mathSkill) {
        onSkillSelect(mathSkill);
      }
    }
  };

  // Color scheme for consistent coloring
  const colorScheme = {
    algebra: '#06B6D4',      // Cyan
    geometry: '#0EA5E9',     // Light Blue
    dataAnalysis: '#0284C7'  // Blue
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

export default MathSkillsChart;
