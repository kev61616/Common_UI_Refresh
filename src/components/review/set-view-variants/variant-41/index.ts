'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 41,
  name: 'Holographic Card View',
  description: 'A futuristic holographic card view with interactive 3D effects and beautiful gradient overlays',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
