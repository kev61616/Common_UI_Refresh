'use client'

import React from 'react';
import { Button } from '@/components/ui/button'; // Use the actual Button component
import { cn } from '@/lib/utils';

type ViewType = 'set' | 'timeline' | 'question';

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

// TODO: Move icons to central Icon component
function SetIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  )
}
function QuestionIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
 return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
 )
}
function TimelineIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
 return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
 )
}


export function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  const views: { type: ViewType; label: string; mobileLabel: string; icon: React.ElementType }[] = [
    { type: 'set', label: 'Set View', mobileLabel: 'Sets', icon: SetIcon },
    { type: 'question', label: 'Question View', mobileLabel: 'Questions', icon: QuestionIcon },
    { type: 'timeline', label: 'Timeline View', mobileLabel: 'Timeline', icon: TimelineIcon },
  ];

  return (
    // Use spacing scale gap-2/3, pb-2, px-1
    <div className="flex flex-wrap gap-2 md:gap-3 pb-2 px-1">
      {views.map((view) => (
        <Button
          key={view.type}
          variant={currentView === view.type ? 'default' : 'ghost'} // Use Button variants
          size="sm" // Use a standard Button size (adjust if needed)
          onClick={() => onViewChange(view.type)}
          // Apply specific styles for rounded top and remove default button rounding
          className={cn(
            "rounded-b-none rounded-t-md md:text-base", // Use md:text-base for larger screens
             currentView !== view.type && "text-muted-foreground hover:bg-primary/10 hover:text-primary" // Custom hover for inactive
          )}
        >
          <view.icon className="h-4 w-4 md:h-5 md:w-5 mr-2" /> {/* Use spacing scale h-4/5, w-4/5, mr-2 */}
          <span className="hidden sm:inline">{view.label}</span>
          <span className="sm:hidden">{view.mobileLabel}</span>
        </Button>
      ))}
    </div>
  );
}
