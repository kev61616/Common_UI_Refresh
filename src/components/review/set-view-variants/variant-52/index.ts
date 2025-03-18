'use client'

import Component from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 52,
  name: 'Circuit Simulation View',
  description: 'An electronic circuit visualization representing practice sets as components',
  category: 'set',
  tags: [],
  isExperimental: false
})

// Export the component as default
export default Component
