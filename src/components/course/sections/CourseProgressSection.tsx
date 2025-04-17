"use client";

import React from 'react';
import { CourseProgress } from '@/components/course';
import { CourseProgressProps } from '@/components/course/CourseProgress';

interface CourseProgressSectionProps {
  progress: CourseProgressProps['progress'];
}

export const CourseProgressSection: React.FC<CourseProgressSectionProps> = ({ progress }) => {
  return (
    <div className="mb-10 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Your Progress</h2>
      <CourseProgress progress={progress} />
      
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <svg className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {progress.estimatedTimeLeft ? (
          progress.estimatedTimeLeft > 60 ? (
            <span>Estimated time to complete: <span className="font-medium">{Math.round(progress.estimatedTimeLeft / 60)} hours</span> remaining</span>
          ) : (
            <span>Estimated time to complete: <span className="font-medium">{progress.estimatedTimeLeft} minutes</span> remaining</span>
          )
        ) : (
          <span>Continue your progress to see estimated completion time</span>
        )}
      </div>
    </div>
  );
};

export default CourseProgressSection;
