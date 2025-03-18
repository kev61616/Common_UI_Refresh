'use client'

import { MoodBasedView } from '../MoodBasedView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 13,
  name: 'Mood-Based View',
  description: 'Practice sets arranged by emotional response and engagement level',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default MoodBasedView
