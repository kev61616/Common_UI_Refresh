'use client'

import { registerView } from '../../registry/viewRegistry'
import { FractalDimensionView } from '../FractalDimensionView'

// Register this view with metadata
registerView({
  id: 32,
  name: 'Fractal Dimension View',
  description: 'Recursive fractal patterns represent practice sets with complexity mapping to question count and colors to performance',
  category: 'set',
  tags: ['mathematical', 'recursive', 'patterns', 'fractal', 'geometry'],
  isExperimental: false
})

// Export the component as default
export default FractalDimensionView
