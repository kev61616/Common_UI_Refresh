'use client'

import { registerView } from '../../registry/viewRegistry'
import { ArtStudioGalleryView } from '../ArtStudioGalleryView'

// Register this view with metadata
registerView({
  id: 35,
  name: 'Art Studio Gallery View',
  description: "Artist's studio with practice sets displayed as works-in-progress with different artistic styles based on subject areas",
  category: 'set',
  tags: ['art', 'creative', 'gallery', 'studio', 'visual'],
  isExperimental: false
})

// Export the component as default
export default ArtStudioGalleryView
