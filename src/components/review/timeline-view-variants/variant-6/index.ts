'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 6,
  name: 'Circular Timeline',
  description: 'A radial timeline visualization that represents study sessions in a circular pattern, grouped by subject',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default Component
