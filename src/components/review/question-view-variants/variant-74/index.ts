'use client'

import { BonsaiKnowledgeTreeView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 74,
  name: 'Bonsai Knowledge Tree',
  description: 'Artistic bonsai tree visualization with topic branches and question leaves growing based on mastery',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default BonsaiKnowledgeTreeView
