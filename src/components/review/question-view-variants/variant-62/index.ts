'use client'

import { HeatmapPrismView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 62,
  name: 'Heatmap Prism',
  description: 'Light spectrum visualization that splits and refracts based on performance metrics across subjects',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default HeatmapPrismView
