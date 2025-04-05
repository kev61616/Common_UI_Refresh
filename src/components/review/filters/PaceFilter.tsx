'use client'

import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/catalyst/checkbox'
import { Fieldset, Label } from '@/components/catalyst/fieldset'
import { Gauge } from 'lucide-react' // Use Lucide icon

interface PaceFilterProps {
  selectedPaces: string[];
  // IMPORTANT: onChange now receives the full array of selected paces
  onChange: (selectedPaces: string[]) => void;
}

// Removed local icon definitions

// Simplified options, icons removed as Checkbox doesn't easily support them inline
const PACE_OPTIONS = [
  { label: 'Fast' },
  { label: 'Normal' },
  { label: 'Slow' },
];

export function PaceFilter({ selectedPaces, onChange }: PaceFilterProps) {
  return (
    <Fieldset>
      <Label className="text-sm font-medium text-foreground mb-2 flex items-center"> {/* Use mb-2 */}
        <Gauge className="h-4 w-4 mr-1.5 text-warning-500" /> {/* Use h-4, w-4, mr-1.5 */}
        Pace
      </Label>
      <CheckboxGroup
        value={selectedPaces}
        onChange={onChange} // Pass the updated onChange handler
        className="flex flex-wrap gap-x-4 gap-y-2 mt-3" // Use gap-x-4, gap-y-2, mt-3
      >
        {PACE_OPTIONS.map(pace => (
          <CheckboxField key={pace.label}>
            <Checkbox value={pace.label} />
            <Label>{pace.label}</Label>
          </CheckboxField>
        ))}
      </CheckboxGroup>
    </Fieldset>
  );
}
