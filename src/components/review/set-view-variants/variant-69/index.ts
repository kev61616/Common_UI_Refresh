'use client'

import { SetViewTimeline } from './SetViewTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 69,
  name: 'Timeline Inspired SetView',
  description: 'A clean, tabular view of practice sets with detailed performance metrics',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default SetViewTimeline
