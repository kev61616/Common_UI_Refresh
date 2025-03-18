'use client'

import { InteractiveTimelineSlider } from '../InteractiveTimelineSlider'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 9,
  name: 'Interactive Timeline Slider',
  description: 'Draggable slider interface for navigating through time periods and sets',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default InteractiveTimelineSlider
