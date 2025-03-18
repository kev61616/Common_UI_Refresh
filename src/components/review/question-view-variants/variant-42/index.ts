'use client'

import { WeatherMapView } from '../WeatherMapView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 42,
  name: 'Weather Map',
  description: 'Weather Map visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default WeatherMapView
