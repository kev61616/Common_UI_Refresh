'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 36,
  name: 'Train Journey Timeline',
  description: 'A railway-themed visualization that represents practice sessions as train stations along a timeline. Features animated trains traveling between stations, railroad tracks connecting stations, and performance metrics styled as journey information with accurate railway terminology.',
  category: 'timeline',
  tags: ['transport', 'railway', 'journey', 'animated', 'stations', 'interactive'],
  isExperimental: false
})

// Export the component as default
export default Component
