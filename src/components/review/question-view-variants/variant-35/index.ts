'use client'

import { registerView } from '../../registry/viewRegistry'
import { Component } from './Component'

// Register this view with metadata
registerView({
  id: 35,
  name: 'Misconception Cluster Analysis',
  description: 'A visualization that identifies and groups related errors to reveal underlying misconceptions and knowledge gaps',
  category: 'question',
  tags: ['error-analysis', 'clustering', 'patterns', 'misconceptions', 'remediation'],
  isExperimental: false
})

// Export the component as default
export default Component
