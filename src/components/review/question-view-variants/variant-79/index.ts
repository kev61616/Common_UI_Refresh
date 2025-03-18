'use client'

import { WatercolorWashHeatmapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 79,
  name: 'Watercolor Wash Heatmap',
  description: 'Artistic watercolor visualization with color bleeding and intensity showing mastery gradients',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default WatercolorWashHeatmapView
