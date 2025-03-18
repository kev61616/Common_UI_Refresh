'use client'

import Component from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 51,
  name: 'Virtual Reality Gallery View',
  description: 'An immersive VR-inspired gallery visualization representing practice sets as exhibits',
  category: 'set',
  tags: [],
  isExperimental: false
})

// Export the component as default
export default Component
