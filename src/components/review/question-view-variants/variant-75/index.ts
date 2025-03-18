'use client'

import { UnderwaterCoralTreeView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 75,
  name: 'Underwater Coral Tree',
  description: 'Ocean-inspired knowledge tree with coral formations representing topic clusters and question nodes',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default UnderwaterCoralTreeView
