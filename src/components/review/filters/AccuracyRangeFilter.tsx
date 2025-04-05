'use client'

import React from 'react';
// Removed Typography import
import { Fieldset, Label, FieldGroup, Field } from '@/components/catalyst/fieldset';
import { Input } from '@/components/catalyst/input';
import { Target } from 'lucide-react'; // Use Lucide icon

interface AccuracyRangeFilterProps {
  range: [number, number];
  // Add onChange back to the interface
  onChange: (rangeType: 'min' | 'max', value: number) => void;
}

// Removed local AccuracyIcon definition

export function AccuracyRangeFilter({ range, onChange }: AccuracyRangeFilterProps) {
  const [minVal, maxVal] = range;

  // Adjust handlers for Catalyst Input (onChange provides value directly, but TS might expect event)
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    value = Math.max(0, Math.min(value, maxVal)); // Ensure min <= max
    onChange('min', value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = 100;
    value = Math.min(100, Math.max(value, minVal)); // Ensure max >= min
    onChange('max', value);
  };

  const rangeWidth = maxVal - minVal;
  const rangeOffset = minVal;

  return (
    <Fieldset>
      <Label className="text-sm font-medium text-foreground mb-2 flex items-center"> {/* Use mb-2 */}
        <Target className="h-4 w-4 mr-1.5 text-primary dark:text-primary-400" /> {/* Use h-4, w-4, mr-1.5 */}
        Accuracy Range
      </Label>
      <div className="mt-3"> {/* Use mt-3 */}
        {/* Keep custom range visualization for now */}
        <div className="relative pt-5"> {/* Use pt-5 */}
          <div className="h-2 bg-muted rounded-full overflow-hidden"> {/* Use h-2 */}
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full absolute top-0"
              style={{ left: `${rangeOffset}%`, width: `${rangeWidth}%` }}
            ></div>
          </div>
          {/* Use FieldGroup for inputs */}
          <FieldGroup className="flex justify-between items-center mt-4"> {/* Use mt-4 */}
            {/* Min Input */}
            <Field className="flex items-center">
              <Input
                type="number"
                name="minAccuracy"
                min="0"
                max="100"
                value={minVal}
                onChange={handleMinChange}
                aria-label="Minimum Accuracy"
                // Adjust width and styling as needed for Catalyst Input
                className="w-16 px-2 py-1 text-sm"
              />
            </Field>
            <span className="text-muted-foreground">-</span>
            {/* Max Input */}
            <Field className="flex items-center">
              <Input
                type="number"
                name="maxAccuracy"
                min="0"
                max="100"
                value={maxVal}
                onChange={handleMaxChange}
                aria-label="Maximum Accuracy"
                // Adjust width and styling as needed for Catalyst Input
                className="w-16 px-2 py-1 text-sm"
              />
              <span className="ml-1.5 text-muted-foreground">%</span> {/* Use ml-1.5 */}
            </Field>
          </FieldGroup> {/* Add missing closing tag */}
        </div>
      </div>
    </Fieldset> // Add missing closing tag
  );
}
