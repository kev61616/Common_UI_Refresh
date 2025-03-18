'use client'

import { ConceptMapView } from '../ConceptMapView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 11,
  name: 'Concept Map',
  description: 'Concept Map visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default ConceptMapView
