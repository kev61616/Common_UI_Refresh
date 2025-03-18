'use client'

import { registerView } from '../../registry/viewRegistry'
import { JazzCompositionView } from '../JazzCompositionView'

// Register this view with metadata
registerView({
  id: 36,
  name: 'Jazz Composition View',
  description: 'Musical notation-inspired visualization representing practice sets as jazz compositions with musical staff notation',
  category: 'set',
  tags: ['music', 'notation', 'jazz', 'composition', 'staff'],
  isExperimental: false
})

// Export the component as default
export default JazzCompositionView
