'use client'

import { RadialKnowledgeTreeView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 43,
  name: 'Radial Knowledge Tree',
  description: 'Interactive circular tree layout with expandable branches radiating from the center',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default RadialKnowledgeTreeView
