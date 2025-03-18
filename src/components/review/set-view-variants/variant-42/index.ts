'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 42,
  name: 'Learning Garden',
  description: 'A botanical-inspired visualization that represents study sets as plants growing in a garden',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
