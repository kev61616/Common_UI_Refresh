"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Clock, Play, FileText, CheckCircle, LockIcon, Beaker, MessageSquare, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';

// Lesson item container variants
const lessonItemVariants = cva(
  "flex items-center p-3 transition-colors",
  {
    variants: {
      status: {
        incomplete: "hover:bg-gray-50",
        complete: "bg-green-50 hover:bg-green-100",
        current: "bg-blue-50 hover:bg-blue-100",
        locked: "bg-gray-50 opacity-75",
      },
    },
    defaultVariants: {
      status: "incomplete",
    },
  }
);

export interface LessonItemProps extends VariantProps<typeof lessonItemVariants> {
  lesson: {
    id: string;
    title: string;
    type: 'video' | 'text' | 'quiz' | 'exercise' | 'simulation' | 'discussion' | 'assessment';
    estimatedDuration: number; // in minutes
  };
  isCompleted?: boolean;
  isCurrent?: boolean;
  isLocked?: boolean;
  onClick?: () => void;
  className?: string;
}

export function LessonItem({
  lesson,
  isCompleted = false,
  isCurrent = false,
  isLocked = false,
  onClick,
  status,
  className,
}: LessonItemProps) {
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
  
  // Determine the status of the lesson
  const getLessonStatus = (): 'incomplete' | 'complete' | 'current' | 'locked' => {
    if (status) return status;
    
    if (isLocked) return 'locked';
    if (isCurrent) return 'current';
    if (isCompleted) return 'complete';
    return 'incomplete';
  };
  
  // Get the appropriate icon based on lesson type
  const getLessonIcon = () => {
    switch (lesson.type) {
      case 'video':
        return <Play className="h-4 w-4" />;
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'quiz':
        return <ListChecks className="h-4 w-4" />;
      case 'exercise':
        return <Beaker className="h-4 w-4" />;
      case 'simulation':
        return <Beaker className="h-4 w-4" />;
      case 'discussion':
        return <MessageSquare className="h-4 w-4" />;
      case 'assessment':
        return <ListChecks className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  // Get the appropriate text for lesson type
  const getLessonTypeText = (): string => {
    switch (lesson.type) {
      case 'video':
        return 'Video';
      case 'text':
        return 'Reading';
      case 'quiz':
        return 'Quiz';
      case 'exercise':
        return 'Exercise';
      case 'simulation':
        return 'Simulation';
      case 'discussion':
        return 'Discussion';
      case 'assessment':
        return 'Assessment';
      default:
        return 'Lesson';
    }
  };
  
  const lessonStatus = getLessonStatus();

  return (
    <div 
      className={cn(
        lessonItemVariants({ status: lessonStatus }),
        className,
        onClick && !isLocked ? "cursor-pointer" : "",
        isCurrent ? "relative" : ""
      )}
      onClick={() => {
        if (onClick && !isLocked) {
          onClick();
        }
      }}
      onKeyDown={(e) => {
        if (onClick && !isLocked && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={onClick && !isLocked ? 0 : undefined}
      role={onClick && !isLocked ? "button" : undefined}
      aria-disabled={isLocked}
    >
      {/* Current lesson indicator */}
      {isCurrent && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" aria-hidden="true" />
      )}
      
      {/* Lesson status icon */}
      <div className={cn(
        "flex-shrink-0 mr-3 p-1.5 rounded-full",
        isCompleted ? "bg-green-100 text-green-600" : 
        isCurrent ? "bg-blue-100 text-blue-600" : 
        isLocked ? "bg-gray-100 text-gray-400" : 
        "bg-gray-100 text-gray-500"
      )}>
        {isLocked ? (
          <LockIcon className="h-4 w-4" />
        ) : isCompleted ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          getLessonIcon()
        )}
      </div>
      
      {/* Lesson content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col">
          <h4 className={cn(
            "text-sm font-medium truncate",
            isLocked ? "text-gray-400" : 
            isCurrent ? "text-blue-700" : 
            "text-gray-900"
          )}>
            {lesson.title}
          </h4>
          
          <div className="flex items-center text-xs mt-1">
            {/* Lesson type */}
            <span className={cn(
              isLocked ? "text-gray-400" : 
              isCurrent ? "text-blue-600" : 
              "text-gray-500"
            )}>
              {getLessonTypeText()}
            </span>
            
            <span className="mx-1.5">•</span>
            
            {/* Duration */}
            <span className="flex items-center text-gray-500">
              <Clock className="h-3 w-3 mr-0.5" />
              {formatDuration(lesson.estimatedDuration)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Completed icon */}
      {isCompleted && !isCurrent && (
        <CheckCircle className="h-5 w-5 text-green-500 ml-3" />
      )}
      
      {/* Locked icon */}
      {isLocked && (
        <LockIcon className="h-4 w-4 text-gray-400 ml-3" />
      )}
    </div>
  );
}

export default LessonItem;
