'use client'

import { PracticeSet } from '@/lib/mockData'

export interface SetViewProps {
  practiceSets: PracticeSet[]
  onSelectSet: (id: string) => void
  selectedSetId: string | null
}
