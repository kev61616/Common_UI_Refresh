'use client'

import { registerView } from '../../registry/viewRegistry'
import { Component } from './Component'

// Register this view with metadata
registerView({
  id: 36,
  name: 'Learning Gap Analyzer',
  description: 'Identifies patterns in missed questions to reveal knowledge gaps and recommend targeted remediation strategies',
  category: 'question',
  tags: ['gap-analysis', 'remediation', 'learning-path', 'knowledge-structure'],
  isExperimental: false
})

// Export the component as default
export default Component
