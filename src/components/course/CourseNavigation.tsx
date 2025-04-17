"use client";

import React from 'react';
import { ArrowLeft, ArrowRight, Menu, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CourseNavigationProps {
  previousLesson?: {
    id: string;
    title: string;
    moduleTitle?: string;
  };
  nextLesson?: {
    id: string;
    title: string;
    moduleTitle?: string;
  };
  onPreviousClick?: () => void;
  onNextClick?: () => void;
  onModuleListClick?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
  showCompletionButton?: boolean;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
  className?: string;
}

export function CourseNavigation({
  previousLesson,
  nextLesson,
  onPreviousClick,
  onNextClick,
  onModuleListClick,
  disablePrevious = false,
  disableNext = false,
  showCompletionButton = false,
  onMarkComplete,
  isCompleted = false,
  className,
}: CourseNavigationProps) {
  
  // Classes for completion button
  const completionButtonClasses = cn(
    "ml-3 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md",
    isCompleted 
      ? "bg-green-100 text-green-700 border border-green-200" 
      : "bg-blue-600 text-white hover:bg-blue-700"
  );

  return (
    <div className={cn("border-t bg-white py-4", className)}>
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Previous button */}
          <div>
            {previousLesson ? (
              <button
                onClick={onPreviousClick}
                disabled={disablePrevious}
                className="group flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Previous lesson: ${previousLesson.title}`}
              >
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Previous</div>
                  <div className="max-w-[200px] truncate">{previousLesson.title}</div>
                  {previousLesson.moduleTitle && (
                    <div className="text-xs text-gray-500">{previousLesson.moduleTitle}</div>
                  )}
                </div>
              </button>
            ) : (
              <div /> 
            )}
          </div>
          
          {/* Center controls */}
          <div className="flex items-center">
            {/* Module list button */}
            <button
              onClick={onModuleListClick}
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              aria-label="View module list"
            >
              <Menu className="h-4 w-4 mr-2" />
              <span>Course Contents</span>
            </button>
            
            {/* Mark as complete button */}
            {showCompletionButton && onMarkComplete && (
              <button
                onClick={onMarkComplete}
                disabled={isCompleted}
                className={completionButtonClasses}
                aria-label={isCompleted ? "Lesson completed" : "Mark lesson as complete"}
              >
                {isCompleted ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    <span>Completed</span>
                  </>
                ) : (
                  <span>Mark Complete</span>
                )}
              </button>
            )}
          </div>
          
          {/* Next button */}
          <div>
            {nextLesson ? (
              <button
                onClick={onNextClick}
                disabled={disableNext}
                className="group flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Next lesson: ${nextLesson.title}`}
              >
                <div className="text-right">
                  <div className="text-xs text-gray-500">Next</div>
                  <div className="max-w-[200px] truncate">{nextLesson.title}</div>
                  {nextLesson.moduleTitle && (
                    <div className="text-xs text-gray-500">{nextLesson.moduleTitle}</div>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseNavigation;
