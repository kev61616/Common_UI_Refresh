'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 33,
  name: 'Film Strip Timeline',
  description: 'A cinematic timeline visualization that represents practice sessions as frames in a film strip with sprocket holes. Features subject-specific visual patterns, performance ratings styled as film critic reviews, and detailed analytics in a director\'s cut format.',
  category: 'timeline',
  tags: ['cinematic', 'film', 'visual', 'interactive', 'pattern'],
  isExperimental: false
})

// Export the component as default
export default Component
