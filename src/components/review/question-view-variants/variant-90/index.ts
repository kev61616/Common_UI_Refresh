'use client'

import { QuantumFieldConceptMapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 90,
  name: 'Quantum Field Concept Map',
  description: 'Quantum physics inspired concept visualization with probability fields and energy states',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default QuantumFieldConceptMapView
