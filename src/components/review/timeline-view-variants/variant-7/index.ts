'use client'

import { ThreeDTimeline } from '../ThreeDTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 7,
  name: '3D Timeline',
  description: 'Three-dimensional timeline with depth perception for layered time periods',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default ThreeDTimeline
