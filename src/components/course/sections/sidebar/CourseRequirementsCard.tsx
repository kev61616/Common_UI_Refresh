"use client";

import React from 'react';

interface CourseRequirementsCardProps {
  requirements: string[];
  slug: string;
}

export const CourseRequirementsCard: React.FC<CourseRequirementsCardProps> = ({
  requirements,
  slug
}) => {
  // Default requirements for all courses
  const defaultRequirements = [
    'Basic computer skills',
    'Internet connection'
  ];
  
  // Add specialized requirements based on course type
  let courseSpecificRequirements: string[] = [];
  
  if (slug.includes('sat')) {
    courseSpecificRequirements = [
      'Basic mathematical knowledge (algebra, geometry)',
      'Graphing calculator (recommended)'
    ];
  } else if (slug === 'web-development-fundamentals') {
    courseSpecificRequirements = [
      'No prior programming experience required',
      'Any operating system (Windows, Mac, or Linux)'
    ];
  }
  
  // Combine all requirements
  const allRequirements = [
    ...defaultRequirements,
    ...courseSpecificRequirements,
    ...(requirements || [])
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Requirements</h3>
      <ul className="space-y-2 text-gray-600">
        {allRequirements.map((requirement, index) => (
          <li key={index} className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{requirement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseRequirementsCard;
