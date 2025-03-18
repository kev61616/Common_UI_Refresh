'use client'

import { SetViewTimeline } from './SetViewTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 68,
  name: 'Timeline Inspired Table View',
  description: 'Enhanced table view showing sets in a clean, structured format with performance indicators and pagination',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default SetViewTimeline
