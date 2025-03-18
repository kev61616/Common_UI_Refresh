'use client'

import { UrbanDensityMapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 61,
  name: 'Urban Density Map',
  description: 'City-like visualization with building density and height showing mastery concentration areas',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default UrbanDensityMapView
