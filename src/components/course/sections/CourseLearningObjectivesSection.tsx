"use client";

import React from 'react';

interface CourseLearningObjectivesSectionProps {
  objectives: string[];
}

export const CourseLearningObjectivesSection: React.FC<CourseLearningObjectivesSectionProps> = ({ 
  objectives 
}) => {
  if (!objectives || objectives.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">What You'll Learn</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {objectives.map((objective, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-700">{objective}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseLearningObjectivesSection;
