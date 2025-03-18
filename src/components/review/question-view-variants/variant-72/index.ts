'use client'

import { CrystallineStructureView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 72,
  name: 'Crystalline Structure',
  description: '3D crystal matrix with facets reflecting performance metrics across different dimensions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default CrystallineStructureView
