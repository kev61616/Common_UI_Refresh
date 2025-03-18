'use client'

import { KnowledgeTreeView } from '../KnowledgeTreeView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 3,
  name: 'Knowledge Tree View',
  description: 'Hierarchical tree visualization showing questions organized by topics and subtopics',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default KnowledgeTreeView
