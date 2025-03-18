import { PracticeSet } from '@/lib/mockData';

/**
 * Common props interface for all question view variants
 */
export interface QuestionViewProps {
  practiceSets: PracticeSet[];
  onSelectSet: (id: string) => void;
  selectedSetId: string | null;
  sortConfig?: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void;
}
