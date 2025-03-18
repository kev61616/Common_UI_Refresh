'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 4,
  name: 'Vertical Scrolling Timeline',
  description: 'A responsive vertical timeline that organizes study sessions by month with interactive cards showing session details',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default Component
