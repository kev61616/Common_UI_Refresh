'use client'

import { MinimalistTimeline } from '../MinimalistTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 14,
  name: 'Minimalist Timeline',
  description: 'Clean, simplified timeline focusing on key events without visual distractions',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default MinimalistTimeline
