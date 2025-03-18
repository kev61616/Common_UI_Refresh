'use client'

import { registerView } from '../../registry/viewRegistry'
import { Component } from './Component'

// Register this view with metadata
registerView({
  id: 27,
  name: 'City District View',
  description: 'City-themed visualization mapping study investment to districts and performance to buildings',
  category: 'set',
  isExperimental: false
})

export default Component
