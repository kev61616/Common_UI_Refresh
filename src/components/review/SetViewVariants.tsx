'use client'

import { PracticeSet } from '@/lib/mockData'
import { ListView } from '@/components/review/ListView'
import { ListView2 } from '@/components/review/ListView2'
import { ListView3 } from '@/components/review/ListView3'
import { ListView4 } from '@/components/review/ListView4'
import { getSetViewVariant } from './set-view-variants'

// Define view types
export type SetViewVariant = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30

interface SetViewVariantsProps {
  variant: SetViewVariant
  practiceSets: PracticeSet[]
  onSelectSet: (id: string) => void
  selectedSetId: string | null
}

/**
 * Component that renders different set view variants
 * The implementation has been modularized for better maintainability
 * Each view variant is in a separate file in the set-view-variants directory
 */
export function SetViewVariants({ 
  variant, 
  practiceSets,
  onSelectSet,
  selectedSetId
}: SetViewVariantsProps) {
  // For variants 1-4, we use the direct imports
  // For variants 5-30, we use the getSetViewVariant function
  if (variant <= 4) {
    switch (variant) {
      case 1: // Standard Card View
        return (
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-center">1. Standard Cards View</h3>
            <ListView 
              practiceSets={practiceSets}
              onSelectSet={onSelectSet}
              selectedSetId={selectedSetId}
            />
          </div>
        );
      case 2: // Compact Table/Grid View
        return (
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-center">2. Compact Table/Grid View</h3>
            <ListView2
              practiceSets={practiceSets}
              onSelectSet={onSelectSet}
              selectedSetId={selectedSetId}
            />
          </div>
        );
      case 3: // Timeline-Inspired View
        return (
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-center">3. Timeline-Inspired View</h3>
            <ListView3
              practiceSets={practiceSets}
              onSelectSet={onSelectSet}
              selectedSetId={selectedSetId}
            />
          </div>
        );
      case 4: // Masonry Grid
        return (
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-center">4. Masonry Grid View</h3>
            <ListView4
              practiceSets={practiceSets}
              onSelectSet={onSelectSet}
              selectedSetId={selectedSetId}
            />
          </div>
        );
      default:
        return null; // Should never happen since we're checking variant <= 4
    }
  } else {
    // For variants 5 and above, use the modularized approach
    return getSetViewVariant(variant, { practiceSets, onSelectSet, selectedSetId });
  }
}
