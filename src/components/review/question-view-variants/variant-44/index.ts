'use client'

import { BotanicalKnowledgeGardenView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 44,
  name: 'Botanical Knowledge Garden',
  description: 'Questions visualized as plants and flowers growing from topic roots with bloom states indicating mastery level',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default BotanicalKnowledgeGardenView
