"use client";

import React from 'react';
import { ResourceList } from '@/components/course';
import { Resource } from '@/types/course';

interface CourseResourcesCardProps {
  resources: Resource[];
  onResourceClick: (resourceId: string) => void;
}

export const CourseResourcesCard: React.FC<CourseResourcesCardProps> = ({
  resources,
  onResourceClick
}) => {
  if (!resources || resources.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Course Resources</h3>
      <ResourceList
        resources={resources}
        onResourceClick={onResourceClick}
      />
    </div>
  );
};

export default CourseResourcesCard;
