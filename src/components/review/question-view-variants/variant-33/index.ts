'use client'

import { StainedGlassView } from '../StainedGlassView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 33,
  name: 'Stained Glass',
  description: 'Stained Glass visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default StainedGlassView
