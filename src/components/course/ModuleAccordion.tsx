"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, CheckCircle, LockIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import LessonItem from './LessonItem';

// Accordion container variants
const moduleAccordionVariants = cva(
  "border rounded-lg overflow-hidden transition-colors",
  {
    variants: {
      status: {
        incomplete: "border-gray-200 bg-white",
        complete: "border-green-100 bg-green-50",
        current: "border-blue-200 bg-blue-50",
        locked: "border-gray-200 bg-gray-50",
      },
    },
    defaultVariants: {
      status: "incomplete",
    },
  }
);

export interface ModuleAccordionProps extends VariantProps<typeof moduleAccordionVariants> {
  module: {
    id: string;
    title: string;
    description?: string;
    estimatedDuration: number; // in minutes
    lessons: {
      id: string;
      title: string;
      type: 'video' | 'text' | 'quiz' | 'exercise' | 'simulation' | 'discussion' | 'assessment';
      estimatedDuration: number; // in minutes
      isCompleted?: boolean;
      isLocked?: boolean;
    }[];
    deepDiveContent?: boolean;
    isRequired?: boolean;
  };
  currentLessonId?: string;
  onLessonSelect: (lessonId: string) => void;
  defaultExpanded?: boolean;
  isCompleted?: boolean;
  isLocked?: boolean;
  className?: string;
}

export function ModuleAccordion({
  module,
  currentLessonId,
  onLessonSelect,
  defaultExpanded = false,
  isCompleted = false,
  isLocked = false,
  status,
  className,
}: ModuleAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  // Format the estimated duration into a readable string
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }
    return `${hours} hr ${remainingMinutes} min`;
  };
  
  // Determine the status of the module
  const getModuleStatus = (): 'incomplete' | 'complete' | 'current' | 'locked' => {
    if (status) return status;
    
    if (isLocked) return 'locked';
    if (isCompleted) return 'complete';
    if (module.lessons.some(lesson => lesson.id === currentLessonId)) return 'current';
    return 'incomplete';
  };
  
  // Calculate completion percentage
  const calculateCompletionPercentage = (): number => {
    const completedLessons = module.lessons.filter(lesson => lesson.isCompleted).length;
    return Math.round((completedLessons / module.lessons.length) * 100);
  };
  
  const completionPercentage = calculateCompletionPercentage();
  const moduleStatus = getModuleStatus();
  const hasCurrent = module.lessons.some(lesson => lesson.id === currentLessonId);
  
  // Auto-expand if this module contains the current lesson
  React.useEffect(() => {
    if (hasCurrent && !isExpanded) {
      setIsExpanded(true);
    }
  }, [currentLessonId, hasCurrent, isExpanded]);

  return (
    <div 
      className={cn(
        moduleAccordionVariants({ status: moduleStatus }),
        className
      )}
    >
      {/* Module header */}
      <div 
        className={cn(
          "flex items-center p-4 cursor-pointer select-none",
          isLocked ? "opacity-75" : ""
        )}
        onClick={() => !isLocked && setIsExpanded(!isExpanded)}
        onKeyDown={(e) => {
          if (!isLocked && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        tabIndex={isLocked ? -1 : 0}
        role="button"
        aria-expanded={isExpanded}
        aria-controls={`module-content-${module.id}`}
      >
        {/* Expansion icon */}
        <div className="mr-3 text-gray-500">
          {isLocked ? (
            <LockIcon className="h-5 w-5" />
          ) : (
            isExpanded ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )
          )}
        </div>
        
        {/* Module info */}
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-900 mr-2">
              {module.title}
            </h3>
            
            {/* Optional "Deep Dive" badge */}
            {module.deepDiveContent && (
              <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                Deep Dive
              </span>
            )}
            
            {/* Optional "Required" badge */}
            {module.isRequired !== false && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 ml-2">
                Required
              </span>
            )}
          </div>
          
          {/* Module description - shown when expanded or if no lessons */}
          {module.description && (isExpanded || module.lessons.length === 0) && (
            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
          )}
          
          {/* Module metadata */}
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatDuration(module.estimatedDuration)}
            </span>
            <span className="mx-2">•</span>
            <span>{module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}</span>
            
            {/* Completion status */}
            {!isLocked && completionPercentage > 0 && (
              <>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  ) : null}
                  {completionPercentage}% complete
                </span>
              </>
            )}
          </div>
        </div>
        
        {/* Completion checkmark (only fully completed) */}
        {isCompleted && (
          <CheckCircle className="h-6 w-6 text-green-500 ml-4" />
        )}
      </div>
      
      {/* Module content (lessons) */}
      {isExpanded && !isLocked && (
        <div 
          id={`module-content-${module.id}`}
          className="border-t border-gray-200 bg-white"
        >
          <ul className="divide-y divide-gray-100">
            {module.lessons.map((lesson) => (
              <li key={lesson.id}>
                <LessonItem
                  lesson={lesson}
                  isCompleted={lesson.isCompleted}
                  isCurrent={lesson.id === currentLessonId}
                  isLocked={lesson.isLocked}
                  onClick={() => !lesson.isLocked && onLessonSelect(lesson.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Locked message */}
      {isExpanded && isLocked && (
        <div className="p-4 text-center border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col items-center justify-center py-4">
            <LockIcon className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600">
              This module is currently locked. Complete previous modules to unlock.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModuleAccordion;
