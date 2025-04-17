"use client";

import React from 'react';

interface CourseStatsBarProps {
  estimatedHours: number;
  modulesCount: number;
  enrollmentCount: number;
  rating?: number;
  isEnrolled: boolean;
  onContinue: () => void;
  onEnroll: () => void;
  onViewSyllabus: () => void;
}

export const CourseStatsBar: React.FC<CourseStatsBarProps> = ({
  estimatedHours,
  modulesCount,
  enrollmentCount,
  rating,
  isEnrolled,
  onContinue,
  onEnroll,
  onViewSyllabus,
}) => {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-600">
                <span className="font-medium">{estimatedHours}</span> hours
              </span>
            </div>
            
            <div className="flex items-center">
              <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm text-gray-600">
                <span className="font-medium">{modulesCount}</span> modules
              </span>
            </div>
            
            <div className="flex items-center">
              <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm text-gray-600">
                <span className="font-medium">{enrollmentCount.toLocaleString()}</span> students enrolled
              </span>
            </div>
            
            {rating && (
              <div className="flex items-center">
                <svg className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-600">
                  <span className="font-medium">{rating}</span> rating
                </span>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3 mt-3 sm:mt-0">
            {isEnrolled ? (
              <button
                onClick={onContinue}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors flex items-center"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Continue Learning
              </button>
            ) : (
              <button
                onClick={onEnroll}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Enroll Now
              </button>
            )}
            
            <button
              onClick={onViewSyllabus}
              className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
            >
              View Syllabus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseStatsBar;
