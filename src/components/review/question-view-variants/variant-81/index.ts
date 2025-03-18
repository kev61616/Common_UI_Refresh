'use client'

import { IlluminatedManuscriptGridView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 81,
  name: 'Illuminated Manuscript Grid',
  description: 'Medieval manuscript-styled grid with illuminated borders and decorated knowledge cells',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default IlluminatedManuscriptGridView
