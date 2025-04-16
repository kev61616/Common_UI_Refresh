"use client";

import React from 'react';
import SkillBreakdownChart, { Skill } from '../base/SkillBreakdownChart';

export interface WritingSkill {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  color?: string;
}

export interface WritingSkillsRadarProps {
  skills: WritingSkill[];
  showPercentages?: boolean;
  enableComparison?: boolean;
  height?: number;
  onSkillSelect?: (skill: WritingSkill) => void;
  className?: string;
}

const DEFAULT_WRITING_SKILLS: WritingSkill[] = [
  { id: 'grammar', name: 'Grammar', value: 65, color: '#EC4899' },
  { id: 'clarity', name: 'Clarity', value: 70, color: '#8B5CF6' },
  { id: 'structure', name: 'Structure', value: 62, color: '#6366F1' }
];

const WritingSkillsRadar: React.FC<WritingSkillsRadarProps> = ({
  skills = DEFAULT_WRITING_SKILLS,
  showPercentages = true,
  enableComparison = false,
  height = 300,
  onSkillSelect,
  className = '',
}) => {
  // Map WritingSkill to Skill for the base component
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
      const writingSkill = skills.find(s => s.id === skill.id);
      if (writingSkill) {
        onSkillSelect(writingSkill);
      }
    }
  };

  // Color scheme for consistent coloring
  const colorScheme = {
    grammar: '#EC4899',  // Pink
    clarity: '#8B5CF6',  // Purple
    structure: '#6366F1', // Indigo
  };

  return (
    <SkillBreakdownChart
      skills={mappedSkills}
      type="radar"
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

export default WritingSkillsRadar;
