'use client'

import { MaterialDesignTimeline } from '../MaterialDesignTimeline'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 28,
  name: 'Material Design Timeline',
  description: 'A timeline visualization following Google\'s Material Design principles with card-based UI, elevation, and clean typography',
  category: 'timeline',
  isExperimental: false
})

// Export the component as default
export default MaterialDesignTimeline
