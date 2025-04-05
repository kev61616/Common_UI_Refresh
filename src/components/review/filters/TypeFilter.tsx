'use client'

import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/catalyst/checkbox'
import { Fieldset, Label } from '@/components/catalyst/fieldset'
import { List } from 'lucide-react' // Use Lucide icon

interface TypeFilterProps {
  selectedTypes: string[];
  // IMPORTANT: onChange now receives the full array of selected types
  onChange: (selectedTypes: string[]) => void;
}

// Removed local TypeIcon definition

// TODO: Get types dynamically based on subject or from central source
const TYPES = ['Algebra', 'Geometry', 'Comprehension', 'Grammar', 'Vocabulary'];

export function TypeFilter({ selectedTypes, onChange }: TypeFilterProps) {
  return (
    // Use Fieldset for semantic grouping
    <Fieldset>
      {/* Use Catalyst Label */}
      <Label className="text-sm font-medium text-foreground mb-2 flex items-center"> {/* Use mb-2 */}
        <List className="h-4 w-4 mr-1.5 text-sky-500 dark:text-sky-400" /> {/* Use h-4, w-4, mr-1.5 */}
        Type
      </Label>
      {/* Use Catalyst CheckboxGroup */}
      <CheckboxGroup
        value={selectedTypes}
        onChange={onChange} // Pass the updated onChange handler
        className="flex flex-wrap gap-x-4 gap-y-2" // Use gap-x-4, gap-y-2 for spacing
      >
        {TYPES.map(type => (
          // Use CheckboxField and Checkbox for each option
          <CheckboxField key={type}>
            <Checkbox value={type} />
            <Label>{type}</Label>
          </CheckboxField>
        ))}
      </CheckboxGroup>
    </Fieldset>
  );
}
