'use client'

import { StainedGlassMatrixView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 70,
  name: 'Stained Glass Matrix',
  description: 'Medieval stained glass window aesthetic with light passing through colored panels by mastery',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default StainedGlassMatrixView
