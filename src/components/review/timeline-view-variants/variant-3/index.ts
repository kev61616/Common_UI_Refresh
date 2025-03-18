'use client'

import { TimelineView3 } from '../../TimelineView3'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 3,
  name: 'Detailed Timeline View',
  description: 'Comprehensive timeline visualization with detailed metrics, filtering, and interactive elements',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default TimelineView3
