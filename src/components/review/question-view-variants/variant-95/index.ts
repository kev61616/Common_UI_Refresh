'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 95,
  name: 'Interactive Learning Path',
  description: 'An engaging visualization that shows questions as nodes on a learning journey path',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default Component
