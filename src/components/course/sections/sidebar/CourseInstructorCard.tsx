"use client";

import React from 'react';

import { Instructor as CourseInstructor } from '@/types/course';

interface Instructor extends Partial<CourseInstructor> {
  name: string;
  avatar: string;
}

interface CourseInstructorCardProps {
  instructor: Instructor;
}

export const CourseInstructorCard: React.FC<CourseInstructorCardProps> = ({
  instructor
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Your Instructor</h3>
      
      <div className="flex items-start">
        <img 
          src={instructor.avatar} 
          alt={instructor.name} 
          className="h-14 w-14 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-medium text-gray-900">{instructor.name}</h4>
          {instructor.title && <p className="text-sm text-gray-500">{instructor.title}</p>}
          
          {instructor.averageRating && (
            <div className="mt-2 flex items-center">
              <svg className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-gray-500">
                <span className="font-medium">{instructor.averageRating}</span> Instructor Rating
              </span>
            </div>
          )}
        </div>
      </div>
      
      {instructor.bio && <p className="mt-4 text-gray-600 text-sm">{instructor.bio}</p>}
      
      {instructor.expertise && instructor.expertise.length > 0 && (
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Expertise:</h5>
          <div className="flex flex-wrap gap-2">
            {instructor.expertise.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseInstructorCard;
