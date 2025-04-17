"use client";

import React from 'react';
import { ModuleAccordion } from '@/components/course';
import { Module } from '@/types/course';

interface CourseContentSectionProps {
  modules: Module[];
  currentLessonId?: string;
  isEnrolled: boolean;
  completedLessons?: number;
  completedModules?: number;
  onLessonSelect: (lessonId: string) => void;
}

export const CourseContentSection: React.FC<CourseContentSectionProps> = ({
  modules,
  currentLessonId,
  isEnrolled,
  completedLessons = 0,
  completedModules = 0,
  onLessonSelect,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Course Content</h2>
      
      <div className="space-y-4">
        {modules.map((module, index) => {
          // For demo purposes, mark some modules as completed
          const moduleProgress = isEnrolled 
            ? {
                isCompleted: index < completedModules,
                isLocked: isEnrolled ? false : index > 0, // First module is free, others require enrollment
              }
            : {
                isCompleted: false,
                isLocked: index > 0, // First module is free, others require enrollment
              };
          
          // Check if this module contains the current lesson
          const hasCurrentLesson = isEnrolled && currentLessonId
            ? module.lessons.some(lesson => lesson.id === currentLessonId)
            : false;
          
          // Mark lessons as completed
          const lessonsWithStatus = module.lessons.map((lesson, i) => {
            // Convert module index and lesson index to overall lesson number
            const lessonNumber = modules
              .slice(0, index)
              .reduce((sum, m) => sum + m.lessons.length, 0) + i + 1;
            
            return {
              ...lesson,
              isCompleted: isEnrolled && lessonNumber <= completedLessons,
              isLocked: !isEnrolled && index > 0, // Lock lessons in locked modules
            };
          });
          
          return (
            <ModuleAccordion
              key={module.id}
              module={{
                id: module.id,
                title: module.title,
                description: module.description || '',
                estimatedDuration: module.estimatedDuration,
                lessons: lessonsWithStatus,
                deepDiveContent: module.deepDiveContent,
                isRequired: module.isRequired,
              }}
              currentLessonId={currentLessonId}
              onLessonSelect={onLessonSelect}
              defaultExpanded={index === 0 || hasCurrentLesson}
              isCompleted={moduleProgress.isCompleted}
              isLocked={moduleProgress.isLocked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseContentSection;
