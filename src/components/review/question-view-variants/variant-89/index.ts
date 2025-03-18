'use client'

import { RenaissanceDiagramConceptMapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 89,
  name: 'Renaissance Diagram Concept Map',
  description: 'Leonardo da Vinci inspired concept visualization with detailed anatomical-style diagrams',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default RenaissanceDiagramConceptMapView
