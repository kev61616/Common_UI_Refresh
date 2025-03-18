'use client'

import { registerView } from '../../registry/viewRegistry'
import { Component } from './Component'

// Register this view with metadata
registerView({
  id: 25,
  name: 'Performance Correlation Matrix',
  description: 'A visualization that identifies relationships between learning factors to reveal performance optimization opportunities',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
