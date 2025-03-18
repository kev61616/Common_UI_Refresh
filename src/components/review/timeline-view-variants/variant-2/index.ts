'use client'

import { TimelineView2 } from '../../TimelineView2'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 2,
  name: 'Compact Timeline View',
  description: 'Horizontal timeline with compact visualization focusing on set completion and performance metrics',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default TimelineView2
