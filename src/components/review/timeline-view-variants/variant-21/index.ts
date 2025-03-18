'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 21,
  name: 'Interactive Story Timeline',
  description: 'A narrative-focused timeline that presents study sessions as chapters in a learning story',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default Component
