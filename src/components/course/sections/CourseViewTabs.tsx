"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export type CourseViewType = 'modules' | 'knowledge-graph' | 'roadmap';

interface CourseTabDefinition {
  id: CourseViewType;
  label: string;
  icon?: React.ReactNode;
  description?: string;
}

const COURSE_TABS: CourseTabDefinition[] = [
  {
    id: 'modules',
    label: 'Chapter View',
    description: 'View course content organized by modules and chapters',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'knowledge-graph',
    label: 'Knowledge Graph',
    description: 'Visualize the relationships between concepts in the course',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'roadmap',
    label: 'Learning Path',
    description: 'View your personalized learning journey through the course',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
];

interface CourseViewTabsProps {
  courseId: string;
  currentView?: CourseViewType;
  onChange?: (viewType: CourseViewType) => void;
}

export function CourseViewTabs({
  courseId,
  currentView = 'modules',
  onChange,
}: CourseViewTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Handle tab change
  const handleTabChange = (tabId: CourseViewType) => {
    if (onChange) {
      onChange(tabId);
    } else {
      // Create a new URLSearchParams instance
      const params = new URLSearchParams(searchParams.toString());
      params.set('view', tabId);
      
      // Update the URL with the new view parameter
      router.push(`/course/${courseId}?${params.toString()}`);
    }
  };

  return (
    <div className="mb-8">
      {/* Tab descriptions */}
      <div className="hidden sm:block mb-4">
        {COURSE_TABS.find(tab => tab.id === currentView)?.description && (
          <p className="text-sm text-gray-500 italic">
            {COURSE_TABS.find(tab => tab.id === currentView)?.description}
          </p>
        )}
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {COURSE_TABS.map((tab) => {
            const isActive = currentView === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default CourseViewTabs;
