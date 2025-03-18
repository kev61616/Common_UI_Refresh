'use client'

import { PhotoTimeline } from '../PhotoTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 15,
  name: 'Photo Timeline',
  description: 'Visual timeline with image thumbnails representing content or progress',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default PhotoTimeline
