'use client'

import { VolcanicActivityHeatmapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 77,
  name: 'Volcanic Activity Heatmap',
  description: 'Volcanic regions visualization with magma hotspots and cooling areas representing knowledge intensity',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default VolcanicActivityHeatmapView
