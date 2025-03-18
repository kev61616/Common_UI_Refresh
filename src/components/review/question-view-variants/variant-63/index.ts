'use client'

import { PeriodicTableOfKnowledgeView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 63,
  name: 'Periodic Table of Knowledge',
  description: 'Chemistry-inspired grid with elemental styling for topics and questions arranged by properties',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default PeriodicTableOfKnowledgeView
