'use client'

import { VoronoiTreemapView } from '../VoronoiTreemapView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 61,
  name: 'Voronoi Treemap View',
  description: 'A space-filling visualization that uses Voronoi tessellation to represent practice sets in nested, organically shaped cells',
  category: 'set',
  tags: [],
  isExperimental: false
})

// Export the component as default
export default VoronoiTreemapView
