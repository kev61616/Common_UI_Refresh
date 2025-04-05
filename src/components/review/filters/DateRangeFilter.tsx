'use client'

import React from 'react';
import { Fieldset, Label, FieldGroup, Field } from '@/components/catalyst/fieldset';
import { Input } from '@/components/catalyst/input';
import { CalendarDays } from 'lucide-react'; // Use Lucide icon

interface DateRangeFilterProps {
  range: [Date, Date];
  // Add onChange back to the interface
  onChange: (rangeType: 'start' | 'end', dateString: string) => void;
}

// Removed local DateIcon definition

// Helper to format Date object to YYYY-MM-DD string for input value
const formatDateForInput = (date: Date): string => {
  try {
    // Check if date is valid
    if (isNaN(date.getTime())) {
      // Return today's date as fallback if invalid
      return new Date().toISOString().split('T')[0];
    }
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error("Error formatting date for input:", error);
    // Return today's date as fallback on error
    return new Date().toISOString().split('T')[0];
  }
};

export function DateRangeFilter({ range, onChange }: DateRangeFilterProps) {
  const [startDate, endDate] = range;

  return (
    <Fieldset className="md:col-span-3"> {/* Use Fieldset, keep col-span */}
      <Label className="text-sm font-medium text-foreground mb-2 flex items-center"> {/* Use mb-2 */}
        <CalendarDays className="h-4 w-4 mr-1.5 text-rose-500 dark:text-rose-400" /> {/* Use h-4, w-4, mr-1.5 */}
        Date Range
      </Label>
      {/* Use FieldGroup for inputs */}
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"> {/* Use gap-4, mt-3 */}
        {/* Start Date Input */}
        <Field>
          {/* Optional: Add specific label for screen readers */}
          {/* <Label htmlFor="startDate" className="sr-only">Start Date</Label> */}
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={formatDateForInput(startDate)}
            onChange={(e) => onChange('start', e.target.value)}
            aria-label="Start Date" // Keep aria-label
            // Catalyst Input applies base styles, adjust if needed
            className="text-sm"
          />
        </Field>
        {/* End Date Input */}
        <Field>
          {/* <Label htmlFor="endDate" className="sr-only">End Date</Label> */}
          <Input
            id="endDate"
            name="endDate"
            type="date"
            value={formatDateForInput(endDate)}
            onChange={(e) => onChange('end', e.target.value)}
            aria-label="End Date" // Keep aria-label
            className="text-sm"
          />
        </Field>
      </FieldGroup> {/* Add missing closing tag */}
    </Fieldset> // Add missing closing tag
  );
}
