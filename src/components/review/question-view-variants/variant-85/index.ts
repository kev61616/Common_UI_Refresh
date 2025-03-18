'use client'

import { ConstellationTagCloudView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 85,
  name: 'Constellation Tag Cloud',
  description: 'Night sky visualization where tags form constellations connected by starry lines',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default ConstellationTagCloudView
