'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 31,
  name: 'Weather Pattern Timeline',
  description: 'A beautiful weather-themed timeline visualization where weather patterns represent performance metrics. Features include meteorological metaphors with dynamic cloud, sun, rain, and storm animations based on accuracy, interactive elements, and subject-specific coloring.',
  category: 'timeline',
  tags: ['weather', 'meteorological', 'interactive', 'animations', 'metaphorical'],
  isExperimental: false
})

// Export the component as default
export default Component
