"use client";

import React from 'react';

interface CourseEnrollCTAProps {
  courseTitle: string;
  onEnroll: () => void;
}

export const CourseEnrollCTA: React.FC<CourseEnrollCTAProps> = ({
  courseTitle,
  onEnroll
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
      <h3 className="text-2xl font-bold mb-3">Ready to master {courseTitle}?</h3>
      <p className="text-blue-100 mb-6 text-lg">Enroll now to get full access to all course content, practice tests, and resources.</p>
      <button
        onClick={onEnroll}
        className="px-8 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors inline-flex items-center"
      >
        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Start Learning Now
      </button>
    </div>
  );
};

export default CourseEnrollCTA;
