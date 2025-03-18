'use client'

import { AuroraHeatmapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 54,
  name: 'Aurora Heatmap',
  description: 'Shimmering, animated northern lights style visualization with color intensity showing mastery',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default AuroraHeatmapView
