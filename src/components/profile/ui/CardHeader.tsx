import React from 'react';
import { Typography } from '@/components/ui/typography';

interface CardHeaderProps {
  title: string;
  bgColor?: string;
  textColor?: string;
}

export const CardHeader = ({ 
  title, 
  bgColor = 'bg-primary/10', 
  textColor = 'text-primary' 
}: CardHeaderProps) => (
  <div className={`px-4 py-2 border-b border-border ${bgColor}`}>
    <Typography variant="h4" className={`font-semibold ${textColor} truncate`}>
      {title}
    </Typography>
  </div>
);
