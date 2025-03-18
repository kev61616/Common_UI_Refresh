'use client'

import { MetroTimeline } from '../MetroTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 10,
  name: 'Metro Timeline',
  description: 'Subway map inspired timeline showing connections between sets over time',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default MetroTimeline
