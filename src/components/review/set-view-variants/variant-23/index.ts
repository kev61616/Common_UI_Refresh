'use client'

import { registerView } from '../../registry/viewRegistry'
import { Component } from './Component'

// Register this view with metadata
registerView({
  id: 23,
  name: 'Mountain Range Explorer View',
  description: 'A visualization that represents practice sets as mountains and peaks in a vast mountain range',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
