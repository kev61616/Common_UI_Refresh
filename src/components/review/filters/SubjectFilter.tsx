'use client'

import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/catalyst/checkbox'
import { Fieldset, Label } from '@/components/catalyst/fieldset'
import { Library } from 'lucide-react' // Use Lucide icon

interface SubjectFilterProps {
  selectedSubjects: string[];
  // IMPORTANT: onChange now receives the full array of selected subjects
  onChange: (selectedSubjects: string[]) => void;
}

// Removed local SubjectIcon definition

const SUBJECTS = ['Reading', 'Writing', 'Math']; // TODO: Get from a central source?

export function SubjectFilter({ selectedSubjects, onChange }: SubjectFilterProps) {
  return (
    // Use Fieldset for semantic grouping
    <Fieldset>
      {/* Use Catalyst Label */}
      <Label className="text-sm font-medium text-foreground mb-2 flex items-center"> {/* Use mb-2 */}
        <Library className="h-4 w-4 mr-1.5 text-primary dark:text-primary-400" /> {/* Use h-4, w-4, mr-1.5 */}
        Subject
      </Label>
      {/* Use Catalyst CheckboxGroup */}
      <CheckboxGroup
        value={selectedSubjects}
        onChange={onChange} // Pass the updated onChange handler
        className="flex flex-wrap gap-x-4 gap-y-2" // Use gap-x-4, gap-y-2 for spacing
      >
        {SUBJECTS.map(subject => (
          // Use CheckboxField and Checkbox for each option
          <CheckboxField key={subject}>
            <Checkbox value={subject} />
            <Label>{subject}</Label>
          </CheckboxField>
        ))}
      </CheckboxGroup>
    </Fieldset>
  );
}
