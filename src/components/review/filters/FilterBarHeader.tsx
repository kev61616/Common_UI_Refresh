'use client'

import React from 'react';
import { Button } from '@/components/catalyst/button'; // Use Catalyst Button
import { Heading } from '@/components/catalyst/heading'; // Use Catalyst Heading
import { Filter, ChevronDown, ChevronRight, X } from 'lucide-react'; // Use Lucide icons

interface FilterBarHeaderProps {
  showAdvancedFilters: boolean;
  onToggleAdvanced: () => void; // Keep only one definition
  onClearFilters: () => void;
}

// Removed local icon import

export function FilterBarHeader({
  showAdvancedFilters,
  onToggleAdvanced,
  onClearFilters,
}: FilterBarHeaderProps) {
  return (
    <div className="flex flex-wrap justify-between items-center mb-5"> {/* Keep spacing scale mb-5 */}
      {/* Use Catalyst Heading, level 4, adjust size/styling with Tailwind */}
      <Heading level={4} className="text-xl font-medium text-foreground flex items-center"> {/* Use text-xl for size */}
        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-sm mr-3"> {/* Keep icon container */}
          <Filter className="h-5 w-5 text-white" /> {/* Use Lucide Filter icon */}
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent dark:from-primary-400 dark:to-accent-400">
          Filters & Sort
        </span>
      </Heading>
      <div className="flex gap-3"> {/* Keep spacing scale gap-3 */}
        {/* Use Catalyst Button */}
        <Button outline onClick={onToggleAdvanced} className="text-sm"> {/* Use outline prop, add text-sm */}
          {showAdvancedFilters ? (
            <>
              <ChevronDown className="h-4 w-4" /> {/* Use Lucide icon */}
              <span>Hide Advanced</span>
            </>
          ) : (
            <>
              <ChevronRight className="h-4 w-4" /> {/* Use Lucide icon */}
              <span>Show Advanced</span>
            </>
          )}
        </Button>
        {/* Use Catalyst Button */}
        <Button
          outline
          onClick={onClearFilters}
          // Apply destructive hover styles directly using Tailwind
          className="text-sm hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 dark:hover:border-red-500/40 dark:hover:bg-red-500/10 dark:hover:text-red-500"
        >
          <X className="h-4 w-4" /> {/* Use Lucide X icon */}
          <span>Clear All</span>
        </Button> {/* Add missing closing tag */}
      </div>
    </div>
  );
}
