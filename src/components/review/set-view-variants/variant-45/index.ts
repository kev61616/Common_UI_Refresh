'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 45,
  name: '3D Bookshelf',
  description: 'Displays study sets as books on a 3D perspective bookshelf, organized by subject with interactive hover effects',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
