'use client'

import { TerrainHeatmapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 53,
  name: '3D Terrain Heatmap',
  description: 'Elevation-based 3D visualization with height and color indicating performance across topics',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default TerrainHeatmapView
