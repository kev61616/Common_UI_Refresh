'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 32,
  name: 'Spiral Galaxy Timeline',
  description: 'A cosmic visualization that represents practice sets as stars in a spiral galaxy. Features animated stars, interactive celestial bodies, performance-based brightness, and an immersive space theme.',
  category: 'timeline',
  tags: ['cosmic', 'interactive', 'animated', 'space', 'galaxy', 'stars'],
  isExperimental: false
})

// Export the component as default
export default Component
