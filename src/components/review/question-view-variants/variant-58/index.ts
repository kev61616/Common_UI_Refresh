'use client'

import { TopographicContourMapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 58,
  name: 'Topographic Contour Map',
  description: 'Contour lines showing mastery "elevations" across subjects with detailed elevation markers',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default TopographicContourMapView
