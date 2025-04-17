"use client";

import React from 'react';
import { CourseHeader } from '@/components/course';
import { CourseHeaderProps } from '@/components/course/CourseHeader';

interface CourseHeroSectionProps {
  course: CourseHeaderProps['course'];
  progress?: CourseHeaderProps['progress'];
  isEnrolled: boolean;
  onEnroll: () => void;
  onContinue: () => void;
}

export const CourseHeroSection: React.FC<CourseHeroSectionProps> = ({
  course,
  progress,
  isEnrolled,
  onEnroll,
  onContinue,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 py-12">
        <CourseHeader
          course={course}
          progress={progress}
          onEnroll={onEnroll}
          onContinue={onContinue}
          isEnrolled={isEnrolled}
        />
      </div>
    </div>
  );
};

export default CourseHeroSection;
