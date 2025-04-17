"use client";

import React from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { Clock, BookOpen, Award, ChevronRight, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

// Card container variants
const courseCardVariants = cva(
  "group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md",
  {
    variants: {
      variant: {
        default: "h-full",
        compact: "h-[320px]",
        featured: "h-full md:flex-row"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Difficulty badge variants
const difficultyBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      difficulty: {
        beginner: "bg-green-100 text-green-800",
        intermediate: "bg-yellow-100 text-yellow-800",
        advanced: "bg-red-100 text-red-800",
        mixed: "bg-purple-100 text-purple-800",
      },
    },
    defaultVariants: {
      difficulty: "beginner",
    },
  }
);

// Enrollment status badge variants
const enrollmentBadgeVariants = cva(
  "absolute top-2 right-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        open: "bg-blue-100 text-blue-800",
        closed: "bg-gray-100 text-gray-800",
        comingSoon: "bg-purple-100 text-purple-800",
      },
    },
    defaultVariants: {
      status: "open",
    },
  }
);

export interface CourseCardProps extends VariantProps<typeof courseCardVariants> {
  course: {
    id: string;
    title: string;
    description: string;
    shortDescription?: string;
    image: string;
    instructor: {
      name: string;
      avatar?: string;
    };
    estimatedDuration: number; // in minutes
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
    category?: string;
    enrollmentStatus: 'open' | 'closed' | 'comingSoon';
    enrollmentCount?: number;
    updatedAt?: Date;
    featured?: boolean;
    tags?: string[];
  };
  progress?: {
    percentage: number;
    lastAccessed?: Date;
  };
  onClick?: () => void;
  className?: string;
}

export function CourseCard({
  course,
  progress,
  variant,
  onClick,
  className,
}: CourseCardProps) {
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

  // Use the course's short description if available, otherwise truncate the full description
  const displayDescription = course.shortDescription || 
    (course.description.length > 120 
      ? `${course.description.substring(0, 120)}...` 
      : course.description);

  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  const isEnrolled = progress !== undefined;

  return (
    <div 
      className={cn(
        courseCardVariants({ variant }),
        className,
        onClick ? "cursor-pointer" : "",
        course.featured && variant !== 'featured' ? "border-blue-200" : ""
      )} 
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? `View ${course.title} course` : undefined}
    >
      {/* Enrollment status badge */}
      <div className={enrollmentBadgeVariants({ status: course.enrollmentStatus })}>
        {course.enrollmentStatus === 'open' ? 'Enrolling' : 
         course.enrollmentStatus === 'comingSoon' ? 'Coming Soon' : 'Closed'}
      </div>

      {/* Image container */}
      <div className={cn(
        "relative overflow-hidden",
        isFeatured ? "md:w-1/3" : "",
        isCompact ? "h-32" : "h-40"
      )}>
        <Image 
          src={course.image} 
          alt={`${course.title} cover image`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes={isFeatured ? "(max-width: 768px) 100vw, 33vw" : "100vw"}
        />
        
        {/* Optional "Featured" ribbon */}
        {course.featured && !isFeatured && (
          <div className="absolute top-0 left-0 bg-blue-600 text-white py-1 px-3 text-xs font-medium transform -rotate-45 translate-x-[-30%] translate-y-[50%]">
            Featured
          </div>
        )}
      </div>

      {/* Content container */}
      <div className={cn(
        "flex flex-col p-4",
        isFeatured ? "md:w-2/3 md:p-6" : "",
        isCompact ? "flex-1 overflow-hidden" : "flex-1"
      )}>
        {/* Category + Difficulty */}
        <div className="flex items-center justify-between mb-2">
          {course.category && (
            <span className="text-xs text-gray-500">{course.category}</span>
          )}
          <div className={difficultyBadgeVariants({ difficulty: course.difficulty })}>
            {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
          </div>
        </div>

        {/* Title */}
        <h3 className={cn(
          "font-semibold text-gray-900 group-hover:text-blue-600", 
          isFeatured ? "text-xl mb-3" : "text-lg mb-2",
          isCompact ? "line-clamp-1" : ""
        )}>
          {course.title}
        </h3>

        {/* Description */}
        <p className={cn(
          "text-sm text-gray-600 mb-4", 
          isCompact ? "line-clamp-2" : "",
          isFeatured ? "" : "line-clamp-3"
        )}>
          {displayDescription}
        </p>

        {/* Tags (only in featured variant) */}
        {isFeatured && course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {course.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                +{course.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="mt-auto">
          {/* Progress bar (if enrolled) */}
          {isEnrolled && progress && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{progress.percentage}% complete</span>
                {progress.lastAccessed && (
                  <span>Last accessed {formatDistanceToNow(progress.lastAccessed, { addSuffix: true })}</span>
                )}
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${progress.percentage}%` }}
                  role="progressbar"
                  aria-valuenow={progress.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            {/* Instructor and metadata */}
            <div className="flex items-center space-x-3">
              {/* Instructor avatar (if available) */}
              {course.instructor.avatar ? (
                <Image 
                  src={course.instructor.avatar} 
                  alt={course.instructor.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                  {course.instructor.name.charAt(0).toUpperCase()}
                </div>
              )}
              
              {/* Instructor name */}
              <span className="text-xs text-gray-600">{course.instructor.name}</span>
            </div>

            {/* Course duration */}
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-xs text-gray-600">{formatDuration(course.estimatedDuration)}</span>
              
              {/* Enrollment count (optional) */}
              {course.enrollmentCount && !isCompact && (
                <>
                  <Users className="h-4 w-4 text-gray-400 ml-2 mr-1" />
                  <span className="text-xs text-gray-600">
                    {course.enrollmentCount > 1000 
                      ? `${(course.enrollmentCount / 1000).toFixed(1)}k` 
                      : course.enrollmentCount}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Call to action for featured variant */}
        {isFeatured && (
          <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
            View course <ChevronRight className="ml-1 h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
