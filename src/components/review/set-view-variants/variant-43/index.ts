'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 43,
  name: 'Crystal Collection',
  description: 'A crystal-themed visualization that represents study sets as unique gemstones with different properties',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
