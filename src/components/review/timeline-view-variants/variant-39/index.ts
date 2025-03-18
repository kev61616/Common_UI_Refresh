'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 39,
  name: 'Seasonal Cycle Timeline',
  description: 'A natural cycle visualization representing practice sessions organized by seasons across years. Features distinctive seasonal themes with spring growth, summer development, fall harvest, and winter reflection metaphors, detailed seasonal descriptions, and cyclical pattern recognition.',
  category: 'timeline',
  tags: ['natural', 'seasonal', 'cycle', 'ecological', 'metaphorical', 'patterns'],
  isExperimental: false
})

// Export the component as default
export default Component
