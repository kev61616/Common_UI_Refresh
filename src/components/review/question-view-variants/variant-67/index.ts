'use client'

import { CosmicMatrixView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 67,
  name: 'Cosmic Matrix',
  description: 'Space-themed grid with galaxies, nebulae, and celestial objects representing knowledge domains',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default CosmicMatrixView
