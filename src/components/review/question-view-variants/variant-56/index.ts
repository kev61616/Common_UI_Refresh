'use client'

import { PixelArtHeatmapView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 56,
  name: 'Pixel Art Heatmap',
  description: 'Retro pixel-based visualization with distinctive color palettes reminiscent of 8-bit graphics',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default PixelArtHeatmapView
