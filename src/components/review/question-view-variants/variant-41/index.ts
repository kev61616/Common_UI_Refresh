'use client'

import { WatercolorGalleryView } from '../WatercolorGalleryView'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 41,
  name: 'Watercolor Gallery',
  description: 'Watercolor Gallery visualization for questions',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default WatercolorGalleryView
