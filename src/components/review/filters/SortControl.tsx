'use client'; // Remove stray '2'

import React from 'react';
import { SortConfig } from '@/hooks/useReviewPageState'; // Import type from hook
// Removed cn import as it's no longer needed with Catalyst components
import { Fieldset, Label } from '@/components/catalyst/fieldset';
import { Select } from '@/components/catalyst/select';
import { Button } from '@/components/catalyst/button';
import { ListFilter, ArrowUp, ArrowDown } from 'lucide-react'; // Use Lucide icons

interface SortControlProps {
  sortConfig: SortConfig;
  // Add onSortChange back to the interface
  onSortChange: (key: string, direction: 'asc' | 'desc') => void;
}

// Removed local icon definitions

const SORT_OPTIONS = [
  { value: 'dateCompleted', label: 'Date' },
  { value: 'accuracy', label: 'Accuracy' },
  { value: 'timeUsed', label: 'Time' },
];

export function SortControl({ sortConfig, onSortChange }: SortControlProps) {
  // Adjust handler to accept the event object to satisfy TypeScript
  const handleKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newKey = event.target.value; // Extract value from event
    // When key changes, default to 'desc' unless it's already the current key
    const direction = sortConfig.key === newKey ? sortConfig.direction : 'desc';
    onSortChange(newKey, direction);
  };

  const handleDirectionToggle = () => {
    const newDirection = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSortChange(sortConfig.key, newDirection);
  };

  return (
    <Fieldset>
      <Label className="text-sm font-medium text-foreground mb-2 flex items-center"> {/* Use mb-2 */}
        <ListFilter className="h-4 w-4 mr-1.5 text-accent-500 dark:text-accent-400" /> {/* Use h-4, w-4, mr-1.5 */}
        Sort By
      </Label>
      <div className="flex gap-2"> {/* Use gap-2 */}
        {/* Use Catalyst Select */}
        <Select
          name="sortKey" // Add name prop for accessibility/forms
          className="flex-grow" // Allow select to grow
          value={sortConfig.key}
          onChange={handleKeyChange}
          aria-label="Sort key" // Add aria-label
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Select>
        {/* Use Catalyst Button for direction toggle */}
        <Button
          outline
          onClick={handleDirectionToggle}
          aria-label={sortConfig.direction === 'asc' ? 'Sort descending' : 'Sort ascending'}
          className="flex-shrink-0 px-3" // Adjust padding if needed, Catalyst buttons have default padding
        >
          {sortConfig.direction === 'asc' ? (
            <ArrowUp className="h-4 w-4" /> // Use Lucide icon
          ) : (
            <ArrowDown className="h-4 w-4" /> // Use Lucide icon
          )}
        </Button>
      </div>
    </Fieldset> // Add missing closing tag
  );
}
