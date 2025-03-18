'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 46,
  name: 'Constellation Map',
  description: 'A space-themed visualization that represents study sets as constellations of stars connected by lines',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
