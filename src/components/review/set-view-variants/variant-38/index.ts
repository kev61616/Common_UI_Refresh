'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 38,
  name: 'Time Capsule View',
  description: 'A historical timeline visualization that presents practice sets as artifacts from different time periods.',
  category: 'set',
  isExperimental: false
})

export default Component
