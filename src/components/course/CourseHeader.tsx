"use client";

import React from 'react';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import { Clock, BookOpen, Users, Star, CalendarDays, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

// Difficulty badge variants
const difficultyBadgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
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
  "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
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

// Button variants
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-11 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface CourseHeaderProps {
  course: {
    title: string;
    description: string;
    image?: string;
    coverImage?: string;
    instructor: {
      name: string;
      avatar?: string;
      bio?: string;
    };
    estimatedDuration: number; // in minutes
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
    enrollmentStatus: 'open' | 'closed' | 'comingSoon';
    enrollmentCount?: number;
    updatedAt?: Date;
    rating?: {
      average: number;
      count: number;
    };
    learningObjectives?: string[];
    tags?: string[];
  };
  progress?: {
    percentage: number;
    completedLessons: number;
    totalLessons: number;
    lastAccessed?: Date;
  };
  onEnroll?: () => void;
  onContinue?: () => void;
  isEnrolled?: boolean;
  className?: string;
}

export function CourseHeader({
  course,
  progress,
  onEnroll,
  onContinue,
  isEnrolled = false,
  className,
}: CourseHeaderProps) {
  // Format the estimated duration into a readable string
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
  };

  const isAvailableForEnrollment = course.enrollmentStatus === 'open';
  const isContinuable = isEnrolled && progress && progress.percentage > 0 && progress.percentage < 100;
  
  // Create star rating display
  const renderRating = () => {
    if (!course.rating) return null;
    
    const { average, count } = course.rating;
    const fullStars = Math.floor(average);
    const hasHalfStar = average - fullStars >= 0.5;
    
    return (
      <div className="flex items-center mt-2" aria-label={`${average} out of 5 stars`}>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "w-4 h-4", 
                i < fullStars ? "text-yellow-400 fill-yellow-400" : 
                (i === fullStars && hasHalfStar) ? "text-yellow-400 fill-yellow-400" : 
                "text-gray-300"
              )}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">{average.toFixed(1)} ({count} ratings)</span>
      </div>
    );
  };

  return (
    <div className={cn("bg-white border-b", className)}>
      {/* Cover image (optional) */}
      {course.coverImage && (
        <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden">
          <Image
            src={course.coverImage}
            alt={`${course.title} cover image`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* If no cover image, show title here */}
        {!course.coverImage && (
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - left 2/3 */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="prose prose-blue max-w-none mb-6">
              <p className="text-gray-600 text-lg">{course.description}</p>
            </div>

            {/* Learning objectives */}
            {course.learningObjectives && course.learningObjectives.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  {course.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1 text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructor */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructor</h2>
              <div className="flex items-start">
                {course.instructor.avatar ? (
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    width={64}
                    height={64}
                    className="rounded-full mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-xl mr-4">
                    {course.instructor.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{course.instructor.name}</h3>
                  {course.instructor.bio && (
                    <p className="text-gray-600 mt-1">{course.instructor.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            {course.tags && course.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {course.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - right 1/3 */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              {/* Course image */}
              {course.image && (
                <div className="relative aspect-video w-full rounded-md overflow-hidden mb-4">
                  <Image
                    src={course.image}
                    alt={`${course.title} thumbnail`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Progress bar for enrolled users */}
              {isEnrolled && progress && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="font-medium">Your progress</span>
                    <span>{progress.percentage}% complete</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${progress.percentage}%` }}
                      role="progressbar"
                      aria-valuenow={progress.percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {progress.completedLessons} of {progress.totalLessons} lessons completed
                  </div>
                  {progress.lastAccessed && (
                    <div className="text-sm text-gray-600 mt-1">
                      Last accessed {formatDistanceToNow(progress.lastAccessed, { addSuffix: true })}
                    </div>
                  )}
                </div>
              )}

              {/* Metadata */}
              <div className="space-y-4 mb-6">
                {/* Course difficulty */}
                <div className="flex items-center">
                  <BarChart className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">Difficulty</div>
                    <div className={difficultyBadgeVariants({ difficulty: course.difficulty })}>
                      {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                    </div>
                  </div>
                </div>
                
                {/* Duration */}
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="text-gray-900 font-medium">{formatDuration(course.estimatedDuration)}</div>
                  </div>
                </div>
                
                {/* Enrollment count */}
                {course.enrollmentCount && (
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Enrolled</div>
                      <div className="text-gray-900 font-medium">{course.enrollmentCount.toLocaleString()} students</div>
                    </div>
                  </div>
                )}
                
                {/* Last updated */}
                {course.updatedAt && (
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Last updated</div>
                      <div className="text-gray-900 font-medium">
                        {formatDistanceToNow(course.updatedAt, { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Rating */}
                {course.rating && (
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-600">Rating</div>
                      <div className="text-gray-900 font-medium">
                        {course.rating.average.toFixed(1)} out of 5 ({course.rating.count} reviews)
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Enrollment status */}
              <div className="mb-6">
                <div className={cn(
                  enrollmentBadgeVariants({ status: course.enrollmentStatus }),
                  "w-full justify-center"
                )}>
                  {course.enrollmentStatus === 'open' ? 'Open for Enrollment' : 
                   course.enrollmentStatus === 'comingSoon' ? 'Coming Soon' : 'Enrollment Closed'}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="space-y-3">
                {isEnrolled ? (
                  <>
                    {isContinuable && onContinue && (
                      <button 
                        onClick={onContinue}
                        className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
                      >
                        Continue Learning
                      </button>
                    )}
                    {!isContinuable && (
                      <button 
                        onClick={onContinue}
                        className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
                      >
                        {progress && progress.percentage === 100 ? "Review Course" : "Start Learning"}
                      </button>
                    )}
                  </>
                ) : (
                  <button 
                    onClick={onEnroll}
                    className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
                    disabled={!isAvailableForEnrollment}
                  >
                    {isAvailableForEnrollment ? "Enroll Now" : 
                     course.enrollmentStatus === 'comingSoon' ? "Notify Me" : "Enrollment Closed"}
                  </button>
                )}
                
                {!isEnrolled && (
                  <button 
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
                  >
                    Preview Course
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseHeader;
