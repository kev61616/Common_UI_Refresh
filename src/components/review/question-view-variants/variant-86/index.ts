'use client'

import { BubbleFloatTagCloudView } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 86,
  name: 'Bubble Float Tag Cloud',
  description: 'Floating bubble visualization where tags exist in different sized spheres with animated movement',
  category: 'question',
  isExperimental: false
})

// Export the component as default
export default BubbleFloatTagCloudView
