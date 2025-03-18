'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 96,
  name: 'Interactive Learning Map',
  description: 'A 3D interactive map visualization showing questions as landmarks in a learning landscape based on their relationships and categories',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default Component
