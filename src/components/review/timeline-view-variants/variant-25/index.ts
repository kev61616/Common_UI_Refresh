'use client'

import { ParallaxScrollingTimeline } from '../ParallaxScrollingTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 25,
  name: 'Parallax Scrolling Timeline',
  description: 'A timeline visualization with parallax scrolling effects for an immersive view of practice sessions over time',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default ParallaxScrollingTimeline
