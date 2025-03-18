'use client'

import { TreeMapView } from '../TreeMapView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 37,
  name: 'Tree Map',
  description: 'Tree Map visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default TreeMapView
