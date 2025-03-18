'use client'

import { registerView } from '../../registry/viewRegistry'
import Component from './Component'

// Register this view with metadata
registerView({
  id: 37,
  name: 'River Delta Timeline',
  description: 'A geographical visualization representing practice sessions as tributaries in a branching river system. Features animated water flow, confluence patterns based on performance metrics, and hydrological metaphors with detailed watershed analysis.',
  category: 'timeline',
  tags: ['geographical', 'nature', 'flowing', 'animated', 'branching', 'ecological'],
  isExperimental: false
})

// Export the component as default
export default Component
