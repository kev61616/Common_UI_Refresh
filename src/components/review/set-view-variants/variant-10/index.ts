'use client'

import { MoodBasedView } from '../MoodBasedView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 10,
  name: 'Mood-Based View',
  description: 'Visualizes practice sets with visual elements that adapt to the emotional context of your learning state',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default MoodBasedView
