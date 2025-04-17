"use client";

import React from 'react';

export interface CourseIncludesItem {
  icon: string;
  text: string;
}

const DEFAULT_INCLUDES: CourseIncludesItem[] = [
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    text: "Lifetime access"
  },
  {
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    text: "Certificate of completion"
  },
  {
    icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
    text: "Downloadable resources"
  },
  {
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    text: "Community support"
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    text: "Practical exercises and projects"
  }
];

interface CourseIncludesCardProps {
  includes?: CourseIncludesItem[];
}

export const CourseIncludesCard: React.FC<CourseIncludesCardProps> = ({
  includes = DEFAULT_INCLUDES
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">This Course Includes</h3>
      <ul className="space-y-3 text-gray-600">
        {includes.map((item, index) => (
          <li key={index} className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
            </div>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseIncludesCard;
