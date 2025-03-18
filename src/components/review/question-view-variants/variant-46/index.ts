'use client'

import { ConstellationTreeView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 46,
  name: 'Constellation Tree',
  description: 'Questions visualized as stars forming constellations grouped by topic, with brightness indicating performance',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default ConstellationTreeView
