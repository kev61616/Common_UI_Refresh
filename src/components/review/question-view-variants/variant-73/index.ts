'use client'

import { OrigamiKnowledgeTreeView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 73,
  name: 'Origami Knowledge Tree',
  description: 'Paper-folding inspired hierarchical knowledge representation with origami-styled nodes and branches',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default OrigamiKnowledgeTreeView
