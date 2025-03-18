'use client'

import { registerView } from '../../registry/viewRegistry'
import { Component } from './Component'

// Register this view with metadata
registerView({
  id: 21,
  name: 'Celestial Observatory View',
  description: 'A cosmic-themed view that visualizes practice sets as celestial bodies within an observatory',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
