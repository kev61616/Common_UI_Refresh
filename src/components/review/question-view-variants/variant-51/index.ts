'use client'

import { TimelineTreeView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 51,
  name: 'Timeline Tree',
  description: 'Chronological branching structure showing learning progression over time with growth indicators',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default TimelineTreeView
