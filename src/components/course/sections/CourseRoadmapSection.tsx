"use client";

import React from 'react';
import { CourseRoadmap } from '@/components/course';
import { Module } from '@/types/course';

interface CourseRoadmapSectionProps {
  modules: Module[];
  currentModuleId?: string;
  completedModules?: string[];
}

export const CourseRoadmapSection: React.FC<CourseRoadmapSectionProps> = ({
  modules,
  currentModuleId,
  completedModules = []
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <CourseRoadmap 
        modules={modules}
        currentModuleId={currentModuleId}
        completedModules={completedModules}
      />
    </div>
  );
};

export default CourseRoadmapSection;
