'use client'

import { registerView } from '../../registry/viewRegistry'
import { Component } from './Component'

// Register this view with metadata
registerView({
  id: 30,
  name: 'Data Crystal View',
  description: 'Crystal-themed visualization mapping performance to color brilliance, questions to facets, and conceptual understanding to clarity',
  category: 'set',
  isExperimental: false
})

export default Component
