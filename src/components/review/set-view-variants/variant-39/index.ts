'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 39,
  name: 'Puzzle Box View',
  description: 'A tactile visualization representing practice sets as interactive puzzle boxes with expandable content.',
  category: 'set',
  isExperimental: false
})

export default Component
