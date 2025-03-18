'use client'

import { CavePaintingConceptMapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 92,
  name: 'Ancient Cave Painting Concept Map',
  description: 'Prehistoric cave art inspired concept mapping with primal symbols and ochre coloring',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default CavePaintingConceptMapView
