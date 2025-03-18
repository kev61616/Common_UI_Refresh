'use client'

import { NeuralActivationHeatmapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 78,
  name: 'Neural Activation Heatmap',
  description: 'Brain-inspired neural activation patterns showing firing intensity across knowledge regions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default NeuralActivationHeatmapView
