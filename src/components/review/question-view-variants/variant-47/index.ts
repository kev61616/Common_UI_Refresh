'use client'

import { FractalKnowledgeMapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 47,
  name: 'Fractal Knowledge Map',
  description: 'Recursive, zoomable fractal patterns grouping topics with infinite detail levels for deeper exploration',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default FractalKnowledgeMapView
