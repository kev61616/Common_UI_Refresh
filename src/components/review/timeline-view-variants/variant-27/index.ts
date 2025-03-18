'use client'

import { IsometricBuildingTimeline } from '../IsometricBuildingTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 27,
  name: 'Isometric Building Timeline',
  description: 'A timeline visualization that represents practice sessions as buildings in an isometric city',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default IsometricBuildingTimeline
