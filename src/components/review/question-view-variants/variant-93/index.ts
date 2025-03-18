'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 93,
  name: 'Neural Network View',
  description: 'Visualizes questions as interconnected neurons in a neural network, showing relationships and learning patterns',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default Component
