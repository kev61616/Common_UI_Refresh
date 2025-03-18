'use client'

import Component from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 53,
  name: 'Neural Network View',
  description: 'A neural network visualization representing practice sets with dynamic network architecture',
  category: 'set',
  tags: [],
  isExperimental: false
})

// Export the component as default
export default Component
