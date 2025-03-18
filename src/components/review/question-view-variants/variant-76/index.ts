'use client'

import { WinterFrostTreeView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 76,
  name: 'Winter Frost Tree',
  description: 'Snow-covered tree with ice crystal formations representing knowledge areas and frost patterns for mastery',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default WinterFrostTreeView
