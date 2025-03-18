'use client'

import { HoneycombMatrixView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 84,
  name: 'Honeycomb Matrix',
  description: 'Natural hexagonal honeycomb structure with cell filling patterns showing mastery progression',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default HoneycombMatrixView
