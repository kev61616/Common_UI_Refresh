'use client'

import { HeatmapView } from '../HeatmapView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 15,
  name: 'Heatmap',
  description: 'Heatmap visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default HeatmapView
