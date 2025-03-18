'use client'

import { MindMapView } from '../MindMapView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 21,
  name: 'Mind Map',
  description: 'Mind Map visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default MindMapView
