"use client";

import React from 'react';
import { File, Link, Image, Code, FileText, Video, Music, Download, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ResourceListProps {
  resources: {
    id: string;
    title: string;
    type: 'pdf' | 'link' | 'image' | 'code' | 'file' | 'video' | 'audio';
    url: string;
    description?: string;
    iconType?: string;
    isRequired?: boolean;
    estimatedTime?: number; // in minutes
    category?: 'reference' | 'additional' | 'example' | 'tool';
  }[];
  onResourceClick?: (resourceId: string) => void;
  className?: string;
}

export function ResourceList({
  resources,
  onResourceClick,
  className,
}: ResourceListProps) {
  // Early return if no resources
  if (!resources || resources.length === 0) {
    return null;
  }

  // Get icon based on resource type
  const getResourceIcon = (type: string, iconType?: string) => {
    if (iconType) {
      // TODO: Add custom icon support if needed
      return <File className="h-5 w-5" />;
    }

    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'link':
        return <Link className="h-5 w-5" />;
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'code':
        return <Code className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'audio':
        return <Music className="h-5 w-5" />;
      case 'file':
      default:
        return <File className="h-5 w-5" />;
    }
  };

  // Get color based on resource type
  const getResourceColor = (type: string): string => {
    switch (type) {
      case 'pdf':
        return 'text-red-500';
      case 'link':
        return 'text-blue-500';
      case 'image':
        return 'text-purple-500';
      case 'code':
        return 'text-green-500';
      case 'video':
        return 'text-yellow-500';
      case 'audio':
        return 'text-indigo-500';
      case 'file':
      default:
        return 'text-gray-500';
    }
  };

  // Format estimated time
  const formatTime = (minutes: number): string => {
    if (minutes < 1) {
      return "< 1 min";
    }
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }
    return `${hours} hr ${remainingMinutes} min`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {resources.map((resource) => {
        const iconColor = getResourceColor(resource.type);
        const isExternalLink = resource.type === 'link' && !resource.url.startsWith('/');
        
        return (
          <div 
            key={resource.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
          >
            <div className="p-4">
              <div className="flex items-start">
                {/* Resource Icon */}
                <div className={cn("rounded-full p-2 mr-3 flex-shrink-0", `bg-${iconColor.split('-')[1]}-50`)}>
                  <span className={iconColor}>
                    {getResourceIcon(resource.type, resource.iconType)}
                  </span>
                </div>
                
                {/* Resource Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-gray-900">
                    {resource.title}
                    {resource.isRequired && (
                      <span className="ml-2 text-xs font-medium text-blue-600 inline-block">
                        Required
                      </span>
                    )}
                  </h3>
                  
                  {resource.description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {resource.description}
                    </p>
                  )}
                  
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    {/* Resource category */}
                    {resource.category && (
                      <span className="capitalize">{resource.category}</span>
                    )}
                    
                    {/* Separator dot if both category and time exist */}
                    {resource.category && resource.estimatedTime && (
                      <span className="mx-1.5">•</span>
                    )}
                    
                    {/* Estimated time */}
                    {resource.estimatedTime && (
                      <span>{formatTime(resource.estimatedTime)}</span>
                    )}
                  </div>
                </div>

                {/* Action button */}
                <div className="ml-4">
                  <a
                    href={resource.url}
                    target={isExternalLink ? "_blank" : undefined}
                    rel={isExternalLink ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (onResourceClick) {
                        e.preventDefault();
                        onResourceClick(resource.id);
                      }
                    }}
                    className="inline-flex items-center justify-center p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    aria-label={`Access ${resource.title} ${isExternalLink ? '(opens in new tab)' : ''}`}
                  >
                    {resource.type === 'pdf' || resource.type === 'file' ? (
                      <Download className="h-5 w-5" />
                    ) : isExternalLink ? (
                      <ExternalLink className="h-5 w-5" />
                    ) : (
                      <Link className="h-5 w-5" />
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResourceList;
