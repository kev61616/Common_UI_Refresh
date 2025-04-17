"use client";

import React from 'react';
import SectionDivider from './SectionDivider';

interface SectionContainerProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  divider?: {
    show: boolean;
    label?: string;
    variant?: 'default' | 'accent' | 'subtle';
    icon?: React.ReactNode;
  };
  accent?: boolean;
  className?: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  subtitle,
  children,
  divider = { show: false },
  accent = false,
  className = ""
}) => {
  return (
    <section className={`relative ${className}`}>
      {/* Top Connector Line (visible when not the first section) */}
      <div className="absolute left-1/2 -top-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-transparent to-blue-100"></div>
      
      {/* Optional divider above the section */}
      {divider.show && (
        <SectionDivider
          label={divider.label}
          variant={divider.variant || 'default'}
          icon={divider.icon}
        />
      )}
      
      {/* Section content */}
      <div className={`relative rounded-xl shadow-sm border ${accent ? 'border-blue-200 bg-blue-50/30' : 'border-gray-100 bg-white'} p-6`}>
        {/* Show title and subtitle if provided */}
        {(title || subtitle) && (
          <div className="mb-6">
            {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
        )}
        
        {/* The main content */}
        {children}
      </div>
      
      {/* Bottom Connector Line */}
      <div className="absolute left-1/2 -bottom-6 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b from-blue-100 to-transparent"></div>
    </section>
  );
};

export default SectionContainer;
