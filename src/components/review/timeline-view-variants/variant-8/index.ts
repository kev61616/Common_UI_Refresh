'use client'

import { StorytellingTimeline } from '../StorytellingTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 8,
  name: 'Storytelling Timeline',
  description: 'Narrative-based timeline that presents practice history as a story',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default StorytellingTimeline
