'use client'

import Component from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 49,
  name: 'Medieval Manuscript View',
  description: 'An ancient manuscript-inspired visualization that represents practice sets as pages in an illuminated codex',
  category: 'set',
  tags: [],
  isExperimental: false
})

// Export the component as default
export default Component
