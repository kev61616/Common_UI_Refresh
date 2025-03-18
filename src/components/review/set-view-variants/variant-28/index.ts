'use client'

import { registerView } from '../../registry/viewRegistry'
import { Component } from './Component'

// Register this view with metadata
registerView({
  id: 28,
  name: 'Library Archive View',
  description: 'Book-themed visualization mapping study materials to library archives organized by subject',
  category: 'set',
  isExperimental: false
})

export default Component
