'use client'

import { ZenGardenView } from '../ZenGardenView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 47,
  name: 'Zen Garden View',
  description: 'Contemplative Zen garden visualization where practice sets appear as rocks and patterns in sand',
  category: 'set',
  tags: ['zen', 'garden', 'meditation', 'peaceful'],
  isExperimental: false
})

// Export the component as default
export default ZenGardenView
