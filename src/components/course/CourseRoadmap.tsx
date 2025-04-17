"use client";

import React from 'react';
import { Module } from '@/types/course';

export interface CourseRoadmapProps {
  modules: Module[];
  currentModuleId?: string;
  completedModules?: string[];
}

export function CourseRoadmap({ 
  modules,
  currentModuleId,
  completedModules = []
}: CourseRoadmapProps) {
  // Sort modules by order property
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Course Roadmap</h2>
      <p className="text-gray-600 mb-6">
        Follow this learning path to master the material. Each module builds on the previous one.
      </p>
      
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-6 top-8 bottom-8 w-1 bg-blue-100"></div>
        
        {/* Modules */}
        <div className="space-y-8">
          {sortedModules.map((module, index) => {
            // Determine module status
            const isCompleted = completedModules.includes(module.id);
            const isCurrent = module.id === currentModuleId;
            
            // Set appropriate styling based on status
            let statusColor = "bg-gray-200"; // Default: not started
            let textColor = "text-gray-600";
            let borderColor = "border-gray-200";
            
            if (isCompleted) {
              statusColor = "bg-green-500";
              textColor = "text-green-700";
              borderColor = "border-green-200";
            } else if (isCurrent) {
              statusColor = "bg-blue-500";
              textColor = "text-blue-700";
              borderColor = "border-blue-200";
            }
            
            return (
              <div key={module.id} className="relative flex">
                {/* Status circle */}
                <div className={`z-10 flex-shrink-0 h-12 w-12 rounded-full ${statusColor} flex items-center justify-center text-white font-bold text-lg`}>
                  {isCompleted ? "✓" : index + 1}
                </div>
                
                {/* Module info */}
                <div className={`ml-4 p-4 bg-white border ${borderColor} rounded-lg flex-grow shadow-sm`}>
                  <h3 className={`font-bold ${textColor}`}>{module.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {module.description ? `${module.description.substring(0, 120)}...` : 'No description available.'}
                  </p>
                  <div className="mt-2 flex items-center text-sm">
                    <span className="flex items-center text-gray-500">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {Math.floor(module.estimatedDuration / 60)} hours
                    </span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-500">{module.lessons.length} lessons</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CourseRoadmap;
