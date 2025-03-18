'use client'

import { TypographyArtTagCloudView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 87,
  name: 'Typography Art Tag Cloud',
  description: 'Artistic typography-focused tag visualization with font variations and calligraphic elements',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default TypographyArtTagCloudView
