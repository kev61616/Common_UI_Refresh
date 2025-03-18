'use client'

import { HexagonalView } from '../HexagonalView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 9,
  name: 'Hexagonal Grid View',
  description: 'Visualizes practice sets in a honeycomb-like hexagonal grid with interactive cells and color-coded performance indicators',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default HexagonalView
