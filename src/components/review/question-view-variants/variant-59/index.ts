'use client'

import { BiomeEcosystemMapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 59,
  name: 'Biome Ecosystem Map',
  description: 'Different ecosystems representing mastery levels from desert to rainforest based on question performance',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default BiomeEcosystemMapView
