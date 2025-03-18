'use client'

import { JapaneseTatamiGridView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 83,
  name: 'Japanese Tatami Grid',
  description: 'Traditional Japanese tatami mat-inspired grid with zen garden elements and balance indicators',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default JapaneseTatamiGridView
