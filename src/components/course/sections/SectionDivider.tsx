"use client";

import React from 'react';

interface SectionDividerProps {
  label?: string;
  variant?: 'default' | 'accent' | 'subtle';
  icon?: React.ReactNode;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  variant = 'default',
  icon
}) => {
  const baseClasses = "flex items-center w-full my-8";
  
  const variantClasses = {
    default: "text-gray-700 before:bg-gradient-to-r before:from-gray-200 before:to-gray-300 after:bg-gradient-to-l after:from-gray-200 after:to-gray-300",
    accent: "text-blue-700 before:bg-gradient-to-r before:from-blue-100 before:to-blue-300 after:bg-gradient-to-l after:from-blue-100 after:to-blue-300",
    subtle: "text-gray-500 before:bg-gradient-to-r before:from-gray-100 before:to-gray-200 after:bg-gradient-to-l after:from-gray-100 after:to-gray-200"
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {label ? (
        <>
          <div className="flex-grow h-0.5 before:content-[''] before:block before:h-0.5 before:w-full"></div>
          <div className="px-4 flex items-center space-x-2">
            {icon && <span className="text-inherit">{icon}</span>}
            <span className="font-medium text-sm uppercase tracking-wider">{label}</span>
          </div>
          <div className="flex-grow h-0.5 after:content-[''] after:block after:h-0.5 after:w-full"></div>
        </>
      ) : (
        <div className="w-full h-0.5 before:content-[''] before:block before:h-0.5 before:w-full"></div>
      )}
    </div>
  );
};

export default SectionDivider;
