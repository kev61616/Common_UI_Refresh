'use client'

import { GeologicalCrossSectionView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 71,
  name: 'Geological Cross Section',
  description: "Layered rock formations showing 'depth' of knowledge across topics with stratified layers",
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default GeologicalCrossSectionView
