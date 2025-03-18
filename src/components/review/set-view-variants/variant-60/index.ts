'use client'

import { ParallelCoordinatesView } from '../ParallelCoordinatesView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 60,
  name: 'Parallel Coordinates View',
  description: 'A multi-dimensional data visualization that maps practice sets across parallel axes representing different metrics',
  category: 'set',
  tags: [],
  isExperimental: false
})

// Export the component as default
export default ParallelCoordinatesView
