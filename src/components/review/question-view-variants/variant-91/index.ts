'use client'

import { DreamscapeConceptMapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 91,
  name: 'Dreamscape Concept Map',
  description: 'Surrealist dream-inspired fluid concept mapping with morphing connections and transitions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default DreamscapeConceptMapView
