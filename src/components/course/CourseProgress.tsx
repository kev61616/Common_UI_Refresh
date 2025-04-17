"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, BookOpen, Clock, Award } from 'lucide-react';

export interface CourseProgressProps {
  progress: {
    percentage: number;
    completedLessons: number;
    totalLessons: number;
    completedModules?: number;
    totalModules?: number;
    estimatedTimeLeft?: number; // in minutes
    certificationEligible?: boolean;
  };
  compact?: boolean;
  showDetails?: boolean;
  className?: string;
}

export function CourseProgress({
  progress,
  compact = false,
  showDetails = false,
  className,
}: CourseProgressProps) {
  // Format the estimated time into a readable string
  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  };

  // Calculate a color based on percentage
  const getProgressColor = (percentage: number): string => {
    if (percentage >= 100) return 'bg-green-600';
    if (percentage >= 75) return 'bg-blue-600';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Progress bar with percentage and completed/total lessons
  const renderProgressBar = () => (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">
          {progress.percentage}% Complete
        </span>
        <span className="text-gray-600">
          {progress.completedLessons}/{progress.totalLessons} lessons
        </span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full", getProgressColor(progress.percentage))}
          style={{ width: `${progress.percentage}%` }}
          role="progressbar"
          aria-valuenow={progress.percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );

  // Compact version just shows progress bar
  if (compact) {
    return (
      <div className={cn("w-full", className)}>
        {renderProgressBar()}
      </div>
    );
  }

  // Default version shows progress bar and basic stats
  if (!showDetails) {
    return (
      <div className={cn("w-full space-y-4", className)}>
        {renderProgressBar()}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 text-gray-500 mr-1.5" />
            <span>
              {progress.completedLessons} of {progress.totalLessons} lessons completed
            </span>
          </div>

          {progress.estimatedTimeLeft !== undefined && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-1.5" />
              <span>{formatTime(progress.estimatedTimeLeft)} left</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Detailed version shows progress bar, stats and modules
  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Main progress bar */}
      {renderProgressBar()}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Lessons completed stat */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Lessons Completed</div>
              <div className="text-lg font-medium">
                {progress.completedLessons}/{progress.totalLessons}
              </div>
            </div>
          </div>
        </div>

        {/* Modules completed stat */}
        {progress.completedModules !== undefined && progress.totalModules !== undefined && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Modules Completed</div>
                <div className="text-lg font-medium">
                  {progress.completedModules}/{progress.totalModules}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Time remaining stat */}
        {progress.estimatedTimeLeft !== undefined && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Time Remaining</div>
                <div className="text-lg font-medium">
                  {formatTime(progress.estimatedTimeLeft)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certification eligibility stat */}
        {progress.certificationEligible !== undefined && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className={cn(
                "p-2 rounded-full mr-3",
                progress.certificationEligible 
                  ? "bg-green-100 text-green-600" 
                  : "bg-gray-100 text-gray-500"
              )}>
                <Award className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Certificate</div>
                <div className="text-lg font-medium">
                  {progress.certificationEligible 
                    ? "Eligible" 
                    : `${progress.percentage}% of 80% required`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Motivational message based on progress */}
      <div className="border-t pt-4">
        <div className="text-sm text-gray-700">
          {progress.percentage === 0 ? (
            <p>Ready to start learning? Begin your first lesson now!</p>
          ) : progress.percentage === 100 ? (
            <p className="flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Congratulations! You've completed this course.
            </p>
          ) : progress.percentage >= 75 ? (
            <p>You're almost there! Keep up the great work.</p>
          ) : progress.percentage >= 50 ? (
            <p>You're making excellent progress. Halfway there!</p>
          ) : progress.percentage >= 25 ? (
            <p>Good progress! Keep the momentum going.</p>
          ) : (
            <p>You've made a great start. Keep going!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseProgress;
