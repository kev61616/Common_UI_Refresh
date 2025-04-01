import { PracticeSet } from '@/lib/mockData';

export interface QuestionViewProps {
  practiceSets: PracticeSet[];
  onSelectSet?: (id: string) => void;
  selectedSetId?: string | null;
  sortConfig?: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void;
  filters?: Record<string, string[] | string>;
}
