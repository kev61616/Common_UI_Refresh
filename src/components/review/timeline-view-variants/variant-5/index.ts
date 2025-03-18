'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 5,
  name: 'Branching Timeline',
  description: 'A hierarchical timeline visualization that shows practice sets in a branching pathway organized by subject and topic',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default Component
