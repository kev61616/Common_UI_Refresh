'use client'

import { registerView } from '../../registry/viewRegistry'
import { Component } from './Component'

// Register this view with metadata
registerView({
  id: 26,
  name: 'Cognitive Load Analyzer',
  description: 'A visualization that analyzes practice sets to identify cognitive overload patterns and optimal learning conditions',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
