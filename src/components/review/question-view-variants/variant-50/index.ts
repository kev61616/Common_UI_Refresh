'use client'

import { SubwayKnowledgeMapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 50,
  name: 'Subway Knowledge Map',
  description: 'Metro/subway-style map with colored lines connecting topic stations and question stops',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default SubwayKnowledgeMapView
