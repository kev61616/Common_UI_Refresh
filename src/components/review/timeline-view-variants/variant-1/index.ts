'use client'

import { TimelineView } from '../../TimelineView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 1,
  name: 'Standard Timeline View',
  description: 'Chronological timeline of practice activity with interactive markers and time-based filtering',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default TimelineView
