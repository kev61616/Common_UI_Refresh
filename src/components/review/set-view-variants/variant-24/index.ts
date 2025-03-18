'use client'

import { registerView } from '../../registry/viewRegistry'
import { Component } from './Component'

// Register this view with metadata
registerView({
  id: 24,
  name: 'Seasonal Garden View',
  description: 'A visualization that reveals cyclical learning patterns and environmental factors affecting performance',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
