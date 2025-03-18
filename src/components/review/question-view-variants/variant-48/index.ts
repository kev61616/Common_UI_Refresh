'use client'

import { MountainRangeKnowledgeView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 48,
  name: 'Mountain Range Knowledge',
  description: '3D terrain visualization with mountain heights mapping to mastery level across knowledge domains',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default MountainRangeKnowledgeView
