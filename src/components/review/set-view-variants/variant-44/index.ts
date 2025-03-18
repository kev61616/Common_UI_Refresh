'use client'

import { Component } from './Component'
import { registerView } from '../../registry/viewRegistry'

// Register this view with metadata
registerView({
  id: 44,
  name: 'Museum Gallery',
  description: 'Presents study sets as exhibits in a museum gallery with different wings for each subject',
  category: 'set',
  isExperimental: false
})

// Export the component as default
export default Component
