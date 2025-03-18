'use client'

import { CyberpunkCircuitGridView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 82,
  name: 'Cyberpunk Circuit Grid',
  description: 'Futuristic neon-lit circuit board layout with glowing connections between knowledge nodes',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default CyberpunkCircuitGridView
