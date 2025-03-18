'use client'

import { DeepOceanView } from '../DeepOceanView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 57,
  name: 'Deep Ocean View',
  description: 'A deep sea exploration visualization that represents practice sets as marine life and underwater formations at various ocean depths based on performance and complexity',
  category: 'set',
  tags: ['marine', 'interactive', 'depth', 'exploration', 'oceanography'],
  isExperimental: false
})

// Export the component as default
export default DeepOceanView
