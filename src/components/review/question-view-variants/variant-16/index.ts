'use client'

import { HexagonalHeatmapView } from '../HexagonalHeatmapView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 16,
  name: 'Hexagonal Heatmap',
  description: 'Hexagonal Heatmap visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default HexagonalHeatmapView
