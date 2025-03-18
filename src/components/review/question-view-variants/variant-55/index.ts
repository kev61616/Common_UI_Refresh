'use client'

import { SatelliteThermalMapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 55,
  name: 'Satellite Thermal Map',
  description: 'Satellite imagery styled visualization with infrared-like thermal signatures indicating knowledge hotspots',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default SatelliteThermalMapView
