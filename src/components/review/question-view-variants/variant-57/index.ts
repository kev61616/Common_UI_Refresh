'use client'

import { WeatherMapHeatmapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 57,
  name: 'Weather Map Heatmap',
  description: 'Meteorological-styled visualization with temperature and pressure zones indicating mastery areas',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default WeatherMapHeatmapView
