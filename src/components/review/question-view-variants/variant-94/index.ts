'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 94,
  name: '3D Cube View',
  description: 'Visualizes questions as interactive 3D cubes in a grid, with each face displaying different metrics',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default Component
