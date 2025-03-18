'use client'

import { SoundWaveHeatmapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 80,
  name: 'Sound Wave Heatmap',
  description: 'Audio-inspired heatmap with frequency and amplitude patterns representing knowledge areas',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default SoundWaveHeatmapView
