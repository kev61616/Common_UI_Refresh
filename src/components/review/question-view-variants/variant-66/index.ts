'use client'

import { MosaicTileMatrixView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 66,
  name: 'Mosaic Tile Matrix',
  description: 'Ancient mosaic-styled tiles with patterns and colors indicating performance and mastery level',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default MosaicTileMatrixView
