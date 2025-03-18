'use client'

import { ComparisonTimeline } from '../ComparisonTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 19,
  name: 'Comparison Timeline',
  description: 'Parallel timelines allowing comparison between different time periods or subjects',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default ComparisonTimeline
