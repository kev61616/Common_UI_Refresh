'use client'

import Component from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 50,
  name: 'Digital Biome View',
  description: 'A digital ecosystem visualization representing practice sets as evolving biomes',
  category: 'set',
  tags: [],
  isExperimental: false
})

// Export the component as default
export default Component
