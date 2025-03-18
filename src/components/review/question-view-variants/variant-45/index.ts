'use client'

import { NeuralNetworkTreeView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 45,
  name: 'Neural Network Tree',
  description: 'Interactive neural connections showing relationships between topics with pulsing nodes indicating activity',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default NeuralNetworkTreeView
