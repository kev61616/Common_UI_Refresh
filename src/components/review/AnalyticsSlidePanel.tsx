'use client'

import React from 'react';
import { Button as CatalystButton } from '@/components/catalyst/button'; // Use Catalyst Button
import { PracticeSet } from '@/lib/mockData';
import { AnalyticsPanel } from './AnalyticsPanel'; // Import the panel content
import { ChevronRight } from 'lucide-react'; // Use Lucide icon

interface AnalyticsSlidePanelProps {
  isOpen: boolean;
  selectedSet: PracticeSet | null;
  onClose: () => void; // Ensure onClose prop is defined
}

export function AnalyticsSlidePanel({ isOpen, selectedSet, onClose }: AnalyticsSlidePanelProps) {
  // Calculate dynamic styles based on isOpen state
  const panelTransformClass = isOpen ? 'translate-x-0' : 'translate-x-full';
  // Define shadow class based on state (consider using theme variables if available)
  const panelShadowStyle = isOpen ? { boxShadow: '-8px 0 30px rgba(15, 23, 42, 0.08), -1px 0 10px rgba(15, 23, 42, 0.03), inset 1px 0 0 rgba(255, 255, 255, 0.3)' } : {};

  return ( // Added parentheses around return block
    // Fragment needs to wrap both the panel and the overlay
    <>
      {/* Panel Container */}
      <div
        className={`fixed top-0 right-0 h-screen w-[800px] max-w-[90vw] bg-card text-card-foreground transform transition-transform duration-300 ease-in-out z-50 overflow-hidden border-l border-border ${panelTransformClass}`}
        style={{
          top: 'var(--navbar-height, 4.75rem)', // Align with sticky header
          height: 'calc(100vh - var(--navbar-height, 4.75rem))',
          borderTopLeftRadius: 'var(--radius-xl, 1rem)', // Example using CSS var or fallback
          borderBottomLeftRadius: 'var(--radius-xl, 1rem)', // Example using CSS var or fallback
          ...panelShadowStyle // Apply shadow style conditionally
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="analytics-panel-title" // Add accessible title if needed
      >
        {/* Panel edge decoration - Use primary/accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-accent-500 to-accent-600 opacity-80"></div> {/* Use w-1 */}

        {/* Edge-aligned close button - Use Catalyst Button */}
        <CatalystButton
          plain // Use plain style for minimal appearance
          onClick={onClose}
          className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-16 rounded-l-xl rounded-r-none z-10 shadow-md bg-card hover:bg-accent border-y border-l border-border" // Add background, hover, border
          aria-label="Close analytics panel"
        >
          <ChevronRight className="size-5" /> {/* Use Lucide icon */}
        </CatalystButton>

        {/* Actual panel content - Add padding to avoid overlap */}
        <div className="h-full overflow-y-auto pl-1"> {/* Use pl-1 */}
          {/* Only render AnalyticsPanel if selectedSet is not null */}
          {selectedSet ? (
            <AnalyticsPanel practiceSet={selectedSet} />
          ) : (
            // Optional: Add a placeholder or message when no set is selected
            <div className="p-6 text-center text-muted-foreground">Select a practice set to view analytics.</div> {/* Use p-6 */}
          )}
        </div>
      </div> {/* Closing tag for the main panel div */}

      {/* Invisible overlay restored */}
      {isOpen ? (
        <div
          className="fixed inset-0 z-40 cursor-pointer" // Keep z-index lower than panel
          onClick={onClose}
          aria-hidden="true"
        ></div>
      ) : null}
    </>
  ); // Moved semicolon after parenthesis
}
